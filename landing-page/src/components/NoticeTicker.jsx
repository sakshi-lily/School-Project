import React, { useState, useEffect } from 'react';
import { Megaphone, BellRing } from 'lucide-react';

const NoticeTicker = () => {
  const defaultNotices = [
    { text: "📢 Admissions Open for Session 2026-27 (Classes IX to XII) - Apply Online now!", href: "#admission-banner" },
    { text: "📝 UPMSP Board Examinations 2026 Result declared - High school and Intermediate students check scores.", href: "#quick-services" },
    { text: "🎓 Pre-Matric and Post-Matric UP Scholarship 2026-27 registration portals are now active.", href: "#quick-services" },
    { text: "🏖️ Summer Vacation scheduled from May 20th to June 30th. School reopens on July 1st.", href: "#notices" },
    { text: "🏆 Thakur Biri Singh Inter College bags first prize in District Science Exhibition 2026!", href: "#notices" }
  ];

  const [notices, setNotices] = useState(defaultNotices);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/announcements');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const list = data.data.map((item) => ({
            text: `📣 ${item.title}: ${item.content}`,
            href: '#notices'
          }));
          setNotices(list);
        }
      } catch (err) {
        console.error('Error fetching ticker notices:', err);
      }
    };
    fetchTicker();
  }, []);

  return (
    <div className="w-full bg-slate-100 border-b border-slate-200 flex items-center relative overflow-hidden h-12 z-40">
      {/* Label Badge */}
      <div className="bg-secondary text-primary font-heading font-extrabold text-[10px] md:text-xs tracking-wider uppercase h-full px-4 md:px-6 flex items-center gap-2 z-10 shadow-lg shrink-0 relative after:content-[''] after:absolute after:top-0 after:left-full after:h-full after:w-4 after:bg-secondary after:transform after:skew-x-12 after:origin-top-left">
        <Megaphone size={14} className="animate-bounce" />
        <span>Latest Announcements</span>
      </div>

      {/* Ticker Text container */}
      <div className="flex-1 overflow-hidden h-full flex items-center relative bg-slate-50">
        <div className="animate-marquee-slow flex items-center gap-16 py-1 pl-4">
          {/* Double the array elements for seamless scrolling loop */}
          {[...notices, ...notices].map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-xs md:text-sm text-slate-700 hover:text-primary font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <BellRing size={12} className="text-primary-light shrink-0" />
              <span>{item.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;
