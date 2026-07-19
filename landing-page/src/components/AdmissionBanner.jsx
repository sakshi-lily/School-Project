import React from 'react';
import { GraduationCap, FileText, Calendar, ArrowUpRight } from 'lucide-react';
import studentsImage from './students.png';

const AdmissionBanner = ({ onOpenAdmission }) => {
  const features = [
    "अनुभवी एवं योग्य शिक्षक",
    "स्मार्ट कक्षाएं एवं आधुनिक लैब",
    "विज्ञान प्रयोगशालाएं एवं पुस्तकालय",
    "कंप्यूटर शिक्षा एवं खेलकूद सुविधाएं",
    "सुरक्षित एवं अनुशासित वातावरण",
    "यू.पी. बोर्ड द्वारा मान्यता प्राप्त"
  ];

  return (
    <section id="admission-banner" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Banner Card Container */}
        <div className="relative bg-gradient-to-br from-primary-dark via-primary to-slate-900 text-white rounded-[32px] p-8 md:p-16 shadow-2xl overflow-hidden border border-primary-light/10">
          
          {/* Subtle geometric design elements in background */}
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/5 border border-white/5 pointer-events-none select-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-secondary/5 border border-secondary/5 pointer-events-none select-none" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full bg-primary-light/5 blur-3xl pointer-events-none select-none -translate-y-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Column 1: Info (Left side) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Active Badge */}
              <span className="inline-flex items-center gap-2 bg-secondary text-primary font-heading font-extrabold text-xs md:text-sm tracking-wider uppercase px-4 py-2 rounded-full mb-6 shadow-lg border border-secondary-light/30 transition-transform duration-300 hover:scale-105">
                <Calendar size={14} />
                <span>🎓 प्रवेश प्रारंभ सत्र 2026–27</span>
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
                कक्षा 6 से 12 तक प्रवेश प्रारंभ <span className="text-secondary">(बालक एवं बालिकाएं)</span>
              </h2>

              {/* Description */}
              <p className="text-slate-200 text-sm md:text-base mt-4 leading-relaxed font-sans font-medium">
                कक्षा 6 से 12 तक छात्र एवं छात्राओं हेतु प्रवेश प्रारंभ हैं। हमारे विद्यालय में योग्य शिक्षकों द्वारा गुणवत्तापूर्ण शिक्षा, आधुनिक कक्षाएं, विज्ञान प्रयोगशालाएं, पुस्तकालय, खेलकूद सुविधाएं एवं कंप्यूटर शिक्षा प्रदान की जाती है। ठाकुर बीरी सिंह इण्टर कॉलेज से जुड़ें और अपने बच्चों के उज्ज्वल भविष्य का निर्माण करें।
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 w-full">
                {features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2.5 text-slate-200 font-sans text-sm md:text-base font-semibold transition-all duration-300 hover:text-white"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/15 flex items-center justify-center border border-secondary/30">
                      <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
                <a
                  href="#quick-services"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary-light text-primary font-heading font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-secondary/20 flex items-center justify-center gap-2 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
                >
                  <GraduationCap size={20} />
                  <span>ऑनलाइन प्रवेश पूछताछ</span>
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href="#"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-heading font-bold px-8 py-4 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg flex items-center justify-center gap-2 backdrop-blur-sm transform hover:-translate-y-1 active:translate-y-0"
                >
                  <FileText size={20} className="text-secondary" />
                  <span>विवरण पुस्तिका (Prospectus)</span>
                </a>
              </div>

            </div>

            {/* Column 2: Photo/Illustration (Right side) */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-md lg:max-w-none">
                {/* Decorative glowing gradient backdrop */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-secondary via-primary-light to-secondary rounded-[30px] blur opacity-25 group-hover:opacity-45 transition duration-1000 group-hover:duration-300" />
                
                {/* Image Container with 24px/rounded-3xl corners */}
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-2xl bg-slate-800 aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[420px] w-full flex items-center justify-center">
                  <img
                    src={studentsImage}
                    alt="Happy Indian school students in uniform in front of modern campus"
                    className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle vignette/overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AdmissionBanner;
