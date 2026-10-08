import { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatQuetzales, getCategoryBySlug } from '../data/products'
import { getProductThumbnail } from '../utils/productImages'
import { apiGet } from '../services/api'

const availabilityVariant = {
  'En existencia': 'success',
  'Últimas unidades': 'warning',
  Agotado: 'danger',
}

export default function ProductoDetalle() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setProduct(null)

    apiGet(`/recursos/${id}`)
      .then((data) => {
        if (!cancelled) {
          setProduct(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <Container className="py-4 d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" /> Cargando producto…
      </Container>
    )
  }

  if (error) {
    return <Navigate to="/catalogo" replace />
  }

  if (!product) {
    return <Navigate to="/catalogo" replace />
  }

  const category = getCategoryBySlug(product.category)
  const isOutOfStock = product.availability === 'Agotado'
  const thumbnail = getProductThumbnail(product.thumbnail)

  function handleAddToCart(event) {
    event.preventDefault()
    addItem(product.id, quantity)
    setAdded(true)
  }

  return (
    <Container className="py-4">
      <p>
        <Link to="/catalogo">Catálogo</Link> &gt; {category?.name} &gt; {product.name}
      </p>
      <Row className="g-4">
        {thumbnail && (
          <Col md={5}>
            <img
              src={thumbnail}
              alt={product.name}
              className="img-fluid rounded border"
              style={{ borderColor: 'var(--color-gray-200)' }}
            />
          </Col>
        )}
        <Col md={thumbnail ? 7 : 12}>
          <p className="text-secondary mb-1">
            <small>
              {product.code} · <Badge bg={availabilityVariant[product.availability]}>{product.availability}</Badge>
            </small>
          </p>
          <h1 className="h2">{product.name}</h1>
          <p className="fs-3 tc-price">{formatQuetzales(product.price)}</p>
          <p>{product.description ?? product.specs}</p>

          {product.specTable && (
            <Table className="mb-4" borderless size="sm">
              <caption>Especificaciones técnicas</caption>
              <tbody>
                {product.specTable.map(({ label, value }) => (
                  <tr key={label}>
                    <th scope="row" style={{ width: '40%' }}>
                      {label}
                    </th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Form onSubmit={handleAddToCart} className="d-flex align-items-end gap-3 mb-4 flex-wrap">
            <Form.Group controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                style={{ width: '6rem' }}
                disabled={isOutOfStock}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={isOutOfStock}>
              {isOutOfStock ? 'No disponible' : 'Agregar al carrito'}
            </Button>
            {added && <span className="text-success">Agregado al carrito.</span>}
          </Form>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Información de entrega</Accordion.Header>
              <Accordion.Body>
                {product.delivery ??
                  'Entrega estimada de 2 a 4 días hábiles dentro del departamento de Guatemala. Información demostrativa.'}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
