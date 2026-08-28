// Vercel serverless entrypoint for the NeonDB-backed Express API.
// All /api/* requests are routed here via vercel.json.
import { app } from '../server/app.js'

export default app
