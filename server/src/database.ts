import chalk from 'chalk';
import { sequelize } from './config/sequelize.js';
import Level from './models/level.js';
import { Levels } from './mock/levels.js';

export async function initDatabase(): Promise<void> {
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

export { sequelize };
