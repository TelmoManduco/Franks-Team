import express from "express";
import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";

export const app = express();

// ✅ Middleware GLOBAL (antes das rotas)
app.use(express.json());

// ✅ Todas as rotas herdam o middleware
app.use("/api", authRoutes);
app.use("/api", testRoutes);
