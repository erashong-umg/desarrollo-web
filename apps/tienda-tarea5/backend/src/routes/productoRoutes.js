import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/auth.js'
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js'

const router = Router()

// Catálogo de lectura pública: el storefront lo consume sin autenticación.
router.get('/', asyncHandler(listarProductos))
router.get('/:id', asyncHandler(obtenerProducto))

// Mutaciones del catálogo: requieren un JWT válido (Authorization: Bearer <token>).
router.post('/', requireAuth, asyncHandler(crearProducto))
router.put('/:id', requireAuth, asyncHandler(actualizarProducto))
router.patch('/:id', requireAuth, asyncHandler(actualizarProducto))
router.delete('/:id', requireAuth, asyncHandler(eliminarProducto))

export default router
