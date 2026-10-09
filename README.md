# TecnoCore Guatemala

Ecommerce académico de computadoras, componentes y periféricos. La Tarea 1 se construyó con HTML nativo puro; en
la Tarea 2 el sitio se reconstruyó como una aplicación **React** (Vite) componentizada, con **React-Bootstrap**
para el diseño y **React Router** para la navegación entre secciones. En la **Tarea 4** (rama `Tarea4`) el sitio
evolucionó a una arquitectura full-stack real: un backend propio en **Node.js + Express + MongoDB Atlas**
(carpeta `backend/`) reemplaza los datos estáticos y el login simulado, y el frontend consume esa API con
`fetch` y sincroniza las respuestas con el estado global (`useContext` + `useReducer`).

## Enlaces

| Recurso | Enlace |
|---|---|
| Sitio publicado (Tarea 4) | [erashong-tarea4-tecnocore.netlify.app](https://erashong-tarea4-tecnocore.netlify.app/) |
| API REST (estado) | [erashong-tarea4-tecnocore.netlify.app/api](https://erashong-tarea4-tecnocore.netlify.app/api) |
| Listado de productos (JSON) | [erashong-tarea4-tecnocore.netlify.app/api/recursos](https://erashong-tarea4-tecnocore.netlify.app/api/recursos) |
| Repositorio (rama `Tarea4`) | [github.com/erashong-umg/desarrollo-web/tree/Tarea4](https://github.com/erashong-umg/desarrollo-web/tree/Tarea4) |
| Colección de pruebas | [`postman_collection.json`](./postman_collection.json) |
| Documentación del backend | [`backend/README.md`](./backend/README.md) |
| Versión de la Tarea 2 | [erashong-tarea2-tecnocore.netlify.app](https://erashong-tarea2-tecnocore.netlify.app/) |

El frontend (React) y el backend (Express) se publican juntos en Netlify: la API corre como una
**Netlify Function** en el mismo dominio, bajo la ruta `/api`, y se conecta a la base `tecnocore` de
MongoDB Atlas.

## Estudiante

- **Nombre:** **Erick Orlando Rashón González**
- **Carné:** **9490 11 5609**
- **Sección:** **B**
- **Trabajo individual.** Todos los módulos y componentes fueron desarrollados por el mismo estudiante:
  estructura de la aplicación (React Router, Layout, Navbar, Footer), contexto del carrito de compras, páginas de
  Inicio, Catálogo, Categorías, Detalle de producto, Carrito, Registro y Contacto, estilos con React-Bootstrap, y
  en la Tarea 4 el backend completo (modelos, controladores, rutas, conexión a MongoDB Atlas) y la integración del
  frontend con la API (autenticación real, CRUD de productos, perfil de usuario).

## Tarea 4 — Backend y persistencia real

- **Nuevas páginas del frontend:** `/login` (inicio de sesión real), `/perfil` (datos del usuario autenticado
  desde MongoDB), `/admin/productos` (CRUD de catálogo, solo rol `admin`).
- **Variables de entorno del frontend:** `.env.development` (`http://localhost:4000/api`) y `.env.production`
  (`/api`) definen `VITE_API_URL`. Todas las peticiones pasan por `src/services/api.js`.

## Endpoints de la API

- **Producción:** `https://erashong-tarea4-tecnocore.netlify.app/api`
- **Local:** `http://localhost:4000/api`

Todas las respuestas son JSON. Los errores devuelven `{ "message": "..." }`.

### General

| Método | Endpoint | Respuesta | Probar |
|---|---|---|---|
| GET | `/api` | 200 `{ status, nombre }` | [abrir](https://erashong-tarea4-tecnocore.netlify.app/api) |

### Autenticación — `/api/auth`

| Método | Endpoint | Body | Respuestas | Usado en el frontend |
|---|---|---|---|---|
| POST | `/api/auth/register` | `{ nombre, correo, password }` | 201 `{ message, user }` · 400 faltan campos · 409 correo ya registrado | `/registro` (`AuthContext.register`) |
| POST | `/api/auth/login` | `{ correo, password }` | 200 `{ message, user }` · 400 faltan campos · 401 credenciales inválidas | `/login` (`AuthContext.login`) |

### Productos — `/api/recursos`

| Método | Endpoint | Query / Body | Respuestas | Usado en el frontend | Probar |
|---|---|---|---|---|---|
| GET | `/api/recursos` | — | 200 `[producto, ...]` | Carga global del catálogo (`ProductsContext`): Inicio, Categorías, Carrito, Admin | [abrir](https://erashong-tarea4-tecnocore.netlify.app/api/recursos) |
| GET | `/api/recursos?categoria=` | `categoria` = slug de categoría | 200 lista filtrada | `/catalogo` (filtro por categoría) | [laptops](https://erashong-tarea4-tecnocore.netlify.app/api/recursos?categoria=laptops) |
| GET | `/api/recursos?q=` | `q` = texto en nombre, specs o código | 200 lista filtrada | `/catalogo` (buscador) | [ryzen](https://erashong-tarea4-tecnocore.netlify.app/api/recursos?q=ryzen) |
| GET | `/api/recursos?featured=` | `featured=true` | 200 destacados | — | [destacados](https://erashong-tarea4-tecnocore.netlify.app/api/recursos?featured=true) |
| GET | `/api/recursos?disponibilidad=` | `En existencia` · `Últimas unidades` · `Agotado` | 200 lista filtrada | — | [en existencia](https://erashong-tarea4-tecnocore.netlify.app/api/recursos?disponibilidad=En%20existencia) |
| GET | `/api/recursos/:id` | — | 200 `producto` · 404 no existe | `/producto/:id` (detalle) | [PC Gamer Nova](https://erashong-tarea4-tecnocore.netlify.app/api/recursos/6ac7ae4c729b47df5bfbdb5c) |
| POST | `/api/recursos` | `{ code, name, category, price, ... }` | 201 `producto` · 400 validación · 409 código repetido | `/admin/productos` (crear) | Postman |
| PUT | `/api/recursos/:id` | campos a actualizar | 200 `producto` · 404 | `/admin/productos` (editar) | Postman |
| PATCH | `/api/recursos/:id` | campos a actualizar | 200 `producto` · 404 | — | Postman |
| DELETE | `/api/recursos/:id` | — | 200 `{ message, id }` · 404 | `/admin/productos` (eliminar) | Postman |

Slugs de categoría: `escritorio`, `laptops`, `procesadores`, `tarjetas-graficas`, `tarjetas-madre`,
`memoria-ram`, `almacenamiento`, `monitores`, `perifericos`, `redes`.

Para probar los endpoints `POST`, `PUT`, `PATCH` y `DELETE`, importa
[`postman_collection.json`](./postman_collection.json) en Postman o Thunder Client y cambia la variable
`baseUrl` a `https://erashong-tarea4-tecnocore.netlify.app/api`.

### Cómo comprobar que el sitio usa la API

1. Abre el [catálogo](https://erashong-tarea4-tecnocore.netlify.app/catalogo), presiona **F12 → Network → Fetch/XHR** y recarga: aparece la petición
   `recursos` con estado 200 y los productos con el `id` generado por MongoDB.
2. Inicia sesión en [/login](https://erashong-tarea4-tecnocore.netlify.app/login) con una contraseña incorrecta: la petición `POST /api/auth/login`
   responde 401 y el mensaje se muestra en pantalla.
3. Cambia el precio de un producto directamente en MongoDB Atlas (`tecnocore → productos`) y recarga el
   catálogo: el precio nuevo aparece en el sitio.

## Tecnologías

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) para el ruteo entre páginas
- [React-Bootstrap](https://react-bootstrap.netlify.app/) + [Bootstrap 5](https://getbootstrap.com/) para diseño y componentes
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) para la API REST
- [Mongoose](https://mongoosejs.com/) + [MongoDB Atlas](https://www.mongodb.com/atlas) para la persistencia
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) para el hash de contraseñas
- [Netlify](https://www.netlify.com/) (sitio estático + Netlify Functions con `serverless-http`) para el despliegue

## Páginas y componentes incluidos

1. **Inicio** (`/`) — bienvenida, `Carousel` con productos destacados, cuadrícula de `Card` de productos y
   suscripción al boletín.
2. **Catálogo** (`/catalogo`) — búsqueda y filtro funcional por texto/categoría, tabla (`Table`) de 20 productos con
   `Badge` de disponibilidad y botón para agregar al carrito.
3. **Categorías** (`/categorias`) — 10 categorías en un `Accordion` con `ListGroup` de productos y enlaces al
   catálogo filtrado.
4. **Detalle de producto** (`/producto/:id`) — ficha técnica con `Table` de especificaciones, `Badge` de estado,
   `Accordion` de información de entrega y control de cantidad.
5. **Carrito** (`/carrito`) — tabla editable (cantidad/quitar) conectada al `CartContext`, formulario de datos de
   entrega y `Modal` de confirmación de pedido simulado.
6. **Crear cuenta** (`/registro`) — formulario de registro con validación que crea el usuario en MongoDB (`POST /api/auth/register`).
7. **Contacto** (`/contacto`) — formulario de consulta y preguntas frecuentes en `Accordion`.

El `Navbar` (responsivo, con menú colapsable) y el `Footer` (con los datos del estudiante) son componentes
reutilizables presentes en todas las páginas mediante un `Layout` compartido.

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build

# Backend (en otra terminal)
cd backend
npm install
cp .env.example .env   # completar MONGODB_URI con .../tecnocore?...
npm run seed           # carga los 20 productos iniciales
npm run dev            # API en http://localhost:4000/api
```

## Despliegue en Netlify

- **Sitio:** `erashong-tarea4-tecnocore`
- **Build command:** `npm ci --prefix backend && npm run build` (definido en `netlify.toml`)
- **Publish directory:** `dist` · **Functions directory:** `backend/netlify/functions`
- **Variable de entorno:** `MONGODB_URI` (cadena de MongoDB Atlas con la base `tecnocore`)
- `netlify.toml` redirige `/api/*` a la función de la API y el resto (`/* -> /index.html`) a React Router,
  para que las rutas funcionen al recargar o compartir un enlace directo.
- Publicar desde la raíz del repo: `npx netlify-cli deploy --build --prod`
