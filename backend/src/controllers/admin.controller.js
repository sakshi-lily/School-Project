const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Result = require('../models/Result');
const Announcement = require('../models/Announcement');
const AuditLog = require('../models/AuditLog');

// Helper to log administrative actions
const createAuditLog = async (action, performedBy, details, req) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    await AuditLog.create({
      action,
      performedBy,
      ipAddress,
      details,
    });
  } catch (error) {
    console.error('Audit Logging Error:', error);
  }
};

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getStats = async (req, res, next) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalResults = await Result.countDocuments({ status: 'Published' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.status(200).json({
      success: true,
      stats: {
        totalTeachers,
        totalStudents,
        totalClasses,
        totalResultsPublished: totalResults,
        totalAdmins,
        academicYear: '2026-2027',
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// TEACHER MANAGEMENT
// ==========================================

// @desc    Get all teachers profiles
// @route   GET /api/admin/teachers
// @access  Private (Admin only)
exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate('user', 'name email username isActive');
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
    const { name, email, password, subjects, qualification, experienceYears, classesAssigned } = req.body;

    // Check if user credentials exist
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Generate unique username from name
    let baseUsername = 't_' + name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (baseUsername.length > 15) baseUsername = baseUsername.slice(0, 15);
    
    let username = baseUsername;
    let usernameExists = await User.findOne({ username });
    let counter = 1;
    while (usernameExists) {
      username = `${baseUsername}${counter}`;
      usernameExists = await User.findOne({ username });
      counter++;
    }

    // Generate random password if not provided
    const finalPassword = password || `t_${Math.floor(100000 + Math.random() * 900000)}`;

    // Create Base User
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      username,
      password: finalPassword,
      role: 'teacher',
    });

    // Create Teacher profile details
    const teacher = await Teacher.create({
      user: user._id,
      subjects: subjects || ['General Science'],
      qualification: qualification || 'Bachelor of Education',
      experienceYears: experienceYears || 0,
      classesAssigned: classesAssigned || [],
    });

    await createAuditLog('CREATE_TEACHER', req.user._id, `Created teacher ${name} (username: ${username})`, req);

    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      data: {
        userId: user._id,
        teacherId: teacher._id,
        name: user.name,
        email: user.email,
        username: user.username,
        password: finalPassword, // Send back so admin can note down details
        subjects: teacher.subjects,
        qualification: teacher.qualification,
        experienceYears: teacher.experienceYears,
        classesAssigned: teacher.classesAssigned,
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
    const { name, email, subjects, qualification, experienceYears, classesAssigned } = req.body;

    let teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    // Update user profile fields if provided
    const userUpdate = {};
    if (name) userUpdate.name = name;
    if (email) userUpdate.email = email.toLowerCase();
    
    if (Object.keys(userUpdate).length > 0) {
      await User.findByIdAndUpdate(teacher.user, userUpdate, { runValidators: true });
    }

    // Update teacher details
    teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        subjects,
        qualification,
        experienceYears,
        classesAssigned,
      },
      { new: true, runValidators: true }
    ).populate('user', 'name email username isActive');

    await createAuditLog('UPDATE_TEACHER', req.user._id, `Updated details of teacher ${teacher.user.name}`, req);

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete teacher profile
// @route   DELETE /api/admin/teachers/:id
// @access  Private (Admin only)
exports.deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    const user = await User.findById(teacher.user);
    const teacherName = user ? user.name : 'Unknown';

    // Delete base User first, then the Teacher profile
    if (user) {
      await User.findByIdAndDelete(teacher.user);
    }
    await Teacher.findByIdAndDelete(req.params.id);

    await createAuditLog('DELETE_TEACHER', req.user._id, `Deleted teacher account for ${teacherName}`, req);

    res.status(200).json({
      success: true,
      message: 'Teacher account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle suspension/activation of teacher
// @route   PATCH /api/admin/teachers/:id/status
// @access  Private (Admin only)
exports.toggleTeacherStatus = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    const user = await User.findById(teacher.user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Associated User account not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    const actionName = user.isActive ? 'ACTIVATE_TEACHER' : 'SUSPEND_TEACHER';
    const logDetails = user.isActive ? `Activated account for ${user.name}` : `Suspended account for ${user.name}`;
    await createAuditLog(actionName, req.user._id, logDetails, req);

    res.status(200).json({
      success: true,
      message: `Teacher account ${user.isActive ? 'activated' : 'suspended'} successfully`,
      data: {
        id: teacher._id,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset teacher password
// @route   POST /api/admin/teachers/:id/reset-password
// @access  Private (Admin only)
exports.resetTeacherPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide new password' });
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher profile not found' });
    }

    const user = await User.findById(teacher.user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Associated User account not found' });
    }

    user.password = newPassword;
    await user.save();

    await createAuditLog('RESET_TEACHER_PASSWORD', req.user._id, `Reset password for teacher ${user.name}`, req);

    res.status(200).json({
      success: true,
      message: `Password reset successfully for teacher ${user.name}`,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// CLASS & SUBJECT MANAGEMENT
// ==========================================

exports.getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().sort({ name: 1, section: 1 });
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    next(error);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    const { name, section, subjects, academicYear } = req.body;
    const existing = await Class.findOne({ name, section, academicYear });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Class/section combo already exists for this session' });
    }

    const newClass = await Class.create({ name, section, subjects, academicYear });
    await createAuditLog('CREATE_CLASS', req.user._id, `Created class ${name}-${section} (${academicYear})`, req);
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const { name, section, subjects, academicYear } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { name, section, subjects, academicYear },
      { new: true, runValidators: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    await createAuditLog('UPDATE_CLASS', req.user._id, `Updated class ${name}-${section}`, req);
    res.status(200).json({ success: true, data: updatedClass });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    await createAuditLog('DELETE_CLASS', req.user._id, `Deleted class ${deletedClass.name}-${deletedClass.section}`, req);
    res.status(200).json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// STUDENT MANAGEMENT
// ==========================================

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ rollNumber: 1 });
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, class: className, academicYear, parentEmail } = req.body;
    const existing = await Student.findOne({ rollNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: `Roll Number '${rollNumber}' is already registered` });
    }

    const student = await Student.create({ name, rollNumber, class: className, academicYear, parentEmail });
    await createAuditLog('CREATE_STUDENT', req.user._id, `Registered student ${name} (Roll No: ${rollNumber})`, req);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, class: className, academicYear, parentEmail, status } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNumber, class: className, academicYear, parentEmail, status },
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    await createAuditLog('UPDATE_STUDENT', req.user._id, `Updated details for student ${name}`, req);
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    await createAuditLog('DELETE_STUDENT', req.user._id, `Deleted student ${student.name} (Roll No: ${student.rollNumber})`, req);
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// RESULTS MANAGEMENT (ADMIN PRIVILEGES)
// ==========================================

exports.getResults = async (req, res, next) => {
  try {
    const results = await Result.find().sort({ academicYear: -1, class: 1, rollNumber: 1 });
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

exports.createResult = async (req, res, next) => {
  try {
    const { studentName, rollNumber, class: className, academicYear, term, subjectMarks, status } = req.body;

    const existing = await Result.findOne({ rollNumber, academicYear, term });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Result already exists for student roll number '${rollNumber}' in '${term}' examination of academic session '${academicYear}'`,
      });
    }

    // Calculations
    const maxTotalMarks = subjectMarks.reduce((sum, s) => sum + (s.maxMarks || 100), 0);
    const totalMarks = subjectMarks.reduce((sum, s) => sum + s.marksObtained, 0);
    const percentage = parseFloat(((totalMarks / maxTotalMarks) * 100).toFixed(2));
    
    // Grading Logic
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
      createdBy: req.user._id,
    });

    await createAuditLog('CREATE_RESULT', req.user._id, `Posted result for ${studentName} (${term} - ${academicYear})`, req);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateResult = async (req, res, next) => {
  try {
    const { studentName, class: className, academicYear, term, subjectMarks, status } = req.body;

    const resultToUpdate = await Result.findById(req.params.id);
    if (!resultToUpdate) {
      return res.status(404).json({ success: false, message: 'Result not found' });
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

    const result = await Result.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    await createAuditLog('UPDATE_RESULT', req.user._id, `Updated result card of ${result.studentName}`, req);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Result sheet not found' });
    }
    await createAuditLog('DELETE_RESULT', req.user._id, `Deleted result sheet of ${result.studentName}`, req);
    res.status(200).json({ success: true, message: 'Result deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// NOTICES & ANNOUNCEMENTS
// ==========================================

exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 }).populate('author', 'name');
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
      author: req.user._id,
    });
    await createAuditLog('CREATE_ANNOUNCEMENT', req.user._id, `Published announcement: ${title}`, req);
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

exports.updateAnnouncement = async (req, res, next) => {
  try {
    const { title, content, type, targetAudience } = req.body;
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, type, targetAudience },
      { new: true }
    );
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement notice not found' });
    }
    await createAuditLog('UPDATE_ANNOUNCEMENT', req.user._id, `Updated announcement: ${title}`, req);
    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
};

exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    await createAuditLog('DELETE_ANNOUNCEMENT', req.user._id, `Deleted announcement: ${announcement.title}`, req);
    res.status(200).json({ success: true, message: 'Announcement notice deleted' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SYSTEM AUDIT LOGS
// ==========================================

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find()
      .sort({ timestamp: -1 })
      .populate('performedBy', 'name role email');
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};
