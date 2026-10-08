import { Badge, Button, Card, Container, ListGroup } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { user, loading, logout } = useAuth()

  if (!user) {
    return loading ? null : <Navigate to="/login" replace />
  }

  const fechaCreacion = new Date(user.createdAt).toLocaleDateString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Container className="py-4" style={{ maxWidth: 560 }}>
      <h1 className="h2 mb-4">Mi perfil</h1>
      <Card className="tc-panel">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title className="mb-0">{user.nombre}</Card.Title>
            <Badge bg={user.rol === 'admin' ? 'danger' : 'primary'}>{user.rol}</Badge>
          </div>
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Correo:</strong> {user.correo}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Cuenta creada:</strong> {fechaCreacion}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex gap-2">
            {user.rol === 'admin' && (
              <Button as={Link} to="/admin/productos" variant="outline-primary">
                Administrar productos
              </Button>
            )}
            <Button variant="outline-danger" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
