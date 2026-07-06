import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
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
  BookOpen
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalTeachers: 0, totalAdmins: 0, academicYear: '2026-2027' });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Form State for new teacher
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subjects: '',
    qualification: '',
    experienceYears: 0,
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, teachersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/teachers')
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      if (teachersRes.data.success) {
        setTeachers(teachersRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard content:', error);
      // Fallback mocks if database is not active yet
      setStats({ totalTeachers: 3, totalAdmins: 1, academicYear: '2026-2027 (Mock)' });
      setTeachers([
        {
          _id: '1',
          user: { name: 'Sarah Jenkins', email: 'sarah.j@school.com', isActive: true },
          subjects: ['Mathematics', 'Physics'],
          qualification: 'M.Sc. in Physics',
          experienceYears: 8
        },
        {
          _id: '2',
          user: { name: 'David Miller', email: 'david.m@school.com', isActive: true },
          subjects: ['English Literature'],
          qualification: 'B.Ed. & MA in English',
          experienceYears: 5
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        subjects: formData.subjects.split(',').map((s) => s.trim()),
        experienceYears: parseInt(formData.experienceYears, 10),
      };

      const response = await api.post('/admin/teachers', formattedData);
      if (response.data.success) {
        setNotification({ type: 'success', message: 'Teacher hired and onboarded successfully!' });
        setShowForm(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          subjects: '',
          qualification: '',
          experienceYears: 0,
        });
        fetchDashboardData();
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Failed to register teacher profile',
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
            <GraduationCap size={24} />
          </div>
          <span className="logo-text">EduSphere</span>
        </div>

        <div className="nav-links">
          <div className="nav-item active">
            <Users size={20} />
            <span>Dashboard</span>
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
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Control Panel</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Administrative Owner</p>
          </div>
          <div className="user-profile-badge">
            <div className="avatar">A</div>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name || 'Administrator'}</span>
          </div>
        </div>

        {notification && (
          <div className={`alert-banner ${notification.type}`}>
            <CheckCircle size={20} />
            <span>{notification.message}</span>
          </div>
        )}

        {/* Statistical Summary Cards */}
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div>
              <div className="stat-value">{stats.totalTeachers}</div>
              <div className="stat-title">Active Teachers</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--color-secondary)', background: 'rgba(139, 92, 246, 0.1)' }}>
              <UserCheck size={24} />
            </div>
            <div>
              <div className="stat-value">{stats.totalAdmins}</div>
              <div className="stat-title">Staff Administrators</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ color: 'var(--color-accent)', background: 'rgba(6, 182, 212, 0.1)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <div className="stat-value">{stats.academicYear}</div>
              <div className="stat-title">Academic Session</div>
            </div>
          </div>
        </div>

        {/* Teachers Registration Panel & Table */}
        <div className="table-container">
          <div className="table-header">
            <h3>Registered Faculty Members</h3>
            <button className="table-action-btn" onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlusCircle size={18} />
              <span>Hire New Teacher</span>
            </button>
          </div>

          {showForm && (
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
              <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>New Teacher Profile</h4>
              <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. john@school.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password Credentials</label>
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Qualifications</label>
                  <input
                    type="text"
                    name="qualification"
                    className="form-input"
                    placeholder="e.g. M.Ed, B.Sc"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subjects (comma separated)</label>
                  <input
                    type="text"
                    name="subjects"
                    className="form-input"
                    placeholder="e.g. Math, Chemistry"
                    value={formData.subjects}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Experience (Years)</label>
                  <input
                    type="number"
                    name="experienceYears"
                    className="form-input"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" className="form-input" style={{ width: 'auto', cursor: 'pointer' }} onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2rem' }}>Save & Register</button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Loading faculty directory...
            </div>
          ) : teachers.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No teachers are registered yet.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Faculty Name</th>
                  <th>Contact Email</th>
                  <th>Credentials</th>
                  <th>Core Subjects</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', border: '1px solid var(--color-border)' }}>
                          {teacher.user?.name[0]}
                        </div>
                        {teacher.user?.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <Mail size={14} />
                        {teacher.user?.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <Award size={14} style={{ color: 'var(--color-accent)' }} />
                        {teacher.qualification}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {teacher.subjects.map((sub, i) => (
                          <span key={i} style={{ padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '500' }}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <BookOpen size={14} />
                        {teacher.experienceYears} Years
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
