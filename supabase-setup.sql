-- VBK Designs Database Setup
-- Run this in Supabase SQL Editor

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  sub VARCHAR(100),
  cat VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  discount INTEGER DEFAULT 0,
  img TEXT NOT NULL,
  images TEXT[],
  is_active BOOLEAN DEFAULT true,
  is_bestseller BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Offers Table
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

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  phone VARCHAR(15),
  city VARCHAR(100),
  orders_count INTEGER DEFAULT 0,
  wishlist UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - Allow public read for products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Products are editable by authenticated users" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- 6. RLS Policies - Allow public read for active offers
CREATE POLICY "Active offers are viewable by everyone" ON offers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Offers are editable by authenticated users" ON offers
  FOR ALL USING (auth.role() = 'authenticated');

-- 7. RLS Policies - Customers only viewable by auth
CREATE POLICY "Customers are viewable by authenticated users" ON customers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Customers are insertable by everyone" ON customers
  FOR INSERT WITH CHECK (true);

-- 8. Insert sample offers
INSERT INTO offers (code, description, discount_percent, min_order, is_active) VALUES
  ('VBK20', '20% OFF on first order', 20, 0, true),
  ('BRIDAL30', '30% OFF on Bridal wear', 30, 1000, true),
  ('MAGGAM15', '15% OFF on Maggam Work', 15, 500, true);

-- Done! Now create an admin user in Supabase Auth
