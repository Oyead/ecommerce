import { Router } from 'express'
import { pool } from '../config/db.js'
import { protect } from '../middleware/auth.js'
import { fetchProduct } from '../config/external.js'

const router = Router()
router.use(protect)

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM cart_items WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    )

    // Hydrate title/image from the external product API (source of truth).
    const products = await Promise.all(
      rows.map(async (item) => {
        let title = null
        let imageCover = null
        try {
          const prod = await fetchProduct(item.product_id)
          title = prod.title
          imageCover = prod.imageCover
        } catch {
          // product may be unavailable; keep stored snapshot fields
        }
        return {
          product: { _id: item.product_id, title, imageCover },
          price: Number(item.price),
          count: item.count,
        }
      })
    )

    const totalCartPrice = products.reduce((s, p) => s + p.price * p.count, 0)
    const numOfCartItems = products.reduce((s, p) => s + p.count, 0)

    res.json({
      status: 'success',
      data: { _id: null, cartId: null, numOfCartItems, totalCartPrice, products },
      numOfCartItems,
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/cart  { productId }
router.post('/', async (req, res, next) => {
  try {
    const { productId } = req.body
    if (!productId) return res.status(400).json({ message: 'productId is required' })

    const product = await fetchProduct(productId)
    const price = Number(product.price)

    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, count, price)
       VALUES ($1, $2, 1, $3)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET count = cart_items.count + 1, price = EXCLUDED.price
       RETURNING *`,
      [req.user.id, productId, price]
    )
    res.status(201).json({ message: 'added to cart', data: result.rows[0] })
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/:productId  { count }
router.put('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params
    const count = Number(req.body.count)
    if (!count || count < 1) return res.status(400).json({ message: 'count must be >= 1' })

    const { rows } = await pool.query(
      `UPDATE cart_items SET count = $1
       WHERE user_id = $2 AND product_id = $3
       RETURNING *`,
      [count, req.user.id, productId]
    )
    if (!rows[0]) return res.status(404).json({ message: 'Item not in cart' })
    res.json({ message: 'updated', data: rows[0] })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [req.user.id, req.params.productId]
    )
    res.json({ message: rows[0] ? 'removed' : 'not found', data: rows[0] || null })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart  (clear)
router.delete('/', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id])
    res.json({ message: 'cart cleared', numOfCartItems: 0 })
  } catch (err) {
    next(err)
  }
})

export default router
