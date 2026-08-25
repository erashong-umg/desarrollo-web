import { Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatQuetzales, getCategoryBySlug } from '../data/products'
import { useCart } from '../context/CartContext'
import { getProductThumbnail } from '../utils/productImages'

const availabilityVariant = {
  'En existencia': 'success',
  'Últimas unidades': 'warning',
  Agotado: 'danger',
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const category = getCategoryBySlug(product.category)
  const isOutOfStock = product.availability === 'Agotado'
  const thumbnail = product.image?.jpg ?? getProductThumbnail(product.thumbnail)

  return (
    <Card className="h-100 tc-fade-in">
      {thumbnail && (
        <Card.Img variant="top" src={thumbnail} alt={product.name} style={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
      )}
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg={availabilityVariant[product.availability]}>{product.availability}</Badge>
          <small className="text-secondary">{product.code}</small>
        </div>
        <Card.Title as={Link} to={`/producto/${product.id}`} className="text-decoration-none">
          {product.name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-secondary">{category?.name}</Card.Subtitle>
        <Card.Text className="flex-grow-1">{product.specs}</Card.Text>
        <Card.Text className="fs-5 fw-bold text-warning">{formatQuetzales(product.price)}</Card.Text>
        <div className="d-flex gap-2 mt-auto">
          <Button as={Link} to={`/producto/${product.id}`} variant="outline-light" size="sm" className="flex-grow-1">
            Ver detalle
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-grow-1"
            disabled={isOutOfStock}
            onClick={() => addItem(product.id, 1)}
          >
            {isOutOfStock ? 'No disponible' : 'Agregar'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
