import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * GET /api/test-db
 * Lista todos os utilizadores (DEV ONLY)
 */
router.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
    });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("TEST-DB ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

/**
 * DELETE /api/test-db
 * APAGA TODOS OS USERS (DEV ONLY)
 */
router.delete("/test-db", async (req, res) => {
  try {
    const result = await prisma.user.deleteMany();

    res.json({
      success: true,
      deleted: result.count,
      message: "All users deleted",
    });
  } catch (error) {
    console.error("TEST-DB DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete users",
    });
  }
});

export default router;
