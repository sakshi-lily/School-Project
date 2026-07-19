import React, { useState, useEffect } from 'react';
import { X, BookOpen, Download, Search, Sparkles } from 'lucide-react';

const SyllabusModal = ({ isOpen, onClose }) => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/public`;

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/syllabus`;
      if (selectedClass) {
        url += `?class=${encodeURIComponent(selectedClass)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setSyllabusList(data.data);
      }
    } catch (err) {
      console.error('Error fetching syllabus list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSyllabus();
    }
  }, [isOpen, selectedClass]);

  if (!isOpen) return null;

  // Filter lists based on title/subject search
  const filteredList = syllabusList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 my-8 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">पाठ्यक्रम एवं विषय विवरण</h3>
              <p className="text-xs text-slate-500">कक्षा अनुसार पाठ्यक्रम और निर्देशिका डाउनलोड करें</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filters bar */}
        <div className="p-6 pb-4 border-b border-slate-100 bg-white space-y-3 shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-slate-800"
                placeholder="विषय या पाठ्यक्रम का नाम खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Class Dropdown Filter */}
            <div className="w-full sm:w-48">
              <select 
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none transition text-slate-800"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">सभी कक्षाएं</option>
                <option value="11">कक्षा 11</option>
                <option value="12">कक्षा 12</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500" />
              <span className="text-sm">पाठ्यक्रम निर्देशिका प्राप्त की जा रही है...</span>
            </div>
          ) : filteredList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredList.map((syllabus) => {
                // Strip "/api" from base url if configured in order to point to server base
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const backendUrl = apiUrl.replace(/\/api$/, '');
                const fileUrl = `${backendUrl}${syllabus.pdfUrl}`;

                return (
                  <div 
                    key={syllabus._id}
                    className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow transition flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          कक्षा {syllabus.class}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {syllabus.academicYear}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-800 mb-1 leading-snug">
                        {syllabus.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        विषय: <span className="font-semibold text-slate-700">{syllabus.subject}</span>
                      </p>
                    </div>

                    <a 
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-slate-50 hover:bg-teal-600 hover:text-white text-slate-700 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 border border-slate-100 hover:border-teal-600 shadow-sm"
                    >
                      <Download size={14} />
                      <span>पाठ्यक्रम पीडीफ़ डाउनलोड करें</span>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Sparkles size={36} className="text-slate-300 mb-3" />
              <p className="font-semibold text-sm text-slate-600">कोई पाठ्यक्रम दस्तावेज नहीं मिला</p>
              <p className="text-xs text-slate-400 mt-1">कृपया कोई अन्य कक्षा चुनें या खोज शब्द बदलें</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SyllabusModal;
