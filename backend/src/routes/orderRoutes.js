const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const createOrderValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('total').isFloat({ min: 0 }).withMessage('Total must be a positive number')
];

const updateStatusValidation = [
  body('status')
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Invalid order status')
];

// User routes
router.post('/', 
  protect, 
  createOrderValidation, 
  validate, 
  orderController.createOrder
);

router.get('/', protect, orderController.getUserOrders);
router.get('/:id', protect, orderController.getOrder);

// Admin routes
router.get('/admin/all', 
  protect, 
  authorize('admin', 'superadmin'), 
  orderController.getAllOrders
);

router.patch('/:id/status', 
  protect, 
  authorize('admin', 'superadmin'), 
  updateStatusValidation, 
  validate, 
  orderController.updateOrderStatus
);

module.exports = router;
