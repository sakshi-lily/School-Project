import React from 'react';
import { GraduationCap, FileText, Calendar, ShieldCheck, ArrowUpRight } from 'lucide-react';

const AdmissionBanner = ({ onOpenAdmission }) => {
  return (
    <section id="admission-banner" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Banner Card Container */}
        <div className="relative bg-gradient-to-r from-primary-dark via-primary to-slate-900 text-white rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden border border-primary-light/10">
          {/* Subtle geometric circles in background */}
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/5 border border-white/5 pointer-events-none select-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-secondary/5 border border-secondary/5 pointer-events-none select-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Column 1: Info */}
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Active Badge */}
              <span className="inline-flex items-center gap-1.5 bg-secondary text-primary font-heading font-extrabold text-xs md:text-sm tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 shadow-md">
                <Calendar size={14} />
                <span>Admissions Open 2026–27</span>
              </span>

              <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
                Shape Your Future with <span className="text-secondary">Quality Education</span>
              </h2>

              <p className="text-slate-200 text-sm md:text-lg mt-4 leading-relaxed max-w-2xl">
                Registrations are now open for High School (Class IX & X) and Intermediate (Class XI & XII) in Science, Commerce, and Arts streams. Secure your seat at Thakur Biri Singh Inter College.
              </p>

              {/* Little bullet points of trust */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mt-6">
                <span className="flex items-center gap-1.5 text-xs md:text-sm text-slate-300 font-semibold">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span>UPMSP Affiliated</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm text-slate-300 font-semibold">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span>Experienced Lecturers</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm text-slate-300 font-semibold">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span>Modern Labs & Library</span>
                </span>
              </div>
            </div>

            {/* Column 2: CTA Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 w-full">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenAdmission();
                }}
                className="w-full bg-secondary hover:bg-secondary-light text-primary font-heading font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <GraduationCap size={20} />
                <span>Apply Online Now</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-heading font-bold px-8 py-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40 shadow-xl flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <FileText size={20} className="text-secondary" />
                <span>Download Prospectus</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AdmissionBanner;
