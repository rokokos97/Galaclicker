import { type Context, Telegraf } from 'telegraf';
import { handleError } from '../utils/handleError.js';

export const createTriCalcBot = (): Telegraf => {
  const bot = new Telegraf(`${process.env.TELEGRAM_TOKEN_TRICALC}`);

  bot.start(async (ctx: Context) => {
    try {
      await ctx.reply('WELCOME TO TRICALC!');
      await ctx.reply('Click the button below to start calculate.', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Calculate',
                web_app: { url: process.env.FRONT_URL_TRICALC ?? '' },
              },
            ],
          ],
        },
      });
    } catch (error: unknown) {
      console.error('Error in botTricalc.start():', error);
      handleError(error);
    }
  });

  return bot;
};
