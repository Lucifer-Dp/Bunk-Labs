# Bunk Lab - Gamified Engineering Student Platform

A full-stack gamified engineering student platform where students can solve challenges, earn points, climb the leaderboard, and unlock badges.

## Features

- 🏠 **Homepage** - Welcome page with hero section and features
- 🔐 **Authentication** - Secure login and signup with JWT tokens
- 📊 **Dashboard** - View points, rank, level, badges, and recent activity
- 🎯 **Challenges** - Interactive challenge system with timer and multiple choice questions
- 🏆 **Leaderboard** - See rankings and compete with other students
- 🧠 **Memory Game** - Fun memory game to earn extra points

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation and routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

### Environment Setup

1. **Backend Environment Variables**

Create `backend/.env`:
```env
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173
```

2. **Frontend Environment Variables**

Create `.env` in the root directory:
```env
VITE_API_URL=http://localhost:4000
```

### Development

1. **Start the backend server:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:4000`

2. **Start the frontend (in a new terminal):**
```bash
npm run dev
```
Frontend will be available at `http://localhost:5173`

### Production Build

**Build frontend:**
```bash
npm run build
```

**Start backend in production:**
```bash
cd backend
npm start
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- **Backend**: Deploy to Railway, Render, or Heroku
- **Frontend**: Deploy to Vercel or Netlify

Make sure to set environment variables in your hosting platform.

## Project Structure

```
The Bunk Lab/
├── backend/              # Node.js/Express backend
├── server.js         # Main server file
├── data/             # JSON data storage
└── package.json
├── src/                  # React frontend
├── components/       # Reusable components
├── pages/            # Page components
├── utils/            # Utility functions (API)
└── App.jsx           # Main app component
├── dist/                 # Built frontend (generated)
└── package.json          # Frontend dependencies
```

## API Endpoints

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/user/me` - Get current user (requires auth)

See [backend/README.md](./backend/README.md) for more details.

## Design

- **Primary Color**: Blue (#1E90FF)
- **Accent Color**: Yellow (#FFD700)
- **Responsive**: Mobile-friendly design with Tailwind CSS
- **Cards**: Rounded corners with shadows for modern UI

## License

MIT
