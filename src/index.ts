import express from "express";
import authRoutes from "./routes/auth";
import testRoutes from "./routes/test";

const app = express();
const PORT = 3000;

// ✅ ESTE MIDDLEWARE É O QUE FALTA
app.use(express.json());

// routes
app.use("/api", authRoutes);
app.use("/api", testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
