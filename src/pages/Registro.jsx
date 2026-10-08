import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Registro() {
  const { register, error, loading, clearError } = useAuth()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [mismatch, setMismatch] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    clearError()
    setMismatch(false)

    if (password !== confirmarPassword) {
      setMismatch(true)
      return
    }

    const user = await register(nombre, correo, password)
    if (user) {
      setSuccess(true)
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h1 className="h2 mb-2">Crea tu cuenta de cliente</h1>
      <p className="text-secondary mb-4">Regístrate con tu correo y contraseña para acceder a tu perfil.</p>

      {success ? (
        <div className="tc-panel p-4">
          <p className="mb-3 text-success">Cuenta creada correctamente.</p>
          <Button as={Link} to="/login" variant="primary">
            Ir a iniciar sesión
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          {mismatch && <Alert variant="danger">Las contraseñas no coinciden.</Alert>}
          {error && (
            <Alert variant="danger" onClose={clearError} dismissible>
              {error}
            </Alert>
          )}

          <fieldset className="tc-fieldset mb-3">
            <legend>Datos de la cuenta</legend>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group controlId="registro-nombre">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="name"
                    required
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="registro-correo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="email"
                    required
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="registro-clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    minLength={8}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="registro-confirmar">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    minLength={8}
                    autoComplete="new-password"
                    required
                    value={confirmarPassword}
                    onChange={(event) => setConfirmarPassword(event.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creando cuenta…' : 'Crear cuenta'}
            </Button>
          </div>
        </Form>
      )}
    </Container>
  )
}
