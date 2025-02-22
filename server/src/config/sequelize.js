require('dotenv').config();
const chalk = require('chalk');
const { Sequelize } = require('sequelize');

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error(chalk.red('dbUrl not found!'));
}

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 3,
  },
  logging: process.env.NODE_ENV !== 'production',
});

module.exports = { sequelize };
