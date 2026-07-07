const Result = require('../models/Result');
const Announcement = require('../models/Announcement');

// @desc    Search student result
// @route   GET /api/public/results/search
// @access  Public
exports.searchResult = async (req, res, next) => {
  try {
    const { rollNumber, academicYear } = req.query;

    if (!rollNumber || !academicYear) {
      return res.status(400).json({
        success: false,
        message: 'Please provide roll number and academic year',
      });
    }

    // Get all distinct academic years with published results
    const publishedYears = await Result.find({ status: 'Published' }).distinct('academicYear');
    
    // Sort years descending to find the latest 3
    publishedYears.sort().reverse();
    const latestThreeYears = publishedYears.slice(0, 3);

    // Enforce restriction: public search only allowed for the latest 3 years
    if (!latestThreeYears.includes(academicYear)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view results from the latest 3 academic years.',
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
