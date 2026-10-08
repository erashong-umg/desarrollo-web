import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js'

const router = Router()

router.get('/', asyncHandler(listarProductos))
router.get('/:id', asyncHandler(obtenerProducto))
router.post('/', asyncHandler(crearProducto))
router.put('/:id', asyncHandler(actualizarProducto))
router.patch('/:id', asyncHandler(actualizarProducto))
router.delete('/:id', asyncHandler(eliminarProducto))

export default router
