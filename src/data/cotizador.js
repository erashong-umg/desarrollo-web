// Catalogo de paquetes y servicios adicionales para la calculadora de cotizacion.
export const paquetes = [
  { valor: "350", nombre: "Basico - recorrido en lancha", precio: 350 },
  { valor: "550", nombre: "Cultural - lancha y pueblos mayas", precio: 550 },
  { valor: "750", nombre: "Aventura - kayak y senderismo", precio: 750 },
  { valor: "950", nombre: "Premium - dos dias con hospedaje", precio: 950 },
];

export const serviciosAdicionales = [
  { id: "transporte", nombre: "Transporte incluido", precio: 120 },
  { id: "alimentacion", nombre: "Alimentacion completa", precio: 90 },
  { id: "kayak", nombre: "Equipo de kayak", precio: 60 },
  { id: "guia", nombre: "Guia bilingue", precio: 75 },
];

export const quetzales = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ",
  minimumFractionDigits: 2,
});
