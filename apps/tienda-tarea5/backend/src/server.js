import 'dotenv/config'
import dns from 'node:dns'
import { connectDB } from './config/db.js'
import app from './app.js'

// Resolver DNS públicos para que las consultas SRV de mongodb+srv funcionen en redes restrictivas.
dns.setServers(['8.8.8.8', '1.1.1.1'])

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
