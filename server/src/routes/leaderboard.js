const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Get leaderboard

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['score', 'DESC']],
      limit: 10,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
