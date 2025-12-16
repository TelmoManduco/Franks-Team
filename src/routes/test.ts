import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * GET /api/test-db
 * Simple route to test Prisma connection
 */
router.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;
