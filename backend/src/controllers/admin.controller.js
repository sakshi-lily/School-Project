const User = require('../models/User');
const Teacher = require('../models/Teacher');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getStats = async (req, res, next) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.status(200).json({
      success: true,
      stats: {
        totalTeachers,
        totalAdmins,
        academicYear: '2026-2027',
        activeNotificationsCount: 3,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all teachers profiles
// @route   GET /api/admin/teachers
// @access  Private (Admin only)
exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate('user', 'name email isActive');
    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new teacher
// @route   POST /api/admin/teachers
// @access  Private (Admin only)
exports.createTeacher = async (req, res, next) => {
  try {
    const { name, email, password, subjects, qualification, experienceYears } = req.body;

    // Check if user credentials exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create Base User
    const user = await User.create({
      name,
      email,
      password,
      role: 'teacher',
    });

    // Create Teacher profile details
    const teacher = await Teacher.create({
      user: user._id,
      subjects: subjects || ['General Science'],
      qualification: qualification || 'Bachelor of Education',
      experienceYears: experienceYears || 0,
    });

    res.status(201).json({
      success: true,
      data: {
        userId: user._id,
        teacherId: teacher._id,
        name: user.name,
        email: user.email,
        subjects: teacher.subjects,
        qualification: teacher.qualification,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update teacher profile
// @route   PUT /api/admin/teachers/:id
// @access  Private (Admin only)
exports.updateTeacher = async (req, res, next) => {
  try {
    const { subjects, qualification, experienceYears, classesAssigned } = req.body;

    let teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        subjects,
        qualification,
        experienceYears,
        classesAssigned,
      },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};
