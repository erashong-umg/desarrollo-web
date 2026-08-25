import { Container, Nav, Navbar, Badge } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/categorias', label: 'Categorías' },
  { to: '/carrito', label: 'Carrito' },
  { to: '/registro', label: 'Crear cuenta' },
  { to: '/contacto', label: 'Contacto' },
]

export default function AppNavbar() {
  const { totalItems } = useCart()

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="tc-navbar" collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-font">
          TecnoCore Guatemala
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" aria-label="Navegación principal">
            {links.map((link) => (
              <Nav.Link key={link.to} as={NavLink} to={link.to} end={link.end}>
                {link.label}
                {link.to === '/carrito' && totalItems > 0 && (
                  <Badge bg="warning" text="dark" className="ms-2">
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
