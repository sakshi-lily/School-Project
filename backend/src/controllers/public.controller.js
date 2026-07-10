const Result = require('../models/Result');
const Announcement = require('../models/Announcement');
const Student = require('../models/Student');
const Inquiry = require('../models/Inquiry');
const CalendarEvent = require('../models/CalendarEvent');

// @desc    Search student result
// @route   GET /api/public/results/search
// @access  Public
exports.searchResult = async (req, res, next) => {
  try {
    const { rollNumber, academicYear, dateOfBirth } = req.query;

    if (!rollNumber || !academicYear || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Please provide roll number, academic year, and date of birth',
      });
    }

    // Get all distinct academic years with published results
    const publishedYears = await Result.find({ status: 'Published' }).distinct('academicYear');
    
    // Sort years descending to find the latest 3
    publishedYears.sort().reverse();
    const latestThreeYears = publishedYears.slice(0, 3);

    // Fallback if no results published yet, include current year plus previous two
    if (latestThreeYears.length === 0) {
      const currentYear = new Date().getFullYear();
      latestThreeYears.push(`${currentYear}-${currentYear + 1}`);
      latestThreeYears.push(`${currentYear - 1}-${currentYear}`);
      latestThreeYears.push(`${currentYear - 2}-${currentYear - 1}`);
    }

    // Enforce restriction: public search only allowed for the latest 3 years
    if (!latestThreeYears.includes(academicYear)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view results from the latest 3 academic years.',
      });
    }

    // Verify student profile and Date of Birth
    const student = await Student.findOne({ rollNumber: rollNumber.trim() });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student profile found with Roll Number '${rollNumber}'`,
      });
    }

    if (student.dateOfBirth !== dateOfBirth.trim()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Incorrect Date of Birth provided for this Roll Number.',
      });
    }

    // Find result (must be published)
    const result = await Result.findOne({
      rollNumber: rollNumber.trim(),
      academicYear: academicYear.trim(),
      status: 'Published',
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `No published results found for Roll Number '${rollNumber}' in academic session '${academicYear}'`,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get latest 3 academic years for public results dropdown
// @route   GET /api/public/results/years
// @access  Public
exports.getPublicYears = async (req, res, next) => {
  try {
    const publishedYears = await Result.find({ status: 'Published' }).distinct('academicYear');
    publishedYears.sort().reverse();
    const latestThreeYears = publishedYears.slice(0, 3);

    // Fallback if no results published yet, return current year plus previous two
    if (latestThreeYears.length === 0) {
      const currentYear = new Date().getFullYear();
      latestThreeYears.push(`${currentYear}-${currentYear + 1}`);
      latestThreeYears.push(`${currentYear - 1}-${currentYear}`);
      latestThreeYears.push(`${currentYear - 2}-${currentYear - 1}`);
    }

    res.status(200).json({
      success: true,
      years: latestThreeYears,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get public announcements
// @route   GET /api/public/announcements
// @access  Public
exports.getPublicAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({
      targetAudience: { $in: ['all', 'students'] },
    })
      .sort({ date: -1 })
      .populate('author', 'name');

    res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit admission inquiry
// @route   POST /api/public/inquiries
// @access  Public
exports.submitInquiry = async (req, res, next) => {
  try {
    const { studentName, parentName, parentEmail, parentPhone, classGrade, academicYear, stream, message } = req.body;

    const inquiry = await Inquiry.create({
      studentName,
      parentName,
      parentEmail,
      parentPhone,
      classGrade,
      academicYear,
      stream,
      message,
    });

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get public calendar events
// @route   GET /api/public/calendar
// @access  Public
exports.getCalendarEvents = async (req, res, next) => {
  try {
    const events = await CalendarEvent.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

