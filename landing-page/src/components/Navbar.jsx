import React from 'react';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="header-nav">
      <div className="logo-container">
        <div className="logo-icon">
          <GraduationCap size={24} />
        </div>
        <span className="logo-text">EduSphere</span>
      </div>

      <nav className="nav-links">
        <a href="#features" className="nav-link">Platform Capabilities</a>
        <a href="http://localhost:5174" className="nav-link" style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px' }}>Admin Login</a>
        <a href="http://localhost:5175" className="nav-link" style={{ border: '1px solid rgba(20,184,166,0.3)', padding: '6px 14px', borderRadius: '20px', color: '#14b8a6' }}>Teacher Login</a>
      </nav>
    </header>
  );
};

export default Navbar;
