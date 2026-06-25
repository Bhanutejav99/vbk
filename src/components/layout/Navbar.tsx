'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userDropdown, setUserDropdown] = useState(false)
  const { setIsOpen, itemCount } = useCart()
  const { user, signOut } = useAuth()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Collections' },
    { href: '/products?cat=blouses', label: 'Blouses' },
    { href: '/products?cat=wedding', label: 'Wedding' },
    { href: '/products?cat=materials', label: 'Materials' },
  ]

  return (
    <>
      {/* Offers Banner */}
      <div className="offers-banner py-2 text-white text-center relative z-50">
        <div className="offers-scroll">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="inline-flex items-center gap-2 px-10 text-xs font-semibold">
                🎉 Use code <span className="bg-white text-pink-500 px-2 py-0.5 rounded font-bold text-[11px]">VBK20</span> for 20% OFF
              </span>
              <span className="inline-flex items-center gap-2 px-10 text-xs font-semibold">
                💍 Bridal Season Sale — <span className="bg-white text-pink-500 px-2 py-0.5 rounded font-bold text-[11px]">BRIDAL30</span> for 30% OFF
              </span>
              <span className="inline-flex items-center gap-2 px-10 text-xs font-semibold">
                ✨ Free Shipping on orders above ₹5000
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="glass sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-serif text-gradient">VBK Designs</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-vbk-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-300" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-white/10 transition-colors relative" aria-label="Wishlist">
              <Heart size={20} className="text-gray-300" />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} className="text-gray-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-vbk-gold text-vbk-navy text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-gold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="User menu"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" className="w-7 h-7 rounded-full border-2 border-vbk-gold/50" />
                  ) : (
                    <User size={20} className="text-vbk-gold" />
                  )}
                </button>
                {userDropdown && (
                  <div className="absolute right-0 top-12 w-56 glass-card rounded-xl p-3 space-y-1 z-50">
                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                      <p className="text-sm font-semibold text-white truncate">{user.user_metadata?.name || user.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link href="/orders" className="block px-3 py-2 text-sm text-gray-300 hover:text-vbk-gold hover:bg-white/5 rounded-lg transition" onClick={() => setUserDropdown(false)}>
                      My Orders
                    </Link>
                    <button onClick={async () => { await signOut(); setUserDropdown(false) }} className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition flex items-center gap-2">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Login">
                <User size={20} className="text-gray-300" />
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto mt-4 animate-slide-up">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
                  }
                }}
                placeholder="Search blouses, maggam work, wedding designs..."
                className="w-full bg-vbk-dark/80 border border-vbk-mid/50 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-vbk-gold/50 transition"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-vbk-gold hover:bg-white/5 rounded-lg transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
