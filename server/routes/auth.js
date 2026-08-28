import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { pool } from '../config/db.js'
import { signToken } from '../middleware/auth.js'

const router = Router()

// POST /api/auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, phone`,
      [name, email.toLowerCase().trim(), hashed, phone || null]
    )
    const user = result.rows[0]
    const token = signToken(user)
    res.status(201).json({ message: 'success', token, user })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Email already exists' })
    }
    next(err)
  }
})

// POST /api/auth/signin
router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    )
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is incorrect' })
    }
    const token = signToken(user)
    res.json({ message: 'success', token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } })
  } catch (err) {
    next(err)
  }
})

export default router
