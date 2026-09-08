import Hero from "./components/Hero.jsx";
import Navegacion from "./components/Navegacion.jsx";
import Descripcion from "./components/Descripcion.jsx";
import Galeria from "./components/Galeria.jsx";
import Itinerario from "./components/Itinerario.jsx";
import FiltroActividades from "./components/FiltroActividades.jsx";
import Cotizador from "./components/Cotizador.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FormularioReservacion from "./components/FormularioReservacion.jsx";
import Footer from "./components/Footer.jsx";

/*
 * Aplicacion de la Excursion al Lago de Atitlan.
 * Cada funcionalidad interactiva es un componente independiente y
 * reutilizable dentro de src/components/.
 */
function App() {
  return (
    <>
      <Hero />
      <Navegacion />
      <main>
        <Descripcion />
        <Galeria />
        <Itinerario />
        <FiltroActividades />
        <Cotizador />
        <Testimonials />
        <FormularioReservacion />
      </main>
      <Footer />
    </>
  );
}

export default App;
