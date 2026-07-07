import React from 'react';
import { Users, Tv, FlaskConical, Cpu, BookOpen, Trophy, ShieldCheck, TrendingUp } from 'lucide-react';

const WhyChooseUs = () => {
  const cards = [
    {
      icon: <Users size={24} />,
      title: "Experienced Teachers",
      desc: "Our faculty comprises highly qualified, government-certified teachers with decades of pedagogical experience under the UP Board curriculum.",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: <Tv size={24} />,
      title: "Smart Classrooms",
      desc: "Equipped with interactive projectors, audio-visual systems, and digital boards to make visual learning engaging and effective.",
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      icon: <FlaskConical size={24} />,
      title: "Science Labs",
      desc: "Fully equipped Physics, Chemistry, and Biology laboratories allowing hands-on experimentation under safety-guided rules.",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      icon: <Cpu size={24} />,
      title: "Computer Lab",
      desc: "State-of-the-art computer center with high-speed internet to teach students essential coding, digital skills, and IT fundamentals.",
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Spacious Library",
      desc: "A quiet reading space housing thousands of reference books, textbooks, magazines, and newspapers for overall student reference.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      icon: <Trophy size={24} />,
      title: "Sports & Athletics",
      desc: "Promoting physical fitness through spacious play fields for cricket, football, basketball, and training for state-level meets.",
      color: "text-rose-600 bg-rose-50 border-rose-100"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Rigorous Discipline",
      desc: "Ensuring character development and punctual attendance. Supported by active NCC and NSS wings to teach social service.",
      color: "text-teal-600 bg-teal-50 border-teal-100"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Excellent Results",
      desc: "Consistent 100% pass percentages in UP Board High School & Intermediate examinations, with multiple district toppers.",
      color: "text-cyan-600 bg-cyan-50 border-cyan-100"
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            Our Key Pillars
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            Why Choose Thakur Biri Singh Inter College?
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            For over 70 years, we have blended traditional values with modern learning infrastructure to shape successful futures.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-premium-hover hover:border-primary/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col gap-4"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                {card.icon}
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-heading font-extrabold text-base md:text-lg text-slate-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
