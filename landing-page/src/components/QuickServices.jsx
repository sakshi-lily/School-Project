import React from 'react';
import { UserPlus, Award, FileSpreadsheet, CalendarDays, BookOpen, Contact, FileText, ShieldCheck } from 'lucide-react';

const QuickServices = ({ onOpenResults, onOpenCalendar, onOpenAdmitCard, onOpenSyllabus, onOpenDocs }) => {
  const services = [
    {
      id: "result",
      icon: <Award size={28} />,
      title: "परीक्षा परिणाम एवं अंकपत्र",
      desc: "हाईस्कूल एवं इण्टरमीडिएट बोर्ड तथा सत्र परीक्षाओं के अंकपत्र ऑनलाइन देखें।",
      link: "#",
      color: "bg-yellow-50 text-secondary-dark hover:bg-secondary hover:text-primary"
    },
    {
      id: "admitcard",
      icon: <FileSpreadsheet size={28} />,
      title: "प्रवेश पत्र",
      desc: "गृह परीक्षा एवं यू.पी. बोर्ड परीक्षा के प्रवेश पत्र आसानी से डाउनलोड करें।",
      link: "#",
      color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
    },
    {
      id: "docs",
      icon: <ShieldCheck size={28} />,
      title: "शासकीय व स्कूल दस्तावेज",
      desc: "यू.पी. शासन, माध्यमिक शिक्षा परिषद के परिपत्र, छुट्टी नियम व सूचनाएं डाउनलोड करें।",
      link: "#school-docs",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white"
    },
    {
      id: "notices",
      icon: <FileSpreadsheet size={28} />,
      title: "सूचना पट्ट (Notice Board)",
      desc: "विद्यालय की नवीनतम घोषणाएं, बोर्ड अपडेट एवं अवकाश संबंधी सूचनाएं देखें।",
      link: "#notices",
      color: "bg-blue-50 text-primary hover:bg-primary hover:text-white"
    },
    {
      id: "calendar",
      icon: <CalendarDays size={28} />,
      title: "वार्षिक शैक्षणिक कैलेंडर",
      desc: "परीक्षा तिथियों, छुट्टियों और विद्यालयीय कार्यक्रमों का संपूर्ण कैलेंडर देखें।",
      link: "#",
      color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white"
    },
    {
      id: "syllabus",
      icon: <BookOpen size={28} />,
      title: "पाठ्यक्रम एवं विषय सूची",
      desc: "माध्यमिक शिक्षा परिषद द्वारा निर्धारित कक्षावार पाठ्यक्रम एवं विषय विवरण।",
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
            त्वरित सेवाएं
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            परीक्षा परिणाम, सूचना पट्ट एवं शासकीय दस्तावेज
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            अंकपत्र सत्यापन, यू.पी. बोर्ड के शासकीय आदेश, अवकाश नियम एवं शैक्षणिक कैलेंडर आसानी से प्राप्त करें।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <a
              key={idx}
              href={svc.link}
              onClick={(e) => {
                if (svc.id === "result") {
                  e.preventDefault();
                  if (onOpenResults) onOpenResults();
                } else if (svc.id === "calendar") {
                  e.preventDefault();
                  if (onOpenCalendar) onOpenCalendar();
                } else if (svc.id === "admitcard") {
                  e.preventDefault();
                  if (onOpenAdmitCard) onOpenAdmitCard();
                } else if (svc.id === "syllabus") {
                  e.preventDefault();
                  if (onOpenSyllabus) onOpenSyllabus();
                } else if (svc.id === "docs") {
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

