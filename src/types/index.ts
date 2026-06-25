// === VBK Designs: Core Type Definitions ===

export interface Product {
  id: string
  title: string
  category_id?: string
  subcategory_id?: string
  cat: string
  sub: string
  price: number
  original_price?: number
  discount?: number
  img: string
  images?: string[]
  description?: string
  features?: string[]
  is_active?: boolean
  is_bestseller?: boolean
  is_new?: boolean
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  image_url?: string
  display_order?: number
  is_active?: boolean
}

export interface Subcategory {
  id: string
  category_id: string
  name: string
  slug: string
  display_order?: number
  is_active?: boolean
}

export interface Customer {
  id: string
  email: string
  name?: string
  phone?: string
  city?: string
  avatar_url?: string
  wishlist?: string[]
  orders_count?: number
  created_at?: string
}

export interface Address {
  id: string
  customer_id: string
  label: string
  name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  pincode: string
  is_default?: boolean
}

export interface OrderItem {
  product_id: string
  title: string
  price: number
  img: string
  qty: number
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  items: OrderItem[]
  total_amount: number
  status: 'pending' | 'accepted' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_carrier?: string
  tracking_number?: string
  tracking_url?: string
  estimated_delivery?: string
  address_id?: string
  shipping_address?: Record<string, string>
  customer_notes?: string
  admin_notes?: string
  payment_method?: string
  payment_verified?: boolean
  created_at?: string
  updated_at?: string
}

export interface Offer {
  id: string
  code: string
  description?: string
  discount_percent: number
  min_order: number
  valid_until?: string
  is_active: boolean
}

export interface CartItem extends Product {
  qty: number
}
