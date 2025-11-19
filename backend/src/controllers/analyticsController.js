const { Order, OrderItem, User, Product } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../models').sequelize;

// @desc    Get dashboard statistics
// @route   GET /api/v1/analytics/dashboard
// @access  Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Total revenue
    const totalRevenueResult = await Order.findOne({
      attributes: [[sequelize.fn('SUM', sequelize.col('total')), 'total']],
      where: { status: { [Op.ne]: 'cancelled' } },
      raw: true
    });
    const totalRevenue = parseFloat(totalRevenueResult?.total || 0);

    // Total orders
    const totalOrders = await Order.count();

    // Total customers
    const totalCustomers = await User.count({
      where: { role: 'user' }
    });

    // Average order value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Revenue growth (this month vs last month)
    const thisMonthRevenue = await Order.findOne({
      attributes: [[sequelize.fn('SUM', sequelize.col('total')), 'total']],
      where: {
        status: { [Op.ne]: 'cancelled' },
        createdAt: { [Op.gte]: startOfMonth }
      },
      raw: true
    });

    const lastMonthRevenue = await Order.findOne({
      attributes: [[sequelize.fn('SUM', sequelize.col('total')), 'total']],
      where: {
        status: { [Op.ne]: 'cancelled' },
        createdAt: {
          [Op.gte]: startOfLastMonth,
          [Op.lte]: endOfLastMonth
        }
      },
      raw: true
    });

    const thisMonth = parseFloat(thisMonthRevenue?.total || 0);
    const lastMonth = parseFloat(lastMonthRevenue?.total || 0);
    const revenueGrowth = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

    // Sales chart data (last 6 months)
    const salesChart = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthOrders = await Order.count({
        where: {
          status: { [Op.ne]: 'cancelled' },
          createdAt: {
            [Op.gte]: monthStart,
            [Op.lte]: monthEnd
          }
        }
      });

      const monthRevenue = await Order.findOne({
        attributes: [[sequelize.fn('SUM', sequelize.col('total')), 'total']],
        where: {
          status: { [Op.ne]: 'cancelled' },
          createdAt: {
            [Op.gte]: monthStart,
            [Op.lte]: monthEnd
          }
        },
        raw: true
      });

      salesChart.push({
        month: monthStart.toLocaleString('default', { month: 'short' }),
        sales: monthOrders,
        revenue: parseFloat(monthRevenue?.total || 0)
      });
    }

    // Recent orders (last 5)
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    // Low stock products (stock < 20)
    const lowStock = await Product.findAll({
      where: {
        stock: { [Op.lt]: 20 },
        isActive: true
      },
      order: [['stock', 'ASC']],
      limit: 10,
      attributes: ['id', 'name', 'stock', 'price', 'image']
    });

    // Top products by sales
    const topProductsRaw = await OrderItem.findAll({
      attributes: [
        'productId',
        'name',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold'],
        [sequelize.fn('SUM', sequelize.literal('quantity * price')), 'totalRevenue']
      ],
      group: ['productId', 'name'],
      order: [[sequelize.literal('"totalSold"'), 'DESC']],
      limit: 5,
      raw: true
    });

    // Convert DECIMAL strings to numbers and map to frontend format
    const topProducts = topProductsRaw.map(product => ({
      id: product.productId,
      name: product.name,
      sales: parseInt(product.totalSold) || 0,
      revenue: parseFloat(product.totalRevenue) || 0
    }));

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        revenueGrowth,
        salesChart,
        recentOrders,
        lowStock,
        topProducts
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Failed to get dashboard statistics',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
