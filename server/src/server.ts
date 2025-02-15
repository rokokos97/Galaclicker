import express from 'express';
import cors from 'cors';
import router from './routes/index';
import { initDatabase, sequelize } from './database';
import path from 'path';
import { createGalaClickerBot } from './bots/galaClicker';
import { createTriCalcBot } from './bots/tricalc';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const bot = createGalaClickerBot();
const botTricalc = createTriCalcBot();

const port = process.env.PORT != null || 8888;

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

export default app;

async function start(): Promise<void> {
  try {
    try {
      await initDatabase();
      console.log(chalk.green('Database connected successfully'));
    } catch (error: unknown) {
      console.error(
        chalk.red('Database connection failed:', error || 'Unknown error'),
      );
      process.abort();
    }

    const startServerAndBots = async (): Promise<void> => {
      try {
        if (process.env.NODE_ENV === 'production') {
          await Promise.all([bot.launch(), botTricalc.launch()]);
          console.log(chalk.green('Bots launched successfully'));
        } else {
          const server = app.listen(port, () => {
            console.log(chalk.green(`Server is running on port ${port}`));
          });

          server.on('error', (error: Error & { code?: string }) => {
            if (error.code === 'EADDRINUSE') {
              console.error(chalk.red(`Port ${port} is already in use`));
            } else {
              console.error(chalk.red('Error starting server:', error));
            }
            process.exit(1);
          });
        }
      } catch (error: unknown) {
        console.error(
          chalk.red(
            '❌ Server/Bot startup failed:',
            error instanceof Error ? error.message : JSON.stringify(error),
          ),
        );
      }
    };

    // Викликаємо функцію запуску
    startServerAndBots();

    // Graceful shutdown
    const shutdown: () => Promise<void> = async () => {
      console.log('Shutting down gracefully...');
      bot.stop('SIGTERM');
      botTricalc.stop('SIGTERM');
      await sequelize.close();
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
start().catch((error: unknown) => {
  console.error('Unhandled error during startup:', error);
  process.exit(1);
});
