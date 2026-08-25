import { useMemo } from 'react'
import { Badge, Button, Container, Form, Table } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { categories, formatQuetzales, products } from '../data/products'

const availabilityVariant = {
  'En existencia': 'success',
  'Últimas unidades': 'warning',
  Agotado: 'danger',
}

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addItem } = useCart()

  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('categoria') ?? ''

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category ? product.category === category : true
      const matchesQuery = normalizedQuery
        ? `${product.name} ${product.specs}`.toLowerCase().includes(normalizedQuery)
        : true
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  function handleSearchChange(event) {
    const next = new URLSearchParams(searchParams)
    if (event.target.value) {
      next.set('q', event.target.value)
    } else {
      next.delete('q')
    }
    setSearchParams(next)
  }

  function handleCategoryChange(event) {
    const next = new URLSearchParams(searchParams)
    if (event.target.value) {
      next.set('categoria', event.target.value)
    } else {
      next.delete('categoria')
    }
    setSearchParams(next)
  }

  return (
    <Container className="py-4">
      <h1 className="h2 mb-3">Catálogo de computadoras y componentes</h1>
      <p className="text-secondary">
        Consulta nuestra selección de {products.length} productos en {categories.length} categorías.
      </p>

      <Form className="tc-panel p-3 mb-4" role="search">
        <Form.Group className="mb-3" controlId="buscar">
          <Form.Label>Producto o especificación</Form.Label>
          <Form.Control
            type="search"
            placeholder="Ejemplo: 16 GB RAM"
            value={query}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Form.Group controlId="filtro-categoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select value={category} onChange={handleCategoryChange}>
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>

      <div className="table-responsive">
        <Table hover>
          <caption>{filtered.length} productos encontrados</caption>
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Producto y especificaciones</th>
              <th scope="col">Categoría</th>
              <th scope="col">Disponibilidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const isOutOfStock = product.availability === 'Agotado'
              return (
                <tr key={product.id}>
                  <td>{product.code}</td>
                  <td>
                    <Link to={`/producto/${product.id}`} className="fw-bold text-decoration-none">
                      {product.name}
                    </Link>
                    <br />
                    <small className="text-secondary">{product.specs}</small>
                  </td>
                  <td>{categories.find((c) => c.slug === product.category)?.name}</td>
                  <td>
                    <Badge bg={availabilityVariant[product.availability]}>{product.availability}</Badge>
                  </td>
                  <td>{formatQuetzales(product.price)}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={isOutOfStock}
                      onClick={() => addItem(product.id, 1)}
                    >
                      {isOutOfStock ? 'No disponible' : 'Agregar'}
                    </Button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-secondary py-4">
                  No se encontraron productos con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}
