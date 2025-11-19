const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

// Admin routes
router.post('/', 
  protect, 
  authorize('admin', 'superadmin'), 
  categoryController.createCategory
);

router.put('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  categoryController.updateCategory
);

router.delete('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  categoryController.deleteCategory
);

module.exports = router;
