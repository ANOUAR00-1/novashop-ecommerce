const { Review, Product, User } = require('../models');

/**
 * @desc    Get reviews for a product
 * @route   GET /api/v1/reviews/product/:productId
 * @access  Public
 */
exports.getProductReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: reviews } = await Review.findAndCountAll({
      where: {
        productId: req.params.productId,
        isApproved: true
      },
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        }
      ]
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: {
        reviews,
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
 * @desc    Create review
 * @route   POST /api/v1/reviews
 * @access  Private
 */
exports.createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PRODUCT_NOT_FOUND',
          message: 'Product not found'
        }
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      where: {
        productId,
        userId: req.user.id
      }
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'REVIEW_EXISTS',
          message: 'You have already reviewed this product'
        }
      });
    }

    // Create review
    const review = await Review.create({
      productId,
      userId: req.user.id,
      rating,
      comment,
      isApproved: false // Requires admin approval
    });

    // Fetch complete review with user
    const completeReview = await Review.findByPk(review.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        }
      ]
    });

    res.status(201).json({
      success: true,
      data: completeReview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update review
 * @route   PUT /api/v1/reviews/:id
 * @access  Private
 */
exports.updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REVIEW_NOT_FOUND',
          message: 'Review not found'
        }
      });
    }

    // Check if user owns the review
    if (review.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Not authorized to update this review'
        }
      });
    }

    await review.update({ rating, comment, isApproved: false });

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:id
 * @access  Private
 */
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REVIEW_NOT_FOUND',
          message: 'Review not found'
        }
      });
    }

    // Check if user owns the review or is admin
    if (review.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Not authorized to delete this review'
        }
      });
    }

    await review.destroy();

    res.json({
      success: true,
      data: {
        message: 'Review deleted successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve review (Admin)
 * @route   PATCH /api/v1/reviews/:id/approve
 * @access  Private/Admin
 */
exports.approveReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REVIEW_NOT_FOUND',
          message: 'Review not found'
        }
      });
    }

    await review.update({ isApproved: true });

    // Update product rating
    const productReviews = await Review.findAll({
      where: {
        productId: review.productId,
        isApproved: true
      }
    });

    if (productReviews.length > 0) {
      const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      const product = await Product.findByPk(review.productId);
      await product.update({
        rating: avgRating.toFixed(1),
        reviewCount: productReviews.length
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all reviews (Admin)
 * @route   GET /api/v1/reviews
 * @access  Private/Admin
 */
exports.getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, isApproved } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (isApproved !== undefined) {
      where.isApproved = isApproved === 'true';
    }

    const { count, rows: reviews } = await Review.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'image']
        }
      ]
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: {
        reviews,
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
