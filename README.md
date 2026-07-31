# Excursión al Lago de Atitlán

Página web informativa creada como **Hoja de Trabajo 1** para promocionar una
excursión al Lago de Atitlán, Guatemala. Incluye una descripción del destino,
un índice de navegación, una galería de imágenes, el itinerario de dos días,
actividades adicionales y recomendaciones para el viaje.

El proyecto utiliza HTML5 semántico con un estilo CSS sobrio (paleta neutra,
tipografía clara y layout responsivo). No contiene JavaScript.

## Sitio web publicado

[Link Netlify - erashong-hoja-trabajo-1.netlify.app ](https://erashong-hoja-trabajo-2.netlify.app/)

## Estudiante

> Nombre:  **Erick Orlando Rashón González** <br/>Carnet: **9490-11-5609** <br>Sección: **B**

## Change log:
- aplicar estilos css con archivo style.css 
- mejorar diseño y apariencia
- **aplicar tag &lt;dialog&gt; para visualizar imagenes**
~~~ html
<!-- MODAL SOLO CSS,  CERO JS-->
      <dialog id="lightbox-panoramica" class="lightbox" aria-label="Vista panorámica del Lago de Atitlán, imagen ampliada">
        <a href="#galeria" class="lightbox-backdrop" aria-hidden="true" tabindex="-1"></a>
        <a href="#galeria" class="lightbox-close" aria-label="Cerrar imagen ampliada">&times;</a>
        <img src="src/img/lago-panoramica.jpg" alt="Vista panorámica del Lago de Atitlán">
        <p class="lightbox-caption">Vista panorámica del Lago de Atitlán</p>
      </dialog>
~~~
### Limitación honesta a tener en cuenta: esto no es un diálogo "modal" real en términos de accesibilidad — no atrapa el foco ni responde a la tecla Esc, y lectores de pantalla lo tratan como contenido normal, no como un modal anunciado. Es el trade-off inevitable de hacerlo 100% CSS.



## Archivos

- `index.html`: página principal de la excursión.
- `src/css/style.css`: hoja de estilos sobria del sitio.
- `src/img/`: imágenes locales del banner y la galería.
- `README.md`: información general y enlace de publicación.

