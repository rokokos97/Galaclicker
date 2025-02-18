const express = require('express');
const router = express.Router();
const Level = require('../models/level');

// Get all levels
router.get('/', async (req, res) => {
  try {
    const levels = await Level.findAll({
      order: [['id', 'ASC']],
    });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
