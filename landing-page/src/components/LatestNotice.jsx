import React, { useState, useEffect } from 'react';
import { Calendar, FileDown, Bell, Award, BookOpen, Sparkles } from 'lucide-react';

const LatestNotice = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [notices, setNotices] = useState(null);

  const categories = [
    { id: 'news', label: 'Latest News', icon: <Bell size={16} /> },
    { id: 'circulars', label: 'Circulars & Orders', icon: <BookOpen size={16} /> },
    { id: 'exams', label: 'Exam Updates', icon: <Award size={16} /> },
    { id: 'events', label: 'Upcoming Events', icon: <Sparkles size={16} /> },
  ];

  const noticesData = {
    news: [
      {
        date: "05 July 2026",
        title: "Admissions Open for Session 2026-27 (Classes IX to XII) - Registration Link Available",
        isNew: true,
        fileSize: "1.2 MB",
        type: "PDF"
      },
      {
        date: "28 June 2026",
        title: "Pre-Matric and Post-Matric UP Scholarship Scheme 2026-27 - Application Instructions",
        isNew: true,
        fileSize: "680 KB",
        type: "PDF"
      },
      {
        date: "15 June 2026",
        title: "Declaration of School Merit Lists for Annual Examinations 2025-26",
        isNew: false,
        fileSize: "450 KB",
        type: "PDF"
      },
      {
        date: "10 June 2026",
        title: "School Reopening Dates post Summer Vacation & Distribution of New Textbooks",
        isNew: false,
        fileSize: "220 KB",
        type: "PDF"
      }
    ],
    circulars: [
      {
        date: "01 July 2026",
        title: "UPMSP Notification regarding High School and Intermediate Syllabus reduction / changes",
        isNew: true,
        fileSize: "3.1 MB",
        type: "PDF"
      },
      {
        date: "22 June 2026",
        title: "Department of Education, UP Government guidelines regarding smart classrooms implementation",
        isNew: false,
        fileSize: "1.5 MB",
        type: "PDF"
      },
      {
        date: "05 June 2026",
        title: "Academic Calendar and List of Holidays for Session 2026-27",
        isNew: false,
        fileSize: "850 KB",
        type: "PDF"
      }
    ],
    exams: [
      {
        date: "04 July 2026",
        title: "Schedule for High School & Intermediate Compartment / Improvement Exams 2026",
        isNew: true,
        fileSize: "1.1 MB",
        type: "PDF"
      },
      {
        date: "29 June 2026",
        title: "Instructions for Board Examination Form Submission - Regular & Private Candidates",
        isNew: true,
        fileSize: "1.8 MB",
        type: "PDF"
      },
      {
        date: "12 May 2026",
        title: "Instructions to check Class 10th and 12th UP MSP board results online",
        isNew: false,
        fileSize: "320 KB",
        type: "PDF"
      }
    ],
    events: [
      {
        date: "15 August 2026",
        title: "77th Independence Day Celebration & Flag Hoisting Ceremony (Mandatory attendance)",
        isNew: true,
        time: "08:00 AM",
        location: "Main Ground"
      },
      {
        date: "05 September 2026",
        title: "Teachers' Day Celebrations & Student Teacher Assembly Program",
        isNew: false,
        time: "10:00 AM",
        location: "Auditorium"
      },
      {
        date: "22 October 2026",
        title: "Annual Science & Craft Exhibition (District level submissions open)",
        isNew: false,
        time: "09:00 AM",
        location: "Laboratories"
      }
    ]
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/announcements');
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
              date: new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              title: item.title,
              isNew: (new Date() - new Date(item.date)) < (5 * 24 * 60 * 60 * 1000),
              desc: item.content,
            };
            
            if (item.title.toLowerCase().includes('exam') || item.title.toLowerCase().includes('result') || item.title.toLowerCase().includes('date sheet')) {
              grouped.exams.push(formatted);
            } else if (item.title.toLowerCase().includes('celebration') || item.title.toLowerCase().includes('event') || item.title.toLowerCase().includes('day')) {
              grouped.events.push(formatted);
            } else if (item.type === 'Notice') {
              grouped.circulars.push(formatted);
            } else {
              grouped.news.push(formatted);
            }
          });
          
          Object.keys(grouped).forEach((tab) => {
            if (grouped[tab].length === 0) {
              grouped[tab] = noticesData[tab];
            }
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
              Information Desk
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
              Notice Board & Exam Updates
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
              Stay informed with official circulars, board schedules, examinations, and day-to-day announcements. Use the categories on the right to filter.
            </p>

            {/* Quick Helper card */}
            <div className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-xl text-secondary-dark shrink-0">
                <Bell size={20} className="animate-swing" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-800 text-sm md:text-base">SMS Alerts</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Registered students and parents receive critical exam notifications and holiday notices directly via SMS.
                </p>
              </div>
            </div>
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
              {(notices || noticesData)[activeTab].map((notice, idx) => (
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
                            New
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-slate-800 text-sm md:text-base mt-1.5 leading-snug group-hover:text-primary transition-colors">
                        {notice.title}
                      </h3>

                      {notice.time && (
                        <p className="text-xs text-slate-500 font-medium mt-1">
                          🕒 Time: <span className="text-slate-700 font-semibold">{notice.time}</span> | Location: <span className="text-slate-700 font-semibold">{notice.location}</span>
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
                      <span>Download</span>
                      <span className="text-[9px] text-slate-400">({notice.type} • {notice.fileSize})</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LatestNotice;
