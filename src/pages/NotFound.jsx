import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="h2 mb-3">404 — Página no encontrada</h1>
      <p className="text-secondary mb-4">La sección que buscas no existe en este prototipo.</p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </Container>
  )
}
