// server.js (Archivo principal de la API - Tarea 4, instrumentada para Tarea 6)
import './config.js';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectToMongoDB, getDbStatus } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const APP_COLOR = process.env.APP_COLOR || 'blue';
const INSTANCE_ID = process.env.HOSTNAME || 'local';

// Endpoint de salud: usado por Docker/Nginx para saber si el contenedor puede recibir tráfico.
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: APP_VERSION, color: APP_COLOR, instance: INSTANCE_ID });
});

app.get('/', (req, res) => {
  res.redirect('/api/v1');
});

app.get('/api/v1', (req, res) => {
  res.json({
    status: 'success',
    app: 'api-tarea4',
    version: APP_VERSION,
    color: APP_COLOR,
    instance: INSTANCE_ID,
    uri: process.env.MONGODB_URI ? 'Detectada' : 'No detectada',
    db: getDbStatus(),
  });
});

const PORT = process.env.PORT || 3000;

async function runServer() {
  try {
    await connectToMongoDB();
    app.listen(PORT, () =>
      console.log(`API v${APP_VERSION} (${APP_COLOR}) escuchando en http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error('Error de arranque');
  }
}

runServer();
