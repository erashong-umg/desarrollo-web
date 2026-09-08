import { useState } from "react";
import {
  paquetes,
  serviciosAdicionales,
  quetzales,
} from "../data/cotizador.js";

/*
 * Calculadora de cotizacion / presupuesto.
 * El usuario define numero de asistentes, tipo de paquete (select) y
 * servicios adicionales (checkbox). El total estimado se recalcula en
 * tiempo real con el estado de React, sin recargar la pagina.
 * Los grupos de 10 o mas personas reciben un 10% de descuento.
 */
function Cotizador() {
  const [asistentes, setAsistentes] = useState(1);
  const [paqueteValor, setPaqueteValor] = useState(paquetes[1].valor);
  const [extras, setExtras] = useState([]);

  const alternarExtra = (id) => {
    setExtras((actuales) =>
      actuales.includes(id)
        ? actuales.filter((valor) => valor !== id)
        : [...actuales, id]
    );
  };

  const cantidad = Number.isFinite(asistentes) && asistentes > 0 ? asistentes : 0;
  const paquete = paquetes.find((item) => item.valor === paqueteValor);
  const extrasElegidos = serviciosAdicionales.filter((servicio) =>
    extras.includes(servicio.id)
  );
  const precioExtras = extrasElegidos.reduce((suma, item) => suma + item.precio, 0);

  const subtotal = (paquete.precio + precioExtras) * cantidad;
  const descuento = cantidad >= 10 ? subtotal * 0.1 : 0;
  const total = subtotal - descuento;

  return (
    <section id="cotizador" className="section">
      <h2>Cotiza tu viaje</h2>
      <p className="section-intro">
        El precio estimado se actualiza en tiempo real conforme cambias las
        opciones
      </p>

      <form className="formulario" onSubmit={(evento) => evento.preventDefault()}>
        <div className="campo">
          <label htmlFor="asistentes">Numero de asistentes</label>
          <input
            type="number"
            id="asistentes"
            min="1"
            max="40"
            value={asistentes}
            onChange={(evento) =>
              setAsistentes(parseInt(evento.target.value, 10))
            }
          />
        </div>

        <div className="campo">
          <label htmlFor="paquete">Tipo de paquete</label>
          <select
            id="paquete"
            value={paqueteValor}
            onChange={(evento) => setPaqueteValor(evento.target.value)}
          >
            {paquetes.map((item) => (
              <option key={item.valor} value={item.valor}>
                {item.nombre} (Q{item.precio} por persona)
              </option>
            ))}
          </select>
        </div>

        <fieldset className="campo campo-completo">
          <legend>Servicios adicionales</legend>
          {serviciosAdicionales.map((servicio) => (
            <label className="check" key={servicio.id}>
              <input
                type="checkbox"
                checked={extras.includes(servicio.id)}
                onChange={() => alternarExtra(servicio.id)}
              />
              {servicio.nombre} (Q{servicio.precio} por persona)
            </label>
          ))}
        </fieldset>
      </form>

      <div className="resultado resultado-ok" role="status" aria-live="polite">
        <h3>Resumen de tu cotizacion</h3>
        <ul>
          <li>
            Paquete: <strong>{paquete.nombre}</strong>
          </li>
          <li>
            Asistentes: <strong>{cantidad}</strong>
          </li>
          <li>
            Servicios adicionales:{" "}
            <strong>
              {extrasElegidos.length > 0
                ? extrasElegidos.map((item) => item.nombre).join(", ")
                : "ninguno"}
            </strong>
          </li>
          <li>
            Subtotal: <strong>{quetzales.format(subtotal)}</strong>
          </li>
          {descuento > 0 && (
            <li>
              Descuento por grupo (10%):{" "}
              <strong>-{quetzales.format(descuento)}</strong>
            </li>
          )}
        </ul>
        <p className="total">Total estimado: {quetzales.format(total)}</p>
      </div>

      <p className="back-link">
        <a href="#inicio">Regresar al inicio</a>
      </p>
    </section>
  );
}

export default Cotizador;
