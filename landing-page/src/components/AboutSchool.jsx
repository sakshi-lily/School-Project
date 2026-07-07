import React, { useState } from 'react';
import { History, Target, Compass, Sparkles, X, ChevronRight } from 'lucide-react';

const AboutSchool = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [showModal, setShowModal] = useState(false);

  const tabsContent = {
    history: {
      icon: <History size={20} className="text-primary" />,
      title: "History of TBS Inter College",
      text: "Founded in 1950, Thakur Biri Singh Inter College (originally TBS Inter College) has stood as a beacon of learning in Tundla, Firozabad for over seven decades. Established to bring quality education to the children of rural and semi-urban Uttar Pradesh, the college has nurtured thousands of scholars, civil servants, teachers, and professionals.",
      bullets: [
        "Established in 1950 with a vision of accessible education.",
        "Recognized by the Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP).",
        "Evolved from a small classroom school to a sprawling campus with multi-stream academic programs."
      ],
      fullText: "Founded in 1950, Thakur Biri Singh Inter College has stood as a beacon of learning in Tundla, Firozabad for over seven decades. Established to bring quality education to the children of rural and semi-urban Uttar Pradesh, the college has nurtured thousands of scholars, civil servants, teachers, and professionals. Over the years, the institution has continually upgraded its facilities, adding modern science laboratories, computing facilities, and expanding its academic portfolio to include science, commerce, and arts streams at the Intermediate board level. Today, it stands as one of the region's most reputable government-aided educational landmarks, committed to meritocracy, character building, and social upliftment."
    },
    vision: {
      icon: <Target size={20} className="text-secondary-dark" />,
      title: "Our Vision",
      text: "To be an institution of academic excellence that instills scientific temper, civic responsibility, and moral integrity. We envision a future where students from all backgrounds have the skills, confidence, and leadership values required to contribute positively to national progress.",
      bullets: [
        "Inculcate holistic learning beyond the board syllabus.",
        "Ensure equal opportunity for all classes of society.",
        "Foster standard-driven digital and technological integration."
      ],
      fullText: "To be an institution of academic excellence that instills scientific temper, civic responsibility, and moral integrity. We envision a future where students from all backgrounds have the skills, confidence, and leadership values required to contribute positively to national progress. We aim to achieve this by modernizing our classrooms, implementing state-of-the-art laboratory practices, and organizing extra-curricular competitions that push students to reach their full potential and represent the district and state on national platforms."
    },
    mission: {
      icon: <Compass size={20} className="text-emerald-600" />,
      title: "Our Mission",
      text: "Our mission is to deliver comprehensive, high-quality secondary and higher secondary education under UPMSP standards. We commit to cultivating critical thinking, self-discipline, respect for cultural diversity, and physical fitness among students.",
      bullets: [
        "Maintain excellent academic results through experienced teachers.",
        "Integrate practical lab experiments and smart learning aids.",
        "Nurture leadership and patriotic service through NCC and NSS programs."
      ],
      fullText: "Our mission is to deliver comprehensive, high-quality secondary and higher secondary education under UPMSP standards. We commit to cultivating critical thinking, self-discipline, respect for cultural diversity, and physical fitness among students. Through rigorous coaching, sports training, and community service programs like NSS and NCC, we prepare students for competitive careers while instilling a deep respect for national heritage and civil duty. We work closely with parents and district educational authorities to create a safe, supportive, and highly competitive learning environment."
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Image with Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-premium transition-transform duration-500 hover:scale-[1.01] border-4 border-white">
              {/* Outer Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVIcmizT-3O6y4SLXo71oXk1Her_lu-TwNLYbyzTxE94iuiXPI4wlP8WY&s=10" // College building / classroom
                alt="Thakur Biri Singh Inter College Campus"
                className="w-full h-[350px] md:h-[450px] object-cover"
              />

              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold text-secondary flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Main Campus Building</span>
                </span>
                <h4 className="text-lg md:text-xl font-heading font-extrabold mt-1">
                  Over 75 Years of Academic Heritage
                </h4>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-6 -right-6 bg-secondary text-primary rounded-2xl p-4 shadow-xl border-4 border-slate-50 text-center max-w-[140px] transform rotate-3 hover:rotate-0 transition-transform duration-300 hidden sm:block">
              <span className="block text-3xl font-heading font-extrabold">1950</span>
              <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-primary-dark">Estd. Year</span>
            </div>
          </div>

          {/* Right Column: Tabbed Content */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full w-fit">
              About Our Institution
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
              Thakur Biri Singh Inter College
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              Affiliated to the Board of High School and Intermediate Education, U.P. (UPMSP), Tundla.
            </p>

            {/* Tab buttons */}
            <div className="flex border-b border-slate-200 mt-8 gap-4">
              {Object.keys(tabsContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-xs md:text-sm font-heading font-extrabold border-b-2 transition-all flex items-center gap-2 px-1 capitalize ${activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {tab === 'history' && <History size={16} />}
                  {tab === 'vision' && <Target size={16} />}
                  {tab === 'mission' && <Compass size={16} />}
                  <span>{tab}</span>
                </button>
              ))}
            </div>

            {/* Tab content panel */}
            <div className="mt-6 animate-in fade-in duration-300">
              <h3 className="text-lg md:text-xl font-heading font-extrabold text-slate-800 flex items-center gap-2">
                {tabsContent[activeTab].icon}
                <span>{tabsContent[activeTab].title}</span>
              </h3>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed mt-3">
                {tabsContent[activeTab].text}
              </p>

              <ul className="mt-4 space-y-2">
                {tabsContent[activeTab].bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                    <span className="text-secondary font-bold text-lg leading-none shrink-0">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Read More button */}
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 bg-white hover:bg-slate-100 text-primary font-heading font-bold border border-primary/20 hover:border-primary/40 px-5 py-2.5 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 w-fit transition-all shadow-sm"
            >
              <span>Read Full History & Profile</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* About Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {tabsContent[activeTab].icon}
                <h3 className="font-heading font-bold text-lg text-white">
                  {tabsContent[activeTab].title}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-800">
                {tabsContent[activeTab].text}
              </p>
              <p>
                {tabsContent[activeTab].fullText}
              </p>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="font-heading font-bold text-slate-800 mb-2">Institutional Milestones:</h4>
                <ul className="space-y-2">
                  {tabsContent[activeTab].bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-xl text-xs md:text-sm transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSchool;
