// config.js
// Carga variables de entorno desde un archivo .env si existe (uso local, sin Docker).
// Dentro de contenedores Docker, las variables llegan vía docker-compose/`-e`, por lo
// que este archivo no es obligatorio para el funcionamiento de la aplicación.
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('Variables de entorno cargadas desde .env');
} else {
  console.log('No se encontró .env local; se usarán las variables de entorno del proceso/contenedor.');
}
