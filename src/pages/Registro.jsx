import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { categories } from '../data/products'

export default function Registro() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h1 className="h2 mb-2">Crea tu cuenta de cliente</h1>
      <p className="text-secondary mb-4">
        Guarda tus preferencias en futuras fases del proyecto. Este formulario no envía ni almacena datos.
      </p>

      {submitted ? (
        <div className="tc-panel p-4">
          <p className="mb-0 text-cyan">
            Cuenta de demostración creada. Ningún dato fue enviado a un servidor real.
          </p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <fieldset className="tc-fieldset mb-3">
            <legend>Datos personales</legend>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group controlId="registro-nombre">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control type="text" autoComplete="name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="registro-fecha">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="registro-telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" autoComplete="tel" pattern="[0-9]{8}" placeholder="8 dígitos" />
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          <fieldset className="tc-fieldset mb-3">
            <legend>Acceso</legend>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group controlId="registro-correo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="email" autoComplete="email" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="registro-clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" minLength={8} autoComplete="new-password" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="registro-confirmar">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control type="password" minLength={8} autoComplete="new-password" required />
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          <fieldset className="tc-fieldset mb-3">
            <legend>Preferencias de tecnología</legend>
            <Form.Group controlId="preferencia" className="mb-3">
              <Form.Label>Categoría favorita</Form.Label>
              <Form.Select defaultValue="">
                <option value="">Prefiero decidir después</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Check
              type="checkbox"
              id="boletin"
              label="Deseo recibir novedades y promociones de tecnología."
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="terminos"
              label="He leído los términos demostrativos del prototipo."
              required
            />
          </fieldset>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Crear cuenta de demostración
            </Button>
            <Button type="reset" variant="outline-light">
              Limpiar formulario
            </Button>
          </div>
        </Form>
      )}
    </Container>
  )
}
