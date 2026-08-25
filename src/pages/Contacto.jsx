import { useState } from 'react'
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap'

export default function Contacto() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <Container className="py-4">
      <h1 className="h2 mb-3">Te ayudamos a elegir tu equipo</h1>
      <p className="text-secondary mb-4">
        ¿Tienes dudas de compatibilidad o necesitas orientación sobre un producto? Completa el formulario de
        demostración.
      </p>

      <Row className="g-4">
        <Col md={5}>
          <section className="tc-panel p-4 mb-4">
            <h2 className="h4 mb-3">Canales de atención</h2>
            <address className="mb-2">
              <strong>TecnoCore Guatemala</strong>
              <br />
              Zona 1, Ciudad de Guatemala
              <br />
              Teléfono: <a href="tel:+50222220000">+502 2222-0000</a>
              <br />
              Correo: <a href="mailto:hola@tecnocore.example">hola@tecnocore.example</a>
            </address>
            <p className="mb-0 text-secondary">Horario: lunes a sábado, 9:00 a 18:00.</p>
          </section>

          <section className="tc-panel p-4">
            <h2 className="h4 mb-3">Preguntas frecuentes</h2>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>¿La tienda acepta pagos?</Accordion.Header>
                <Accordion.Body>
                  No. Este sitio es un prototipo académico y no procesa ninguna transacción.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>¿Los formularios guardan mis datos?</Accordion.Header>
                <Accordion.Body>
                  No. Solo representan la estructura que podría utilizarse en una fase futura.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>¿Los precios son reales?</Accordion.Header>
                <Accordion.Body>
                  No. Los productos, precios y datos de contacto son contenido demostrativo.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>
        </Col>

        <Col md={7}>
          <section className="tc-panel p-4">
            <h2 className="h4 mb-3">Enviar una consulta</h2>
            {sent ? (
              <p className="text-cyan mb-0">
                Gracias por escribirnos. Esta consulta de demostración no fue enviada a ningún servidor.
              </p>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="contacto-nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" autoComplete="name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="contacto-correo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" autoComplete="email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="asunto">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Select required defaultValue="">
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option>Disponibilidad de un producto</option>
                    <option>Información de entrega</option>
                    <option>Compatibilidad o recomendación técnica</option>
                    <option>Otro</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control as="textarea" rows={6} minLength={10} required />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Enviar consulta de demostración
                </Button>
              </Form>
            )}
          </section>
        </Col>
      </Row>
    </Container>
  )
}
