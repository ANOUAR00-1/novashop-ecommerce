const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

// Admin routes - all analytics require admin access
router.get('/dashboard', 
  protect, 
  authorize('admin', 'superadmin'), 
  analyticsController.getDashboardStats
);

module.exports = router;
