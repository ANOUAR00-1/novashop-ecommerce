const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Initialize Sequelize with DATABASE_URL or individual credentials
let sequelize;

if (dbConfig.use_env_variable && process.env[dbConfig.use_env_variable]) {
  // Use connection string from environment variable
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  });
} else {
  // Use individual connection parameters
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: dbConfig.logging,
      pool: dbConfig.pool,
      dialectOptions: dbConfig.dialectOptions
    }
  );
}

// Import models
const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const Category = require('./Category')(sequelize);
const Order = require('./Order')(sequelize);
const OrderItem = require('./OrderItem')(sequelize);
const Review = require('./Review')(sequelize);
const Coupon = require('./Coupon')(sequelize);

// Define associations
// User associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });

// Product associations
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });

// Category associations
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// Order associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Review associations
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

const db = {
  sequelize,
  Sequelize,
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Review,
  Coupon
};

module.exports = db;
