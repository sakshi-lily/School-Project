import React, { useState, useEffect } from 'react';
import { X, Send, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';

const AdmissionInquiryModal = ({ isOpen, onClose }) => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [stream, setStream] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/public`;

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setStudentName('');
      setParentName('');
      setParentEmail('');
      setParentPhone('');
      setClassGrade('');
      setStream('');
      setMessage('');
      setSuccess(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Extra validation for stream if XI or XII is selected
    if ((classGrade === 'XI' || classGrade === 'XII') && !stream) {
      setError('कृपया कक्षा 11 / 12 में प्रवेश के लिए वर्ग (स्ट्रीम) का चयन करें।');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          parentName,
          parentEmail,
          parentPhone,
          classGrade,
          stream: ['XI', 'XII'].includes(classGrade) ? stream : '',
          message,
          academicYear: '2026-2027',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'पूछताछ जमा करने में विफल। कृपया पुनः प्रयास करें।');
      }
    } catch (err) {
      setError('सर्वर से कनेक्ट करने में विफल। कृपया बाद में पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-primary text-white border-b border-white/10">
          <div className="flex items-center gap-2">
            <GraduationCap size={24} className="text-secondary" />
            <h2 className="font-heading font-extrabold text-base md:text-lg">प्रवेश पूछताछ फॉर्म</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Panel */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 px-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">पूछताछ सफलतापूर्वक जमा हो गई!</h3>
              <p className="text-slate-500 text-sm max-w-md">
                ठाकुर बीरी सिंह इण्टर कॉलेज में आपकी रुचि के लिए धन्यवाद। हमारा प्रवेश विभाग आपके विवरण की समीक्षा करेगा और शीघ्र ही आपसे संपर्क करेगा।
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md"
              >
                फॉर्म बंद करें
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">छात्र / छात्रा का नाम</label>
                  <input
                    type="text"
                    placeholder="पूरा नाम"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">अभिभावक / माता-पिता का नाम</label>
                  <input
                    type="text"
                    placeholder="पूरा नाम"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">अभिभावक का ईमेल</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">अभिभावक का मोबाइल नंबर</label>
                  <input
                    type="tel"
                    placeholder="उदा. 9876543210"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">इच्छित कक्षा</label>
                  <select
                    value={classGrade}
                    onChange={(e) => {
                      setClassGrade(e.target.value);
                      if (!['XI', 'XII'].includes(e.target.value)) setStream('');
                    }}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  >
                    <option value="" disabled>कक्षा चुनें</option>
                    <option value="IX">कक्षा 9 (Class IX)</option>
                    <option value="X">कक्षा 10 (Class X)</option>
                    <option value="XI">कक्षा 11 (Class XI)</option>
                    <option value="XII">कक्षा 12 (Class XII)</option>
                  </select>
                </div>

                {['XI', 'XII'].includes(classGrade) ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">वर्ग / संकाय (Stream)</label>
                    <select
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                      required
                    >
                      <option value="" disabled>वर्ग चुनें</option>
                      <option value="Science">विज्ञान वर्ग (Science)</option>
                      <option value="Commerce">वाणिज्य वर्ग (Commerce)</option>
                      <option value="Arts">कला वर्ग (Arts)</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">शैक्षणिक सत्र</label>
                    <input
                      type="text"
                      value="2026-2027"
                      disabled
                      className="px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 text-xs md:text-sm font-semibold cursor-not-allowed"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">पूछताछ विवरण / संदेश</label>
                <textarea
                  rows="3"
                  placeholder="शुल्क, पाठ्यक्रम, प्रवेश आदि के संबंध में अपने प्रश्न पूछें..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs md:text-sm transition-all"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>जमा किया जा रहा है...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>पूछताछ जमा करें</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionInquiryModal;
