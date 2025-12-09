// Import required modules
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ================================
// Middleware to parse request data
// ================================

// Parses incoming JSON bodies
app.use(express.json());

// Parses URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// =======================================
// Serve static files (HTML, CSS, JS, etc)
// =======================================
// All files inside the "public" folder will be accessible in the browser
// e.g., /public/index.html → http://localhost:3000/index.html
app.use(express.static(path.join(__dirname, 'public')));

// ================================
// Routes
// ================================
const authRoutes = require('./routes/auth');

// All auth routes will start with /api
// Example: POST /api/register
app.use('/api', authRoutes);

// ================================
// Start the server
// ================================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
