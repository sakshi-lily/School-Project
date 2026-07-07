import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, ClipboardList, Award, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVIcmizT-3O6y4SLXo71oXk1Her_lu-TwNLYbyzTxE94iuiXPI4wlP8WY&s=10", // Premium campus/school building
      title: "Welcome to Thakur Biri Singh Inter College",
      subtitle: "Empowering Students Through Quality Education",
      badge: "Admissions Open 2026–27",
      highlight: "Tundla, Firozabad"
    },
    {
      // Image representing patriotic school celebrations (Indian flag, outdoor assembly)
      image: "https://scontent.fdel65-2.fna.fbcdn.net/v/t39.30808-6/480731230_1048374940430762_8577611832605610885_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=zHsREcVew-IQ7kNvwGypZqg&_nc_oc=Adr67XflGHCzPfuySj72kMW0c9C7HGi_xedGW6NaPv5spiDaEvlD5B0VfmYQtioCLfRmHNStcnVhFRK8RjwUK_0v&_nc_zt=23&_nc_ht=scontent.fdel65-2.fna&_nc_gid=plLt0pZVovT_yXN7ne9TAw&_nc_ss=7b289&oh=00_AQB4r5zHxrGPVkhnUWGeJHi9WvA6e-a36ST0DbcDHPVejQ&oe=6A5190B3", // Proud students / group activity
      title: "Shaping Patriotic & Responsible Citizens",
      subtitle: "Fostering National Values, Character & Academic Excellence",
      badge: "Est. 1950 • Legacy of Trust",
      highlight: "Affiliated to UPMSP"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcWEa93m4aoEu2hGy43XUEtP3oIj4_bH19Y4BMjtxQWA&s=10", // Modern laboratory / smart classroom setup
      title: "Smart Classrooms & Modern Laboratories",
      subtitle: "Enhancing Practical Skills Through Innovation and Technology",
      badge: "Best-in-Class Infrastructure",
      highlight: "Modern Education"
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
              href="#admission-banner"
              className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base border border-primary-light/20"
            >
              <GraduationCap size={18} />
              <span>Apply Now</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#quick-services"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <ClipboardList size={18} className="text-secondary" />
              <span>Student Registration</span>
            </a>

            <a
              href="#quick-services"
              className="w-full sm:w-auto bg-secondary hover:bg-secondary-light text-primary font-extrabold px-6 py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Award size={18} />
              <span>Check Result</span>
            </a>
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
