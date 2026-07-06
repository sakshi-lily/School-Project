const express = require('express');
const { getDashboardData, postGrade } = require('../controllers/teacher.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes are protected and teacher only
router.use(protect);
router.use(authorize('teacher'));

router.get('/dashboard', getDashboardData);
router.post('/grades', postGrade);

module.exports = router;
