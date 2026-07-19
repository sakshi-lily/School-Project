import React from 'react';
import { FileText, Download, Eye, ShieldCheck, ArrowRight, ExternalLink, Calendar, HardDrive, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import { SCHOOL_DOCUMENTS } from './SchoolDocsModal';

const SchoolDocsSection = ({ onOpenDocs }) => {
  return (
    <section id="school-docs" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-xs md:text-sm font-heading font-extrabold text-secondary tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
              <ShieldCheck size={16} className="text-secondary" />
              आधिकारिक विद्यालय दस्तावेज़ (Official Downloads)
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mt-4 leading-tight">
              शासकीय शासनादेश, सूचना एवं अवकाश नियमावली
            </h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
              उत्तर प्रदेश बेसिक एवं माध्यमिक शिक्षा विभाग द्वारा अधिसूचित अवकाश नियमावली, मानव संपदा पोर्टल निर्देश एवं विद्यालय शासकीय परिपत्र।
            </p>
          </div>

          <button
            onClick={onOpenDocs}
            className="self-start md:self-auto bg-secondary hover:bg-secondary-light text-primary font-bold px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-secondary/20 text-xs md:text-sm group"
          >
            <span>सभी दस्तावेज़ देखें (View All Documents)</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHOOL_DOCUMENTS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/5 border border-white/10 hover:border-secondary/50 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1.5 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Format and Date Header */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                    doc.type === 'PDF' 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {doc.type === 'PDF' ? <FileText size={12} /> : <ImageIcon size={12} />}
                    {doc.type} • {doc.size}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/5">
                    <Calendar size={11} className="text-secondary" />
                    {doc.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-white text-base md:text-lg group-hover:text-secondary transition-colors leading-snug">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {doc.englishTitle}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  {doc.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={onOpenDocs}
                  className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Eye size={14} className="text-secondary" />
                  <span>देखें (View)</span>
                </button>
                <a
                  href={doc.path}
                  download={doc.filename}
                  className="flex-1 py-2.5 px-3 bg-secondary hover:bg-secondary-light text-primary font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-secondary/10"
                >
                  <Download size={14} />
                  <span>डाउनलोड (PDF)</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Info */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm md:text-base">शासकीय एवं विद्यालय दस्तावेज़ पोर्टल</h4>
              <p className="text-xs text-slate-300 mt-0.5">सभी दस्तावेज़ उत्तर प्रदेश माध्यमिक शिक्षा परिषद एवं विद्यालय प्रशासन द्वारा प्रमाणित हैं।</p>
            </div>
          </div>
          <button
            onClick={onOpenDocs}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-all border border-white/10"
          >
            और दस्तावेज़ खोजें (Search Docs)
          </button>
        </div>

      </div>
    </section>
  );
};

export default SchoolDocsSection;
