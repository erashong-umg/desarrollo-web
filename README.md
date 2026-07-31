# TecnoCore Guatemala

Prototipo académico de un ecommerce de computadoras, componentes y periféricos desarrollado con HTML y CSS nativos (sin frameworks, sin JavaScript ni dependencias externas de build). Incluye un tema visual cyberpunk con tipografías personalizadas y estilos globales. Los formularios representan la futura interfaz de captura y no procesan ni almacenan datos.

## Sitio publicado

[Ver TecnoCore Guatemala en Netlify](https://erashong-hojadetrabajo-2.netlify.app/)

## Estudiante

- **Nombre:** **Erick Orlando Rashón González**
- **Carné:** **9490 11 5609**
- **Sección:** **B**

## Páginas incluidas

1. `index.html` — inicio y productos destacados.
2. `catalogo.html` — catálogo, búsqueda y filtros demostrativos.
3. `producto.html` — ficha detallada de una computadora.
4. `categorias.html` — exploración por tipo de tecnología.
5. `carrito.html` — resumen de compra y datos de entrega.
6. `registro.html` — creación de cuenta demostrativa.
7. `contacto.html` — formulario de consulta y preguntas frecuentes.
8. `footer.html` — información repetitiva del footer, pensada para incluirse mediante `iframe` y evitar duplicar código.

## Estructura del proyecto

```
src/
├── css/
│   └── style.css        # reset CSS, variables y tema cyberpunk
├── fonts/
│   └── CyberwayRiders.ttf
└── img/
    ├── banner-1.png
    ├── banner-computadoras.png
    ├── banner-zapatos.png
    └── products/         # imágenes de productos del catálogo
```

## Estilos

`src/css/style.css` centraliza los estilos del sitio e incluye:

- Reset CSS para normalizar el comportamiento entre navegadores.
- Tipografías **Orbitron** y **Rajdhani** (Google Fonts) más la fuente personalizada **CyberwayRiders**.
- Variables de color y estética cyberpunk.
- Estilos responsivos para navegación, contenido, tablas, formularios, botones y pie de página.

