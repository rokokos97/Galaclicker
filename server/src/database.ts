import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry:{
    max: 3
  },
  logging: process.env.NODE_ENV !== 'production',
});

export async function initDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log(chalk.green('Database connection has been established successfully.'));
    await sequelize.sync();
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
