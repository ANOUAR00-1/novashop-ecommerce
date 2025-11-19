const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('image').notEmpty().withMessage('Product image is required')
];

// Public routes
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProduct);

// Admin routes
router.post('/', 
  protect, 
  authorize('admin', 'superadmin'), 
  productValidation, 
  validate, 
  productController.createProduct
);

router.put('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  productValidation, 
  validate, 
  productController.updateProduct
);

router.delete('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  productController.deleteProduct
);

module.exports = router;
