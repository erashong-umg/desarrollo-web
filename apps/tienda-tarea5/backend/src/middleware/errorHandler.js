export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err)

  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Recurso no encontrado' })
  }

  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue ?? {})[0] ?? 'campo'
    return res.status(409).json({ message: `El valor de ${campo} ya está en uso` })
  }

  if (err.name === 'ValidationError') {
    const mensaje = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
    return res.status(400).json({ message: mensaje })
  }

  console.error(err)
  return res.status(500).json({ message: 'Error interno del servidor' })
}
