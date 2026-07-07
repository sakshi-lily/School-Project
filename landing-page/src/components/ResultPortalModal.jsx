import React, { useState, useEffect } from 'react';
import { X, Search, FileText, Printer, ShieldAlert, Award } from 'lucide-react';

const ResultPortalModal = ({ isOpen, onClose }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [years, setYears] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/public';

  useEffect(() => {
    if (isOpen) {
      fetchYears();
      // Reset search state on open
      setResult(null);
      setError('');
      setRollNumber('');
    }
  }, [isOpen]);

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
    if (!rollNumber || !academicYear) {
      setError('Please fill in both Roll Number and Academic Year.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/results/search?rollNumber=${encodeURIComponent(rollNumber)}&academicYear=${encodeURIComponent(academicYear)}`);
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message || 'No records found.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:relative print:block">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 print:border-none print:shadow-none print:rounded-none print:max-w-full print:w-full print:static">
        
        {/* Header (Hidden on Print) */}
        <div className="flex justify-between items-center px-6 py-4 bg-primary text-white border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <Award size={24} className="text-secondary" />
            <h2 className="font-heading font-extrabold text-lg">Public Result Verification Portal</h2>
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
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Student Roll Number</label>
              <input
                type="text"
                placeholder="e.g. 26105342"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Academic Year</label>
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

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Search Results</span>
                  </>
                )}
              </button>
            </div>
          </form>
          <p className="text-[11px] text-slate-400 mt-2">
            * Note: Only the latest 3 academic years are accessible for online public verification.
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
              <p className="font-semibold">Enter Roll Number and select Academic Year above</p>
              <p className="text-xs text-slate-400">Results will be loaded dynamically</p>
            </div>
          )}

          {result && (
            <div className="print-area">
              {/* Marksheet Design */}
              <div className="border-4 border-double border-slate-300 p-6 rounded-2xl bg-white print:border-slate-800 print:p-0 print:rounded-none">
                
                {/* School Header */}
                <div className="text-center border-b-2 border-slate-300 pb-4 mb-6 print:border-slate-800">
                  <h3 className="font-heading font-extrabold text-xl text-slate-800 tracking-tight uppercase">
                    THAKUR BIRI SINGH INTER COLLEGE
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    Tundla, Firozabad, Uttar Pradesh, India
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    UPMSP Code: 1053 | Estd: 1950
                  </p>
                  <div className="mt-4 bg-slate-100 py-1.5 px-3 inline-block rounded-lg font-heading font-extrabold text-xs text-primary uppercase print:bg-slate-200">
                    ACADEMIC STATEMENT OF MARKS ({result.academicYear})
                  </div>
                </div>

                {/* Student Info Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-700 border-b border-slate-200 pb-4 mb-6 print:grid-cols-2 print:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Student Name:</span>
                    <p className="font-extrabold text-slate-800 text-base uppercase">{result.studentName}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Roll Number:</span>
                    <p className="font-extrabold text-slate-800 text-base tracking-wider">{result.rollNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Class & Section:</span>
                    <p className="font-bold text-slate-700 uppercase">{result.class}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Examination Term:</span>
                    <p className="font-bold text-slate-700 uppercase">{result.term} Examination</p>
                  </div>
                </div>

                {/* Marks Table */}
                <table className="w-full border-collapse border border-slate-200 text-sm mb-6 print:border-slate-800">
                  <thead>
                    <tr className="bg-slate-50 print:bg-slate-100">
                      <th className="border border-slate-200 px-4 py-2 text-left font-bold text-slate-700 uppercase tracking-wider print:border-slate-800">Subject Name</th>
                      <th className="border border-slate-200 px-4 py-2 text-center font-bold text-slate-700 uppercase tracking-wider w-28 print:border-slate-800">Max Marks</th>
                      <th className="border border-slate-200 px-4 py-2 text-center font-bold text-slate-700 uppercase tracking-wider w-36 print:border-slate-800">Marks Obtained</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.subjectMarks.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="border border-slate-200 px-4 py-2.5 font-semibold text-slate-800 print:border-slate-800 uppercase">{sub.subject}</td>
                        <td className="border border-slate-200 px-4 py-2.5 text-center text-slate-600 print:border-slate-800">{sub.maxMarks || 100}</td>
                        <td className={`border border-slate-200 px-4 py-2.5 text-center font-bold print:border-slate-800 ${sub.marksObtained < (sub.maxMarks || 100) * 0.33 ? 'text-rose-600' : 'text-slate-800'}`}>
                          {sub.marksObtained}
                          {sub.marksObtained < (sub.maxMarks || 100) * 0.33 && <span className="text-[10px] text-rose-500 font-bold ml-1 print:text-rose-800">*F</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Summary Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl print:grid-cols-4 print:bg-slate-100 print:border-slate-800">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Grand Total</span>
                    <p className="font-extrabold text-slate-800 text-lg">{result.totalMarks} / {result.maxTotalMarks}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Percentage</span>
                    <p className="font-extrabold text-slate-800 text-lg">{result.percentage}%</p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Grade Secured</span>
                    <p className="font-extrabold text-slate-800 text-lg">{result.grade}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Result Status</span>
                    <p className={`font-extrabold text-lg uppercase ${result.percentage >= 33 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {result.percentage >= 33 ? 'PASS' : 'FAIL'}
                    </p>
                  </div>
                </div>

                {/* Disclaimers / Signatures */}
                <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between items-end print:border-slate-800">
                  <div className="text-[10px] text-slate-400 max-w-sm">
                    <p className="font-semibold">* Passing Criteria: Minimum 33% marks required in each subject.</p>
                    <p className="mt-1">Disclaimer: This is an online generated transcript statement. In case of discrepancies, the official hardcopy registry records of TBS Inter College shall be final.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-36 h-px bg-slate-400 mb-2 print:bg-slate-800"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Office Registrar</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Hidden on Print) */}
              <div className="flex justify-end gap-3 mt-6 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md"
                >
                  <Printer size={16} />
                  <span>Print Marksheet</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Dynamic print-specific styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .fixed, .inset-0, .z-50 {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            padding: 0 !important;
            background: transparent !important;
          }
          .print-area, .print-area * {
            visibility: visible !important;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultPortalModal;
