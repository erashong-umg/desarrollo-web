/* Hoja de Trabajo 3 - Excursión al Lago de Atitlán
   Interactividad con JavaScript: visor de galería, cotizador, filtro de
   actividades, validación de reservación y testimonios aleatorios. */

"use strict";

/* ------------------------------------------------------------------
   1. Galería interactiva (modal / visor de imagen)
------------------------------------------------------------------ */
function iniciarGaleria() {
  const modal = document.getElementById("modal-galeria");
  const imagen = document.getElementById("modal-imagen");
  const titulo = document.getElementById("modal-titulo");
  const descripcion = document.getElementById("modal-descripcion");
  const disparadores = document.querySelectorAll(".gallery-trigger");

  if (!modal || disparadores.length === 0) return;

  disparadores.forEach(function (boton) {
    boton.addEventListener("click", function () {
      imagen.src = boton.dataset.full;
      imagen.alt = boton.dataset.titulo;
      titulo.textContent = boton.dataset.titulo;
      descripcion.textContent = boton.dataset.descripcion;
      document.body.classList.add("sin-scroll");
      modal.showModal();
    });
  });

  function cerrarModal() {
    modal.close();
  }

  // Botón de cierre
  modal.querySelector("[data-cerrar-modal]").addEventListener("click", cerrarModal);

  // Clic sobre el fondo oscuro (fuera de la imagen)
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) cerrarModal();
  });

  // La tecla Esc dispara "close" de forma nativa en <dialog>
  modal.addEventListener("close", function () {
    document.body.classList.remove("sin-scroll");
  });
}

/* ------------------------------------------------------------------
   2. Calculadora de cotización
------------------------------------------------------------------ */
function iniciarCotizador() {
  const formulario = document.getElementById("form-cotizador");
  const resultado = document.getElementById("resultado-cotizacion");

  if (!formulario || !resultado) return;

  const quetzales = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const asistentes = parseInt(document.getElementById("asistentes").value, 10);
    const select = document.getElementById("paquete");
    const precioPaquete = parseFloat(select.value);
    const nombrePaquete = select.options[select.selectedIndex].textContent.split("—")[0].trim();

    if (isNaN(asistentes) || asistentes < 1) {
      resultado.classList.remove("oculto", "resultado-ok");
      resultado.classList.add("resultado-error");
      resultado.innerHTML = "<p>Ingresa un número de asistentes válido (mínimo 1).</p>";
      return;
    }

    // Servicios adicionales marcados
    const extras = document.querySelectorAll(".extra:checked");
    let precioExtras = 0;
    const nombresExtras = [];

    extras.forEach(function (extra) {
      precioExtras += parseFloat(extra.value);
      nombresExtras.push(extra.dataset.nombre);
    });

    const subtotal = (precioPaquete + precioExtras) * asistentes;

    // Descuento del 10% para grupos de 10 personas o más
    const descuento = asistentes >= 10 ? subtotal * 0.10 : 0;
    const total = subtotal - descuento;

    let detalle = "<h3>Resumen de tu cotización</h3><ul>";
    detalle += "<li>Paquete: <strong>" + nombrePaquete + "</strong></li>";
    detalle += "<li>Asistentes: <strong>" + asistentes + "</strong></li>";
    detalle += "<li>Servicios adicionales: <strong>" +
      (nombresExtras.length > 0 ? nombresExtras.join(", ") : "ninguno") + "</strong></li>";
    detalle += "<li>Subtotal: <strong>" + quetzales.format(subtotal) + "</strong></li>";

    if (descuento > 0) {
      detalle += "<li>Descuento por grupo (10%): <strong>-" + quetzales.format(descuento) + "</strong></li>";
    }

    detalle += "</ul>";
    detalle += "<p class=\"total\">Total estimado: " + quetzales.format(total) + "</p>";

    resultado.innerHTML = detalle;
    resultado.classList.remove("oculto", "resultado-error");
    resultado.classList.add("resultado-ok");
  });

  formulario.addEventListener("reset", function () {
    resultado.classList.add("oculto");
    resultado.innerHTML = "";
  });
}

/* ------------------------------------------------------------------
   3. Filtro en tiempo real de la lista de actividades
------------------------------------------------------------------ */
function iniciarFiltroActividades() {
  const campo = document.getElementById("filtro-actividades");
  const lista = document.getElementById("lista-actividades");
  const aviso = document.getElementById("filtro-sin-resultados");

  if (!campo || !lista) return;

  const elementos = lista.querySelectorAll("li");

  campo.addEventListener("input", function () {
    const busqueda = campo.value.toLowerCase().trim();
    let visibles = 0;

    elementos.forEach(function (item) {
      const texto = item.textContent.toLowerCase();
      const coincide = texto.includes(busqueda);

      item.classList.toggle("oculto", !coincide);
      if (coincide) visibles++;
    });

    aviso.classList.toggle("oculto", visibles > 0);
  });
}

