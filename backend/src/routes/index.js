const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const couponRoutes = require('./couponRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const categoryRoutes = require('./categoryRoutes');
const uploadRoutes = require('./uploadRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/coupons', couponRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/categories', categoryRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
