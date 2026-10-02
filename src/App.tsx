/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { RevealSection } from './components/RevealSection';
import { ContentProtection } from './components/ContentProtection';

// Code-split below-the-fold sections to reduce initial bundle size
const PortfolioShowcase = lazy(() => 
  import('./components/PortfolioShowcase').then(m => ({ default: m.PortfolioShowcase }))
);
const Skills = lazy(() => 
  import('./components/Skills').then(m => ({ default: m.Skills }))
);
const Certifications = lazy(() => 
  import('./components/Certifications').then(m => ({ default: m.Certifications }))
);
const Awards = lazy(() => 
  import('./components/Awards').then(m => ({ default: m.Awards }))
);
const Contact = lazy(() => 
  import('./components/Contact').then(m => ({ default: m.Contact }))
);

const SectionSkeleton: React.FC<{ minHeight?: string }> = ({ minHeight = 'min-h-[300px]' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center ${minHeight}`} aria-hidden="true">
    <div className="w-7 h-7 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
  </div>
);

const SectionDivider: React.FC = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none" aria-hidden="true">
    <div className="border-t border-white/10 section-divider transition-colors duration-300" />
  </div>
);

export default function App() {
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
  }, []);

  const [hdMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('au_hd_mode');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const handleSelectSkill = useCallback((skillName: string) => {
    setSelectedSkillFilter(skillName);
  }, []);

  const handleClearSkillFilter = useCallback(() => {
    setSelectedSkillFilter(null);
  }, []);

  return (
    <div 
      id="app-root-container"
      className={`min-h-screen flex flex-col font-sans theme-dark bg-[#050505] text-[#e5e7eb] selection:bg-cyan-500 selection:text-black ${hdMode ? 'hd-mode-active' : ''}`}
    >
      {/* Global Content & Asset Protection Handler & Toast Notification */}
      <ContentProtection />

      {/* Global Interactive Technologist Custom Cursor */}
      <CustomCursor />

      {/* Top Animated Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Global Seamless Full-Page Spatial Grid & Atmospheric Aura */}
      <div 
        id="global-spatial-background" 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        <div className="absolute inset-0 bg-radial-gradient opacity-80" />
        {hdMode && (
          <>
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] hd-aurora" />
            <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] hd-aurora" />
            <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] hd-aurora" />
          </>
        )}
      </div>

      {/* Main Content Sections */}
      <main id="main-content-flow" className="flex-1 relative z-10">

        {/* 1. Hero Section (rendered directly for instant first paint) */}
        <div id="section-hero-wrapper">
          <Hero />
        </div>

        <SectionDivider />

        {/* 2. Profile Summary & Academic Background */}
        <RevealSection id="section-about-wrapper" delay={0.08} direction="up">
          <About />
        </RevealSection>

        <SectionDivider />

        {/* 3. Work Experience & Leadership Track */}
        <RevealSection id="section-experience-wrapper" delay={0.08} direction="up">
          <Experience />
        </RevealSection>

        <SectionDivider />

        {/* 4. Featured Portfolio & Works */}
        <RevealSection id="section-portfolio-wrapper" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[500px]" />}>
            <PortfolioShowcase 
              selectedSkillFilter={selectedSkillFilter}
              onClearSkillFilter={handleClearSkillFilter}
            />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 5. Multidisciplinary Skills & Software Stack */}
        <RevealSection id="section-skills-wrapper" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
            <Skills 
              onSelectSkill={handleSelectSkill}
              activeSkillFilter={selectedSkillFilter}
            />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 6. Certified Training & Credentials (10 Programs) */}
        <RevealSection id="section-certifications-wrapper" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
            <Certifications />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 7. Honors & Awards */}
        <RevealSection id="section-awards-wrapper" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[300px]" />}>
            <Awards />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 8. Contact Channels & WhatsApp Inquiry Generator */}
        <RevealSection id="section-contact-wrapper" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[350px]" />}>
            <Contact />
          </Suspense>
        </RevealSection>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Action Button */}
      <BackToTop />
    </div>
  );
}
