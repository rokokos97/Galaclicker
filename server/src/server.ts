import express from 'express';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { createTriCalcBot } from './bots/tricalc.js';
import { initDatabase, sequelize } from './database.js';
import { createGalaClickerBot } from './bots/galaClicker.js';
import { fileURLToPath } from 'url';

dotenv.config();


const app = express();
const bot = createGalaClickerBot();
const botTricalc = createTriCalcBot();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT ?? 8888;
console.log(chalk.gray(port))

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

async function start (): Promise<void> {
  try {
    try {
      await initDatabase();
      console.log(chalk.green('Database connected successfully'));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(chalk.red('Database connection failed:', error.message));
      } else {
        console.error(
          chalk.red(
            'Database connection failed: Unknown error',
            JSON.stringify(error),
          ),
        );
      }
      process.abort();
    }
    // Only launch bots in production environment
      try {
        console.log('Launch bot')
        await Promise.all([bot.launch()]);
        console.log(chalk.green('Bots launched successfully'));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(chalk.red('Bot launch failed:', error.message));
        } else {
          console.error(chalk.red('Bot launch failed:', 'Unknown error'));
        }
      }

      const server = app.listen(port, () => {
        console.log(chalk.green(`🚀 Server is running on port ${port}`));
      });
  
      server.on('error', (error) => {
        console.error(chalk.red('❌ Server error:', error));
        process.exit(1);
      });
    
      
    const shutdown: () => Promise<void> = async () => {
      console.log('Shutting down gracefully...');
      try {
        await Promise.all([
          new Promise<void>(resolve => {
            bot.stop('SIGTERM');
            resolve();
          }),
          new Promise<void>(resolve => {
            botTricalc.stop('SIGTERM');
            resolve();
          }),
          sequelize.close(),
        ]);
        console.log(chalk.yellow('All resources closed successfully'));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(chalk.red('Error during shutdown:', error.message));
        } else {
          console.error(
            chalk.red('Error during shutdown:', JSON.stringify(error)),
          );
        }
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
