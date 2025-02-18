const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Game leaderboard endpoints
 */

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get top 10 players
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: List of top 10 players ordered by score
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */

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
