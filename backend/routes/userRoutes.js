const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created!", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user profile (usually you'd use a middleware to get 'me')
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;