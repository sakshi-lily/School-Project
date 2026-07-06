const Teacher = require('../models/Teacher');

// @desc    Get teacher profile and dashboard data
// @route   GET /api/teacher/dashboard
// @access  Private (Teacher only)
exports.getDashboardData = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    res.status(200).json({
      success: true,
      teacher,
      classes: teacher.classesAssigned,
      stats: {
        totalStudentsTaught: 45,
        pendingAssignmentsCount: 4,
        upcomingLecturesToday: 2,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign grades/marks to a class/student
// @route   POST /api/teacher/grades
// @access  Private (Teacher only)
exports.postGrade = async (req, res, next) => {
  try {
    const { studentName, subjectName, grade, comments } = req.body;

    if (!studentName || !subjectName || !grade) {
      return res.status(400).json({ success: false, message: 'Please enter student name, subject, and grade' });
    }

    // Mock response for saving grades/marks
    res.status(201).json({
      success: true,
      message: 'Grade posted successfully',
      data: {
        studentName,
        subjectName,
        grade,
        comments,
        recordedBy: req.user.name,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
