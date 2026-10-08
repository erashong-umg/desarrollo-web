import mongoose from 'mongoose'

export async function connectDB() {
  const { MONGODB_URI } = process.env

  if (!MONGODB_URI) {
    throw new Error('Falta la variable de entorno MONGODB_URI')
  }

  mongoose.connection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err.message)
  })

  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
  console.log(`MongoDB conectado: ${mongoose.connection.host}`)
}
