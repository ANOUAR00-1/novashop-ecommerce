-- ================================================
-- NovaShop Database Seed Data
-- Sample data for testing
-- ================================================

-- ================================================
-- SEED ADMIN USER
-- Password: Admin@123456 (hashed with bcrypt)
-- ================================================
INSERT INTO users (id, email, password, first_name, last_name, role, is_verified)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@novashop.com',
    '$2a$10$8K1p/a0dL3LKzEO.AJ7UhePzLzxZKzJjJJJJJJJJJJJJJJJJJJJJJ', -- Admin@123456
    'Admin',
    'User',
    'admin',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- ================================================
-- SEED TEST USERS
-- ================================================
INSERT INTO users (id, email, password, first_name, last_name, role, is_verified)
VALUES 
(
    '00000000-0000-0000-0000-000000000002',
    'john@example.com',
    '$2a$10$8K1p/a0dL3LKzEO.AJ7UhePzLzxZKzJjJJJJJJJJJJJJJJJJJJJJJ', -- password123
    'John',
    'Doe',
    'user',
    TRUE
),
(
    '00000000-0000-0000-0000-000000000003',
    'jane@example.com',
    '$2a$10$8K1p/a0dL3LKzEO.AJ7UhePzLzxZKzJjJJJJJJJJJJJJJJJJJJJJJ', -- password123
    'Jane',
    'Smith',
    'user',
    TRUE
)
ON CONFLICT (email) DO NOTHING;

-- ================================================
-- SEED CATEGORIES
-- ================================================
INSERT INTO categories (id, name, slug, description)
VALUES 
(
    '10000000-0000-0000-0000-000000000001',
    'Electronics',
    'electronics',
    'Electronic devices and accessories'
),
(
    '10000000-0000-0000-0000-000000000002',
    'Fashion',
    'fashion',
    'Clothing, shoes, and accessories'
),
(
    '10000000-0000-0000-0000-000000000003',
    'Home & Garden',
    'home-garden',
    'Home improvement and garden supplies'
),
(
    '10000000-0000-0000-0000-000000000004',
    'Sports & Outdoors',
    'sports-outdoors',
    'Sports equipment and outdoor gear'
),
(
    '10000000-0000-0000-0000-000000000005',
    'Books',
    'books',
    'Books, magazines, and educational materials'
)
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- SEED PRODUCTS
-- ================================================
INSERT INTO products (id, name, description, price, original_price, image, images, category_id, rating, review_count, stock, features, specifications)
VALUES 
(
    '20000000-0000-0000-0000-000000000001',
    'Wireless Noise-Canceling Headphones',
    'Premium wireless headphones with active noise cancellation and 30-hour battery life. Experience crystal-clear sound quality.',
    299.99,
    399.99,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600"]',
    '10000000-0000-0000-0000-000000000001',
    4.8,
    127,
    45,
    '["Active Noise Cancellation", "30-hour battery life", "Premium sound quality", "Foldable design", "Touch controls"]',
    '{"Brand": "AudioMax", "Color": "Black", "Weight": "250g", "Bluetooth": "5.0"}'
),
(
    '20000000-0000-0000-0000-000000000002',
    'Smart Watch Series 7',
    'Advanced fitness tracker with heart rate monitor, GPS, and water resistance. Stay connected on the go.',
    399.99,
    499.99,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"]',
    '10000000-0000-0000-0000-000000000001',
    4.6,
    89,
    120,
    '["Heart rate monitor", "GPS tracking", "Water resistant", "Sleep tracking", "7-day battery"]',
    '{"Display": "AMOLED", "Size": "44mm", "Water Resistance": "50m"}'
),
(
    '20000000-0000-0000-0000-000000000003',
    'Premium Leather Jacket',
    'Genuine leather jacket with modern design. Perfect for any occasion.',
    189.99,
    249.99,
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    '["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"]',
    '10000000-0000-0000-0000-000000000002',
    4.7,
    64,
    30,
    '["Genuine leather", "Modern fit", "Multiple pockets", "Soft lining"]',
    '{"Material": "100% Leather", "Available Sizes": "S, M, L, XL"}'
),
(
    '20000000-0000-0000-0000-000000000004',
    'Running Shoes Pro',
    'Professional running shoes with advanced cushioning and breathable mesh.',
    129.99,
    159.99,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"]',
    '10000000-0000-0000-0000-000000000004',
    4.9,
    203,
    85,
    '["Advanced cushioning", "Breathable mesh", "Lightweight", "Durable sole"]',
    '{"Weight": "280g", "Available Sizes": "6-13"}'
),
(
    '20000000-0000-0000-0000-000000000005',
    'Modern Coffee Table',
    'Elegant coffee table with tempered glass top and solid wood legs.',
    249.99,
    299.99,
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    '["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"]',
    '10000000-0000-0000-0000-000000000003',
    4.5,
    41,
    15,
    '["Tempered glass top", "Solid wood legs", "Easy assembly", "Modern design"]',
    '{"Dimensions": "120x60x45cm", "Material": "Glass & Wood"}'
)
ON CONFLICT (id) DO NOTHING;

-- ================================================
-- SEED COUPONS
-- ================================================
INSERT INTO coupons (id, code, description, discount_type, discount_value, min_order_value, max_discount, usage_limit, is_active, expires_at)
VALUES 
(
    '30000000-0000-0000-0000-000000000001',
    'WELCOME10',
    'Welcome discount - 10% off your first order',
    'percentage',
    10,
    50,
    20,
    1000,
    TRUE,
    CURRENT_TIMESTAMP + INTERVAL '30 days'
),
(
    '30000000-0000-0000-0000-000000000002',
    'SAVE20',
    'Save $20 on orders over $100',
    'fixed',
    20,
    100,
    NULL,
    500,
    TRUE,
    CURRENT_TIMESTAMP + INTERVAL '60 days'
),
(
    '30000000-0000-0000-0000-000000000003',
    'BLACKFRIDAY',
    'Black Friday Special - 25% off',
    'percentage',
    25,
    0,
    100,
    10000,
    FALSE,
    CURRENT_TIMESTAMP + INTERVAL '7 days'
)
ON CONFLICT (code) DO NOTHING;

-- ================================================
-- COMPLETION MESSAGE
-- ================================================
DO $$
BEGIN
    RAISE NOTICE '✅ Sample data seeded successfully!';
    RAISE NOTICE '👤 Users: 3 (1 admin, 2 customers)';
    RAISE NOTICE '📦 Categories: 5';
    RAISE NOTICE '🛍️  Products: 5';
    RAISE NOTICE '🎫 Coupons: 3';
    RAISE NOTICE '';
    RAISE NOTICE '🔐 Admin Login:';
    RAISE NOTICE '   Email: admin@novashop.com';
    RAISE NOTICE '   Password: Admin@123456';
END $$;
