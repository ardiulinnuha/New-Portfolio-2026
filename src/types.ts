export interface ProjectMilestone {
  id?: string;
  phase: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  duration?: string;
  deliverable?: string;
  deliverableEn?: string;
  status?: 'completed' | 'current' | 'upcoming';
  iconName?: 'search' | 'pen' | 'code' | 'play' | 'check' | 'sparkles' | 'layers' | 'package';
}

export interface RoadmapStep {
  id: string;
  stage: 'Planning' | 'Design' | 'Development' | 'Deployment';
  phaseNumber: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  description: string;
  descriptionEn?: string;
  deliverables: string[];
  toolsUsed: string[];
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  accentColor?: {
    badge: string;
    text: string;
    border: string;
    activeBorder: string;
    bg: string;
    glow: string;
    halo: string;
    lightBg: string;
    lightBorder: string;
    lightText: string;
    gradient: string;
    colorHex: string;
  };
}

export interface ProjectGalleryItem {
  id?: string;
  title?: string;
  titleEn?: string;
  imageUrl?: string;
  isPlaceholder?: boolean;
  aspectRatio?: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  category: 'motion' | 'video' | 'branding' | 'packaging' | 'uiux' | 'ai';
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  overviewDescription?: string;
  overviewDescriptionEn?: string;
  tools: string[];
  clientOrContext: string;
  year: string;
  featured: boolean;
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3';
  accentColor: string;
  gradientBg: string;
  imageUrl?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
  isPlaceholder?: boolean;
  hideOverlayText?: boolean;
  behanceUrl?: string;
  behanceEmbedUrl?: string;
  youtubeUrl?: string;
  websiteUrl?: string;
  gallery?: ProjectGalleryItem[];
  deliverables: string[];
  deliverablesEn: string[];
  metrics?: string;
  metricsEn?: string;
  tags?: string[];
  tagBadge?: string;
  badge?: string;
  roadmap?: (ProjectMilestone | RoadmapStep)[];
  previewGridType?: '3-grid' | '2x2' | 'single' | 'social-grid' | 'featured-duo' | 'coffee-grid' | 'portrait-video-showcase' | 'packaging-duo' | 'single-column-stack';
}

export interface ExperienceItem {
  id: string;
  role: string;
  roleEn: string;
  company: string;
  platform?: string;
  period: string;
  periodEn: string;
  location: string;
  locationEn?: string;
  type: string;
  typeEn: string;
  points: string[];
  pointsEn: string[];
  highlightMetric?: string;
  highlightMetricEn?: string;
  tags: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  fullTitle?: string;
  issuer: string;
  issuerBadge?: string;
  period: string;
  issueDate?: string;
  category: 'ai' | 'motion_design' | 'uiux' | 'it_network' | 'web';
  categoryLabel: string;
  categoryLabelEn: string;
  description: string;
  descriptionEn: string;
  credentialUrl: string;
  skillsAcquired: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  titleEn: string;
  issuer: string;
  date: string;
  description: string;
  descriptionEn: string;
  iconName: string;
  credentialUrl?: string;
}

export interface OrganizationItem {
  id: string;
  role: string;
  roleEn: string;
  organization: string;
  url?: string;
  period: string;
  periodEn?: string;
  badgeLabel?: string;
  description: string;
  descriptionEn: string;
  deliverables: string[];
  deliverablesEn?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  badge?: string;
  isPrimary?: boolean;
  description?: string;
  descriptionEn?: string;
  workflow?: string;
  workflowEn?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  description: string;
  descriptionEn: string;
  skills: SkillItem[];
}
