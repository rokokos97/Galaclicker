require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/index');
const { initDatabase } = require('./config/database');
const { galaClickerBot } = require('./bots/galaClicker');
const swaggerSpec = require('./config/swagger');

const app = express();

const PORT = process.env.PORT || 8888;

// Configure CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8888',
      'http://127.0.0.1:5173',
      'https://galaclicker.vercel.app',
      'https://telegrambotserver-production.up.railway.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Parse JSON bodies
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', router);

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
