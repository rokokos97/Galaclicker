const { Telegraf } = require('telegraf');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();

function createTriCalcBot() {
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN_TRICALC);
  
  if (!process.env.TELEGRAM_TOKEN_TRICALC) {
    console.error(chalk.red('TELEGRAM_TOKEN_TRICALC is not defined'));
  }

  bot.start(async (ctx) => {
    console.log(chalk.green('Tricalc bot was running...'));
    await ctx.reply('Welcome to Tricalc bot!');
  });

  return bot;
}

module.exports = { createTriCalcBot };
