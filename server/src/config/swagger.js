const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gala Clicker Game API',
      version: '2.0.0',
      description: 'API documentation for the Gala Clicker Game server',
      contact: {
        name: 'Rostyslav Lisovyi',
        email: 'lisovyi.rostyslav@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: "User's ID",
            },
            external_id_telegram: {
              type: 'string',
              description: "User's Telegram ID",
            },
            username: {
              type: 'string',
              description: "User's display name",
            },
            first_name: {
              type: 'string',
              description: "User's first name",
            },
            last_name: {
              type: 'string',
              description: "User's last name",
            },
            score: {
              type: 'integer',
              description: 'Game total score',
            },
            dailyScore: {
              type: 'integer',
              description: 'Game daily score',
            },
            monthlyScore: {
              type: 'integer',
              description: 'Game monthly score',
            },
            lastUpdated: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
            lastUpdatedMonthly: {
              type: 'string',
              format: 'date-time',
              description: 'Last monthly update timestamp',
            },
            availableLines: {
              type: 'integer',
              description: 'Number of available clicks',
            },
            previousRank: {
              type: 'integer',
              description: "User's rank",
            },
          },
        },
        Level: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: "Level's ID",
            },
            name: {
              type: 'string',
              description: 'Name of the level',
            },
            numberOfCodeLines: {
              type: 'integer',
              description: 'Number of code lines in the level',
            },
            imgUrl: {
              type: 'string',
              description: "Level's image URL",
            },
            xlevel: {
              type: 'integer',
              description: 'Experience level requirement',
            },
            maxLines: {
              type: 'integer',
              description: 'Maximum number of lines allowed',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
