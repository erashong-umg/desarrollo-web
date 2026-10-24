import { useState } from 'react'
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatQuetzales } from '../data/products'
import { getProductThumbnail } from '../utils/productImages'

export default function Carrito() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart()
  const [showConfirmation, setShowConfirmation] = useState(false)

  function handleOrderSubmit(event) {
    event.preventDefault()
    setShowConfirmation(true)
  }

  function handleCloseConfirmation() {
    setShowConfirmation(false)
    clearCart()
  }

  return (
    <Container className="py-4">
      <h1 className="h2 mb-2">Tu carrito</h1>
      <p className="text-secondary">
        <strong>Prototipo:</strong> los controles no modifican productos reales ni procesan pagos.
      </p>

      {items.length === 0 ? (
        <div className="tc-panel p-4 text-center">
          <p className="mb-3">Tu carrito está vacío.</p>
          <Button as={Link} to="/catalogo" variant="primary">
            Ir al catálogo
          </Button>
        </div>
      ) : (
        <div className="table-responsive mb-4">
          <Table>
            <caption>Resumen de productos seleccionados</caption>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Producto</th>
                <th scope="col">Precio unitario</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ product, quantity }) => {
                const thumbnail = product.image?.jpg ?? getProductThumbnail(product.thumbnail)
                return (
                <tr key={product.id}>
                  <td>
                    {thumbnail && (
                      <Link to={`/producto/${product.id}`}>
                        <img
                          src={thumbnail}
                          alt=""
                          className="thumb"
                          width={56}
                          height={56}
                          style={{ objectFit: 'cover', borderRadius: 'var(--radius)' }}
                        />
                      </Link>
                    )}
                  </td>
                  <td>
                    <Link to={`/producto/${product.id}`} className="fw-bold text-decoration-none">
                      {product.name}
                    </Link>
                    <br />
                    <small className="text-secondary">Código {product.code}</small>
                  </td>
                  <td>{formatQuetzales(product.price)}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min={1}
                      max={5}
                      value={quantity}
                      onChange={(event) => updateQuantity(product.id, Number(event.target.value))}
                      style={{ width: '5.5rem' }}
                    />
                  </td>
                  <td>{formatQuetzales(product.price * quantity)}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => removeItem(product.id)}>
                      Quitar
                    </Button>
                  </td>
                </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={4}>
                  Total estimado
                </th>
                <td colSpan={2}>
                  <strong>{formatQuetzales(totalPrice)}</strong>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      )}

      {items.length > 0 && (
        <section className="tc-panel p-4">
          <h2 className="h4 mb-3">Datos de entrega</h2>
          <Form onSubmit={handleOrderSubmit}>
            <fieldset className="tc-fieldset mb-3">
              <legend>Contacto</legend>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="nombre-entrega">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control type="text" autoComplete="name" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="correo-entrega">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type="email" autoComplete="email" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="telefono-entrega">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" pattern="[0-9]{8}" placeholder="8 dígitos" required />
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>
            <fieldset className="tc-fieldset mb-3">
              <legend>Dirección</legend>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="departamento">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Select required defaultValue="">
                      <option value="" disabled>
                        Selecciona uno
                      </option>
                      <option>Guatemala</option>
                      <option>Sacatepéquez</option>
                      <option>Chimaltenango</option>
                      <option>Escuintla</option>
                      <option>Otro</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="direccion">
                    <Form.Label>Dirección completa</Form.Label>
                    <Form.Control as="textarea" rows={2} required />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Check
                type="checkbox"
                id="confirmacion"
                className="mt-3"
                label="Confirmo que los datos son únicamente para esta demostración."
                required
              />
            </fieldset>
            <Button type="submit" variant="primary">
              Simular pedido
            </Button>
          </Form>
        </section>
      )}

      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pedido simulado con éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Este es un prototipo académico: no se realizó ningún cobro ni envío real. Tu total estimado fue de{' '}
            <strong>{formatQuetzales(totalPrice)}</strong>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button as={Link} to="/catalogo" variant="primary" onClick={handleCloseConfirmation}>
            Seguir explorando
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
