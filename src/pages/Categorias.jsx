import { Accordion, Alert, Badge, Button, Container, ListGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { categories, formatQuetzales } from '../data/products'
import { useProducts } from '../context/ProductsContext'

export default function Categorias() {
  const { products, loading, error } = useProducts()

  return (
    <Container className="py-4">
      <h1 className="h2 mb-3">Explora por categoría</h1>
      <p className="text-secondary mb-4">
        Encuentra la tecnología adecuada para estudiar, trabajar, crear o jugar.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" /> Cargando categorías…
        </div>
      ) : (
        <Accordion alwaysOpen>
          {categories.map((category, index) => {
            const categoryProducts = products.filter((product) => product.category === category.slug)
            return (
              <Accordion.Item eventKey={String(index)} key={category.slug}>
                <Accordion.Header>
                  {category.name}{' '}
                  <Badge bg="primary" className="ms-2">
                    {categoryProducts.length}
                  </Badge>
                </Accordion.Header>
                <Accordion.Body>
                  <p>{category.description}</p>
                  <ListGroup variant="flush" className="mb-3">
                    {categoryProducts.map((product) => (
                      <ListGroup.Item
                        key={product.id}
                        as={Link}
                        to={`/producto/${product.id}`}
                        action
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {product.name} — {product.specs}
                        </span>
                        <strong className="tc-price">{formatQuetzales(product.price)}</strong>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button as={Link} to={`/catalogo?categoria=${category.slug}`} variant="outline-primary" size="sm">
                    Ver {category.name.toLowerCase()} en el catálogo
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      )}
    </Container>
  )
}
