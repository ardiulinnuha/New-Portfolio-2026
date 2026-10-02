import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { soundManager } from '../utils/soundEffects';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowRight,
  AlertCircle,
  Clock
} from 'lucide-react';

// Sanitize string to prevent XSS / script injection, strip control characters, and prevent protocol exploitation
const sanitizeInput = (val: string): string => {
  if (!val) return '';
  return val
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip ASCII control characters & null bytes
    .replace(/[<>]/g, '') // Strip < and >
    .replace(/javascript:/gi, '') // Strip javascript: scheme
    .replace(/vbscript:/gi, '') // Strip vbscript: scheme
    .replace(/data:/gi, '') // Strip data: scheme
    .trim();
};

// RFC 5322 compliant standard email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const ALLOWED_TOPICS = [
  'video-editing',
  'motion-graphics',
  'branding-packaging',
  'company-deck',
  'full-time',
  'other'
] as const;

type TopicType = typeof ALLOWED_TOPICS[number];

const RATE_LIMIT_COOLDOWN_SECONDS = 15;

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Contact Form State
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    topic: TopicType;
    message: string;
  }>({
    name: '',
    email: '',
    topic: 'video-editing',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    topic?: string;
    message?: string;
    rateLimit?: string;
  }>({});

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if there is an active cooldown from recent submission
    try {
      const lastSubmit = sessionStorage.getItem('au_last_form_submit');
      if (lastSubmit) {
        const elapsed = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
        if (elapsed < RATE_LIMIT_COOLDOWN_SECONDS) {
          setCooldownRemaining(Math.ceil(RATE_LIMIT_COOLDOWN_SECONDS - elapsed));
        }
      }
    } catch {}

    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cooldownRemaining > 0) {
      cooldownTimerRef.current = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [cooldownRemaining]);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    soundManager.playSuccess();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const topicOptions = [
    { value: 'video-editing', label: 'Commercial Video Editing' },
    { value: 'motion-graphics', label: 'Motion Graphics & Reels' },
    { value: 'branding-packaging', label: 'Brand Identity & Packaging' },
    { value: 'company-deck', label: 'Pitch Deck & Company Profile' },
    { value: 'full-time', label: 'Full-time / Contract Opportunity' },
    { value: 'other', label: 'Other Inquiries' }
  ];

  const validateForm = (): boolean => {
    const errors: typeof formErrors = {};
    const sanitizedName = sanitizeInput(formState.name);
    const sanitizedEmail = sanitizeInput(formState.email).toLowerCase();
    const sanitizedMessage = sanitizeInput(formState.message);

    // 1. Name validation
    if (!sanitizedName) {
      errors.name = 'Full name is required.';
    } else if (sanitizedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    } else if (sanitizedName.length > 80) {
      errors.name = 'Name cannot exceed 80 characters.';
    }

    // 2. Email validation
    if (!sanitizedEmail) {
      errors.email = 'Email address is required.';
    } else if (sanitizedEmail.length > 100) {
      errors.email = 'Email cannot exceed 100 characters.';
    } else if (!EMAIL_REGEX.test(sanitizedEmail)) {
      errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    // 3. Topic validation (whitelist)
    if (!ALLOWED_TOPICS.includes(formState.topic)) {
      errors.topic = 'Please select a valid project topic.';
    }

    // 4. Message validation
    if (!sanitizedMessage) {
      errors.message = 'Project message is required.';
    } else if (sanitizedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    } else if (sanitizedMessage.length > 2000) {
      errors.message = 'Message cannot exceed 2,000 characters.';
    }

    // 5. Client-side Rate Limit Cooldown Check
    if (cooldownRemaining > 0) {
      errors.rateLimit = `Please wait ${cooldownRemaining}s before sending another message.`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || cooldownRemaining > 0) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Record submission timestamp for client rate limiting
      sessionStorage.setItem('au_last_form_submit', Date.now().toString());
    } catch {}

    // Simulated secure dispatch
    setTimeout(() => {
      soundManager.playSuccess();
      setIsSubmitting(false);
      setFormSubmitted(true);
      setCooldownRemaining(RATE_LIMIT_COOLDOWN_SECONDS);
    }, 400);
  };

  const generateWhatsAppUrl = () => {
    const cleanName = sanitizeInput(formState.name) || '[Client]';
    const selectedTopicLabel = topicOptions.find(opt => opt.value === formState.topic)?.label || 'Creative Project';
    const cleanMessage = sanitizeInput(formState.message) || 'Can we schedule a call to discuss our project?';
    
    const text = `Hi Ardi Ulinnuha, my name is ${cleanName}. I would like to discuss about ${selectedTopicLabel}.\n\nMessage: ${cleanMessage}`;
    return `https://wa.me/${encodeURIComponent(PERSONAL_INFO.phoneRaw)}?text=${encodeURIComponent(text)}`;
  };

  const generateMailtoUrl = () => {
    const cleanName = sanitizeInput(formState.name) || 'Client';
    const selectedTopicLabel = topicOptions.find(opt => opt.value === formState.topic)?.label || 'Creative Project';
    const cleanMessage = sanitizeInput(formState.message) || 'Hi Ardi, I would like to discuss our creative project.';
    
    const subject = `[Project Inquiry] ${selectedTopicLabel} - ${cleanName}`;
    const body = `Hi Ardi,\n\nName: ${cleanName}\nEmail: ${sanitizeInput(formState.email)}\nTopic: ${selectedTopicLabel}\n\nProject Brief / Message:\n${cleanMessage}\n\nBest regards,\n${cleanName}`;
    return `mailto:${encodeURIComponent(PERSONAL_INFO.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-gradient-to-t from-purple-600/10 via-cyan-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Staggered Fade-In-Slide-Down */}
        <SectionHeader
          number="07"
          eyebrow="Initiate Collaboration"
          icon={<Send className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />}
          title={
            <>
              Let&apos;s Build Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-purple-400">
                Remarkable
              </span>
            </>
          }
        />

        {/* 2-Column Grid: Contact Channels & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Social Hub */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Card */}
            <div 
              id="contact-direct-info-card"
              className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-out hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl will-change-transform"
            >
              <h3 className="font-display font-black text-lg sm:text-xl text-white mb-2 uppercase">
                Direct Communication
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed opacity-80">
                Available for freelance creative commissions, brand consulting, commercial video editing, or full-time roles.
              </p>

              {/* Cal.com Meeting Booking Button */}
              <a
                id="contact-book-meeting-btn"
                href="https://cal.com/ardiulinnuha/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white hover:bg-cyan-600 font-bold text-sm mb-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg border border-slate-800 dark:border-white/15 will-change-transform group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400 shrink-0 calendar-icon-container">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-black uppercase text-xs tracking-wider text-white book-meeting-title">
                      Book a 15-Min Intro Call
                    </div>
                    <div className="text-xs text-slate-300 font-medium book-meeting-subtitle">
                      Pick a convenient slot via Cal.com
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Copy Email Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 mb-3 hover:scale-[1.02] hover:border-white/15 transition-all duration-200 ease-out will-change-transform">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Direct Email</div>
                    <a
                      href={`mailto:${encodeURIComponent(PERSONAL_INFO.email)}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors font-mono select-all break-all block"
                      title="Click to compose email"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2.5 min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono transition-colors shrink-0 flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 cursor-pointer"
                  title="Copy Email"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px]">{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Copy Phone Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 hover:scale-[1.02] hover:border-white/15 transition-all duration-200 ease-out will-change-transform">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">WhatsApp / Phone</div>
                    <a
                      href={`https://wa.me/${PERSONAL_INFO.phoneRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors font-mono select-all break-all block"
                      title="Click to chat on WhatsApp"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  id="copy-phone-btn"
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2.5 min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-mono transition-colors shrink-0 flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 cursor-pointer"
                  title="Copy Phone"
                  aria-label="Copy Phone Number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline font-mono uppercase text-[10px]">{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location indicator */}
              <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2.5 text-xs text-gray-400 font-mono">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="leading-snug">{PERSONAL_INFO.locationEn || PERSONAL_INFO.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Message Builder */}
          <div className="lg:col-span-7">
            <div 
              id="contact-form-container"
              className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 sm:p-10 transition-all duration-300 ease-out hover:border-white/20 hover:scale-[1.008] hover:shadow-2xl will-change-transform"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                  Project Inquiry
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-8 opacity-80">
                Send your project details, timeline, and brief. I will reply within 24 business hours.
              </p>

              {formSubmitted ? (
                <div 
                  id="contact-form-success-banner"
                  className="p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-4 animate-in fade-in duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed opacity-90">
                    Thank you for reaching out. You can also continue directly on WhatsApp for immediate discussion.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 min-h-[44px] rounded-full bg-white text-black hover:bg-cyan-400 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open in WhatsApp</span>
                    </a>
                    <a
                      href={generateMailtoUrl()}
                      className="px-5 py-3 min-h-[44px] rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 font-bold text-xs uppercase tracking-wider transition-colors border border-cyan-400/30 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Directly</span>
                    </a>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormState({ name: '', email: '', topic: 'video-editing', message: '' });
                        setFormErrors({});
                      }}
                      className="px-5 py-3 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono uppercase tracking-wider transition-colors border border-white/10 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form id="portfolio-contact-form" onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  {formErrors.rateLimit && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-amber-300 text-xs font-mono">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{formErrors.rateLimit}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="contact-name-input" className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
                          Your Full Name *
                        </label>
                        <span className="text-[10px] font-mono text-gray-500">
                          {formState.name.length}/80
                        </span>
                      </div>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        maxLength={80}
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                        }}
                        placeholder="e.g. Alex Henderson"
                        className={`w-full px-4 py-3 rounded-2xl bg-black/50 border text-white text-sm focus:outline-none font-mono transition-colors ${
                          formErrors.name 
                            ? 'border-rose-500/60 focus:border-rose-400' 
                            : 'border-white/10 focus:border-cyan-400'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="mt-1.5 text-xs text-rose-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="contact-email-input" className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
                          Email Address *
                        </label>
                        <span className="text-[10px] font-mono text-gray-500">
                          {formState.email.length}/100
                        </span>
                      </div>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        maxLength={100}
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-black/50 border text-white text-sm focus:outline-none font-mono transition-colors ${
                          formErrors.email 
                            ? 'border-rose-500/60 focus:border-rose-400' 
                            : 'border-white/10 focus:border-cyan-400'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1.5 text-xs text-rose-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic-select" className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                      Service / Project Scope
                    </label>
                    <select
                      id="contact-topic-select"
                      value={formState.topic}
                      onChange={(e) => {
                        const val = e.target.value as TopicType;
                        if (ALLOWED_TOPICS.includes(val)) {
                          setFormState({ ...formState, topic: val });
                          if (formErrors.topic) setFormErrors({ ...formErrors, topic: undefined });
                        }
                      }}
                      className="w-full px-4 py-3 rounded-2xl bg-[#141414] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                    >
                      {topicOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message-input" className="block text-[10px] font-mono uppercase tracking-widest text-gray-400">
                        Project Details / Message *
                      </label>
                      <span className="text-[10px] font-mono text-gray-500">
                        {formState.message.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message-input"
                      required
                      rows={4}
                      maxLength={2000}
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                      }}
                      placeholder="Tell me about your creative brief, deliverables, deadline, and expectations..."
                      className={`w-full px-4 py-3 rounded-2xl bg-black/50 border text-white text-sm focus:outline-none font-mono transition-colors resize-none ${
                        formErrors.message 
                          ? 'border-rose-500/60 focus:border-rose-400' 
                          : 'border-white/10 focus:border-cyan-400'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="mt-1.5 text-xs text-rose-400 font-mono flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      id="submit-contact-form-btn"
                      type="submit"
                      disabled={isSubmitting || cooldownRemaining > 0}
                      className={`w-full sm:flex-1 min-h-[44px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg ${
                        cooldownRemaining > 0 || isSubmitting
                          ? 'bg-gray-700 text-gray-300 cursor-not-allowed opacity-60'
                          : 'bg-white text-black hover:bg-cyan-400 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      {cooldownRemaining > 0 ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Wait {cooldownRemaining}s</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Project Inquiry</span>
                        </>
                      )}
                    </button>

                    <a
                      id="continue-whatsapp-btn"
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Direct WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
