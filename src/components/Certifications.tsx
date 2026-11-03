import React, { useState, useMemo, useCallback, useRef, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { motion, type Variants } from 'motion/react';
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
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const CertModal = lazy(() =>
  import('./CertModal').then((m) => ({ default: m.CertModal }))
);

const INITIAL_CERTS_COUNT = 3;

// Explicit priority order for the 3 featured certificates
const FEATURED_CERT_ORDER: Record<string, number> = {
  'google-ai-professional': 1,
  'sanbercode-graphic-design': 2,
  'hellomotion-motion-graphic': 3,
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

interface TruncatedCardDescriptionProps {
  text: string;
  isExpanded: boolean;
}

const TruncatedCardDescription: React.FC<TruncatedCardDescriptionProps> = ({ text, isExpanded }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [displayText, setDisplayText] = useState<string>(text);

  const updateTruncation = useCallback(() => {
    const el = pRef.current;
    if (!el) return;

    // If element is not rendered with dimensions yet, defer measurement to next frame
    if (el.clientWidth === 0) {
      requestAnimationFrame(updateTruncation);
      return;
    }

    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) * 1.625);
    // Allow up to 3 lines with a slight tolerance (2px) for browser subpixel rendering
    const maxHeight = lineHeight * 3 + 2;

    // 1. If full original text already fits in 3 lines, display it fully with no "..."
    el.textContent = text;
    if (el.scrollHeight <= maxHeight) {
      setDisplayText(text);
      return;
    }

    // 2. Otherwise, cleanly trim word by word until it fits in 3 lines including "..."
    const words = text.trim().split(/\s+/);
    if (words.length <= 1) {
      setDisplayText(text);
      return;
    }

    // Helper to test if a candidate word count fits with enough room for ellipsis without overflowing
    const testCount = (count: number): boolean => {
      const candidateWords = words.slice(0, count).join(' ');
      const cleanCandidate = candidateWords.replace(/[,;:\-\s]+$/, '');
      // Reserve space on the last line (about one short word/space) so ellipsis never overflows or wraps
      el.textContent = cleanCandidate + ' ...';
      return el.scrollHeight <= maxHeight;
    };

    let low = 1;
    let high = words.length - 1;
    let bestCount = 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (testCount(mid)) {
        bestCount = mid;
        low = mid + 1; // Try longer
      } else {
        high = mid - 1; // Too long, try shorter
      }
    }

    const finalWords = words.slice(0, bestCount).join(' ');
    let finalClean = finalWords.replace(/[,;:\-\s]+$/, '') + '...';

    // Verify finalClean fits; if it barely overflows, drop 1 more word
    el.textContent = finalClean;
    if (el.scrollHeight > maxHeight && bestCount > 1) {
      finalClean = words.slice(0, bestCount - 1).join(' ').replace(/[,;:\-\s]+$/, '') + '...';
      el.textContent = finalClean;
    }

    setDisplayText(finalClean);
  }, [text]);

  // Synchronously measure on mount and when text/isExpanded changes before paint
  useLayoutEffect(() => {
    updateTruncation();
  }, [updateTruncation, isExpanded]);

  // Additional recalculation after layout animation / font load / expand settles
  useEffect(() => {
    const timer = setTimeout(updateTruncation, 150);
    return () => clearTimeout(timer);
  }, [updateTruncation, isExpanded]);

  // Recalculate on window resize and font load
  useEffect(() => {
    let rAF: number;
    const handleResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        updateTruncation();
      });
    };

    window.addEventListener('resize', handleResize);
    document.fonts?.ready?.then(() => {
      updateTruncation();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rAF);
    };
  }, [updateTruncation]);

  // Recalculate when container width changes (grid columns, container resize)
  useEffect(() => {
    const el = pRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    let prevWidth = Math.round(el.clientWidth);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.round(entry.contentRect.width);
        if (newWidth > 0 && Math.abs(newWidth - prevWidth) >= 2) {
          prevWidth = newWidth;
          updateTruncation();
        }
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [updateTruncation]);

  return (
    <p
      ref={pRef}
      lang="en"
      className="cert-card-desc text-xs sm:text-sm text-gray-300 leading-relaxed opacity-80 break-normal m-0 p-0"
      style={{
        textJustify: 'inter-word',
        hyphens: 'none',
        WebkitHyphens: 'none',
      }}
    >
      {displayText}
    </p>
  );
};

