import { Router } from "express";
import { prisma } from "../lib/prisma";
import { error } from "node:console";

const router = Router();

/**
 * POST /api/register
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // 3. Create user (passwordNOT hashed yet - next step)
    const user = await prisma.user.create({ data: { email, password, name } });

    // 4. Return success (never return password)
    return res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("REGISTER ERROR", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
