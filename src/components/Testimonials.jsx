import { useState } from "react";

/*
 * Seccion de resenas / testimonios aleatorios.
 * El componente usa internamente dos arreglos de datos: uno con nombres de
 * personas y otro con comentarios asociados. El boton "Ver otra opinion"
 * rota dinamicamente entre los testimonios disponibles sin repetir el mismo
 * dos veces seguidas.
 */
const nombres = [
  "Ana Gomez",
  "Carlos Lopez",
  "Maria Fernanda Chavez",
  "Diego Ramirez",
  "Lucia Morales",
  "Josue Xicay",
];

const comentarios = [
  "El paseo en lancha al amanecer fue lo mejor del viaje; los volcanes con la neblina parecen de postal.",
  "Los talleres de tejido en San Juan La Laguna valen cada quetzal. Aprendi sobre tintes naturales de primera mano.",
  "Excelente organizacion: el itinerario se cumplio al pie de la letra y el guia conocia muy bien la zona.",
  "La comida tipica en Panajachel fue una sorpresa deliciosa. Volveria solo por el pepian.",
  "Hice kayak por primera vez y el equipo estaba en perfectas condiciones. Muy seguro todo.",
  "Ideal para ir en familia; mis hijos disfrutaron los miradores y las compras en el mercado artesanal.",
];

function indiceAleatorio(distintoDe) {
  let indice = Math.floor(Math.random() * comentarios.length);
  if (indice === distintoDe) {
    indice = (indice + 1) % comentarios.length;
  }
  return indice;
}

function Testimonials() {
  const [indice, setIndice] = useState(() => indiceAleatorio(-1));

  const verOtra = () => setIndice((actual) => indiceAleatorio(actual));

  return (
    <section id="opiniones" className="section">
      <h2>Opiniones de nuestros visitantes</h2>
      <p className="section-intro">
        Testimonios de quienes ya vivieron la excursion
      </p>

      <article className="testimonio">
        <p className="testimonio-texto">&ldquo;{comentarios[indice]}&rdquo;</p>
        <p className="testimonio-autor">&mdash; {nombres[indice]}</p>
      </article>

      <div className="acciones acciones-centro">
        <button type="button" className="btn" onClick={verOtra}>
          Ver otra opinion
        </button>
      </div>

      <p className="contador-testimonio" style={{ textAlign: "center" }}>
        Opinion {indice + 1} de {comentarios.length}
      </p>

      <p className="back-link">
        <a href="#inicio">Regresar al inicio</a>
      </p>
    </section>
  );
}

export default Testimonials;
