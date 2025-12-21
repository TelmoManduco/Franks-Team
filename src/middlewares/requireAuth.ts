import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";

/**
 * Middleware to protect routes
 * - Checks JWT token from cookies
 * - Attaches userId to request
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;

    // No token = not authenticated
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Verify token
    const payload = verifyToken(token);

    // Attach userId to request
    req.userId = payload.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
