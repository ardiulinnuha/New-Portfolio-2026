import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TRANSLATIONS } from '../data/translations';
import profileAvatar from '../assets/images/regenerated_image_1787906550488.webp';
import { SectionHeader } from './SectionHeader';
import { 
  GraduationCap, 
  Film, 
  Palette, 
  Cpu, 
  ArrowRight, 
  Award, 
  CheckCircle2,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Film,
      title: 'Motion & Video Editing',
      subtitle: 'Dynamic & Paced Storytelling',
      desc: 'Expert pacing, sound design sync, kinetic typography, and motion graphics tailored for commercials and social media.',
      accent: 'from-purple-500/20 to-indigo-500/10',
      border: 'hover:border-purple-500/40',
      iconColor: 'text-purple-400'
    },
    {
      icon: Palette,
      title: 'Brand & Graphic Design',
      subtitle: 'Visual Systems & Packaging',
      desc: 'End-to-end brand guidelines, logo systems, commercial packaging dielines, and conversion-focused social media design.',
      accent: 'from-cyan-500/20 to-blue-500/10',
      border: 'hover:border-cyan-500/40',
      iconColor: 'text-cyan-400'
    },
    {
      icon: Cpu,
      title: 'AI & Creative Tech',
      subtitle: 'Modern Generative Workflows',
      desc: 'Google AI Professional certified in generative workflows, prompt engineering, and intelligent multimedia production.',
      accent: 'from-emerald-500/20 to-teal-500/10',
      border: 'hover:border-emerald-500/40',
      iconColor: 'text-emerald-400'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="01"
          eyebrow="Profile & Background"
          icon={<BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />}
          title={
            <>
              Creative Technologist &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Visual Storyteller
              </span>
            </>
          }
        />

        {/* 2-Column Grid: Detailed Narrative & Education Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-stretch">
          
          {/* Main Narrative Card */}
          <div 
            id="about-main-narrative-card" 
            className="lg:col-span-7 bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 ease-out will-change-transform"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] rounded-2xl overflow-hidden border border-white/20 shadow-lg shrink-0 aspect-square bg-[#121217] text-[0px] leading-[0]">
                  <img
                    src={profileAvatar}
                    alt={PERSONAL_INFO.name}
                    width={48}
                    height={48}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full aspect-square object-cover object-top block select-none"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Creative Journey & Synergy
                  </h3>
                  <p className="text-xs text-purple-400 font-mono uppercase tracking-wider">
                    Informatics Engineer x Creative Designer
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 text-xs sm:text-sm leading-relaxed opacity-90">
                <p>
                  With over <strong className="text-white font-semibold">4+ years</strong> of creative experience, I specialize in producing top-tier visual assets for digital campaigns, brand identities, stage displays, and commercial advertising.
                </p>

                <p>
                  Deep expertise in the <strong className="text-cyan-300">Adobe Creative Cloud</strong> ecosystem (Photoshop, Illustrator, After Effects, Premiere Pro) combined with computer science acumen ensures visual deliverables are not just aesthetically pleasing, but strategically calibrated for conversion.
                </p>

                <p className="text-gray-400 text-xs pt-2 border-t border-white/5">
                  Continually adopting cutting-edge tools including Generative AI workflows, Figma prototyping, and front-end principles to engineer modern multimedia experiences.
                </p>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10">
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:scale-[1.03] transition-all duration-200 ease-out cursor-default will-change-transform">
                <div className="text-cyan-400 font-black text-sm sm:text-base font-display">Fastwork 5.0⭐</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">15 Orders, 13 Clients</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 hover:scale-[1.03] transition-all duration-200 ease-out cursor-default will-change-transform">
                <div className="text-purple-400 font-black text-sm sm:text-base font-display">+15% Clients</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Company Deck Impact</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 col-span-2 sm:col-span-1 hover:border-white/20 hover:scale-[1.03] transition-all duration-200 ease-out cursor-default will-change-transform">
                <div className="text-white font-black text-sm sm:text-base font-display">Google AI Certified</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{TRANSLATIONS.en.about.googleAiBadgeSubtitle}</div>
              </div>
            </div>
          </div>

          {/* Education & Academic Foundation Card */}
          <div 
            id="about-education-card" 
            className="lg:col-span-5 bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ease-out hover:border-white/20 hover:scale-[1.015] hover:-translate-y-1 hover:shadow-2xl will-change-transform"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Academic Degree</span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2 uppercase tracking-tight">
                {PERSONAL_INFO.education.degreeEn}
              </h3>
              
              <div className="text-purple-300 font-mono text-xs mb-4 flex items-center gap-2">
                <span>{PERSONAL_INFO.education.university}</span>
              </div>

              {/* Education Motto / Core Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono">
                  <Award className="w-3.5 h-3.5" />
                  <span>{PERSONAL_INFO.education.badge1}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{PERSONAL_INFO.education.badge2}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 mb-6">
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                  CORE FOCUS & FOUNDATION
                </div>
                <div className="text-xs font-bold text-white mb-2">
                  Interactive Multimedia, Computer Systems & Creative AI
                </div>
                <p className="text-xs text-gray-300 leading-relaxed opacity-80">
                  {PERSONAL_INFO.education.summaryEn}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">
                10 Certified Programs Completed
              </span>
              <a
                href="#certifications"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-white transition-colors min-h-[44px] px-3 py-2 -mr-3 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <span>View Certifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* 3 Core Expertise Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                id={`about-pillar-card-${index}`}
                className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 hover:border-white/25 hover:scale-[1.025] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ease-out will-change-transform group cursor-default"
              >
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                  <IconComponent className={`w-5 h-5 ${index === 0 ? 'text-purple-400' : index === 1 ? 'text-cyan-400' : 'text-white'}`} />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  {pillar.title}
                </h3>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-mono mb-3">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed opacity-80">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
