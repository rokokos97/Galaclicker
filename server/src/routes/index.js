const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Level = require('../models/level');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['score', 'DESC']],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all levels
router.get('/levels', async (req, res) => {
  try {
    const levels = await Level.findAll({
      order: [['id', 'ASC']],
    });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
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

// Get user by ID

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
