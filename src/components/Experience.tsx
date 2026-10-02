import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES_DATA, ORGANIZATIONS_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  ShieldCheck,
  Briefcase,
  ExternalLink,
  Users
} from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 relative bg-transparent overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-950/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="02"
          eyebrow="Work History & Roles"
          icon={<Briefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-indigo-400" />}
          title={
            <>
              Professional Career &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Track Record
              </span>
            </>
          }
        />

        {/* Work Experience Cards */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          {EXPERIENCES_DATA.map((exp) => {
            const displayedMetric = exp.highlightMetricEn || exp.highlightMetric;
            const displayedLocation = exp.locationEn || exp.location;
            const displayedRole = exp.roleEn || exp.role;
            const displayedPeriod = exp.periodEn || exp.period;
            const displayedType = exp.typeEn || exp.type;
            const displayedPoints = exp.pointsEn || exp.points;

            return (
              <div
                key={exp.id}
                id={`experience-item-${exp.id}`}
                className="bg-[#0f0f0f] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 relative overflow-hidden transition-all duration-300 ease-out hover:border-white/25 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between will-change-transform"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3.5 sm:gap-4 md:gap-6 mb-5 sm:mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
                      <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white uppercase tracking-tight break-words">
                        {displayedRole}
                      </h3>
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white text-black shrink-0">
                        {exp.company}
                      </span>
                      {exp.platform && (
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-cyan-300 flex items-center gap-1 shrink-0">
                          <Star className="w-3 h-3 fill-cyan-400 text-cyan-400 shrink-0" />
                          <span className="break-words">{exp.platform}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-[11px] sm:text-xs text-gray-400 font-mono uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{displayedPeriod}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{displayedLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{displayedType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlight Metric Pill */}
                  {displayedMetric && (
                    <div className="shrink-0 self-start md:self-auto inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full bg-white/5 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider max-w-full">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="break-words leading-tight">{displayedMetric}</span>
                    </div>
                  )}
                </div>

                {/* Bullet Points */}
                <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 flex-1">
                  {displayedPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed opacity-90">
                      <span className="text-purple-400 font-bold select-none shrink-0 mt-0.5">•</span>
                      <span className="break-words flex-1">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Tags Bar */}
                <div className="pt-3.5 sm:pt-4 border-t border-white/5 flex flex-wrap gap-1.5 sm:gap-2">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded text-[9px] sm:text-[10px] text-gray-400 font-mono uppercase tracking-wider break-words"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Organizational Experience Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center gap-2.5 mb-5 sm:mb-6"
          >
            <div className="p-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
              <Users className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-bold">
              ORGANIZATIONAL & LEADERSHIP ROLES
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {ORGANIZATIONS_DATA.map((org) => {
              const displayedRole = org.roleEn || org.role;
              const displayedDesc = org.descriptionEn || org.description;
              const displayedDeliverables = org.deliverablesEn || org.deliverables;
              const badge = org.badgeLabel || 'Creative Direction';

              return (
                <div
                  key={org.id}
                  id={`org-item-${org.id}`}
                  className="bg-[#0f0f0f] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-300 ease-out hover:border-white/25 hover:scale-[1.01] hover:-translate-y-1 hover:shadow-2xl will-change-transform flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3 mb-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                          <span className="text-base sm:text-lg font-black font-display text-white uppercase tracking-tight">
                            {displayedRole}
                          </span>
                          <span className="text-gray-500">•</span>
                          {org.url ? (
                            <a
                              href={org.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium font-display inline-flex items-center gap-1 group/link break-words"
                              title={`Visit ${org.organization}`}
                            >
                              <span>{org.organization}</span>
                              <ExternalLink className="w-3 h-3 text-cyan-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0" />
                            </a>
                          ) : (
                            <span className="text-xs sm:text-sm text-cyan-400 font-medium font-display break-words">
                              {org.organization}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{org.periodEn || org.period}</span>
                        </div>
                      </div>

                      <span className="self-start sm:self-auto inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-purple-400 shrink-0">
                        {badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 opacity-80 break-words">
                      {displayedDesc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-3.5 border-t border-white/5 mt-auto">
                    {displayedDeliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 min-w-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug break-words">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
