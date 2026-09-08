import { useState } from "react";

/*
 * Formulario de reservacion y contacto.
 * Solicita nombre completo y numero de personas. Valida con logica de
 * control que los campos obligatorios no se envien vacios ni con valores
 * negativos. Si la validacion pasa, renderiza dinamicamente un mensaje de
 * confirmacion personalizado.
 */
const ESTADO_INICIAL = { nombre: "", personas: "" };

function FormularioReservacion() {
  const [datos, setDatos] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [confirmacion, setConfirmacion] = useState(null);

  const actualizar = (campo) => (evento) => {
    setDatos((actuales) => ({ ...actuales, [campo]: evento.target.value }));
  };

  const validar = () => {
    const nuevos = {};

    if (datos.nombre.trim() === "") {
      nuevos.nombre = "El nombre completo es obligatorio.";
    }

    const personas = parseInt(datos.personas, 10);
    if (datos.personas.trim() === "") {
      nuevos.personas = "Indica cuantas personas reservaran.";
    } else if (Number.isNaN(personas)) {
      nuevos.personas = "Ingresa un numero valido.";
    } else if (personas <= 0) {
      nuevos.personas = "El numero de personas no puede ser cero ni negativo.";
    }

    return nuevos;
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setConfirmacion(null);
      return;
    }

    const cantidad = parseInt(datos.personas, 10);
    const plural = cantidad === 1 ? "persona" : "personas";
    setConfirmacion(
      `Gracias ${datos.nombre.trim()}! Tu reservacion para ${cantidad} ${plural} ` +
        "ha quedado registrada. Te contactaremos para confirmar los detalles."
    );
    setDatos(ESTADO_INICIAL);
  };

  return (
    <section id="reservacion" className="section">
      <h2>Reserva tu lugar</h2>
      <p className="section-intro">
        Completa el formulario y te contactaremos para confirmar
      </p>

      <form className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            value={datos.nombre}
            onChange={actualizar("nombre")}
            className={errores.nombre ? "invalido" : undefined}
          />
          <span className="error">{errores.nombre}</span>
        </div>

        <div className="campo">
          <label htmlFor="personas">Numero de personas</label>
          <input
            type="number"
            id="personas"
            min="1"
            value={datos.personas}
            onChange={actualizar("personas")}
            className={errores.personas ? "invalido" : undefined}
          />
          <span className="error">{errores.personas}</span>
        </div>

        <div className="campo campo-completo acciones">
          <button type="submit" className="btn">
            Enviar solicitud
          </button>
        </div>
      </form>

      {confirmacion && (
        <div className="resultado resultado-ok" role="status" aria-live="polite">
          <h3>Reservacion recibida</h3>
          <p>{confirmacion}</p>
        </div>
      )}

      <p className="back-link">
        <a href="#inicio">Regresar al inicio</a>
      </p>
    </section>
  );
}

export default FormularioReservacion;
