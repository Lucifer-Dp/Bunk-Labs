import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'bunklab_dev_secret_change_in_production'
const NODE_ENV = process.env.NODE_ENV || 'development'

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000']

app.use(cors({ 
  origin: NODE_ENV === 'production' ? corsOrigins : corsOrigins,
  credentials: true 
}))
app.use(express.json())

const dataDir = path.join(__dirname, 'data')
const usersFile = path.join(dataDir, 'users.json')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]))
}

const readUsers = () => {
  const raw = fs.readFileSync(usersFile, 'utf-8')
  return JSON.parse(raw)
}

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
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

  const users = readUsers()
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: 'Email already registered' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    passwordHash,
    points: 0,
    rank: null,
    level: 1,
    loginStreak: 0,
    lastLoginDate: null,
    tagline: '',
    college: '',
    avatar: '👨‍💻',
  }

  users.push(newUser)
  writeUsers(users)

  const token = createToken(newUser)
  const { passwordHash: _, ...safeUser } = newUser
  res.status(201).json({ user: safeUser, token })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const users = readUsers()
  const user = users.find((u) => u.email === email)
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = createToken(user)
  const { passwordHash: _, ...safeUser } = user
  res.json({ user: safeUser, token })
})

app.get('/api/user/me', authMiddleware, (req, res) => {
  const users = readUsers()
  const user = users.find((u) => u.id === req.user.id)
  if (!user) return res.status(404).json({ message: 'User not found' })
  const { passwordHash: _, ...safeUser } = user
  res.json({ user: safeUser })
})

app.listen(PORT, () => {
  console.log(`🚀 Bunk Lab backend listening on http://localhost:${PORT}`)
  console.log(`📦 Environment: ${NODE_ENV}`)
  if (NODE_ENV === 'production') {
    console.log(`🔒 CORS enabled for: ${corsOrigins.join(', ')}`)
  }
})

