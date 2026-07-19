import React from 'react';
import { Users, Tv, FlaskConical, Cpu, BookOpen, Trophy, ShieldCheck, TrendingUp } from 'lucide-react';

const WhyChooseUs = () => {
  const cards = [
    {
      icon: <Users size={24} />,
      title: "अनुभवी शिक्षक",
      desc: "हमारे संकाय में यू.पी. बोर्ड पाठ्यक्रम के तहत दशकों के शैक्षणिक अनुभव वाले अत्यधिक योग्य, सरकार द्वारा प्रमाणित शिक्षक शामिल हैं।",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: <Tv size={24} />,
      title: "स्मार्ट कक्षाएं",
      desc: "दृश्य शिक्षण को आकर्षक और प्रभावी बनाने के लिए इंटरैक्टिव प्रोजेक्टर, ऑडियो-विजुअल सिस्टम और डिजिटल बोर्ड से सुसज्जित।",
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      icon: <FlaskConical size={24} />,
      title: "विज्ञान प्रयोगशालाएं",
      desc: "सुरक्षा-निर्देशित नियमों के तहत व्यावहारिक प्रयोग की अनुमति देने वाली पूरी तरह से सुसज्जित भौतिकी, रसायन विज्ञान और जीव विज्ञान प्रयोगशालाएं।",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      icon: <Cpu size={24} />,
      title: "कंप्यूटर लैब",
      desc: "छात्रों को आवश्यक कोडिंग, डिजिटल कौशल और आईटी बुनियादी बातें सिखाने के लिए उच्च गति वाले इंटरनेट से सुसज्जित अत्याधुनिक कंप्यूटर केंद्र।",
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      icon: <BookOpen size={24} />,
      title: "विशाल पुस्तकालय",
      desc: "छात्रों के समग्र संदर्भ के लिए हजारों संदर्भ पुस्तकों, पाठ्यपुस्तकों, पत्रिकाओं और समाचार पत्रों से युक्त एक शांत पठन स्थल।",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      icon: <Trophy size={24} />,
      title: "खेलकूद एवं एथलेटिक्स",
      desc: "क्रिकेट, फुटबॉल, बास्केटबॉल के लिए विशाल खेल मैदानों और राज्य स्तरीय प्रतियोगिताओं के लिए प्रशिक्षण के माध्यम से शारीरिक फिटनेस को बढ़ावा देना।",
      color: "text-rose-600 bg-rose-50 border-rose-100"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "कठोर अनुशासन",
      desc: "चरित्र निर्माण और समयनिष्ठ उपस्थिति सुनिश्चित करना। समाज सेवा सिखाने के लिए सक्रिय एनसीसी और एनएसएस विंग द्वारा समर्थित।",
      color: "text-teal-600 bg-teal-50 border-teal-100"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "उत्कृष्ट परिणाम",
      desc: "यू.पी. बोर्ड हाई स्कूल और इंटरमीडिएट परीक्षाओं में लगातार 100% उत्तीर्ण प्रतिशत, जिसमें कई जिला टॉपर शामिल हैं।",
      color: "text-cyan-600 bg-cyan-50 border-cyan-100"
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            हमारे प्रमुख स्तंभ
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            ठाकुर बीरी सिंह इंटर कॉलेज क्यों चुनें?
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            70 से अधिक वर्षों से, हम सफल भविष्य को आकार देने के लिए पारंपरिक मूल्यों को आधुनिक शिक्षण बुनियादी ढांचे के साथ मिलाते हैं।
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-premium-hover hover:border-primary/10 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col gap-4"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                {card.icon}
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-heading font-extrabold text-base md:text-lg text-slate-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
