import { useMemo, useState } from "react";
import { actividades } from "../data/actividades.js";

/*
 * Filtro de actividades en tiempo real.
 * Un campo de texto situado sobre la lista filtra dinamicamente los
 * elementos que coinciden con el texto escrito, sin recargar la pagina.
 */
function FiltroActividades() {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = useMemo(() => {
    const termino = busqueda.toLowerCase().trim();
    if (termino === "") return actividades;
    return actividades.filter((actividad) =>
      actividad.toLowerCase().includes(termino)
    );
  }, [busqueda]);

  return (
    <section id="actividades" className="section">
      <h2>Lista de actividades</h2>

      <div className="filtro">
        <label htmlFor="filtro-actividades">Buscar actividad</label>
        <input
          type="text"
          id="filtro-actividades"
          placeholder="Ej. kayak, cafe, artesanias..."
          autoComplete="off"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
        />
      </div>

      <ul>
        {filtradas.map((actividad) => (
          <li key={actividad}>{actividad}</li>
        ))}
      </ul>

      {filtradas.length === 0 && (
        <p className="aviso" role="status">
          No se encontraron actividades con ese termino.
        </p>
      )}

      <p className="back-link">
        <a href="#inicio">Regresar al inicio</a>
      </p>
    </section>
  );
}

export default FiltroActividades;
