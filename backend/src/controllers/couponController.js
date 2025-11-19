const { Coupon } = require('../models');
const { Op } = require('sequelize');

/**
 * @desc    Get all coupons (Admin)
 * @route   GET /api/v1/coupons
 * @access  Private/Admin
 */
exports.getCoupons = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, isActive } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const { count, rows: coupons } = await Coupon.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: {
        coupons,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          totalPages
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create coupon (Admin)
 * @route   POST /api/v1/coupons
 * @access  Private/Admin
 */
exports.createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      data: coupon
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Validate coupon
 * @route   POST /api/v1/coupons/validate
 * @access  Public
 */
exports.validateCoupon = async (req, res, next) => {
  try {
    const { code, orderTotal } = req.body;

    const coupon = await Coupon.findOne({
      where: {
        code: code.toUpperCase(),
        isActive: true
      }
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COUPON_NOT_FOUND',
          message: 'Invalid coupon code'
        }
      });
    }

    // Check if expired
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'COUPON_EXPIRED',
          message: 'Coupon has expired'
        }
      });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'COUPON_LIMIT_REACHED',
          message: 'Coupon usage limit reached'
        }
      });
    }

    // Check minimum order value
    if (orderTotal < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MIN_ORDER_NOT_MET',
          message: `Minimum order value of $${coupon.minOrderValue} required`
        }
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      data: {
        coupon: {
          code: coupon.code,
          description: coupon.description,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue
        },
        discount: parseFloat(discount.toFixed(2))
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update coupon (Admin)
 * @route   PUT /api/v1/coupons/:id
 * @access  Private/Admin
 */
exports.updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COUPON_NOT_FOUND',
          message: 'Coupon not found'
        }
      });
    }

    await coupon.update(req.body);

    res.json({
      success: true,
      data: coupon
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete coupon (Admin)
 * @route   DELETE /api/v1/coupons/:id
 * @access  Private/Admin
 */
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COUPON_NOT_FOUND',
          message: 'Coupon not found'
        }
      });
    }

    await coupon.destroy();

    res.json({
      success: true,
      data: {
        message: 'Coupon deleted successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Increment coupon usage (Internal)
 * Helper function to be called when order is placed
 */
exports.incrementUsage = async (code) => {
  const coupon = await Coupon.findOne({
    where: { code: code.toUpperCase() }
  });

  if (coupon) {
    await coupon.update({
      usageCount: coupon.usageCount + 1
    });
  }
};
