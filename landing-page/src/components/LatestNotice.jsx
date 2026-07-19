import React, { useState, useEffect } from 'react';
import { Calendar, FileDown, Bell, Award, BookOpen, Sparkles } from 'lucide-react';

const LatestNotice = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [notices, setNotices] = useState(null);

  const categories = [
    { id: 'news', label: 'नवीनतम समाचार', icon: <Bell size={16} /> },
    { id: 'circulars', label: 'शासकीय आदेश व सूचनाएं', icon: <BookOpen size={16} /> },
    { id: 'exams', label: 'परीक्षा अपडेट', icon: <Award size={16} /> },
    { id: 'events', label: 'भावी कार्यक्रम', icon: <Sparkles size={16} /> },
  ];

  const noticesData = {
    news: [],
    circulars: [],
    exams: [],
    events: []
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/public/announcements');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const grouped = {
            news: [],
            circulars: [],
            exams: [],
            events: [],
          };
          data.data.forEach((item) => {
            const formatted = {
              date: new Date(item.date).toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
              title: item.title,
              isNew: (new Date() - new Date(item.date)) < (5 * 24 * 60 * 60 * 1000),
              desc: item.content,
            };
            
            if (item.type === 'Notice') {
              grouped.circulars.push(formatted);
            } else if (item.title.toLowerCase().includes('exam') || item.title.toLowerCase().includes('result') || item.title.toLowerCase().includes('date sheet')) {
              grouped.exams.push(formatted);
            } else if (item.title.toLowerCase().includes('celebration') || item.title.toLowerCase().includes('event') || item.title.toLowerCase().includes('sports') || item.title.toLowerCase().includes('annual day')) {
              grouped.events.push(formatted);
            } else {
              grouped.news.push(formatted);
            }
          });
          
          Object.keys(grouped).forEach((tab) => {
            grouped[tab] = [...grouped[tab], ...noticesData[tab]];
          });
          setNotices(grouped);
        }
      } catch (err) {
        console.error('Error fetching notices:', err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <section id="notices" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Tickers / Fast Bulletin */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full w-fit">
              सूचना केंद्र
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
              सूचना पट्ट एवं परीक्षा अपडेट
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
              अधिसूचनाओं, बोर्ड परीक्षा समय सारणी, शासकीय आदेशों तथा दैनिक घोषणाओं की जानकारी प्राप्त करें। दिए गए विकल्पों से फ़िल्टर करें।
            </p>
          </div>

          {/* Right Column: Tabbed Lists */}
          <div className="lg:col-span-8">
            {/* Tabs List */}
            <div className="flex flex-wrap gap-2 md:gap-3 border-b border-slate-100 pb-3 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-heading font-bold text-xs md:text-sm transition-all ${activeTab === cat.id
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Notice Board List Panel */}
            <div className="space-y-4 animate-in fade-in duration-300">
              {((notices || noticesData)[activeTab] && (notices || noticesData)[activeTab].length > 0) ? (
                (notices || noticesData)[activeTab].map((notice, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-premium transition-all duration-300"
                  >
                    {/* Notice Details */}
                    <div className="flex items-start gap-3.5">
                      {/* Calendar Badge */}
                      <div className="bg-primary/5 text-primary p-2.5 rounded-xl shrink-0 hidden sm:block">
                        <Calendar size={20} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] md:text-xs font-semibold text-slate-400 flex items-center gap-1">
                            <Calendar size={12} className="sm:hidden" />
                            {notice.date}
                          </span>

                          {notice.isNew && (
                            <span className="bg-rose-50 text-rose-600 border border-rose-100 font-heading font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                              नया
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading font-bold text-slate-800 text-sm md:text-base mt-1.5 leading-snug group-hover:text-primary transition-colors">
                          {notice.title}
                        </h3>

                        {notice.desc && (
                          <p className="text-slate-500 text-xs md:text-sm mt-1.5 leading-relaxed whitespace-pre-line">
                            {notice.desc}
                          </p>
                        )}

                        {notice.time && (
                          <p className="text-xs text-slate-500 font-medium mt-1">
                            🕒 समय: <span className="text-slate-700 font-semibold">{notice.time}</span> | स्थान: <span className="text-slate-700 font-semibold">{notice.location}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Notice Actions */}
                    {notice.type && (
                      <a
                        href="#"
                        className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors shrink-0 md:self-center"
                      >
                        <FileDown size={14} className="text-primary" />
                        <span>डाउनलोड</span>
                        <span className="text-[9px] text-slate-400">({notice.type} • {notice.fileSize})</span>
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Bell className="mx-auto text-slate-300 mb-2" size={32} />
                  <p className="text-slate-500 font-medium text-sm">इस श्रेणी में वर्तमान में कोई सूचना उपलब्ध नहीं है।</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LatestNotice;
