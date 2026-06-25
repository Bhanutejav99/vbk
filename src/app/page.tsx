'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'
import Link from 'next/link'
import { ArrowRight, Sparkles, Gem, Scissors, Star } from 'lucide-react'
import { fetchProducts } from '@/lib/catalog'

const HERO_CATEGORIES = [
  { name: 'Blouses', slug: 'blouses', icon: Scissors, count: '50+' },
  { name: 'Wedding', slug: 'wedding', icon: Gem, count: '30+' },
  { name: 'Maggam Work', slug: 'maggam-designs', icon: Sparkles, count: '25+' },
  { name: 'New Arrivals', slug: 'all&new=true', icon: Star, count: '15+' },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const featuredProducts = products.filter(p => p.is_bestseller).slice(0, 4)
  const newArrivals = products.filter(p => p.is_new).slice(0, 4)
  const allProducts = products.slice(0, 8)

  return (
    <div>
      {/* === HERO SECTION === */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-vbk-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-vbk-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <p className="text-vbk-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4 animate-fade-in">Exclusive Boutique Collection</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-gradient leading-tight mb-6 animate-slide-up">
            Crafting Elegance,<br />One Stitch at a Time
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Premier Maggam Work, Bridal Stitching &amp; Boutique in Hindupuram.
            Discover handcrafted designs that make every occasion unforgettable.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-vbk-gold text-vbk-navy font-bold rounded-xl hover:bg-white transition-colors text-sm"
            >
              Explore Collections
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-white/20 text-white rounded-xl hover:border-vbk-gold hover:text-vbk-gold transition-colors text-sm font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Category Quick Access */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {HERO_CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/products?cat=${cat.slug}`}
              className="glass-card rounded-xl p-5 text-center group hover:border-vbk-gold/30 transition-all duration-300"
            >
              <cat.icon size={28} className="mx-auto mb-3 text-vbk-gold group-hover:scale-110 transition-transform" />
              <p className="text-sm font-semibold text-white">{cat.name}</p>
              <p className="text-xs text-gray-500 mt-1">{cat.count} Designs</p>
            </Link>
          ))}
        </div>
      </section>

      {/* === FEATURED PRODUCTS === */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">Bestsellers</h2>
              <p className="text-sm text-gray-400 mt-1">Our most loved designs</p>
            </div>
            <Link href="/products?bestseller=true" className="flex items-center gap-1 text-sm text-vbk-gold hover:text-white transition font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-vbk-card rounded-xl overflow-hidden">
                  <div className="skeleton aspect-[3/4]" />
                  <div className="p-3 space-y-2">
                    <div className="skeleton h-3 w-3/4" />
                    <div className="skeleton h-4 w-1/2" />
                  </div>
                </div>
              ))
              : featuredProducts.map(p => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </section>
      )}

      {/* === BANNER === */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-vbk-purple/20 via-vbk-card to-vbk-gold/10 border border-white/5 p-8 md:p-12">
          <div className="max-w-lg">
            <p className="text-vbk-gold text-sm font-bold tracking-wider uppercase mb-2">Custom Stitching</p>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-4">Get Your Dream Design Stitched</h3>
            <p className="text-gray-400 text-sm mb-6">Send us your design reference on WhatsApp and we&apos;ll bring it to life with premium craftsmanship.</p>
            <a
              href="https://wa.me/919876543210?text=Hi%20VBK%20Designs!%20I%20have%20a%20custom%20design%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-vbk-gold text-vbk-navy font-bold rounded-xl hover:bg-white transition text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-vbk-gold/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* === NEW ARRIVALS === */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">New Arrivals</h2>
              <p className="text-sm text-gray-400 mt-1">Freshly added to our collection</p>
            </div>
            <Link href="/products?new=true" className="flex items-center gap-1 text-sm text-vbk-gold hover:text-white transition font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* === ALL PRODUCTS === */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">All Designs</h2>
            <p className="text-sm text-gray-400 mt-1">Browse our complete collection</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm text-vbk-gold hover:text-white transition font-medium">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-vbk-card rounded-xl overflow-hidden">
                <div className="skeleton aspect-[3/4]" />
                <div className="p-3 space-y-2">
                  <div className="skeleton h-3 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                </div>
              </div>
            ))
            : allProducts.map(p => <ProductCard key={p.id} product={p} />)
          }
        </div>
      </section>

      {/* === REVIEWS === */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">What Our Customers Say</h2>
          <p className="text-sm text-gray-400 mt-2">Real reviews from happy brides</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Priya Sharma', text: 'Absolutely stunning maggam work! The bridal blouse was exactly what I dreamed of. VBK Designs truly understands craftsmanship.', rating: 5 },
            { name: 'Lakshmi Reddy', text: 'Perfect stitching quality and beautiful designs. The team was very patient with my custom requirements. Highly recommended!', rating: 5 },
            { name: 'Ananya Krishnan', text: 'Ordered a wedding lehanga set and it was gorgeous beyond expectations. The attention to detail is unmatched.', rating: 4 },
          ].map((review, i) => (
            <div key={i} className="glass-card rounded-xl p-6 hover:border-vbk-gold/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-vbk-purple/20 flex items-center justify-center text-vbk-purple font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{review.name}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
