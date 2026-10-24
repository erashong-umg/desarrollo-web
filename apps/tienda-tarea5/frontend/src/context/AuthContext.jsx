import { createContext, useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPost, setAuthToken, clearAuthToken, SESSION_EXPIRED_EVENT } from '../services/api'

const AuthContext = createContext(null)

const STORAGE_KEY = 'tc_auth_user'
const DEFAULT_SESSION_EXPIRED_MESSAGE =
  'Su sesión ya no es válida o ha caducado. Por favor, inicia sesión nuevamente.'

const initialState = {
  user: null,
  loading: true,
  error: null,
  sessionMessage: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, loading: false, error: null }
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null }
    case 'SESSION_EXPIRED':
      return { ...state, user: null, loading: false, error: null, sessionMessage: action.payload }
    case 'CLEAR_SESSION_MESSAGE':
      return { ...state, sessionMessage: null }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        dispatch({ type: 'LOGIN', payload: JSON.parse(stored) })
        return
      }
    } catch {
      // Ignora errores de parseo y continúa sin usuario hidratado.
    }
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  // Interceptor global: cuando services/api.js detecta un 401 en una petición
  // autorizada (token vencido o inválido), cierra la sesión local y redirige a /login.
  useEffect(() => {
    function handleSessionExpired(event) {
      clearAuthToken()
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Almacenamiento no disponible.
      }
      const message = event.detail?.message || DEFAULT_SESSION_EXPIRED_MESSAGE
      dispatch({ type: 'SESSION_EXPIRED', payload: message })
      navigate('/login', { replace: true })
    }

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
  }, [navigate])

  async function login(correo, password) {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await apiPost('/auth/login', { correo, password })
      setAuthToken(data.token)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user))
      dispatch({ type: 'LOGIN', payload: data.user })
      return data.user
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      return undefined
    }
  }

  async function register(nombre, correo, password) {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await apiPost('/auth/register', { nombre, correo, password })
      setAuthToken(data.token)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user))
      dispatch({ type: 'LOGIN', payload: data.user })
      return data.user
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      return undefined
    }
  }

  function logout() {
    clearAuthToken()
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'LOGOUT' })
  }

  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  function clearSessionMessage() {
    dispatch({ type: 'CLEAR_SESSION_MESSAGE' })
  }

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    sessionMessage: state.sessionMessage,
    login,
    register,
    logout,
    clearError,
    clearSessionMessage,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
