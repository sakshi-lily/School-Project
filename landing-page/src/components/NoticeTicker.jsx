import React, { useState, useEffect } from 'react';
import { Megaphone, BellRing } from 'lucide-react';

const NoticeTicker = () => {
  const defaultNotices = [
    { text: "📢 शैक्षणिक सत्र 2026-27 (कक्षा 9 से 12वीं) के लिए प्रवेश प्रारंभ - ऑनलाइन आवेदन करें!", href: "#admission-banner" },
    { text: "📝 यू.पी. बोर्ड परीक्षा परिणाम घोषित - हाईस्कूल एवं इण्टरमीडिएट के छात्र अपना परिणाम देखें।", href: "#quick-services" },
    { text: "🎓 पूर्व-दशम एवं दशमोत्तर छात्रवृत्ति (UP Scholarship) 2026-27 आवेदन पोर्टल सक्रिय है।", href: "#quick-services" },
    { text: "🏖️ ग्रीष्मावकाश 20 मई से 30 जून तक निर्धारित है। विद्यालय पुनः 1 जुलाई को खुलेगा।", href: "#notices" },
    { text: "🏆 ठाकुर बीरी सिंह इण्टर कॉलेज ने जिला स्तरीय विज्ञान प्रदर्शनी में प्रथम पुरस्कार प्राप्त किया!", href: "#notices" }
  ];

  const [notices, setNotices] = useState(defaultNotices);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const res = await fetch('/api/public/announcements');
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
        <span>नवीनतम सूचनाएं</span>
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
