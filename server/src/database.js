const chalk = require('chalk');
const { sequelize } = require('./config/sequelize');
const Level = require('./models/level');
const { Levels } = require('./mock/levels');

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log(
      chalk.green('Database connection has been established successfully.'),
    );
    await sequelize.sync();
    console.log('Database models synchronized successfully.');

    const existingLevels = await Level.findAll();
    if (existingLevels.length === 0) {
      await Level.bulkCreate(Levels);
      console.log(chalk.green('Levels initialized successfully'));
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

module.exports = { sequelize, initDatabase };
