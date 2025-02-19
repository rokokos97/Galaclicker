const { Telegraf } = require('telegraf');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();

function triCalcBot() {
  const token = process.env.TELEGRAM_TOKEN_TRICALC;
  if (!token) {
    console.error(chalk.red('TELEGRAM_TOKEN_TRICALC is not defined!'));
    process.exit(1);
  }
  const bot = new Telegraf(token);

  bot.start(async (ctx) => {
    console.log(chalk.green('Tricalc bot was running...'));
    ctx.reply('Welcome to Tricalc', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Calculate',
              web_app: {
                url:
                  process.env.FRONT_URL_TRICALC ||
                  'https://rokokos97.github.io/tricalc',
              },
            },
          ],
        ],
      },
    });
  });
  bot.catch((err) => {
    console.error(chalk.red('Bot Error:', err));
  });
  bot
    .launch()
    .then(() => console.log(chalk.green(' Tricalc bot launched successfully!')))
    .catch((err) => {
      console.error(chalk.red('Failed to launch bot:', err));
      process.exit(1);
    });

  return bot;
}

module.exports = { triCalcBot };
