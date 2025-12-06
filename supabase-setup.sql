-- =============================================
-- VBK DESIGNS - COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- =============================================
-- 1. CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(50),
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. SUBCATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- =============================================
-- 3. PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id),
  subcategory_id UUID REFERENCES subcategories(id),
  -- Legacy fields for backward compatibility
  cat VARCHAR(50),
  sub VARCHAR(100),
  -- Pricing
  price INTEGER NOT NULL,
  original_price INTEGER,
  discount INTEGER DEFAULT 0,
  -- Images
  img TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  -- Details
  description TEXT,
  features TEXT[] DEFAULT '{}',
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_bestseller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. CUSTOMERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(15),
  city VARCHAR(100),
  avatar_url TEXT,
  wishlist UUID[] DEFAULT '{}',
  orders_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 5. ADDRESSES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  label VARCHAR(50) DEFAULT 'Home',
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. ORDERS TABLE (With Status Tracking)
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(20) UNIQUE,
  customer_id UUID REFERENCES customers(id),
  -- Order Details
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  -- Status: pending | accepted | processing | shipped | delivered | cancelled
  status VARCHAR(20) DEFAULT 'pending',
  -- Shipping Details (Admin fills)
  shipping_carrier VARCHAR(100),
  tracking_number VARCHAR(100),
  tracking_url TEXT,
  estimated_delivery DATE,
  -- Addresses
  address_id UUID REFERENCES addresses(id),
  shipping_address JSONB,
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  -- Payment
  payment_method VARCHAR(50) DEFAULT 'upi',
  payment_verified BOOLEAN DEFAULT false,
  payment_verified_at TIMESTAMPTZ,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 7. OFFERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  description TEXT,
  discount_percent INTEGER DEFAULT 0,
  min_order INTEGER DEFAULT 0,
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 8. ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 9. RLS POLICIES - CATEGORIES (Public Read)
-- =============================================
DROP POLICY IF EXISTS "Categories public read" ON categories;
DROP POLICY IF EXISTS "Categories admin write" ON categories;
CREATE POLICY "Categories public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories admin write" ON categories FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 10. RLS POLICIES - SUBCATEGORIES (Public Read)
-- =============================================
DROP POLICY IF EXISTS "Subcategories public read" ON subcategories;
DROP POLICY IF EXISTS "Subcategories admin write" ON subcategories;
CREATE POLICY "Subcategories public read" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Subcategories admin write" ON subcategories FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 11. RLS POLICIES - PRODUCTS
-- =============================================
DROP POLICY IF EXISTS "Products public read" ON products;
DROP POLICY IF EXISTS "Products admin write" ON products;
CREATE POLICY "Products public read" ON products FOR SELECT USING (true);
CREATE POLICY "Products admin write" ON products FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 12. RLS POLICIES - CUSTOMERS
-- =============================================
DROP POLICY IF EXISTS "Customers own profile" ON customers;
DROP POLICY IF EXISTS "Customers insert" ON customers;
DROP POLICY IF EXISTS "Customers update own" ON customers;
CREATE POLICY "Customers own profile" ON customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Customers insert" ON customers FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Customers update own" ON customers FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- 13. RLS POLICIES - ADDRESSES
-- =============================================
DROP POLICY IF EXISTS "Addresses own" ON addresses;
CREATE POLICY "Addresses own" ON addresses FOR ALL USING (auth.uid() = customer_id);

-- =============================================
-- 14. RLS POLICIES - ORDERS
-- =============================================
DROP POLICY IF EXISTS "Orders own read" ON orders;
DROP POLICY IF EXISTS "Orders own insert" ON orders;
DROP POLICY IF EXISTS "Orders admin all" ON orders;
CREATE POLICY "Orders own read" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Orders own insert" ON orders FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Orders admin all" ON orders FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 15. RLS POLICIES - OFFERS
-- =============================================
DROP POLICY IF EXISTS "Offers public read" ON offers;
DROP POLICY IF EXISTS "Offers admin write" ON offers;
CREATE POLICY "Offers public read" ON offers FOR SELECT USING (is_active = true);
CREATE POLICY "Offers admin write" ON offers FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 16. ORDER NUMBER SEQUENCE
-- =============================================
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1001;

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'VBK-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('order_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto order number
DROP TRIGGER IF EXISTS set_order_number ON orders;
CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- =============================================
-- 17. SAMPLE DATA - CATEGORIES
-- =============================================
INSERT INTO categories (name, slug, icon, display_order) VALUES
  ('Blouses', 'blouses', 'fa-shirt', 1),
  ('Wedding', 'wedding', 'fa-ring', 2),
  ('Lehangas', 'lehanga-designs', 'fa-dress', 3),
  ('Maggam Work', 'maggam-designs', 'fa-gem', 4),
  ('Kurthis', 'kurthi-designs', 'fa-vest', 5),
  ('Frocks', 'frock-designs', 'fa-child-dress', 6),
  ('Materials', 'materials', 'fa-scissors', 7),
  ('Tassels', 'saree-tassels-designs', 'fa-star', 8)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- 18. SAMPLE DATA - SUBCATEGORIES
-- =============================================
INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT c.id, 'V Neck', 'v-neck', 1 FROM categories c WHERE c.slug = 'blouses'
ON CONFLICT DO NOTHING;

INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT c.id, 'Boat Neck', 'boat-neck', 2 FROM categories c WHERE c.slug = 'blouses'
ON CONFLICT DO NOTHING;

INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT c.id, 'Pot Neck', 'pot-neck', 3 FROM categories c WHERE c.slug = 'blouses'
ON CONFLICT DO NOTHING;

INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT c.id, 'U Neck', 'u-neck', 4 FROM categories c WHERE c.slug = 'blouses'
ON CONFLICT DO NOTHING;

INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT c.id, 'Back Dori', 'back-dori', 5 FROM categories c WHERE c.slug = 'blouses'
ON CONFLICT DO NOTHING;

INSERT INTO subcategories (category_id, name, slug, display_order)
SELECT c.id, 'Temple Work', 'temple-work', 6 FROM categories c WHERE c.slug = 'blouses'
ON CONFLICT DO NOTHING;

-- =============================================
-- 19. SAMPLE DATA - OFFERS
-- =============================================
INSERT INTO offers (code, description, discount_percent, min_order, is_active) VALUES
  ('VBK20', '20% OFF on first order', 20, 0, true),
  ('BRIDAL30', '30% OFF on Bridal wear', 30, 1000, true),
  ('MAGGAM15', '15% OFF on Maggam Work', 15, 500, true)
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- DONE! Schema created successfully.
-- =============================================
