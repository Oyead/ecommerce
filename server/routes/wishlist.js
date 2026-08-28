import { Router } from 'express'
import { pool } from '../config/db.js'
import { protect } from '../middleware/auth.js'
import { fetchProduct } from '../config/external.js'

const router = Router()
router.use(protect)

// GET /api/wishlist
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT product_id FROM wishlist_items WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    )
    // Hydrate full product objects from the external API to match the frontend shape.
    const products = await Promise.all(
      rows.map(async (r) => {
        try {
          const p = await fetchProduct(r.product_id)
          return {
            id: p._id,
            _id: p._id,
            title: p.title,
            imageCover: p.imageCover,
            price: p.price,
            category: p.category,
          }
        } catch {
          return { id: r.product_id, _id: r.product_id }
        }
      })
    )
    res.json({ status: 'success', data: products, count: products.length })
  } catch (err) {
    next(err)
  }
})

// POST /api/wishlist  { productId }
router.post('/', async (req, res, next) => {
  try {
    const { productId } = req.body
    if (!productId) return res.status(400).json({ message: 'productId is required' })
    await fetchProduct(productId)
    await pool.query(
      `INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2)
       ON CONFLICT (user_id, product_id) DO NOTHING`,
      [req.user.id, productId]
    )
    res.status(201).json({ message: 'added to wishlist' })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/wishlist/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    await pool.query(
      'DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2',
      [req.user.id, req.params.productId]
    )
    res.json({ message: 'removed from wishlist' })
  } catch (err) {
    next(err)
  }
})

export default router
