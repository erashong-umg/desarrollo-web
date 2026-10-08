import { Container, Nav, Navbar, Badge, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const baseLinks = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/carrito', label: 'Carrito' },
  { to: '/contacto', label: 'Contacto' },
]

export default function AppNavbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="tc-navbar" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-font">
          TecnoCore Guatemala
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center" aria-label="Navegación principal">
            {baseLinks.map((link) => (
              <Nav.Link key={link.to} as={NavLink} to={link.to} end={link.end}>
                {link.label}
                {link.to === '/carrito' && totalItems > 0 && (
                  <Badge bg="primary" className="ms-2">
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
            ))}
            {user?.rol === 'admin' && (
              <Nav.Link as={NavLink} to="/admin/productos">
                Administrar
              </Nav.Link>
            )}
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/perfil">
                  Perfil
                </Nav.Link>
                <Button variant="outline-light" size="sm" className="ms-lg-2" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registro">
                  Crear cuenta
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
