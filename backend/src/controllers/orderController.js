const { Order, OrderItem, Product, User } = require('../models');
const { sendEmail } = require('../utils/email');

/**
 * @desc    Create new order
 * @route   POST /api/v1/orders
 * @access  Private
 */
exports.createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      discount,
      total,
      couponCode
    } = req.body;

    // Validate stock availability
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'PRODUCT_NOT_FOUND',
            message: `Product ${item.productId} not found`
          }
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
          }
        });
      }
    }

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      subtotal,
      tax,
      shipping,
      discount,
      total,
      couponCode,
      paymentMethod,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Create order items and update stock
    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        variant: item.variant || {}
      });

      // Update product stock
      const product = await Product.findByPk(item.productId);
      await product.update({
        stock: product.stock - item.quantity
      });
    }

    // Fetch complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items'
        }
      ]
    });

    // Send confirmation email
    try {
      await sendEmail({
        to: req.user.email,
        subject: `Order Confirmation - #${order.id.substring(0, 8)}`,
        html: `
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order, ${req.user.firstName}!</p>
          <p>Order ID: ${order.id}</p>
          <p>Total: $${total}</p>
          <p>We'll send you a shipping notification when your order ships.</p>
        `
      });
    } catch (emailError) {
      console.error('Order confirmation email failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      data: completeOrder
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's orders
 * @route   GET /api/v1/orders
 * @access  Private
 */
exports.getUserOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows: orders } = await Order.findAndCountAll({
      where: { userId: req.user.id },
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items'
        }
      ]
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: {
        orders,
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
 * @desc    Get single order
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: OrderItem,
          as: 'items'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found'
        }
      });
    }

    // Check if user owns order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Not authorized to access this order'
        }
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status
 * @route   PATCH /api/v1/orders/:id/status
 * @access  Private/Admin
 */
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email', 'firstName']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Order not found'
        }
      });
    }

    const updateData = { status };
    if (trackingNumber) updateData.trackingNumber = trackingNumber;

    await order.update(updateData);

    // Send status update email
    if (status === 'shipped' && order.user) {
      try {
        await sendEmail({
          to: order.user.email,
          subject: `Your Order Has Shipped! - #${order.id.substring(0, 8)}`,
          html: `
            <h1>Your Order Has Shipped!</h1>
            <p>Hi ${order.user.firstName},</p>
            <p>Your order has been shipped.</p>
            ${trackingNumber ? `<p>Tracking Number: ${trackingNumber}</p>` : ''}
            <p>Thank you for shopping with NovaShop!</p>
          `
        });
      } catch (emailError) {
        console.error('Shipping notification email failed:', emailError);
      }
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/v1/orders/admin/all
 * @access  Private/Admin
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (status) where.status = status;

    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName'],
          ...(search && {
            where: {
              [require('sequelize').Op.or]: [
                { email: { [require('sequelize').Op.iLike]: `%${search}%` } },
                { firstName: { [require('sequelize').Op.iLike]: `%${search}%` } },
                { lastName: { [require('sequelize').Op.iLike]: `%${search}%` } }
              ]
            }
          })
        },
        {
          model: OrderItem,
          as: 'items'
        }
      ]
    });

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      success: true,
      data: {
        orders,
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
