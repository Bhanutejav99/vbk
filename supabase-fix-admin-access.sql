-- =============================================
-- FIX: Allow Admin to see all Customers and Orders
-- Run this in Supabase SQL Editor
-- =============================================

-- Drop existing restrictive policies on customers
DROP POLICY IF EXISTS "Customers own profile" ON customers;
DROP POLICY IF EXISTS "Customers insert" ON customers;
DROP POLICY IF EXISTS "Customers update own" ON customers;

-- Create new policies that allow:
-- 1. Any authenticated user can read their own profile
-- 2. Any authenticated user can read ALL customers (for admin)
-- 3. Users can insert/update their own profile

CREATE POLICY "Customers read all for authenticated"
ON customers FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Customers insert own"
ON customers FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Customers update own"
ON customers FOR UPDATE
USING (auth.uid() = id);

-- =============================================
-- FIX: Allow Admin to see and manage all Orders
-- =============================================

DROP POLICY IF EXISTS "Orders own read" ON orders;
DROP POLICY IF EXISTS "Orders own insert" ON orders;
DROP POLICY IF EXISTS "Orders admin all" ON orders;

-- Allow authenticated users to read all orders (for admin panel)
CREATE POLICY "Orders read all for authenticated"
ON orders FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow customers to insert their own orders
CREATE POLICY "Orders insert for authenticated"
ON orders FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update orders (admin updating status)
CREATE POLICY "Orders update for authenticated"
ON orders FOR UPDATE
USING (auth.role() = 'authenticated');

-- =============================================
-- SYNC: Create customers from existing auth users
-- This will sync auth.users to customers table
-- =============================================

INSERT INTO customers (id, email, name, created_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'name', au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
    au.created_at
FROM auth.users au
WHERE NOT EXISTS (
    SELECT 1 FROM customers c WHERE c.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- DONE! Now refresh your admin panel.
-- =============================================
