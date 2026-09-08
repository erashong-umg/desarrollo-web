/* Tabla del programa de la excursion de dos dias. */
const filas = [
  ["2026-08-15", "05:30 - 08:30", "Salida y viaje hacia Solola", "Ciudad de Guatemala - Panajachel"],
  ["2026-08-15", "09:00 - 10:00", "Desayuno y bienvenida", "Calle Santander, Panajachel"],
  ["2026-08-15", "10:30 - 12:30", "Paseo en lancha por el lago", "Panajachel - San Juan La Laguna"],
  ["2026-08-15", "13:00 - 16:30", "Almuerzo y visita a talleres de textiles y cacao", "San Juan La Laguna"],
  ["2026-08-15", "17:30 - 19:00", "Atardecer, cena y descanso", "Panajachel"],
  ["2026-08-16", "07:00 - 08:00", "Desayuno", "Panajachel"],
  ["2026-08-16", "08:30 - 13:00", "Recorrido cultural y visita a la iglesia", "Santiago Atitlan"],
  ["2026-08-16", "14:00 - 18:00", "Almuerzo, compras y viaje de regreso", "Panajachel - Ciudad de Guatemala"],
];

function Itinerario() {
  return (
    <section id="itinerario" className="section">
      <h2>Tabla de itinerarios</h2>
      <table className="itinerary-table">
        <caption>Programa de excursion: 15 y 16 de agosto de 2026</caption>
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Horario</th>
            <th scope="col">Actividad</th>
            <th scope="col">Lugar</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={`${fila[0]}-${fila[1]}`}>
              <td>{fila[0]}</td>
              <td>{fila[1]}</td>
              <td>{fila[2]}</td>
              <td>{fila[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="back-link">
        <a href="#inicio">Regresar al inicio</a>
      </p>
    </section>
  );
}

export default Itinerario;
