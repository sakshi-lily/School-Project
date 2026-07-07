import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';

const PrincipalMessage = () => {
  const [showModal, setShowModal] = useState(false);

  const fullMessage = `Dear Students, Parents, and Well-wishers,

It is my privilege to welcome you to Thakur Biri Singh Inter College, Tundla. Since our establishment in 1950, we have stayed committed to creating a high-achieving, disciplined, and nurturing environment for all our students.

Education is not just about learning facts; it is about training the mind to think and the heart to feel. Our team of highly experienced teachers works tirelessly to ensure that our students do not just pass UPMSP board examinations with flying colors, but also develop strong moral character, national pride, and the analytical tools needed in the 21st century.

We have continuously modernized our classrooms and science laboratories to keep pace with changing educational landscapes. Our focus remains on merit, inclusion, and holistic growth through sports, arts, NCC, and NSS initiatives. I invite you all to join hands with us as we guide the next generation towards a bright and purposeful future.

Jai Hind!

Warm regards,

Shri R. M. Pangoria
Principal, Thakur Biri Singh Inter College`;

  return (
    <section id="principal-message" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-premium relative overflow-hidden">

          {/* Decorative background quote icon */}
          <div className="absolute -right-8 -bottom-8 text-primary/5 select-none pointer-events-none hidden md:block">
            <Quote size={240} strokeWidth={1} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Principal Photo */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-200">
                <img
                  src="https://chatgpt.com/backend-api/estuary/content?id=file_000000009f1c71fbac5ac3c0a12be09d&ts=495376&p=fs&cid=1&sig=3836db9b00493905c8a50feaad9ecd05d30329ebedca111a60f82b667a2fb902&v=0" // Professional educator photo
                  alt="Shri R. M. Pangoria - Principal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="font-heading font-extrabold text-lg md:text-xl text-slate-800">
                  Shri R. M. Pangoria
                </h3>
                <p className="text-xs md:text-sm font-semibold text-secondary-dark uppercase tracking-wider mt-0.5">
                  Principal, Ph.D., M.Ed.
                </p>
                <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">
                  Thakur Biri Singh Inter College
                </p>
              </div>
            </div>

            {/* Principal Message Content */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="text-primary-light mb-4">
                <Quote size={40} className="fill-primary/5 text-primary opacity-60" />
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                From the Desk of the Principal
              </h2>

              <div className="h-1.5 w-20 bg-secondary rounded-full mt-3 mb-6"></div>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium italic">
                "Welcome to Thakur Biri Singh Inter College, Tundla. Since our establishment in 1950, we have stayed committed to creating a high-achieving, disciplined, and nurturing environment for all our students. Education is not just about learning facts; it is about training the mind to think and the heart to feel..."
              </p>

              {/* Signature */}
              <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="font-heading font-bold text-xs text-slate-500 uppercase tracking-wider">
                    Official Signature
                  </p>
                  <p className="font-serif italic text-2xl text-primary font-bold mt-1.5 opacity-90 select-none">
                    RMPangoria
                  </p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Shri R. M. Pangoria
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="bg-primary hover:bg-primary-dark text-white font-heading font-bold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-colors shadow-md flex items-center justify-center gap-1.5 w-fit"
                >
                  <span>Read Full Message</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-primary text-white p-6 flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-white">
                Principal's Full Address
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] text-xs md:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
              {fullMessage}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-primary hover:bg-primary-dark text-white font-bold px-4 py-2 rounded-xl text-xs md:text-sm transition-colors"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PrincipalMessage;
