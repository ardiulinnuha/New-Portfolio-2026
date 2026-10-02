import React, { useEffect, useRef } from 'react';

export type SectionTheme = 
  | 'hero' 
  | 'about' 
  | 'portfolio' 
  | 'experience' 
  | 'skills' 
  | 'certifications' 
  | 'awards' 
  | 'contact' 
  | 'navbar' 
  | 'footer'
  | 'default';

export type InteractiveType = 
  | 'default' 
  | 'button' 
  | 'link' 
  | 'project' 
  | 'video' 
  | 'chat' 
  | 'copy' 
  | 'input' 
  | 'card';

interface ThemeColorConfig {
  primary: string;
  secondary: string;
  glow: string;
  dot: string;
  border: string;
  badgeBg: string;
  textColor: string;
}

const THEME_MAP: Record<SectionTheme, ThemeColorConfig> = {
  hero: {
    primary: '#06b6d4', // Cyan
    secondary: '#a855f7', // Purple
    glow: 'rgba(6, 182, 212, 0.35)',
    dot: '#22d3ee',
    border: 'rgba(6, 182, 212, 0.6)',
    badgeBg: 'rgba(6, 182, 212, 0.2)',
    textColor: '#e0f2fe',
  },
  about: {
    primary: '#c084fc', // Purple
    secondary: '#06b6d4',
    glow: 'rgba(192, 132, 252, 0.35)',
    dot: '#d8b4fe',
    border: 'rgba(168, 85, 247, 0.6)',
    badgeBg: 'rgba(168, 85, 247, 0.2)',
    textColor: '#f3e8ff',
  },
  portfolio: {
    primary: '#38bdf8', // Electric Sky Blue
    secondary: '#818cf8', // Indigo
    glow: 'rgba(56, 189, 248, 0.4)',
    dot: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.7)',
    badgeBg: 'rgba(56, 189, 248, 0.25)',
    textColor: '#f0f9ff',
  },
  experience: {
    primary: '#f59e0b', // Amber / Gold
    secondary: '#10b981', // Emerald
    glow: 'rgba(245, 158, 11, 0.35)',
    dot: '#fbbf24',
    border: 'rgba(245, 158, 11, 0.65)',
    badgeBg: 'rgba(245, 158, 11, 0.2)',
    textColor: '#fef3c7',
  },
  skills: {
    primary: '#0ea5e9', // Tech Azure
    secondary: '#6366f1', // Indigo
    glow: 'rgba(14, 165, 233, 0.35)',
    dot: '#38bdf8',
    border: 'rgba(14, 165, 233, 0.65)',
    badgeBg: 'rgba(14, 165, 233, 0.2)',
    textColor: '#e0f2fe',
  },
  certifications: {
    primary: '#10b981', // Verified Emerald
    secondary: '#06b6d4', // Cyan
    glow: 'rgba(16, 185, 129, 0.35)',
    dot: '#34d399',
    border: 'rgba(16, 185, 129, 0.65)',
    badgeBg: 'rgba(16, 185, 129, 0.2)',
    textColor: '#ecfdf5',
  },
  awards: {
    primary: '#eab308', // Trophy Gold
    secondary: '#f97316', // Amber Orange
    glow: 'rgba(234, 179, 8, 0.4)',
    dot: '#fde047',
    border: 'rgba(234, 179, 8, 0.7)',
    badgeBg: 'rgba(234, 179, 8, 0.2)',
    textColor: '#fef9c3',
  },
  contact: {
    primary: '#ec4899', // Vibrant Magenta
    secondary: '#06b6d4', // Cyan
    glow: 'rgba(236, 72, 153, 0.35)',
    dot: '#f472b6',
    border: 'rgba(236, 72, 153, 0.65)',
    badgeBg: 'rgba(236, 72, 153, 0.2)',
    textColor: '#fdf2f8',
  },
  navbar: {
    primary: '#22d3ee',
    secondary: '#a855f7',
    glow: 'rgba(34, 211, 238, 0.3)',
    dot: '#22d3ee',
    border: 'rgba(34, 211, 238, 0.5)',
    badgeBg: 'rgba(34, 211, 238, 0.15)',
    textColor: '#e0f2fe',
  },
  footer: {
    primary: '#818cf8',
    secondary: '#06b6d4',
    glow: 'rgba(129, 140, 248, 0.3)',
    dot: '#a5b4fc',
    border: 'rgba(129, 140, 248, 0.5)',
    badgeBg: 'rgba(129, 140, 248, 0.15)',
    textColor: '#e0e7ff',
  },
  default: {
    primary: '#06b6d4',
    secondary: '#a855f7',
    glow: 'rgba(6, 182, 212, 0.3)',
    dot: '#22d3ee',
    border: 'rgba(6, 182, 212, 0.5)',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    textColor: '#ffffff',
  },
};

