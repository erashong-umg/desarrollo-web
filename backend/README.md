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
    │   ├── authController.js      # Lógica de registro / login + firma de JWT
    │   └── productoController.js  # Lógica CRUD de productos
    ├── routes/
    │   ├── authRoutes.js          # POST /api/auth/register, /api/auth/login
    │   └── productoRoutes.js      # GET/POST/PUT/PATCH/DELETE /api/recursos
    ├── middleware/
    │   ├── asyncHandler.js        # Envuelve controladores async y reenvía errores a Express
    │   ├── auth.js                # requireAuth: valida el JWT del header Authorization (Tarea 5)
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

| Variable          | Descripción                                                              |
|-------------------|---------------------------------------------------------------------------|
| `MONGODB_URI`     | Cadena de conexión de MongoDB Atlas (usuario, password y clúster)        |
| `PORT`            | Puerto local del servidor (default `4000`)                               |
| `CORS_ORIGIN`     | Orígenes permitidos por CORS, separados por coma                         |
| `JWT_SECRET`      | Clave secreta para firmar/verificar los JSON Web Tokens (Tarea 5)        |
| `JWT_EXPIRES_IN`  | Tiempo de vida del token. Política de la Tarea 5: `5m` (5 minutos exactos) |

Copia `.env.example` a `.env` y completa tus propios valores. **Nunca subas `.env` al repositorio** (ya está en `.gitignore`). Genera un `JWT_SECRET` propio, por ejemplo con:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Autenticación con JSON Web Token (Tarea 5)

La API pasó de un esquema sin sesión (Tarea 4) a autenticación **stateless** con JWT:

1. **Emisión del token** — `POST /api/auth/login` (y también `POST /api/auth/register`, para que el alta quede
   autenticada de inmediato) validan las credenciales y firman un JWT con `jsonwebtoken`:
   ```js
   jwt.sign({ id: user.id, email: user.correo, role: user.rol }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRES_IN || '5m',
   })
   ```
   El payload incluye `id`, `email` y `role` del usuario. La respuesta agrega `token` junto al `user` ya existente:
   `{ message, token, user }`.

2. **Expiración estricta de 5 minutos** — se configura con la variable de entorno `JWT_EXPIRES_IN=5m`, nunca
   hardcodeada en el código; `jsonwebtoken` calcula el `exp` del payload a partir de ese valor en el momento de
   firmar.

3. **Middleware `requireAuth`** (`src/middleware/auth.js`) — se aplica a las rutas mutables de `/api/recursos`
   (`POST`, `PUT`, `PATCH`, `DELETE`); las lecturas (`GET`) siguen siendo públicas porque el catálogo es de
   acceso libre para el storefront. El middleware:
   - Exige el header `Authorization: Bearer <token>`; si falta o está mal formado responde `401`
     `{ "error": "unauthorized", "message": "No se proporcionó un token de autenticación." }`.
   - Verifica la firma con `jwt.verify(token, process.env.JWT_SECRET)`.
   - Si `jwt.verify` lanza `TokenExpiredError` (token vencido tras los 5 minutos), responde `401`
     `{ "error": "token_expired", "message": "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente." }`.
   - Cualquier otro error de verificación (firma inválida, token manipulado) responde `401`
     `{ "error": "invalid_token", "message": "El token de autenticación no es válido." }`.
   - Si el token es válido, decodifica el payload en `req.user` y continúa con `next()`.

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

| Método | Ruta                                                                                    | Body                           | Respuesta éxito                 |
| ------ | --------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------- |
| POST   | [`/api/auth/register`](https://erashong-tarea4-tecnocore.netlify.app/api/auth/register) | `{ nombre, correo, password }` | 201 `{ message, token, user }` |
| POST   | [`/api/auth/login`](https://erashong-tarea4-tecnocore.netlify.app/api/auth/login)       | `{ correo, password }`         | 200 `{ message, token, user }` |

### Recursos (productos)

`GET` es público. `POST`, `PUT`, `PATCH` y `DELETE` requieren el header `Authorization: Bearer <token>`; sin él,
o con un token vencido/ inválido, responden `401`.

| Método | Ruta                                                                                  | Query / Body                               | Auth | Respuesta éxito       | Respuesta sin token / vencido |
| ------ | ------------------------------------------------------------------------------------- | ------------------------------------------ | :--: | --------------------- | ------------------------------ |
| GET    | [`/api/recursos`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos)         | `?categoria=&q=&featured=&disponibilidad=` |  —  | 200 `[producto, ...]` | —                               |
| GET    | [`/api/recursos/:id`](https://erashong-tarea4-tecnocore.netlify.app/api/recursos/:id) | —                                          |  —  | 200 `producto`        | —                               |
| POST   | `/api/recursos`                                                                       | `{ code, name, category, price, ... }`     | Sí  | 201 `producto`        | 401 `{ error, message }`        |
| PUT    | `/api/recursos/:id`                                                                   | Campos a actualizar                        | Sí  | 200 `producto`        | 401 `{ error, message }`        |
| PATCH  | `/api/recursos/:id`                                                                   | Campos a actualizar                        | Sí  | 200 `producto`        | 401 `{ error, message }`        |
| DELETE | `/api/recursos/:id`                                                                   | —                                          | Sí  | 200 `{ message, id }` | 401 `{ error, message }`        |


## Despliegue en Netlify (Functions)

La API se publica junto con el frontend en el sitio `erashong-tarea4-tecnocore`:

- `netlify.toml` (raíz del repo) instala las dependencias del backend (`npm ci --prefix backend`), compila el frontend y empaqueta `backend/netlify/functions/api.js`.
- Las peticiones a `/api/*` se redirigen a la función, que ejecuta la misma app Express de `src/app.js`. Como frontend y API comparten dominio, `VITE_API_URL=/api` y no hace falta configurar CORS.
- Variable de entorno en Netlify: `MONGODB_URI` (con el nombre de la base, `.../tecnocore?...`).
- En MongoDB Atlas → Network Access debe estar permitido `0.0.0.0/0`, porque las funciones no tienen IP fija.
- Publicar desde la raíz del repo: `npx netlify-cli deploy --build --prod`.
