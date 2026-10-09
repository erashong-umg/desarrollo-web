# TecnoCore Guatemala — Backend (Tarea 4)

API REST construida con **Node.js + Express + Mongoose**, conectada a un clúster gratuito de **MongoDB Atlas**. Sirve de persistencia real para el frontend React de TecnoCore Guatemala (reemplaza los datos y la autenticación simulada de la Tarea 2/3).

## Arquitectura de carpetas
## https://erashong-tarea4-tecnocore.netlify.app/
```
backend/
├── .env                  # Variables de entorno reales (NO se sube al repo)
├── .env.example          # Plantilla pública de variables de entorno
├── package.json
├── netlify/
│   └── functions/
│       └── api.js        # Envuelve la app Express con serverless-http para Netlify Functions
└── src/
    ├── app.js            # Configura Express, CORS y rutas (sin levantar el servidor)
    ├── server.js         # Punto de entrada local: conecta a MongoDB y arranca el servidor
    ├── config/
    │   └── db.js         # Conexión a MongoDB Atlas vía Mongoose + manejo de errores de conexión
    ├── models/
    │   ├── User.js        # Esquema de usuario (nombre, correo, password hasheado, rol, timestamps)
    │   └── Producto.js     # Esquema del recurso de negocio (catálogo de productos)
    ├── controllers/
    │   ├── authController.js      # Lógica de registro / login
    │   └── productoController.js  # Lógica CRUD de productos
    ├── routes/
    │   ├── authRoutes.js          # POST /api/auth/register, /api/auth/login
    │   └── productoRoutes.js      # GET/POST/PUT/PATCH/DELETE /api/recursos
    ├── middleware/
    │   ├── asyncHandler.js        # Envuelve controladores async y reenvía errores a Express
    │   └── errorHandler.js        # Middleware central de errores (404, validación, duplicados)
    └── seed/
        └── seedProductos.js       # Script para poblar MongoDB con el catálogo inicial (20 productos)
```

Separación de responsabilidades:
- **config/** → conexión a la base de datos.
- **models/** → esquemas y validaciones de Mongoose.
- **controllers/** → lógica de negocio por recurso.
- **routes/** → mapeo de endpoints HTTP a controladores.
- **middleware/** → utilidades transversales (manejo de errores).
- **seed/** → scripts de datos iniciales, no forma parte del runtime de la API.

## Variables de entorno (`.env`)

| Variable       | Descripción                                                        |
|----------------|---------------------------------------------------------------------|
| `MONGODB_URI`  | Cadena de conexión de MongoDB Atlas (usuario, password y clúster)  |
| `PORT`         | Puerto local del servidor (default `4000`)                         |
| `CORS_ORIGIN`  | Orígenes permitidos por CORS, separados por coma                   |

Copia `.env.example` a `.env` y completa tus propios valores. **Nunca subas `.env` al repositorio** (ya está en `.gitignore`).

## Instalación y ejecución local

```bash
cd backend
npm install
cp .env.example .env   # y completa MONGODB_URI
npm run seed            # puebla la colección de productos (una sola vez)
npm run dev              # levanta el servidor con nodemon en http://localhost:4000
```

> Nota: si tu red bloquea el puerto saliente 27017 (frecuente en redes corporativas), la conexión a Atlas fallará localmente aunque el código esté correcto. Prueba desde otra red o usa la versión publicada en Netlify.

## Endpoints

### Autenticación
## Endpoints

### Autenticación

| Método | Ruta                                                                                    | Body                           | Respuesta éxito         |
| ------ | --------------------------------------------------------------------------------------- | ------------------------------ | ----------------------- |
| POST   | [`/api/auth/register`](https://erashong-tarea4-tecnocore.netlify.app/api/auth/register) | `{ nombre, correo, password }` | 201 `{ message, user }` |
| POST   | [`/api/auth/login`](https://erashong-tarea4-tecnocore.netlify.app/api/auth/login)       | `{ correo, password }`         | 200 `{ message, user }` |

### Recursos (productos)

| Método | Ruta                                                                                  | Query / Body                               | Respuesta éxito       |
| ------ | ------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------- |
| GET    | [`/api/recursos`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos)         | `?categoria=&q=&featured=&disponibilidad=` | 200 `[producto, ...]` |
| GET    | [`/api/recursos/:id`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos/:id) | —                                          | 200 `producto`        |
| POST   | [`/api/recursos`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos)         | `{ code, name, category, price, ... }`     | 201 `producto`        |
| PUT    | [`/api/recursos/:id`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos/:id) | Campos a actualizar                        | 200 `producto`        |
| PATCH  | [`/api/recursos/:id`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos/:id) | Campos a actualizar                        | 200 `producto`        |
| DELETE | [`/api/recursos/:id`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos/:id) | —                                          | 200 `{ message, id }` |


## Despliegue en Netlify (Functions)

La API se publica junto con el frontend en el sitio `erashong-tarea4-tecnocore`:

- `netlify.toml` (raíz del repo) instala las dependencias del backend (`npm ci --prefix backend`), compila el frontend y empaqueta `backend/netlify/functions/api.js`.
- Las peticiones a `/api/*` se redirigen a la función, que ejecuta la misma app Express de `src/app.js`. Como frontend y API comparten dominio, `VITE_API_URL=/api` y no hace falta configurar CORS.
- Variable de entorno en Netlify: `MONGODB_URI` (con el nombre de la base, `.../tecnocore?...`).
- En MongoDB Atlas → Network Access debe estar permitido `0.0.0.0/0`, porque las funciones no tienen IP fija.
- Publicar desde la raíz del repo: `npx netlify-cli deploy --build --prod`.
