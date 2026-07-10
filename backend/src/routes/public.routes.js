const express = require('express');
const { 
  searchResult, 
  getPublicYears, 
  getPublicAnnouncements,
  submitInquiry,
  getCalendarEvents
} = require('../controllers/public.controller');

const router = express.Router();

router.get('/results/search', searchResult);
router.get('/results/years', getPublicYears);
router.get('/announcements', getPublicAnnouncements);
router.post('/inquiries', submitInquiry);
router.get('/calendar', getCalendarEvents);

module.exports = router;
