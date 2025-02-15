const express = require('express');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const dotenv = require('dotenv');
const router = require('./routes/index');
const { createTriCalcBot } = require('./bots/tricalc');
const { initDatabase, sequelize } = require('./database');
const { createGalaClickerBot } = require('./bots/galaClicker');

dotenv.config();

const app = express();
const bot = createGalaClickerBot();
const botTricalc = createTriCalcBot();

const port = process.env.PORT ?? 8888;
console.log(chalk.yellow(port))

app.use(
  cors({
    origin: ['https://gala-clicker.vercel.app', 'https://rokokos97.github.io'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }),
);
app.use(express.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

async function start() {
  try {
    try {
      await initDatabase();
      console.log(chalk.green('Database connected successfully'));
    } catch (error) {
      console.error(
        chalk.red(
          'Database connection failed:',
          error.message || JSON.stringify(error)
        )
      );
      process.abort();
    }

    try {
      console.log('Launch bot')
      await Promise.all([bot.launch()]);
      console.log(chalk.green('Bots launched successfully'));

      const server = app.listen(port, () => {
        console.log(chalk.green(`🚀 Server is running on port ${port}`));
      });

      server.on('error', (error) => {
        console.error(chalk.red('❌ Server error:', error));
        process.exit(1);
      });

    } catch (error) {
      console.error(
        chalk.red(
          'Bot launch failed:',
          error.message || 'Unknown error'
        )
      );
    }

    const shutdown = async () => {
      console.log('Shutting down gracefully...');
      try {
        await Promise.all([
          new Promise(resolve => {
            bot.stop('SIGTERM');
            resolve();
          }),
          new Promise(resolve => {
            botTricalc.stop('SIGTERM');
            resolve();
          }),
          sequelize.close(),
        ]);
        console.log(chalk.yellow('All resources closed successfully'));
      } catch (error) {
        console.error(
          chalk.red(
            'Error during shutdown:',
            error.message || JSON.stringify(error)
          )
        );
      }
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
}

// Start the application
start().then(() => console.log(chalk.green('✅ Server started successfully')))
.catch((error) => {
  console.error(chalk.red('❌ Unhandled error during startup:', error));
  process.exit(1);
});
