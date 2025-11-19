const bcrypt = require('bcryptjs');
const { User } = require('./src/models');

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@novashop.com' }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('📧 Email: admin@novashop.com');
      console.log('🔑 Password: admin123');
      
      // Update password to ensure it's correct
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await existingAdmin.update({ password: hashedPassword });
      console.log('✅ Password updated successfully');
      return;
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      email: 'admin@novashop.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isVerified: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@novashop.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  } finally {
    process.exit(0);
  }
}

createAdminUser();
