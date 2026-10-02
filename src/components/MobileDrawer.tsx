import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home,
  User, 
  Briefcase, 
  Layers, 
  Cpu, 
  Award, 
  Mail, 
  ExternalLink, 
  MessageSquare, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import profileAvatar from '../assets/images/regenerated_image_1787906550488.webp';
import { soundManager } from '../utils/soundEffects';

interface NavLinkItem {
  id: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (e: React.MouseEvent, sectionId: string) => void;
  navLinks: NavLinkItem[];
}

const SECTION_ICONS: Record<string, React.FC<{ className?: string }>> = {
  hero: Home,
  about: User,
  experience: Briefcase,
  portfolio: Layers,
  skills: Cpu,
  certifications: Award,
  contact: Mail,
};

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  navLinks,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle keyboard 'Escape'
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when drawer is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        try {
          soundManager.playClick();
        } catch {}
        onClose();
      }
    };

    const handleResize = () => {
      // Auto close drawer if user expands to desktop viewport
      if (window.innerWidth >= 1024) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    try {
      soundManager.playClick();
    } catch {}
    onNavigate(e, sectionId);
    onClose();
  };

  const handleCloseClick = () => {
    try {
      soundManager.playClick();
    } catch {}
    onClose();
  };

  // Prepend Home / Top link for better mobile navigation accessibility
  const fullNavLinks = [
    { id: 'hero', label: 'Home' },
    ...navLinks,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="mobile-drawer-portal"
          className="fixed inset-0 z-[120] lg:hidden"
          role="region"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop Overlay */}
          <motion.div
            key="mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleCloseClick}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Slide-Over Panel */}
          <motion.aside
            key="mobile-drawer-panel"
            ref={drawerRef}
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-[86vw] max-w-[360px] sm:max-w-[400px] h-[100dvh] bg-[#070709] border-l border-white/10 shadow-2xl shadow-black flex flex-col justify-between overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shrink-0" />

            {/* Drawer Header */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0a0d] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-purple-800 p-[1.5px] shrink-0 shadow-md shadow-purple-500/20 overflow-hidden">
                  <div className="w-full h-full rounded-[14px] overflow-hidden flex items-center justify-center bg-[#050505] text-[0px] leading-[0]">
                    <img
                      src={profileAvatar}
                      alt={PERSONAL_INFO.name}
                      width={40}
                      height={40}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="w-full h-full aspect-square object-cover object-top block select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="font-display font-black text-sm text-white uppercase tracking-tight truncate">
                    {PERSONAL_INFO.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Available for Projects</span>
                  </div>
                </div>
              </div>

              {/* Accessible Close Button (>=44px touch target) */}
              <button
                ref={closeButtonRef}
                id="mobile-drawer-close-btn"
                type="button"
                onClick={handleCloseClick}
                className="w-11 h-11 rounded-xl flex items-center justify-center border transition-colors bg-[#0f0f13] border-white/10 text-gray-300 hover:text-white hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer shrink-0"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <nav 
              className="flex-1 px-4 py-4 sm:px-5 space-y-1.5 overflow-y-auto overscroll-contain"
              aria-label="Mobile Primary Navigation"
            >
              <div className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold">
                Navigation
              </div>

              {fullNavLinks.map((link, index) => {
                const isActive = 
                  link.id === 'hero' 
                    ? activeSection === 'hero' 
                    : activeSection === link.id || (activeSection === 'awards' && link.id === 'certifications');

                const IconComponent = SECTION_ICONS[link.id] || Sparkles;

                return (
                  <motion.a
                    key={link.id}
                    id={`drawer-link-${link.id}`}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.2 }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex items-center justify-between px-3.5 py-3 rounded-xl min-h-[48px] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/15 to-purple-500/5 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive 
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                          : 'bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className={isActive ? 'font-extrabold text-white' : 'font-semibold'}>
                        {link.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full font-bold bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                          ACTIVE
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                        isActive ? 'text-cyan-400 translate-x-0.5' : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5'
                      }`} />
                    </div>
                  </motion.a>
                );
              })}
            </nav>

            {/* Drawer Footer & Quick Connect */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0a0a0d] shrink-0 space-y-3">
              {/* Primary WhatsApp CTA */}
              <a
                id="drawer-whatsapp-btn"
                href={`https://wa.me/${PERSONAL_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    soundManager.playClick();
                  } catch {}
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Connect via WhatsApp</span>
              </a>

              {/* Social Channels Row */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PERSONAL_INFO.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      soundManager.playClick();
                    } catch {}
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-medium transition-colors bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5 min-h-[40px]"
                >
                  <span className="truncate">Behance</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0 ml-1" />
                </a>

                <a
                  href={PERSONAL_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      soundManager.playClick();
                    } catch {}
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-medium transition-colors bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5 min-h-[40px]"
                >
                  <span className="truncate">YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0 ml-1" />
                </a>
              </div>

              {/* Email info */}
              <div className="text-center pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-[11px] font-mono text-gray-400 hover:text-cyan-300 transition-colors inline-block"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
