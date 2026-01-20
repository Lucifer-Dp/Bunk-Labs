# Netlify Deployment - Quick Fix Guide

## The Problem
You're seeing "Failed to fetch" or "ERR_CONNECTION_REFUSED" because your frontend is trying to connect to `localhost:4000`, which doesn't exist on Netlify.

## Solution Options

### Option 1: Deploy Backend First (Recommended)

1. **Deploy Backend to Render/Railway:**
   - Go to https://render.com or https://railway.app
   - Connect your GitHub repo
   - Create a new Web Service
   - Set root directory to `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables:
     ```
     NODE_ENV=production
     JWT_SECRET=your-strong-secret-key-here
     CORS_ORIGINS=https://your-netlify-site.netlify.app
     ```
   - Copy your backend URL (e.g., `https://bunklab-api.onrender.com`)

2. **Update Netlify Environment Variable:**
   - Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
   - Add/Update:
     - Key: `VITE_API_URL`
     - Value: Your backend URL (e.g., `https://bunklab-api.onrender.com`)
   - Click "Save"
   - Go to Deploys → Trigger deploy → Clear cache and deploy site

### Option 2: Test Locally First

If you want to test before deploying backend:

1. **Start Backend Locally:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend should run on `http://localhost:4000`

2. **Start Frontend Locally:**
   ```bash
   # In root directory
   npm run dev
   ```
   Frontend will use `http://localhost:4000` automatically

3. **Test signup/login** - should work locally

### Option 3: Temporary Workaround (Not Recommended)

If you just want to see the frontend without backend functionality, you can temporarily disable API calls, but this won't allow signup/login to work.

## Verify It's Working

After setting `VITE_API_URL` in Netlify:

1. Check the built files - open browser console on your Netlify site
2. Look for network requests - they should go to your backend URL, not localhost
3. Try signing up - should work if backend is deployed and CORS is configured

## Common Issues

- **Still seeing localhost:** Clear browser cache and hard refresh (Ctrl+Shift+R)
- **CORS errors:** Make sure backend `CORS_ORIGINS` includes your Netlify URL
- **404 errors:** Check backend URL is correct and backend is running
- **Environment variable not working:** Make sure variable name starts with `VITE_` and redeploy after adding it
