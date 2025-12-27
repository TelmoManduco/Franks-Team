import { Router } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../lib/jwt";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middlewares/auth";

const router = Router();

/**
 * POST /api/register
 * Creates a new user account
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * POST /api/login
 * Authenticates user and issues JWT
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare plain password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Create JWT containing the user ID
    const token = signToken({ userId: user.id });

    // Send JWT as httpOnly cookie (secure authentication)
    res.cookie("token", token, {
      httpOnly: true, // Not accessible via JS
      secure: false, // Set to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

/**
 * GET /api/me
 * Returns logged-in user
 */
router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  res.json({ user });
});

/**
 * POST /api/logout
 * Clears the authentication cookie
 */
router.post("/logout", (req, res) => {
  // Limpa o cookie "token" com as mesmas definições de segurança
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Mantém igual ao login (false para dev local)
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export default router;
