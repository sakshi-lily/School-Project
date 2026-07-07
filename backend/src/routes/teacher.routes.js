const express = require('express');
const {
  getDashboardData,
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getClasses,
  getStudents,
} = require('../controllers/teacher.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All teacher endpoints require authentication and "teacher" role clearance
router.use(protect);
router.use(authorize('teacher'));

// Teacher Profile & Dashboard Statistics
router.get('/dashboard', getDashboardData);

// Results & Grades Entry
router.get('/results', getResults);
router.post('/results', createResult);
router.put('/results/:id', updateResult);
router.delete('/results/:id', deleteResult);

// Notices and School Bulletins authored by this teacher
router.get('/announcements', getAnnouncements);
router.post('/announcements', createAnnouncement);
router.put('/announcements/:id', updateAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

// Assigned Classes and Students roster visibility
router.get('/classes', getClasses);
router.get('/students', getStudents);

module.exports = router;
