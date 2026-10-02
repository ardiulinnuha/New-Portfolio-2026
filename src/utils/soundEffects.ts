// Ambient Web Audio Synthesizer for Creative Technologist Portfolio
// 100% Zero-Payload Client-Side Audio Engine (0 KB network overhead, zero latency)

export type HoverSoundType = 'card' | 'button' | 'pill' | 'tab' | 'subtle';

interface ActiveVoice {
  id: number;
  type: string;
  gainNode: GainNode;
  stop: (fadeMs?: number) => void;
  startTime: number;
}

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.35; // Default volume: 35% (within optimal 30-50% comfort range)
  private voiceCounter: number = 0;
  private activeVoices: ActiveVoice[] = [];
  private lastPlayTime: Record<string, number> = {};
  private lastHoveredElement: EventTarget | null = null;
  private listeners: Array<(muted: boolean, volume: number) => void> = [];

  // Frequencies mapped to each section for spatial auditory cue
  private sectionFrequencies: Record<string, { base: number; harmony: number }> = {
    hero: { base: 440, harmony: 880 },             // A4
    about: { base: 523.25, harmony: 783.99 },       // C5 + G5
    experience: { base: 587.33, harmony: 880 },     // D5 + A5
    portfolio: { base: 659.25, harmony: 987.77 },   // E5 + B5
    skills: { base: 783.99, harmony: 1174.66 },     // G5 + D6
    certifications: { base: 880, harmony: 1318.5 }, // A5 + E6
    awards: { base: 987.77, harmony: 1479.98 },      // B5 + F#6
    contact: { base: 1046.5, harmony: 1567.98 },    // C6 + G6
  };

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        // Default unmuted (isMuted = false) so contextual SFX always functions seamlessly in the background
        this.isMuted = false;

        // Load volume preference (default: 0.35 = 35%)
        const savedVol = localStorage.getItem('au_sfx_volume');
        if (savedVol !== null) {
          const parsed = parseFloat(savedVol);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            this.volume = parsed;
          }
        }
      } catch {
        this.isMuted = false;
        this.volume = 0.35;
      }

      // Auto-unlock AudioContext on first user interaction according to modern browser autoplay policies
      const unlockAudio = () => {
        const ctx = this.getAudioContext();
        if (ctx && ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        const events = ['click', 'pointerdown', 'touchstart', 'keydown'] as const;
        events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
      };

      const events = ['click', 'pointerdown', 'touchstart', 'keydown'] as const;
      events.forEach((evt) => {
        window.addEventListener(evt, unlockAudio, { once: true, passive: true });
      });

      // Contextual global listener for high-intent hover sound effects
      this.initGlobalHoverListener();
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        // Master Gain Node for smooth global volume control & zero-click ramping
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(
          this.isMuted ? 0 : this.volume,
          this.ctx.currentTime
        );
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Smoothly track and register a voice to eliminate audio overlaps / harsh stacking
   */
  private registerVoice(
    type: string,
    gainNode: GainNode,
    stopFn: (fadeMs?: number) => void
  ): ActiveVoice {
    // If a previous sound of the same type is still active, smoothly fade it out in 18ms
    this.fadePreviousVoices(type, 18);

    const voiceId = ++this.voiceCounter;
    const voice: ActiveVoice = {
      id: voiceId,
      type,
      gainNode,
      stop: stopFn,
      startTime: Date.now(),
    };

    this.activeVoices.push(voice);

    // Keep active voices pool tidy
    if (this.activeVoices.length > 8) {
      this.activeVoices.shift();
    }

    return voice;
  }

  /**
   * Fade out previous active voices of a given type to prevent sound accumulation
   */
  private fadePreviousVoices(type: string, fadeMs = 18): void {
    const existing = this.activeVoices.filter((v) => v.type === type);
    existing.forEach((v) => {
      try {
        v.stop(fadeMs);
      } catch {}
    });
    this.activeVoices = this.activeVoices.filter((v) => v.type !== type);
  }

  /**
   * Intelligent global listener that restricts hover SFX to deliberate, high-intent interactive elements
   */
  private initGlobalHoverListener(): void {
    if (typeof window === 'undefined') return;

    const handlePointerOver = (e: MouseEvent) => {
      if (this.isMuted) return;

      // Skip touch/coarse devices to avoid unwanted phantom hover triggers on mobile
      const isCoarse =
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches;
      if (isCoarse) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Only trigger on key, deliberate interactive targets (not every small text or tag)
      const interactiveEl = target.closest(
        'button, a[href], [role="button"], [data-sound-hover], [id^="project-card-"], [id^="cert-card-"], [id^="award-card-"], [id^="nav-link-"], [id*="filter-btn-"], [id*="cat-tab-"]'
      ) as HTMLElement | null;

      if (!interactiveEl) return;

      // Avoid re-triggering while moving between child elements of the same interactive block
      if (this.lastHoveredElement === interactiveEl) return;
      this.lastHoveredElement = interactiveEl;

      const explicitType = interactiveEl.getAttribute('data-sound-hover') as HoverSoundType | null;
      if (explicitType) {
        this.playHover(explicitType);
        return;
      }

      const id = interactiveEl.id || '';
      const tag = interactiveEl.tagName.toLowerCase();

      if (
        id.startsWith('project-card-') ||
        id.startsWith('cert-card-') ||
        id.startsWith('award-card-')
      ) {
        this.playHover('card');
      } else if (id.includes('filter-btn-') || id.startsWith('nav-link-')) {
        this.playHover('tab');
      } else if (tag === 'button' || tag === 'a' || interactiveEl.getAttribute('role') === 'button') {
        this.playHover('button');
      }
    };

    document.addEventListener('mouseover', handlePointerOver, { passive: true });
  }

  // --- Public Control APIs ---

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  // Backward-compatible alias
  public getEnabled(): boolean {
    return !this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Set volume in the 0.0 - 1.0 range (persisted to localStorage)
   */
  public setVolume(vol: number): void {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    try {
      localStorage.setItem('au_sfx_volume', clamped.toString());
    } catch {}

    const ctx = this.getAudioContext();
    if (ctx && this.masterGain) {
      const now = ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : this.volume,
        now + 0.03
      );
    }

    this.notifyListeners();
  }

  /**
   * Toggle mute state (persisted to localStorage)
   */
  public toggle(): boolean {
    return this.toggleMute();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('au_sfx_muted', JSON.stringify(this.isMuted));
      localStorage.setItem('au_sound_fx', JSON.stringify(!this.isMuted));
    } catch {}

    const ctx = this.getAudioContext();
    if (ctx && this.masterGain) {
      const now = ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : this.volume,
        now + 0.03
      );
    }

    if (!this.isMuted) {
      this.playToggleFx(true);
    }

    this.notifyListeners();
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    if (this.isMuted === muted) return;
    this.isMuted = muted;
    try {
      localStorage.setItem('au_sfx_muted', JSON.stringify(this.isMuted));
      localStorage.setItem('au_sound_fx', JSON.stringify(!this.isMuted));
    } catch {}

    const ctx = this.getAudioContext();
    if (ctx && this.masterGain) {
      const now = ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : this.volume,
        now + 0.03
      );
    }

    this.notifyListeners();
  }

  // Backward-compatible alias
  public setEnabled(enabled: boolean): void {
    this.setMuted(!enabled);
  }

  public subscribe(callback: (muted: boolean, volume: number) => void): () => void {
    this.listeners.push(callback);
    callback(this.isMuted, this.volume);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((fn) => fn(this.isMuted, this.volume));
  }

  // --- Contextual Synthesized Sound Effects ---

  /**
   * Hover sound effect with smooth attack/decay and throttling
   */
  public playHover(type: HoverSoundType = 'button'): void {
    if (this.isMuted) return;

    const now = Date.now();
    // 65ms throttle to avoid rapid-fire cacophony when moving across items
    if (this.lastPlayTime['hover'] && now - this.lastPlayTime['hover'] < 65) return;
    this.lastPlayTime['hover'] = now;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      let osc1: OscillatorNode;
      let duration = 0.04;

      if (type === 'card') {
        // Warm, elegant dual-frequency acoustic pulse for project & bento cards
        duration = 0.055;
        voiceGain.gain.setValueAtTime(0.0001, currentTime);
        // Smooth 8ms attack (fade-in)
        voiceGain.gain.linearRampToValueAtTime(0.018, currentTime + 0.008);
        // Smooth 45ms release (fade-out)
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, currentTime);
        filter.frequency.exponentialRampToValueAtTime(700, currentTime + duration);
        filter.connect(voiceGain);

        osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(520, currentTime);
        osc1.frequency.exponentialRampToValueAtTime(660, currentTime + 0.045);
        osc1.connect(filter);

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1040, currentTime);
        osc2.connect(filter);

        osc1.start(currentTime);
        osc2.start(currentTime);
        osc1.stop(currentTime + duration + 0.01);
        osc2.stop(currentTime + duration + 0.01);

        const stop = (fadeMs = 15) => {
          try {
            const stopTime = ctx.currentTime;
            voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
            voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
            setTimeout(() => {
              try {
                osc1.stop();
                osc2.stop();
                voiceGain.disconnect();
              } catch {}
            }, fadeMs);
          } catch {}
        };

        this.registerVoice('hover', voiceGain, stop);
      } else if (type === 'tab') {
        // Gentle affirmative tone for navigation links and category tabs
        duration = 0.038;
        voiceGain.gain.setValueAtTime(0.0001, currentTime);
        voiceGain.gain.linearRampToValueAtTime(0.014, currentTime + 0.005);
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

        osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(660, currentTime);
        osc1.frequency.exponentialRampToValueAtTime(840, currentTime + 0.03);
        osc1.connect(voiceGain);

        osc1.start(currentTime);
        osc1.stop(currentTime + duration + 0.01);

        const stop = (fadeMs = 15) => {
          try {
            const stopTime = ctx.currentTime;
            voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
            voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
            setTimeout(() => {
              try {
                osc1.stop();
                voiceGain.disconnect();
              } catch {}
            }, fadeMs);
          } catch {}
        };

        this.registerVoice('hover', voiceGain, stop);
      } else {
        // Ultra-crisp, short digital tick for buttons and primary CTAs
        duration = 0.032;
        voiceGain.gain.setValueAtTime(0.0001, currentTime);
        voiceGain.gain.linearRampToValueAtTime(0.013, currentTime + 0.004);
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + duration);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, currentTime);
        filter.connect(voiceGain);

        osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1100, currentTime);
        osc1.frequency.exponentialRampToValueAtTime(1450, currentTime + 0.025);
        osc1.connect(filter);

        osc1.start(currentTime);
        osc1.stop(currentTime + duration + 0.01);

        const stop = (fadeMs = 15) => {
          try {
            const stopTime = ctx.currentTime;
            voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
            voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
            setTimeout(() => {
              try {
                osc1.stop();
                voiceGain.disconnect();
              } catch {}
            }, fadeMs);
          } catch {}
        };

        this.registerVoice('hover', voiceGain, stop);
      }
    } catch {}
  }

  public playCardHover(): void {
    this.playHover('card');
  }

  public playButtonHover(): void {
    this.playHover('button');
  }

  public playPillHover(): void {
    this.playHover('pill');
  }

  public playTabHover(): void {
    this.playHover('tab');
  }

  /**
   * Crisp, tactile click / tap haptic micro-sound (debounced to avoid overlap)
   */
  public playClick(): void {
    if (this.isMuted) return;

    const now = Date.now();
    // 50ms throttle prevents harsh overlap during rapid clicking
    if (this.lastPlayTime['click'] && now - this.lastPlayTime['click'] < 50) return;
    this.lastPlayTime['click'] = now;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      // Smooth attack & decay
      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.026, currentTime + 0.006);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.065);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, currentTime);
      filter.frequency.exponentialRampToValueAtTime(1000, currentTime + 0.065);
      filter.connect(voiceGain);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(860, currentTime);
      osc.frequency.exponentialRampToValueAtTime(1250, currentTime + 0.045);
      osc.connect(filter);

      osc.start(currentTime);
      osc.stop(currentTime + 0.075);

      const stop = (fadeMs = 15) => {
        try {
          const stopTime = ctx.currentTime;
          voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
          voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
          setTimeout(() => {
            try {
              osc.stop();
              voiceGain.disconnect();
            } catch {}
          }, fadeMs);
        } catch {}
      };

      this.registerVoice('click', voiceGain, stop);
    } catch {}
  }

  /**
   * Pleasant success chime for actions like copying email or sending messages
   */
  public playSuccess(): void {
    if (this.isMuted) return;

    const now = Date.now();
    if (this.lastPlayTime['success'] && now - this.lastPlayTime['success'] < 200) return;
    this.lastPlayTime['success'] = now;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      // Smooth envelope (fade-in 8ms, fade-out 200ms)
      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.032, currentTime + 0.01);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.22);

      // Two-note upward chime (D5 -> A5)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, currentTime); // D5
      osc1.frequency.setValueAtTime(880, currentTime + 0.075); // A5

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2800, currentTime);
      filter.connect(voiceGain);

      osc1.connect(filter);
      osc1.start(currentTime);
      osc1.stop(currentTime + 0.24);

      const stop = (fadeMs = 15) => {
        try {
          const stopTime = ctx.currentTime;
          voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
          voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
          setTimeout(() => {
            try {
              osc1.stop();
              voiceGain.disconnect();
            } catch {}
          }, fadeMs);
        } catch {}
      };

      this.registerVoice('success', voiceGain, stop);
    } catch {}
  }

  /**
   * Subtle futuristic shield / alert pulse for copyright & content protection notice
   */
  public playShield(): void {
    if (this.isMuted) return;

    const now = Date.now();
    // 500ms throttle for content protection notification
    if (this.lastPlayTime['shield'] && now - this.lastPlayTime['shield'] < 500) return;
    this.lastPlayTime['shield'] = now;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      // Soft pulse envelope
      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.028, currentTime + 0.012);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.22);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, currentTime);
      filter.frequency.exponentialRampToValueAtTime(450, currentTime + 0.2);
      filter.connect(voiceGain);

      // Futuristic warm frequency glide
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, currentTime + 0.2);
      osc.connect(filter);

      osc.start(currentTime);
      osc.stop(currentTime + 0.23);

      const stop = (fadeMs = 15) => {
        try {
          const stopTime = ctx.currentTime;
          voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
          voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
          setTimeout(() => {
            try {
              osc.stop();
              voiceGain.disconnect();
            } catch {}
          }, fadeMs);
        } catch {}
      };

      this.registerVoice('shield', voiceGain, stop);
    } catch {}
  }

  /**
   * Modal open sound effect (soft airy ascending whoosh)
   */
  public playModalOpen(): void {
    if (this.isMuted) return;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.024, currentTime + 0.012);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.16);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, currentTime + 0.14);
      filter.connect(voiceGain);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, currentTime + 0.15);
      osc.connect(filter);

      osc.start(currentTime);
      osc.stop(currentTime + 0.17);

      const stop = (fadeMs = 15) => {
        try {
          const stopTime = ctx.currentTime;
          voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
          voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
          setTimeout(() => {
            try {
              osc.stop();
              voiceGain.disconnect();
            } catch {}
          }, fadeMs);
        } catch {}
      };

      this.registerVoice('modal', voiceGain, stop);
    } catch {}
  }

  /**
   * Modal close sound effect (soft descending cue)
   */
  public playModalClose(): void {
    if (this.isMuted) return;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.02, currentTime + 0.008);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.12);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, currentTime);
      filter.frequency.exponentialRampToValueAtTime(600, currentTime + 0.11);
      filter.connect(voiceGain);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, currentTime);
      osc.frequency.exponentialRampToValueAtTime(340, currentTime + 0.11);
      osc.connect(filter);

      osc.start(currentTime);
      osc.stop(currentTime + 0.13);

      const stop = (fadeMs = 15) => {
        try {
          const stopTime = ctx.currentTime;
          voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
          voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
          setTimeout(() => {
            try {
              osc.stop();
              voiceGain.disconnect();
            } catch {}
          }, fadeMs);
        } catch {}
      };

      this.registerVoice('modal', voiceGain, stop);
    } catch {}
  }

  /**
   * Section transition harmonic chime (throttled to 350ms)
   */
  public playSectionTransition(sectionId: string): void {
    if (this.isMuted) return;

    const now = Date.now();
    if (this.lastPlayTime['section'] && now - this.lastPlayTime['section'] < 350) return;
    this.lastPlayTime['section'] = now;

    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const freq = this.sectionFrequencies[sectionId] || { base: 523.25, harmony: 783.99 };

      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      // Smooth attack & decay
      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.028, currentTime + 0.02);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.25);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, currentTime);
      filter.frequency.exponentialRampToValueAtTime(600, currentTime + 0.25);
      filter.connect(voiceGain);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq.base, currentTime);
      osc1.frequency.exponentialRampToValueAtTime(freq.base * 1.015, currentTime + 0.24);
      osc1.connect(filter);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq.harmony, currentTime);
      osc2.connect(filter);

      osc1.start(currentTime);
      osc2.start(currentTime);
      osc1.stop(currentTime + 0.27);
      osc2.stop(currentTime + 0.27);

      const stop = (fadeMs = 15) => {
        try {
          const stopTime = ctx.currentTime;
          voiceGain.gain.setValueAtTime(voiceGain.gain.value, stopTime);
          voiceGain.gain.linearRampToValueAtTime(0.0001, stopTime + fadeMs / 1000);
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
              voiceGain.disconnect();
            } catch {}
          }, fadeMs);
        } catch {}
      };

      this.registerVoice('section', voiceGain, stop);
    } catch {}
  }

  /**
   * Sound effect when user toggles sound ON / OFF
   */
  public playToggleFx(isOn: boolean): void {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const currentTime = ctx.currentTime;
      const voiceGain = ctx.createGain();
      voiceGain.connect(this.masterGain);

      voiceGain.gain.setValueAtTime(0.0001, currentTime);
      voiceGain.gain.linearRampToValueAtTime(0.03, currentTime + 0.01);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + 0.16);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      if (isOn) {
        osc.frequency.setValueAtTime(480, currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, currentTime + 0.14);
      } else {
        osc.frequency.setValueAtTime(740, currentTime);
        osc.frequency.exponentialRampToValueAtTime(360, currentTime + 0.14);
      }
      osc.connect(voiceGain);

      osc.start(currentTime);
      osc.stop(currentTime + 0.17);
    } catch {}
  }
}

export const soundManager = new SoundManager();


