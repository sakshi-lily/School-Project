const express = require('express');
const {
  getStats,
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  toggleTeacherStatus,
  resetTeacherPassword,
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getResults,
  createResult,
  updateResult,
  deleteResult,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAuditLogs,
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All administrative endpoints require authentication and "admin" role clearance
router.use(protect);
router.use(authorize('admin'));

// Stats & General Dashboard
router.get('/stats', getStats);

// Teacher CRUD Endpoints
router.get('/teachers', getAllTeachers);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);
router.patch('/teachers/:id/status', toggleTeacherStatus);
router.post('/teachers/:id/reset-password', resetTeacherPassword);

// Academic Classes Endpoints
router.get('/classes', getClasses);
router.post('/classes', createClass);
router.put('/classes/:id', updateClass);
router.delete('/classes/:id', deleteClass);

// Student Roster Endpoints
router.get('/students', getStudents);
router.post('/students', createStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

// Comprehensive Academic Gradebook & Results
router.get('/results', getResults);
router.post('/results', createResult);
router.put('/results/:id', updateResult);
router.delete('/results/:id', deleteResult);

// Notices and School Bulletins
router.get('/announcements', getAnnouncements);
router.post('/announcements', createAnnouncement);
router.put('/announcements/:id', updateAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

// Security logs & admin trail
router.get('/logs', getAuditLogs);

module.exports = router;
