import express from 'express'
import cors from 'cors'
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

// En Netlify la petición llega reescrita a /.netlify/functions/api/*; se normaliza a /api/*.
app.use((req, res, next) => {
  const prefijoFuncion = '/.netlify/functions/api'
  if (req.url.startsWith(prefijoFuncion)) {
    req.url = `/api${req.url.slice(prefijoFuncion.length)}`
  }
  next()
})

app.get('/api', (req, res) => {
  res.json({ status: 'ok', nombre: 'TecnoCore Guatemala API' })
})

// Instrumentación agregada en la Tarea 6 para evidenciar qué versión/instancia
// del backend está respondiendo durante las pruebas de despliegue (canary).
app.get('/api/version', (req, res) => {
  res.json({
    status: 'ok',
    version: process.env.APP_VERSION || '1.0.0',
    color: process.env.APP_COLOR || 'blue',
    instance: process.env.HOSTNAME || 'local',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/recursos', productoRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
