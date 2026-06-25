'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import type { Product } from '@/types'
import { fetchProducts, CATEGORIES, CATEGORY_LABELS } from '@/lib/catalog'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'newest', label: 'Newest' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const cat = searchParams.get('cat') || 'all'
  const search = searchParams.get('search') || ''
  const onlyNew = searchParams.get('new') === 'true'
  const onlyBestseller = searchParams.get('bestseller') === 'true'
  const sort = (searchParams.get('sort') as SortKey) || 'featured'

  const [searchInput, setSearchInput] = useState(search)
  // Keep the input in sync when the URL `search` param changes (render-time
  // adjustment — the pattern React recommends over an effect).
  const [prevSearch, setPrevSearch] = useState(search)
  if (prevSearch !== search) {
    setPrevSearch(search)
    setSearchInput(search)
  }

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  // Update a single query param, preserving the rest.
  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '' || value === 'all') params.delete(key)
    else params.set(key, value)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (cat !== 'all') list = list.filter(p => p.cat === cat)
    if (onlyNew) list = list.filter(p => p.is_new)
    if (onlyBestseller) list = list.filter(p => p.is_bestseller)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.sub?.toLowerCase().includes(q) ||
          CATEGORY_LABELS[p.cat]?.toLowerCase().includes(q),
      )
    }
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'newest': list.sort((a, b) => Number(!!b.is_new) - Number(!!a.is_new)); break
      case 'featured': list.sort((a, b) => Number(!!b.is_bestseller) - Number(!!a.is_bestseller)); break
    }
    return list
  }, [products, cat, onlyNew, onlyBestseller, search, sort])

  const activeFilterCount = (cat !== 'all' ? 1 : 0) + (onlyNew ? 1 : 0) + (onlyBestseller ? 1 : 0) + (search ? 1 : 0)

  const heading =
    cat !== 'all' ? CATEGORY_LABELS[cat] || 'Collections'
      : onlyBestseller ? 'Bestsellers'
        : onlyNew ? 'New Arrivals'
          : search ? `Results for “${search}”`
            : 'All Designs'

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-white">{heading}</h1>
        <p className="text-sm text-gray-400 mt-2">
          {loading ? 'Loading our collection…' : `${filtered.length} ${filtered.length === 1 ? 'design' : 'designs'} available`}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') setParam('search', searchInput.trim()) }}
          placeholder="Search blouses, maggam work, wedding designs…"
          className="w-full bg-vbk-dark/80 border border-vbk-mid/50 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-vbk-gold/50 transition"
        />
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
        <button
          onClick={() => setParam('cat', 'all')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition border ${cat === 'all' ? 'bg-vbk-gold text-vbk-navy border-vbk-gold' : 'text-gray-300 border-white/10 hover:border-vbk-gold/40'}`}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.slug}
            onClick={() => setParam('cat', c.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition border ${cat === c.slug ? 'bg-vbk-gold text-vbk-navy border-vbk-gold' : 'text-gray-300 border-white/10 hover:border-vbk-gold/40'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Toolbar: toggles + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setParam('bestseller', onlyBestseller ? null : 'true')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${onlyBestseller ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'text-gray-400 border-white/10 hover:border-white/30'}`}
          >
            Bestsellers
          </button>
          <button
            onClick={() => setParam('new', onlyNew ? null : 'true')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${onlyNew ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40' : 'text-gray-400 border-white/10 hover:border-white/30'}`}
          >
            New Arrivals
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={() => router.push(pathname)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-red-400 transition"
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-400">
          <SlidersHorizontal size={15} />
          <select
            value={sort}
            onChange={e => setParam('sort', e.target.value)}
            className="bg-vbk-dark border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-vbk-gold/50"
          >
            {SORTS.map(s => (
              <option key={s.key} value={s.key} className="bg-vbk-dark">{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-vbk-card rounded-xl overflow-hidden">
              <div className="skeleton aspect-[3/4]" />
              <div className="p-3 space-y-2">
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <Search size={40} className="text-gray-600 mb-4" />
          <p className="text-lg font-semibold text-white">No designs found</p>
          <p className="text-sm text-gray-400 mt-1 max-w-sm">
            Try a different category or search term — or message us on WhatsApp for a custom design.
          </p>
          <button
            onClick={() => router.push(pathname)}
            className="mt-6 px-6 py-2.5 bg-vbk-gold text-vbk-navy text-sm font-bold rounded-lg hover:bg-white transition"
          >
            View all designs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center text-gray-400">Loading collection…</div>}>
      <ProductsContent />
    </Suspense>
  )
}
