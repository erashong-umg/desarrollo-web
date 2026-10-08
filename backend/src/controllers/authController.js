import User from '../models/User.js'

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

  return res.status(201).json({
    message: 'Usuario registrado correctamente',
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

  return res.status(200).json({
    message: 'Inicio de sesión exitoso',
    user: user.toJSON(),
  })
}