/* ------------------------------------------------------------------
   4. Validación y confirmación del formulario de reservación
------------------------------------------------------------------ */
function iniciarReservacion() {
  const formulario = document.getElementById("form-reservacion");
  const confirmacion = document.getElementById("confirmacion-reserva");

  if (!formulario || !confirmacion) return;

  function mostrarError(campo, mensaje) {
    const contenedor = formulario.querySelector("[data-error-de='" + campo.id + "']");
    if (contenedor) contenedor.textContent = mensaje;
    campo.classList.add("invalido");
  }

  function limpiarErrores() {
    formulario.querySelectorAll(".error").forEach(function (span) {
      span.textContent = "";
    });
    formulario.querySelectorAll(".invalido").forEach(function (campo) {
      campo.classList.remove("invalido");
    });
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const personas = document.getElementById("personas");
    const fecha = document.getElementById("fecha");

    let valido = true;

    if (nombre.value.trim() === "") {
      mostrarError(nombre, "El nombre es obligatorio.");
      valido = false;
    }

    if (correo.value.trim() === "") {
      mostrarError(correo, "El correo es obligatorio.");
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.value.trim())) {
      mostrarError(correo, "Ingresa un correo con formato válido.");
      valido = false;
    }

    if (personas.value.trim() === "") {
      mostrarError(personas, "Indica cuántas personas viajarán.");
      valido = false;
    } else if (parseInt(personas.value, 10) < 1) {
      mostrarError(personas, "Debe ser al menos 1 persona.");
      valido = false;
    }

    if (fecha.value === "") {
      mostrarError(fecha, "Selecciona una fecha para el viaje.");
      valido = false;
    }

    if (!valido) {
      confirmacion.classList.remove("oculto", "resultado-ok");
      confirmacion.classList.add("resultado-error");
      confirmacion.innerHTML = "<p>Revisa los campos marcados antes de enviar la solicitud.</p>";
      return;
    }

    const cantidad = parseInt(personas.value, 10);
    const plural = cantidad === 1 ? "persona" : "personas";

    confirmacion.classList.remove("oculto", "resultado-error");
    confirmacion.classList.add("resultado-ok");
    confirmacion.innerHTML =
      "<h3>¡Gracias " + nombre.value.trim() + "!</h3>" +
      "<p>Tu solicitud para <strong>" + cantidad + " " + plural + "</strong> ha sido registrada " +
      "para el <strong>" + formatearFecha(fecha.value) + "</strong>.</p>" +
      "<p>Enviaremos la confirmación a <strong>" + correo.value.trim() + "</strong>.</p>";

    formulario.reset();
    confirmacion.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

function formatearFecha(valor) {
  const partes = valor.split("-");
  const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
  return fecha.toLocaleDateString("es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

/* ------------------------------------------------------------------
   5. Testimonios aleatorios
------------------------------------------------------------------ */
const nombresVisitantes = [
  "Ana Gómez",
  "Carlos López",
  "María Fernanda Chávez",
  "Diego Ramírez",
  "Lucía Morales",
  "Josué Xicay"
];

const comentariosVisitantes = [
  "El paseo en lancha al amanecer fue lo mejor del viaje; los volcanes con la neblina parecen de postal.",
  "Los talleres de tejido en San Juan La Laguna valen cada quetzal. Aprendí sobre tintes naturales de primera mano.",
  "Excelente organización: el itinerario se cumplió al pie de la letra y el guía conocía muy bien la zona.",
  "La comida típica en Panajachel fue una sorpresa deliciosa. Volvería solo por el pepián.",
  "Hice kayak por primera vez y el equipo estaba en perfectas condiciones. Muy seguro todo.",
  "Ideal para ir en familia; mis hijos disfrutaron los miradores y las compras en el mercado artesanal."
];

function iniciarTestimonios() {
  const boton = document.getElementById("btn-testimonio");
  const tarjeta = document.getElementById("tarjeta-testimonio");
  const texto = document.getElementById("testimonio-texto");
  const autor = document.getElementById("testimonio-autor");

  if (!boton || !tarjeta) return;

  let ultimoIndice = -1;

  function mostrarTestimonioAleatorio() {
    let indice = Math.floor(Math.random() * comentariosVisitantes.length);

    // Evita repetir el mismo testimonio dos veces seguidas
    if (indice === ultimoIndice) {
      indice = (indice + 1) % comentariosVisitantes.length;
    }
    ultimoIndice = indice;

    texto.textContent = "“" + comentariosVisitantes[indice] + "”";
    autor.textContent = "— " + nombresVisitantes[indice];

    // Reinicia la animación de entrada
    tarjeta.classList.remove("animar");
    void tarjeta.offsetWidth;
    tarjeta.classList.add("animar");
  }

  boton.addEventListener("click", mostrarTestimonioAleatorio);
  mostrarTestimonioAleatorio();
}

/* ------------------------------------------------------------------
   Arranque
------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  iniciarGaleria();
  iniciarCotizador();
  iniciarFiltroActividades();
  iniciarReservacion();
  iniciarTestimonios();
});
