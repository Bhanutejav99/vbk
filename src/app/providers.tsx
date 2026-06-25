'use client'

import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ToastContainer from '@/components/ui/Toast'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <CartDrawer />
        <ToastContainer />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}
