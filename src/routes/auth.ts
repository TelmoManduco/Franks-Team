import { Router } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middlewares/auth";

const router = Router();

/**
 * POST /api/register
 * Step 1: Initial Account Creation
 */
router.post("/register", async (req, res) => {
  try {
    // UPDATED: Destructure firstName and lastName instead of name
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !phone || !firstName || !lastName) {
      return res.status(400).json({
        error: "All fields (Email, Name, Phone, Password) are required",
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName, // UPDATED
        lastName, // UPDATED
        phone,
        onboardingComplete: false,
      },
    });

    const token = signToken({ userId: user.id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "Account created. Proceed to onboarding." });
  } catch (error) {
    console.error("REGISTER ERROR", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ userId: user.id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      onboardingComplete: user.onboardingComplete,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/update-profile
 * Step 2: Mandatory Medical & Safety Data (Now uses Profile table)
 */
router.post("/update-profile", requireAuth, async (req, res) => {
  try {
    const {
      emergencyName,
      emergencyPhone,
      medicalConditions,
      injuries,
      waiverAccepted,
    } = req.body;

    const numericUserId = Number(req.userId);

    if (isNaN(numericUserId)) {
      return res.status(400).json({ error: "Invalid User Session" });
    }

    if (!waiverAccepted) {
      return res
        .status(400)
        .json({ error: "You must accept the safety waiver." });
    }

    // UPDATED: We use a transaction to create the profile AND mark onboarding complete
    await prisma.$transaction([
      // 1. Create the detailed Profile record
      prisma.profile.upsert({
        where: { userId: req.userId },
        update: {
          emergencyName,
          emergencyPhone,
          medicalConditions,
          injuries,
          waiverAccepted,
        },
        create: {
          userId: numericUserId,
          emergencyName,
          emergencyPhone,
          medicalConditions,
          injuries,
          waiverAccepted,
        },
      }),
      // 2. Update the User flag
      prisma.user.update({
        where: { id: req.userId },
        data: { onboardingComplete: true },
      }),
    ]);

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR", error);
    return res.status(500).json({ error: "Failed to update health info" });
  }
});

/**
 * GET /api/me
 */
router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      firstName: true, // UPDATED
      lastName: true, // UPDATED
      onboardingComplete: true,
    },
  });
  res.json({ user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" });
  return res.status(200).json({ message: "Logged out" });
});

export default router;
