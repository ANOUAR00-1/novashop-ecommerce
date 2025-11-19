require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

// Test database connection and start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Note: We're using SQL schema files instead of Sequelize sync
    // Tables are already created via schema.sql in Neon
    console.log('✅ Using existing database schema from Neon');

    // Start server
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 NovaShop Backend Server Running`);
      console.log('='.repeat(50));
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Server URL: http://localhost:${PORT}`);
      console.log(`🔌 API Base: http://localhost:${PORT}/api/${process.env.API_VERSION || 'v1'}`);
      console.log(`📊 Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
      console.log('='.repeat(50));
      console.log('💡 Ready to accept requests!');
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Start the server
startServer();
