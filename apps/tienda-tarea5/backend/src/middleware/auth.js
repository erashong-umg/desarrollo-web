import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'No se proporcionó un token de autenticación.',
    })
  }

  const token = authHeader.slice('Bearer '.length).trim()
  if (!token) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'No se proporcionó un token de autenticación.',
    })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'token_expired',
        message: 'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.',
      })
    }

    return res.status(401).json({
      error: 'invalid_token',
      message: 'El token de autenticación no es válido.',
    })
  }
}
