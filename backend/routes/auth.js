const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Create a new user instance
    const user = new User({ name, email, password });

    // Save the user to the database
    await user.save();

    // Respond with the created user
    res.json(user);
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ error: 'Failed to save user.' });
  }
});

module.exports = router;
