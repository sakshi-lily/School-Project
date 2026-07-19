import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';

const PrincipalMessage = () => {
  const [showModal, setShowModal] = useState(false);

  const fullMessage = `प्रिय छात्रों, अभिभावकों और शुभचिंतकों,

ठाकुर बीरी सिंह इंटर कॉलेज, टूंडला में आपका स्वागत करते हुए मुझे अत्यंत प्रसन्नता हो रही है। 1950 में अपनी स्थापना के बाद से, हम अपने सभी छात्रों के लिए एक उच्च-प्राप्ति, अनुशासित और पोषण युक्त वातावरण बनाने के लिए प्रतिबद्ध रहे हैं।

शिक्षा केवल तथ्यों को सीखना नहीं है; यह मन को सोचने और हृदय को महसूस करने के लिए प्रशिक्षित करने के बारे में है। हमारे अत्यधिक अनुभवी शिक्षकों की टीम यह सुनिश्चित करने के लिए अथक प्रयास करती है कि हमारे छात्र न केवल UPMSP बोर्ड परीक्षाओं में उत्कृष्ट अंक प्राप्त करें, बल्कि उनमें मजबूत नैतिक चरित्र, राष्ट्रीय गौरव और 21वीं सदी में आवश्यक विश्लेषणात्मक कौशल भी विकसित हों।

हमने बदलते शैक्षणिक परिदृश्य के साथ तालमेल बनाए रखने के लिए अपनी कक्षाओं और विज्ञान प्रयोगशालाओं का लगातार आधुनिकीकरण किया है। हमारा ध्यान योग्यता, समावेशिता और खेलों, कला, एनसीसी (NCC) और एनएसएस (NSS) पहलों के माध्यम से समग्र विकास पर बना हुआ है। मैं आप सभी को हमारे साथ हाथ मिलाने के लिए आमंत्रित करता हूँ क्योंकि हम अगली पीढ़ी को एक उज्ज्वल और उद्देश्यपूर्ण भविष्य की ओर मार्गदर्शन करते हैं।

जय हिंद!

सादर,

श्री आर. एम. पंगोरिया
प्रधानाचार्य, ठाकुर बीरी सिंह इंटर कॉलेज`;

  return (
    <section id="principal-message" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-premium relative overflow-hidden">

          {/* Decorative background quote icon */}
          <div className="absolute -right-8 -bottom-8 text-primary/5 select-none pointer-events-none hidden md:block">
            <Quote size={240} strokeWidth={1} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Principal Photo */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop" // Professional educator photo
                  alt="श्री आर. एम. पंगोरिया - प्रधानाचार्य"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="font-heading font-extrabold text-lg md:text-xl text-slate-800">
                  श्री आर. एम. पंगोरिया
                </h3>
                <p className="text-xs md:text-sm font-semibold text-secondary-dark uppercase tracking-wider mt-0.5">
                  प्रधानाचार्य, पी.एच.डी., एम.एड.
                </p>
                <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">
                  ठाकुर बीरी सिंह इंटर कॉलेज
                </p>
              </div>
            </div>

            {/* Principal Message Content */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="text-primary-light mb-4">
                <Quote size={40} className="fill-primary/5 text-primary opacity-60" />
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                प्रधानाचार्य का संदेश
              </h2>

              <div className="h-1.5 w-20 bg-secondary rounded-full mt-3 mb-6"></div>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium italic">
                "ठाकुर बीरी सिंह इंटर कॉलेज, टूंडला में आपका स्वागत है। 1950 में अपनी स्थापना के बाद से, हम अपने सभी छात्रों के लिए एक उच्च-प्राप्ति, अनुशासित और पोषण युक्त वातावरण बनाने के लिए प्रतिबद्ध रहे हैं। शिक्षा केवल तथ्यों को सीखना नहीं है; यह मन को सोचने और हृदय को महसूस करने के लिए प्रशिक्षित करने के बारे में है..."
              </p>

              {/* Signature */}
              <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="font-heading font-bold text-xs text-slate-500 uppercase tracking-wider">
                    आधिकारिक हस्ताक्षर
                  </p>
                  <p className="font-serif italic text-2xl text-primary font-bold mt-1.5 opacity-90 select-none">
                    RMPangoria
                  </p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    श्री आर. एम. पंगोरिया
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="bg-primary hover:bg-primary-dark text-white font-heading font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-colors shadow-md flex items-center justify-center gap-1.5 w-fit"
                >
                  <span>पूरा संदेश पढ़ें</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-white">
                प्रधानाचार्य का पूर्ण संदेश
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] text-xs md:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
              {fullMessage}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-xl text-xs md:text-sm transition-colors"
              >
                संदेश बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PrincipalMessage;
