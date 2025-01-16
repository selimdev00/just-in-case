const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Example user route
router.get('/profile', authenticate, authorize(['user', 'admin']), (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}` });
});

module.exports = router;
