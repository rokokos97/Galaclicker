# Telegram Game Bot Server

This is the server-side component of the Telegram game bot application. The main function of the server is to:

- Manage requests from the frontend
- Connect to and interact with the PostgreSQL database
- Handle Telegram bot interactions

## Deployment

The server is deployed and accessible at:
[https://telegrambotserver-production.up.railway.app/](https://telegrambotserver-production.up.railway.app/)

## API Documentation

The API documentation is available through Swagger UI at:
[https://telegrambotserver-production.up.railway.app/api-docs/](https://telegrambotserver-production.up.railway.app/api-docs/)

The documentation provides detailed information about:

- Available endpoints
- Request/response schemas
- Example requests and responses

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (with Sequelize ORM)
- Telegraf (Telegram Bot Framework)

## Prerequisites

- Node.js >= 14.0.0
- PostgreSQL

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and configure your environment variables:

   ```bash
   cp .env.example .env
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot-reload
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Project Structure

| File / Directory            | Description                                     |
| --------------------------- | ----------------------------------------------- |
| `src/`                      | Main code directory                             |
| `├── bots/`                 | Telegram bot implementations                    |
| `│   ├── galaClicker.js`    | Main game bot implementation                    |
| `│   └── tricalc.js`        | Additional bot functionality                    |
| `├── config/`               | Configuration files                             |
| `│   ├── database.js`       | Database configuration and setup                |
| `│   └── sequelize.js`      | Sequelize ORM configuration                     |
| `├── models/`               | Database models                                 |
| `│   ├── user.js`           | User model definition                           |
| `│   └── level.js`          | Level model definition                          |
| `├── routes/`               | API route handlers                              |
| `│   ├── index.js`          | Main route configuration                        |
| `│   ├── user.js`           | User-related endpoints                          |
| `│   ├── levels.js`         | Level-related endpoints                         |
| `│   └── leaderboard.js`    | Leaderboard endpoints                           |
| `├── mock/`                 | Mock data for development                       |
| `├── uploads/`              | Directory for uploaded files                    |
| `└── server.js`             | Main application entry point                    |
| `.env.example`              | Example environment variables                   |
| `.env`                      | Environment variables (create this)             |
| `package.json`              | Project dependencies and scripts                |

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection string
- `BOT_TOKEN` - Telegram Bot API token

## License

GNU

## Models

### User

| Field                      | Type         | Required | Unique | Description                                                              |
| -------------------------- | ------------ | -------- | ------ | ------------------------------------------------------------------------ |
| `id`                       | `Number`     | Yes      | Yes    | User's id.                                                               |
| `external_id_telegram`     | `Number`     | Yes      | Yes    | User's terminal id.                                                      |
| `username`                 | `String`     | No       | No     | User's display name.                                                     |
| `first_name`               | `String`     | No       | No     | User's first name.                                                       |
| `last_name`                | `String`     | No       | No     | User's last name.                                                        |
| `score`                    | `Number`     | Yes      | Yes    | Game total score.                                                        |
| `dailyScore`               | `Number`     | Yes      | No     | Game daily score.                                                        |
| `monthlyScore`             | `Number`     | No       | No     | Game monthly score.                                                      |
| `lastUpdated`              | `ObjectDate` | No       | No     | Object Date of last Update.                                              |
| `lastUpdatedMonthly`       | `ObjectDate` | No       | No     | Object Date of last Monthly Update.                                      |
| `availableLines`           | `Number`     | No       | No     | Number of available clicks.                                              |
| `previousRank`             | `Number`     | No       | No     | User's runk.                                                             |

### Level

| Field               | Type     | Required | Unique | Description                                    |
| ------------------- | -------- | -------- | ------ | ---------------------------------------------- |
| `id`                | `Number` | Yes      | Yes    | Level's unique identifier                      |
| `name`              | `String` | Yes      | No     | Name of the level                              |
| `numberOfCodeLines` | `Number` | Yes      | No     | Number of code lines in the level              |
| `imgUrl`            | `String` | Yes      | No     | URL to the level's image                       |
| `xlevel`            | `Number` | Yes      | No     | Experience level requirement                   |
| `maxLines`          | `Number` | Yes      | No     | Maximum number of lines allowed for the level  |

## API Endpoints

The server provides the following API endpoints:

### **Users**

| Method | Endpoint         | Description                                  |
| ------ | ---------------- | -------------------------------------------- |
| GET    | `/api/users`     | Fetch all users data                         |
| GET    | `/api/users/:id` | Fetch user data by Id                        |
| PUT    | `/api/users/:id` | Update user by Id                            |

### **Levels**

| Method | Endpoint      | Description                                  |
| ------ | ------------- | -------------------------------------------- |
| GET    | `/api/levels` | Fetch all levels ordered by ID               |

### **Leaderboard**

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/api/leaderboard` | Get top 10 users ordered by score            |
