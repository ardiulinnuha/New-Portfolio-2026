import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { YouTubeIcon } from './YouTubeIcon';
import { soundManager } from '../utils/soundEffects';
import { 
  ArrowRight, 
  Play, 
  ExternalLink,
  Star,
  Sun,
  Sunrise,
  Moon,
  Sparkles
} from 'lucide-react';

const getTimeBasedGreeting = (date: Date = new Date()): { greeting: string; period: 'morning' | 'afternoon' | 'evening'; timeStr: string } => {
  const hours = date.getHours();
  let greeting = 'Good evening';
  let period: 'morning' | 'afternoon' | 'evening' = 'evening';

  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
    period = 'morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
    period = 'afternoon';
  } else {
    greeting = 'Good evening';
    period = 'evening';
  }

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { greeting, period, timeStr };
};

export const Hero: React.FC = () => {
  const [timeInfo, setTimeInfo] = useState(() => getTimeBasedGreeting());
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  useEffect(() => {
    const updateTime = () => setTimeInfo(getTimeBasedGreeting());
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const toolsList = [
    { name: 'Adobe Premiere Pro', icon: 'Pr' },
    { name: 'Adobe After Effects', icon: 'Ae' },
    { name: 'Adobe Photoshop', icon: 'Ps' },
    { name: 'Adobe Illustrator', icon: 'Ai' },
    { name: 'Adobe InDesign', icon: 'Id' },
    { name: 'Google AI Studio', icon: 'AI' },
    { name: 'Figma UI/UX', icon: 'Fi' },
    { name: 'Prompt Engineering', icon: 'PE' }
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] min-h-[90dvh] flex items-center justify-center pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-transparent max-w-full"
    >
      {/* Immersive UI Atmospheric Glowing Blurs - moved strictly behind content and sized safely on mobile */}
      <div className="absolute top-10 right-10 w-48 h-48 sm:w-96 sm:h-96 max-w-full bg-purple-600/15 sm:bg-purple-600/20 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-96 sm:h-96 max-w-full bg-cyan-600/10 sm:bg-cyan-600/15 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] sm:max-w-[500px] lg:max-w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-purple-900/10 via-black to-cyan-900/10 rounded-full blur-2xl sm:blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Main Hero Container Card */}
        <div className="bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#080808] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl mb-6 sm:mb-8">
          
          {/* In-card atmospheric glow: positioned in background corner, never overlapping or covering name text */}
          <div className="absolute -top-16 -right-16 w-36 h-36 sm:w-96 sm:h-96 bg-purple-600/10 sm:bg-purple-600/15 blur-[50px] sm:blur-[120px] pointer-events-none -z-0"></div>
          <div className="absolute -bottom-16 -left-16 w-36 h-36 sm:w-96 sm:h-96 bg-cyan-600/10 blur-[50px] sm:blur-[120px] pointer-events-none -z-0"></div>

          <div className="relative z-10 flex flex-col items-start max-w-5xl">
            
            {/* Top Badges & Time-Based Greeting - Compact flex-wrap row (at most 2 lines on 360px phones) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mb-4 sm:mb-6">
              <div 
                id="hero-time-greeting-badge"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[10px] sm:text-xs font-mono tracking-wide text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                {timeInfo.period === 'morning' ? (
                  <Sunrise className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse" />
                ) : timeInfo.period === 'afternoon' ? (
                  <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 animate-pulse" />
                ) : (
                  <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300 animate-pulse" />
                )}
                <span className="font-bold tracking-wider">{timeInfo.greeting}</span>
                <span className="text-gray-500 text-[10px] hidden sm:inline">•</span>
                <span className="text-gray-400 text-[11px] font-mono hidden sm:inline">{timeInfo.timeStr}</span>
              </div>
              <div className="px-2.5 py-1 sm:px-4 sm:py-1.5 bg-white text-black font-black text-[10px] sm:text-xs rounded-full uppercase tracking-wider sm:tracking-widest shadow-md">
                Google AI Certified
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-cyan-400">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Available for Work</span>
              </div>
            </div>

            {/* Salutation Intro - Hidden on mobile to avoid repeating the greeting badge */}
            <div 
              id="hero-greeting-intro"
              className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-purple-400 font-bold mb-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{timeInfo.greeting}, welcome to my portfolio</span>
            </div>

            {/* Massive Immersive Headline - Fluid clamp typography on mobile with tight line-height */}
            <h1 
              id="hero-name-heading"
              className="font-display font-black text-[clamp(2.25rem,11vw,3.5rem)] sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 uppercase leading-[1.05] sm:leading-none mb-3 sm:mb-4 relative z-20"
            >
              Ardi Ulinnuha
            </h1>

            {/* Subtitle & Tagline - Fluid sizing */}
            <p 
              id="hero-tagline"
              className="text-[1.1rem] sm:text-xl md:text-2xl font-medium tracking-wide text-cyan-400 mb-3 sm:mb-5 font-display leading-snug"
            >
              Creative Technologist <span className="text-purple-400">|</span> Creative Designer <span className="text-purple-400">|</span> Video Editor
            </p>

            {/* Bio with 4-line limit on mobile + Read more toggle */}
            <p 
              id="hero-bio-lead"
              className={`text-[0.9rem] sm:text-base md:text-lg text-gray-300 max-w-4xl leading-[1.6] sm:leading-relaxed ${
                isBioExpanded ? '' : 'line-clamp-4 sm:line-clamp-none'
              } mb-2 sm:mb-8 opacity-90 font-light`}
            >
              Turning ideas into visuals that convert. 4+ years crafting motion graphics, branding, and promotional content for brands and organizations — powered by Adobe Creative Cloud and AI-driven creative workflows. Bachelor of Informatics, Amikom Yogyakarta.
            </p>

            {/* Read more / Read less toggle on mobile */}
            <button
              type="button"
              id="hero-bio-readmore-btn"
              onClick={() => setIsBioExpanded(!isBioExpanded)}
              className="sm:hidden text-cyan-400 hover:text-cyan-300 text-xs font-mono font-semibold mb-6 py-1 cursor-pointer inline-flex items-center gap-1 self-start min-h-[36px]"
              aria-expanded={isBioExpanded}
              aria-controls="hero-bio-lead"
            >
              <span>{isBioExpanded ? 'Read less ↑' : 'Read more... ↓'}</span>
            </button>

            {/* Action Buttons: Full-width on mobile with min 44px touch targets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
              <a
                id="hero-explore-portfolio-btn"
                href="#portfolio"
                onClick={() => {
                  try {
                    soundManager.playClick();
                  } catch {}
                }}
                className="px-7 py-3.5 min-h-[48px] w-full sm:w-auto justify-center rounded-full bg-white text-black hover:bg-cyan-400 font-black text-xs uppercase tracking-widest transition-all duration-200 active:scale-[0.98] shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black shrink-0" />
                <span>Explore Portfolio</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>

              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
                <a
                  id="hero-behance-btn"
                  href={PERSONAL_INFO.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-full bg-[#0f0f0f] hover:bg-[#1a1a1a] text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors active:scale-[0.98] cursor-pointer"
                >
                  <span className="text-cyan-400 font-bold">Bē</span>
                  <span>Behance</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                </a>

                <a
                  id="hero-youtube-btn"
                  href={PERSONAL_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-full bg-[#0f0f0f] hover:bg-[#1a1a1a] text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors active:scale-[0.98] cursor-pointer"
                >
                  <YouTubeIcon className="w-4 h-4 shrink-0" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Software / Workflow Stack Tags - Neatly wrapped on small screens without breaking layout */}
            <div className="w-full pt-5 sm:pt-6 border-t border-white/10 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-purple-400 font-bold mr-1 sm:mr-2">
                CORE STACK:
              </span>
              {toolsList.map((tool) => (
                <div
                  key={tool.name}
                  className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] sm:text-xs text-gray-300 font-medium hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-200 ease-out cursor-default flex items-center gap-1.5 shrink-0"
                >
                  <span className="text-[9px] sm:text-[10px] font-bold text-cyan-400 font-mono">[{tool.icon}]</span>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center hover:border-white/25 hover:scale-[1.02] hover:-translate-y-0.5 sm:hover:scale-[1.03] sm:hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out will-change-transform cursor-default"
            >
              <div className="flex items-center gap-1.5 mb-1">
                {idx === 1 && <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 fill-cyan-400" />}
                <span className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-mono">
                {stat.labelEn}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
