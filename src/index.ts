import express from 'express';
import { prisma } from './lib/prisma.js';

const app = express();
const PORT = 3000;

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// HEALTH CHECK ROUTE
// --------------------------------------------------
// Simple route to confirm the server is running
app.get('/api/health', async (_req, res) => {
  try {
    // Simple Prisma query to test DB connection
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      server: 'running',
      database: 'connected',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'not connected',
    });
  }
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
