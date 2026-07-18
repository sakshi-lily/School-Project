import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, User, LogIn, Award, Landmark, GraduationCap } from 'lucide-react';
import SchoolLogo from './SchoolLogo';

const Navbar = ({ onOpenResults, onOpenAdmission, onOpenCalendar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isPortalsOpen, setIsPortalsOpen] = useState(false);
  const portalsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (portalsRef.current && !portalsRef.current.contains(event.target)) {
        setIsPortalsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    {
      label: 'About Us',
      href: '#about',
      dropdown: [
        { label: 'History & Profile', href: '#about' },
        { label: 'Vision & Mission', href: '#about' },
        { label: 'Principal Message', href: '#principal-message' },
      ]
    },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Notice Board', href: '#notices' },
    { label: 'Academic Calendar', href: '#calendar' },
    { label: 'Contact Us', href: '#contact' }
  ];

  return (
    <header className="relative w-full z-50 transition-all duration-300">
      {/* Top Header Bar */}
      <div className="bg-primary text-white text-xs md:text-sm py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-4 text-center md:text-left">
          <span className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <MapPin size={14} className="text-secondary" />
            <span>Tundla, Firozabad, U.P., India</span>
          </span>
          <span className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Mail size={14} className="text-secondary" />
            <a href="mailto:th.bsictundla1948@gmail.com">th.bsictundla1948@gmail.com</a>
          </span>
          <span className="flex items-center gap-1.5 hover:text-secondary transition-colors">
            <Phone size={14} className="text-secondary" />
            <a href="tel:+919557244888">+91 9557244888</a>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenAdmission();
            }}
            className="bg-secondary hover:bg-secondary-light text-primary font-bold px-3.5 py-1.5 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-1 shadow-sm text-xs"
          >
            <GraduationCap size={14} />
            <span>Apply for Admission</span>
          </a>

          <div 
            ref={portalsRef}
            className="relative"
          >
            <button 
              onClick={() => setIsPortalsOpen(!isPortalsOpen)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 text-xs"
            >
              <User size={14} />
              <span>Portals</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${isPortalsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isPortalsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 text-slate-800 border border-slate-100 z-50 animate-in fade-in duration-200">
                <a
                  href={import.meta.env.VITE_PRINCIPLE_PORTAL_URL || 'http://localhost:5174'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-primary font-medium transition-colors text-xs md:text-sm"
                >
                  <Landmark size={16} className="text-primary" />
                  <span>Principal Portal</span>
                </a>
                <a
                  href={import.meta.env.VITE_TEACHER_PORTAL_URL || 'http://localhost:5175'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-primary font-medium transition-colors text-xs md:text-sm"
                >
                  <LogIn size={16} className="text-primary" />
                  <span>Teacher Portal</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Identity & Branding Section (Before scrolling) */}
      {!isScrolled && (
        <div className="bg-white py-4 px-4 md:px-8 border-b border-slate-100 flex justify-between items-center">
          <SchoolLogo className="w-12 h-12 md:w-16 md:h-16" textColor="text-primary" />
          <div className="hidden lg:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">UPMSP Code</p>
              <p className="text-sm font-bold text-primary">1012 (TBS Tundla)</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">Establishment Year</p>
              <p className="text-sm font-bold text-primary">1950</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar (Becomes Sticky on Scroll) */}
      <nav className={`w-full transition-all duration-300 z-50 ${isScrolled
          ? 'fixed top-0 left-0 right-0 glass-nav shadow-md py-3'
          : 'relative bg-primary-dark text-white py-3'
        }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo on Sticky Mode */}
          {isScrolled ? (
            <SchoolLogo className="w-10 h-10" showText={true} textColor="text-primary" />
          ) : (
            <div className="lg:hidden">
              <span className="font-heading font-extrabold text-sm md:text-base text-white tracking-tight">TBS INTER COLLEGE</span>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-between w-full">
            <div className={`flex items-center gap-1.5 ${isScrolled ? 'ml-auto' : 'mx-auto'}`}>
              {navItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(idx)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.label === 'Academic Calendar') {
                        e.preventDefault();
                        onOpenCalendar();
                      }
                    }}
                    className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 ${isScrolled
                        ? 'text-slate-700 hover:text-primary hover:bg-slate-100/70'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.dropdown && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-200" />}
                  </a>

                  {item.dropdown && activeDropdown === idx && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl py-2 text-slate-800 border border-slate-100 z-50 animate-in fade-in duration-200">
                      {item.dropdown.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={(e) => {
                            if (sub.label === 'Check Board Results' || sub.label === 'Student Portal') {
                              e.preventDefault();
                              onOpenResults();
                            }
                          }}
                          className="block px-4 py-2 text-xs md:text-sm hover:bg-slate-50 text-slate-600 hover:text-primary font-medium transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-primary hover:bg-slate-100' : 'text-white hover:bg-white/10'
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-4 z-50 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col px-4 gap-1">
              {navItems.map((item, idx) => (
                <div key={idx} className="border-b border-slate-50 last:border-b-0 py-1">
                  <div className="flex justify-between items-center">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        setIsOpen(false);
                        if (item.label === 'Academic Calendar') {
                          e.preventDefault();
                          onOpenCalendar();
                        }
                      }}
                      className="block py-2 text-sm font-bold text-slate-700 hover:text-primary"
                    >
                      {item.label}
                    </a>
                    {item.dropdown && (
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                        className="p-2 text-slate-400 hover:text-primary"
                      >
                        <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {item.dropdown && activeDropdown === idx && (
                    <div className="pl-4 bg-slate-50 rounded-lg py-1 mt-1 flex flex-col gap-1">
                      {item.dropdown.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={(e) => {
                            setIsOpen(false);
                            if (sub.label === 'Check Board Results' || sub.label === 'Student Portal') {
                              e.preventDefault();
                              onOpenResults();
                            }
                          }}
                          className="block py-2 text-xs font-semibold text-slate-600 hover:text-primary"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={import.meta.env.VITE_PRINCIPLE_PORTAL_URL || 'http://localhost:5174'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-lg text-sm text-center"
                >
                  <Landmark size={16} />
                  <span>Principal Portal</span>
                </a>
                <a
                  href={import.meta.env.VITE_TEACHER_PORTAL_URL || 'http://localhost:5175'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg text-sm text-center"
                >
                  <LogIn size={16} />
                  <span>Teacher Portal</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
