import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="tc-footer">
      <Container>
        <p className="mb-1">
          <strong>TecnoCore Guatemala&copy;</strong> — Proyecto académico sin transacciones reales.
        </p>
        <p className="mb-1">
          Página desarrollada por <strong>Erick Orlando Rashón González</strong> — Carné: 9490 11 5609
          <br />
          <small>
            Módulos y componentes: estructura de la aplicación (React Router, Layout, Navbar, Footer),
            contexto del carrito de compras, páginas de Inicio, Catálogo, Categorías, Detalle de producto,
            Carrito, Registro y Contacto, y estilos con React-Bootstrap.
          </small>
        </p>
        <p className="mb-0">
          <small>&copy; 2026 Desarrollo Web, Universidad Mariano Gálvez de Guatemala.</small>
        </p>
      </Container>
    </footer>
  )
}
