import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { CertificationItem } from '../types';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { LazyCertIcon } from './LazyCertIcon';
import { useDraggableScroll } from '../hooks/useDraggableScroll';
import { soundManager } from '../utils/soundEffects';
import { 
  ExternalLink, 
  Search, 
  Building2,
  Award,
  X
} from 'lucide-react';

const CertModal = lazy(() =>
  import('./CertModal').then((m) => ({ default: m.CertModal }))
);

export const Certifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const {
    containerRef: filterScrollRef,
    isDragging,
    showLeftFade,
    showRightFade,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleItemClick,
  } = useDraggableScroll<HTMLDivElement>({ dragSpeed: 1.25 });

  const categories = useMemo(() => [
    { id: 'all', label: 'All Certificates' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'motion_design', label: 'Motion & Video' },
    { id: 'uiux', label: 'UI/UX & Product Design' },
    { id: 'it_network', label: 'IT & Security' },
    { id: 'web', label: 'Web & Programming' }
  ], []);

  const filteredCerts = useMemo(() => {
    return CERTIFICATIONS_DATA.filter((cert) => {
      if (activeCategory !== 'all' && cert.category !== activeCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const desc = cert.descriptionEn || cert.description;
      return (
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        cert.skillsAcquired.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const handleSelectCert = useCallback((cert: CertificationItem) => {
    try {
      soundManager.playModalOpen();
    } catch {}
    setSelectedCert(cert);
  }, []);

  const handleCloseModal = useCallback(() => {
    try {
      soundManager.playModalClose();
    } catch {}
    setSelectedCert(null);
  }, []);

  return (
    <section id="certifications" className="py-24 relative bg-transparent overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="05"
          eyebrow="Credentials & Verified Learning"
          icon={<Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />}
          title={
            <>
              Professional Certifications &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Licensing
              </span>
            </>
          }
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
          <div className="relative w-full lg:w-auto min-w-0 flex-1 overflow-hidden">
            {/* Left & Right Gradient Edge Fades for scroll indication */}
            <div 
              className={`tab-fade-left absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-300 ${
                showLeftFade ? 'opacity-100' : 'opacity-0'
              }`} 
              aria-hidden="true"
            />
            <div 
              className={`tab-fade-right absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-300 ${
                showRightFade ? 'opacity-100' : 'opacity-0'
              }`} 
              aria-hidden="true"
            />

            <div 
              ref={filterScrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className={`flex items-center gap-2 overflow-x-auto scrollbar-hide select-none py-1 px-4 sm:px-1 -mx-4 sm:mx-0 w-full lg:w-auto min-w-0 flex-1 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cert-cat-${cat.id}`}
                  onClick={handleItemClick((e) => {
                    try {
                      soundManager.playClick();
                    } catch {}
                    setActiveCategory(cat.id);
                    (e.currentTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                  })}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-white text-black shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 font-mono'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <div className="w-3 shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <div className="relative w-full lg:w-72 sm:w-auto min-w-[280px] shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="cert-search-input"
              type="text"
              placeholder="Search certification or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#0f0f0f] border border-white/10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {filteredCerts.map((cert) => {
            const displayedCategoryLabel = cert.categoryLabelEn || cert.categoryLabel;
            const displayedDescription = cert.descriptionEn || cert.description;
            // Clean any parenthesis content, extra whitespace, or trailing punctuation
            const cleanTitle = cert.title
              .replace(/\s*\([^)]*\)/g, '')
              .replace(/\s{2,}/g, ' ')
              .trim()
              .replace(/[,\-:;]+$/, '');

            return (
              <div
                key={cert.id}
                id={`cert-card-${cert.id}`}
                className="h-full bg-[#0f0f0f] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:border-white/25 hover:scale-[1.015] hover:-translate-y-1 hover:shadow-2xl will-change-transform group"
              >
                <div className="flex-1 flex flex-col">
                  {/* Header with Lazy-loaded Issuer Icon & Left-Aligned Category Badge */}
                  <div className="flex items-center justify-start gap-2.5 sm:gap-3 mb-3.5 sm:mb-4 flex-wrap">
                    <LazyCertIcon 
                      certId={cert.id} 
                      category={cert.category} 
                      className="shrink-0"
                    />
                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-purple-300 shrink-0">
                      {displayedCategoryLabel}
                    </span>
                  </div>

                  {/* Title (Consistent min-height prevents empty space and aligns subsequent rows) */}
                  <h3 
                    className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight leading-snug mb-1.5 min-h-[2.85rem] sm:min-h-[3.25rem] flex items-start line-clamp-2 hover:text-cyan-300 transition-colors cursor-pointer"
                    onClick={() => handleSelectCert(cert)}
                    title={cleanTitle}
                  >
                    {cleanTitle}
                  </h3>

                  {/* Issuer / Provider */}
                  <div className="flex items-start gap-1.5 text-[11px] sm:text-xs text-gray-400 font-mono mb-3.5 min-h-[2rem] sm:min-h-[2.25rem]">
                    <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div className="flex-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-snug">
                      <span className="font-medium break-words text-gray-300">{cert.issuer}</span>
                      {(cert.period || (cert as any).issueDate) && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400 shrink-0">{cert.period || (cert as any).issueDate}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 opacity-80 break-words line-clamp-3">
                    {displayedDescription}
                  </p>

                  {/* Skills Acquired Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 mt-auto pt-1">
                    {cert.skillsAcquired.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded text-[9px] sm:text-[10px] text-gray-300 font-mono uppercase tracking-wider break-words"
                      >
                        #{skill}
                      </span>
                    ))}
                    {cert.skillsAcquired.length > 3 && (
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded text-[9px] sm:text-[10px] text-gray-400 font-mono">
                        +{cert.skillsAcquired.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons Footer - Pinned to bottom with mt-auto */}
                <div className="pt-3.5 sm:pt-4 border-t border-white/5 flex items-center justify-between gap-3 mt-auto">
                  <button
                    id={`cert-detail-btn-${cert.id}`}
                    onClick={() => handleSelectCert(cert)}
                    className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors cursor-pointer py-2 px-2.5 -ml-2.5 rounded-lg hover:bg-white/5 min-h-[44px] inline-flex items-center gap-1"
                  >
                    <span>Syllabus & Info</span>
                  </button>

                  <a
                    id={`cert-direct-link-${cert.id}`}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 text-xs font-mono uppercase tracking-wider border border-white/10 hover:border-cyan-400/30 transition-all shrink-0 font-medium cursor-pointer"
                  >
                    <span>Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal with Lazy Loading Suspense */}
      {selectedCert && (
        <Suspense fallback={null}>
          <CertModal
            cert={selectedCert}
            isOpen={Boolean(selectedCert)}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </section>
  );
};