export const CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerPosRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if pointer is touch/coarse or hover is unavailable
    if (typeof window !== 'undefined') {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
      if (isCoarse) {
        if (containerRef.current) containerRef.current.style.display = 'none';
        return;
      }
    }

    let isVisible = false;
    let isHovered = false;
    let isClicked = false;
    let cursorText = '';
    let currentSection: SectionTheme = 'hero';

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;

    let pendingTarget: EventTarget | null = null;
    let lastInspectedTarget: EventTarget | null = null;
    let lastInspectTime = 0;

    let rafId: number | null = null;
    let isRunning = false;

    // Apply colors to outer ring, dot, brackets, text directly without React re-render
    const applyThemeColors = () => {
      const theme = THEME_MAP[currentSection] || THEME_MAP.default;
      const ring = outerRingRef.current;
      const dot = dotRef.current;
      const brackets = bracketsRef.current;
      const text = textRef.current;

      if (ring) {
        ring.style.borderColor = isHovered ? theme.primary : theme.border;
        ring.style.backgroundColor = isHovered ? theme.badgeBg : 'rgba(0, 0, 0, 0.05)';
        ring.style.boxShadow = isHovered 
          ? `0 0 25px 4px ${theme.glow}, inset 0 0 12px 1px ${theme.glow}` 
          : `0 0 15px 0px ${theme.glow}`;
      }

      if (dot) {
        dot.style.backgroundColor = theme.dot;
        dot.style.boxShadow = `0 0 10px 2px ${theme.dot}`;
      }

      if (brackets) {
        const bracketBars = brackets.querySelectorAll<HTMLElement>('.cursor-bracket');
        bracketBars.forEach((bar) => {
          bar.style.backgroundColor = theme.primary;
        });
      }

      if (text) {
        text.style.color = theme.textColor;
        text.style.textShadow = `0 0 8px ${theme.primary}`;
      }
    };

    // Apply scale & content updates via GPU-accelerated transform: scale
    const updateTransformsAndState = () => {
      const ring = outerRingRef.current;
      const dot = dotRef.current;
      const brackets = bracketsRef.current;
      const text = textRef.current;

      const hasText = cursorText.length > 0;

      // Base size: 68px.
      // Default: 34 / 68 = 0.5.
      // Hovered without text: 48 / 68 = 0.706.
      // Hovered with text: 68 / 68 = 1.0.
      // Clicked: scale * 0.85
      const baseScale = isHovered ? (hasText ? 1.0 : 0.706) : 0.5;
      const finalScale = isClicked ? baseScale * 0.85 : baseScale;

      if (ring) {
        ring.style.transform = `translate(-50%, -50%) scale(${finalScale})`;
      }

      // Dot: base size 6px
      // Default: 5px -> scale(0.833)
      // Hover without text: 6px -> scale(1.0)
      // Hover with text: scale(0), opacity 0
      if (dot) {
        const dotScale = isHovered ? (hasText ? 0 : 1.0) : 0.833;
        dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dot.style.opacity = hasText ? '0' : '1';
      }

      if (brackets) {
        brackets.style.opacity = hasText ? '0' : '1';
      }

      if (text) {
        text.textContent = cursorText;
        text.style.opacity = hasText ? '1' : '0';
        text.style.transform = hasText ? 'scale(1)' : 'scale(0.6)';
      }

      applyThemeColors();
    };

    const inspectElementUnderCursor = (target: HTMLElement | null) => {
      if (!target) return;

      let sectionChanged = false;
      let stateChanged = false;

      // 1. Detect Active Section
      const sectionEl = target.closest('section, nav, footer, header') as HTMLElement | null;
      if (sectionEl) {
        const id = sectionEl.id || sectionEl.tagName.toLowerCase();
        let newSection: SectionTheme | null = null;
        if (id in THEME_MAP) {
          newSection = id as SectionTheme;
        } else if (id === 'nav' || sectionEl.tagName.toLowerCase() === 'nav') {
          newSection = 'navbar';
        } else if (id === 'footer' || sectionEl.tagName.toLowerCase() === 'footer') {
          newSection = 'footer';
        }
        if (newSection && newSection !== currentSection) {
          currentSection = newSection;
          sectionChanged = true;
        }
      }

      // 2. Detect Interactive Hover State
      const customCursorText = target.getAttribute('data-cursor-text') || target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      const interactiveEl = target.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor], .glow-card, [id^="project-item-"], [id^="experience-item-"], [id^="cert-item-"]'
      ) as HTMLElement | null;

      let newHovered = false;
      let newText = '';

      if (customCursorText) {
        newHovered = true;
        newText = customCursorText;
      } else if (interactiveEl) {
        newHovered = true;
        const tag = interactiveEl.tagName.toLowerCase();
        const href = (interactiveEl as HTMLAnchorElement).href || '';
        const id = interactiveEl.id || '';
        const ariaLabel = interactiveEl.getAttribute('aria-label') || '';

        if (tag === 'input' || tag === 'textarea' || tag === 'select') {
          newText = '';
        } else if (href.includes('youtube.com') || href.includes('youtu.be')) {
          newText = 'PLAY';
        } else if (href.includes('behance.net')) {
          newText = 'Bē';
        } else if (href.includes('g.dev')) {
          newText = 'G.DEV';
        } else if (href.includes('wa.me') || href.includes('whatsapp') || id.includes('whatsapp')) {
          newText = 'CHAT';
        } else if (id.includes('copy') || ariaLabel.toLowerCase().includes('copy') || ariaLabel.toLowerCase().includes('salin')) {
          newText = 'COPY';
        } else if (id.startsWith('project-item-') || interactiveEl.classList.contains('perspective-1000')) {
          newText = 'VIEW';
        } else if (id.startsWith('cert-item-')) {
          newText = 'INFO';
        } else if (tag === 'a') {
          newText = interactiveEl.classList.contains('px-') ? 'EXPLORE' : 'OPEN';
        } else if (tag === 'button') {
          newText = '';
        } else {
          newText = '';
        }
      }

      if (newHovered !== isHovered || newText !== cursorText) {
        isHovered = newHovered;
        cursorText = newText;
        stateChanged = true;
      }

      if (sectionChanged || stateChanged) {
        updateTransformsAndState();
      }
    };

    // Animation frame loop for smooth 60fps trailing physics without layout thrashing
    const loop = (timestamp: number) => {
      // 1. Throttled element inspection on target change
      if (pendingTarget !== lastInspectedTarget && timestamp - lastInspectTime > 32) {
        lastInspectTime = timestamp;
        lastInspectedTarget = pendingTarget;
        inspectElementUnderCursor(pendingTarget as HTMLElement | null);
      }

      // 2. Smooth trailing outer reticle physics (lerp)
      const dx = targetX - ringX;
      const dy = targetY - ringY;
      ringX += dx * 0.24;
      ringY += dy * 0.24;

      if (outerPosRef.current) {
        outerPosRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Keep loop running while moving or pending target inspection
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || pendingTarget !== lastInspectedTarget) {
        rafId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = targetX;
        ringY = targetY;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
        applyThemeColors();
        updateTransformsAndState();
      }

      // Direct instant GPU update for center dot
      if (dotRef.current) {
        const hasText = cursorText.length > 0;
        const dotScale = isHovered ? (hasText ? 0 : 1.0) : 0.833;
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      pendingTarget = e.target;
      startLoop();
    };

    const handleMouseDown = () => {
      isClicked = true;
      updateTransformsAndState();
    };

    const handleMouseUp = () => {
      isClicked = false;
      updateTransformsAndState();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div 
      id="custom-global-cursor" 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
    >
      {/* 1. Outer Spring Reticle & Aura Ring (GPU translate3d container) */}
      <div
        ref={outerPosRef}
        className="absolute top-0 left-0 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          ref={outerRingRef}
          className="flex items-center justify-center rounded-full will-change-transform"
          style={{
            width: 68,
            height: 68,
            transform: 'translate(-50%, -50%) scale(0.5)',
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: THEME_MAP.hero.border,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            boxShadow: `0 0 15px 0px ${THEME_MAP.hero.glow}`,
          }}
        >
          {/* Inner ring content container */}
          <div className="w-full h-full rounded-full relative flex items-center justify-center">
            {/* Futuristic Technologist Corner Reticle Brackets */}
            <div 
              ref={bracketsRef} 
              className="absolute inset-0 transition-opacity duration-200" 
              style={{ opacity: 1 }}
            >
              <div 
                className="cursor-bracket absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-[2px] rounded-full transition-colors duration-300"
                style={{ backgroundColor: THEME_MAP.hero.primary }}
              />
              <div 
                className="cursor-bracket absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-[2px] rounded-full transition-colors duration-300"
                style={{ backgroundColor: THEME_MAP.hero.primary }}
              />
              <div 
                className="cursor-bracket absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-[2px] rounded-full transition-colors duration-300"
                style={{ backgroundColor: THEME_MAP.hero.primary }}
              />
              <div 
                className="cursor-bracket absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-[2px] rounded-full transition-colors duration-300"
                style={{ backgroundColor: THEME_MAP.hero.primary }}
              />
            </div>

            {/* Interactive Context Text Badge */}
            <span
              ref={textRef}
              className="font-mono text-[9px] font-black uppercase tracking-widest text-center select-none transition-all duration-200 pointer-events-none"
              style={{
                opacity: 0,
                transform: 'scale(0.6)',
                color: THEME_MAP.hero.textColor,
                textShadow: `0 0 8px ${THEME_MAP.hero.primary}`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Direct Ultra-Crisp Precision Center Dot (GPU translate3d) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full will-change-transform"
        style={{
          width: 6,
          height: 6,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(0.833)',
          transition: 'transform 0.15s ease, opacity 0.15s ease, background-color 0.25s ease, box-shadow 0.25s ease',
          backgroundColor: THEME_MAP.hero.dot,
          boxShadow: `0 0 10px 2px ${THEME_MAP.hero.dot}`,
        }}
      />
    </div>
  );
};
