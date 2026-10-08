import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../services/api'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGet('/recursos')
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function createProduct(data) {
    await apiPost('/recursos', data)
    await refresh()
  }

  async function updateProduct(id, data) {
    await apiPut(`/recursos/${id}`, data)
    await refresh()
  }

  async function deleteProduct(id) {
    await apiDelete(`/recursos/${id}`)
    await refresh()
  }

  const value = {
    products,
    loading,
    error,
    refresh,
    createProduct,
    updateProduct,
    deleteProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductsProvider')
  }
  return context
}
