const { Telegraf } = require('telegraf');
const chalk = require('chalk');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

async function galaClickerBot() {
  if (!process.env.TELEGRAM_TOKEN_GALA) {
    console.error(chalk.red('TELEGRAM_TOKEN_GALA is not defined'));
    throw new Error('TELEGRAM_TOKEN_GALA is not defined');
  }

  const bot = new Telegraf(process.env.TELEGRAM_TOKEN_GALA);

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

    const webAppUrl = `${process.env.FRONT_URL}?userId=${incomeUser.id.toString()}`;
    console.log(webAppUrl);
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
    ctx.reply('🎮 Запускай Mini App, натиснувши кнопку нижче!', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚀 Run the game',
              web_app: {
                url: process.env.FRONT_URL || 'https://galaclicker.vercel.app/',
              },
            },
          ],
        ],
      },
    });
  });
  await bot.launch();
  console.log(chalk.green('Gala-clicker bot successfully launched!'));
  return bot;
}

module.exports = { galaClickerBot };
