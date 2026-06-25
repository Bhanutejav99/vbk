'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, ChevronLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const WHATSAPP_PHONE = '919876543210'
const FREE_SHIPPING_THRESHOLD = 5000

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, getTotal, itemCount } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const total = getTotal()
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - total)

  const handleWhatsAppCheckout = () => {
    if (!user) {
      router.push('/login?redirect=/cart')
      return
    }
    let msg = `*New Inquiry from VBK Website*\n\n`
    msg += `*Name:* ${user.user_metadata?.name || user.email?.split('@')[0]}\n`
    msg += `*Email:* ${user.email}\n\n`
    msg += `*Selected Items:*\n`
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.title} (₹${item.price.toLocaleString()}) x${item.qty}\n`
    })
    msg += `\n*Est. Total:* ₹${total.toLocaleString()}\n`
    msg += `\nPlease confirm availability and stitching time.`
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={56} className="text-gray-600 mx-auto mb-5" />
        <h1 className="text-2xl font-bold font-serif text-white">Your cart is empty</h1>
        <p className="text-gray-400 mt-2">Browse our collections and add the designs you love.</p>
        <Link href="/products" className="inline-block mt-6 px-7 py-3 bg-vbk-gold text-vbk-navy font-bold rounded-xl hover:bg-white transition text-sm">
          Explore Collections
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-vbk-gold transition mb-6">
        <ChevronLeft size={16} /> Continue shopping
      </Link>

      <h1 className="text-3xl font-bold font-serif text-white mb-2">Your Cart</h1>
      <p className="text-sm text-gray-400 mb-8">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 glass-card rounded-xl p-4">
              <Link href={`/products/${item.id}`} className="shrink-0">
                <img src={item.img} alt={item.title} className="w-24 h-32 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-vbk-purple uppercase font-semibold">{item.sub}</p>
                    <Link href={`/products/${item.id}`}>
                      <h3 className="text-sm font-semibold text-white truncate hover:text-vbk-gold transition">{item.title}</h3>
                    </Link>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition" aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-base font-bold text-vbk-gold mt-1">₹{item.price.toLocaleString()}</p>

                <div className="flex items-center justify-between mt-auto pt-3">
                  {/* Qty stepper */}
                  <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2 text-gray-300 hover:bg-white/10 transition" aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-semibold text-white tabular-nums">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2 text-gray-300 hover:bg-white/10 transition" aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-gray-300">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-xs text-gray-500 hover:text-red-400 transition">
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{remainingForFreeShip === 0 ? <span className="text-emerald-400">Free</span> : 'Calculated at checkout'}</span>
              </div>
            </div>

            {remainingForFreeShip > 0 && (
              <p className="text-xs text-gray-400 mt-3 bg-white/5 rounded-lg p-2.5">
                Add <span className="text-vbk-gold font-semibold">₹{remainingForFreeShip.toLocaleString()}</span> more for free shipping.
              </p>
            )}

            <div className="border-t border-white/10 my-4" />
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-300 font-medium">Estimated Total</span>
              <span className="text-2xl font-bold text-vbk-gold">₹{total.toLocaleString()}</span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={18} /> Checkout via WhatsApp
            </button>
            <p className="text-[11px] text-gray-500 text-center mt-3 leading-relaxed">
              We confirm availability, final pricing &amp; stitching time over WhatsApp before any payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
