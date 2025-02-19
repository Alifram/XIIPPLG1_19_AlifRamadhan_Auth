const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware JWT

const router = express.Router();

// Endpoint Register
router.post('/register', register);

// Endpoint Login
router.post('/login', login);

// Endpoint Profile (Hanya bisa diakses jika login dan memiliki token)
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your profile",
        user: req.user, // Data user dari token JWT
    });
});

module.exports = router;
