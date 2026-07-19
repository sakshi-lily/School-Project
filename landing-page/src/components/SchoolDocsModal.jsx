import React, { useState } from 'react';
import { X, Search, FileText, Download, Eye, ShieldCheck, Filter, FileSpreadsheet, Image as ImageIcon, Calendar, HardDrive, ExternalLink } from 'lucide-react';

export const SCHOOL_DOCUMENTS = [
  {
    id: "doc-1",
    title: "शासनादेश एवं आधिकारिक परिपत्र संख्या 49205-49327",
    englishTitle: "Government Order & Official Circular No. 49205-49327",
    category: "Govt Orders",
    categoryHindi: "शासनादेश एवं परिपत्र",
    filename: "49205-49327.pdf",
    path: "/school-docs/49205-49327.pdf",
    size: "2.86 MB",
    type: "PDF",
    date: "17 July 2026",
    description: "उत्तर प्रदेश माध्यमिक शिक्षा विभाग द्वारा जारी आधिकारिक शासनादेश एवं विभागीय निर्देश (Official UP MSP Directives)."
  },
  {
    id: "doc-2",
    title: "विद्यालय शासकीय विज्ञप्ति एवं सूचना पत्र",
    englishTitle: "Official School Notice & Announcement Gazette",
    category: "Announcements",
    categoryHindi: "विज्ञप्ति व सूचना",
    filename: "IMG-20260717-WA0008.jpg",
    path: "/school-docs/IMG-20260717-WA0008.jpg",
    size: "185 KB",
    type: "JPG",
    date: "17 July 2026",
    description: "विद्यालय प्रशासन एवं बोर्ड द्वारा जारी आधिकारिक सूचना पत्र एवं परीक्षा सम्बन्धी मुख्य निर्देश।"
  },
  {
    id: "doc-3",
    title: "उत्तर प्रदेश बेसिक एवं माध्यमिक शिक्षा अवकाश नियमावली",
    englishTitle: "U.P. Educational Leave Rules & Regulations Manual",
    category: "Leave Rules",
    categoryHindi: "अवकाश नियमावली",
    filename: "up_avkash_niyamavali.pdf",
    path: "/school-docs/up_avkash_niyamavali.pdf",
    size: "15.25 MB",
    type: "PDF",
    date: "13 July 2026",
    description: "उत्तर प्रदेश शासन एवं माध्यमिक शिक्षा परिषद द्वारा अधिसूचित संपूर्ण अवकाश नियमावली एवं सेवा नियम।"
  },
  {
    id: "doc-4",
    title: "मानव संपदा पोर्टल अवकाश आवेदन नियम व दिशानिर्देश",
    englishTitle: "Manav Sampada Portal Online Leave Application Rules",
    category: "Leave Rules",
    categoryHindi: "मानव संपदा निर्देश",
    filename: "manav_sampada_avkash.pdf",
    path: "/school-docs/manav_sampada_avkash.pdf",
    size: "346 KB",
    type: "PDF",
    date: "13 July 2026",
    description: "मानव संपदा पोर्टल (ehrms.upsdc.gov.in) के माध्यम से ऑनलाइन अवकाश आवेदन करने हेतु दिशानिर्देश।"
  },
  {
    id: "doc-5",
    title: "समस्त प्रकार के अवकाश हेतु आवश्यक नियमावली एवं नियम (भाग-1)",
    englishTitle: "General Staff & Teacher Leave Rules & Guidelines Manual (Part 1)",
    category: "Leave Rules",
    categoryHindi: "अवकाश नियमावली",
    filename: "samast_avkash_niyam.pdf",
    path: "/school-docs/samast_avkash_niyam.pdf",
    size: "3.40 MB",
    type: "PDF",
    date: "13 July 2026",
    description: "शिक्षकों एवं कर्मचारियों हेतु आकस्मिक, अर्जित, चिकित्सा एवं मातृत्व अवकाश के विस्तृत नियम व शर्तें।"
  }
];

const SchoolDocsModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewDoc, setPreviewDoc] = useState(null);

  if (!isOpen) return null;

  const categories = ['All', 'Leave Rules', 'Govt Orders', 'Announcements'];

  const filteredDocs = SCHOOL_DOCUMENTS.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      doc.title.toLowerCase().includes(query) ||
      doc.englishTitle.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.categoryHindi.toLowerCase().includes(query) ||
      doc.filename.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc) => {
    const link = document.createElement('a');
    link.href = doc.path;
    link.download = doc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="bg-secondary text-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <ShieldCheck size={14} />
              आधिकारिक विद्यालय दस्तावेज़
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-white tracking-tight">
            विद्यालय शासकीय एवं सेवा नियमावली दस्तावेज़
          </h2>
          <p className="text-slate-200 text-xs md:text-sm mt-1 max-w-3xl">
            ठाकुर बीरी सिंह इण्टर कॉलेज, टूण्डला (फ़िरोज़ाबाद) - आधिकारिक अवकाश नियमावली, मानव संपदा निर्देश एवं शासकीय परिपत्र।
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mt-6 flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="दस्तावेज़ या नियम खोजें..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder-slate-300 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/20 transition-all"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-secondary text-primary shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat === 'All' ? 'सभी दस्तावेज़' : cat === 'Leave Rules' ? 'अवकाश नियमावली' : cat === 'Govt Orders' ? 'शासनादेश' : 'विज्ञप्ति'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body / Document List */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-slate-50">
          {filteredDocs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <FileText size={48} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-700">कोई दस्तावेज़ नहीं मिला</h3>
              <p className="text-xs text-slate-500 mt-1">कृपया अपना खोज शब्द या फ़िल्टर बदलकर पुनः प्रयास करें।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide flex items-center gap-1 ${
                        doc.type === 'PDF' 
                          ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}>
                        {doc.type === 'PDF' ? <FileText size={12} /> : <ImageIcon size={12} />}
                        {doc.type} • {doc.size}
                      </span>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Calendar size={11} />
                        {doc.date}
                      </span>
                    </div>

                    {/* Document Title */}
                    <h3 className="font-heading font-bold text-slate-800 text-sm md:text-base group-hover:text-primary transition-colors leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {doc.englishTitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-500 mt-2.5 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {doc.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Eye size={14} />
                      <span>देखें</span>
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="flex-1 py-2 px-3 bg-secondary hover:bg-secondary-dark text-primary font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Download size={14} />
                      <span>डाउनलोड करें ({doc.type})</span>
                    </button>
                    <a
                      href={doc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                      title="नये विंडो में खोलें"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 text-center text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-2">
          <span>कुल दस्तावेज़: {filteredDocs.length} | ठाकुर बीरी सिंह इण्टर कॉलेज, टूण्डला</span>
          <button
            onClick={onClose}
            className="text-primary hover:underline font-bold text-xs"
          >
            बंद करें
          </button>
        </div>
      </div>

      {/* Embedded Document Preview Modal Overlay */}
      {previewDoc && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-white mb-4">
            <div>
              <h3 className="font-bold text-base md:text-lg">{previewDoc.title}</h3>
              <p className="text-xs text-slate-300">{previewDoc.englishTitle} ({previewDoc.size})</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDownload(previewDoc)}
                className="bg-secondary text-primary font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-secondary-light transition-all"
              >
                <Download size={14} />
                <span>फ़ाइल डाउनलोड करें</span>
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl relative">
            {previewDoc.type === 'JPG' ? (
              <div className="w-full h-full flex items-center justify-center p-4 bg-slate-900">
                <img
                  src={previewDoc.path}
                  alt={previewDoc.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <iframe
                src={previewDoc.path}
                title={previewDoc.title}
                className="w-full h-full border-0"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolDocsModal;
