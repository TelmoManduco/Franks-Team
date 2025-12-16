import express from "express";
import testRoutes from "./routes/test";


const app = express();
const PORT = 3000;

// --------------------
// Middlewares
// --------------------
app.use(express.json());
app.use("/api", testRoutes);


// --------------------
// Test route
// --------------------
app.get("/", (req, res) => {
  res.json({ message: "Franks Team backend is running 🚀" });
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
