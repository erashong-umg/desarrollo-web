import mongoose from 'mongoose'

// Se guarda la promesa para reutilizar la conexión entre invocaciones de la función serverless.
let conexion = null

export function connectDB() {
  const { MONGODB_URI } = process.env
  if (!MONGODB_URI) {
    return Promise.reject(new Error('Falta la variable de entorno MONGODB_URI'))
  }

  if (!conexion) {
    mongoose.connection.on('error', (err) => {
      console.error('Error de conexión a MongoDB:', err.message)
    })

    conexion = mongoose
      .connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
      .then(() => {
        console.log(`MongoDB conectado: ${mongoose.connection.host}`)
        return mongoose.connection
      })
      .catch((err) => {
        conexion = null
        throw err
      })
  }

  return conexion
}
