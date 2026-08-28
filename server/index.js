import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import cartRoutes from './routes/cart.js'
import wishlistRoutes from './routes/wishlist.js'
import ordersRoutes from './routes/orders.js'
import addressesRoutes from './routes/addresses.js'
import { pool } from './config/db.js'

const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true, credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/addresses', addressesRoutes)

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected' })
  }
})

app.use((req, res) => res.status(404).json({ message: 'Not found' }))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
