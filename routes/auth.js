const express = require('express');
const router = express.Router();

// ================================
// POST /api/register
// Handles user registration
// ================================
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    console.log("New registration received:", req.body);

    // In the future:
    // 1. Validate input
    // 2. Check if user already exists
    // 3. Hash password
    // 4. Save user to database

    res.json({ message: "Registration received successfully!" });
});

// ================================
// POST /api/login
// Handles user login
// ================================
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", req.body);

    // In the future:
    // 1. Validate input
    // 2. Check if user exists
    // 3. Compare password with hashed password
    // 4. Generate JWT token

    res.json({ message: "Login received!" });
});

module.exports = router;
