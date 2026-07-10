const express = require('express');
const { 
  searchResult, 
  getPublicYears, 
  getPublicAnnouncements,
  submitInquiry,
  getCalendarEvents,
  searchAdmitCard,
  getPublicSyllabus
} = require('../controllers/public.controller');

const router = express.Router();

router.get('/results/search', searchResult);
router.get('/results/years', getPublicYears);
router.get('/announcements', getPublicAnnouncements);
router.post('/inquiries', submitInquiry);
router.get('/calendar', getCalendarEvents);
router.get('/admit-card/search', searchAdmitCard);
router.get('/syllabus', getPublicSyllabus);

module.exports = router;
