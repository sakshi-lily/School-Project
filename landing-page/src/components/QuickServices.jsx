import React from 'react';
import { UserPlus, Award, FileSpreadsheet, CalendarDays, BookOpen, Contact, FileText, ShieldCheck } from 'lucide-react';

const QuickServices = ({ onOpenResults, onOpenCalendar, onOpenAdmitCard, onOpenSyllabus, onOpenDocs }) => {
  const services = [
    {
      icon: <Award size={28} />,
      title: "Student Result",
      desc: "Check intermediate & high school board and term-wise results online.",
      link: "#",
      color: "bg-yellow-50 text-secondary-dark hover:bg-secondary hover:text-primary"
    },
    {
      icon: <FileSpreadsheet size={28} />,
      title: "Admit Card",
      desc: "Download class examinations, board exam registration and admit cards.",
      link: "#",
      color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "School Documents",
      desc: "Download official UPMSP circulars, leave rules, and govt directives.",
      link: "#school-docs",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white"
    },
    {
      icon: <FileSpreadsheet size={28} />,
      title: "Notice Board",
      desc: "View latest school announcements, board updates, and holiday circulars.",
      link: "#notices",
      color: "bg-blue-50 text-primary hover:bg-primary hover:text-white"
    },
    {
      icon: <CalendarDays size={28} />,
      title: "Academic Calendar",
      desc: "View official school calendar including exams, holidays, and school events.",
      link: "#",
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white"
    },
    {
      icon: <BookOpen size={28} />,
      title: "Syllabus",
      desc: "UPMSP prescribed textbook list and subject-wise intermediate syllabus.",
      link: "#",
      color: "bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white"
    }
  ];

  return (
    <section id="quick-services" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            Quick Services
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            Results, Notice Board & Official School Docs
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            Check academic marksheets, download UPMSP leave rules & circulars, or view the complete school calendar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <a
              key={idx}
              href={svc.link}
              onClick={(e) => {
                if (svc.title === "Student Result") {
                  e.preventDefault();
                  if (onOpenResults) onOpenResults();
                } else if (svc.title === "Academic Calendar") {
                  e.preventDefault();
                  if (onOpenCalendar) onOpenCalendar();
                } else if (svc.title === "Admit Card") {
                  e.preventDefault();
                  if (onOpenAdmitCard) onOpenAdmitCard();
                } else if (svc.title === "Syllabus") {
                  e.preventDefault();
                  if (onOpenSyllabus) onOpenSyllabus();
                } else if (svc.title === "School Documents") {
                  e.preventDefault();
                  if (onOpenDocs) onOpenDocs();
                }
              }}
              className="group flex flex-col items-center text-center p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:bg-white hover:border-white hover:shadow-premium-hover transform hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-xl mb-4 transition-all duration-300 ${svc.color} shadow-sm group-hover:scale-110`}>
                {svc.icon}
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-sm md:text-base text-slate-800 group-hover:text-primary transition-colors mb-2">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] md:text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {svc.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickServices;

