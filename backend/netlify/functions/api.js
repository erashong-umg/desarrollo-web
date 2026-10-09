import serverless from 'serverless-http'
import app from '../../src/app.js'
import { connectDB } from '../../src/config/db.js'

const manejador = serverless(app)

export async function handler(event, context) {
  // No esperar a que se cierre la conexión de Mongo para responder.
  context.callbackWaitsForEmptyEventLoop = false
  await connectDB()
  return manejador(event, context)
}
