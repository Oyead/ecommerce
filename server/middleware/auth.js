import jwt from 'jsonwebtoken'
import { pool } from '../config/db.js'

export async function protect(req, res, next) {
  try {
    const token = (req.headers.authorization || '').split(' ')[1] || req.headers.token
    if (!token) return res.status(401).json({ message: 'Not authorized, no token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { rows } = await pool.query(
      'SELECT id, name, email, phone FROM users WHERE id = $1',
      [decoded.id]
    )
    if (!rows[0]) return res.status(401).json({ message: 'Not authorized, user not found' })

    req.user = rows[0]
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, invalid token' })
  }
}

export function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}
