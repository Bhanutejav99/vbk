'use client'

import { X, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const WHATSAPP_PHONE = '919876543210'

export default function CartDrawer() {
  const { items, removeItem, clearCart, getTotal, isOpen, setIsOpen, itemCount } = useCart()
  const { user } = useAuth()

  const handleWhatsAppCheckout = () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    let msg = `*New Inquiry from VBK Website*\n\n`
    msg += `*Name:* ${user.user_metadata?.name || user.email?.split('@')[0]}\n`
    msg += `*Email:* ${user.email}\n\n`
    msg += `*Selected Items:*\n`

    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.title} (₹${item.price.toLocaleString()}) x${item.qty}\n`
    })

    msg += `\n*Est. Total:* ₹${getTotal().toLocaleString()}\n`
    msg += `\nPlease confirm availability and stitching time.`

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-vbk-card border-l border-white/10 z-50 flex flex-col animate-slide-up" style={{ animationName: 'none', transform: 'translateX(0)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-vbk-gold" />
            <h2 className="text-lg font-bold text-white">Your Cart</h2>
            <span className="ml-1 px-2 py-0.5 bg-vbk-gold/20 text-vbk-gold text-xs font-bold rounded-full">{itemCount}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition" aria-label="Close cart">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-500 mt-1">Browse our collections and add items you love</p>
              <button onClick={() => setIsOpen(false)} className="mt-6 px-6 py-2.5 bg-vbk-gold text-vbk-navy text-sm font-bold rounded-lg hover:bg-white transition">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-vbk-navy/50 rounded-xl p-3 border border-white/5">
                <img src={item.img} alt={item.title} className="w-20 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                  <p className="text-[10px] text-vbk-purple uppercase font-semibold mt-0.5">{item.sub}</p>
                  <p className="text-sm font-bold text-vbk-gold mt-2">₹{item.price.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500">Qty: {item.qty}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 self-start rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition" aria-label="Remove item">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Estimated Total</span>
              <span className="text-xl font-bold text-vbk-gold">₹{getTotal().toLocaleString()}</span>
            </div>
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={18} /> Checkout via WhatsApp
            </button>
            <button onClick={clearCart} className="w-full py-2.5 border border-white/10 text-gray-400 text-sm rounded-xl hover:text-red-400 hover:border-red-500/30 transition">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
