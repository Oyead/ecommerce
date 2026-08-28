import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pg from 'pg'

const { Pool } = pg
const __dirname = dirname(fileURLToPath(import.meta.url))

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')

async function migrate() {
  const client = await pool.connect()
  try {
    console.log('Connecting to NeonDB...')
    await client.query(schema)
    console.log('Schema applied successfully.')
  } catch (err) {
    console.error('Migration failed:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
