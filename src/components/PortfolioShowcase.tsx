import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from 'react';
import { motion, type Variants } from 'motion/react';
import { Project } from '../types';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { matchProjectWithSkill } from '../utils/skillMatcher';
import { ProjectCard } from './ProjectCard';
import { PortfolioGridSkeleton } from './ProjectCardSkeleton';
import { SectionHeader } from './SectionHeader';
import { YouTubeIcon } from './YouTubeIcon';
import { useDraggableScroll } from '../hooks/useDraggableScroll';
import { soundManager } from '../utils/soundEffects';
import { 
  ExternalLink, 
  Film, 
  Layers, 
  Palette,
  Package, 
  Layout, 
  Cpu, 
  ArrowUpRight, 
  RotateCcw,
  Zap,
  X,
  ChevronDown,
  ChevronUp,
  Search,
  SearchX
} from 'lucide-react';

const INITIAL_PROJECTS_COUNT = 6;

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Code-split ProjectModal so it is only fetched and initialized when needed
const ProjectModal = lazy(() => 
  import('./ProjectModal').then((module) => ({ default: module.ProjectModal }))
);

// Pre-indexed search corpus map to enable instant O(1) corpus lookup without per-keystroke allocations
const SEARCH_CORPUS_MAP = new Map<string, string>();
PROJECTS_DATA.forEach((p) => {
  const corpus = [
    p.code,
    p.title,
    p.titleEn,
    p.clientOrContext,
    p.categoryLabel,
    p.categoryLabelEn,
    p.tagBadge,
    p.badge,
    ...(p.tags || []),
    ...(p.tools || []),
    p.description,
    p.descriptionEn,
    ...(p.deliverables || []),
    ...(p.deliverablesEn || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  SEARCH_CORPUS_MAP.set(p.id, corpus);
});

// Custom category-specific project order (used when a specific category filter is active).
// While 'all' preserves the original chronological order of PROJECTS_DATA, individual category
// views can have their own independent showcase ordering.
const CATEGORY_CUSTOM_ORDER: Record<string, string[]> = {
  packaging: [
    'kopi-garasi-packaging',
    'buhan-kripik-jamur-packaging',
    'makanpus-cat-food-packaging',
    'sribufood-box-packaging',
  ],
};

interface PortfolioShowcaseProps {
  selectedSkillFilter?: string | null;
  onClearSkillFilter?: () => void;
  isLoading?: boolean;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ 
  selectedSkillFilter = null,
  onClearSkillFilter,
  isLoading = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced input change handler (250ms) to avoid expensive recalculations on rapid input
  const handleSearchChange = useCallback((value: string) => {
    setSearchInputValue(value);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(value);
    }, 250);
  }, []);

  const handleClearSearch = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setSearchInputValue('');
    setDebouncedSearchQuery('');
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const {
    containerRef: portfolioScrollRef,
    isDragging: isPortfolioDragging,
    showLeftFade: showPortLeftFade,
    showRightFade: showPortRightFade,
    handleMouseDown: handlePortMouseDown,
    handleMouseMove: handlePortMouseMove,
    handleMouseUp: handlePortMouseUp,
    handleMouseLeave: handlePortMouseLeave,
    handleItemClick: handlePortItemClick,
  } = useDraggableScroll<HTMLDivElement>({ dragSpeed: 1.25 });

  const categories = useMemo(() => [
    { 
      id: 'all', 
      label: 'All Projects',
      icon: Layers,
      filterFn: () => true 
    },
    { 
      id: 'video', 
      label: 'Motion & Video',
      icon: Film,
      filterFn: (p: Project) => p.category === 'motion' || p.category === 'video'
    },
    { 
      id: 'graphic', 
      label: 'Graphic & Brand',
      icon: Palette,
      filterFn: (p: Project) => p.category === 'branding'
    },
    { 
      id: 'packaging', 
      label: 'Packaging',
      icon: Package,
      filterFn: (p: Project) => p.category === 'packaging'
    },
    { 
      id: 'web', 
      label: 'UI/UX & Web',
      icon: Layout,
      filterFn: (p: Project) => p.category === 'uiux'
    },
    { 
      id: 'ai', 
      label: 'Generative AI',
      icon: Cpu,
      filterFn: (p: Project) => p.category === 'ai'
    }
  ], []);

  const currentCategoryObj = useMemo(() => 
    categories.find((c) => c.id === selectedCategory) || categories[0],
    [categories, selectedCategory]
  );
  
  // Optimized real-time search filter matching predicate using pre-indexed corpus map
  const matchesSearch = useCallback((p: Project, query: string): boolean => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const terms = q.split(/\s+/).filter(Boolean);
    const corpus = SEARCH_CORPUS_MAP.get(p.id) || '';
    return terms.every((term) => corpus.includes(term));
  }, []);

  // Filter by category, skill filter (if active), and debounced search query (memoized to prevent unneeded re-renders)
  const filteredProjects = useMemo(() => {
    const list = PROJECTS_DATA.filter((p) => {
      const matchesCategory = currentCategoryObj.filterFn(p);
      const matchesSkill = selectedSkillFilter ? matchProjectWithSkill(p, selectedSkillFilter) : true;
      const matchesQuery = matchesSearch(p, debouncedSearchQuery);
      return matchesCategory && matchesSkill && matchesQuery;
    });

    // When a specific category tab is active (not 'all') and has an independent custom order defined, sort by it
    if (selectedCategory !== 'all' && CATEGORY_CUSTOM_ORDER[selectedCategory]) {
      const order = CATEGORY_CUSTOM_ORDER[selectedCategory];
      return [...list].sort((a, b) => {
        const indexA = order.indexOf(a.id);
        const indexB = order.indexOf(b.id);
        const rankA = indexA !== -1 ? indexA : 9999;
        const rankB = indexB !== -1 ? indexB : 9999;
        return rankA - rankB;
      });
    }

    return list;
  }, [currentCategoryObj, selectedCategory, selectedSkillFilter, debouncedSearchQuery, matchesSearch]);

  // Limit initial display to 6 projects only when 'all' category is active, not expanded, and not searching
  const isInitialLimited = selectedCategory === 'all' && !isExpanded && !debouncedSearchQuery.trim() && !searchInputValue.trim() && filteredProjects.length > INITIAL_PROJECTS_COUNT;

  const displayedProjects = useMemo(() => {
    if (isInitialLimited) {
      return filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);
    }
    return filteredProjects;
  }, [filteredProjects, isInitialLimited]);

  // Memoized category counts dictionary: computed once per skill filter change, avoiding 6 full array scans on every render
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat.id] = PROJECTS_DATA.filter((p) => {
        const matchesCategory = cat.filterFn(p);
        const matchesSkill = selectedSkillFilter ? matchProjectWithSkill(p, selectedSkillFilter) : true;
        return matchesCategory && matchesSkill;
      }).length;
    });
    return counts;
  }, [categories, selectedSkillFilter]);

  const handleResetAllFilters = useCallback(() => {
    setSelectedCategory('all');
    setIsExpanded(false);
    handleClearSearch();
    if (onClearSkillFilter) {
      onClearSkillFilter();
    }
  }, [onClearSkillFilter, handleClearSearch]);

  // Helper to find a project by 3-digit code, id, or legacy hash
  const findProjectByRoute = useCallback((routeString: string): Project | undefined => {
    const clean = routeString.replace(/^#/, '').replace(/^\/+|\/+$/g, '').trim();
    if (!clean) return undefined;
    const cleanWithoutPrefix = clean.startsWith('project-') ? clean.slice(8) : clean;
    return PROJECTS_DATA.find((p) => 
      p.code === clean || 
      p.id === clean || 
      p.id === cleanWithoutPrefix || 
      `project-${p.id}` === clean
    );
  }, []);

  // Sync route on mount, popstate (Back/Forward), and legacy hash changes
  useEffect(() => {
    const handleLocationChange = (isInitialMount = false) => {
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
      const hash = window.location.hash.replace(/^#/, '').trim();

      // 1. Check legacy hash first for backward compatibility (Requirement 6)
      if (hash && (hash.startsWith('project-') || PROJECTS_DATA.some(p => p.id === hash || p.code === hash || `project-${p.id}` === hash))) {
        const hashProject = findProjectByRoute(hash);
        if (hashProject) {
          setActiveModalProject(hashProject);
          window.history.replaceState({ modalOpen: true, code: hashProject.code }, '', `/${hashProject.code}`);
          return;
        }
      }

      // 2. Check path-based URL (e.g. /434 or direct link / refresh)
      if (pathname) {
        const pathProject = findProjectByRoute(pathname);
        if (pathProject) {
          setActiveModalProject(pathProject);
          if (pathname !== pathProject.code) {
            window.history.replaceState({ modalOpen: true, code: pathProject.code }, '', `/${pathProject.code}`);
          }
          return;
        } else {
          // If the code does not match any project, show normal home page and change address back to "/"
          setActiveModalProject(null);
          window.history.replaceState({ modalOpen: false }, '', '/');
          return;
        }
      }

      // 3. Pathname is empty ("/") -> close modal (e.g. Back button pressed to return to home page)
      if (!isInitialMount) {
        setActiveModalProject(null);
      }
    };

    handleLocationChange(true);

    const onPopState = () => handleLocationChange(false);
    const onHashChange = () => handleLocationChange(false);

    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [findProjectByRoute]);

  const handleOpenModal = useCallback((project: Project) => {
    try {
      soundManager.playModalOpen();
    } catch {}
    setActiveModalProject(project);
    try {
      if (window.location.pathname !== `/${project.code}`) {
        window.history.pushState({ modalOpen: true, code: project.code, projectId: project.id }, '', `/${project.code}`);
      }
    } catch {}
  }, []);

  const handleCloseModal = useCallback(() => {
    try {
      soundManager.playModalClose();
    } catch {}
    setActiveModalProject(null);
    try {
      if (window.location.pathname !== '/') {
        window.history.pushState({ modalOpen: false }, '', '/');
      }
    } catch {}
  }, []);

  // Active list of projects for modal navigation (prefer current filtered list if it has > 1 project, otherwise all projects)
  const modalProjectList = useMemo(() => {
    if (filteredProjects.length > 1 && filteredProjects.some(p => p.id === activeModalProject?.id)) {
      return filteredProjects;
    }
    return PROJECTS_DATA;
  }, [filteredProjects, activeModalProject]);

  const modalCurrentIndex = useMemo(() => {
    if (!activeModalProject) return -1;
    return modalProjectList.findIndex(p => p.id === activeModalProject.id);
  }, [modalProjectList, activeModalProject]);

  const previousProject = useMemo(() => {
    if (modalCurrentIndex === -1 || modalProjectList.length <= 1) return null;
    const prevIdx = (modalCurrentIndex - 1 + modalProjectList.length) % modalProjectList.length;
    return modalProjectList[prevIdx];
  }, [modalCurrentIndex, modalProjectList]);

  const nextProject = useMemo(() => {
    if (modalCurrentIndex === -1 || modalProjectList.length <= 1) return null;
    const nextIdx = (modalCurrentIndex + 1) % modalProjectList.length;
    return modalProjectList[nextIdx];
  }, [modalCurrentIndex, modalProjectList]);

  const handlePreviousProject = useCallback(() => {
    if (previousProject) {
      try {
        soundManager.playClick();
      } catch {}
      setActiveModalProject(previousProject);
      try {
        window.history.pushState({ modalOpen: true, code: previousProject.code, projectId: previousProject.id }, '', `/${previousProject.code}`);
      } catch {}
    }
  }, [previousProject]);

  const handleNextProject = useCallback(() => {
    if (nextProject) {
      try {
        soundManager.playClick();
      } catch {}
      setActiveModalProject(nextProject);
      try {
        window.history.pushState({ modalOpen: true, code: nextProject.code, projectId: nextProject.id }, '', `/${nextProject.code}`);
      } catch {}
    }
  }, [nextProject]);

  return (
    <section id="portfolio" className="py-24 relative bg-transparent overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="03"
          className="mb-8"
          eyebrow="Portfolio & Explorations"
          icon={<Layers className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400" />}
          title={
            <>
              Selected Works &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Creative Output
              </span>
            </>
          }
          rightAction={
            <div className="flex items-center gap-3">
              <a
                id="portfolio-header-behance-link"
                href={PERSONAL_INFO.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-200 transition-colors"
              >
                <span className="font-bold text-cyan-400">Bē</span>
                <span>Behance</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
              <a
                id="portfolio-header-youtube-link"
                href={PERSONAL_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-gray-200 transition-colors"
              >
                <YouTubeIcon className="w-3.5 h-3.5" />
                <span>YouTube</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          }
        />

        {/* Active Skill Filter Alert Pill (when filtered from Skills section) */}
        {selectedSkillFilter && (
          <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-[#0f0f0f] border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Zap className="w-4 h-4 fill-cyan-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-400 font-mono">Filter by Skill:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-300 font-mono">
                    {selectedSkillFilter}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  Showing {filteredProjects.length} project(s) matching skill &quot;{selectedSkillFilter}&quot;
                </p>
              </div>
            </div>

            <button
              id="clear-skill-filter-btn"
              type="button"
              onClick={() => {
                try {
                  soundManager.playClick();
                } catch {}
                if (onClearSkillFilter) onClearSkillFilter();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-gray-200 hover:text-white transition-all font-mono font-medium shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              title="Clear Filter"
              aria-label="Clear active skill filter"
            >
              <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Real-time Search Input Bar with Debounced Filtering */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:max-w-md">
            <label htmlFor="portfolio-search-input" className="sr-only">
              Search portfolio projects by keyword, title, or tags
            </label>
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-cyan-400 pointer-events-none transition-colors" />
              <input
                id="portfolio-search-input"
                type="text"
                value={searchInputValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    handleClearSearch();
                  }
                }}
                placeholder="Search by keyword, title, client, or tags..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.09] focus:bg-black/80 border border-white/10 hover:border-white/20 focus:border-cyan-400 text-xs sm:text-sm text-white placeholder-gray-400 font-mono transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 shadow-inner"
              />
              {searchInputValue && (
                <button
                  id="clear-portfolio-search-btn"
                  type="button"
                  onClick={() => {
                    try {
                      soundManager.playClick();
                    } catch {}
                    handleClearSearch();
                  }}
                  className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Clear search query"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {debouncedSearchQuery.trim() && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 pl-1 sm:pl-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching &quot;{debouncedSearchQuery}&quot;
              </span>
            </div>
          )}
        </div>

        {/* Filter Controls & Status Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs Bar with Smooth Draggable Horizontal Scrolling and End Padding */}
          <div className="relative w-full lg:w-auto min-w-0 flex-1 overflow-hidden">
            {/* Left & Right Gradient Edge Fades for scroll indication */}
            <div 
              className={`tab-fade-left absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-300 ${
                showPortLeftFade ? 'opacity-100' : 'opacity-0'
              }`} 
              aria-hidden="true"
            />
            <div 
              className={`tab-fade-right absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-300 ${
                showPortRightFade ? 'opacity-100' : 'opacity-0'
              }`} 
              aria-hidden="true"
            />

            <div 
              ref={portfolioScrollRef}
              onMouseDown={handlePortMouseDown}
              onMouseMove={handlePortMouseMove}
              onMouseUp={handlePortMouseUp}
              onMouseLeave={handlePortMouseLeave}
              className={`flex items-center gap-2.5 overflow-x-auto scrollbar-hide select-none py-1.5 px-4 sm:px-1 -mx-4 sm:mx-0 w-full lg:w-auto min-w-0 flex-1 ${
                isPortfolioDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] ?? 0;
                const badgeText = (cat.id === 'all' && isSelected && count > INITIAL_PROJECTS_COUNT && !isExpanded)
                  ? `${INITIAL_PROJECTS_COUNT}/${count}`
                  : `${count}`;
                return (
                  <button
                    key={cat.id}
                    id={`filter-btn-${cat.id}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`Filter projects by ${cat.label} (${count} available)`}
                    onClick={handlePortItemClick((e) => {
                      try {
                        soundManager.playClick();
                      } catch {}
                      setSelectedCategory(cat.id);
                      setIsExpanded(false);
                      (e.currentTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                    })}
                    className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isSelected
                        ? 'bg-white text-black shadow-lg shadow-white/10 ring-1 ring-white'
                        : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 font-mono'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-gray-300'}`} />
                    <span>{cat.label}</span>
                    <span 
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isSelected ? 'bg-black/15 text-black font-bold' : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {badgeText}
                    </span>
                  </button>
                );
              })}
              {/* End spacing spacer to ensure last tab is never clipped against right edge */}
              <div className="w-4 shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Results Summary & Reset */}
          <div className="flex items-center gap-3 text-xs font-mono text-gray-400 shrink-0 self-start lg:self-auto pl-1 sm:pl-0">
            <span>
              {debouncedSearchQuery.trim()
                ? `Found ${filteredProjects.length} ${filteredProjects.length === 1 ? 'Project' : 'Projects'}`
                : selectedCategory === 'all' && filteredProjects.length > INITIAL_PROJECTS_COUNT && !isExpanded
                ? `Showing ${displayedProjects.length} of ${filteredProjects.length} Projects`
                : `Showing ${filteredProjects.length} Projects`}
            </span>
            {(selectedCategory !== 'all' || selectedSkillFilter !== null || isExpanded || searchInputValue.trim() !== '' || debouncedSearchQuery.trim() !== '') && (
              <button
                id="reset-portfolio-filter-btn"
                onClick={handleResetAllFilters}
                className="flex items-center gap-1.5 text-cyan-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                title="Reset filter"
                aria-label="Reset portfolio filters to show all projects"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid / Skeleton Loading State */}
        {isLoading ? (
          <PortfolioGridSkeleton count={6} />
        ) : filteredProjects.length > 0 ? (
          <>
            <motion.div 
              id="portfolio-grid"
              key={`${selectedCategory}-${selectedSkillFilter || 'all'}-${isExpanded ? 'expanded' : 'collapsed'}`}
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch ${
                selectedCategory === 'all' && filteredProjects.length > INITIAL_PROJECTS_COUNT ? 'mb-8' : 'mb-16'
              }`}
            >
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  index={index}
                  project={project}
                  onOpenModal={handleOpenModal}
                />
              ))}
            </motion.div>

            {/* Show More / Show Less Button for 'all' filter when projects exceed 6 */}
            {selectedCategory === 'all' && filteredProjects.length > INITIAL_PROJECTS_COUNT && (
              <div className="flex flex-col items-center justify-center -mt-2 mb-16 gap-2.5">
                <button
                  id="portfolio-load-more-btn"
                  type="button"
                  onClick={() => {
                    setIsExpanded((prev) => {
                      const nextState = !prev;
                      if (!nextState) {
                        const portfolioEl = document.getElementById('portfolio');
                        if (portfolioEl) {
                          portfolioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                      <span>Show More Projects</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-bold">
                        +{filteredProjects.length - INITIAL_PROJECTS_COUNT}
                      </span>
                      <ChevronDown className="w-4 h-4 text-cyan-400 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </>
                  )}
                </button>
                <p className="text-[11px] font-mono text-gray-500">
                  {isExpanded
                    ? `Showing all ${filteredProjects.length} projects`
                    : `Showing ${displayedProjects.length} of ${filteredProjects.length} projects`}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center bg-[#0f0f0f] border border-white/10 rounded-3xl mb-16">
            {(debouncedSearchQuery.trim() || searchInputValue.trim()) ? (
              <SearchX className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            ) : (
              <Layers className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            )}
            <h3 className="font-display font-bold text-white text-lg mb-1">
              {(debouncedSearchQuery.trim() || searchInputValue.trim())
                ? `No Projects Found Matching "${debouncedSearchQuery.trim() || searchInputValue.trim()}"`
                : selectedSkillFilter 
                ? 'No Projects Match This Specific Skill' 
                : 'No Projects Found'}
            </h3>
            <p className="text-gray-400 text-xs font-mono mb-4 max-w-md mx-auto">
              {(debouncedSearchQuery.trim() || searchInputValue.trim())
                ? 'Try checking for typos, searching by broader keywords, or exploring tags like "motion", "branding", or "packaging".'
                : selectedSkillFilter 
                ? 'Try clearing the skill filter or exploring other categories.'
                : 'Try choosing a different category or resetting the filters.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {(debouncedSearchQuery.trim() || searchInputValue.trim()) && (
                <button
                  id="empty-state-clear-search-btn"
                  type="button"
                  onClick={() => {
                    try {
                      soundManager.playClick();
                    } catch {}
                    handleClearSearch();
                  }}
                  className="px-5 py-2.5 min-h-[44px] rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-bold uppercase tracking-wider transition-colors font-mono cursor-pointer"
                >
                  Clear Search
                </button>
              )}
              <button
                id="empty-state-view-all-btn"
                type="button"
                onClick={handleResetAllFilters}
                className="px-5 py-2.5 min-h-[44px] rounded-full bg-white text-black hover:bg-cyan-400 text-xs font-bold uppercase tracking-wider transition-colors font-mono cursor-pointer"
              >
                View All Projects
              </button>
            </div>
          </div>
        )}

        {/* Behance & YouTube Showcase Banner */}
        <div 
          id="portfolio-showcase-cta-banner"
          className="portfolio-cta-banner bg-gradient-to-tr from-[#111111] via-[#161616] to-[#0c0c0c] border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden transition-all duration-300 ease-out hover:border-white/20 hover:scale-[1.008] hover:shadow-2xl will-change-transform"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-xl">
              <span className="block text-xs uppercase tracking-[0.2em] text-purple-400 font-bold mb-2">
                COMPLETE SHOWCASE
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                Want to explore more video reels & designs?
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm opacity-80">
                Explore the complete collection of commercial edits, motion reels, and brand identity projects on Behance and YouTube.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                id="banner-behance-btn"
                href={PERSONAL_INFO.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black hover:bg-cyan-400 font-black text-xs uppercase tracking-widest transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-md"
              >
                <span>Behance</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                id="banner-youtube-btn"
                href={PERSONAL_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest border border-white/10 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <YouTubeIcon className="w-4 h-4" />
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Dialog for Project Details wrapped in Suspense */}
      {activeModalProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={activeModalProject}
            isOpen={Boolean(activeModalProject)}
            onClose={handleCloseModal}
            onPreviousProject={modalProjectList.length > 1 ? handlePreviousProject : undefined}
            onNextProject={modalProjectList.length > 1 ? handleNextProject : undefined}
            previousProject={previousProject}
            nextProject={nextProject}
            currentIndex={modalCurrentIndex !== -1 ? modalCurrentIndex : 0}
            totalProjects={modalProjectList.length}
          />
        </Suspense>
      )}
    </section>
  );
};
