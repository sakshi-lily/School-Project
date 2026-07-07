const express = require('express');
const { searchResult, getPublicYears, getPublicAnnouncements } = require('../controllers/public.controller');

const router = express.Router();

router.get('/results/search', searchResult);
router.get('/results/years', getPublicYears);
router.get('/announcements', getPublicAnnouncements);

module.exports = router;
