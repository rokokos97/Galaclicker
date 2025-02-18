# Gala Clicker Client

This is the client-side component of the Gala Clicker game, a Telegram mini-app where players help their virtual programmer progress by writing new lines of code. The game is built with vanilla JavaScript and integrates seamlessly with the Telegram Mini Apps API.

## Deployment

The client is deployed and accessible at:
[https://rokokos97.github.io/gala-clicker/](https://rokokos97.github.io/gala-clicker/)

Play via Telegram Bot:
[@gala_clicker_bot](https://web.telegram.org/k/#@gala_clicker_bot)

## Game Features

- **Engaging Gameplay**: Click on the programmer's image to write new lines of code and earn points
- **Level Progression**: Advance through levels with increasing rewards per click
- **Limited Clicks**: Strategic resource management with regenerating clicks
- **Score Tracking**: Daily, monthly, and total score tracking
- **Leaderboard**: Compete globally with other players
- **User Profile**: Track your progress and achievements
- **Mobile-First Design**: Optimized for Telegram Mini Apps
- **Real-time Sync**: Automatic data synchronization with server

## Tech Stack

- **Core**: HTML5, CSS3, JavaScript (ES6+)
- **API Integration**: Telegram Mini Apps API
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- Modern web browser

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rokokos97/gala-clicker.git
   cd gala-clicker/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   VITE_SERVER_URL=http://localhost:3001
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

| File / Directory         | Description                    |
|--------------------------|--------------------------------|
| `public/`                | Static assets directory        |
| `├── images/`            | Game images and assets         |
| `├── icons/`             | UI icons and visual elements   |
| `src/`                   | Main source code directory     |
| `├── components/`        | Reusable UI components         |
| `├── styles/`            | CSS stylesheets and themes     |
| `├── utils/`             | Helper functions and utilities |
| `├── main.js`            | Application entry point        |
| `index.html`             | Main HTML template             |
| `vite.config.js`         | Vite build configuration       |
| `.env`                   | Environment variables (create this) |
| `package.json`           | Project dependencies and scripts |

## Environment Variables

| Variable          | Description     | Default               |
|-------------------|-----------------|-----------------------|
| `VITE_SERVER_URL` | Backend API URL | http://localhost:3001 |

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Developers

- [Rostyslav Lisovyi](https://github.com/rokokos97) - Frontend Developer
