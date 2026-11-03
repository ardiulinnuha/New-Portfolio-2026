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

const DocumentVerification = lazy(() => 
  import('./components/DocumentVerification').then((m) => ({ default: m.DocumentVerification }))
);

// Robust helper to extract verification document ID from pathname or hash
export const getResultIdFromLocation = (): string | null => {
  if (typeof window === 'undefined') return null;

  // 1. Try pathname first (e.g. /result/k7Xp2Qm9Vd4RtLw8 or /Result/k7Xp2Qm9Vd4RtLw8/)
  const rawPathname = window.location.pathname || '';
  const cleanPath = rawPathname.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '').trim();
  const pathParts = cleanPath.split('/');

  if (pathParts.length > 0 && pathParts[0].toLowerCase() === 'result') {
    // Returns document ID (preserving original ID casing), or '' if just /result or /result/
    return pathParts[1] !== undefined ? pathParts[1].trim() : '';
  }

  // 2. Fallback to hash (e.g. #/result/k7Xp2Qm9Vd4RtLw8 or #result/...)
  const rawHash = window.location.hash || '';
  if (rawHash) {
    const cleanHash = rawHash.replace(/^#\/?/, '').split('?')[0].replace(/^\/+|\/+$/g, '').trim();
    const hashParts = cleanHash.split('/');
    if (hashParts.length > 0 && hashParts[0].toLowerCase() === 'result') {
      return hashParts[1] !== undefined ? hashParts[1].trim() : '';
    }
  }

  return null;
};

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
  const [resultDocumentId, setResultDocumentId] = useState<string | null>(() => getResultIdFromLocation());

  useEffect(() => {
    const handleLocationChange = () => {
      setResultDocumentId(getResultIdFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

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

  const handleNavigateHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setResultDocumentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // If currently navigating to a /result/:id route, render DocumentVerification page directly
  if (resultDocumentId !== null) {
    return (
      <Suspense fallback={
        <div className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-[#050505] text-[#e5e7eb]">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        </div>
      }>
        <DocumentVerification 
          documentId={resultDocumentId}
          onNavigateHome={handleNavigateHome}
        />
      </Suspense>
    );
  }

  return (
    <div 
      id="app-root-container"
      className={`min-h-screen min-h-[100dvh] flex flex-col font-sans theme-dark bg-[#050505] text-[#e5e7eb] selection:bg-cyan-500 selection:text-black overflow-x-hidden w-full max-w-full relative ${hdMode ? 'hd-mode-active' : ''}`}
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
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden max-w-full"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        <div className="absolute inset-0 bg-radial-gradient opacity-80" />
        {hdMode && (
          <>
            <div className="absolute top-1/4 -left-32 sm:-left-48 w-64 h-64 sm:w-96 sm:h-96 max-w-full bg-purple-600/15 rounded-full blur-[80px] sm:blur-[140px] hd-aurora" />
            <div className="absolute bottom-1/3 -right-32 sm:-right-48 w-64 h-64 sm:w-96 sm:h-96 max-w-full bg-cyan-500/15 rounded-full blur-[80px] sm:blur-[140px] hd-aurora" />
            <div className="absolute top-2/3 left-1/3 w-72 h-72 sm:w-[500px] sm:h-[500px] max-w-full bg-purple-900/10 rounded-full blur-[100px] sm:blur-[160px] hd-aurora" />
          </>
        )}
      </div>

      {/* Main Content Sections */}
      <main id="main-content-flow" className="flex-1 relative z-10 overflow-x-hidden w-full max-w-full">

        {/* 1. Hero Section (rendered directly for instant first paint) */}
        <div id="section-hero-wrapper" className="w-full max-w-full overflow-hidden">
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
        <RevealSection id="section-skills-wrapper" className="content-visibility-auto" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
            <Skills 
              onSelectSkill={handleSelectSkill}
              activeSkillFilter={selectedSkillFilter}
            />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 6. Certified Training & Credentials (10 Programs) */}
        <RevealSection id="section-certifications-wrapper" className="content-visibility-auto" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[400px]" />}>
            <Certifications />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 7. Honors & Awards */}
        <RevealSection id="section-awards-wrapper" className="content-visibility-auto" delay={0.08} direction="up">
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[300px]" />}>
            <Awards />
          </Suspense>
        </RevealSection>

        <SectionDivider />

        {/* 8. Contact Channels & WhatsApp Inquiry Generator */}
        <RevealSection id="section-contact-wrapper" className="content-visibility-auto" delay={0.08} direction="up">
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
