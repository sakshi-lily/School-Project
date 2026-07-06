require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
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
