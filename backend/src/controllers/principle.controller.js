const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Result = require('../models/Result');
const Announcement = require('../models/Announcement');
const AuditLog = require('../models/AuditLog');
const Inquiry = require('../models/Inquiry');
const CalendarEvent = require('../models/CalendarEvent');

// Helper to log principleistrative actions
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

// @desc    Get principle dashboard statistics
// @route   GET /api/principle/stats
// @access  Private (Principle only)
exports.getStats = async (req, res, next) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalClasses = await Class.countDocuments();
    const totalResults = await Result.countDocuments({ status: 'Published' });
    const totalPrinciples = await User.countDocuments({ role: 'principle' });

    res.status(200).json({
      success: true,
      stats: {
        totalTeachers,
        totalStudents,
        totalClasses,
        totalResultsPublished: totalResults,
        totalPrinciples,
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
// @route   GET /api/principle/teachers
// @access  Private (Principle only)
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
// @route   POST /api/principle/teachers
// @access  Private (Principle only)
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
        password: finalPassword, // Send back so principle can note down details
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
// @route   PUT /api/principle/teachers/:id
// @access  Private (Principle only)
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
// @route   DELETE /api/principle/teachers/:id
// @access  Private (Principle only)
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
// @route   PATCH /api/principle/teachers/:id/status
// @access  Private (Principle only)
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
// @route   POST /api/principle/teachers/:id/reset-password
// @access  Private (Principle only)
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
    const { name, rollNumber, class: className, academicYear, parentEmail, dateOfBirth } = req.body;
    const existing = await Student.findOne({ rollNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: `Roll Number '${rollNumber}' is already registered` });
    }

    const student = await Student.create({ name, rollNumber, class: className, academicYear, parentEmail, dateOfBirth });
    await createAuditLog('CREATE_STUDENT', req.user._id, `Registered student ${name} (Roll No: ${rollNumber})`, req);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, class: className, academicYear, parentEmail, status, dateOfBirth } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNumber, class: className, academicYear, parentEmail, status, dateOfBirth },
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
// RESULTS MANAGEMENT (PRINCIPLE PRIVILEGES)
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

// ==========================================
// ADMISSION INQUIRIES
// ==========================================

exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    next(error);
  }
};

exports.updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Reviewed', 'Contacted'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry status' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    await createAuditLog('UPDATE_INQUIRY', req.user._id, `Updated inquiry status for ${inquiry.studentName} to ${status}`, req);
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

exports.deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    await createAuditLog('DELETE_INQUIRY', req.user._id, `Deleted admission inquiry for ${inquiry.studentName}`, req);
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ACADEMIC CALENDAR EVENTS
// ==========================================

exports.getCalendarEvents = async (req, res, next) => {
  try {
    const events = await CalendarEvent.find().sort({ date: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

exports.createCalendarEvent = async (req, res, next) => {
  try {
    const { title, date, type, description, academicYear } = req.body;
    const event = await CalendarEvent.create({
      title,
      date,
      type,
      description,
      academicYear,
    });

    await createAuditLog('CREATE_CALENDAR_EVENT', req.user._id, `Created calendar event: ${title}`, req);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.updateCalendarEvent = async (req, res, next) => {
  try {
    const { title, date, type, description, academicYear } = req.body;
    const event = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      { title, date, type, description, academicYear },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: 'Calendar event not found' });
    }

    await createAuditLog('UPDATE_CALENDAR_EVENT', req.user._id, `Updated calendar event: ${title}`, req);
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.deleteCalendarEvent = async (req, res, next) => {
  try {
    const event = await CalendarEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Calendar event not found' });
    }

    await createAuditLog('DELETE_CALENDAR_EVENT', req.user._id, `Deleted calendar event: ${event.title}`, req);
    res.status(200).json({ success: true, message: 'Calendar event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIT CARD MANAGEMENT
// ==========================================
const AdmitCard = require('../models/AdmitCard');

exports.getAllAdmitCards = async (req, res, next) => {
  try {
    const cards = await AdmitCard.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (error) {
    next(error);
  }
};

exports.createAdmitCard = async (req, res, next) => {
  try {
    const { studentName, rollNumber, class: className, academicYear, dateOfBirth, fatherName, motherName, examCenter, datesheet } = req.body;

    const admitCard = await AdmitCard.findOneAndUpdate(
      { rollNumber: rollNumber.trim(), academicYear: academicYear.trim() },
      {
        studentName: studentName.trim(),
        class: className.trim(),
        dateOfBirth: dateOfBirth.trim(),
        fatherName: fatherName ? fatherName.trim() : 'N/A',
        motherName: motherName ? motherName.trim() : 'N/A',
        examCenter: examCenter ? examCenter.trim() : undefined,
        datesheet,
        status: 'Published'
      },
      { new: true, upsert: true }
    );

    await createAuditLog('UPSERT_ADMIT_CARD', req.user._id, `Uploaded admit card for Roll: ${rollNumber}`, req);
    res.status(200).json({ success: true, data: admitCard });
  } catch (error) {
    next(error);
  }
};

exports.deleteAdmitCard = async (req, res, next) => {
  try {
    const card = await AdmitCard.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ success: false, message: 'Admit Card not found' });
    }
    await createAuditLog('DELETE_ADMIT_CARD', req.user._id, `Deleted admit card for student: ${card.studentName} (Roll: ${card.rollNumber})`, req);
    res.status(200).json({ success: true, message: 'Admit Card deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// SYLLABUS MANAGEMENT
// ==========================================
const Syllabus = require('../models/Syllabus');

exports.getAllSyllabus = async (req, res, next) => {
  try {
    const syllabusList = await Syllabus.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: syllabusList.length, data: syllabusList });
  } catch (error) {
    next(error);
  }
};

exports.createSyllabus = async (req, res, next) => {
  try {
    const { title, class: className, subject, academicYear } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Syllabus PDF file is required' });
    }

    // Save public url path
    const pdfUrl = `/uploads/syllabus/${req.file.filename}`;

    const syllabus = await Syllabus.create({
      title: title.trim(),
      class: className.trim(),
      subject: subject.trim(),
      academicYear: academicYear.trim(),
      pdfUrl
    });

    await createAuditLog('CREATE_SYLLABUS', req.user._id, `Created syllabus: ${title} for Class ${className}`, req);
    res.status(201).json({ success: true, data: syllabus });
  } catch (error) {
    next(error);
  }
};

exports.deleteSyllabus = async (req, res, next) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
    if (!syllabus) {
      return res.status(404).json({ success: false, message: 'Syllabus not found' });
    }
    
    // Attempt to delete physical file if needed, but not strictly necessary for local dev
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../', syllabus.pdfUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await createAuditLog('DELETE_SYLLABUS', req.user._id, `Deleted syllabus: ${syllabus.title}`, req);
    res.status(200).json({ success: true, message: 'Syllabus deleted successfully' });
  } catch (error) {
    next(error);
  }
};



