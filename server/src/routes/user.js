const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users ordered by score
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
    });
    console.log('users', users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by Telegram ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Telegram ID of the user
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const clientIp = req.ip;
    console.log('IP-адреса клієнта:', clientIp);

    console.log(chalk.blue('Searching for user with ID:', req.params.id));
    let user = await User.findOne({
      where: { external_id_telegram: req.params.id },
    });

    if (!user) {
      console.log(chalk.yellow('User not found, creating new user'));
      user = await User.create({
        external_id_telegram: req.params.id,
        score: 0,
        dailyScore: 0,
        weeklyScore: 0,
        monthlyScore: 0,
        level: 1,
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    console.log(chalk.blue('Updating user with ID:', req.params.id));
    console.log(chalk.cyan('Update data:', JSON.stringify(req.body, null, 2)));

    const user = await User.findOne({
      where: { external_id_telegram: req.params.id },
    });

    if (!user) {
      console.log(chalk.red('User not found'));
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    await user.update(req.body);

    // Fetch the updated user to return
    const updatedUser = await User.findOne({
      where: { external_id_telegram: req.params.id },
    });

    console.log(
      chalk.green(
        'User updated successfully:',
        JSON.stringify(updatedUser, null, 2),
      ),
    );
    res.json(updatedUser);
  } catch (error) {
    console.error(chalk.red('Error updating user:', error));
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
