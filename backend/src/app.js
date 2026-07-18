const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const principleRoutes = require('./routes/principle.routes');
const teacherRoutes = require('./routes/teacher.routes');
const publicRoutes = require('./routes/public.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'School Management API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/principle', principleRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/public', publicRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
