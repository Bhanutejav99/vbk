'use client'

import { Heart, ShoppingBag, Star } from 'lucide-react'
import type { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discountPercent = product.discount || (product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0)

  return (
    <div className="product-card glass-card rounded-xl overflow-hidden group relative">
      {/* Badges */}
      {discountPercent > 0 && (
        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-bold uppercase bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-sm shadow-lg">
          {discountPercent}% OFF
        </span>
      )}
      {product.is_bestseller && (
        <span className="absolute top-2 right-2 z-10 px-2 py-0.5 text-[10px] font-bold uppercase bg-gradient-to-r from-yellow-500 to-amber-400 text-gray-900 rounded-sm shadow-lg">
          Bestseller
        </span>
      )}
      {product.is_new && !product.is_bestseller && (
        <span className="absolute top-2 right-2 z-10 px-2 py-0.5 text-[10px] font-bold uppercase bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-sm shadow-lg animate-pulse">
          New
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-vbk-dark">
        {!imageLoaded && <div className="absolute inset-0 skeleton" />}
        <Link href={`/products/${product.id}`} className="block w-full h-full" aria-label={product.title}>
          <img
            src={product.img}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-vbk-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Hover Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); addItem(product) }}
            className="flex-1 py-2.5 bg-vbk-gold text-vbk-navy text-xs font-bold rounded-lg hover:bg-white transition flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
            className={`p-2.5 rounded-lg border transition ${wishlisted ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/10 border-white/20 text-white hover:border-vbk-gold'}`}
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        {/* Sub-category tag */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-vbk-purple mb-1">{product.sub}</p>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 leading-snug hover:text-vbk-gold transition-colors">{product.title}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-green-500/15 px-1.5 py-0.5 rounded-sm">
            <span className="text-[11px] font-semibold text-green-500">4.2</span>
            <Star size={9} className="text-green-500" fill="currentColor" />
          </div>
          <span className="text-[10px] text-gray-500">|</span>
          <span className="text-[10px] text-gray-500">128 reviews</span>
        </div>

        {/* Price Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-bold text-vbk-gold">₹{product.price.toLocaleString()}</span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-xs text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
          )}
          {discountPercent > 0 && (
            <span className="text-[11px] font-semibold text-pink-400">({discountPercent}% OFF)</span>
          )}
        </div>
      </div>
    </div>
  )
}
