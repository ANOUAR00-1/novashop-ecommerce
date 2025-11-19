const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const reviewValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required')
];

// Public routes
router.get('/product/:productId', reviewController.getProductReviews);

// User routes
router.post('/', 
  protect, 
  reviewValidation, 
  validate, 
  reviewController.createReview
);

router.put('/:id', 
  protect, 
  reviewValidation, 
  validate, 
  reviewController.updateReview
);

router.delete('/:id', protect, reviewController.deleteReview);

// Admin routes
router.get('/', 
  protect, 
  authorize('admin', 'superadmin'), 
  reviewController.getAllReviews
);

router.patch('/:id/approve', 
  protect, 
  authorize('admin', 'superadmin'), 
  reviewController.approveReview
);

module.exports = router;
