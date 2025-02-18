const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const leaderboardRoutes = require('./leaderboard');
const levelsRoutes = require('./levels');

router.use('/users', userRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/levels', levelsRoutes);

module.exports = router;
