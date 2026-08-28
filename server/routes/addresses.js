import { Router } from 'express'
import { pool } from '../config/db.js'
import { protect } from '../middleware/auth.js'

const router = Router()
router.use(protect)

// GET /api/addresses
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC',
      [req.user.id]
    )
    res.json({ status: 'success', data: rows })
  } catch (err) {
    next(err)
  }
})

// POST /api/addresses  { name, details, city, phone, isDefault }
router.post('/', async (req, res, next) => {
  const client = await pool.connect()
  try {
    const { name, details, city, phone, isDefault } = req.body
    if (!details || !city) {
      return res.status(400).json({ message: 'details and city are required' })
    }
    await client.query('BEGIN')
    if (isDefault) {
      await client.query('UPDATE addresses SET is_default = false WHERE user_id = $1', [req.user.id])
    }
    const { rows: [addr] } = await client.query(
      `INSERT INTO addresses (user_id, name, details, city, phone, is_default)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, name || 'Home', details, city, phone || null, !!isDefault]
    )
    await client.query('COMMIT')
    res.status(201).json({ message: 'added', data: addr })
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    next(err)
  } finally {
    client.release()
  }
})

// DELETE /api/addresses/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    )
    res.json({ message: rows[0] ? 'removed' : 'not found', data: rows[0] || null })
  } catch (err) {
    next(err)
  }
})

export default router
