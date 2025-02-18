const express = require('express');
const router = express.Router();
const Level = require('../models/level');

/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Game levels management
 */

/**
 * @swagger
 * /api/levels:
 *   get:
 *     summary: Get all game levels
 *     tags: [Levels]
 *     responses:
 *       200:
 *         description: List of all levels ordered by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Level'
 *       500:
 *         description: Server error
 */
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
