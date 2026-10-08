const BASE_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const { body, ...rest } = options
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

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
