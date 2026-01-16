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
    const { email, password, name, phone } = req.body;

    if (!email || !password || !phone) {
      return res
        .status(400)
        .json({ error: "Email, password, and phone are required" });
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
        name,
        phone, // Ensure your Prisma schema has this field!
        onboardingComplete: false, // Flag to track progress
      },
    });

    // Automatically log them in after registration so they can access onboarding.html
    const token = signToken({ userId: user.id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
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
 * Now returns onboarding status
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
      onboardingComplete: user.onboardingComplete, // Frontend uses this to redirect
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * POST /api/update-profile
 * Step 2: Mandatory Medical & Safety Data
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

    if (!waiverAccepted) {
      return res
        .status(400)
        .json({ error: "You must accept the safety waiver." });
    }

    await prisma.user.update({
      where: { id: req.userId },
      data: {
        emergencyName,
        emergencyPhone,
        medicalConditions,
        injuries,
        onboardingComplete: true, // Mark step 2 as finished
      },
    });

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
      name: true,
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
