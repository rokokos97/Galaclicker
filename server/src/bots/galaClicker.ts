import { type Context, Telegraf } from 'telegraf';
import { type User } from 'telegraf/types';
import { handleError } from '../utils/handleError.js';
import UserModel from '../models/user.js';
import { type IUserInput, type IUser } from '../interfaces.js';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

export const createGalaClickerBot = (): Telegraf => {
  if (
    process.env.FRONT_URL !== null &&
    process.env.FRONT_URL !== undefined &&
    process.env.FRONT_URL !== ''
  ) {
    console.error(chalk.red('FRONT_URL environment variable is not defined'));
  }

  const bot = new Telegraf(`${process.env.TELEGRAM_TOKEN_GALA}`);
  if (
    process.env.TELEGRAM_TOKEN_GALA !== null &&
    process.env.TELEGRAM_TOKEN_GALA !== undefined &&
    process.env.TELEGRAM_TOKEN_GALA !== ''
  ) {
    console.error(chalk.red('TELEGRAM_TOKEN_GALA is not defined'));
  }
  bot.start(async (ctx: Context) => {
    if (ctx.message?.from !== null) {
      await ctx.reply('Sorry, there was an error processing your request.');
      return;
    }
    console.log(chalk.green('Gala-clicker bot was running...'));
    const incomeUser: User = ctx.message.from;
    const dataUser: IUserInput = {
      external_id_telegram: incomeUser.id.toString(),
      username: incomeUser.username ?? 'Unknown',
      first_name: incomeUser.first_name ?? 'Unknown',
      last_name: incomeUser.last_name ?? 'Unknown',
      score: 0,
      dailyScore: 0,
      monthlyScore: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      lastUpdatedMonthly: new Date().toISOString().split('T')[0].slice(0, 7),
      availableLines: 100,
    };

    try {
      await ctx.reply('WELCOME TO GALA-CLICKER!');
      let user = await UserModel.findOne({
        where: { external_id_telegram: dataUser.external_id_telegram },
      });

      if (user !== null) {
        user = await UserModel.create(dataUser as IUser);
      } else {
        await ctx.reply(
          `${dataUser.first_name} ${dataUser.last_name} welcome back to the game!`,
        );
      }

      await ctx.reply('Click the button below to start playing.', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Play Now',
                web_app: { url: process.env.FRONT_URL ?? '' },
              },
            ],
          ],
        },
      });
    } catch (error: unknown) {
      console.error(chalk.red('Error in bot.start():', error));
      handleError(error);
      await ctx.reply(
        'Sorry, there was an error processing your request. Please try again later.',
      );
    }
  });
  bot.on('text', async (ctx: Context) => {
    try {
      await ctx.reply(
        'Currently, only the game option is available. Click the "Play Game" button below to start.',
      );
    } catch (error: unknown) {
      console.error(chalk.red('Error handling text message:', error));
      handleError(error);
    }
  });

  return bot;
};
