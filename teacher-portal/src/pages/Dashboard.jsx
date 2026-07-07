import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  BookOpen, 
  Users, 
  Award, 
  LogOut, 
  CheckCircle,
  FileSpreadsheet,
  PlusCircle,
  Trash2,
  Edit2,
  Megaphone,
  Eye,
  EyeOff,
  Printer
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('classes');
  
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ totalStudentsTaught: 0, uploadedResultsCount: 0, pendingResultsCount: 0, academicYear: '2026-2027' });
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [notices, setNotices] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Results Form state
  const [showResultForm, setShowResultForm] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [resultFormData, setResultFormData] = useState({
    rollNumber: '',
    academicYear: '2026-2027',
    term: 'Half-Yearly',
    status: 'Unpublished'
  });
  const [subjectMarksInput, setSubjectMarksInput] = useState([]); // [{ subject, marksObtained, maxMarks }]

  // Print view state
  const [printingResult, setPrintingResult] = useState(null);

  // Notices Form state
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: '', content: '', type: 'Announcement', targetAudience: 'all'
  });

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/teacher/dashboard');
      if (response.data.success) {
        setProfile(response.data.teacher);
        setAssignedClasses(response.data.classes || []);
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchClassesAndStudents = async () => {
    try {
      const [clsRes, studRes] = await Promise.all([
        api.get('/teacher/classes'),
        api.get('/teacher/students')
      ]);
      if (clsRes.data.success) setClassDetails(clsRes.data.data);
      if (studRes.data.success) setStudents(studRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await api.get('/teacher/results');
      if (res.data.success) setResults(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await api.get('/teacher/announcements');
      if (res.data.success) setNotices(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchDashboardData(),
      fetchClassesAndStudents(),
      fetchResults(),
      fetchNotices()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // When class changes, pre-fill subjects fields
  useEffect(() => {
    if (selectedClass) {
      const foundClass = classDetails.find(c => `${c.name}-${c.section}` === selectedClass);
      if (foundClass) {
        const initialMarks = foundClass.subjects.map(sub => ({
          subject: sub,
          marksObtained: 0,
          maxMarks: 100
        }));
        setSubjectMarksInput(initialMarks);
      }
    } else {
      setSubjectMarksInput([]);
    }
    setSelectedStudent(null);
  }, [selectedClass, classDetails]);

  // When editing result changes, pre-fill fields
  useEffect(() => {
    if (editingResult) {
      setSelectedClass(editingResult.class);
      setSubjectMarksInput(editingResult.subjectMarks);
      const studentObj = students.find(s => s.rollNumber === editingResult.rollNumber);
      setSelectedStudent(studentObj || { name: editingResult.studentName, rollNumber: editingResult.rollNumber });
      setResultFormData({
        rollNumber: editingResult.rollNumber,
        academicYear: editingResult.academicYear,
        term: editingResult.term,
        status: editingResult.status
      });
    }
  }, [editingResult, students]);

  // ==========================================
  // MARKSHEETS / GRADES HANDLERS
  // ==========================================
  const handleResultSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent || subjectMarksInput.length === 0) {
      triggerNotification('error', 'Please select a student and fill in marks.');
      return;
    }

    try {
      const payload = {
        studentName: selectedStudent.name,
        rollNumber: selectedStudent.rollNumber,
        class: selectedClass,
        academicYear: resultFormData.academicYear,
        term: resultFormData.term,
        subjectMarks: subjectMarksInput,
        status: resultFormData.status
      };

      let res;
      if (editingResult) {
        res = await api.put(`/teacher/results/${editingResult._id}`, payload);
      } else {
        res = await api.post('/teacher/results', payload);
      }

      if (res.data.success) {
        triggerNotification('success', editingResult ? 'Result updated successfully!' : 'Marksheet recorded successfully!');
        setShowResultForm(false);
        setEditingResult(null);
        setSelectedClass('');
        setSelectedStudent(null);
        setResultFormData({ rollNumber: '', academicYear: '2026-2027', term: 'Half-Yearly', status: 'Unpublished' });
        setSubjectMarksInput([]);
        fetchResults();
        fetchDashboardData();
      }
    } catch (err) {
      triggerNotification('error', err.response?.data?.message || 'Failed to submit marksheet entry');
    }
  };

  const handleToggleResultPublishStatus = async (resultCard) => {
    try {
      const newStatus = resultCard.status === 'Published' ? 'Unpublished' : 'Published';
      const res = await api.put(`/teacher/results/${resultCard._id}`, { status: newStatus });
      if (res.data.success) {
        triggerNotification('success', `Result updated to ${newStatus}`);
        fetchResults();
        fetchDashboardData();
      }
    } catch (err) {
      triggerNotification('error', err.response?.data?.message || 'Failed to toggle publication status');
    }
  };

  const handleDeleteResult = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result entry?')) return;
    try {
      const res = await api.delete(`/teacher/results/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Result entry deleted.');
        fetchResults();
        fetchDashboardData();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete result');
    }
  };

  // ==========================================
  // NOTICE BOARD HANDLERS
  // ==========================================
  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingNotice) {
        res = await api.put(`/teacher/announcements/${editingNotice._id}`, noticeFormData);
      } else {
        res = await api.post('/teacher/announcements', noticeFormData);
      }

      if (res.data.success) {
        triggerNotification('success', 'Notice published!');
        setShowNoticeForm(false);
        setEditingNotice(null);
        setNoticeFormData({ title: '', content: '', type: 'Announcement', targetAudience: 'all' });
        fetchNotices();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to save notice');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this announcement?')) return;
    try {
      const res = await api.delete(`/teacher/announcements/${id}`);
      if (res.data.success) {
        triggerNotification('success', 'Notice deleted');
        fetchNotices();
      }
    } catch (err) {
      triggerNotification('error', 'Failed to delete notice');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="logo-container">
          <div style={{ padding: '8px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', display: 'flex' }}>
            <BookOpen size={24} />
          </div>
          <span className="logo-text">EduSphere</span>
        </div>

        <div className="nav-links">
          <div className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            <Users size={20} />
            <span>My Classes</span>
          </div>
          <div className={`nav-item ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
            <FileSpreadsheet size={20} />
            <span>Gradebook</span>
          </div>
          <div className={`nav-item ${activeTab === 'notices' ? 'active' : ''}`} onClick={() => setActiveTab('notices')}>
            <Megaphone size={20} />
            <span>Notices Desk</span>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={20} />
          <span>Exit System</span>
        </button>
      </div>

      {/* Main Panel */}
      <div className="main-content">
        <div className="navbar">
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
              {activeTab === 'classes' && 'Class Roster'}
              {activeTab === 'results' && 'Manage Academic Results'}
              {activeTab === 'notices' && 'My Bulletins'}
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.name || 'Educator'}</p>
          </div>
          <div className="user-profile-badge">
            <div className="avatar">T</div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name || 'Teacher'}</span>
          </div>
        </div>

        {notification && (
          <div className={`alert-banner ${notification.type}`} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <CheckCircle size={20} />
            <span>{notification.message}</span>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '6rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading gradebook modules...
          </div>
        ) : (
          <>
            {/* CLASSES TAB */}
            {activeTab === 'classes' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Profile Detail */}
                <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: '2rem', height: 'fit-content' }}>
                  <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award style={{ color: 'var(--color-primary)' }} />
                    Profile Details
                  </h3>
                  <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p><strong>Educator:</strong> {user?.name}</p>
                    <p><strong>Credentials:</strong> {profile?.qualification}</p>
                    <p><strong>Experience:</strong> {profile?.experienceYears} Years</p>
                    <div>
                      <strong>Assigned Subjects:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.5rem' }}>
                        {profile?.subjects?.map((sub, i) => (
                          <span key={i} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(20,184,166,0.1)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600' }}>{sub}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Classes & Students Lists */}
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>My Assigned Class List ({stats.academicYear})</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {classDetails.map((cls) => {
                      const studsInClass = students.filter(s => s.class === `${cls.name}-${cls.section}`);
                      return (
                        <div key={cls._id} style={{ padding: '1.5rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                          <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Grade {cls.name}-{cls.section}</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Subjects: {cls.subjects.join(', ')}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Students Count: {studsInClass.length}</p>
                        </div>
                      );
                    })}
                  </div>

                  <h3 style={{ marginBottom: '1rem' }}>Roster of Students Taught</h3>
                  <div className="table-container" style={{ margin: 0 }}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Roll Number</th>
                          <th>Student Name</th>
                          <th>Class</th>
                          <th>Academic Session</th>
                          <th>Parent Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student._id}>
                            <td style={{ fontWeight: 'bold' }}>{student.rollNumber}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.academicYear}</td>
                            <td>{student.parentEmail || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* RESULTS TAB */}
            {activeTab === 'results' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>Student Result Cards</h3>
                  <button className="table-action-btn" onClick={() => { setEditingResult(null); setSelectedClass(''); setSelectedStudent(null); setResultFormData({ rollNumber: '', academicYear: '2026-2027', term: 'Half-Yearly', status: 'Unpublished' }); setSubjectMarksInput([]); setShowResultForm(!showResultForm); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} />
                    <span>Post Student Marks</span>
                  </button>
                </div>

                {/* Score upload form */}
                {showResultForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{editingResult ? 'Edit Marks Card' : 'Record Student Marks'}</h4>
                    <form onSubmit={handleResultSubmit}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        <div className="form-group">
                          <label className="form-label">Select Class</label>
                          <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: 'white' }} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} required disabled={!!editingResult}>
                            <option value="">-- Choose Class --</option>
                            {assignedClasses.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>

                        {selectedClass && (
                          <div className="form-group">
                            <label className="form-label">Select Student</label>
                            <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: 'white' }} value={selectedStudent ? selectedStudent.rollNumber : ''} onChange={(e) => { const s = students.find(stud => stud.rollNumber === e.target.value); setSelectedStudent(s); }} required disabled={!!editingResult}>
                              <option value="">-- Choose Student --</option>
                              {students.filter(stud => stud.class === selectedClass).map(stud => (
                                <option key={stud.rollNumber} value={stud.rollNumber}>{stud.name} ({stud.rollNumber})</option>
                              ))}
                            </select>
                          </div>
                        )}

                        <div className="form-group">
                          <label className="form-label">Examination Term</label>
                          <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: 'white' }} value={resultFormData.term} onChange={(e) => setResultFormData({...resultFormData, term: e.target.value})} required>
                            <option value="Half-Yearly">Half-Yearly Exam</option>
                            <option value="Final">Final Examination</option>
                          </select>
                        </div>
                      </div>

                      {/* Subject Marks fields */}
                      {subjectMarksInput.length > 0 && (
                        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                          <h5 style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>Enter Marks obtained (out of 100)</h5>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                            {subjectMarksInput.map((input, idx) => (
                              <div key={idx} className="form-group">
                                <label className="form-label">{input.subject}</label>
                                <input
                                  type="number"
                                  className="form-input"
                                  min="0"
                                  max="100"
                                  value={input.marksObtained}
                                  onChange={(e) => {
                                    const copy = [...subjectMarksInput];
                                    copy[idx].marksObtained = parseInt(e.target.value || 0, 10);
                                    setSubjectMarksInput(copy);
                                  }}
                                  required
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={resultFormData.status === 'Published'} 
                              onChange={(e) => setResultFormData({...resultFormData, status: e.target.checked ? 'Published' : 'Unpublished'})} 
                            />
                            Publish scores immediately (Students can view it online)
                          </label>
                        </div>

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                          <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowResultForm(false)}>Cancel</button>
                          <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>Save Grades Card</button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* Printable Marksheet Preview Drawer */}
                {printingResult && (
                  <div style={{ padding: '2rem', backgroundColor: 'var(--color-surface)', border: '2px solid var(--color-primary)', borderRadius: 'var(--border-radius)', marginBottom: '2rem', color: '#333', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                      <h4 style={{ color: '#111' }}>Statement of Marks Statement ({printingResult.academicYear})</h4>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="table-action-btn" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Printer size={16} />
                          <span>Print</span>
                        </button>
                        <button onClick={() => setPrintingResult(null)} style={{ padding: '4px 12px', border: '1px solid #999', borderRadius: '4px', cursor: 'pointer' }}>Close Preview</button>
                      </div>
                    </div>
                    
                    <div style={{ padding: '20px', border: '2px solid #333' }}>
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h2 style={{ color: '#222', fontSize: '1.5rem', textTransform: 'uppercase' }}>Thakur Biri Singh Inter College</h2>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>Tundla, Firozabad, U.P., India</p>
                        <p style={{ fontSize: '0.75rem', color: '#888' }}>UPMSP Code: 1053 | Estd: 1950</p>
                        <div style={{ display: 'inline-block', backgroundColor: '#f0f0f0', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '10px', textTransform: 'uppercase' }}>
                          {printingResult.term} Examination Report Sheet
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <p><strong>Student Name:</strong> <span style={{ textTransform: 'uppercase' }}>{printingResult.studentName}</span></p>
                        <p><strong>Roll Number:</strong> {printingResult.rollNumber}</p>
                        <p><strong>Class:</strong> {printingResult.class}</p>
                        <p><strong>Academic Year:</strong> {printingResult.academicYear}</p>
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '20px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ccc' }}>
                            <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Subject Name</th>
                            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd', width: '120px' }}>Max Marks</th>
                            <th style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd', width: '150px' }}>Marks Obtained</th>
                          </tr>
                        </thead>
                        <tbody>
                          {printingResult.subjectMarks.map((sub, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textTransform: 'uppercase' }}>{sub.subject}</td>
                              <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>{sub.maxMarks || 100}</td>
                              <td style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>{sub.marksObtained}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', backgroundColor: '#f9f9f9', padding: '15px', border: '1px solid #ddd', textAlign: 'center' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#666' }}>Grand Total</span>
                          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{printingResult.totalMarks} / {printingResult.maxTotalMarks}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#666' }}>Percentage</span>
                          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{printingResult.percentage}%</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#666' }}>Grade Secured</span>
                          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{printingResult.grade}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#666' }}>Result Status</span>
                          <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: printingResult.percentage >= 33 ? 'green' : 'red' }}>
                            {printingResult.percentage >= 33 ? 'PASS' : 'FAIL'}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', fontSize: '0.8rem' }}>
                        <p style={{ fontStyle: 'italic', color: '#777', maxWidth: '350px' }}>* Minimum 33% marks required in each subject. This is an official grade report signed by the assigned faculty coordinator.</p>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ width: '150px', borderBottom: '1px solid #222', marginBottom: '5px' }}></div>
                          <strong>Class Instructor</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Roll Number</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Examination Term</th>
                      <th>Score Summary</th>
                      <th>Publish Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((resCard) => (
                      <tr key={resCard._id}>
                        <td style={{ fontWeight: 'bold' }}>{resCard.rollNumber}</td>
                        <td style={{ fontWeight: '500' }}>{resCard.studentName}</td>
                        <td>{resCard.class}</td>
                        <td>{resCard.term}</td>
                        <td>
                          <div style={{ fontWeight: '600' }}>{resCard.totalMarks} / {resCard.maxTotalMarks} ({resCard.percentage}%)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Grade: {resCard.grade}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', backgroundColor: resCard.status === 'Published' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: resCard.status === 'Published' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                            {resCard.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => {
                                if (resCard.status === 'Published') {
                                  alert('Published results are locked. Please unpublish this marksheet card to make edits.');
                                  return;
                                }
                                setEditingResult(resCard);
                                setShowResultForm(true);
                              }}
                              style={{ border: 'none', background: 'transparent', color: resCard.status === 'Published' ? 'var(--text-muted)' : 'var(--text-secondary)', cursor: resCard.status === 'Published' ? 'not-allowed' : 'pointer' }}
                              title="Edit sheet"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleToggleResultPublishStatus(resCard)}
                              style={{ border: 'none', background: 'transparent', color: resCard.status === 'Published' ? 'var(--color-warning)' : 'var(--color-success)', cursor: 'pointer' }}
                              title={resCard.status === 'Published' ? 'Unpublish result' : 'Publish result'}
                            >
                              {resCard.status === 'Published' ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button 
                              onClick={() => setPrintingResult(resCard)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-accent)', cursor: 'pointer' }}
                              title="Print Marks Sheet"
                            >
                              <Printer size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteResult(resCard._id)}
                              style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                              title="Delete result"
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

            {/* NOTICES TAB */}
            {activeTab === 'notices' && (
              <div className="table-container">
                <div className="table-header">
                  <h3>My Notices Board</h3>
                  <button className="table-action-btn" onClick={() => { setEditingNotice(null); setNoticeFormData({ title: '', content: '', type: 'Announcement', targetAudience: 'all' }); setShowNoticeForm(!showNoticeForm); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} />
                    <span>Create Notice</span>
                  </button>
                </div>

                {showNoticeForm && (
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Compose Notice</h4>
                    <form onSubmit={handleNoticeSubmit}>
                      <div className="form-group">
                        <label className="form-label">Notice Title</label>
                        <input type="text" className="form-input" value={noticeFormData.title} onChange={(e) => setNoticeFormData({...noticeFormData, title: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Bulletin Type</label>
                        <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: '#white' }} value={noticeFormData.type} onChange={(e) => setNoticeFormData({...noticeFormData, type: e.target.value})}>
                          <option value="Announcement">Announcement</option>
                          <option value="Notice">Notice / Circular</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Target Audience Scope</label>
                        <select className="form-input" style={{ backgroundColor: 'var(--color-bg)', color: '#white' }} value={noticeFormData.targetAudience} onChange={(e) => setNoticeFormData({...noticeFormData, targetAudience: e.target.value})}>
                          <option value="all">Public (All)</option>
                          <option value="teachers">Teachers Only</option>
                          <option value="students">Students Only</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Content Body</label>
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
                      <th>Notice Title</th>
                      <th>Notice Type</th>
                      <th>Audience Scope</th>
                      <th>Published Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((notice) => (
                      <tr key={notice._id}>
                        <td style={{ fontWeight: '600' }}>{notice.title}</td>
                        <td>{notice.type}</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                            {notice.targetAudience.toUpperCase()}
                          </span>
                        </td>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
