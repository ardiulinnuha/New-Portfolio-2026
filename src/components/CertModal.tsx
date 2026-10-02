import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CertificationItem } from '../types';
import { LazyCertIcon } from './LazyCertIcon';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  ShieldCheck
} from 'lucide-react';

interface CertModalProps {
  cert: CertificationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertModal: React.FC<CertModalProps> = ({ cert, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !cert) return null;

  const displayedCategoryLabel = cert.categoryLabelEn || cert.categoryLabel;
  const displayedDescription = cert.descriptionEn || cert.description;

  const modalContent = (
    <div 
      id="cert-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        id="cert-modal-card"
        className="dark:bg-[#0f0f0f] bg-white dark:border-white/10 border-slate-200 border rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative dark:text-gray-200 text-slate-800 origin-center transition-all duration-200 animate-in fade-in zoom-in-95 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 dark:bg-[#141414] bg-slate-50 border-b dark:border-white/10 border-slate-200 shrink-0">
          <button
            id="close-cert-modal-btn"
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full dark:bg-black/60 bg-white hover:bg-slate-100 dark:hover:bg-black text-slate-700 dark:text-white dark:border-white/10 border-slate-200 border shadow-sm transition-transform hover:scale-110 cursor-pointer z-10"
            aria-label="Close certificate modal"
            title="Close (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3 pr-10">
            <LazyCertIcon 
              certId={cert.id} 
              category={cert.category} 
              issuerBadge={cert.issuerBadge} 
            />
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider dark:bg-white/5 bg-purple-50 dark:text-purple-300 text-purple-700 dark:border-white/10 border-purple-200 border">
                {displayedCategoryLabel}
              </span>
              {cert.issuerBadge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
                  {cert.issuerBadge}
                </span>
              )}
            </div>
          </div>

          <h3 className="font-display font-black text-lg sm:text-2xl text-slate-900 dark:text-white tracking-tight leading-snug mb-2 uppercase pr-8">
            {cert.title}
          </h3>

          {cert.fullTitle && cert.fullTitle !== cert.title && (
            <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2.5">
              Program Track: {cert.fullTitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-gray-400 font-mono">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{cert.issuer}</span>
            </div>
            {cert.period && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{cert.period}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content - Scrollable if exceeds viewport */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 font-bold mb-2">
              SYLLABUS & CORE FOCUS
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-normal">
              {displayedDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 font-bold mb-3">
              ACQUIRED COMPETENCIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cert.skillsAcquired.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl dark:bg-black/40 bg-slate-50 dark:border-white/5 border-slate-200 border text-xs text-slate-800 dark:text-gray-300 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400 font-mono uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Credential</span>
            </div>

            <a
              id="view-credential-link-btn"
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full dark:bg-white bg-slate-900 dark:text-black text-white hover:bg-cyan-500 text-xs font-black uppercase tracking-wider transition-all shadow-md"
            >
              <span>View Official Credential</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
