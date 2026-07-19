import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, ClipboardList, Award, ArrowRight } from 'lucide-react';

const Hero = ({ onOpenResults }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop", // Premium campus/school building
      title: "ठाकुर बीरी सिंह इण्टर कॉलेज में आपका स्वागत है",
      subtitle: "गुणवत्तापूर्ण शिक्षा और सुदृढ़ संस्कारों द्वारा विद्यार्थियों का सर्वांगीण विकास",
      badge: "प्रवेश प्रारंभ सत्र 2026-27",
      highlight: "टूण्डला, फ़िरोज़ाबाद"
    },
    {
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop", // Patriotic assembly/students
      title: "देशभक्त एवं जिम्मेदार नागरिकों का निर्माण",
      subtitle: "राष्ट्रीय मूल्यों, चरित्र निर्माण एवं उत्कृष्ट शिक्षा को बढ़ावा",
      badge: "स्थापना 1950 • विश्वास का प्रतीक",
      highlight: "यू.पी. बोर्ड द्वारा मान्यता प्राप्त"
    },
    {
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop", // Modern laboratory / smart classroom setup
      title: "स्मार्ट कक्षाएं एवं आधुनिक प्रयोगशालाएं",
      subtitle: "प्रौद्योगिकी और नवाचार के माध्यम से व्यावहारिक ज्ञान का विकास",
      badge: "उत्कृष्ट अवसंरचना एवं सुविधाएं",
      highlight: "आधुनिक शिक्षा"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative w-full h-[550px] md:h-[650px] overflow-hidden bg-slate-900">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform duration-[2000ms]`}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/50 to-slate-950/75 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4 md:px-8">
        <div className="max-w-4xl text-center flex flex-col items-center">
          {/* Admissions Badge */}
          <span className="inline-flex items-center gap-1.5 bg-secondary text-primary font-heading font-extrabold text-xs md:text-sm tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg mb-6 animate-pulse-slow">
            <GraduationCap size={16} />
            <span>{slides[currentSlide].badge}</span>
          </span>

          {/* School Title / Header */}
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle / Focus Location */}
          <p className="text-secondary font-heading font-semibold tracking-wider text-sm md:text-lg uppercase mb-4">
            {slides[currentSlide].highlight}
          </p>

          {/* Description Tagline */}
          <p className="text-slate-200 text-sm md:text-xl font-medium max-w-2xl mb-8 leading-relaxed drop-shadow-sm">
            {slides[currentSlide].subtitle}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#notices"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <ClipboardList size={18} className="text-secondary" />
              <span>सूचना पट्ट देखें</span>
            </a>

            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenResults();
              }}
              className="w-full sm:w-auto bg-secondary hover:bg-secondary-light text-primary font-extrabold px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base border-0 cursor-pointer"
            >
              <Award size={18} />
              <span>परीक्षा परिणाम देखें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm border border-white/10 hidden md:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm border border-white/10 hidden md:block"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${idx === currentSlide
                ? 'bg-secondary w-7'
                : 'bg-white/40 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
