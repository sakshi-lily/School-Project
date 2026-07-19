import React, { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

const AcademicCalendarModal = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('All');

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/public`;

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/calendar`);
      const data = await response.json();
      if (data.success) {
        setEvents(data.data || []);
      } else {
        setError(data.message || 'कैलेंडर कार्यक्रम लोड करने में विफल।');
      }
    } catch (err) {
      setError('सर्वर से कनेक्ट करने में विफल। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const eventTypes = [
    { key: 'All', label: 'सभी' },
    { key: 'Holiday', label: 'अवकाश' },
    { key: 'Exam', label: 'परीक्षा' },
    { key: 'Event', label: 'कार्यक्रम' },
    { key: 'Meeting', label: 'बैठक' }
  ];

  const filteredEvents = filterType === 'All' 
    ? events 
    : events.filter(e => e.type === filterType);

  const getTagColor = (type) => {
    switch (type) {
      case 'Holiday': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Exam': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Event': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Meeting': return 'bg-sky-50 text-sky-600 border-sky-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getTagLabel = (type) => {
    switch (type) {
      case 'Holiday': return 'अवकाश';
      case 'Exam': return 'परीक्षा';
      case 'Event': return 'कार्यक्रम';
      case 'Meeting': return 'बैठक';
      default: return type;
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-primary text-white border-b border-white/10">
          <div className="flex items-center gap-2">
            <Calendar size={24} className="text-secondary" />
            <h2 className="font-heading font-extrabold text-base md:text-lg">शैक्षणिक कैलेंडर</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mr-2">फ़िल्टर:</span>
          {eventTypes.map((item) => (
            <button
              key={item.key}
              onClick={() => setFilterType(item.key)}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all border ${
                filterType === item.key 
                  ? 'bg-primary text-white border-primary shadow-sm' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Events Panel */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              <p className="text-slate-500 text-sm mt-3 font-semibold">कार्यक्रम लोड हो रहे हैं...</p>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-semibold">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Calendar size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold">चयनित फ़िल्टर के अनुसार कोई शैक्षणिक कार्यक्रम नहीं मिला।</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div 
                  key={event._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-slate-200 hover:shadow-sm transition-all bg-white gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100 text-primary">
                      <span className="text-[10px] font-bold uppercase">
                        {new Date(event.date).toLocaleDateString('hi-IN', { month: 'short' })}
                      </span>
                      <span className="text-lg font-extrabold -mt-1">
                        {new Date(event.date).toLocaleDateString('hi-IN', { day: 'numeric' })}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-800 text-sm md:text-base leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-1">
                        {event.description || 'कोई अतिरिक्त विवरण उपलब्ध नहीं है।'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 justify-between sm:justify-end shrink-0">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border ${getTagColor(event.type)}`}>
                      {getTagLabel(event.type)}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {event.academicYear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs md:text-sm transition-all"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendarModal;
