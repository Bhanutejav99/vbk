-- =============================================
-- VBK DESIGNS - MIGRATION SCRIPT
-- Run this AFTER supabase-setup.sql
-- Only adds new columns to existing tables
-- =============================================

-- Add new columns to products table (if not exists)
DO $$ 
BEGIN
    -- Add category_id if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'category_id') THEN
        ALTER TABLE products ADD COLUMN category_id UUID REFERENCES categories(id);
    END IF;
    
    -- Add subcategory_id if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'subcategory_id') THEN
        ALTER TABLE products ADD COLUMN subcategory_id UUID REFERENCES subcategories(id);
    END IF;
    
    -- Add images array if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'images') THEN
        ALTER TABLE products ADD COLUMN images TEXT[] DEFAULT '{}';
    END IF;
    
    -- Add description if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'description') THEN
        ALTER TABLE products ADD COLUMN description TEXT;
    END IF;
    
    -- Add features if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'features') THEN
        ALTER TABLE products ADD COLUMN features TEXT[] DEFAULT '{}';
    END IF;
    
    -- Add is_new if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_new') THEN
        ALTER TABLE products ADD COLUMN is_new BOOLEAN DEFAULT false;
    END IF;
    
    -- Add updated_at if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'updated_at') THEN
        ALTER TABLE products ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- Done!
SELECT 'Migration completed!' as status;
