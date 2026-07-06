import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  LogOut, 
  CheckCircle,
  FileSpreadsheet,
  CheckSquare,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ totalStudentsTaught: 0, pendingAssignmentsCount: 0, upcomingLecturesToday: 0 });
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Form State for inputting grades
  const [showGradeForm, setShowGradeForm] = useState(false);
  const [gradeData, setGradeData] = useState({
    studentName: '',
    subjectName: '',
    grade: 'A',
    comments: '',
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/teacher/dashboard');
      if (response.data.success) {
        setProfile(response.data.teacher);
        setClasses(response.data.classes || []);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching teacher data:', error);
      // Fallback mocks if database is not active
      setProfile({
        subjects: ['Science', 'Chemistry'],
        qualification: 'Master of Education (M.Ed)',
        experienceYears: 6
      });
      setClasses(['Grade 9-A (Science)', 'Grade 10-C (Chemistry)']);
      setStats({
        totalStudentsTaught: 54,
        pendingAssignmentsCount: 5,
        upcomingLecturesToday: 3
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGradeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/teacher/grades', gradeData);
      if (response.data.success) {
        setNotification({
          type: 'success',
          message: `Grade (${gradeData.grade}) posted successfully for ${gradeData.studentName}!`,
        });
        setShowGradeForm(false);
        setGradeData({
          studentName: '',
          subjectName: '',
          grade: 'A',
          comments: '',
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit grade entry',
      });
    }

    setTimeout(() => setNotification(null), 5000);
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
          <div className="nav-item active">
            <FileSpreadsheet size={20} />
            <span>Teacher Console</span>
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
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Teacher Gradebook</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user?.name || 'Educator'}</p>
          </div>
          <div className="user-profile-badge">
            <div className="avatar">T</div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name || 'Teacher'}</span>
          </div>
        </div>

        {notification && (
          <div className={`alert-banner ${notification.type}`}>
            <CheckCircle size={20} />
            <span>{notification.message}</span>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div>
              <div className="stat-value">{stats.totalStudentsTaught}</div>
              <div className="stat-title">Students Taught</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--color-secondary)', background: 'rgba(14, 165, 233, 0.1)' }}>
              <CheckSquare size={24} />
            </div>
            <div>
              <div className="stat-value">{stats.pendingAssignmentsCount}</div>
              <div className="stat-title">Unchecked Assignments</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--color-accent)', background: 'rgba(34, 197, 94, 0.1)' }}>
              <Clock size={24} />
            </div>
            <div>
              <div className="stat-value">{stats.upcomingLecturesToday}</div>
              <div className="stat-title">Lectures Today</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Class list and Qualifications Card */}
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award style={{ color: 'var(--color-primary)' }} />
              Profile Details
            </h3>
            <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>Credentials:</strong> {profile?.qualification}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Teaching Experience:</strong> {profile?.experienceYears} Years</p>
              <p>
                <strong>Subjects: </strong> 
                {profile?.subjects?.map((sub, i) => (
                  <span key={i} style={{ margin: '0 4px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(20,184,166,0.1)', color: 'var(--color-primary)', fontSize: '0.8rem' }}>
                    {sub}
                  </span>
                ))}
              </p>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Assigned Classes</h3>
            {classes.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No classes assigned yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {classes.map((cls, idx) => (
                  <div key={idx} style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                    <span>{cls}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Grade submission widget */}
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileSpreadsheet style={{ color: 'var(--color-primary)' }} />
                Assign Student Marks
              </h3>
              {!showGradeForm && (
                <button className="table-action-btn" onClick={() => setShowGradeForm(true)}>Open Form</button>
              )}
            </div>

            {showGradeForm ? (
              <form onSubmit={handleGradeSubmit}>
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    className="form-input"
                    placeholder="e.g. Alice Cooper"
                    value={gradeData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subjectName"
                    className="form-input"
                    placeholder="e.g. Organic Chemistry"
                    value={gradeData.subjectName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Grade / Score</label>
                  <select
                    name="grade"
                    className="form-input"
                    value={gradeData.grade}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'var(--color-bg)', color: '#ffffff' }}
                    required
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Comments / Remarks</label>
                  <textarea
                    name="comments"
                    className="form-input"
                    placeholder="Provide performance feedback..."
                    value={gradeData.comments}
                    onChange={handleInputChange}
                    rows="3"
                    style={{ resize: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowGradeForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>Post Grade</button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', color: 'var(--text-secondary)', border: '1px dashed var(--color-border)', borderRadius: '8px' }}>
                <MessageSquare size={36} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                <p>Click "Open Form" to submit grade entry cards.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
