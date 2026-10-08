import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productoRoutes from './routes/productoRoutes.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN ?? '').split(',').map((o) => o.trim()).filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  }),
)
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({ status: 'ok', nombre: 'TecnoCore Guatemala API' })
})

app.use('/api/auth', authRoutes)
app.use('/api/recursos', productoRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`))
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message)
    process.exit(1)
  }
}

start()
