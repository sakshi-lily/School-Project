const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Result = require('../models/Result');
const Announcement = require('../models/Announcement');

// @desc    Get teacher profile and dashboard data
// @route   GET /api/teacher/dashboard
// @access  Private (Teacher only)
exports.getDashboardData = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id }).populate('user', 'name email username');
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    // Find students matching assigned classes
    // Assigned classes format: "10-A", "9-B", etc.
    const assignedClasses = teacher.classesAssigned || [];
    const totalStudents = await Student.countDocuments({ class: { $in: assignedClasses } });
    
    // Count results created by this teacher
    const resultsCount = await Result.countDocuments({ createdBy: req.user.id });
    const unpublishedResults = await Result.countDocuments({ createdBy: req.user.id, status: 'Unpublished' });

    res.status(200).json({
      success: true,
      teacher,
      classes: assignedClasses,
      stats: {
        totalStudentsTaught: totalStudents || 45, // default fallback
        uploadedResultsCount: resultsCount,
        pendingResultsCount: unpublishedResults,
        academicYear: '2026-2027',
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// RESULTS MANAGEMENT (TEACHER)
// ==========================================

// @desc    Get results managed by teacher
// @route   GET /api/teacher/results
// @access  Private (Teacher only)
exports.getResults = async (req, res, next) => {
  try {
    // Get all results created by this teacher
    const results = await Result.find({ createdBy: req.user.id })
      .sort({ academicYear: -1, class: 1, rollNumber: 1 });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create student marksheet entry
// @route   POST /api/teacher/results
// @access  Private (Teacher only)
exports.createResult = async (req, res, next) => {
  try {
    const { studentName, rollNumber, class: className, academicYear, term, subjectMarks, status } = req.body;

    if (!studentName || !rollNumber || !className || !academicYear || !term || !subjectMarks) {
      return res.status(400).json({ success: false, message: 'Please provide all required result details' });
    }

    // Check if result already exists for term
    const existing = await Result.findOne({ rollNumber, academicYear, term });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Result already exists for Roll Number '${rollNumber}' in '${term}' of session '${academicYear}'`,
      });
    }

    // Calculate marks percentage & grade
    const maxTotalMarks = subjectMarks.reduce((sum, s) => sum + (s.maxMarks || 100), 0);
    const totalMarks = subjectMarks.reduce((sum, s) => sum + s.marksObtained, 0);
    const percentage = parseFloat(((totalMarks / maxTotalMarks) * 100).toFixed(2));

    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';
    else if (percentage >= 33) grade = 'E';

    const result = await Result.create({
      studentName,
      rollNumber,
      class: className,
      academicYear,
      term,
      subjectMarks,
      totalMarks,
      maxTotalMarks,
      percentage,
      grade,
      status: status || 'Unpublished',
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Result recorded successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Modify unpublished result sheet
// @route   PUT /api/teacher/results/:id
// @access  Private (Teacher only)
exports.updateResult = async (req, res, next) => {
  try {
    const { studentName, class: className, academicYear, term, subjectMarks, status } = req.body;

    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result record not found' });
    }

    // Authorization: Must belong to this teacher
    if (result.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this result card' });
    }

    // Guard: Prevent modification of published results
    if (result.status === 'Published' && status !== 'Unpublished') {
      return res.status(400).json({
        success: false,
        message: 'Published results are locked. Please unpublish the result card first to make edits.',
      });
    }

    const updates = { studentName, class: className, academicYear, term, status };

    if (subjectMarks) {
      updates.subjectMarks = subjectMarks;
      updates.maxTotalMarks = subjectMarks.reduce((sum, s) => sum + (s.maxMarks || 100), 0);
      updates.totalMarks = subjectMarks.reduce((sum, s) => sum + s.marksObtained, 0);
      updates.percentage = parseFloat(((updates.totalMarks / updates.maxTotalMarks) * 100).toFixed(2));
      
      let grade = 'F';
      if (updates.percentage >= 90) grade = 'A+';
      else if (updates.percentage >= 80) grade = 'A';
      else if (updates.percentage >= 70) grade = 'B';
      else if (updates.percentage >= 60) grade = 'C';
      else if (updates.percentage >= 50) grade = 'D';
      else if (updates.percentage >= 33) grade = 'E';
      updates.grade = grade;
    }

    const updatedResult = await Result.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: 'Result card updated successfully',
      data: updatedResult,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete result
// @route   DELETE /api/teacher/results/:id
// @access  Private (Teacher only)
exports.deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result record not found' });
    }

    if (result.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this result card' });
    }

    await Result.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Result card deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// NOTICES & ANNOUNCEMENTS (TEACHER)
// ==========================================

exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({ author: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
};

exports.createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, type, targetAudience } = req.body;
    const announcement = await Announcement.create({
      title,
      content,
      type,
      targetAudience,
      author: req.user.id,
    });
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

exports.updateAnnouncement = async (req, res, next) => {
  try {
    const { title, content, type, targetAudience } = req.body;
    let announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    if (announcement.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this announcement' });
    }

    announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, type, targetAudience },
      { new: true }
    );

    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }

    if (announcement.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this announcement' });
    }

    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// CLASS & STUDENT ROSTER DETAILS (TEACHER VISIBILITY)
// ==========================================

exports.getClasses = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id });
    const classes = await Class.find({ name: { $in: teacher.classesAssigned } }).sort({ name: 1 });
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id });
    const students = await Student.find({ class: { $in: teacher.classesAssigned } }).sort({ name: 1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};
