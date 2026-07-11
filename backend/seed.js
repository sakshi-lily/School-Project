require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');

// Models
const User = require('./src/models/User');
const Admin = require('./src/models/Admin');
const Teacher = require('./src/models/Teacher');
const Student = require('./src/models/Student');
const Class = require('./src/models/Class');
const Announcement = require('./src/models/Announcement');
const Result = require('./src/models/Result');

const seedDB = async () => {
  try {
    await connectDB();
    console.log('🌱 Connected to MongoDB. Clearing existing collections...');

    // Clear existing data
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Class.deleteMany({});
    await Announcement.deleteMany({});
    await Result.deleteMany({});
    console.log('✅ Cleared database.');

    // 1. Seed Admin
    console.log('🌱 Seeding Admin...');
    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'admin@school.com',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    });
    await Admin.create({
      user: adminUser._id,
      permissions: ['all'],
      phoneNumber: '+919557244888',
      department: 'Administration',
    });
    console.log('✅ Seeded admin: admin@school.com / admin123');

    // 2. Seed Teacher
    console.log('🌱 Seeding Teacher...');
    const teacherUser = await User.create({
      name: 'Dr. Ramesh Kumar',
      email: 'teacher@school.com',
      username: 'teacher',
      password: 'teacher123',
      role: 'teacher',
    });
    await Teacher.create({
      user: teacherUser._id,
      subjects: ['Mathematics', 'Science', 'English'],
      qualification: 'M.Sc. Mathematics, B.Ed, Ph.D.',
      classesAssigned: ['10-A', '12-A'],
      experienceYears: 12,
    });
    console.log('✅ Seeded teacher: teacher@school.com / teacher123');

    // 3. Seed Classes
    console.log('🌱 Seeding Classes...');
    await Class.create([
      { name: '10', section: 'A', subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'], academicYear: '2026-2027' },
      { name: '10', section: 'B', subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Science'], academicYear: '2026-2027' },
      { name: '12', section: 'A', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Hindi'], academicYear: '2026-2027' },
    ]);
    console.log('✅ Seeded Classes (10-A, 10-B, 12-A).');

    // 4. Seed Students
    console.log('🌱 Seeding Students...');
    const students = await Student.create([
      {
        name: 'Aarav Sharma',
        rollNumber: '26105342',
        class: '10-A',
        academicYear: '2026-2027',
        parentEmail: 'aarav.sharma@gmail.com',
        dateOfBirth: '2010-04-15',
        status: 'Active',
      },
      {
        name: 'Vihaan Gupta',
        rollNumber: '26105343',
        class: '10-A',
        academicYear: '2026-2027',
        parentEmail: 'vihaan.gupta@gmail.com',
        dateOfBirth: '2010-08-22',
        status: 'Active',
      },
      {
        name: 'Ananya Verma',
        rollNumber: '26105344',
        class: '12-A',
        academicYear: '2026-2027',
        parentEmail: 'ananya.verma@gmail.com',
        dateOfBirth: '2008-11-05',
        status: 'Active',
      },
    ]);
    console.log('✅ Seeded Students.');

    // 5. Seed Announcements
    console.log('🌱 Seeding Announcements...');
    // Left empty so admin or teacher can create announcements/notices
    console.log('✅ Seeded Announcements (Empty).');

    // 6. Seed Results
    console.log('🌱 Seeding Results...');
    await Result.create([
      {
        studentName: 'Aarav Sharma',
        rollNumber: '26105342',
        class: '10-A',
        academicYear: '2026-2027',
        term: 'Half-Yearly',
        subjectMarks: [
          { subject: 'Mathematics', marksObtained: 85, maxMarks: 100 },
          { subject: 'Science', marksObtained: 90, maxMarks: 100 },
          { subject: 'English', marksObtained: 78, maxMarks: 100 },
          { subject: 'Hindi', marksObtained: 92, maxMarks: 100 },
          { subject: 'Social Science', marksObtained: 88, maxMarks: 100 }
        ],
        totalMarks: 443,
        maxTotalMarks: 500,
        percentage: 88.6,
        grade: 'A',
        status: 'Published',
        createdBy: teacherUser._id,
      },
      {
        studentName: 'Vihaan Gupta',
        rollNumber: '26105343',
        class: '10-A',
        academicYear: '2026-2027',
        term: 'Half-Yearly',
        subjectMarks: [
          { subject: 'Mathematics', marksObtained: 72, maxMarks: 100 },
          { subject: 'Science', marksObtained: 68, maxMarks: 100 },
          { subject: 'English', marksObtained: 81, maxMarks: 100 },
          { subject: 'Hindi', marksObtained: 75, maxMarks: 100 },
          { subject: 'Social Science', marksObtained: 79, maxMarks: 100 }
        ],
        totalMarks: 375,
        maxTotalMarks: 500,
        percentage: 75,
        grade: 'B',
        status: 'Published',
        createdBy: teacherUser._id,
      }
    ]);
    console.log('✅ Seeded Results.');

    console.log('🎉 Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
