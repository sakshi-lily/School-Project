import React from 'react';
import { Facebook, Twitter, Youtube, Award, Milestone, GraduationCap, ArrowUp } from 'lucide-react';
import SchoolLogo from './SchoolLogo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 relative border-t border-slate-800">

      {/* Scroll to Top Trigger */}
      <button
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary hover:bg-secondary-light text-primary p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 z-20"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="stroke-[3]" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Column 1: School Brand info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <SchoolLogo className="w-12 h-12" textColor="text-white" />
            <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed">
              Thakur Biri Singh Inter College is a premium government-aided educational institution in Tundla, Firozabad, dedicated to offering quality education under UPMSP standards since 1950.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] bg-white/10 text-slate-300 font-bold px-2.5 py-1 rounded-full">
                UPMSP Code: 1012
              </span>
              <span className="text-[10px] bg-white/10 text-slate-300 font-bold px-2.5 py-1 rounded-full">
                Estd. 1950
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-secondary pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><a href="#home" className="hover:text-secondary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#why-choose-us" className="hover:text-secondary transition-colors">Why Choose Us</a></li>
              <li><a href="#gallery" className="hover:text-secondary transition-colors">Photo Gallery</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Student Corner */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-secondary pl-2">
              Student Corner
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><a href="#admission-banner" className="hover:text-secondary transition-colors">Admissions 226-27</a></li>
              <li><a href="#quick-services" className="hover:text-secondary transition-colors">Board Result</a></li>
              <li><a href="#quick-services" className="hover:text-secondary transition-colors">Admit Cards</a></li>
              <li><a href="#quick-services" className="hover:text-secondary transition-colors">Downloads</a></li>
              <li><a href="#quick-services" className="hover:text-secondary transition-colors">Syllabus</a></li>
            </ul>
          </div>

          {/* Column 4: Important Portals */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-secondary pl-2">
              Important Links
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li><a href="https://upmsp.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">UPMSP Official</a></li>
              <li><a href="https://up.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">UP Government</a></li>
              <li><a href="https://scholarship.up.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">UP Scholarship</a></li>
              <li><a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">National Scholarship</a></li>
            </ul>
          </div>

          {/* Column 5: Social Media */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-secondary pl-2">
              Connect With Us
            </h4>
            <p className="text-[11px] md:text-xs text-slate-400 mb-4">
              Follow our official social profiles to stay updated with campus events.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/p/Th-Biri-Singh-Inter-College-Tundla-100057747966033/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent"
                aria-label="Facebook Page"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent"
                aria-label="Twitter Feed"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-transparent"
                aria-label="Youtube Channel"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 py-6 px-4 md:px-8 text-center text-[10px] md:text-xs text-slate-500 leading-relaxed">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p>
            © {new Date().getFullYear()} Thakur Biri Singh Inter College, Tundla (Firozabad). All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Affiliated to Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)</span>
            <span>•</span>
            <a href="http://localhost:5174" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Admin Area</a>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
