const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

// Upload single image (admin only)
router.post('/image', 
  protect, 
  authorize('admin', 'superadmin'),
  upload.single('image'),
  uploadController.uploadImage
);

// Upload multiple images (admin only)
router.post('/images', 
  protect, 
  authorize('admin', 'superadmin'),
  upload.array('images', 10), // Max 10 images
  uploadController.uploadImages
);

module.exports = router;
