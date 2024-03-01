// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'email forename department'); // Fetch only the email field
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
