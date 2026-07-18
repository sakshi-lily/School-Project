import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import SchoolLogo from '../components/SchoolLogo';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  PlusCircle, 
  LogOut, 
  CheckCircle,
  Mail,
  UserCheck,
  Award,
  BookOpen,
  FolderOpen,
  Megaphone,
  Activity,
  Trash2,
  Edit2,
  Lock,
  Eye,
  EyeOff,
  UserPlus
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ 
    totalTeachers: 0, 
    totalStudents: 0, 
    totalClasses: 0, 
    totalResultsPublished: 0, 
    totalPrinciples: 0, 
    academicYear: '2026-2027' 
  });
  
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [results, setResults] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  
  const [inquiries, setInquiries] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [showCalendarForm, setShowCalendarForm] = useState(false);
  const [editingCalendarEvent, setEditingCalendarEvent] = useState(null);
  const [calendarFormData, setCalendarFormData] = useState({
    title: '', date: '', type: 'Holiday', description: '', academicYear: '2026-2027'
  });
  
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modals / Form states
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teacherFormData, setTeacherFormData] = useState({
    name: '', email: '', password: '', subjects: '', qualification: '', experienceYears: 0, classesAssigned: ''
  });

  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentFormData, setStudentFormData] = useState({
    name: '', rollNumber: '', class: '', academicYear: '2026-2027', parentEmail: '', status: 'Active', dateOfBirth: '2010-01-01'
  });

  const [showClassForm, setShowClassForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [classFormData, setClassFormData] = useState({
    name: '', section: '', subjects: '', academicYear: '2026-2027'
  });

  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: '', content: '', type: 'Announcement', targetAudience: 'all'
  });

  // Password reset state
  const [resettingTeacherId, setResettingTeacherId] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');

  // CSV Upload modal states
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvUploadProgress, setCsvUploadProgress] = useState(null);

  // Admit Cards and Syllabus states
  const [admitCards, setAdmitCards] = useState([]);
  const [syllabusList, setSyllabusList] = useState([]);
  const [showAdmitCardCsvModal, setShowAdmitCardCsvModal] = useState(false);
  const [admitCardCsvProgress, setAdmitCardCsvProgress] = useState(null);
  const [showSyllabusForm, setShowSyllabusForm] = useState(false);
  const [syllabusFormData, setSyllabusFormData] = useState({
    title: '', class: '', subject: '', academicYear: '2026-2027'
  });
  const [syllabusFile, setSyllabusFile] = useState(null);

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchStats = async () => {
    try {
      const statsRes = await api.get('/principle/stats');
      if (statsRes.data.success) setStats(statsRes.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get('/principle/teachers');
      if (res.data.success) setTeachers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get('/principle/students');
      if (res.data.success) setStudents(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get('/principle/classes');
      if (res.data.success) setClasses(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get('/principle/announcements');
      if (res.data.success) setAnnouncements(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await api.get('/principle/results');
      if (res.data.success) setResults(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await api.get('/principle/logs');
      if (res.data.success) setAuditLogs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await api.get('/principle/inquiries');
      if (res.data.success) setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCalendarEvents = async () => {
    try {
      const res = await api.get('/principle/calendar');
      if (res.data.success) setCalendarEvents(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdmitCards = async () => {
    try {
      const res = await api.get('/principle/admit-cards');
      if (res.data.success) setAdmitCards(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSyllabusList = async () => {
    try {
      const res = await api.get('/principle/syllabus');
      if (res.data.success) setSyllabusList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchStats(),
      fetchTeachers(),
      fetchStudents(),
      fetchClasses(),
      fetchAnnouncements(),
      fetchResults(),
      fetchAuditLogs(),
      fetchInquiries(),
      fetchCalendarEvents(),
      fetchAdmitCards(),
      fetchSyllabusList()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // ==========================================
  // TEACHER HANDLERS
  // ==========================================
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...teacherFormData,
        subjects: teacherFormData.subjects.split(',').map(s => s.trim()).filter(Boolean),
        classesAssigned: teacherFormData.classesAssigned.split(',').map(c => c.trim()).filter(Boolean),
        experienceYears: parseInt(teacherFormData.experienceYears || 0, 10)
      };

      let res;
      if (editingTeacher) {
        res = await api.put(`/principle/teachers/${editingTeacher._id}`, payload);
      } else {
        res = await api.post('/principle/teachers', payload);
      }

      if (res.data.success) {
        triggerNotification('success', editingTeacher ? 'Teacher updated successfully!' : 'Teacher onboarded successfully!');
        
        // If teacher is newly created, show username/password credentials popup
        if (!editingTeacher) {
          alert(`IMPORTANT: Credentials Generated!\nUsername: ${res.data.data.username}\nPassword: ${res.data.data.password}\nPlease share these credentials with the teacher.`);
        }
        
        setShowTeacherForm(false);
        setEditingTeacher(null);
        setTeacherFormData({ name: '', email: '', password: '', subjects: '', qualification: '', experienceYears: 0, classesAssigned: '' });
        fetchTeachers();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (error) {
      triggerNotification('error', error.response?.data?.message || 'Failed to save teacher profiles');
    }
  };

  const handleToggleTeacherStatus = async (id) => {
    try {
      const res = await api.patch(`/principle/teachers/${id}/status`);
      if (res.data.success) {
        triggerNotification('success', res.data.message);
        fetchTeachers();
        fetchAuditLogs();
      }
    } catch (error) {
      triggerNotification('error', 'Status toggle failed');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!newPasswordValue) return;
    try {
      const res = await api.post(`/principle/teachers/${resettingTeacherId}/reset-password`, { newPassword: newPasswordValue });
      if (res.data.success) {
        triggerNotification('success', 'Teacher password reset successfully!');
        setResettingTeacherId(null);
        setNewPasswordValue('');
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to reset password');
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this teacher account? All logs and records will be deleted.')) return;
    try {
      const res = await api.delete(`/principle/teachers/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Teacher account deleted successfully.');
        fetchTeachers();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete teacher account');
    }
  };

  // ==========================================
  // STUDENT HANDLERS
  // ==========================================
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingStudent) {
        res = await api.put(`/principle/students/${editingStudent._id}`, studentFormData);
      } else {
        res = await api.post('/principle/students', studentFormData);
      }

      if (res.data.success) {
        triggerNotification('success', editingStudent ? 'Student details updated' : 'Student registered successfully!');
        setShowStudentForm(false);
        setEditingStudent(null);
        setStudentFormData({ name: '', rollNumber: '', class: '', academicYear: '2026-2027', parentEmail: '', status: 'Active', dateOfBirth: '2010-01-01' });
        fetchStudents();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (error) {
      triggerNotification('error', error.response?.data?.message || 'Failed to save student profile');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Delete student record permanently?')) return;
    try {
      const res = await api.delete(`/principle/students/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Student record deleted');
        fetchStudents();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete student');
    }
  };

  const handleCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        if (lines.length < 2) {
          alert("CSV file must contain a header and at least one data row.");
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
        const requiredHeaders = ['rollNumber', 'studentName', 'class', 'academicYear', 'term'];
        for (const req of requiredHeaders) {
          if (!headers.includes(req)) {
            alert(`Missing required column header: ${req}`);
            return;
          }
        }

        const subjectHeaders = headers.filter(h => !requiredHeaders.includes(h));
        const parsedRows = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
          if (values.length < requiredHeaders.length) continue;

          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index] || '';
          });

          const subjectMarks = [];
          subjectHeaders.forEach(subject => {
            const marksVal = rowData[subject];
            if (marksVal !== undefined && marksVal !== '') {
              subjectMarks.push({
                subject,
                marksObtained: parseInt(marksVal || 0, 10),
                maxMarks: 100
              });
            }
          });

          parsedRows.push({
            studentName: rowData.studentName,
            rollNumber: rowData.rollNumber,
            class: rowData.class,
            academicYear: rowData.academicYear,
            term: rowData.term,
            subjectMarks,
            status: 'Published'
          });
        }

        if (parsedRows.length === 0) {
          alert("No valid data rows found in CSV.");
          return;
        }

        setCsvUploadProgress({
          current: 0,
          total: parsedRows.length,
          successCount: 0,
          errorCount: 0,
          details: []
        });

        let success = 0;
        let errors = 0;
        const details = [];

        for (let i = 0; i < parsedRows.length; i++) {
          const row = parsedRows[i];
          try {
            const res = await api.post('/principle/results', row);
            if (res.data.success) {
              success++;
              details.push({ status: 'success', message: `Roll Number ${row.rollNumber}: Successfully saved.` });
            } else {
              errors++;
              details.push({ status: 'error', message: `Roll Number ${row.rollNumber}: ${res.data.message || 'Unknown error'}` });
            }
          } catch (err) {
            errors++;
            details.push({ status: 'error', message: `Roll Number ${row.rollNumber}: ${err.response?.data?.message || err.message}` });
          }

          setCsvUploadProgress(prev => ({
            ...prev,
            current: i + 1,
            successCount: success,
            errorCount: errors,
            details: [...details]
          }));
        }

        fetchResults();
        fetchStats();
        fetchAuditLogs();
      } catch (err) {
        console.error("Error reading CSV:", err);
        alert("Failed to parse CSV file.");
      }
    };
    reader.readAsText(file);
  };

  const handleAdmitCardCsvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        if (lines.length < 2) {
          alert("CSV file must contain a header and at least one data row.");
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
        const requiredHeaders = ['rollNumber', 'studentName', 'class', 'academicYear', 'dateOfBirth'];
        for (const req of requiredHeaders) {
          if (!headers.includes(req)) {
            alert(`Missing required column header: ${req}`);
            return;
          }
        }

        const parsedRows = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
          if (values.length < requiredHeaders.length) continue;

          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index] || '';
          });

          // Parse datesheet which is a semicolon separated list of: "Subject: Date Time" or "Subject: Date"
          // E.g. "English: 2026-03-02 09:00 AM; Mathematics: 2026-03-04 09:00 AM"
          const datesheet = [];
          if (rowData.datesheet) {
            const parts = rowData.datesheet.split(';').map(p => p.trim()).filter(Boolean);
            parts.forEach(part => {
              const colonIndex = part.indexOf(':');
              if (colonIndex !== -1) {
                const subject = part.substring(0, colonIndex).trim();
                const dateTimeStr = part.substring(colonIndex + 1).trim();
                // split by space to separate date and time if possible
                const spaceIndex = dateTimeStr.indexOf(' ');
                let date = dateTimeStr;
                let time = '09:00 AM';
                if (spaceIndex !== -1) {
                  date = dateTimeStr.substring(0, spaceIndex).trim();
                  time = dateTimeStr.substring(spaceIndex + 1).trim();
                }
                datesheet.push({ subject, date, time });
              }
            });
          }

          parsedRows.push({
            studentName: rowData.studentName,
            rollNumber: rowData.rollNumber,
            class: rowData.class,
            academicYear: rowData.academicYear,
            dateOfBirth: rowData.dateOfBirth,
            fatherName: rowData.fatherName || 'N/A',
            motherName: rowData.motherName || 'N/A',
            examCenter: rowData.examCenter || 'Thakur Biri Singh Inter College, Tundla',
            datesheet,
            status: 'Published'
          });
        }

        if (parsedRows.length === 0) {
          alert("No valid data rows found in CSV.");
          return;
        }

        setAdmitCardCsvProgress({
          current: 0,
          total: parsedRows.length,
          successCount: 0,
          errorCount: 0,
          details: []
        });

        let success = 0;
        let errors = 0;
        const details = [];

        for (let i = 0; i < parsedRows.length; i++) {
          const row = parsedRows[i];
          try {
            const res = await api.post('/principle/admit-cards', row);
            if (res.data.success) {
              success++;
              details.push({ status: 'success', message: `Roll Number ${row.rollNumber}: Successfully saved.` });
            } else {
              errors++;
              details.push({ status: 'error', message: `Roll Number ${row.rollNumber}: ${res.data.message || 'Unknown error'}` });
            }
          } catch (err) {
            errors++;
            details.push({ status: 'error', message: `Roll Number ${row.rollNumber}: ${err.response?.data?.message || err.message}` });
          }

          setAdmitCardCsvProgress(prev => ({
            ...prev,
            current: i + 1,
            successCount: success,
            errorCount: errors,
            details: [...details]
          }));
        }

        fetchAdmitCards();
        fetchStats();
        fetchAuditLogs();
      } catch (err) {
        console.error("Error reading CSV:", err);
        alert("Failed to parse CSV file.");
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteAdmitCard = async (id) => {
    if (!window.confirm('Delete admit card permanently?')) return;
    try {
      const res = await api.delete(`/principle/admit-cards/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Admit card deleted');
        fetchAdmitCards();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete admit card');
    }
  };

  const handleSyllabusSubmit = async (e) => {
    e.preventDefault();
    if (!syllabusFile) {
      triggerNotification('error', 'Please select a syllabus PDF file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', syllabusFormData.title);
      formData.append('class', syllabusFormData.class);
      formData.append('subject', syllabusFormData.subject);
      formData.append('academicYear', syllabusFormData.academicYear);
      formData.append('pdfFile', syllabusFile);

      const res = await api.post('/principle/syllabus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        triggerNotification('success', 'Syllabus uploaded successfully!');
        setShowSyllabusForm(false);
        setSyllabusFormData({ title: '', class: '', subject: '', academicYear: '2026-2027' });
        setSyllabusFile(null);
        fetchSyllabusList();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', err.response?.data?.message || 'Failed to upload syllabus');
    }
  };

  const handleDeleteSyllabus = async (id) => {
    if (!window.confirm('Delete this syllabus configuration?')) return;
    try {
      const res = await api.delete(`/principle/syllabus/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Syllabus deleted successfully');
        fetchSyllabusList();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete syllabus');
    }
  };

  // ==========================================
  // CLASS HANDLERS
  // ==========================================
  const handleClassSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...classFormData,
        subjects: classFormData.subjects.split(',').map(s => s.trim()).filter(Boolean)
      };

      let res;
      if (editingClass) {
        res = await api.put(`/principle/classes/${editingClass._id}`, payload);
      } else {
        res = await api.post('/principle/classes', payload);
      }

      if (res.data.success) {
        triggerNotification('success', 'Class details saved');
        setShowClassForm(false);
        setEditingClass(null);
        setClassFormData({ name: '', section: '', subjects: '', academicYear: '2026-2027' });
        fetchClasses();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', err.response?.data?.message || 'Failed to save class configuration');
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm('Delete class configuration?')) return;
    try {
      const res = await api.delete(`/principle/classes/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Class configuration deleted');
        fetchClasses();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete class');
    }
  };

  // ==========================================
  // ANNOUNCEMENT / NOTICE HANDLERS
  // ==========================================
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingNotice) {
        res = await api.put(`/principle/announcements/${editingNotice._id}`, noticeFormData);
      } else {
        res = await api.post('/principle/announcements', noticeFormData);
      }

      if (res.data.success) {
        triggerNotification('success', 'Notice published successfully!');
        setShowNoticeForm(false);
        setEditingNotice(null);
        setNoticeFormData({ title: '', content: '', type: 'Announcement', targetAudience: 'all' });
        fetchAnnouncements();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to publish notice');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this announcement permanently?')) return;
    try {
      const res = await api.delete(`/principle/announcements/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Announcement deleted');
        fetchAnnouncements();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete announcement');
    }
  };

  // ==========================================
  // RESULTS PUBLISHING HANDLERS
  // ==========================================
  const handleToggleResultStatus = async (resultCard) => {
    try {
      const newStatus = resultCard.status === 'Published' ? 'Unpublished' : 'Published';
      const res = await api.put(`/principle/results/${resultCard._id}`, { status: newStatus });
      if (res.data.success) {
        triggerNotification('success', `Result set to ${newStatus}`);
        fetchResults();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to change result publication status');
    }
  };

  const handleDeleteResult = async (id) => {
    if (!window.confirm('Delete result sheet permanently?')) return;
    try {
      const res = await api.delete(`/principle/results/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Result sheet deleted');
        fetchResults();
        fetchStats();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete result');
    }
  };

  const handleInquiryStatusChange = async (id, status) => {
    try {
      const res = await api.patch(`/principle/inquiries/${id}/status`, { status });
      if (res.data.success) {
        triggerNotification('success', `Inquiry status updated to ${status}`);
        fetchInquiries();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to update inquiry status');
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await api.delete(`/principle/inquiries/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Inquiry deleted successfully');
        fetchInquiries();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete inquiry');
    }
  };

  const handleCalendarEventSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingCalendarEvent) {
        res = await api.put(`/principle/calendar/${editingCalendarEvent._id}`, calendarFormData);
      } else {
        res = await api.post('/principle/calendar', calendarFormData);
      }

      if (res.data.success) {
        triggerNotification('success', editingCalendarEvent ? 'Calendar event updated successfully!' : 'Calendar event created successfully!');
        setShowCalendarForm(false);
        setEditingCalendarEvent(null);
        setCalendarFormData({ title: '', date: '', type: 'Holiday', description: '', academicYear: '2026-2027' });
        fetchCalendarEvents();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to save calendar event');
    }
  };

  const handleDeleteCalendarEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this calendar event?')) return;
    try {
      const res = await api.delete(`/principle/calendar/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Calendar event deleted successfully');
        fetchCalendarEvents();
        fetchAuditLogs();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete calendar event');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div style={{ marginBottom: '2.5rem' }}>
          <SchoolLogo size={42} showText={true} textColor="#ffffff" subTextColor="var(--text-secondary)" />
        </div>

        <div className="nav-links">
          <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <Activity size={20} />
            <span>Dashboard</span>
          </div>
          <div className={`nav-item ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
            <Users size={20} />
            <span>Teachers</span>
          </div>
          <div className={`nav-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
            <UserPlus size={20} />
            <span>Students</span>
          </div>
          <div className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            <FolderOpen size={20} />
            <span>Classes</span>
          </div>
          <div className={`nav-item ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
            <Award size={20} />
            <span>Results Portal</span>
          </div>
          <div className={`nav-item ${activeTab === 'admitCards' ? 'active' : ''}`} onClick={() => setActiveTab('admitCards')}>
            <UserCheck size={20} />
            <span>Admit Cards</span>
          </div>
          <div className={`nav-item ${activeTab === 'syllabus' ? 'active' : ''}`} onClick={() => setActiveTab('syllabus')}>
            <BookOpen size={20} />
            <span>Syllabus Desk</span>
          </div>
          <div className={`nav-item ${activeTab === 'notices' ? 'active' : ''}`} onClick={() => setActiveTab('notices')}>
            <Megaphone size={20} />
            <span>Notices Desk</span>
          </div>
          <div className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
            <Mail size={20} />
            <span>Inquiries</span>
          </div>
          <div className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
            <Calendar size={20} />
            <span>Calendar</span>
          </div>
          <div className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
            <BookOpen size={20} />
            <span>Audit Trail</span>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={20} />
          <span>Exit System</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="navbar">
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
              {activeTab === 'overview' && 'System Analytics'}
              {activeTab === 'teachers' && 'Faculty Management'}
              {activeTab === 'students' && 'Student Registry'}
              {activeTab === 'classes' && 'Academic Classes'}
              {activeTab === 'results' && 'Results Publishing'}
              {activeTab === 'admitCards' && 'Admit Card Management'}
              {activeTab === 'syllabus' && 'Syllabus Management'}
              {activeTab === 'notices' && 'Circular Board'}
              {activeTab === 'inquiries' && 'Admission & General Inquiries'}
              {activeTab === 'calendar' && 'Academic Calendar Scheduling'}
              {activeTab === 'logs' && 'Audit Logs Trails'}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Principleistrative Owner</p>
          </div>
          <div className="user-profile-badge">
            <div className="avatar">A</div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name || 'Super Principle'}</span>
          </div>
        </div>

        {notification && (
          <div className={`alert-banner ${notification.type}`} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <CheckCircle size={20} />
            <span>{notification.message}</span>
          </div>
        )}

        {/* LOADING SCREEN */}
        {loading ? (
          <div style={{ padding: '6rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading EduSphere dashboard components...
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                <div className="dashboard-grid">
                  <div className="stat-card">
                    <div className="stat-icon"><Users size={24} /></div>
                    <div>
                      <div className="stat-value">{stats.totalTeachers}</div>
                      <div className="stat-title">Registered Faculty</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon" style={{ color: 'var(--color-secondary)', background: 'rgba(139, 92, 246, 0.1)' }}><UserPlus size={24} /></div>
                    <div>
                      <div className="stat-value">{stats.totalStudents}</div>
                      <div className="stat-title">Enrolled Students</div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{ color: 'var(--color-accent)', background: 'rgba(6, 182, 212, 0.1)' }}><FolderOpen size={24} /></div>
                    <div>
                      <div className="stat-value">{stats.totalClasses}</div>
                      <div className="stat-title">Classes Defined</div>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{ color: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.1)' }}><Award size={24} /></div>
                    <div>
                      <div className="stat-value">{stats.totalResultsPublished}</div>
                      <div className="stat-title">Results Published</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '2rem', marginTop: '2rem' }}>
                  <div className="table-container" style={{ margin: 0 }}>
                    <div className="table-header"><h3>Recent System Activity Logs</h3></div>
                    <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Action</th>
                            <th>Principle</th>
                            <th>Details</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {auditLogs.slice(0, 5).map((log) => (
                            <tr key={log._id}>
                              <td><span style={{ fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)', fontWeight: 'bold' }}>{log.action}</span></td>
                              <td>{log.performedBy?.name || 'System'}</td>
                              <td style={{ fontSize: '0.85rem' }}>{log.details}</td>
                              <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(log.timestamp).toLocaleTimeString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: '2rem' }}>
                    <h3>Portal Settings</h3>
                    <div style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <p><strong>Academic Session:</strong> 2026-2027 (Active)</p>
                      <p><strong>System State:</strong> Normal operation</p>
                      <p><strong>Database Connection:</strong> MongoDB Connected</p>
                      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '1rem 0' }}></div>
                      <button className="btn-primary" onClick={loadAllData} style={{ width: '100%' }}>Refresh Statistics</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TEACHERS TAB */}
            {activeTab === 'teachers' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Faculty Directory</h3>
                  <button className="table-action-btn" onClick={() => { setEditingTeacher(null); setTeacherFormData({ name: '', email: '', password: '', subjects: '', qualification: '', experienceYears: 0, classesAssigned: '' }); setShowTeacherForm(!showTeacherForm); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} />
                    <span>Onboard Teacher</span>
                  </button>
                </div>

                {/* Reset Password mini-form widget */}
                {resettingTeacherId && (
                  <div style={{ padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderBottom: '1px solid var(--color-border)' }}>
                    <form onSubmit={handleResetPasswordSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--color-danger)' }}>Resetting Faculty Password:</span>
                      <input 
                        type="text" 
                        placeholder="Enter New Security Password" 
                        value={newPasswordValue} 
                        onChange={(e) => setNewPasswordValue(e.target.value)} 
                        className="form-input" 
                        style={{ flex: 1, margin: 0 }}
                        required 
                      />
                      <button type="submit" className="btn-primary" style={{ width: 'auto', backgroundColor: 'var(--color-danger)', border: 'none' }}>Change Password</button>
                      <button type="button" onClick={() => setResettingTeacherId(null)} className="form-input" style={{ width: 'auto', margin: 0, cursor: 'pointer' }}>Cancel</button>
                    </form>
                  </div>
                )}

                {showTeacherForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{editingTeacher ? 'Modify Faculty details' : 'Register New Faculty'}</h4>
                    <form onSubmit={handleTeacherSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" name="name" className="form-input" value={teacherFormData.name} onChange={(e) => setTeacherFormData({...teacherFormData, name: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" className="form-input" value={teacherFormData.email} onChange={(e) => setTeacherFormData({...teacherFormData, email: e.target.value})} required />
                      </div>
                      {!editingTeacher && (
                        <div className="form-group">
                          <label className="form-label">Password Credentials (Optional - auto-generated if left blank)</label>
                          <input type="password" name="password" className="form-input" value={teacherFormData.password} onChange={(e) => setTeacherFormData({...teacherFormData, password: e.target.value})} placeholder="Leave blank to auto-generate" />
                        </div>
                      )}
                      <div className="form-group">
                        <label className="form-label">Qualifications</label>
                        <input type="text" name="qualification" className="form-input" value={teacherFormData.qualification} onChange={(e) => setTeacherFormData({...teacherFormData, qualification: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subjects Taught (comma separated)</label>
                        <input type="text" name="subjects" className="form-input" placeholder="e.g. Mathematics, Chemistry" value={teacherFormData.subjects} onChange={(e) => setTeacherFormData({...teacherFormData, subjects: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Classes Assigned (comma separated)</label>
                        <input type="text" name="classesAssigned" className="form-input" placeholder="e.g. 10-A, 9-B" value={teacherFormData.classesAssigned} onChange={(e) => setTeacherFormData({...teacherFormData, classesAssigned: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Years of Experience</label>
                        <input type="number" name="experienceYears" className="form-input" value={teacherFormData.experienceYears} onChange={(e) => setTeacherFormData({...teacherFormData, experienceYears: e.target.value})} min="0" required />
                      </div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowTeacherForm(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>{editingTeacher ? 'Update details' : 'Save & Register'}</button>
                      </div>
                    </form>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name / Username</th>
                      <th>Email Address</th>
                      <th>Qualifications</th>
                      <th>Subjects</th>
                      <th>Experience</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher._id}>
                        <td>
                          <div style={{ fontWeight: '600' }}>{teacher.user?.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>@{teacher.user?.username}</div>
                        </td>
                        <td>{teacher.user?.email}</td>
                        <td>{teacher.qualification}</td>
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {teacher.subjects.map((sub, idx) => (
                              <span key={idx} style={{ padding: '2px 6px', fontSize: '0.7rem', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)', borderRadius: '4px' }}>{sub}</span>
                            ))}
                          </div>
                        </td>
                        <td>{teacher.experienceYears} Years</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', backgroundColor: teacher.user?.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: teacher.user?.isActive ? 'var(--color-success)' : 'var(--color-danger)' }}>
                            {teacher.user?.isActive ? 'Active' : 'Suspended'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                setEditingTeacher(teacher);
                                setTeacherFormData({
                                  name: teacher.user.name,
                                  email: teacher.user.email,
                                  subjects: teacher.subjects.join(', '),
                                  qualification: teacher.qualification,
                                  experienceYears: teacher.experienceYears,
                                  classesAssigned: (teacher.classesAssigned || []).join(', ')
                                });
                                setShowTeacherForm(true);
                              }}
                              style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => { setResettingTeacherId(teacher._id); setNewPasswordValue(''); }}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-warning)', cursor: 'pointer' }}
                              title="Reset Password"
                            >
                              <Lock size={16} />
                            </button>
                            <button 
                              onClick={() => handleToggleTeacherStatus(teacher._id)}
                              style={{ border: 'none', background: 'transparent', color: teacher.user?.isActive ? 'var(--color-warning)' : 'var(--color-success)', cursor: 'pointer' }}
                              title={teacher.user?.isActive ? 'Suspend Teacher' : 'Activate Teacher'}
                            >
                              {teacher.user?.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button 
                              onClick={() => handleDeleteTeacher(teacher._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* STUDENTS TAB */}
            {activeTab === 'students' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Enrolled Students</h3>
                  <button className="table-action-btn" onClick={() => { setEditingStudent(null); setStudentFormData({ name: '', rollNumber: '', class: '', academicYear: '2026-2027', parentEmail: '', status: 'Active', dateOfBirth: '2010-01-01' }); setShowStudentForm(!showStudentForm); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} />
                    <span>Register Student</span>
                  </button>
                </div>

                {showStudentForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{editingStudent ? 'Edit Student details' : 'Register New Student'}</h4>
                    <form onSubmit={handleStudentSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" value={studentFormData.name} onChange={(e) => setStudentFormData({...studentFormData, name: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Roll Number</label>
                        <input type="text" className="form-input" value={studentFormData.rollNumber} onChange={(e) => setStudentFormData({...studentFormData, rollNumber: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Class Assigned</label>
                        <input type="text" className="form-input" placeholder="e.g. 10-A" value={studentFormData.class} onChange={(e) => setStudentFormData({...studentFormData, class: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Academic Year</label>
                        <input type="text" className="form-input" value={studentFormData.academicYear} onChange={(e) => setStudentFormData({...studentFormData, academicYear: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <input type="date" className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: 'white' }} value={studentFormData.dateOfBirth} onChange={(e) => setStudentFormData({...studentFormData, dateOfBirth: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Parent / Contact Email</label>
                        <input type="email" className="form-input" value={studentFormData.parentEmail} onChange={(e) => setStudentFormData({...studentFormData, parentEmail: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Registry Status</label>
                        <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: '#white' }} value={studentFormData.status} onChange={(e) => setStudentFormData({...studentFormData, status: e.target.value})}>
                          <option value="Active">Active</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowStudentForm(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>{editingStudent ? 'Update Student' : 'Onboard Student'}</button>
                      </div>
                    </form>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Date of Birth</th>
                      <th>Assigned Class</th>
                      <th>Academic Year</th>
                      <th>Parent Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student._id}>
                        <td style={{ fontWeight: 'bold' }}>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>
                        <td>{student.class}</td>
                        <td>{student.academicYear}</td>
                        <td>{student.parentEmail || 'N/A'}</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', backgroundColor: student.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: student.status === 'Active' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                  setEditingStudent(student);
                                  setStudentFormData({
                                    name: student.name,
                                    rollNumber: student.rollNumber,
                                    class: student.class,
                                    academicYear: student.academicYear,
                                    parentEmail: student.parentEmail || '',
                                    status: student.status,
                                    dateOfBirth: student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : '2010-01-01'
                                  });
                                  setShowStudentForm(true);
                              }}
                              style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteStudent(student._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CLASSES TAB */}
            {activeTab === 'classes' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Academic Classes & Curriculums</h3>
                  <button className="table-action-btn" onClick={() => { setEditingClass(null); setClassFormData({ name: '', section: '', subjects: '', academicYear: '2026-2027' }); setShowClassForm(!showClassForm); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} />
                    <span>Create Class</span>
                  </button>
                </div>

                {showClassForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Configure Class</h4>
                    <form onSubmit={handleClassSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Class Name</label>
                        <input type="text" className="form-input" placeholder="e.g. 10" value={classFormData.name} onChange={(e) => setClassFormData({...classFormData, name: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Section</label>
                        <input type="text" className="form-input" placeholder="e.g. A" value={classFormData.section} onChange={(e) => setClassFormData({...classFormData, section: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subjects (comma separated)</label>
                        <input type="text" className="form-input" placeholder="e.g. Physics, Math, English" value={classFormData.subjects} onChange={(e) => setClassFormData({...classFormData, subjects: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Academic Year</label>
                        <input type="text" className="form-input" value={classFormData.academicYear} onChange={(e) => setClassFormData({...classFormData, academicYear: e.target.value})} required />
                      </div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowClassForm(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>Save Configuration</button>
                      </div>
                    </form>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Class Identifier</th>
                      <th>Section</th>
                      <th>Academic Year</th>
                      <th>Syllabus Subjects</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((cls) => (
                      <tr key={cls._id}>
                        <td style={{ fontWeight: 'bold' }}>Grade {cls.name}</td>
                        <td>Section {cls.section}</td>
                        <td>{cls.academicYear}</td>
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {cls.subjects.map((sub, i) => (
                              <span key={i} style={{ padding: '2px 6px', fontSize: '0.7rem', backgroundColor: 'rgba(6,182,212,0.1)', color: 'var(--color-accent)', borderRadius: '4px' }}>{sub}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                setEditingClass(cls);
                                setClassFormData({
                                  name: cls.name,
                                  section: cls.section,
                                  subjects: cls.subjects.join(', '),
                                  academicYear: cls.academicYear
                                });
                                setShowClassForm(true);
                              }}
                              style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteClass(cls._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* RESULTS DESK */}
            {activeTab === 'results' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>All Examination Marksheets</h3>
                  <button 
                    className="table-action-btn" 
                    onClick={() => { setShowCsvModal(true); setCsvUploadProgress(null); }} 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-primary)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <PlusCircle size={18} />
                    <span>Upload CSV Results</span>
                  </button>
                </div>

                {showCsvModal && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Bulk Upload Examination Results via CSV</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                      Please select a CSV file. The file should have columns matching: <br />
                      <code>rollNumber, studentName, class, academicYear, term, Mathematics, Science, English, ...</code> <br />
                      (You can add any custom subject columns. Marks will be saved as scores out of 100).
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleCsvUpload} 
                        style={{ 
                          padding: '10px', 
                          border: '1px dashed var(--color-border)', 
                          borderRadius: '4px', 
                          backgroundColor: 'var(--color-bg)', 
                          color: 'white',
                          cursor: 'pointer' 
                        }} 
                      />
                      <button 
                        type="button" 
                        className="form-input" 
                        style={{ width: 'auto', cursor: 'pointer', padding: '8px 16px' }} 
                        onClick={() => { setShowCsvModal(false); setCsvUploadProgress(null); }}
                      >
                        Close Window
                      </button>
                    </div>

                    {csvUploadProgress && (
                      <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                          <span>Processing Row: {csvUploadProgress.current} of {csvUploadProgress.total}</span>
                          <span>Success: {csvUploadProgress.successCount} | Failed: {csvUploadProgress.errorCount}</span>
                        </div>
                        <div style={{ width: '100%', backgroundColor: 'var(--color-border)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                          <div 
                            style={{ 
                              width: `${(csvUploadProgress.current / csvUploadProgress.total) * 100}%`, 
                              backgroundColor: 'var(--color-success)', 
                              height: '100%',
                              transition: 'width 0.2s ease-in-out' 
                            }} 
                          />
                        </div>
                        <div style={{ maxHeight: '150px', overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {csvUploadProgress.details.map((detail, index) => (
                            <div key={index} style={{ color: detail.status === 'success' ? 'var(--color-success)' : 'var(--color-danger)', marginBottom: '4px' }}>
                              â€¢ {detail.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Exam Term</th>
                      <th>Academic Year</th>
                      <th>Score Info</th>
                      <th>Publish Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((resCard) => (
                      <tr key={resCard._id}>
                        <td style={{ fontWeight: 'bold' }}>{resCard.rollNumber}</td>
                        <td>{resCard.studentName}</td>
                        <td>{resCard.class}</td>
                        <td>{resCard.term}</td>
                        <td>{resCard.academicYear}</td>
                        <td>
                          <div style={{ fontWeight: '600' }}>{resCard.totalMarks} / {resCard.maxTotalMarks} ({resCard.percentage}%)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Grade secured: {resCard.grade}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', backgroundColor: resCard.status === 'Published' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: resCard.status === 'Published' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                            {resCard.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => handleToggleResultStatus(resCard)}
                              style={{ border: 'none', background: 'transparent', color: resCard.status === 'Published' ? 'var(--color-warning)' : 'var(--color-success)', cursor: 'pointer' }}
                              title={resCard.status === 'Published' ? 'Unpublish result card' : 'Publish result card'}
                            >
                              {resCard.status === 'Published' ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button 
                              onClick={() => handleDeleteResult(resCard._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                              title="Delete result card"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ADMIT CARDS TAB */}
            {activeTab === 'admitCards' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>All Student Examination Admit Cards</h3>
                  <button 
                    className="table-action-btn" 
                    onClick={() => { setShowAdmitCardCsvModal(true); setAdmitCardCsvProgress(null); }} 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-primary)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <PlusCircle size={18} />
                    <span>Upload CSV Admit Cards</span>
                  </button>
                </div>

                {showAdmitCardCsvModal && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Bulk Upload Admit Cards via CSV</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                      Please select a CSV file. The file should have columns matching: <br />
                      <code>rollNumber, studentName, class, academicYear, dateOfBirth, fatherName, motherName, examCenter, datesheet</code> <br />
                      * Note: <code>datesheet</code> should be a semicolon separated list like: <code>English: 2026-03-02 09:00 AM; Math: 2026-03-04 09:00 AM</code>
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleAdmitCardCsvUpload} 
                        style={{ 
                          padding: '10px', 
                          border: '1px dashed var(--color-border)', 
                          borderRadius: '4px', 
                          backgroundColor: 'var(--color-bg)', 
                          color: 'white',
                          cursor: 'pointer' 
                        }} 
                      />
                      <button 
                        type="button" 
                        className="form-input" 
                        style={{ width: 'auto', cursor: 'pointer', padding: '8px 16px' }} 
                        onClick={() => { setShowAdmitCardCsvModal(false); setAdmitCardCsvProgress(null); }}
                      >
                        Close Window
                      </button>
                    </div>

                    {admitCardCsvProgress && (
                      <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                          <span>Processing Row: {admitCardCsvProgress.current} of {admitCardCsvProgress.total}</span>
                          <span>Success: {admitCardCsvProgress.successCount} | Failed: {admitCardCsvProgress.errorCount}</span>
                        </div>
                        <div style={{ width: '100%', backgroundColor: 'var(--color-border)', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                          <div 
                            style={{ 
                              width: `${(admitCardCsvProgress.current / admitCardCsvProgress.total) * 100}%`, 
                              backgroundColor: 'var(--color-success)', 
                              height: '100%',
                              transition: 'width 0.2s ease-in-out' 
                            }} 
                          />
                        </div>
                        <div style={{ maxHeight: '150px', overflowY: 'auto', backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px', fontSize: '0.8rem' }}>
                          {admitCardCsvProgress.details.map((detail, index) => (
                            <div key={index} style={{ color: detail.status === 'success' ? 'var(--color-success)' : 'var(--color-danger)', marginBottom: '4px' }}>
                              â€¢ {detail.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Academic Year</th>
                      <th>Date of Birth</th>
                      <th>Exam Center</th>
                      <th>Datesheet</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admitCards.map((card) => (
                      <tr key={card._id}>
                        <td style={{ fontWeight: 'bold' }}>{card.rollNumber}</td>
                        <td>{card.studentName}</td>
                        <td>{card.class}</td>
                        <td>{card.academicYear}</td>
                        <td>{card.dateOfBirth}</td>
                        <td style={{ fontSize: '0.8rem', maxWidth: '200px' }}>{card.examCenter}</td>
                        <td>{card.datesheet?.length || 0} exams scheduled</td>
                        <td>
                          <button 
                            onClick={() => handleDeleteAdmitCard(card._id)}
                            style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                            title="Delete admit card"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SYLLABUS TAB */}
            {activeTab === 'syllabus' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Academic Syllabus & Resources</h3>
                  <button 
                    className="table-action-btn" 
                    onClick={() => { setShowSyllabusForm(!showSyllabusForm); setSyllabusFile(null); }} 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--color-primary)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    <PlusCircle size={18} />
                    <span>Upload Syllabus PDF</span>
                  </button>
                </div>

                {showSyllabusForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Upload New Syllabus Document</h4>
                    <form onSubmit={handleSyllabusSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Syllabus Title</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Grade X Annual Syllabus" 
                          value={syllabusFormData.title} 
                          onChange={(e) => setSyllabusFormData({...syllabusFormData, title: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Class / Grade</label>
                        <select 
                          className="form-input" 
                          style={{ backgroundColor: 'var(--color-bg)', color: 'white' }}
                          value={syllabusFormData.class} 
                          onChange={(e) => setSyllabusFormData({...syllabusFormData, class: e.target.value})} 
                          required 
                        >
                          <option value="">Select Class</option>
                          <option value="11">Class 11</option>
                          <option value="12">Class 12</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Mathematics" 
                          value={syllabusFormData.subject} 
                          onChange={(e) => setSyllabusFormData({...syllabusFormData, subject: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Academic Year</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. 2026-2027" 
                          value={syllabusFormData.academicYear} 
                          onChange={(e) => setSyllabusFormData({...syllabusFormData, academicYear: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="form-label">Syllabus PDF Document</label>
                        <input 
                          type="file" 
                          accept=".pdf" 
                          className="form-input" 
                          style={{ padding: '8px', backgroundColor: 'var(--color-bg)', color: 'white' }}
                          onChange={(e) => setSyllabusFile(e.target.files[0])} 
                          required 
                        />
                      </div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowSyllabusForm(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>Upload Document</button>
                      </div>
                    </form>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Academic Year</th>
                      <th>Document</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syllabusList.map((syllabus) => {
                      const backendUrl = api.defaults.baseURL ? api.defaults.baseURL.replace(/\/api$/, '') : 'http://localhost:5000';
                      return (
                        <tr key={syllabus._id}>
                          <td style={{ fontWeight: 'bold' }}>{syllabus.title}</td>
                          <td>Grade {syllabus.class}</td>
                          <td>{syllabus.subject}</td>
                          <td>{syllabus.academicYear}</td>
                          <td>
                            <a 
                              href={`${backendUrl}${syllabus.pdfUrl}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: 'var(--color-accent)', textDecoration: 'underline', fontSize: '0.9rem' }}
                            >
                              View/Download PDF
                            </a>
                          </td>
                          <td>
                            <button 
                              onClick={() => handleDeleteSyllabus(syllabus._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                              title="Delete syllabus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* NOTICES TAB */}
            {activeTab === 'notices' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Circular Announcements Board</h3>
                  <button className="table-action-btn" onClick={() => { setEditingNotice(null); setNoticeFormData({ title: '', content: '', type: 'Announcement', targetAudience: 'all' }); setShowNoticeForm(!showNoticeForm); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} />
                    <span>Create Notice</span>
                  </button>
                </div>

                {showNoticeForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Compose Notice Details</h4>
                    <form onSubmit={handleNoticeSubmit}>
                      <div className="form-group">
                        <label className="form-label">Notice Title</label>
                        <input type="text" className="form-input" value={noticeFormData.title} onChange={(e) => setNoticeFormData({...noticeFormData, title: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Notice Type</label>
                        <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: '#white' }} value={noticeFormData.type} onChange={(e) => setNoticeFormData({...noticeFormData, type: e.target.value})}>
                          <option value="Announcement">Announcement</option>
                          <option value="Notice">Notice / Circular</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Target Audience</label>
                        <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: '#white' }} value={noticeFormData.targetAudience} onChange={(e) => setNoticeFormData({...noticeFormData, targetAudience: e.target.value})}>
                          <option value="all">Public (All)</option>
                          <option value="teachers">Faculty Only</option>
                          <option value="students">Students Only</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Notice Content Body</label>
                        <textarea className="form-input" rows="4" style={{ resize: 'none' }} value={noticeFormData.content} onChange={(e) => setNoticeFormData({...noticeFormData, content: e.target.value})} required></textarea>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowNoticeForm(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>Publish Bulletin</button>
                      </div>
                    </form>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Notice Type</th>
                      <th>Audience Scope</th>
                      <th>Author</th>
                      <th>Date Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((notice) => (
                      <tr key={notice._id}>
                        <td style={{ fontWeight: '600' }}>{notice.title}</td>
                        <td>{notice.type}</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                            {notice.targetAudience.toUpperCase()}
                          </span>
                        </td>
                        <td>{notice.author?.name || 'Principle'}</td>
                        <td>{new Date(notice.date || notice.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                setEditingNotice(notice);
                                setNoticeFormData({
                                  title: notice.title,
                                  content: notice.content,
                                  type: notice.type,
                                  targetAudience: notice.targetAudience
                                });
                                setShowNoticeForm(true);
                              }}
                              style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteNotice(notice._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Received Inquiries & Contact Forms</h3>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Type / Grade</th>
                      <th>Sender Details</th>
                      <th>Student Name</th>
                      <th>Academic Year</th>
                      <th>Message / Details</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => {
                      const isGeneral = inq.academicYear === 'N/A' || !inq.academicYear;
                      return (
                        <tr key={inq._id}>
                          <td>
                            <span style={{ 
                              fontSize: '0.8rem', 
                              fontWeight: 'bold', 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              backgroundColor: isGeneral ? 'rgba(6,182,212,0.1)' : 'rgba(16,185,129,0.1)',
                              color: isGeneral ? 'var(--color-accent)' : 'var(--color-success)'
                            }}>
                              {isGeneral ? 'Contact Us' : `Grade ${inq.classGrade}`}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight: '600' }}>{inq.parentName}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inq.parentEmail}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inq.parentPhone}</div>
                          </td>
                          <td>{isGeneral ? 'N/A' : inq.studentName}</td>
                          <td>{isGeneral ? 'N/A' : inq.academicYear}</td>
                          <td style={{ maxWidth: '300px', whiteSpace: 'normal', fontSize: '0.85rem' }}>
                            {inq.message}
                          </td>
                          <td>
                            <select 
                              value={inq.status} 
                              onChange={(e) => handleInquiryStatusChange(inq._id, e.target.value)}
                              className="form-input"
                              style={{ 
                                margin: 0, 
                                padding: '4px 8px', 
                                width: 'auto', 
                                fontSize: '0.8rem', 
                                backgroundColor: 'var(--color-bg)', 
                                color: 'white',
                                borderColor: inq.status === 'Pending' ? 'var(--color-warning)' : inq.status === 'Reviewed' ? 'var(--color-accent)' : 'var(--color-success)'
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Contacted">Contacted</option>
                            </select>
                          </td>
                          <td>
                            <button 
                              onClick={() => handleDeleteInquiry(inq._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                              title="Delete inquiry"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* CALENDAR TAB */}
            {activeTab === 'calendar' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Academic Calendar Events</h3>
                  <button 
                    className="table-action-btn" 
                    onClick={() => { 
                      setEditingCalendarEvent(null); 
                      setCalendarFormData({ title: '', date: '', type: 'Holiday', description: '', academicYear: '2026-2027' }); 
                      setShowCalendarForm(!showCalendarForm); 
                    }} 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <PlusCircle size={18} />
                    <span>Create Event</span>
                  </button>
                </div>

                {showCalendarForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                      {editingCalendarEvent ? 'Edit Calendar Event' : 'Create Calendar Event'}
                    </h4>
                    <form onSubmit={handleCalendarEventSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                      <div className="form-group">
                        <label className="form-label">Event Title</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={calendarFormData.title} 
                          onChange={(e) => setCalendarFormData({...calendarFormData, title: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Date</label>
                        <input 
                          type="date" 
                          className="form-input" 
                          style={{ backgroundColor: 'var(--color-bg)', color: 'white' }}
                          value={calendarFormData.date ? calendarFormData.date.slice(0, 10) : ''} 
                          onChange={(e) => setCalendarFormData({...calendarFormData, date: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Type</label>
                        <select 
                          className="form-input" 
                          style={{ backgroundColor: 'var(--color-bg)', color: 'white' }}
                          value={calendarFormData.type} 
                          onChange={(e) => setCalendarFormData({...calendarFormData, type: e.target.value})}
                        >
                          <option value="Holiday">Holiday</option>
                          <option value="Exam">Exam</option>
                          <option value="Event">Event</option>
                          <option value="Meeting">Meeting</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Academic Year</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={calendarFormData.academicYear} 
                          onChange={(e) => setCalendarFormData({...calendarFormData, academicYear: e.target.value})} 
                          required 
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="form-label">Description</label>
                        <textarea 
                          className="form-input" 
                          rows="3" 
                          style={{ resize: 'none' }}
                          value={calendarFormData.description} 
                          onChange={(e) => setCalendarFormData({...calendarFormData, description: e.target.value})} 
                        />
                      </div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyItems: 'flex-end', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowCalendarForm(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>
                          {editingCalendarEvent ? 'Update Event' : 'Save Event'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Academic Year</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calendarEvents.map((evt) => (
                      <tr key={evt._id}>
                        <td style={{ fontWeight: '600' }}>{evt.title}</td>
                        <td>{new Date(evt.date).toLocaleDateString()}</td>
                        <td>
                          <span style={{ 
                            fontSize: '0.8rem', 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            backgroundColor: 
                              evt.type === 'Holiday' ? 'rgba(239,68,68,0.1)' : 
                              evt.type === 'Exam' ? 'rgba(245,158,11,0.1)' : 
                              evt.type === 'Event' ? 'rgba(16,185,129,0.1)' : 
                              'rgba(59,130,246,0.1)',
                            color: 
                              evt.type === 'Holiday' ? 'var(--color-danger)' : 
                              evt.type === 'Exam' ? 'var(--color-warning)' : 
                              evt.type === 'Event' ? 'var(--color-success)' : 
                              'var(--color-primary)'
                          }}>
                            {evt.type}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{evt.description}</td>
                        <td>{evt.academicYear}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                setEditingCalendarEvent(evt);
                                setCalendarFormData({
                                  title: evt.title,
                                  date: evt.date,
                                  type: evt.type,
                                  description: evt.description || '',
                                  academicYear: evt.academicYear
                                });
                                setShowCalendarForm(true);
                              }}
                              style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteCalendarEvent(evt._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* AUDIT LOGS */}
            {activeTab === 'logs' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>System Audit logs trails</h3>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Action Code</th>
                      <th>Performed By</th>
                      <th>User Role</th>
                      <th>IP Address</th>
                      <th>Operation Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log._id}>
                        <td style={{ color: 'var(--text-secondary)' }}>{new Date(log.timestamp).toLocaleString()}</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ fontWeight: '500' }}>{log.performedBy?.name}</td>
                        <td style={{ textTransform: 'capitalize' }}>{log.performedBy?.role}</td>
                        <td>{log.ipAddress || '127.0.0.1'}</td>
                        <td style={{ fontSize: '0.85rem' }}>{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

