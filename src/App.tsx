import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DisassemblySection } from './components/DisassemblySection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyDetailsMatter } from './components/WhyDetailsMatter';
import { AboutSection } from './components/AboutSection';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after elements settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#090a0d] text-white flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* 3-Zone Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Cinematic Fullscreen Entrance */}
        <Hero />

        {/* 2. Core WOW Experience: 3D Vehicle Disassembly on Scroll */}
        <DisassemblySection />

        {/* 3. Technical Services Gallery with Interactive Blueprints */}
        <ServicesSection />

        {/* 4. Inside the Process: 5-Stage Step-by-Step Quality Timeline */}
        <ProcessSection />

        {/* 5. Precision Engineering: Root Cause Elimination vs Surface Symptoms */}
        <WhyDetailsMatter />

        {/* 6. About the Facility: Equipment & Workshop Specifications */}
        <AboutSection />

        {/* 7. Contacts: Direct Phone Dialing Only */}
        <ContactsSection />
      </main>

      {/* Engineering Footer */}
      <Footer />
    </div>
  );
}
