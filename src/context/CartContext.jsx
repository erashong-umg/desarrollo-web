import { createContext, useContext, useMemo, useState } from 'react'
import { getProductById } from '../data/products'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(productId, quantity = 1) {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId)
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(5, item.quantity + quantity) }
            : item,
        )
      }
      return [...current, { productId, quantity: Math.min(5, quantity) }]
    })
  }

  function updateQuantity(productId, quantity) {
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(5, quantity)) } : item,
      ),
    )
  }

  function removeItem(productId) {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => ({ ...item, product: getProductById(item.productId) }))
        .filter((item) => item.product),
    [items],
  )

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const totalPrice = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [detailedItems],
  )

  const value = {
    items: detailedItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}
