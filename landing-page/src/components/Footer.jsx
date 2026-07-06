import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '1rem' }}>
        <GraduationCap size={20} />
        <span style={{ fontWeight: '700' }}>EduSphere</span>
      </div>
      <p className="footer-text">
        © {new Date().getFullYear()} EduSphere Platform. Designed with MERN stack for next-generation educational administration.
      </p>
    </footer>
  );
};

export default Footer;
