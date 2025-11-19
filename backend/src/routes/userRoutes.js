const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Validation rules
const updateProfileValidation = [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
];

const updateRoleValidation = [
  body('role')
    .isIn(['user', 'admin', 'superadmin'])
    .withMessage('Invalid role')
];

// User routes
router.get('/profile', protect, userController.getProfile);
router.put('/profile', 
  protect, 
  updateProfileValidation, 
  validate, 
  userController.updateProfile
);
router.put('/password', 
  protect, 
  changePasswordValidation, 
  validate, 
  userController.changePassword
);

// Admin routes
router.get('/', 
  protect, 
  authorize('admin', 'superadmin'), 
  userController.getUsers
);

router.get('/:id', 
  protect, 
  authorize('admin', 'superadmin'), 
  userController.getUser
);

router.patch('/:id/role', 
  protect, 
  authorize('admin', 'superadmin'), 
  updateRoleValidation, 
  validate, 
  userController.updateUserRole
);

module.exports = router;
