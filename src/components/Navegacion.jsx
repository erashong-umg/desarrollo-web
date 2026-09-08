/* Indice de navegacion hacia las secciones interactivas del sitio. */
const enlaces = [
  { href: "#descripcion", texto: "Descripcion del Lago de Atitlan" },
  { href: "#galeria", texto: "Galeria de imagenes" },
  { href: "#itinerario", texto: "Tabla de itinerarios" },
  { href: "#actividades", texto: "Filtro de actividades" },
  { href: "#cotizador", texto: "Cotiza tu viaje" },
  { href: "#opiniones", texto: "Opiniones de visitantes" },
  { href: "#reservacion", texto: "Reservacion" },
  { href: "#autor", texto: "Pie de pagina y autor" },
];

function Navegacion() {
  return (
    <nav className="site-nav" aria-label="Indice de navegacion">
      <h2>Indice de navegacion</h2>
      <ol>
        {enlaces.map((enlace) => (
          <li key={enlace.href}>
            <a href={enlace.href}>{enlace.texto}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Navegacion;
