# Gala Clicker

A full-stack web application with a Vite-powered frontend and Express.js TypeScript backend.

## 🏗️ Project Structure

```bash
gala-clicker/
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   ├── index.html         # Entry HTML file
│   ├── main.js           # Main JavaScript entry point
│   ├── style.css         # Global styles
│   └── vite.config.js    # Vite configuration
│
└── server/                # Backend application
    ├── src/              # TypeScript source files
    ├── public/           # Static files
    └── tsconfig.json     # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup (Client)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:8888`

## 🛠️ Tech Stack

### Frontend

- Vite - Build tool and development server
- Vanilla JavaScript - Core programming
- Modern CSS - Styling

### Backend

- Node.js - Runtime environment
- Express.js - Web framework
- TypeScript - Programming language
- MongoDB - Database (optional)

## 🔧 Environment Variables

### Client (.env)

```env
VITE_SERVER_URL=http://localhost:8888
```

### Server (.env)

```env
SERVER_PORT=8888
DATABASE_URL=your_database_url
VITE_SERVER_URL=http://localhost:8888```

## 📝 Scripts

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Rostyslav Lisovyi - [GitHub](https://github.com/rokokos97)
