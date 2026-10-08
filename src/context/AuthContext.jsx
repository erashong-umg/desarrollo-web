import { createContext, useContext, useEffect, useReducer } from 'react'
import { apiPost } from '../services/api'

const AuthContext = createContext(null)

const STORAGE_KEY = 'tc_auth_user'

const initialState = {
  user: null,
  loading: true,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, loading: false, error: null }
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null }
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

  async function login(correo, password) {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await apiPost('/auth/login', { correo, password })
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user))
      dispatch({ type: 'LOGIN', payload: data.user })
      return data.user
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
      return undefined
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: 'LOGOUT' })
  }

  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    clearError,
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
