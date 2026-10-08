import { useState } from 'react'
import { Alert, Badge, Button, Col, Container, Form, Modal, Row, Spinner, Table } from 'react-bootstrap'
import { categories, formatQuetzales } from '../data/products'
import { useProducts } from '../context/ProductsContext'

const availabilityOptions = ['En existencia', 'Últimas unidades', 'Agotado']

const emptyForm = {
  code: '',
  name: '',
  specs: '',
  category: categories[0]?.slug ?? '',
  availability: availabilityOptions[0],
  price: '',
  featured: false,
  description: '',
  delivery: '',
  thumbnail: '',
}

export default function AdminProductos() {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState(null)
  const [saving, setSaving] = useState(false)

  function openCreateModal() {
    setEditingId(null)
    setForm(emptyForm)
    setFormError(null)
    setShowModal(true)
  }

  function openEditModal(product) {
    setEditingId(product.id)
    setForm({
      code: product.code ?? '',
      name: product.name ?? '',
      specs: product.specs ?? '',
      category: product.category ?? categories[0]?.slug ?? '',
      availability: product.availability ?? availabilityOptions[0],
      price: product.price ?? '',
      featured: Boolean(product.featured),
      description: product.description ?? '',
      delivery: product.delivery ?? '',
      thumbnail: product.thumbnail ?? '',
    })
    setFormError(null)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function handleFieldChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError(null)
    setSaving(true)

    const payload = {
      ...form,
      price: Number(form.price),
    }

    try {
      if (editingId) {
        await updateProduct(editingId, payload)
      } else {
        await createProduct(payload)
      }
      setShowModal(false)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`¿Eliminar el producto "${product.name}"?`)
    if (!confirmed) {
      return
    }
    try {
      await deleteProduct(product.id)
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 mb-0">Administrar productos</h1>
        <Button variant="primary" onClick={openCreateModal}>
          Nuevo producto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" /> Cargando productos…
        </div>
      ) : (
        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoría</th>
                <th scope="col">Disponibilidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Destacado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{categories.find((c) => c.slug === product.category)?.name ?? product.category}</td>
                  <td>{product.availability}</td>
                  <td>{formatQuetzales(product.price)}</td>
                  <td>{product.featured && <Badge bg="primary">Sí</Badge>}</td>
                  <td className="d-flex gap-2">
                    <Button size="sm" variant="outline-primary" onClick={() => openEditModal(product)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(product)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-secondary py-4">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingId ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="admin-code">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={form.code}
                    onChange={(event) => handleFieldChange('code', event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="admin-name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="admin-specs">
                  <Form.Label>Especificaciones breves</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.specs}
                    onChange={(event) => handleFieldChange('specs', event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="admin-category">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    required
                    value={form.category}
                    onChange={(event) => handleFieldChange('category', event.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="admin-availability">
                  <Form.Label>Disponibilidad</Form.Label>
                  <Form.Select
                    value={form.availability}
                    onChange={(event) => handleFieldChange('availability', event.target.value)}
                  >
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="admin-price">
                  <Form.Label>Precio (Q)</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(event) => handleFieldChange('price', event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Form.Check
                  type="checkbox"
                  id="admin-featured"
                  label="Producto destacado"
                  checked={form.featured}
                  onChange={(event) => handleFieldChange('featured', event.target.checked)}
                />
              </Col>
              <Col md={12}>
                <Form.Group controlId="admin-description">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.description}
                    onChange={(event) => handleFieldChange('description', event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="admin-delivery">
                  <Form.Label>Información de entrega</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={form.delivery}
                    onChange={(event) => handleFieldChange('delivery', event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="admin-thumbnail">
                  <Form.Label>Nombre de archivo de imagen</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ejemplo: pc-gamer-nova.jpg"
                    value={form.thumbnail}
                    onChange={(event) => handleFieldChange('thumbnail', event.target.value)}
                  />
                  <Form.Text className="text-secondary">
                    Debe coincidir con un archivo existente en src/img/products/.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseModal} disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}
