'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ShoppingBag, Heart, Check, ChevronLeft, Star, Truck, ShieldCheck, MessageCircle,
} from 'lucide-react'
import type { Product } from '@/types'
import { fetchProducts, CATEGORY_LABELS } from '@/lib/catalog'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ui/ProductCard'

const WHATSAPP_PHONE = '919876543210'

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const { addItem, setIsOpen } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [activeForId, setActiveForId] = useState(id)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  // Reset gallery selection when navigating between products (render-time
  // adjustment, since the route component is reused across product ids).
  if (activeForId !== id) {
    setActiveForId(id)
    setActiveImg(0)
  }

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const product = useMemo(() => products.find(p => p.id === id), [products, id])
  const related = useMemo(
    () => (product ? products.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4) : []),
    [products, product],
  )

  const gallery = useMemo(() => {
    if (!product) return []
    return product.images && product.images.length > 0 ? product.images : [product.img]
  }, [product])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="skeleton aspect-[3/4] rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-6 w-32" />
            <div className="skeleton h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold font-serif text-white">Design not found</h1>
        <p className="text-gray-400 mt-2">This piece may have been moved or is no longer available.</p>
        <Link href="/products" className="inline-block mt-6 px-6 py-3 bg-vbk-gold text-vbk-navy font-bold rounded-xl hover:bg-white transition text-sm">
          Browse all designs
        </Link>
      </div>
    )
  }

  const discountPercent = product.discount || (product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const whatsappMsg = encodeURIComponent(
    `Hi VBK Designs! I'm interested in *${product.title}* (₹${product.price.toLocaleString()}). Is it available and what's the stitching time?`,
  )

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-vbk-gold transition">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-vbk-gold transition">Collections</Link>
        <span>/</span>
        <Link href={`/products?cat=${product.cat}`} className="hover:text-vbk-gold transition">{CATEGORY_LABELS[product.cat] || product.cat}</Link>
        <span>/</span>
        <span className="text-gray-300 truncate max-w-[160px]">{product.title}</span>
      </nav>

      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-vbk-gold transition mb-6">
        <ChevronLeft size={16} /> Back to collection
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-vbk-dark border border-white/5">
            <img src={gallery[activeImg]} alt={product.title} className="w-full h-full object-cover" />
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded shadow-lg">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 mt-4">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition ${activeImg === i ? 'border-vbk-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-vbk-purple mb-2">
            {CATEGORY_LABELS[product.cat] || product.cat} · {product.sub}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-white leading-tight">{product.title}</h1>

          {/* Rating row (placeholder until real reviews exist) */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400" fill={i < 4 ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-xs text-gray-400">Handcrafted to order</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-5 flex-wrap">
            <span className="text-3xl font-bold text-vbk-gold">₹{product.price.toLocaleString()}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-lg text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
            )}
            {discountPercent > 0 && (
              <span className="text-sm font-semibold text-pink-400">({discountPercent}% OFF)</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes · Custom stitching priced on consultation</p>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-300 leading-relaxed mt-6">{product.description}</p>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className="mt-5 space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check size={16} className="text-vbk-gold mt-0.5 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 bg-vbk-gold text-vbk-navy font-bold rounded-xl hover:bg-white transition flex items-center justify-center gap-2 text-sm"
            >
              {added ? <><Check size={18} /> Added to Cart</> : <><ShoppingBag size={18} /> Add to Cart</>}
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`p-3.5 rounded-xl border transition ${wishlisted ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'border-white/15 text-white hover:border-vbk-gold'}`}
              aria-label="Add to wishlist"
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {added && (
            <button onClick={() => setIsOpen(true)} className="mt-3 text-sm text-vbk-gold hover:text-white transition font-medium">
              View cart →
            </button>
          )}

          {/* WhatsApp enquire */}
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle size={18} /> Enquire on WhatsApp
          </a>

          {/* Trust strip */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="flex items-center gap-2 glass-card rounded-xl p-3">
              <Truck size={18} className="text-vbk-gold flex-shrink-0" />
              <span className="text-xs text-gray-300">Pan-India shipping · Free above ₹5000</span>
            </div>
            <div className="flex items-center gap-2 glass-card rounded-xl p-3">
              <ShieldCheck size={18} className="text-vbk-gold flex-shrink-0" />
              <span className="text-xs text-gray-300">Premium craftsmanship guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl font-bold font-serif text-white mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
