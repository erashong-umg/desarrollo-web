# TecnoCore Guatemala

Ecommerce académico de computadoras, componentes y periféricos. La Tarea 1 se construyó con HTML nativo puro; en
esta Tarea 2 el sitio se reconstruyó como una aplicación **React** (Vite) componentizada, con **React-Bootstrap**
para el diseño y **React Router** para la navegación entre secciones, manteniendo la arquitectura de información
original y el tema visual "cyberpunk". El carrito de compras es interactivo (agregar, actualizar cantidad, quitar)
mediante un Context de React; los formularios son demostrativos y no procesan pagos ni almacenan datos reales.

## Sitio publicado

[Ver TecnoCore Guatemala en Netlify](https://erashong-tarea2-tecnocore.netlify.app/)

## Estudiante

- **Nombre:** **Erick Orlando Rashón González**
- **Carné:** **9490 11 5609**
- **Sección:** **B**
- **Trabajo individual.** Todos los módulos y componentes fueron desarrollados por el mismo estudiante:
  estructura de la aplicación (React Router, Layout, Navbar, Footer), contexto del carrito de compras, páginas de
  Inicio, Catálogo, Categorías, Detalle de producto, Carrito, Registro y Contacto, y estilos con React-Bootstrap.

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
