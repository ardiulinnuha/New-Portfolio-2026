import { Project } from '../types';

/**
 * Checks whether a portfolio project is associated with or features a specific skill.
 */
export function matchProjectWithSkill(project: Project, skillName: string): boolean {
  if (!skillName || !skillName.trim()) return true;
  const s = skillName.toLowerCase().trim();

  // 1. Direct tool matches
  const hasToolMatch = project.tools.some((tool) => {
    const t = tool.toLowerCase();
    if (s.includes(t) || t.includes(s)) return true;
    if (s.includes('premiere') && t.includes('premiere')) return true;
    if (s.includes('after effects') && (t.includes('after effects') || t.includes('motion'))) return true;
    if (s.includes('photoshop') && t.includes('photoshop')) return true;
    if (s.includes('illustrator') && t.includes('illustrator')) return true;
    if (s.includes('indesign') && (t.includes('indesign') || t.includes('interactive pdf'))) return true;
    if (s.includes('figma') && t.includes('figma')) return true;
    if (s.includes('capcut') && (t.includes('capcut') || t.includes('video'))) return true;
    if (s.includes('html') && t.includes('html')) return true;
    if (s.includes('prompt') && (t.includes('prompt') || t.includes('ai'))) return true;
    if (s.includes('google ai') && (t.includes('google') || t.includes('prompt') || t.includes('ai'))) return true;
    if (s.includes('gemini') && (t.includes('gemini') || t.includes('google') || t.includes('ai'))) return true;
    if (s.includes('claude') && (t.includes('claude') || t.includes('ai'))) return true;
    if (s.includes('chatgpt') && (t.includes('chatgpt') || t.includes('ai') || t.includes('prompt'))) return true;
    if (s.includes('elevenlabs') && (t.includes('elevenlabs') || t.includes('audio') || t.includes('voice') || t.includes('ai'))) return true;
    if (s.includes('ai-assisted') && (t.includes('ai') || t.includes('prompt'))) return true;
    return false;
  });
  if (hasToolMatch) return true;

  // 2. Deliverables match
  const allDeliverables = [...project.deliverables, ...(project.deliverablesEn || [])];
  const hasDeliverableMatch = allDeliverables.some((deliv) => {
    const d = deliv.toLowerCase();
    if (d.includes(s) || s.includes(d)) return true;
    const keywords = s.split(/[\s,&/()]+/).filter((w) => w.length >= 4);
    return keywords.some((k) => d.includes(k));
  });
  if (hasDeliverableMatch) return true;

  // 3. Semantic Category & Specialized Concept Mapping
  if (s.includes('premiere') || s.includes('video color') || s.includes('audio pacing') || s.includes('reels') || s.includes('tiktok') || s.includes('short-form')) {
    if (project.category === 'video' || project.category === 'motion') return true;
  }
  if (s.includes('after effects') || s.includes('motion graphic') || s.includes('kinetic typography')) {
    if (project.category === 'motion' || project.category === 'video' || project.category === 'ai') return true;
  }
  if (s.includes('photoshop') || s.includes('illustrator')) {
    if (project.category === 'branding' || project.category === 'packaging' || project.category === 'motion' || project.category === 'video') return true;
  }
  if (s.includes('brand') || s.includes('logo') || s.includes('company profile') || s.includes('pitch deck')) {
    if (project.category === 'branding' || project.id === 'interactive-company-profile') return true;
  }
  if (s.includes('packaging') || s.includes('dieline')) {
    if (project.category === 'packaging') return true;
  }
  if (s.includes('figma') || s.includes('prototyping') || s.includes('design thinking') || s.includes('user research') || s.includes('wireframing') || s.includes('usability') || s.includes('html') || s.includes('web api') || s.includes('javascript')) {
    if (project.category === 'uiux' || project.id === 'uiux-mobile-web-system' || project.id === 'kalimandau-web-app-promo') return true;
  }
  if (s.includes('google ai') || s.includes('gemini') || s.includes('claude') || s.includes('chatgpt') || s.includes('elevenlabs') || s.includes('ai-assisted') || s.includes('prompt') || s.includes('scriptwriting') || s.includes('azure') || s.includes('augmented video') || s.includes('generative')) {
    if (project.category === 'ai' || project.id === 'ai-assisted-video-synthesis') return true;
  }
  if (s.includes('content calendar') || s.includes('copywriting') || s.includes('caption') || s.includes('strategy') || s.includes('scriptwriting')) {
    if (project.id === 'fasting-motion-video' || project.id === 'burn-belly-fat-motion-video' || project.id === 'interactive-company-profile') return true;
  }
  if (s.includes('broadcast') || s.includes('creative direction') || s.includes('leadership')) {
    if (project.id === 'nurulummah-graduation-motion' || project.id === 'fasting-motion-video' || project.id === 'burn-belly-fat-motion-video' || project.id === 'kalimandau-web-app-promo' || project.id === 'project-grand-pengajian-maulid-nabi-2026') return true;
  }
  if (s.includes('presentation') || s.includes('microsoft office')) {
    if (project.id === 'interactive-company-profile') return true;
  }
  if (s.includes('client communication') || s.includes('relationship management') || s.includes('time management') || s.includes('multi-project')) {
    if (project.id === 'fasting-motion-video' || project.id === 'burn-belly-fat-motion-video' || project.id === 'nurulummah-graduation-motion' || project.id === 'kalimandau-web-app-promo' || project.id === 'interactive-company-profile' || project.id === 'project-grand-pengajian-maulid-nabi-2026') return true;
  }
  if (s.includes('problem solving') || s.includes('creative adaptability') || s.includes('team collaboration')) {
    if (project.id === 'nurulummah-graduation-motion' || project.id === 'uiux-mobile-web-system' || project.id === 'ai-assisted-video-synthesis') return true;
  }
  if (s.includes('attention to detail') || s.includes('quality control')) {
    if (project.category === 'packaging' || project.id === 'uiux-mobile-web-system' || project.id === 'company-branding-deck') return true;
  }

  // 4. Title & Description keyword matching
  const fullText = `${project.title} ${project.titleEn} ${project.description} ${project.descriptionEn}`.toLowerCase();
  const meaningfulWords = s
    .split(/[\s,&/()]+/)
    .filter((w) => w.length >= 4 && !['design', 'modern', 'level', 'expert', 'basic', 'basics'].includes(w));
  if (meaningfulWords.length > 0 && meaningfulWords.some((w) => fullText.includes(w))) {
    return true;
  }

  return false;
}
