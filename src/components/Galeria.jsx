import { useEffect, useState } from "react";
import { imagenesGaleria } from "../data/galeria.js";

/*
 * Galeria de imagenes interactiva.
 * Muestra una cuadricula de miniaturas; al hacer clic en cualquiera se abre
 * un visor destacado (modal) con la imagen en grande, su titulo y su
 * descripcion. El modal se cierra con el boton "x", con la tecla Esc o
 * haciendo clic sobre el fondo oscuro.
 */
function Galeria() {
  const [seleccionada, setSeleccionada] = useState(null);

  const abrir = (imagen) => setSeleccionada(imagen);
  const cerrar = () => setSeleccionada(null);

  // Cerrar con la tecla Escape mientras el visor este abierto.
  useEffect(() => {
    if (!seleccionada) return;
    const alPresionar = (evento) => {
      if (evento.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", alPresionar);
    document.body.classList.add("sin-scroll");
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.classList.remove("sin-scroll");
    };
  }, [seleccionada]);

  return (
    <section id="galeria" className="section">
      <h2>Galeria de imagenes</h2>
      <p className="section-intro">
        Haz clic sobre cualquier fotografia para verla en grande
      </p>

      <div className="gallery">
        {imagenesGaleria.map((imagen) => (
          <figure key={imagen.id}>
            <button
              type="button"
              className="gallery-trigger"
              onClick={() => abrir(imagen)}
              aria-label={`Ampliar: ${imagen.titulo}`}
            >
              <img src={imagen.miniatura} loading="lazy" alt={imagen.titulo} />
            </button>
            <figcaption>{imagen.titulo}</figcaption>
          </figure>
        ))}
      </div>

      {seleccionada && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={seleccionada.titulo}
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) cerrar();
          }}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={cerrar}
            aria-label="Cerrar imagen ampliada"
          >
            &times;
          </button>
          <img src={seleccionada.completa} alt={seleccionada.titulo} />
          <div className="lightbox-info">
            <h3>{seleccionada.titulo}</h3>
            <p>{seleccionada.descripcion}</p>
          </div>
        </div>
      )}

      <p className="back-link">
        <a href="#inicio">Regresar al inicio</a>
      </p>
    </section>
  );
}

export default Galeria;
