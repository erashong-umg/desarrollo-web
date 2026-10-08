# TecnoCore Guatemala

Ecommerce académico de computadoras, componentes y periféricos. La Tarea 1 se construyó con HTML nativo puro; en
la Tarea 2 el sitio se reconstruyó como una aplicación **React** (Vite) componentizada, con **React-Bootstrap**
para el diseño y **React Router** para la navegación entre secciones. En la **Tarea 4** (rama `Tarea4`) el sitio
evolucionó a una arquitectura full-stack real: un backend propio en **Node.js + Express + MongoDB Atlas**
(carpeta `backend/`) reemplaza los datos estáticos y el login simulado, y el frontend consume esa API con
`fetch` y sincroniza las respuestas con el estado global (`useContext` + `useReducer`).

## Sitios publicados

- **Frontend (Netlify):** [Ver TecnoCore Guatemala](https://erashong-tarea2-tecnocore.netlify.app/) — *pendiente de redeploy sobre la rama `Tarea4` con `VITE_API_URL` apuntando al backend en Render.*
- **Backend (Render):** *pendiente de desplegar — ver instrucciones en [`backend/README.md`](./backend/README.md).*

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

- **Arquitectura y endpoints del backend:** ver [`backend/README.md`](./backend/README.md).
- **Colección de pruebas de endpoints:** [`postman_collection.json`](./postman_collection.json) (importar en Postman o Thunder Client).
- **Nuevas páginas del frontend:** `/login` (inicio de sesión real), `/perfil` (datos del usuario autenticado
  desde MongoDB), `/admin/productos` (CRUD de catálogo, solo rol `admin`).
- **Variables de entorno del frontend:** `.env.development` / `.env.production` definen `VITE_API_URL`.

## Tecnologías

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) para el ruteo entre páginas
- [React-Bootstrap](https://react-bootstrap.netlify.app/) + [Bootstrap 5](https://getbootstrap.com/) para diseño y componentes
- Netlify para el despliegue continuo

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
6. **Crear cuenta** (`/registro`) — formulario de registro demostrativo con validación básica.
7. **Contacto** (`/contacto`) — formulario de consulta y preguntas frecuentes en `Accordion`.

El `Navbar` (responsivo, con menú colapsable) y el `Footer` (con los datos del estudiante) son componentes
reutilizables presentes en todas las páginas mediante un `Layout` compartido.

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Despliegue en Netlify

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Incluye `netlify.toml` con una regla de redirección (`/* -> /index.html`) necesaria para que las rutas de
  React Router funcionen al recargar o compartir un enlace directo.
