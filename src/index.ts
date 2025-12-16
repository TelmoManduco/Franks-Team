import express from "express";
import authRoutes from "./routes/auth";
import { json } from "node:stream/consumers";

const app = express();

app.use(express.json());

// API routes
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
