# Excursión al Lago de Atitlán

Página web informativa creada para promocionar una excursión al Lago de Atitlán,
Guatemala. Incluye una descripción del destino, un índice de navegación, una
galería de imágenes, el itinerario de dos días, actividades, recomendaciones y,
a partir de la **Hoja de Trabajo 3**, un conjunto de funcionalidades interactivas
desarrolladas con JavaScript en un archivo externo (`src/js/app.js`).

## Sitio web publicado

[https://erashong-hoja-trabajo-3.netlify.app](https://erashong-hoja-trabajo-3.netlify.app/)

## Estudiante

> Nombre: **Erick Orlando Rashón González** <br/>Carnet: **9490-11-5609** <br>Sección: **B**

## Hoja de Trabajo 3 — funcionalidades interactivas con JavaScript

Todo el código JavaScript vive en el archivo externo `src/js/app.js`, cargado con
`defer` desde `index.html`. Cada funcionalidad está encapsulada en su propia
función de inicialización y se arranca en el evento `DOMContentLoaded`.

### 1. Galería de imágenes interactiva (modal / visor)

Las cuatro imágenes de la galería son botones con atributos `data-*`
(`data-full`, `data-titulo`, `data-descripcion`). Al hacer clic, JavaScript carga
esos datos en un único `<dialog>` y lo abre con `showModal()`, mostrando la
imagen en tamaño grande junto con su título y una breve descripción del atractivo.

El visor se cierra de tres formas: con el botón **×**, haciendo clic sobre el
fondo oscuro, o con la tecla **Esc** (comportamiento nativo de `<dialog>`).

> Esto sustituye al lightbox 100% CSS de la Hoja de Trabajo 2, que usaba
> `:target` y no atrapaba el foco ni respondía a `Esc`. Con `showModal()` el
> diálogo sí es un modal real a nivel de accesibilidad.

```js
boton.addEventListener("click", function () {
  imagen.src = boton.dataset.full;
  titulo.textContent = boton.dataset.titulo;
  modal.classList.add("abierto");
  modal.showModal();
});
```

### 2. Calculadora de cotización

Formulario con número de asistentes (`input type="number"`), tipo de paquete
(`<select>` con cuatro opciones) y cuatro servicios adicionales
(`input type="checkbox"`: transporte, alimentación, equipo de kayak y guía
bilingüe).

El botón **Calcular Total** ejecuta el cálculo con `preventDefault()`, sin
recargar la página, e imprime en pantalla un resumen con el paquete elegido, los
servicios marcados, el subtotal y el total formateado en quetzales mediante
`Intl.NumberFormat`. Los grupos de 10 o más personas reciben un 10% de descuento
aplicado automáticamente.

### 3. Filtro en tiempo real de la lista de actividades

Un campo de texto sobre la lista de actividades escucha el evento `input` y
filtra los `<li>` conforme el usuario escribe, alternando la clase `oculto` con
`classList.toggle()`. Si ninguna actividad coincide, se muestra un mensaje de
aviso.

### 4. Confirmación interactiva de reservación

El formulario de reservación se valida con JavaScript antes de enviarse: se
verifica que nombre, correo, número de personas y fecha no estén vacíos, que el
correo tenga formato válido y que las personas sean al menos 1. Los campos con
error se marcan con la clase `invalido` y muestran su mensaje específico.

Cuando la validación pasa, se muestra un mensaje dinámico de confirmación del
tipo *"¡Gracias Ana Gómez! Tu solicitud para 4 personas ha sido registrada para
el 15 de agosto de 2026."*

### 5. Sección de reseñas / testimonios aleatorios

En `app.js` se definen dos arreglos: uno con seis nombres de visitantes y otro
con seis comentarios sobre la excursión. El botón **Ver otra opinión** selecciona
un índice aleatorio con `Math.random()` y actualiza la tarjeta, evitando repetir
el mismo testimonio dos veces seguidas. También se muestra un testimonio al
cargar la página.

### Técnicas de JavaScript aplicadas

- Selección de elementos con `getElementById()`, `querySelector()` y `querySelectorAll()`.
- Manejo de eventos con `addEventListener()`: `click`, `input`, `submit`, `reset`, `close` y `DOMContentLoaded`.
- Manipulación del DOM con `textContent`, `innerHTML` y atributos `dataset`.
- Modificación de clases con `classList.add()`, `.remove()` y `.toggle()`.
- Prevención del envío del formulario con `event.preventDefault()`.
- Formato de moneda y fecha con `Intl.NumberFormat` y `toLocaleDateString` (locale `es-GT`).

## Archivos

- `index.html`: página principal de la excursión.
- `src/css/style.css`: hoja de estilos del sitio.
- `src/js/app.js`: **archivo externo con toda la lógica interactiva.**
- `src/img/`: imágenes locales del banner y la galería.
- `README.md`: información general y enlace de publicación.

## Change log

### Hoja de Trabajo 3
- Se agregó el archivo externo `src/js/app.js` con las cinco funcionalidades interactivas.
- El lightbox CSS por `:target` se reemplazó por un visor `<dialog>` único controlado con JavaScript.
- Nuevas secciones: **Cotiza tu viaje**, **Opiniones de nuestros visitantes** y **Reserva tu lugar**.
- Estilos nuevos para formularios, botones, mensajes de resultado y tarjeta de testimonios.

### Hoja de Trabajo 2
- Aplicar estilos CSS con archivo `style.css`.
- Mejorar diseño y apariencia.
- Aplicar tag `<dialog>` para visualizar imágenes (versión solo CSS).
