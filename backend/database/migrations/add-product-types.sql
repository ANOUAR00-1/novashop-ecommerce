-- ================================================
-- Migration: Add Product Types and Related Fields
-- Date: 2024-11-18
-- ================================================

-- Add product_type enum column
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS product_type VARCHAR(50) DEFAULT 'simple' 
CHECK (product_type IN ('simple', 'variable', 'affiliate', 'soldout', 'countdown'));

-- Add affiliate link for affiliate products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS affiliate_link VARCHAR(500);

-- Add countdown end date for countdown products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS countdown_end TIMESTAMP;

-- Add index for product_type
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);

-- Comment on columns
COMMENT ON COLUMN products.product_type IS 'Type of product: simple, variable, affiliate, soldout, countdown';
COMMENT ON COLUMN products.affiliate_link IS 'External URL for affiliate products';
COMMENT ON COLUMN products.countdown_end IS 'End date/time for countdown sales';
