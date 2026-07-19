import React, { useState, useEffect, useRef } from 'react';
import { X, Search, FileText, Printer, ShieldAlert, Award, RefreshCw } from 'lucide-react';

const ResultPortalModal = ({ isOpen, onClose }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [years, setYears] = useState([]);
  const [result, setResult] = useState(null);
  const [isResultDisplayOpen, setIsResultDisplayOpen] = useState(false);
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
      fetchYears();
      generateCaptcha();
      // Reset search state on open
      setResult(null);
      setError('');
      setRollNumber('');
      setDateOfBirth('');
      setIsResultDisplayOpen(false);
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

  const fetchYears = async () => {
    try {
      const res = await fetch(`${API_URL}/results/years`);
      const data = await res.json();
      if (data.success) {
        setYears(data.years);
        if (data.years.length > 0) {
          setAcademicYear(data.years[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching academic years:', err);
    }
  };

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
    setResult(null);
    setIsResultDisplayOpen(false);

    try {
      const res = await fetch(`${API_URL}/results/search?rollNumber=${encodeURIComponent(rollNumber)}&academicYear=${encodeURIComponent(academicYear)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`);
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        setIsResultDisplayOpen(true);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 print:hidden">
        
        {/* Header (Hidden on Print) */}
        <div className="flex justify-between items-center px-6 py-4 bg-primary text-white border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <Award size={24} className="text-secondary" />
            <h2 className="font-heading font-extrabold text-lg">सार्वजनिक परिणाम सत्यापन पोर्टल</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Panel (Hidden on Print) */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 print:hidden">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">छात्र अनुक्रमांक (Roll Number)</label>
                <input
                  type="text"
                  placeholder="उदा. 26105342"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">जन्म तिथि</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">शैक्षणिक वर्ष</label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                >
                  {years.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Security Captcha */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">सुरक्षा कॅप्चा (Captcha)</label>
                <div className="flex gap-2 items-center">
                  <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0" style={{ width: '130px', height: '44px' }}>
                    <canvas ref={canvasRef} width="130" height="44" />
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl transition-all"
                    title="कॅप्चा रीलोड करें"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <input
                    type="text"
                    placeholder="सुरक्षा कोड दर्ज करें"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    maxLength="6"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>खोज रहे हैं...</span>
                  ) : (
                    <>
                      <Search size={18} />
                      <span>परिणाम खोजें</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          <p className="text-[11px] text-slate-400 mt-2">
            * नोट: ऑनलाइन सार्वजनिक सत्यापन के लिए केवल पिछले 3 शैक्षणिक वर्ष उपलब्ध हैं।
          </p>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[60vh] print:max-h-none print:p-0 print:overflow-visible">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-semibold animate-shake print:hidden">
              <ShieldAlert size={20} className="text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 print:hidden">
              <FileText size={48} className="text-slate-300 mb-3" />
              <p className="font-semibold">ऊपर अनुक्रमांक दर्ज करें और शैक्षणिक वर्ष चुनें</p>
              <p className="text-xs text-slate-400">परिणाम स्वचालित रूप से लोड किए जाएंगे</p>
            </div>
          )}

          {result && !isResultDisplayOpen && (
            <div className="flex flex-col items-center justify-center py-8 text-center text-emerald-600 print:hidden">
              <p className="font-bold text-sm">परिणाम सफलतापूर्वक लोड हुआ!</p>
              <button
                onClick={() => setIsResultDisplayOpen(true)}
                className="mt-2 text-xs text-primary underline font-semibold hover:text-primary-dark"
              >
                अंकपत्र (Marksheet) देखें
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Result Display Popup Modal (New Overlay) */}
      {isResultDisplayOpen && result && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:relative print:block">
          <div className="relative w-full h-full md:w-screen md:h-screen bg-slate-100 flex flex-col overflow-hidden transform transition-all duration-300 print:border-none print:shadow-none print:rounded-none print:max-w-full print:w-full print:static">
            
            {/* Header (Hidden on Print) */}
            <div className="flex justify-between items-center px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 flex-shrink-0 print:hidden">
              <div className="flex items-center gap-2">
                <Award size={20} className="text-secondary" />
                <h3 className="font-heading font-extrabold text-xs md:text-sm tracking-wide uppercase">अकादमिक अंकपत्र (Statement of Marks)</h3>
              </div>
              <div className="flex items-center gap-3">
                {/* Highlighted Print Button */}
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-750 text-white font-extrabold rounded-xl text-xs md:text-sm transition-all shadow-lg hover:shadow-emerald-600/35 border border-emerald-500 hover:scale-105 active:scale-95 animate-pulse"
                >
                  <Printer size={16} />
                  <span>अंकपत्र प्रिंट करें (PDF)</span>
                </button>
                <button 
                  onClick={() => setIsResultDisplayOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="परिणाम बंद करें"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Marksheet Design Panel (Compact spacing to fit one screen) */}
            <div className="flex-1 p-3 md:p-5 overflow-y-auto print:max-h-none print:p-0 print:overflow-visible bg-slate-100 print:bg-white flex justify-center items-center">
              <div className="print-area w-full max-w-3xl flex-shrink-0">
                <div className="border-4 border-double border-slate-350 p-4 md:p-5 rounded-2xl bg-white print:border-slate-800 print:p-0 print:rounded-none shadow-lg print:shadow-none">
                  
                  {/* School Header */}
                  <div className="text-center border-b-2 border-slate-300 pb-2 mb-3 print:border-slate-800">
                    <h3 className="font-heading font-extrabold text-lg text-slate-800 tracking-tight uppercase">
                      ठाकुर बीरी सिंह इंटर कॉलेज
                    </h3>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                      टूंडला, फ़िरोज़ाबाद, उत्तर प्रदेश, भारत
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      यूपीएमएसपी कोड: 1012 | स्थापना: 1950
                    </p>
                    <div className="mt-2 bg-slate-100 py-1 px-2.5 inline-block rounded-lg font-heading font-extrabold text-[10px] text-primary uppercase print:bg-slate-250 print:text-black border border-slate-200">
                      अकादमिक अंकपत्र ({result.academicYear})
                    </div>
                  </div>

                  {/* Student Info Grid */}
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-slate-700 border-b border-slate-200 pb-2 mb-3 print:grid-cols-2 print:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">छात्र का नाम:</span>
                      <p className="font-extrabold text-slate-800 text-sm uppercase">{result.studentName}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">अनुक्रमांक (Roll No):</span>
                      <p className="font-extrabold text-slate-800 text-sm tracking-wider">{result.rollNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">कक्षा एवं वर्ग:</span>
                      <p className="font-bold text-slate-700 uppercase">{result.class}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">परीक्षा सत्र:</span>
                      <p className="font-bold text-slate-700 uppercase">{result.term} परीक्षा</p>
                    </div>
                  </div>

                  {/* Marks Table */}
                  <table className="w-full border-collapse border border-slate-200 text-xs mb-3 print:border-slate-800">
                    <thead>
                      <tr className="bg-slate-50 print:bg-slate-100">
                        <th className="border border-slate-200 px-3 py-1.5 text-left font-bold text-slate-700 uppercase tracking-wider print:border-slate-800">विषय का नाम</th>
                        <th className="border border-slate-200 px-3 py-1.5 text-center font-bold text-slate-700 uppercase tracking-wider w-24 print:border-slate-800">अधिकतम अंक</th>
                        <th className="border border-slate-200 px-3 py-1.5 text-center font-bold text-slate-700 uppercase tracking-wider w-28 print:border-slate-800">प्राप्तांक</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjectMarks.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="border border-slate-200 px-3 py-1.5 font-semibold text-slate-800 print:border-slate-800 uppercase">{sub.subject}</td>
                          <td className="border border-slate-200 px-3 py-1.5 text-center text-slate-600 print:border-slate-800">{sub.maxMarks || 100}</td>
                          <td className={`border border-slate-200 px-3 py-1.5 text-center font-bold print:border-slate-800 ${sub.marksObtained < (sub.maxMarks || 100) * 0.33 ? 'text-rose-600' : 'text-slate-800'}`}>
                            {sub.marksObtained}
                            {sub.marksObtained < (sub.maxMarks || 100) * 0.33 && <span className="text-[9px] text-rose-500 font-bold ml-1 print:text-rose-800">*F</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Summary Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl print:grid-cols-4 print:bg-slate-100 print:border-slate-800">
                    <div className="text-center md:text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">कुल प्राप्तांक</span>
                      <p className="font-extrabold text-slate-800 text-sm md:text-base">{result.totalMarks} / {result.maxTotalMarks}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">प्रतिशत</span>
                      <p className="font-extrabold text-slate-800 text-sm md:text-base">{result.percentage}%</p>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">श्रेणी (Grade)</span>
                      <p className="font-extrabold text-slate-800 text-sm md:text-base">{result.grade}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">परिणाम स्थिति</span>
                      <p className={`font-extrabold text-sm md:text-base uppercase ${result.percentage >= 33 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {result.percentage >= 33 ? 'उत्तीर्ण (PASS)' : 'अनुत्तीर्ण (FAIL)'}
                      </p>
                    </div>
                  </div>

                  {/* Disclaimers / Signatures */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-end print:border-slate-800">
                    <div className="text-[9px] text-slate-400 max-w-md leading-relaxed">
                      <p className="font-semibold">* उत्तीर्ण मापदंड: प्रत्येक विषय में न्यूनतम 33% अंक आवश्यक हैं।</p>
                      <p className="mt-0.5">अस्वीकरण: यह एक ऑनलाइन जनरेटेड अंकपत्र है। किसी भी विसंगति के मामले में, टीबीएस इंटर कॉलेज का आधिकारिक रिकॉर्ड अंतिम माना जाएगा।</p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-px bg-slate-450 mb-1.5 print:bg-slate-800"></div>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">कार्यालय कुलसचिव (Registrar)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic print-specific styles */}
      <style>{`
        @media print {
          /* Hide all landing page wrapper content and modals with print:hidden */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Reset page dimensions and backgrounds */
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            height: auto !important;
            overflow: visible !important;
          }

          /* Override the search modal backdrop wrapper on print to be transparent & layout-less */
          .fixed.inset-0.z-50 {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            overflow: visible !important;
            box-shadow: none !important;
            z-index: auto !important;
          }

          /* Override Results Display modal overlay container */
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

          /* Ensure marksheet content fits page width cleanly */
          .print-area {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Ensure colors and backgrounds print correctly */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultPortalModal;
