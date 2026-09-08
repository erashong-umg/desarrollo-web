/* Encabezado principal con el banner panoramico del Lago de Atitlan. */
function Hero() {
  return (
    <header id="inicio" className="hero">
      <picture>
        <source
          srcSet="img/banner-atitlan-640.jpg 640w, img/banner-atitlan-1280.jpg 1280w"
          sizes="90vw"
        />
        <img
          src="img/banner-atitlan-1280.jpg"
          fetchPriority="high"
          alt="Banner panoramico del Lago de Atitlan y sus volcanes"
        />
      </picture>
      <div className="hero-text">
        <h1>Excursion al Lago de Atitlan</h1>
        <p className="subtitle">
          Una aventura entre volcanes, pueblos y aguas azules
        </p>
      </div>
    </header>
  );
}

export default Hero;
