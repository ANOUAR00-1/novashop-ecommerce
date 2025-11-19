const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const couponController = require('../controllers/couponController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const couponValidation = [
  body('code').notEmpty().withMessage('Coupon code is required'),
  body('discountType')
    .isIn(['percentage', 'fixed'])
    .withMessage('Discount type must be percentage or fixed'),
  body('discountValue')
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positive number')
];

const validateCouponValidation = [
  body('code').notEmpty().withMessage('Coupon code is required'),
  body('orderTotal')
    .isFloat({ min: 0 })
    .withMessage('Order total must be a positive number')
];

// Public routes
router.post('/validate', 
  validateCouponValidation, 
  validate, 
  couponController.validateCoupon
);

// Admin routes
router.get('/', 
  protect, 
  authorize('admin', 'superadmin'), 
  couponController.getCoupons
);

router.post('/', 
  protect, 
  authorize('admin', 'superadmin'), 
  couponValidation, 
  validate, 
  couponController.createCoupon
);

router.put('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  couponValidation, 
  validate, 
  couponController.updateCoupon
);

router.delete('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  couponController.deleteCoupon
);

module.exports = router;