export const Certifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
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
    const filtered = CERTIFICATIONS_DATA.filter((cert) => {
      if (activeCategory !== 'all' && cert.category !== activeCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const desc = cert.descriptionEn || cert.description;
      const syllabus = cert.syllabusEn || cert.syllabus || '';
      const comp = cert.competencies || [];
      return (
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        syllabus.toLowerCase().includes(q) ||
        cert.skillsAcquired.some((s) => s.toLowerCase().includes(q)) ||
        comp.some((s) => s.toLowerCase().includes(q))
      );
    });

    // Ensure featured certificates are shown first in their exact order:
    // 1. Google AI Professional
    // 2. Graphic Design Intensive Bootcamp
    // 3. Motion Graphic Artist
    // Followed by remaining matching certificates in their original order
    return [...filtered].sort((a, b) => {
      const orderA = FEATURED_CERT_ORDER[a.id] ?? 999;
      const orderB = FEATURED_CERT_ORDER[b.id] ?? 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return CERTIFICATIONS_DATA.indexOf(a) - CERTIFICATIONS_DATA.indexOf(b);
    });
  }, [activeCategory, searchQuery]);

  const displayedCerts = useMemo(() => {
    if (isExpanded || filteredCerts.length <= INITIAL_CERTS_COUNT) {
      return filteredCerts;
    }
    return filteredCerts.slice(0, INITIAL_CERTS_COUNT);
  }, [filteredCerts, isExpanded]);

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
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-[600px] sm:h-[400px] max-w-full bg-purple-950/15 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none -z-10" />

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
              className={`flex items-center gap-2 overflow-x-auto scrollbar-hide select-none py-1 px-4 sm:px-1 -mx-4 sm:mx-0 w-[calc(100%+2rem)] sm:w-auto max-w-[calc(100%+2rem)] sm:max-w-none min-w-0 flex-1 ${
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
                    setIsExpanded(false);
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

          <div className="relative w-full lg:w-72 sm:w-auto min-w-0 sm:min-w-[260px] shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="cert-search-input"
              type="text"
              placeholder="Search certification or skill..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsExpanded(false);
              }}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#0f0f0f] border border-white/10 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsExpanded(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Certifications Content */}
        {filteredCerts.length === 0 ? (
          <div className="p-10 text-center bg-[#0f0f0f] border border-white/10 rounded-2xl sm:rounded-3xl mb-16">
            <Award className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="font-display font-bold text-white text-base mb-1">
              {searchQuery.trim()
                ? `No Certificates Found Matching "${searchQuery.trim()}"`
                : 'No Certificates Found'}
            </h3>
            <p className="text-gray-400 text-xs font-mono mb-4 max-w-md mx-auto">
              {searchQuery.trim()
                ? 'Try checking for typos or searching by broader keywords like "AI", "Design", or "Cisco".'
                : 'Try selecting a different category filter.'}
            </p>
            {searchQuery.trim() && (
              <button
                id="empty-cert-clear-search-btn"
                type="button"
                onClick={() => {
                  try {
                    soundManager.playClick();
                  } catch {}
                  setSearchQuery('');
                  setIsExpanded(false);
                }}
                className="px-5 py-2 min-h-[40px] rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-bold uppercase tracking-wider transition-colors font-mono cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Certifications Grid */}
            <motion.div 
              id="certifications-grid"
              key={`${activeCategory}-${searchQuery}-${isExpanded ? 'expanded' : 'collapsed'}`}
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch ${
                filteredCerts.length > INITIAL_CERTS_COUNT ? 'mb-8' : 'mb-16'
              }`}
            >
              {displayedCerts.map((cert) => {
                const displayedCategoryLabel = cert.categoryLabelEn || cert.categoryLabel;
                const displayedDescription = cert.descriptionEn || cert.description;
                // Clean any parenthesis content, extra whitespace, or trailing punctuation
                const cleanTitle = cert.title
                  .replace(/\s*\([^)]*\)/g, '')
                  .replace(/\s{2,}/g, ' ')
                  .trim()
                  .replace(/[,\-:;]+$/, '');

                return (
                  <motion.div
                    key={cert.id}
                    variants={cardVariants}
                    className="h-full"
                  >
                    <div
                      id={`cert-card-${cert.id}`}
                      onMouseEnter={() => {
                        try {
                          import('./CertModal');
                        } catch {}
                      }}
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

                        {/* Title */}
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

                        {/* Description with Clean Word-Boundary Truncation & Inter-Word Justification */}
                        <div className="mb-4 min-h-[3.7rem] sm:min-h-[4.3rem] overflow-hidden flex flex-col justify-start">
                          <TruncatedCardDescription
                            text={displayedDescription}
                            isExpanded={isExpanded}
                          />
                        </div>

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

                      {/* Action Buttons Footer */}
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
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Show More / Show Less Button when certificates exceed 3 */}
            {filteredCerts.length > INITIAL_CERTS_COUNT && (
              <div className="flex flex-col items-center justify-center -mt-2 mb-16 gap-2.5">
                <button
                  id="cert-load-more-btn"
                  type="button"
                  onClick={() => {
                    try {
                      soundManager.playClick();
                    } catch {}
                    setIsExpanded((prev) => {
                      const nextState = !prev;
                      if (!nextState) {
                        const certEl = document.getElementById('certifications');
                        if (certEl) {
                          certEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                      return nextState;
                    });
                  }}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/40 cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="w-4 h-4 text-cyan-400 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      <span>Show More Certificates</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-bold">
                        +{filteredCerts.length - INITIAL_CERTS_COUNT}
                      </span>
                      <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </>
                  )}
                </button>
                <p className="text-[11px] font-mono text-gray-500">
                  {isExpanded
                    ? `Showing ${filteredCerts.length} of ${filteredCerts.length} certificates`
                    : `Showing ${displayedCerts.length} of ${filteredCerts.length} certificates`}
                </p>
              </div>
            )}
          </>
        )}

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
