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
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getAllAdmitCards,
  createAdmitCard,
  deleteAdmitCard,
  getAllSyllabus,
  createSyllabus,
  deleteSyllabus,
} = require('../controllers/principle.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads/syllabus directory exists
const syllabusDir = path.join(__dirname, '../../uploads/syllabus');
if (!fs.existsSync(syllabusDir)) {
  fs.mkdirSync(syllabusDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, syllabusDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'syllabus-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

const router = express.Router();

// All administrative endpoints require authentication and "principle" role clearance
router.use(protect);
router.use(authorize('principle'));

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

// Admit Cards
router.get('/admit-cards', getAllAdmitCards);
router.post('/admit-cards', createAdmitCard);
router.delete('/admit-cards/:id', deleteAdmitCard);

// Syllabus
router.get('/syllabus', getAllSyllabus);
router.post('/syllabus', upload.single('pdfFile'), createSyllabus);
router.delete('/syllabus/:id', deleteSyllabus);

// Notices and School Bulletins
router.get('/announcements', getAnnouncements);
router.post('/announcements', createAnnouncement);
router.put('/announcements/:id', updateAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

// Security logs & principle trail
router.get('/logs', getAuditLogs);

// Admission Inquiries
router.get('/inquiries', getInquiries);
router.patch('/inquiries/:id/status', updateInquiryStatus);
router.delete('/inquiries/:id', deleteInquiry);

// Academic Calendar Events
router.get('/calendar', getCalendarEvents);
router.post('/calendar', createCalendarEvent);
router.put('/calendar/:id', updateCalendarEvent);
router.delete('/calendar/:id', deleteCalendarEvent);

module.exports = router;
