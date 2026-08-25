import { useState } from 'react'
import { Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { formatQuetzales, products } from '../data/products'
import bannerJpg from '../img/banner-computadoras.jpg'

const featured = products.filter((product) => product.featured)

export default function Home() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      <Carousel className="tc-panel mb-4" fade>
        <Carousel.Item>
          <div
            className="tc-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(10,10,13,.7), rgba(10,10,13,.7)), url(${bannerJpg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Container>
              <p className="text-secondary mb-2">
                <small>COMPUTADORAS · COMPONENTES · ENTREGA EN GUATEMALA · PROTOTIPO ACADÉMICO</small>
              </p>
              <h1 className="brand-font display-5">Construye la potencia que necesitas</h1>
              <p className="mb-3">
                Encuentra computadoras listas para usar, componentes para actualizar tu equipo y periféricos
                para completar tu espacio de trabajo o juego.
              </p>
              <Button as={Link} to="/catalogo" variant="primary" className="me-2">
                Explorar el catálogo
              </Button>
              <Button as={Link} to="/categorias" variant="outline-light">
                Buscar por categoría
              </Button>
            </Container>
          </div>
        </Carousel.Item>
        {featured.map((product) => (
          <Carousel.Item key={product.id}>
            <div className="tc-slide">
              <Container>
                <p className="text-secondary mb-2">
                  <small>PRODUCTO DESTACADO · {product.code}</small>
                </p>
                <h2 className="h3">{product.name}</h2>
                <p>{product.specs}</p>
                <p className="fs-4 fw-bold text-warning">{formatQuetzales(product.price)}</p>
                <Button as={Link} to={`/producto/${product.id}`} variant="primary">
                  Ver detalle
                </Button>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="pb-5">
        <section className="mb-5" aria-labelledby="destacados">
          <h2 id="destacados" className="h3 mb-3">
            Tecnología destacada
          </h2>
          <Row xs={1} md={2} lg={3} className="g-3">
            {featured.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </section>

        <Row className="g-4">
          <Col md={7}>
            <section className="tc-panel p-4 h-100">
              <h2 className="h4 mb-3">Comprar en TecnoCore</h2>
              <ol>
                <li>Encuentra un equipo o componente en el catálogo.</li>
                <li>Revisa sus especificaciones y agrégalo al carrito de demostración.</li>
                <li>Completa tus datos de entrega en el formulario.</li>
              </ol>
              <p className="text-secondary mb-0">
                <small>Este prototipo no procesa pagos ni almacena información.</small>
              </p>
            </section>
          </Col>
          <Col md={5}>
            <section className="tc-panel p-4 h-100">
              <h2 className="h4 mb-3">Novedades tecnológicas</h2>
              {subscribed ? (
                <p className="text-cyan mb-0">¡Gracias! Ya estás en la lista de novedades de demostración.</p>
              ) : (
                <Form onSubmit={handleSubscribe}>
                  <Form.Group controlId="boletin-correo" className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" placeholder="cliente@ejemplo.com" required />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Quiero recibir novedades
                  </Button>
                </Form>
              )}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  )
}
