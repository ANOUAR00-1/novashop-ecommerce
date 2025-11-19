-- ================================================
-- Migration: Update Categories for Shop Page
-- Date: 2024-11-18
-- ================================================

-- Delete old categories (Electronics, Fashion, Wearables)
DELETE FROM products WHERE category_id IN (
  SELECT id FROM categories WHERE slug IN ('electronics', 'fashion', 'wearables')
);
DELETE FROM categories WHERE slug IN ('electronics', 'fashion', 'wearables');

-- Insert new main categories
INSERT INTO categories (id, name, slug, description, parent_id) VALUES
-- BEDS
(uuid_generate_v4(), 'Beds', 'beds', 'Bedroom furniture and bed frames', NULL),
-- NIGHTSTANDS
(uuid_generate_v4(), 'Nightstands', 'nightstands', 'Bedside tables and stands', NULL),
-- ACCESSORIES
(uuid_generate_v4(), 'Accessories', 'accessories', 'Fashion accessories and add-ons', NULL),
-- FURNITURE LIST
(uuid_generate_v4(), 'Furniture', 'furniture', 'Home and office furniture', NULL)
ON CONFLICT (slug) DO NOTHING;

-- Insert BEDS subcategories
INSERT INTO categories (id, name, slug, description, parent_id) VALUES
(uuid_generate_v4(), 'Platform Beds', 'platform-beds', 'Modern platform bed frames', (SELECT id FROM categories WHERE slug = 'beds')),
(uuid_generate_v4(), 'Storage Beds', 'storage-beds', 'Beds with built-in storage', (SELECT id FROM categories WHERE slug = 'beds')),
(uuid_generate_v4(), 'Regular Beds', 'regular-beds', 'Classic bed frames', (SELECT id FROM categories WHERE slug = 'beds')),
(uuid_generate_v4(), 'Sleigh Beds', 'sleigh-beds', 'Curved headboard and footboard beds', (SELECT id FROM categories WHERE slug = 'beds')),
(uuid_generate_v4(), 'Modern Beds', 'modern-beds', 'Contemporary bed designs', (SELECT id FROM categories WHERE slug = 'beds'))
ON CONFLICT (slug) DO NOTHING;

-- Insert NIGHTSTANDS subcategories
INSERT INTO categories (id, name, slug, description, parent_id) VALUES
(uuid_generate_v4(), 'Wooden Stand', 'wooden-stand', 'Solid wood nightstands', (SELECT id FROM categories WHERE slug = 'nightstands')),
(uuid_generate_v4(), 'Storage Stand', 'storage-stand', 'Nightstands with drawers', (SELECT id FROM categories WHERE slug = 'nightstands')),
(uuid_generate_v4(), 'Barrel Stand', 'barrel-stand', 'Unique barrel-shaped stands', (SELECT id FROM categories WHERE slug = 'nightstands')),
(uuid_generate_v4(), 'Black Stand', 'black-stand', 'Black finish nightstands', (SELECT id FROM categories WHERE slug = 'nightstands')),
(uuid_generate_v4(), 'Bedside Stand', 'bedside-stand', 'Compact bedside tables', (SELECT id FROM categories WHERE slug = 'nightstands'))
ON CONFLICT (slug) DO NOTHING;

-- Insert ACCESSORIES subcategories
INSERT INTO categories (id, name, slug, description, parent_id) VALUES
(uuid_generate_v4(), 'Bow Ties', 'bow-ties', 'Formal bow ties collection', (SELECT id FROM categories WHERE slug = 'accessories')),
(uuid_generate_v4(), 'Belts', 'belts', 'Leather and fabric belts', (SELECT id FROM categories WHERE slug = 'accessories')),
(uuid_generate_v4(), 'Bags & Purses', 'bags-purses', 'Handbags and purses', (SELECT id FROM categories WHERE slug = 'accessories')),
(uuid_generate_v4(), 'Beauty Coats', 'beauty-coats', 'Stylish coats and jackets', (SELECT id FROM categories WHERE slug = 'accessories')),
(uuid_generate_v4(), 'Bags', 'bags', 'All types of bags', (SELECT id FROM categories WHERE slug = 'accessories'))
ON CONFLICT (slug) DO NOTHING;

-- Insert FURNITURE subcategories
INSERT INTO categories (id, name, slug, description, parent_id) VALUES
(uuid_generate_v4(), 'Caps & Hats', 'caps-hats', 'Headwear collection', (SELECT id FROM categories WHERE slug = 'furniture')),
(uuid_generate_v4(), 'Sofa', 'sofa', 'Comfortable sofas', (SELECT id FROM categories WHERE slug = 'furniture')),
(uuid_generate_v4(), 'Couch', 'couch', 'Living room couches', (SELECT id FROM categories WHERE slug = 'furniture')),
(uuid_generate_v4(), 'Chair', 'chair', 'Dining and office chairs', (SELECT id FROM categories WHERE slug = 'furniture')),
(uuid_generate_v4(), 'Bookcase', 'bookcase', 'Storage bookcases', (SELECT id FROM categories WHERE slug = 'furniture'))
ON CONFLICT (slug) DO NOTHING;
