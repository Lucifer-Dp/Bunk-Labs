# Bunk Lab Backend API

Node.js/Express backend for Bunk Lab platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=4000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173
```

3. Run development server:
```bash
npm run dev
```

4. Run production server:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user account
  - Body: `{ name, email, password }`
  - Returns: `{ user, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user, token }`

### User

- `GET /api/user/me` - Get current user (requires auth token)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user }`

## Environment Variables

- `PORT` - Server port (default: 4000)
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)

## Data Storage

Currently uses JSON file storage (`backend/data/users.json`). For production, migrate to a database.
