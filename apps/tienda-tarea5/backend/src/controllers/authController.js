import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.correo, role: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '5m' },
  )
}

export async function register(req, res) {
  const { nombre, correo, password } = req.body

  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: 'nombre, correo y password son obligatorios' })
  }

  const existente = await User.findOne({ correo: correo.toLowerCase().trim() })
  if (existente) {
    return res.status(409).json({ message: 'El correo ya está registrado' })
  }

  const user = await User.create({ nombre, correo, password, rol: 'cliente' })
  const token = signToken(user)

  return res.status(201).json({
    message: 'Usuario registrado correctamente',
    token,
    user: user.toJSON(),
  })
}

export async function login(req, res) {
  const { correo, password } = req.body

  if (!correo || !password) {
    return res.status(400).json({ message: 'correo y password son obligatorios' })
  }

  const user = await User.findOne({ correo: correo.toLowerCase().trim() }).select('+password')
  const credencialesValidas = user ? await user.comparePassword(password) : false

  if (!credencialesValidas) {
    return res.status(401).json({ message: 'Credenciales inválidas' })
  }

  const token = signToken(user)

  return res.status(200).json({
    message: 'Inicio de sesión exitoso',
    token,
    user: user.toJSON(),
  })
}
