const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models');
const jwtConfig = require('../config/jwt');
const { sendEmail } = require('../utils/email');

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn
  });
};

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'User with this email already exists'
        }
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Send welcome email (optional)
    try {
      await sendEmail({
        to: user.email,
        subject: 'Welcome to NovaShop!',
        html: `
          <h1>Welcome to NovaShop, ${user.firstName}!</h1>
          <p>Thank you for registering. Start shopping now!</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_CREDENTIALS',
          message: 'Please provide email and password'
        }
      });
    }

    // Check for user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/v1/auth/refresh
 * @access  Public
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Refresh token is required'
        }
      });
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);

      // Get user
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        });
      }

      // Generate new tokens
      const newToken = generateToken(user.id);
      const newRefreshToken = generateRefreshToken(user.id);

      res.json({
        success: true,
        data: {
          token: newToken,
          refreshToken: newRefreshToken
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid or expired refresh token'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user / clear token
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
exports.logout = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        message: 'Logged out successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'No user with that email'
        }
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire (10 minutes)
    const resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    // Update user
    await user.update({
      resetPasswordToken,
      resetPasswordExpire
    });

    // Create reset url
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Send email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <h1>You requested a password reset</h1>
          <p>Please click the link below to reset your password:</p>
          <a href="${resetUrl}" target="_blank">Reset Password</a>
          <p>This link will expire in 10 minutes.</p>
        `
      });

      res.json({
        success: true,
        data: {
          message: 'Password reset email sent'
        }
      });
    } catch (emailError) {
      await user.update({
        resetPasswordToken: null,
        resetPasswordExpire: null
      });

      return res.status(500).json({
        success: false,
        error: {
          code: 'EMAIL_SEND_FAILED',
          message: 'Email could not be sent'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset password
 * @route   PUT /api/v1/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      where: {
        resetPasswordToken,
        resetPasswordExpire: {
          [require('sequelize').Op.gt]: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired token'
        }
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    // Generate tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.json({
      success: true,
      data: {
        user,
        token,
        refreshToken
      }
    });
  } catch (error) {
    next(error);
  }
};
