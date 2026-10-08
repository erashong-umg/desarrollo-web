import Producto from '../models/Producto.js'

export async function listarProductos(req, res) {
  const { categoria, q, featured, disponibilidad } = req.query
  const filtro = {}

  if (categoria) filtro.category = categoria
  if (featured !== undefined) filtro.featured = featured === 'true'
  if (disponibilidad) filtro.availability = disponibilidad
  if (q) {
    const regex = new RegExp(q, 'i')
    filtro.$or = [{ name: regex }, { specs: regex }, { code: regex }]
  }

  const productos = await Producto.find(filtro).sort({ createdAt: -1 })
  return res.json(productos)
}

export async function obtenerProducto(req, res) {
  const producto = await Producto.findById(req.params.id)
  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json(producto)
}

export async function crearProducto(req, res) {
  const { code, name, category, price } = req.body
  if (!code || !name || !category || price === undefined) {
    return res.status(400).json({ message: 'code, name, category y price son obligatorios' })
  }

  const producto = await Producto.create(req.body)
  return res.status(201).json(producto)
}

export async function actualizarProducto(req, res) {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json(producto)
}

export async function eliminarProducto(req, res) {
  const producto = await Producto.findByIdAndDelete(req.params.id)
  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado' })
  }
  return res.json({ message: 'Producto eliminado', id: req.params.id })
}
