import React from 'react';
import { Database, ShieldAlert, Award, Calendar, BarChart3, Fingerprint } from 'lucide-react';

const Features = () => {
  const cards = [
    {
      icon: <Database size={24} />,
      title: 'MERN Stack API',
      description: 'Shared Express.js router layer feeding a MongoDB Atlas database cluster, ensuring lightning fast query lookups and reliable schemas.'
    },
    {
      icon: <ShieldAlert size={24} />,
      title: 'Admin Control Center',
      description: 'Enables registration approvals, staff assignments, audit monitoring, and high-level class configurations from a clean control dashboard.'
    },
    {
      icon: <Award size={24} />,
      title: 'Teacher Gradebook',
      description: 'Allows educators to enter student evaluations, write performance comments, and check upcoming lecture timelines with ease.'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Schedule Synchronization',
      description: 'Keep class timings, semester breaks, and lecture schedules synced automatically between different dashboards in real-time.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Data & Analytics',
      description: 'Visual breakdown of enrollment rates, average grade curves, teaching experience matrices, and overall student performance metrics.'
    },
    {
      icon: <Fingerprint size={24} />,
      title: 'Role-Based Authentication',
      description: 'Uses JSON Web Tokens (JWT) encrypted with password-salting (bcryptjs) to enforce strict routing constraints.'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <h2>Built for Educational Scale</h2>
        <p>A multi-portal solution addressing administration, teaching, and data analytics.</p>
      </div>

      <div className="features-grid">
        {cards.map((card, idx) => (
          <div key={idx} className="feature-card">
            <div className="feature-icon">
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
