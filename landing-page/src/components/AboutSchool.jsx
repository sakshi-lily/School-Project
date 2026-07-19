import React, { useState } from 'react';
import { History, Target, Compass, Sparkles, X, ChevronRight } from 'lucide-react';

const AboutSchool = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [showModal, setShowModal] = useState(false);

  const tabsContent = {
    history: {
      icon: <History size={20} className="text-primary" />,
      title: "टी.बी.एस. इंटर कॉलेज का इतिहास",
      text: "1950 में स्थापित, ठाकुर बीरी सिंह इंटर कॉलेज (मूल रूप से टीबीएस इंटर कॉलेज) सात दशकों से अधिक समय से टूंडला, फिरोजाबाद में शिक्षा का एक प्रमुख केंद्र रहा है। ग्रामीण और अर्ध-शहरी उत्तर प्रदेश के बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करने के उद्देश्य से स्थापित इस कॉलेज ने हजारों विद्वानों, सिविल सेवकों, शिक्षकों और पेशेवरों को गढ़ा है।",
      bullets: [
        "सुलभ और गुणवत्तापूर्ण शिक्षा के दृष्टिकोण के साथ 1950 में स्थापित।",
        "उत्तर प्रदेश माध्यमिक शिक्षा परिषद (UPMSP) द्वारा मान्यता प्राप्त।",
        "एक छोटे से स्कूल से बहु-विषयक शैक्षणिक कार्यक्रमों वाले विशाल परिसर के रूप में विकसित।"
      ],
      fullText: "1950 में स्थापित, ठाकुर बीरी सिंह इंटर कॉलेज सात दशकों से अधिक समय से टूंडला, फिरोजाबाद में शिक्षा का एक प्रमुख केंद्र रहा है। ग्रामीण और अर्ध-शहरी उत्तर प्रदेश के बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करने के उद्देश्य से स्थापित इस कॉलेज ने हजारों विद्वानों, सिविल सेवकों, शिक्षकों और पेशेवरों को गढ़ा है। वर्षों से, संस्थान ने अपनी सुविधाओं को लगातार उन्नत किया है, जिसमें आधुनिक विज्ञान प्रयोगशालाएं, कंप्यूटर सुविधाएं जोड़ना और इंटरमीडिएट स्तर पर विज्ञान, वाणिज्य और कला संकायों को शामिल करने के लिए अपने शैक्षणिक पोर्टफोलियो का विस्तार करना शामिल है। आज, यह क्षेत्र के सबसे प्रतिष्ठित शासकीय सहायता प्राप्त शैक्षणिक स्थलों में से एक है, जो योग्यता, चरित्र निर्माण और सामाजिक उत्थान के लिए प्रतिबद्ध है।"
    },
    vision: {
      icon: <Target size={20} className="text-secondary-dark" />,
      title: "हमारा दृष्टिकोण",
      text: "एक ऐसा शैक्षणिक उत्कृष्टता का संस्थान बनना जो वैज्ञानिक दृष्टिकोण, नागरिक जिम्मेदारी और नैतिक अखंडता का संचार करे। हम एक ऐसे भविष्य की कल्पना करते हैं जहां सभी पृष्ठभूमि के छात्रों के पास राष्ट्रीय प्रगति में सकारात्मक योगदान देने के लिए आवश्यक कौशल, आत्मविश्वास और नेतृत्व मूल्य हों।",
      bullets: [
        "बोर्ड पाठ्यक्रम से परे समग्र शिक्षा प्रदान करना।",
        "समाज के सभी वर्गों के लिए समान अवसर सुनिश्चित करना।",
        "मानक-संचालित डिजिटल और तकनीकी एकीकरण को बढ़ावा देना।"
      ],
      fullText: "एक ऐसा शैक्षणिक उत्कृष्टता का संस्थान बनना जो वैज्ञानिक दृष्टिकोण, नागरिक जिम्मेदारी और नैतिक अखंडता का संचार करे। हम एक ऐसे भविष्य की कल्पना करते हैं जहां सभी पृष्ठभूमि के छात्रों के पास राष्ट्रीय प्रगति में सकारात्मक योगदान देने के लिए आवश्यक कौशल, आत्मविश्वास और नेतृत्व मूल्य हों। हमारा उद्देश्य अपनी कक्षाओं का आधुनिकीकरण करके, अत्याधुनिक प्रयोगशाला पद्धतियों को लागू करके और पाठ्येतर प्रतियोगिताओं का आयोजन करके इसे हासिल करना है जो छात्रों को अपनी पूर्ण क्षमता तक पहुंचने और राष्ट्रीय मंचों पर जिले और राज्य का प्रतिनिधित्व करने के लिए प्रेरित करती हैं।"
    },
    mission: {
      icon: <Compass size={20} className="text-emerald-600" />,
      title: "हमारा लक्ष्य",
      text: "हमारा लक्ष्य UPMSP मानकों के तहत व्यापक, उच्च गुणवत्ता वाली माध्यमिक और उच्चतर माध्यमिक शिक्षा प्रदान करना है। हम छात्रों में महत्वपूर्ण सोच, आत्म-अनुशासन, सांस्कृतिक विविधता के प्रति सम्मान और शारीरिक फिटनेस को बढ़ावा देने के लिए प्रतिबद्ध हैं।",
      bullets: [
        "अनुभवी शिक्षकों के माध्यम से उत्कृष्ट शैक्षणिक परिणाम बनाए रखना।",
        "व्यावहारिक प्रयोगशाला प्रयोगों और स्मार्ट शिक्षण सहायताओं को एकीकृत करना।",
        "एनसीसी और एनएसएस कार्यक्रमों के माध्यम से नेतृत्व और देशभक्ति सेवा को बढ़ावा देना।"
      ],
      fullText: "हमारा लक्ष्य UPMSP मानकों के तहत व्यापक, उच्च गुणवत्ता वाली माध्यमिक और उच्चतर माध्यमिक शिक्षा प्रदान करना है। हम छात्रों में महत्वपूर्ण सोच, आत्म-अनुशासन, सांस्कृतिक विविधता के प्रति सम्मान और शारीरिक फिटनेस को बढ़ावा देने के लिए प्रतिबद्ध हैं। कठोर कोचिंग, खेल प्रशिक्षण और एनएसएस और एनसीसी जैसे सामुदायिक सेवा कार्यक्रमों के माध्यम से, हम छात्रों को प्रतिस्पर्धी करियर के लिए तैयार करते हैं और साथ ही राष्ट्रीय विरासत और नागरिक कर्तव्य के प्रति गहरा सम्मान जगाते हैं। हम एक सुरक्षित, सहयोगी और अत्यधिक प्रतिस्पर्धी शिक्षण वातावरण बनाने के लिए अभिभावकों और जिला शिक्षा अधिकारियों के साथ मिलकर काम करते हैं।"
    }
  };

  const getTabLabel = (tab) => {
    switch (tab) {
      case 'history': return 'इतिहास';
      case 'vision': return 'दृष्टिकोण';
      case 'mission': return 'लक्ष्य';
      default: return tab;
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
                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop" // College building / classroom
                alt="ठाकुर बीरी सिंह इंटर कॉलेज परिसर"
                className="w-full h-full object-cover"
              />

              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <span className="text-[10px] md:text-xs tracking-wider uppercase font-semibold text-secondary flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>मुख्य परिसर भवन</span>
                </span>
                <h4 className="text-lg md:text-xl font-heading font-extrabold mt-1">
                  75 से अधिक वर्षों की शैक्षणिक विरासत
                </h4>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-6 -right-6 bg-secondary text-primary rounded-2xl p-4 shadow-xl border-4 border-slate-50 text-center max-w-[140px] transform rotate-3 hover:rotate-0 transition-transform duration-300 hidden sm:block">
              <span className="block text-3xl font-heading font-extrabold">1950</span>
              <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-primary-dark">स्थापना वर्ष</span>
            </div>
          </div>

          {/* Right Column: Tabbed Content */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full w-fit">
              हमारे संस्थान के बारे में
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
              ठाकुर बीरी सिंह इंटर कॉलेज
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              माध्यमिक शिक्षा परिषद, उत्तर प्रदेश (UPMSP) से संबद्ध, टूंडला (फिरोजाबाद)।
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
                  <span>{getTabLabel(tab)}</span>
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
              <span>पूरा इतिहास और विवरण पढ़ें</span>
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
                <h4 className="font-heading font-bold text-slate-800 mb-2">संस्थान के प्रमुख मील के पत्थर:</h4>
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
                विंडो बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSchool;
