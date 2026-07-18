import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/public/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: 'General',
          parentName: formData.name,
          parentEmail: formData.email,
          parentPhone: formData.phone || 'N/A',
          classGrade: `General Inquiry: ${formData.subject}`,
          academicYear: 'N/A',
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            Contact School Principle
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            Have questions about admissions, fees, or curricula? Drop us a line or visit our campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Contact Cards */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-50 text-primary rounded-xl shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-800 text-sm md:text-base">Campus Address</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Thakur Biri Singh Inter College, <br />
                    Tundla, Firozabad, <br />
                    Uttar Pradesh, PIN - 283204, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-amber-50 text-secondary-dark rounded-xl shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-800 text-sm md:text-base">Phone Number</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    <a href="tel:+919557244888" className="hover:text-primary font-semibold transition-colors">+91 9557244888</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-800 text-sm md:text-base">Email Support</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    <a href="mailto:th.bsictundla1948@gmail.com" className="hover:text-primary font-semibold transition-colors">th.bsictundla1948@gmail.com</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Google Map Embedded (Tundla, Firozabad coordinates) */}
            <div className="w-full h-[250px] md:h-[300px] rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-slate-200">
              <iframe
                title="Thakur Biri Singh Inter College Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.868778436443!2d78.23275751505051!3d27.207572782998348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397463fbbba543ad%3A0xc3f1737e5c531d04!2sTundla%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-heading font-extrabold text-xl text-slate-800 mb-6">
                Send an Inquiry Message
              </h3>

              {status === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col items-center text-center animate-in fade-in duration-300">
                  <CheckCircle2 size={48} className="text-emerald-500 mb-3" />
                  <h4 className="font-heading font-bold text-emerald-800 text-lg">Message Sent Successfully!</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Thank you for reaching out. The school principle has received your query and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-all"
                        placeholder="Shri Kumar"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-all"
                        placeholder="kumar@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-all"
                        placeholder="Admission query / documents"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-all resize-none"
                      placeholder="Write your details or questions here..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold">
                      <AlertCircle size={16} />
                      <span>Failed to submit. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-primary hover:bg-primary-dark text-white font-heading font-extrabold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-xs md:text-sm w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{status === 'sending' ? 'Sending Message...' : 'Submit Inquiry'}</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
