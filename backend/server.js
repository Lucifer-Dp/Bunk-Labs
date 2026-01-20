import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import pkg from 'pg'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'bunklab_dev_secret_change_in_production'
const NODE_ENV = process.env.NODE_ENV || 'development'
const DATABASE_URL = process.env.DATABASE_URL

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000']

app.use(cors({ 
  origin: NODE_ENV === 'production' ? corsOrigins : corsOrigins,
  credentials: true 
}))
app.use(express.json())

// --- Database (Postgres) ---
const { Pool } = pkg
if (!DATABASE_URL) {
  console.warn('DATABASE_URL not set. Set it to your Neon connection string.')
}
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL ? { rejectUnauthorized: false } : false,
})

// Ensure users table exists
const ensureUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      points INT DEFAULT 0,
      rank INT,
      level INT DEFAULT 1,
      login_streak INT DEFAULT 0,
      last_login_date TIMESTAMPTZ,
      tagline TEXT,
      college TEXT,
      avatar TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)
}

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' })

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ message: 'No token provided' })

  const [, token] = header.split(' ')
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Bunk Lab backend running' })
})

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' })
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rowCount > 0) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const insert = await pool.query(
      `INSERT INTO users (name, email, password_hash, points, rank, level, login_streak, last_login_date, tagline, college, avatar)
       VALUES ($1,$2,$3,0,NULL,1,0,NULL,'','', '👨‍💻')
       RETURNING id, name, email, points, rank, level, login_streak AS "loginStreak", last_login_date AS "lastLoginDate", tagline, college, avatar`,
      [name, email, passwordHash]
    )

    const user = insert.rows[0]
    const token = createToken(user)
    res.status(201).json({ user, token })
  } catch (err) {
    console.error('Signup error', err)
    res.status(500).json({ message: 'Server error during signup' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const result = await pool.query(
      `SELECT id, name, email, password_hash, points, rank, level, login_streak AS "loginStreak", last_login_date AS "lastLoginDate", tagline, college, avatar
       FROM users WHERE email = $1`,
      [email]
    )
    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = result.rows[0]
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    delete user.password_hash
    const token = createToken(user)
    res.json({ user, token })
  } catch (err) {
    console.error('Login error', err)
    res.status(500).json({ message: 'Server error during login' })
  }
})

app.get('/api/user/me', authMiddleware, (req, res) => {
  pool
    .query(
      `SELECT id, name, email, points, rank, level, login_streak AS "loginStreak", last_login_date AS "lastLoginDate", tagline, college, avatar
       FROM users WHERE id = $1`,
      [req.user.id]
    )
    .then((result) => {
      if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' })
      res.json({ user: result.rows[0] })
    })
    .catch((err) => {
      console.error('Get user error', err)
      res.status(500).json({ message: 'Server error' })
    })
})

// Start server after ensuring table exists
ensureUsersTable()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Bunk Lab backend listening on http://localhost:${PORT}`)
      console.log(`📦 Environment: ${NODE_ENV}`)
      if (NODE_ENV === 'production') {
        console.log(`🔒 CORS enabled for: ${corsOrigins.join(', ')}`)
      }
    })
  })
  .catch((err) => {
    console.error('Failed to ensure users table', err)
    process.exit(1)
  })

