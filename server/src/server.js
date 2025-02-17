require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const router = require('./routes/index');
const { initDatabase } = require('./config/database');
const { galaClickerBot } = require('./bots/galaClicker');

const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.json());
app.use('/api', router);
app.use(
  cors({
    origin: ['https://gala-clicker.vercel.app', 'https://rokokos97.github.io'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  }),
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(chalk.green(`Server is running on port ${PORT}`));
    });
    await galaClickerBot();
  } catch (error) {
    console.error(chalk.red('Server failed to start:', error));
    process.exit(1);
  }

  // const shutdown = async () => {
  //   console.log('Shutting down gracefully...');
  //   try {
  //     app.shutdown();
  //     console.log(chalk.yellow('All resources closed successfully'));
  //   } catch (error) {
  //     console.error(chalk.red('Error during shutdown', error));
  //   }
  //   process.exit(0);
  // };
}

start();
