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

function App() {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <Navbar onOpenResults={() => setIsResultModalOpen(true)} />
      
      {/* Scrollable Notice ticker */}
      <NoticeTicker />
      
      <main className="flex-1">
        {/* Full-width interactive Hero Slider */}
        <Hero />
        
        {/* Quick services cards */}
        <QuickServices onOpenResults={() => setIsResultModalOpen(true)} />
        
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
        <AdmissionBanner />
        
        {/* Address and Interactive Contact Form */}
        <Contact />
      </main>
      
      {/* Footer bar */}
      <Footer />

      {/* Public Marks Verification Portal Overlay */}
      <ResultPortalModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
      />
    </div>
  );
}

export default App;
