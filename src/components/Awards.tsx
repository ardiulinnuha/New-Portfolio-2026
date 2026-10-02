import React from 'react';
import { AWARDS_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { Trophy, Award, Sparkles, ShieldCheck, ExternalLink, GraduationCap } from 'lucide-react';

export const Awards: React.FC = () => {
  const getAwardIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Trophy':
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <section id="awards" className="py-20 relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="06"
          eyebrow="Honors & Recognition"
          icon={<Trophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />}
          title={
            <>
              Awards & Notable{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Achievements
              </span>
            </>
          }
        />

        {/* Awards Cards Grid - 3 Columns in 1 Row on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS_DATA.map((award) => {
            const displayedTitle = award.titleEn || award.title;
            const displayedDesc = award.descriptionEn || award.description;

            return (
              <div
                key={award.id}
                id={`award-card-${award.id}`}
                className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:border-white/25 hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-2xl will-change-transform shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                      {getAwardIcon(award.iconName)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10">
                      {award.date}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 leading-snug tracking-tight">
                    {displayedTitle}
                  </h3>

                  <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="break-words">{award.issuer}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed opacity-80">
                    {displayedDesc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                  <span className="text-[11px] text-gray-400 font-semibold tracking-wider">
                    Official Recognition
                  </span>
                  
                  {award.credentialUrl ? (
                    <a
                      href={award.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`verify-award-${award.id}-btn`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-300 hover:text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
                      title={`Verify ${displayedTitle} credential (opens in new tab)`}
                      aria-label={`Verify ${displayedTitle} credential`}
                    >
                      <span>Verified</span>
                      <ExternalLink className="w-3 h-3 text-cyan-300 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-cyan-400 font-bold text-[11px]">Verified</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
