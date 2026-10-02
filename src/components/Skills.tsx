import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillItem } from '../types';
import { SectionHeader } from './SectionHeader';
import { soundManager } from '../utils/soundEffects';
import { useDraggableScroll } from '../hooks/useDraggableScroll';
import { 
  Sparkles, 
  Search, 
  Film, 
  Palette, 
  Layout, 
  Cpu, 
  Radio, 
  Bot,
  Check, 
  Zap, 
  Filter,
  ArrowUpRight,
  Infinity as InfinityIcon,
  X,
  Code
} from 'lucide-react';

const skillsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const skillCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

interface SkillsProps {
  onSelectSkill?: (skillName: string) => void;
  activeSkillFilter?: string | null;
}

interface HoveredSkillState {
  name: string;
  categoryTitle: string;
  level: number;
  badge?: string;
  isPrimary?: boolean;
  description: string;
  workflow: string;
  x: number;
  y: number;
  placement: 'top' | 'bottom';
  arrowLeft: number;
}

export const Skills: React.FC<SkillsProps> = ({ 
  onSelectSkill,
  activeSkillFilter = null
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredSkill, setHoveredSkill] = useState<HoveredSkillState | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Draggable scroll hook for category tabs
  const {
    containerRef: categoryScrollRef,
    isDragging: isCategoryDragging,
    showLeftFade: showCatLeftFade,
    showRightFade: showCatRightFade,
    handleMouseDown: handleCatMouseDown,
    handleMouseMove: handleCatMouseMove,
    handleMouseUp: handleCatMouseUp,
    handleMouseLeave: handleCatMouseLeave,
    handleItemClick: handleCatItemClick,
  } = useDraggableScroll<HTMLDivElement>({ dragSpeed: 1.25 });

  // Stream draggable scroll state and refs
  const [isStreamDragging, setIsStreamDragging] = useState(false);
  const isStreamMouseDownRef = useRef(false);
  const streamStartXRef = useRef(0);
  const streamScroll1StartRef = useRef(0);
  const streamScroll2StartRef = useRef(0);
  const hasDraggedStreamRef = useRef(false);

  const track1Ref = useRef<HTMLDivElement | null>(null);
  const track2Ref = useRef<HTMLDivElement | null>(null);

  const handleStreamMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isStreamMouseDownRef.current = true;
    hasDraggedStreamRef.current = false;
    streamStartXRef.current = e.pageX;
    streamScroll1StartRef.current = track1Ref.current ? track1Ref.current.scrollLeft : 0;
    streamScroll2StartRef.current = track2Ref.current ? track2Ref.current.scrollLeft : 0;
  }, []);

  const handleStreamMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isStreamMouseDownRef.current) return;
    const deltaX = e.pageX - streamStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      if (!hasDraggedStreamRef.current) {
        hasDraggedStreamRef.current = true;
        setIsStreamDragging(true);
      }
      if (track1Ref.current) {
        track1Ref.current.scrollLeft = streamScroll1StartRef.current - deltaX * 1.35;
      }
      if (track2Ref.current) {
        track2Ref.current.scrollLeft = streamScroll2StartRef.current - deltaX * 1.35;
      }
    }
  }, []);

  const handleStreamMouseUp = useCallback(() => {
    isStreamMouseDownRef.current = false;
    setTimeout(() => {
      setIsStreamDragging(false);
      hasDraggedStreamRef.current = false;
    }, 60);
  }, []);

  const handleStreamMouseLeave = useCallback(() => {
    if (isStreamMouseDownRef.current) {
      isStreamMouseDownRef.current = false;
      setTimeout(() => {
        setIsStreamDragging(false);
        hasDraggedStreamRef.current = false;
      }, 60);
    }
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return Film;
      case 'Palette': return Palette;
      case 'Layout': return Layout;
      case 'Cpu': return Cpu;
      case 'Bot': return Bot;
      case 'Radio': return Radio;
      case 'Sparkles': return Sparkles;
      default: return Sparkles;
    }
  };

  const getSkillDetails = useCallback((skillName: string) => {
    for (const cat of SKILL_CATEGORIES) {
      const found = cat.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
      if (found) {
        return {
          skill: found,
          categoryTitle: cat.titleEn || cat.title
        };
      }
    }
    return null;
  }, []);

  const calculateTooltipPosition = useCallback((targetEl: HTMLElement) => {
    const rect = targetEl.getBoundingClientRect();
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Generous bounding calculations for the floating tooltip
    const tooltipEstimatedHeight = 280;
    const tooltipWidth = Math.min(340, screenWidth - 32);
    const halfWidth = tooltipWidth / 2;
    
    const spaceAbove = rect.top;
    const spaceBelow = screenHeight - rect.bottom;
    
    // Collision detection:
    // If space below is not enough (< 290px), flip to 'top'
    // If space above is tight (< 290px) and space below has more room, flip to 'bottom'
    let placement: 'top' | 'bottom' = 'top';
    if (spaceBelow < tooltipEstimatedHeight + 16) {
      placement = 'top';
    } else if (spaceAbove < tooltipEstimatedHeight + 16) {
      placement = 'bottom';
    } else {
      // Default: top for elements in bottom half of viewport, bottom for elements in top half
      placement = rect.top > screenHeight / 2 ? 'top' : 'bottom';
    }
    
    // Horizontal center of target button
    const targetCenterX = rect.left + rect.width / 2;
    // Clamp tooltip center X so it never spills over viewport boundaries (16px margins)
    const clampedX = Math.min(
      Math.max(targetCenterX, halfWidth + 16),
      screenWidth - halfWidth - 16
    );
    
    // Tooltip top-left position when translated -50% horizontally
    const tooltipLeft = clampedX - halfWidth;
    // Exact arrow location relative to tooltip container
    const arrowLeft = Math.min(
      Math.max(targetCenterX - tooltipLeft, 24),
      tooltipWidth - 24
    );
    
    // Vertical anchor calculation:
    let y: number;
    if (placement === 'top') {
      // 10px gap above the target element. Tooltip translated -100% on Y
      const desiredY = rect.top - 10;
      y = Math.max(desiredY, tooltipEstimatedHeight + 16);
    } else {
      // 10px gap below the target element. Tooltip translated 0% on Y
      const desiredY = rect.bottom + 10;
      y = Math.min(desiredY, screenHeight - tooltipEstimatedHeight - 16);
    }
    
    return { x: clampedX, y, placement, arrowLeft };
  }, []);

  const handleSkillMouseEnter = useCallback((
    e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    skill: SkillItem,
    categoryTitle: string
  ) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const pos = calculateTooltipPosition(e.currentTarget);

    setHoveredSkill({
      name: skill.name,
      categoryTitle,
      level: skill.level,
      badge: skill.badge,
      isPrimary: skill.isPrimary,
      description: skill.descriptionEn || skill.description || 'Core technical competency and domain mastery.',
      workflow: skill.workflowEn || skill.workflow || 'Applied in production design and creative workflows.',
      ...pos
    });
  }, [calculateTooltipPosition]);

  const handleSkillMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkill(null);
    }, 120);
  }, []);

  const handleSkillClick = useCallback((skillName: string, event?: React.MouseEvent<HTMLElement>) => {
    soundManager.playClick();
    if (onSelectSkill) {
      onSelectSkill(skillName);
    }
    if (event) {
      const details = getSkillDetails(skillName);
      if (details) {
        handleSkillMouseEnter(event, details.skill, details.categoryTitle);
      }
    }
  }, [onSelectSkill, getSkillDetails, handleSkillMouseEnter]);

  const handleFilterToPortfolio = useCallback((skillName: string) => {
    soundManager.playClick();
    if (onSelectSkill) {
      onSelectSkill(skillName);
    }
    setHoveredSkill(null);
    const portfolioEl = document.getElementById('portfolio');
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onSelectSkill]);

  // Close tooltip on page scroll or Escape key (only listen when open)
  useEffect(() => {
    if (!hoveredSkill) return;

    const handleScroll = () => {
      setHoveredSkill(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHoveredSkill(null);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [hoveredSkill]);

  // Ensure seamless scroll chaining when mouse is over skill cards
  const handleCardListWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isScrollable = scrollHeight > clientHeight + 1;

    if (!isScrollable) {
      // Container has no overflow to scroll; let wheel scroll page
      return;
    }

    const isAtTop = scrollTop <= 0.5;
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;

    // When scrolling UP at top edge, or scrolling DOWN at bottom edge, chain to page scroll
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }
  };

  // Flattened array of all skills with category metadata for marquee
  const allSkillsList = useMemo(() => {
    const list: { name: string; category: string; badge?: string; isPrimary?: boolean; tag: string; level: number }[] = [];
    SKILL_CATEGORIES.forEach(cat => {
      cat.skills.forEach(skill => {
        let tag = 'TECH';
        if (skill.name.includes('Premiere')) tag = 'Pr';
        else if (skill.name.includes('After Effects')) tag = 'Ae';
        else if (skill.name.includes('Photoshop')) tag = 'Ps';
        else if (skill.name.includes('Illustrator')) tag = 'Ai';
        else if (skill.name.includes('InDesign')) tag = 'Id';
        else if (skill.name.includes('Figma')) tag = 'Fg';
        else if (skill.name.includes('Google AI Studio')) tag = 'AIS';
        else if (skill.name.includes('Gemini')) tag = 'GEM';
        else if (skill.name.includes('Claude')) tag = 'CLD';
        else if (skill.name.includes('ChatGPT')) tag = 'GPT';
        else if (skill.name.includes('ElevenLabs')) tag = 'VOX';
        else if (skill.name.includes('Google AI') || skill.name.includes('Azure') || skill.name.includes('Prompt') || skill.name.includes('AI-Assisted')) tag = 'AI';
        else if (skill.name.includes('HTML') || skill.name.includes('Web') || skill.name.includes('JavaScript')) tag = 'WEB';
        else if (skill.name.includes('Motion') || skill.name.includes('Video') || skill.name.includes('Color')) tag = 'FX';
        else if (skill.name.includes('Packaging') || skill.name.includes('Brand')) tag = 'DSN';
        else if (skill.name.includes('Client Communication') || skill.name.includes('Relationship')) tag = 'CRM';
        else if (skill.name.includes('Time Management') || skill.name.includes('Multi-Project')) tag = 'MGT';
        else if (skill.name.includes('Problem Solving') || skill.name.includes('Adaptability')) tag = 'SOLV';
        else if (skill.name.includes('Team Collaboration')) tag = 'TEAM';
        else if (skill.name.includes('Attention to Detail') || skill.name.includes('Quality Control')) tag = 'QC';
        else tag = 'PRO';

        list.push({
          name: skill.name,
          category: cat.titleEn || cat.title,
          badge: skill.badge,
          isPrimary: skill.isPrimary,
          tag,
          level: skill.level
        });
      });
    });
    return list;
  }, []);

  // Split into 2 rows for dual marquee tracks
  const marqueeRow1 = useMemo(() => {
    const half = Math.ceil(allSkillsList.length / 2);
    return allSkillsList.slice(0, half);
  }, [allSkillsList]);

  const marqueeRow2 = useMemo(() => {
    const half = Math.ceil(allSkillsList.length / 2);
    return allSkillsList.slice(half);
  }, [allSkillsList]);

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.filter((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchesCat = (cat.titleEn || cat.title).toLowerCase().includes(q);
      const matchesSkill = cat.skills.some((s) => s.name.toLowerCase().includes(q) || (s.badge && s.badge.toLowerCase().includes(q)));
      return matchesCat || matchesSkill;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-16 sm:py-24 relative bg-transparent overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="04"
          eyebrow="Multidisciplinary Stack"
          icon={<Code className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-400" />}
          title={
            <>
              Software & Technical{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Mastery
              </span>
            </>
          }
          subtitle={
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-[11px] font-mono text-cyan-300/90 mt-2 max-w-full">
              <Filter className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate sm:whitespace-normal">Click any skill to filter relevant portfolio projects</span>
            </div>
          }
        />

        {/* ================================================================= */}
        {/* INFINITE SCROLL MARQUEE TECH STACK CAROUSEL                       */}
        {/* ================================================================= */}
        <div className="mb-12 sm:mb-14 relative">
          <div className="flex items-center justify-between gap-2 mb-3.5 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-gray-300 stream-header-title flex items-center gap-1.5">
                <InfinityIcon className="w-3.5 h-3.5 text-cyan-400" />
                Live Continuous Stack Stream
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 stream-header-subtitle hidden sm:inline-block">
              Hover to pause • Click to filter
            </span>
          </div>

          <div 
            id="live-stack-stream-container"
            onMouseDown={handleStreamMouseDown}
            onMouseMove={handleStreamMouseMove}
            onMouseUp={handleStreamMouseUp}
            onMouseLeave={handleStreamMouseLeave}
            className={`marquee-pause-hover relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#101010]/90 to-[#090909]/90 border border-white/10 p-3 sm:p-4 shadow-xl backdrop-blur-md transition-colors duration-300 select-none ${
              isStreamDragging ? 'cursor-grabbing marquee-paused' : 'cursor-grab'
            }`}
          >
            {/* Left & Right Edge Gradient Fading Masks (Theme-Aware) */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#090909] via-[#090909]/80 to-transparent z-10 pointer-events-none stream-fade-left" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#090909] via-[#090909]/80 to-transparent z-10 pointer-events-none stream-fade-right" />

            {/* Track 1: Scroll Left */}
            <div 
              ref={track1Ref} 
              className="overflow-x-auto scrollbar-hide py-1 mb-2 select-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="animate-marquee-left flex items-center gap-2.5 sm:gap-3 w-max">
                {/* 1st copy */}
                {marqueeRow1.map((item, idx) => {
                  const isActive = activeSkillFilter === item.name;
                  const details = getSkillDetails(item.name);
                  return (
                    <button
                      key={`m1-a-${idx}`}
                      type="button"
                      onClick={(e) => {
                        if (hasDraggedStreamRef.current) return;
                        handleSkillClick(item.name, e);
                      }}
                      onMouseEnter={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onMouseLeave={handleSkillMouseLeave}
                      onFocus={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onBlur={handleSkillMouseLeave}
                      className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? 'stream-badge-active-cyan bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'stream-badge-item bg-white/[0.03] border-white/10 text-gray-200 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white hover:scale-105'
                      }`}
                    >
                      <span className="stream-tag-cyan px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.tag}
                      </span>
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.isPrimary && (
                        <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
                {/* 2nd duplicate copy for seamless continuous loop */}
                {marqueeRow1.map((item, idx) => {
                  const isActive = activeSkillFilter === item.name;
                  const details = getSkillDetails(item.name);
                  return (
                    <button
                      key={`m1-b-${idx}`}
                      type="button"
                      onClick={(e) => {
                        if (hasDraggedStreamRef.current) return;
                        handleSkillClick(item.name, e);
                      }}
                      onMouseEnter={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onMouseLeave={handleSkillMouseLeave}
                      onFocus={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onBlur={handleSkillMouseLeave}
                      className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? 'stream-badge-active-cyan bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'stream-badge-item bg-white/[0.03] border-white/10 text-gray-200 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:text-white hover:scale-105'
                      }`}
                    >
                      <span className="stream-tag-cyan px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.tag}
                      </span>
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.isPrimary && (
                        <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Track 2: Scroll Right */}
            <div 
              ref={track2Ref} 
              className="overflow-x-auto scrollbar-hide py-1 select-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="animate-marquee-right flex items-center gap-2.5 sm:gap-3 w-max">
                {/* 1st copy */}
                {marqueeRow2.map((item, idx) => {
                  const isActive = activeSkillFilter === item.name;
                  const details = getSkillDetails(item.name);
                  return (
                    <button
                      key={`m2-a-${idx}`}
                      type="button"
                      onClick={(e) => {
                        if (hasDraggedStreamRef.current) return;
                        handleSkillClick(item.name, e);
                      }}
                      onMouseEnter={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onMouseLeave={handleSkillMouseLeave}
                      onFocus={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onBlur={handleSkillMouseLeave}
                      className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? 'stream-badge-active-purple bg-purple-950/60 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'stream-badge-item bg-white/[0.03] border-white/10 text-gray-200 hover:border-purple-400/50 hover:bg-white/[0.08] hover:text-white hover:scale-105'
                      }`}
                    >
                      <span className="stream-tag-purple px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {item.tag}
                      </span>
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.badge && (
                        <span className="stream-badge-secondary text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-gray-400 border border-white/5">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
                {/* 2nd duplicate copy for seamless continuous loop */}
                {marqueeRow2.map((item, idx) => {
                  const isActive = activeSkillFilter === item.name;
                  const details = getSkillDetails(item.name);
                  return (
                    <button
                      key={`m2-b-${idx}`}
                      type="button"
                      onClick={(e) => {
                        if (hasDraggedStreamRef.current) return;
                        handleSkillClick(item.name, e);
                      }}
                      onMouseEnter={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onMouseLeave={handleSkillMouseLeave}
                      onFocus={(e) => {
                        if (details) handleSkillMouseEnter(e, details.skill, details.categoryTitle);
                      }}
                      onBlur={handleSkillMouseLeave}
                      className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? 'stream-badge-active-purple bg-purple-950/60 border-purple-400 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'stream-badge-item bg-white/[0.03] border-white/10 text-gray-200 hover:border-purple-400/50 hover:bg-white/[0.08] hover:text-white hover:scale-105'
                      }`}
                    >
                      <span className="stream-tag-purple px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {item.tag}
                      </span>
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.badge && (
                        <span className="stream-badge-secondary text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-gray-400 border border-white/5">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Category Tabs with draggable horizontal scrolling & fade indicators */}
          <div className="relative w-full lg:w-auto min-w-0 flex-1 overflow-hidden">
            {/* Left & Right Gradient Edge Fades for scroll indication */}
            <div 
              className={`tab-fade-left absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-300 ${
                showCatLeftFade ? 'opacity-100' : 'opacity-0'
              }`} 
              aria-hidden="true"
            />
            <div 
              className={`tab-fade-right absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-300 ${
                showCatRightFade ? 'opacity-100' : 'opacity-0'
              }`} 
              aria-hidden="true"
            />

            <div 
              ref={categoryScrollRef}
              onMouseDown={handleCatMouseDown}
              onMouseMove={handleCatMouseMove}
              onMouseUp={handleCatMouseUp}
              onMouseLeave={handleCatMouseLeave}
              className={`flex items-center gap-2 overflow-x-auto scrollbar-hide select-none py-1 px-4 sm:px-1 -mx-4 sm:mx-0 w-full lg:w-auto min-w-0 flex-1 ${
                isCategoryDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <button
                id="skill-filter-all"
                onClick={handleCatItemClick((e) => {
                  setSelectedCategory('all');
                  (e.currentTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                })}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 font-mono'
                }`}
              >
                All Skills
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  id={`skill-filter-${cat.id}`}
                  onClick={handleCatItemClick((e) => {
                    setSelectedCategory(cat.id);
                    (e.currentTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                  })}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 font-mono'
                  }`}
                >
                  {cat.titleEn || cat.title}
                </button>
              ))}
              <div className="w-3 shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Quick Search Field with Adequate Width & Padding */}
          <div className="relative w-full lg:w-72 sm:w-auto min-w-[280px] shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="skills-search-input"
              type="text"
              placeholder="Search skills, software..."
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

        {/* Skills Categories Grid with CSS Grid auto-fit and Staggered Motion */}
        <motion.div 
          key={`${selectedCategory}-${searchQuery}`}
          variants={skillsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] sm:grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 sm:gap-6 items-stretch auto-rows-fr"
        >
          {filteredCategories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            const displayedTitle = category.titleEn || category.title;
            const displayedDesc = category.descriptionEn || category.description;

            return (
              <motion.div
                key={category.id}
                id={`skill-category-card-${category.id}`}
                variants={skillCardVariants}
                className="bg-[#0f0f0f] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between h-full min-h-[440px] sm:min-h-[480px] transition-all duration-300 ease-out hover:border-white/25 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-2xl will-change-transform group overflow-hidden"
              >
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Category Header */}
                  <div className="flex items-start gap-3 mb-3.5 sm:mb-4 min-h-[52px] sm:min-h-[56px]">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-cyan-400/40 transition-all duration-300">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug break-words">
                        {displayedTitle}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider line-clamp-2 mt-0.5 break-words" title={displayedDesc}>
                        {displayedDesc}
                      </p>
                    </div>
                  </div>

                  {/* Skills List with Smooth Internal and Boundary-Chained Scrolling */}
                  <div 
                    onWheel={handleCardListWheel}
                    className="space-y-2.5 sm:space-y-3 pt-3.5 sm:pt-4 border-t border-white/5 flex-1 min-w-0 max-h-[460px] overflow-y-auto pr-1 sm:pr-1.5 overscroll-y-auto"
                  >
                    {category.skills
                      .filter((s) => {
                        if (!searchQuery.trim()) return true;
                        const q = searchQuery.toLowerCase();
                        return s.name.toLowerCase().includes(q) || (s.badge && s.badge.toLowerCase().includes(q));
                      })
                      .map((skill, idx) => {
                        const isActive = activeSkillFilter === skill.name;
                        return (
                          <motion.button
                            key={idx}
                            id={`skill-badge-btn-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            type="button"
                            onClick={(e) => handleSkillClick(skill.name, e)}
                            onMouseEnter={(e) => handleSkillMouseEnter(e, skill, displayedTitle)}
                            onMouseLeave={handleSkillMouseLeave}
                            onFocus={(e) => handleSkillMouseEnter(e, skill, displayedTitle)}
                            onBlur={handleSkillMouseLeave}
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className={`w-full text-left p-2 sm:p-2.5 rounded-xl transition-all duration-200 group/skill cursor-pointer border relative overflow-hidden transform will-change-transform ${
                              isActive
                                ? 'bg-cyan-950/40 border-cyan-400/60 active-glow-pulse shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                : 'bg-white/[0.02] border-white/5 hover:border-cyan-400/40 hover:bg-white/[0.05] hover-glow-pulse'
                            }`}
                            title={`Filter portfolio by ${skill.name}`}
                          >
                            {/* Subtle Ambient Radial Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex items-start justify-between text-xs gap-2 mb-2">
                              <div className="flex items-start gap-1.5 sm:gap-2 font-medium text-gray-200 min-w-0 flex-1">
                                {skill.isPrimary ? (
                                  <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 shrink-0 mt-0.5 group-hover/skill:scale-125 transition-transform" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover/skill:bg-cyan-400 group-hover/skill:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all shrink-0 mt-1.5" />
                                )}
                                <span className={`text-[11px] sm:text-xs leading-snug group-hover/skill:text-cyan-300 transition-colors break-words ${isActive ? 'text-cyan-300 font-bold' : ''}`}>
                                  {skill.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 mt-0.5">
                                {skill.badge && (
                                  <span className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold uppercase border whitespace-nowrap transition-all ${
                                    isActive
                                      ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                                      : 'bg-white/5 text-purple-300 border-white/10 group-hover/skill:border-cyan-400/50 group-hover/skill:text-cyan-200 group-hover/skill:bg-cyan-950/30'
                                  }`}>
                                    {skill.badge}
                                  </span>
                                )}
                                <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover/skill:text-cyan-400 group-hover/skill:translate-x-0.5 group-hover/skill:-translate-y-0.5 transition-all shrink-0" />
                              </div>
                            </div>

                            {/* Level Progress Bar with Dynamic Glow Accent */}
                            <div className="relative z-10 h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  isActive
                                    ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                                    : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 group-hover/skill:shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                                }`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </motion.button>
                        );
                      })}
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 mt-4 sm:mt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-mono uppercase tracking-wider shrink-0 gap-2 flex-wrap sm:flex-nowrap">
                  <span>{category.skills.length} Core Modules</span>
                  <span className="text-cyan-400 flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3" />
                    <span>Production-Ready</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Global Floating Workflow & Skill Detail Tooltip rendered via Portal */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                key={`tooltip-${hoveredSkill.name}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  x: '-50%',
                  y: hoveredSkill.placement === 'top' ? '-96%' : '4%' 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: '-50%',
                  y: hoveredSkill.placement === 'top' ? '-100%' : '0%' 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  x: '-50%',
                  y: hoveredSkill.placement === 'top' ? '-96%' : '4%' 
                }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                }}
                onMouseLeave={handleSkillMouseLeave}
                style={{
                  position: 'fixed',
                  left: `${hoveredSkill.x}px`,
                  top: `${hoveredSkill.y}px`,
                  zIndex: 99999
                }}
                id="skill-tooltip-portal"
                className="w-[300px] sm:w-[340px] max-w-[calc(100vw-32px)] bg-[#0c0c10]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_24px_rgba(6,182,212,0.25)] text-gray-200 pointer-events-auto select-none"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                  <div className="flex items-start gap-1.5 min-w-0 flex-1">
                    {hoveredSkill.isPrimary ? (
                      <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 shrink-0 mt-0.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs sm:text-sm font-bold text-white leading-snug break-words font-display">
                      {hoveredSkill.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    {hoveredSkill.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        {hoveredSkill.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setHoveredSkill(null)}
                      className="text-gray-400 hover:text-white p-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
                      title="Close tooltip"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Skill Description / Summary */}
                {hoveredSkill.description && (
                  <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed font-normal mb-2.5">
                    {hoveredSkill.description}
                  </p>
                )}

                {/* Workflow Application Box */}
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-2.5 space-y-1 mb-2.5">
                  <div className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-cyan-400/95 font-semibold">
                    <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Professional Workflow Application</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-200 leading-relaxed font-normal">
                    {hoveredSkill.workflow}
                  </p>
                </div>

                {/* Proficiency Level Progress */}
                <div className="space-y-1.5 pt-1 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-gray-400">Proficiency Mastery</span>
                    <span className="text-cyan-400 font-bold">{hoveredSkill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      style={{ width: `${hoveredSkill.level}%` }}
                    />
                  </div>
                </div>

                {/* Footer status & hint */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono gap-2">
                  <span className="text-[9px] text-gray-400 truncate max-w-[120px] sm:max-w-[140px]">{hoveredSkill.categoryTitle}</span>
                  <button 
                    type="button"
                    onClick={() => handleFilterToPortfolio(hoveredSkill.name)}
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-0.5 text-[9px] font-semibold cursor-pointer shrink-0"
                  >
                    View in Portfolio <ArrowUpRight className="w-2.5 h-2.5 text-cyan-400" />
                  </button>
                </div>

                {/* Arrow indicator pointing directly at target element */}
                <div 
                  id="skill-tooltip-arrow"
                  style={{ left: `${hoveredSkill.arrowLeft}px` }}
                  className={`absolute -translate-x-1/2 w-2.5 h-2.5 bg-[#0c0c10] border-cyan-500/40 rotate-45 ${
                    hoveredSkill.placement === 'top'
                      ? 'bottom-[-6px] border-r border-b'
                      : 'top-[-6px] border-l border-t'
                  }`}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
};

