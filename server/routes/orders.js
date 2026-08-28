import { Router } from 'express'
import { pool } from '../config/db.js'
import { protect } from '../middleware/auth.js'
import { fetchProduct } from '../config/external.js'

const router = Router()
router.use(protect)

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const { rows: orders } = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )
    for (const order of orders) {
      const { rows: items } = await pool.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [order.id]
      )
      order.items = items
    }
    res.json({ status: 'success', data: orders })
  } catch (err) {
    next(err)
  }
})

// POST /api/orders
// body: { shippingAddress: { name, details, city, phone }, paymentMethod }
// Moves cart items into an order, snapshots product info from the cart rows.
router.post('/', async (req, res, next) => {
  const client = await pool.connect()
  try {
    const { shippingAddress = {} } = req.body
    const { name, details, city, phone } = shippingAddress
    if (!details || !city) {
      return res.status(400).json({ message: 'shippingAddress.details and city are required' })
    }

    await client.query('BEGIN')

    const { rows: cartItems } = await client.query(
      `SELECT ci.product_id, ci.count, ci.price
       FROM cart_items ci
       WHERE ci.user_id = $1`,
      [req.user.id]
    )

    if (!cartItems.length) {
      await client.query('ROLLBACK')
      return res.status(400).json({ message: 'Cart is empty' })
    }

    // Snapshot product title/image from the external API for the order record.
    for (const item of cartItems) {
      try {
        const prod = await fetchProduct(item.product_id)
        item.title = prod.title
        item.image_cover = prod.imageCover
      } catch {
        item.title = null
        item.image_cover = null
      }
    }

    const totalPrice = cartItems.reduce((s, i) => s + Number(i.price) * i.count, 0)

    const { rows: [order] } = await client.query(
      `INSERT INTO orders (user_id, total_price, payment_method, payment_status,
         address_name, address_details, address_city, address_phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        req.user.id, totalPrice,
        req.body.paymentMethod || 'card', 'pending',
        name || null, details, city, phone || null,
      ]
    )

    for (const item of cartItems) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, title, image_cover, price, count)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.title, item.image_cover, item.price, item.count]
      )
    }

    await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id])
    await client.query('COMMIT')

    res.status(201).json({ status: 'success', data: order })
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    next(err)
  } finally {
    client.release()
  }
})

export default router
