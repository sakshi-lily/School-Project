require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const User = require('./src/models/User');
const Admin = require('./src/models/Admin');

// Connect to MongoDB
connectDB()
  .then(async () => {
    // Seed default admin if none exists
    try {
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        console.log('🌱 No admin user found. Seeding default super admin...');
        const adminUser = await User.create({
          name: 'Super Admin',
          email: 'admin@school.com',
          username: 'admin',
          password: 'admin123',
          role: 'admin',
        });
        await Admin.create({
          user: adminUser._id,
          permissions: ['all'],
          phoneNumber: '+919557244888',
          department: 'Administration',
        });
        console.log('✅ Default super admin seeded: admin@school.com / admin123 (username: admin)');
      }
    } catch (err) {
      console.error('❌ Error seeding default admin:', err.message);
    }

    app.listen(PORT, () => {
      console.log(`=============================================`);
      console.log(`🚀 School Backend running on port ${PORT}`);
      console.log(`📅 Started at: ${new Date().toISOString()}`);
      console.log(`=============================================`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB database:', err.message);
    process.exit(1);
  });
