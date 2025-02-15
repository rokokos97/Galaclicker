const { Telegraf } = require('telegraf');
const chalk = require('chalk');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

function createGalaClickerBot() {
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN_GALA);
  
  if (!process.env.TELEGRAM_TOKEN_GALA) {
    console.error(chalk.red('TELEGRAM_TOKEN_GALA is not defined'));
  }

  bot.start(async (ctx) => {
    if (!ctx.message?.from) {
      await ctx.reply('Sorry, there was an error processing your request.');
      return;
    }
    console.log(chalk.green('Gala-clicker bot was running...'));
    const incomeUser = ctx.message.from;
    const dataUser = {
      external_id_telegram: incomeUser.id.toString(),
      username: incomeUser.username ?? 'Unknown',
      first_name: incomeUser.first_name ?? 'Unknown',
      last_name: incomeUser.last_name ?? 'Unknown',
    };

    try {
      const user = await User.findOne({
        where: { external_id_telegram: dataUser.external_id_telegram },
      });

      if (!user) {
        await User.create(dataUser);
        await ctx.reply(
          `Welcome to Gala-clicker, ${dataUser.username}! Your account has been created.`,
        );
      } else {
        await ctx.reply(
          `Welcome back, ${user.username}! Your current score is ${user.score}.`,
        );
      }
    } catch (error) {
      console.error('Error in start command:', error);
      await ctx.reply('Sorry, there was an error processing your request.');
    }
  });

  bot.command('score', async (ctx) => {
    if (!ctx.message?.from?.id) {
      await ctx.reply('Sorry, there was an error processing your request.');
      return;
    }

    try {
      const user = await User.findOne({
        where: { external_id_telegram: ctx.message.from.id.toString() },
      });

      if (!user) {
        await ctx.reply('Please start the bot first with /start command.');
        return;
      }

      await ctx.reply(`Your current score is ${user.score}.`);
    } catch (error) {
      console.error('Error in score command:', error);
      await ctx.reply('Sorry, there was an error processing your request.');
    }
  });

  return bot;
}

module.exports = { createGalaClickerBot };
