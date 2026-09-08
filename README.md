# Excursion al Lago de Atitlan &mdash; Aplicacion React (Hoja de Trabajo 4)

Migracion del sitio de la excursion al Lago de Atitlan (Guatemala) hacia un
proyecto modular basado en **React + Vite**. Toda la logica y el diseno de la
Hoja de Trabajo 3 se reorganizaron en componentes reutilizables e
independientes dentro de `src/components/`.

## Sitio web publicado

Pendiente de publicar en Netlify. El enlace se actualizara aqui una vez
desplegado:

> https://TODO-excursion-atitlan-react.netlify.app

Build de produccion: `npm run build` (salida en `dist/`). La configuracion de
Netlify esta en `netlify.toml`.

## Estudiante

> Nombre completo: **Erick Orlando Rashon Gonzalez**
> Carne: **9490-11-5609**
> Seccion: **B**

## Como ejecutar el proyecto

```powershell
npm install     # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # compilacion de produccion en dist/
npm run preview  # previsualizar la compilacion de produccion
```

## Estructura

```
index.html               Punto de entrada de Vite
src/
  main.jsx               Monta <App /> en el DOM
  App.jsx                Composicion de todos los componentes
  components/            Componentes reutilizables (uno por funcionalidad)
  data/                  Arreglos de datos (galeria, actividades, paquetes)
  styles/style.css       Hoja de estilos del sitio
public/img/              Imagenes del banner y de la galeria
```

## Componentes

### Componentes interactivos solicitados

| Componente | Archivo | Descripcion |
|---|---|---|
| **Galeria de imagenes interactiva** | `components/Galeria.jsx` | Cuadricula con cuatro imagenes de los atractivos. Al hacer clic en una miniatura se abre un visor destacado (modal) con la imagen en grande, su titulo y su descripcion. Se cierra con el boton **&times;**, con la tecla **Esc** o haciendo clic sobre el fondo oscuro. El estado del modal se maneja con `useState`. |
| **Calculadora de cotizacion / presupuesto** | `components/Cotizador.jsx` | Campo numerico de asistentes, `<select>` de tipo de paquete y `<checkbox>` de servicios adicionales (transporte, alimentacion, equipo de kayak, guia bilingue). El total estimado se **recalcula en tiempo real** con el estado de React conforme el usuario cambia cualquier opcion, sin recargar la pagina. Aplica 10% de descuento para grupos de 10 o mas personas. |
| **Filtro de actividades en tiempo real** | `components/FiltroActividades.jsx` | Campo `<input type="text">` sobre la lista de actividades. Conforme el usuario escribe, la lista se filtra dinamicamente mostrando solo los elementos que coinciden con el texto. |
| **Formulario de reservacion y contacto** | `components/FormularioReservacion.jsx` | Solicita nombre completo y numero de personas. Valida con logica de control que los campos obligatorios no se envien vacios ni con valores negativos o cero. Al enviarse correctamente, renderiza en pantalla un mensaje de confirmacion personalizado con el nombre y la cantidad de personas. |
| **Seccion de resenas / testimonios aleatorios** | `components/Testimonials.jsx` | Usa internamente dos arreglos: uno con 6 nombres de visitantes y otro con 6 comentarios asociados. El boton **Ver otra opinion** rota entre los testimonios de forma aleatoria sin repetir el mismo dos veces seguidas. |

### Componentes de apoyo

| Componente | Archivo | Descripcion |
|---|---|---|
| `Hero.jsx` | Encabezado con el banner panoramico del lago. |
| `Navegacion.jsx` | Indice de navegacion hacia cada seccion. |
| `Descripcion.jsx` | Descripcion del destino turistico. |
| `Itinerario.jsx` | Tabla del programa de la excursion de dos dias. |
| `Footer.jsx` | Pie de pagina con los datos del autor. |

## De la Hoja de Trabajo 3 a la Hoja de Trabajo 4

- El archivo unico `src/js/app.js` (JavaScript imperativo sobre el DOM) se
  reemplazo por componentes React con estado (`useState`, `useMemo`,
  `useEffect`).
- El `index.html` estatico se dividio en componentes; ahora Vite compila la
  aplicacion.
- El visor de galeria con `<dialog>` se reimplemento como un overlay
  renderizado condicionalmente segun el estado.
- La cotizacion pasa de calcularse al pulsar un boton a recalcularse en tiempo
  real ante cualquier cambio.
