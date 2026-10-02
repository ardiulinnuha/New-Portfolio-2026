import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import profileAvatar from '../assets/images/regenerated_image_1787906550488.webp';
import { soundManager } from '../utils/soundEffects';
import { MobileDrawer } from './MobileDrawer';
import { 
  Menu, 
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // IntersectionObserver-based Scroll-Spy with smooth fallback
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'portfolio', 'skills', 'certifications', 'awards', 'contact'];
    const visibleSections = new Map<string, number>();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Update navbar background blur & shadow state
      setIsScrolled(scrollY > 30);

      // Top of page edge case -> Hero
      if (scrollY < 100) {
        setActiveSection('hero');
      }
      // Bottom of page edge case -> Contact
      else if (scrollY + viewportHeight >= docHeight - 90) {
        setActiveSection('contact');
      }
    };

    // IntersectionObserver to observe visible sections in the reading viewport
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY >= 100 && scrollY + viewportHeight < docHeight - 90 && visibleSections.size > 0) {
        let bestSection = '';
        let highestRatio = -1;

        sectionIds.forEach((id) => {
          const ratio = visibleSections.get(id);
          if (ratio !== undefined && ratio > highestRatio) {
            highestRatio = ratio;
            bestSection = id;
          }
        });

        if (bestSection) {
          setActiveSection(bestSection);
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // Target the reading frame (upper-middle portion of viewport)
      rootMargin: '-15% 0px -45% 0px',
      threshold: [0.05, 0.15, 0.3, 0.5, 0.7, 1.0]
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    // Run initial scroll check
    handleScroll();

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    window.addEventListener('resize', handleScrollThrottled, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      window.removeEventListener('resize', handleScrollThrottled);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certificates' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string, isMobile = false) => {
    e.preventDefault();
    try {
      soundManager.playClick();
    } catch {}
    
    setActiveSection(targetId);
    if (isMobile) {
      setMobileMenuOpen(false);
    }

    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      const navbarEl = document.getElementById('main-navbar');
      const navHeight = navbarEl ? navbarEl.getBoundingClientRect().height : (window.innerWidth < 640 ? 64 : 76);
      const extraGutter = window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 14 : 18;
      const totalOffset = navHeight + extraGutter;

      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60' 
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          id="navbar-brand-logo"
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-purple-800 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
            <div className="w-full h-full rounded-[14px] overflow-hidden flex items-center justify-center bg-[#050505] text-[0px] leading-[0]">
              <img
                src={profileAvatar}
                alt={PERSONAL_INFO.name}
                width={40}
                height={40}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full aspect-square object-cover object-top block select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base sm:text-lg tracking-tight uppercase transition-colors text-white group-hover:text-cyan-400">
                {PERSONAL_INFO.name}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border font-mono bg-white/10 text-cyan-300 border-white/10">
                <span className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse bg-cyan-400"></span>
                Available
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-mono hidden sm:block whitespace-nowrap text-gray-400">
              Creative Technologist | Google AI Certified
            </span>
          </div>
        </a>

        {/* Desktop Nav Items with Animated Active Pill */}
        <nav 
          id="desktop-nav" 
          className="hidden lg:flex items-center gap-1 rounded-full p-1.5 backdrop-blur-md transition-all duration-300 bg-[#0f0f0f]/90 border border-white/10 shadow-inner"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (activeSection === 'awards' && link.id === 'certifications');
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 z-10 select-none cursor-pointer ${
                  isActive ? 'active text-white font-extrabold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full -z-10 bg-white/15 border border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.22)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                {isActive && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full shrink-0 bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" 
                    aria-hidden="true"
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle (Accessible, >=44px touch target) */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => {
              try {
                soundManager.playClick();
              } catch {}
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-11 h-11 rounded-xl border transition-colors bg-[#0f0f0f] border-white/10 text-gray-300 hover:text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer flex items-center justify-center shrink-0"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Drawer Menu for Mobile Viewports */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={(e, sectionId) => handleNavClick(e, sectionId, true)}
        navLinks={navLinks}
      />
    </header>
  );
};
