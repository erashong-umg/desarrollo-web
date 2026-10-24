const BASE_URL = import.meta.env.VITE_API_URL
const TOKEN_STORAGE_KEY = 'tc_auth_token'

// Evento global emitido cuando el servidor rechaza un token (vencido o inválido),
// para que AuthContext pueda cerrar la sesión y redirigir sin acoplar este módulo a React.
export const SESSION_EXPIRED_EVENT = 'auth:session-expired'

export function setAuthToken(token) {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch {
    // Almacenamiento no disponible (ej. navegación privada); la sesión no persiste.
  }
}

export function clearAuthToken() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch {
    // Almacenamiento no disponible.
  }
}

function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

async function request(path, options = {}) {
  const { body, ...rest } = options
  const token = getAuthToken()

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...rest.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  // Un 401 solo implica caducidad de sesión si la petición iba autorizada con un
  // token; un 401 de login con credenciales inválidas no debe disparar un logout.
  if (res.status === 401 && token) {
    let data = null
    try {
      data = await res.clone().json()
    } catch {
      // El cuerpo no era JSON parseable.
    }
    window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail: data }))
  }

  if (!res.ok) {
    let message = 'Ocurrió un error al comunicarse con el servidor.'
    try {
      const data = await res.json()
      if (data?.message) {
        message = data.message
      }
    } catch {
      // El cuerpo no era JSON parseable, se usa el mensaje genérico.
    }
    throw new Error(message)
  }

  if (res.status === 204) {
    return undefined
  }

  return res.json()
}

export function apiGet(path) {
  return request(path, { method: 'GET' })
}

export function apiPost(path, body) {
  return request(path, { method: 'POST', body })
}

export function apiPut(path, body) {
  return request(path, { method: 'PUT', body })
}

export function apiDelete(path) {
  return request(path, { method: 'DELETE' })
}
