# Bunk Lab - Deployment Guide

This guide will help you deploy Bunk Lab to production.

## Project Structure

```
The Bunk Lab/
├── backend/          # Node.js/Express backend API
├── src/              # React frontend
├── dist/             # Built frontend (generated)
└── package.json      # Frontend dependencies
```

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A hosting service for backend (Railway, Render, Heroku, etc.)
- A hosting service for frontend (Vercel, Netlify, etc.)

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
CORS_ORIGINS=https://your-frontend-domain.com
```

**Important:** 
- Generate a strong `JWT_SECRET` (use `openssl rand -base64 32` or similar)
- Set `CORS_ORIGINS` to your frontend URL(s), comma-separated
- Never commit `.env` files to git

### Frontend Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-backend-domain.com
```

**Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the frontend.

## Local Development Setup

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy the example files and fill in your values:

**Backend:**
```bash
cd backend
# Create .env file with your values
```

**Frontend:**
```bash
# Create .env file in root with:
# VITE_API_URL=http://localhost:4000
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

## Production Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Push your code to GitHub**

2. **Deploy backend:**
   - Connect your GitHub repo to your hosting service
   - Set the root directory to `backend/`
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `PORT` (usually auto-set by hosting)
     - `JWT_SECRET` (generate a strong secret)
     - `NODE_ENV=production`
     - `CORS_ORIGINS` (your frontend URL)

3. **Get your backend URL** (e.g., `https://bunklab-api.railway.app`)

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   npm run build
   ```
   This creates a `dist/` folder with production files.

2. **Deploy frontend:**
   - Connect your GitHub repo to Vercel/Netlify
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable:
     - `VITE_API_URL` = your backend URL from step above

3. **Get your frontend URL** (e.g., `https://bunklab.vercel.app`)

4. **Update backend CORS:**
   - Go back to your backend hosting dashboard
   - Update `CORS_ORIGINS` to include your frontend URL
   - Restart the backend

## Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] JWT_SECRET is strong and secure
- [ ] Frontend API URL points to backend
- [ ] Test signup/login flow
- [ ] Test protected routes

## Common Issues

### CORS Errors
- Make sure `CORS_ORIGINS` in backend includes your frontend URL
- Check that URLs don't have trailing slashes
- Verify backend is accepting requests from frontend domain

### API Connection Errors
- Verify `VITE_API_URL` is set correctly in frontend
- Check backend is running and accessible
- Look at browser console for specific error messages

### Environment Variables Not Working
- Frontend: Must use `VITE_` prefix
- Backend: Restart server after changing `.env`
- Verify `.env` files are in correct directories

## Database (Future)

Currently using JSON file storage. For production, consider:
- PostgreSQL (via Railway, Supabase)
- MongoDB (via MongoDB Atlas)
- Firebase Firestore

Update `backend/server.js` to use a database instead of file storage.

## Security Notes

- Never commit `.env` files
- Use strong JWT secrets
- Enable HTTPS in production
- Consider rate limiting for API endpoints
- Add input validation and sanitization
- Use environment-specific configurations

## Support

For issues or questions, check:
- Backend logs in your hosting dashboard
- Frontend build logs in Vercel/Netlify
- Browser console for frontend errors
- Network tab for API request/response details
