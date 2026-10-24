import { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, error, loading, clearError } = useAuth()
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    clearError()
    const user = await login(correo, password)
    if (user) {
      navigate('/perfil')
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h1 className="h2 mb-2">Inicia sesión</h1>
      <p className="text-secondary mb-4">Accede con tu correo y contraseña de TecnoCore Guatemala.</p>

      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="tc-fieldset p-4">
        <Form.Group className="mb-3" controlId="login-correo">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            autoComplete="email"
            required
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="login-password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
        </Button>
      </Form>
    </Container>
  )
}
