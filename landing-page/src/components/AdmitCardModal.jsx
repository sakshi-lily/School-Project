import React, { useState, useEffect, useRef } from 'react';
import { X, Search, FileText, Printer, ShieldAlert, RefreshCw } from 'lucide-react';
import SchoolLogo from './SchoolLogo';

const AdmitCardModal = ({ isOpen, onClose }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [admitCard, setAdmitCard] = useState(null);
  const [isAdmitCardDisplayOpen, setIsAdmitCardDisplayOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Captcha State
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const canvasRef = useRef(null);

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/public`;

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let resultText = '';
    for (let i = 0; i < 6; i++) {
      resultText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(resultText);
    setCaptchaInput('');
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setAdmitCard(null);
      setError('');
      setRollNumber('');
      setDateOfBirth('');
      setIsAdmitCardDisplayOpen(false);
    }
  }, [isOpen]);

  // Draw captcha to canvas
  useEffect(() => {
    if (!captchaText || !canvasRef.current || !isOpen) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background color
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 10, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 15) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i + 5);
      ctx.stroke();
    }

    // Noise points
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.15 + 0.05})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Text rendering
    ctx.font = 'bold 22px monospace';
    ctx.textBaseline = 'middle';
    
    const textWidth = ctx.measureText(captchaText).width;
    const startX = (canvas.width - textWidth) / 2;

    for (let i = 0; i < captchaText.length; i++) {
      const char = captchaText[i];
      const charX = startX + i * 18 + Math.random() * 4 - 2;
      const charY = canvas.height / 2 + Math.random() * 6 - 3;
      
      ctx.save();
      ctx.translate(charX, charY);
      ctx.rotate((Math.random() * 24 - 12) * Math.PI / 180);
      
      ctx.fillStyle = `rgb(${Math.random() * 120 + 20}, ${Math.random() * 80 + 10}, ${Math.random() * 120 + 20})`;
      ctx.fillText(char, -8, 0);
      ctx.restore();
    }
  }, [captchaText, isOpen]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!rollNumber || !academicYear || !dateOfBirth || !captchaInput) {
      setError('कृपया अनुक्रमांक, शैक्षणिक वर्ष, जन्म तिथि और कॅप्चा भरें।');
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaText) {
      setError('अमान्य कॅप्चा कोड दर्ज किया गया। कृपया पुनः प्रयास करें।');
      generateCaptcha();
      return;
    }

    setLoading(true);
    setError('');
    setAdmitCard(null);
    setIsAdmitCardDisplayOpen(false);

    try {
      const res = await fetch(`${API_URL}/admit-card/search?rollNumber=${encodeURIComponent(rollNumber)}&academicYear=${encodeURIComponent(academicYear)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`);
      const data = await res.json();
      if (data.success) {
        setAdmitCard(data.data);
        setIsAdmitCardDisplayOpen(true);
      } else {
        setError(data.message || 'कोई रिकॉर्ड नहीं मिला।');
        generateCaptcha();
      }
    } catch (err) {
      setError('सर्वर से कनेक्ट करने में विफल। कृपया बाद में पुनः प्रयास करें।');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">प्रवेश पत्र केंद्र (Admit Card Desk)</h3>
              <p className="text-xs text-slate-500">परीक्षा प्रवेश पत्र डाउनलोड करें</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-5 flex gap-2.5 items-start p-3 bg-rose-50 text-rose-700 rounded-xl text-xs border border-rose-100">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                अनुक्रमांक / पंजीकरण संख्या
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-slate-800"
                  placeholder="उदा. 1024501"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  शैक्षणिक वर्ष
                </label>
                <select 
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none transition text-slate-800"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                >
                  <option value="2026-2027">2026-2027</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  जन्म तिथि
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white outline-none transition text-slate-800"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Captcha Section */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                सुरक्षा कॅप्चा सत्यापन (Captcha)
              </label>
              <div className="flex items-center gap-3">
                <canvas 
                  ref={canvasRef} 
                  width={140} 
                  height={42} 
                  className="rounded border border-slate-200"
                />
                <button 
                  type="button" 
                  onClick={generateCaptcha}
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition"
                  title="नया कॅप्चा कोड जनरेट करें"
                >
                  <RefreshCw size={16} />
                </button>
                <input 
                  type="text" 
                  placeholder="कोड दर्ज करें" 
                  maxLength={6}
                  className="flex-1 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg uppercase font-mono tracking-widest text-center focus:ring-2 focus:ring-primary/20 outline-none text-slate-800"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold shadow-sm hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>रिकॉर्ड खोज रहे हैं...</span>
              ) : (
                <>
                  <Search size={16} />
                  <span>प्रवेश पत्र डाउनलोड करें</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Admit Card Render Display Modal overlay */}
      {isAdmitCardDisplayOpen && admitCard && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 shrink-0 print:hidden">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">
                दस्तावेज़ मिला और सत्यापित
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-750 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <Printer size={14} />
                  <span>प्रिंट / पीडीएफ डाउनलोड</span>
                </button>
                <button 
                  onClick={() => setIsAdmitCardDisplayOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Print Area Sheet */}
            <div className="p-8 overflow-y-auto bg-slate-50 print:bg-white print:p-0 flex-1">
              <div className="bg-white border-2 border-slate-800 p-6 rounded-lg max-w-[650px] mx-auto print:border-none print:shadow-none print:p-0 print:mx-0">
                
                {/* School Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <SchoolLogo size={42} showText={false} />
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-800 leading-tight">ठाकुर बीरी सिंह इंटर कॉलेज</h2>
                      <p className="text-[10px] text-slate-500 font-medium">टूंडला, फ़िरोज़ाबाद (उ.प्र.) - यूपीएमएसपी से संबद्ध</p>
                    </div>
                  </div>
                  <div className="text-right border-l pl-4 border-slate-200">
                    <h3 className="text-sm font-black text-slate-800">परीक्षा प्रवेश पत्र</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">शैक्षणिक सत्र: {admitCard.academicYear}</p>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-3 gap-y-3 gap-x-4 mb-5 text-[11px] border-b pb-4 border-slate-200">
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">छात्र का नाम</span>
                    <span className="font-bold text-slate-800">{admitCard.studentName}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">अनुक्रमांक (Roll No)</span>
                    <span className="font-bold text-slate-800 font-mono">{admitCard.rollNumber}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">कक्षा</span>
                    <span className="font-bold text-slate-800">कक्षा {admitCard.class}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">पिता का नाम</span>
                    <span className="font-bold text-slate-800">{admitCard.fatherName}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">माता का नाम</span>
                    <span className="font-bold text-slate-800">{admitCard.motherName}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">जन्म तिथि</span>
                    <span className="font-bold text-slate-800">{admitCard.dateOfBirth}</span>
                  </div>
                  <div className="col-span-3 border-t pt-2 mt-1">
                    <span className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] mb-0.5">परीक्षा केंद्र</span>
                    <span className="font-bold text-slate-800">{admitCard.examCenter || 'ठाकुर बीरी सिंह इंटर कॉलेज, टूंडला'}</span>
                  </div>
                </div>

                {/* Exam Datesheet Table */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">परीक्षा सारणी / टाइमटेबल</h4>
                  <table className="w-full text-left text-[11px] border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-300">
                        <th className="p-2 border-r border-slate-300 font-bold text-slate-700">विषय का नाम</th>
                        <th className="p-2 border-r border-slate-300 font-bold text-slate-700">परीक्षा तिथि</th>
                        <th className="p-2 font-bold text-slate-700">परीक्षा समय</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admitCard.datesheet && admitCard.datesheet.length > 0 ? (
                        admitCard.datesheet.map((sched, idx) => (
                          <tr key={idx} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50/50">
                            <td className="p-2 border-r border-slate-300 font-semibold text-slate-800">{sched.subject}</td>
                            <td className="p-2 border-r border-slate-300 text-slate-600">{sched.date}</td>
                            <td className="p-2 text-slate-600">{sched.time || '09:00 AM - 12:15 PM'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-slate-400 italic">इस सत्र के लिए कोई परीक्षा पंजीकृत नहीं है</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Instructions & Stamp Footer */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-300 text-[9px] text-slate-500">
                  <div className="col-span-2 space-y-1">
                    <span className="block font-bold text-slate-700 uppercase">परीक्षार्थियों के लिए आवश्यक नियम:</span>
                    <p>1. परीक्षार्थी को परीक्षा शुरू होने से 30 मिनट पहले परीक्षा केंद्र पर पहुंचना अनिवार्य है।</p>
                    <p>2. परीक्षा भवन के अंदर मोबाइल फोन, स्मार्टवॉच या कैलकुलेटर लाना सख्त मना है।</p>
                    <p>3. इस प्रवेश पत्र पर कुछ भी न लिखें।</p>
                  </div>
                  <div className="flex flex-col items-center justify-end border border-dashed border-slate-300 p-2 rounded text-center">
                    <div className="h-8 w-12 border-b border-slate-200 mb-1 flex items-center justify-center text-[7px] text-slate-400">मोहर (Stamp)</div>
                    <span className="font-bold text-slate-700">प्रधानाचार्य के हस्ताक्षर</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Print styles override */}
      <style>{`
        @media print {
          /* Hide everything except the print overlay content */
          body * {
            visibility: hidden !important;
          }
          
          .fixed.inset-0.z-\\[60\\],
          .fixed.inset-0.z-\\[60\\] * {
            visibility: visible !important;
          }

          .fixed.inset-0.z-\\[60\\] {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            overflow: visible !important;
            z-index: auto !important;
          }

          /* Hide print button / close controls */
          .print\\:hidden,
          button,
          .shrink-0 {
            display: none !important;
          }

          /* Reset report card background, borders, and margins */
          .fixed.inset-0.z-\\[60\\] > div {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            position: static !important;
            background: #ffffff !important;
          }

          /* Reset scrollable container padding and height limit */
          .bg-slate-50.print\\:bg-white {
            padding: 0 !important;
            background: #ffffff !important;
            max-height: none !important;
            overflow: visible !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmitCardModal;
