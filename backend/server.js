require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const User = require('./src/models/User');
const Principle = require('./src/models/Principle');

// Connect to MongoDB
connectDB()
  .then(async () => {
    // Seed default principle if none exists
    try {
      const principleExists = await User.findOne({ role: 'principle' });
      if (!principleExists) {
        console.log('🌱 No principle user found. Seeding default super principle...');
        const principleUser = await User.create({
          name: 'Super Principle',
          email: 'principle@school.com',
          username: 'principle',
          password: 'principle123',
          role: 'principle',
        });
        await Principle.create({
          user: principleUser._id,
          permissions: ['all'],
          phoneNumber: '+919557244888',
          department: 'Administration',
        });
        console.log('✅ Default super principle seeded: principle@school.com / principle123 (username: principle)');
      }
    } catch (err) {
      console.error('❌ Error seeding default principle:', err.message);
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
