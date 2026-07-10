import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NoticeTicker from './components/NoticeTicker';
import Hero from './components/Hero';
import QuickServices from './components/QuickServices';
import AboutSchool from './components/AboutSchool';
import PrincipalMessage from './components/PrincipalMessage';
import WhyChooseUs from './components/WhyChooseUs';
import LatestNotice from './components/LatestNotice';
import Gallery from './components/Gallery';
import Statistics from './components/Statistics';
import AdmissionBanner from './components/AdmissionBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResultPortalModal from './components/ResultPortalModal';
import AdmissionInquiryModal from './components/AdmissionInquiryModal';
import AcademicCalendarModal from './components/AcademicCalendarModal';

function App() {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="print:hidden flex flex-col flex-1">
        {/* Navigation Header */}
        <Navbar 
          onOpenResults={() => setIsResultModalOpen(true)} 
          onOpenAdmission={() => setIsAdmissionOpen(true)}
          onOpenCalendar={() => setIsCalendarOpen(true)}
        />
        
        {/* Scrollable Notice ticker */}
        <NoticeTicker />
        
        <main className="flex-1">
          {/* Full-width interactive Hero Slider */}
          <Hero onOpenResults={() => setIsResultModalOpen(true)} />
          
          {/* Quick services cards */}
          <QuickServices 
            onOpenResults={() => setIsResultModalOpen(true)} 
            onOpenCalendar={() => setIsCalendarOpen(true)}
          />
          
          {/* Split screen About section */}
          <AboutSchool />
          
          {/* Principal Message banner */}
          <PrincipalMessage />
          
          {/* Key advantages list */}
          <WhyChooseUs />
          
          {/* Tabbed Board Notices */}
          <LatestNotice />
          
          {/* Filterable image gallery */}
          <Gallery />
          
          {/* Scrolling counters */}
          <Statistics />
          
          {/* CTA Admission banner */}
          <AdmissionBanner onOpenAdmission={() => setIsAdmissionOpen(true)} />
          
          {/* Address and Interactive Contact Form */}
          <Contact />
        </main>
        
        {/* Footer bar */}
        <Footer />
      </div>

      {/* Public Marks Verification Portal Overlay */}
      <ResultPortalModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
      />

      {/* Admission Inquiry Modal */}
      <AdmissionInquiryModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
      />

      {/* Academic Calendar Modal */}
      <AcademicCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
}

export default App;
