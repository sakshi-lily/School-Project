import React from 'react';
import { UserPlus, Award, FileSpreadsheet, FileBadge, CalendarDays, DownloadCloud, BookOpen, Contact, LogIn, UserCheck } from 'lucide-react';

const QuickServices = () => {
  const services = [
    {
      icon: <UserPlus size={28} />,
      title: "Student Registration",
      desc: "Register online for new admissions and fill up student profiles.",
      link: "#admission-banner",
      color: "bg-blue-50 text-primary hover:bg-primary hover:text-white"
    },
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
      icon: <FileBadge size={28} />,
      title: "Certificates",
      desc: "Request transfer certificate, character certificate, or transcripts online.",
      link: "#",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white"
    },
    {
      icon: <CalendarDays size={28} />,
      title: "Academic Calendar",
      desc: "View holidays, schedule events, term papers, and annual celebrations.",
      link: "#",
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white"
    },
    {
      icon: <DownloadCloud size={28} />,
      title: "Downloads",
      desc: "Access school brochures, board updates, fees structure, and flyers.",
      link: "#",
      color: "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
    },
    {
      icon: <BookOpen size={28} />,
      title: "Syllabus",
      desc: "UPMSP prescribed textbook list and subject-wise intermediate syllabus.",
      link: "#",
      color: "bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white"
    },
    {
      icon: <Contact size={28} />,
      title: "School Directory",
      desc: "Contact information of school administration, faculty, and departments.",
      link: "#school-directory",
      color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white"
    },
    {
      icon: <LogIn size={28} />,
      title: "Student Login",
      desc: "Access student grades, attendance tracker, and timetables.",
      link: "#",
      color: "bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white"
    },
    {
      icon: <UserCheck size={28} />,
      title: "Teacher Login",
      desc: "Enter academic records, student details, and upload notices.",
      link: "http://localhost:5175",
      color: "bg-slate-50 text-slate-700 hover:bg-primary hover:text-white"
    }
  ];

  return (
    <section id="quick-services" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            Quick Portals
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            Academic Services & Portals
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            Easily access and download board notices, check academic scores, or login to your dashboard directly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((svc, idx) => (
            <a
              key={idx}
              href={svc.link}
              target={svc.link.startsWith("http") ? "_blank" : "_self"}
              rel={svc.link.startsWith("http") ? "noopener noreferrer" : ""}
              className="group flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:bg-white hover:border-white hover:shadow-premium-hover transform hover:-translate-y-1.5 cursor-pointer"
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
