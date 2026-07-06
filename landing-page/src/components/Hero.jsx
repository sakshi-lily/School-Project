import React from 'react';
import { Shield, BookOpen, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="badge">MERN Stack Integrated Platform</div>
      <h1 className="hero-title">
        The Unified Operating System for <span>Modern Schools</span>
      </h1>
      <p className="hero-description">
        EduSphere connects administrative officers, teachers, parents, and students into one real-time cloud dashboard environment. Streamline classes, grading, schedules, and analytics.
      </p>
      
      <div className="cta-group">
        <a href="http://localhost:5174" className="btn btn-primary">
          <Shield size={20} />
          <span>Enter Admin Portal</span>
          <ChevronRight size={16} />
        </a>
        <a href="http://localhost:5175" className="btn btn-secondary">
          <BookOpen size={20} />
          <span>Enter Teacher Portal</span>
          <ChevronRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
