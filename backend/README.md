# TecnoCore Guatemala — Backend (Tarea 4)

API REST construida con **Node.js + Express + Mongoose**, conectada a un clúster gratuito de **MongoDB Atlas**. Sirve de persistencia real para el frontend React de TecnoCore Guatemala (reemplaza los datos y la autenticación simulada de la Tarea 2/3).

## Arquitectura de carpetas

```
backend/
├── .env                  # Variables de entorno reales (NO se sube al repo)
├── .env.example          # Plantilla pública de variables de entorno
├── package.json
└── src/
    ├── server.js         # Punto de entrada: configura Express, CORS, rutas y arranca el servidor
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

> Nota: si tu red bloquea el puerto saliente 27017 (frecuente en redes corporativas), la conexión a Atlas fallará localmente aunque el código esté correcto. Prueba desde otra red o espera al despliegue en Render, cuyos servidores no tienen esa restricción.

## Endpoints

### Autenticación
| Método | Ruta                  | Body                                    | Respuesta éxito                              |
|--------|-----------------------|------------------------------------------|-----------------------------------------------|
| POST   | `/api/auth/register`  | `{ nombre, correo, password }`           | 201 `{ message, user }`                       |
| POST   | `/api/auth/login`     | `{ correo, password }`                   | 200 `{ message, user }`                       |

### Recursos (productos)
| Método | Ruta                   | Query / Body                                             | Respuesta éxito         |
|--------|------------------------|------------------------------------------------------------|---------------------------|
| GET    | `/api/recursos`        | `?categoria=&q=&featured=&disponibilidad=`                 | 200 `[producto, ...]`     |
| GET    | `/api/recursos/:id`    | —                                                            | 200 `producto`            |
| POST   | `/api/recursos`        | `{ code, name, category, price, ... }`                     | 201 `producto`            |
| PUT    | `/api/recursos/:id`    | campos a actualizar                                         | 200 `producto`            |
| PATCH  | `/api/recursos/:id`    | campos a actualizar                                         | 200 `producto`            |
| DELETE | `/api/recursos/:id`    | —                                                            | 200 `{ message, id }`     |

Ver `../postman_collection.json` para ejemplos completos de payloads y casos de error (401, 404, 409).

## Despliegue en Render

1. Crea un **Web Service** nuevo en Render apuntando a este repositorio, con *Root Directory* = `backend`.
2. Build command: `npm install`. Start command: `npm start`.
3. Variables de entorno en Render: `MONGODB_URI`, `CORS_ORIGIN` (la URL de Netlify/Vercel del frontend), `PORT` (Render la inyecta automáticamente, pero el código ya tiene fallback a 4000).
4. En MongoDB Atlas → Network Access, agrega `0.0.0.0/0` (o las IPs salientes de Render) para que el clúster acepte conexiones desde Render.
5. Una vez desplegado, actualiza `VITE_API_URL` en el frontend (`.env.production`) con la URL pública de Render + `/api`.
