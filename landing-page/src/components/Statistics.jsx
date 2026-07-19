import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, School, FlaskConical, Award, Milestone } from 'lucide-react';

const CountUp = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end) || end === 0) {
      setCount(target);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const Statistics = () => {
  const stats = [
    {
      icon: <Users size={28} />,
      value: "1250",
      suffix: "+",
      label: "सक्रिय विद्यार्थी",
      desc: "हाईस्कूल एवं इण्टरमीडिएट में नामांकित",
      color: "bg-blue-500/10 text-primary border-blue-500/20"
    },
    {
      icon: <GraduationCap size={28} />,
      value: "45",
      suffix: "+",
      label: "अनुभवी शिक्षक",
      desc: "शासकीय मान्यता प्राप्त प्रवक्ता व शिक्षक",
      color: "bg-amber-500/10 text-secondary-dark border-amber-500/20"
    },
    {
      icon: <School size={28} />,
      value: "32",
      suffix: "",
      label: "शिक्षण कक्षाएं",
      desc: "विशाल एवं स्मार्ट शिक्षण कक्ष",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
    },
    {
      icon: <FlaskConical size={28} />,
      value: "6",
      suffix: "",
      label: "विज्ञान प्रयोगशालाएं",
      desc: "आधुनिक भौतिक, रसायन एवं जीव विज्ञान लैब",
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20"
    },
    {
      icon: <Award size={28} />,
      value: "100",
      suffix: "%",
      label: "बोर्ड परीक्षा परिणाम",
      desc: "यूपी बोर्ड परीक्षा में उत्कृष्ट प्रदर्शन",
      color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20"
    },
    {
      icon: <Milestone size={28} />,
      value: "75",
      suffix: "+",
      label: "उत्कृष्टता के वर्ष",
      desc: "1950 से क्षेत्र की सेवा में समर्पित",
      color: "bg-rose-500/10 text-rose-600 border-rose-500/20"
    }
  ];

  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,180,0,0.08),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon Bubble */}
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-secondary mb-4">
                {stat.icon}
              </div>
              
              {/* Counter Value */}
              <h3 className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </h3>
              
              {/* Label */}
              <p className="font-heading font-bold text-xs md:text-sm text-secondary tracking-wide uppercase mt-2">
                {stat.label}
              </p>
              
              {/* Description */}
              <p className="text-[10px] md:text-xs text-white/70 mt-1 leading-normal">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
