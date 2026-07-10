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

  const API_URL = 'http://localhost:5000/api/public';

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
      setError('Please select an academic stream for XI / XII admission.');
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
        setError(data.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
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
            <h2 className="font-heading font-extrabold text-base md:text-lg">Admission Inquiry Form</h2>
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
              <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">Inquiry Submitted Successfully!</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Thank you for your interest in Thakur Biri Singh Inter College. Our admissions desk will review your details and contact you at your email or phone number shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md"
              >
                Close Form
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
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Parent/Guardian Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Parent Email</label>
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
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Parent Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Grade/Class Sought</label>
                  <select
                    value={classGrade}
                    onChange={(e) => {
                      setClassGrade(e.target.value);
                      if (!['XI', 'XII'].includes(e.target.value)) setStream('');
                    }}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                    required
                  >
                    <option value="" disabled>Select Class</option>
                    <option value="IX">Class IX</option>
                    <option value="X">Class X</option>
                    <option value="XI">Class XI</option>
                    <option value="XII">Class XII</option>
                  </select>
                </div>

                {['XI', 'XII'].includes(classGrade) ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Stream</label>
                    <select
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs md:text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                      required
                    >
                      <option value="" disabled>Select Stream</option>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Year</label>
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
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Inquiry Notes / Message</label>
                <textarea
                  rows="3"
                  placeholder="Ask questions about fees, syllabus, admissions, etc."
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
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Submit Inquiry</span>
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
