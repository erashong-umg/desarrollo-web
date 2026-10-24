import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
      throw new Error('Faltan variables de entorno esenciales (MONGODB_URI).');
    }

    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

    console.log('Conectado exitosamente a MongoDB');
    return mongoose;
  } catch (err) {
    console.error('Error crítico al conectar a MongoDB:');
    console.error(err.message);
    process.exit(1);
  }
}

export async function disconnectFromMongoDB() {
  try {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada de forma limpia');
  } catch (err) {
    console.error('Error al cerrar la conexión:', err);
  }
}

export function getDbStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] ?? 'unknown';
}
