const express = require('express');
const router = express.Router();
const chalk = require('chalk');
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
        level: 1
      });
    }

    console.log(chalk.green('Returning user:', JSON.stringify(user, null, 2)));
    res.json(user);
  } catch (error) {
    console.error(chalk.red('Error:', error.message));
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    console.log(chalk.blue('Updating user with ID:', req.params.id));
    console.log(chalk.cyan('Update data:', JSON.stringify(req.body, null, 2)));

    const user = await User.findOne({
      where: { external_id_telegram: req.params.id }
    });

    if (!user) {
      console.log(chalk.red('User not found'));
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    await user.update(req.body);
    
    // Fetch the updated user to return
    const updatedUser = await User.findOne({
      where: { external_id_telegram: req.params.id }
    });

    console.log(chalk.green('User updated successfully:', JSON.stringify(updatedUser, null, 2)));
    res.json(updatedUser);

  } catch (error) {
    console.error(chalk.red('Error updating user:', error));
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
