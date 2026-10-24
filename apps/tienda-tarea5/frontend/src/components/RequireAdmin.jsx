import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  if (!user || user.rol !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
