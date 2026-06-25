'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem, Product } from '@/types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  getTotal: () => number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vbk_cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        localStorage.removeItem('vbk_cart')
      }
    }
  }, [])

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('vbk_cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.id !== productId))
  }, [])

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems(prev =>
      qty <= 0
        ? prev.filter(i => i.id !== productId)
        : prev.map(i => (i.id === productId ? { ...i, qty } : i)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
  }, [items])

  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, getTotal, isOpen, setIsOpen, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
