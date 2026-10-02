import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Palette, 
  Code, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  Layers,
  Wrench,
  Zap,
  Activity
} from 'lucide-react';
import { Project } from '../types';
import { isAiTool, getToolBadgeClass } from '../utils/aiToolHelper';

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
  accentColor: {
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

interface RoadmapVisualizerProps {
  project: Project;
  className?: string;
}

// Generate tailored 4-step milestones (Planning, Design, Development, Deployment) for each project category
const getCategoryRoadmap = (project: Project): RoadmapStep[] => {
  if (project.roadmap && project.roadmap.length > 0 && 'stage' in project.roadmap[0]) {
    const defaultAccents = [
      {
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        activeBorder: 'border-cyan-400',
        bg: 'bg-cyan-950/30',
        glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
        halo: 'rgba(34,211,238,0.4)',
        lightBg: 'bg-cyan-50',
        lightBorder: 'border-cyan-200',
        lightText: 'text-cyan-700',
        gradient: 'from-cyan-500 to-blue-500',
        colorHex: '#22d3ee'
      },
      {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        activeBorder: 'border-amber-400',
        bg: 'bg-amber-950/30',
        glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
        halo: 'rgba(251,191,36,0.4)',
        lightBg: 'bg-amber-50',
        lightBorder: 'border-amber-200',
        lightText: 'text-amber-700',
        gradient: 'from-amber-500 to-orange-500',
        colorHex: '#fbbf24'
      },
      {
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        activeBorder: 'border-purple-400',
        bg: 'bg-purple-950/30',
        glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
        halo: 'rgba(168,85,247,0.4)',
        lightBg: 'bg-purple-50',
        lightBorder: 'border-purple-200',
        lightText: 'text-purple-700',
        gradient: 'from-purple-500 to-pink-500',
        colorHex: '#c084fc'
      },
      {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        activeBorder: 'border-emerald-400',
        bg: 'bg-emerald-950/30',
        glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
        halo: 'rgba(52,211,153,0.4)',
        lightBg: 'bg-emerald-50',
        lightBorder: 'border-emerald-200',
        lightText: 'text-emerald-700',
        gradient: 'from-emerald-500 to-teal-500',
        colorHex: '#34d399'
      }
    ];

    return (project.roadmap as RoadmapStep[]).map((step, idx) => ({
      ...step,
      accentColor: step.accentColor || defaultAccents[idx % defaultAccents.length]
    }));
  }

  const tools = project.tools || [];
  const primaryTool = tools[0] || 'Design Suite';

  switch (project.category) {
    case 'branding':
      return [
        {
          id: 'step-planning',
          stage: 'Planning',
          phaseNumber: '01',
          title: 'Brand Discovery & Content Strategy',
          titleEn: 'Brand Discovery & Content Strategy',
          subtitle: 'Audit, Persona Mapping & Architecture',
          description: 'Brainstorming stakeholder requirements, market positioning, and target demographics, using Google AI Studio and Gemini for visual reference exploration, concept ideation, and initial creative brief drafting.',
          descriptionEn: 'Brainstorming stakeholder requirements, market positioning, and target demographics, using Google AI Studio and Gemini for visual reference exploration, concept ideation, and initial creative brief drafting.',
          deliverables: ['Creative Brief', 'Brand Information Hierarchy', 'Content Matrix'],
          toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Miro'],
          duration: 'Week 1-2',
          status: 'completed',
          accentColor: {
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            text: 'text-cyan-400',
            border: 'border-cyan-500/30',
            activeBorder: 'border-cyan-400',
            bg: 'bg-cyan-950/30',
            glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
            halo: 'rgba(34,211,238,0.4)',
            lightBg: 'bg-cyan-50',
            lightBorder: 'border-cyan-200',
            lightText: 'text-cyan-700',
            gradient: 'from-cyan-500 to-blue-500',
            colorHex: '#22d3ee'
          }
        },
        {
          id: 'step-design',
          stage: 'Design',
          phaseNumber: '02',
          title: 'Identity & Editorial Layout',
          titleEn: 'Identity & Editorial Layout',
          subtitle: 'Typography, Grid System & Style Guide',
          description: 'Developing visual concepts, drafting and refining narrative copy with Claude (Anthropic) for concept validation, followed by crafting precision vector geometry, cohesive color palettes, and master layouts.',
          descriptionEn: 'Developing visual concepts, drafting and refining narrative copy with Claude (Anthropic) for concept validation, followed by crafting precision vector geometry, cohesive color palettes, and master layouts.',
          deliverables: ['Vector Identity System', 'Color Palette & Typography Kit', 'Master Layout Spreads'],
          toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'InDesign', 'Photoshop'],
          duration: 'Week 3-4',
          status: 'completed',
          accentColor: {
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            text: 'text-amber-400',
            border: 'border-amber-500/30',
            activeBorder: 'border-amber-400',
            bg: 'bg-amber-950/30',
            glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
            halo: 'rgba(251,191,36,0.4)',
            lightBg: 'bg-amber-50',
            lightBorder: 'border-amber-200',
            lightText: 'text-amber-700',
            gradient: 'from-amber-500 to-orange-500',
            colorHex: '#fbbf24'
          }
        },
        {
          id: 'step-development',
          stage: 'Development',
          phaseNumber: '03',
          title: 'Interactive Multi-Page Build',
          titleEn: 'Interactive Multi-Page Build',
          subtitle: 'Infographics, Hyperlinks & Deck Assembly',
          description: 'Assembling interactive PDF documents with internal navigation links, bespoke data visualizations, and high-impact visual spreads.',
          descriptionEn: 'Assembling interactive PDF documents with internal navigation links, bespoke data visualizations, and high-impact visual spreads.',
          deliverables: ['Interactive Multi-Page PDF', 'Vector Infographics', 'Presentation Pitch Deck'],
          toolsUsed: ['Adobe InDesign', 'Acrobat Pro', primaryTool],
          duration: 'Week 5-6',
          status: 'completed',
          accentColor: {
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
            activeBorder: 'border-purple-400',
            bg: 'bg-purple-950/30',
            glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
            halo: 'rgba(168,85,247,0.4)',
            lightBg: 'bg-purple-50',
            lightBorder: 'border-purple-200',
            lightText: 'text-purple-700',
            gradient: 'from-purple-500 to-pink-500',
            colorHex: '#c084fc'
          }
        },
        {
          id: 'step-deployment',
          stage: 'Deployment',
          phaseNumber: '04',
          title: 'Preflight QA & Distribution Package',
          titleEn: 'Preflight QA & Distribution Package',
          subtitle: 'Print Proofing, Link Testing & Handover',
          description: 'Conducting comprehensive preflight checks, cross-device hyperlink validation, CMYK/RGB color verification, and final master delivery.',
          descriptionEn: 'Conducting comprehensive preflight checks, cross-device hyperlink validation, CMYK/RGB color verification, and final master delivery.',
          deliverables: ['Print-Ready PDF Master', 'Interactive Web-Optimized PDF', 'Source Vector Package'],
          toolsUsed: ['Adobe Acrobat Pro', 'Google Drive', 'Cloud Storage'],
          duration: 'Final Stage',
          status: 'completed',
          accentColor: {
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            activeBorder: 'border-emerald-400',
            bg: 'bg-emerald-950/30',
            glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
            halo: 'rgba(52,211,153,0.4)',
            lightBg: 'bg-emerald-50',
            lightBorder: 'border-emerald-200',
            lightText: 'text-emerald-700',
            gradient: 'from-emerald-500 to-teal-500',
            colorHex: '#34d399'
          }
        }
      ];

    case 'motion':
      return [
        {
          id: 'step-planning',
          stage: 'Planning',
          phaseNumber: '01',
          title: 'Audio Analysis & Narrative Script',
          titleEn: 'Audio Analysis & Narrative Script',
          subtitle: 'BPM Mapping, Beat Markers & Tone Brief',
          description: 'Brainstorming motion concepts, story arcs, and visual metaphors with Google AI Studio and Gemini, analyzing event pacing, audio frequencies/BPM cues, and drafting the creative brief.',
          descriptionEn: 'Brainstorming motion concepts, story arcs, and visual metaphors with Google AI Studio and Gemini, analyzing event pacing, audio frequencies/BPM cues, and drafting the creative brief.',
          deliverables: ['Audio Sync Cue Sheet', 'Narrative Story Script', 'Visual Beat Timeline'],
          toolsUsed: ['Google AI Studio', 'Gemini', 'Adobe Audition', 'Notion'],
          duration: 'Phase 1',
          status: 'completed',
          accentColor: {
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            text: 'text-cyan-400',
            border: 'border-cyan-500/30',
            activeBorder: 'border-cyan-400',
            bg: 'bg-cyan-950/30',
            glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
            halo: 'rgba(34,211,238,0.4)',
            lightBg: 'bg-cyan-50',
            lightBorder: 'border-cyan-200',
            lightText: 'text-cyan-700',
            gradient: 'from-cyan-500 to-blue-500',
            colorHex: '#22d3ee'
          }
        },
        {
          id: 'step-design',
          stage: 'Design',
          phaseNumber: '02',
          title: 'Styleframes & Storyboarding',
          titleEn: 'Styleframes & Storyboarding',
          subtitle: 'Visual Boards, LED Canvas Specs & Lighting',
          description: 'Refining scene narrative, visual flow, and concept validation using Claude (Anthropic), followed by designing high-fidelity styleframes, composition boards, typography momentum, and lighting moods.',
          descriptionEn: 'Refining scene narrative, visual flow, and concept validation using Claude (Anthropic), followed by designing high-fidelity styleframes, composition boards, typography momentum, and lighting moods.',
          deliverables: ['Key Visual Styleframes Deck', 'Storyboard Sequencing', 'LED Resolution Pixel Map'],
          toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop', 'Figma'],
          duration: 'Phase 2',
          status: 'completed',
          accentColor: {
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            text: 'text-amber-400',
            border: 'border-amber-500/30',
            activeBorder: 'border-amber-400',
            bg: 'bg-amber-950/30',
            glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
            halo: 'rgba(251,191,36,0.4)',
            lightBg: 'bg-amber-50',
            lightBorder: 'border-amber-200',
            lightText: 'text-amber-700',
            gradient: 'from-amber-500 to-orange-500',
            colorHex: '#fbbf24'
          }
        },
        {
          id: 'step-development',
          stage: 'Development',
          phaseNumber: '03',
          title: 'Kinetic Animation & Particle VFX',
          titleEn: 'Kinetic Animation & Particle VFX',
          subtitle: 'Keyframing, 3D Camera & Dynamics',
          description: 'Building responsive keyframe curves, kinetic typography transitions, 3D camera depth, and dynamic visual effects synced to audio.',
          descriptionEn: 'Building responsive keyframe curves, kinetic typography transitions, 3D camera depth, and dynamic visual effects synced to audio.',
          deliverables: ['Full Motion Sequence', 'VFX Compositing Pass', 'Alpha Channel Overlays'],
          toolsUsed: ['Adobe After Effects', 'Cinema 4D', 'Trapcode Suite'],
          duration: 'Phase 3',
          status: 'completed',
          accentColor: {
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
            activeBorder: 'border-purple-400',
            bg: 'bg-purple-950/30',
            glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
            halo: 'rgba(168,85,247,0.4)',
            lightBg: 'bg-purple-50',
            lightBorder: 'border-purple-200',
            lightText: 'text-purple-700',
            gradient: 'from-purple-500 to-pink-500',
            colorHex: '#c084fc'
          }
        },
        {
          id: 'step-deployment',
          stage: 'Deployment',
          phaseNumber: '04',
          title: 'Color Grading, Sound Design & Render',
          titleEn: 'Color Grading, Sound Design & Render',
          subtitle: 'ProRes 4K Master, Multi-Screen Export & Sync',
          description: 'Mastering layered sound effects, final cinematic color adjustments, live stage playback rehearsals, and multi-bitrate ProRes exports.',
          descriptionEn: 'Mastering layered sound effects, final cinematic color adjustments, live stage playback rehearsals, and multi-bitrate ProRes exports.',
          deliverables: ['ProRes 422 HQ 4K Master', 'LED Wall Playback Cuts', 'Web 1080p60 MP4 Packages'],
          toolsUsed: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Adobe Media Encoder'],
          duration: 'Final Delivery',
          status: 'completed',
          accentColor: {
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            activeBorder: 'border-emerald-400',
            bg: 'bg-emerald-950/30',
            glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
            halo: 'rgba(52,211,153,0.4)',
            lightBg: 'bg-emerald-50',
            lightBorder: 'border-emerald-200',
            lightText: 'text-emerald-700',
            gradient: 'from-emerald-500 to-teal-500',
            colorHex: '#34d399'
          }
        }
      ];

    case 'video':
      return [
        {
          id: 'step-planning',
          stage: 'Planning',
          phaseNumber: '01',
          title: 'Pre-Production & Footage Ingestion',
          titleEn: 'Pre-Production & Footage Ingestion',
          subtitle: 'Logging, Multi-Cam Sync & Narrative Outline',
          description: 'Brainstorming creative angles, script concepts, and visual references with Google AI Studio and Gemini, while reviewing footage logs and structuring the narrative outline into the creative brief.',
          descriptionEn: 'Brainstorming creative angles, script concepts, and visual references with Google AI Studio and Gemini, while reviewing footage logs and structuring the narrative outline into the creative brief.',
          deliverables: ['A-Roll Story Outline', 'Footage Ingest Log', 'Timecode Sync Sequences'],
          toolsUsed: ['Google AI Studio', 'Gemini', 'Adobe Premiere Pro', 'Notion'],
          duration: 'Stage 1',
          status: 'completed',
          accentColor: {
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            text: 'text-cyan-400',
            border: 'border-cyan-500/30',
            activeBorder: 'border-cyan-400',
            bg: 'bg-cyan-950/30',
            glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
            halo: 'rgba(34,211,238,0.4)',
            lightBg: 'bg-cyan-50',
            lightBorder: 'border-cyan-200',
            lightText: 'text-cyan-700',
            gradient: 'from-cyan-500 to-blue-500',
            colorHex: '#22d3ee'
          }
        },
        {
          id: 'step-design',
          stage: 'Design',
          phaseNumber: '02',
          title: 'Visual Identity & Lower Thirds Design',
          titleEn: 'Visual Identity & Lower Thirds Design',
          subtitle: 'Motion Titles, Callouts & Color Look Curves',
          description: 'Structuring and refining spoken copy, title hooks, and concept scripts using Claude (Anthropic), followed by designing broadcast graphic packaging, lower thirds, and color look curves.',
          descriptionEn: 'Structuring and refining spoken copy, title hooks, and concept scripts using Claude (Anthropic), followed by designing broadcast graphic packaging, lower thirds, and color look curves.',
          deliverables: ['Animated Lower Thirds Kit', 'Custom Brand MOGRTs', 'Color Grade LUT Library'],
          toolsUsed: ['Claude (Anthropic)', 'Adobe After Effects', 'Photoshop', 'Illustrator'],
          duration: 'Stage 2',
          status: 'completed',
          accentColor: {
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            text: 'text-amber-400',
            border: 'border-amber-500/30',
            activeBorder: 'border-amber-400',
            bg: 'bg-amber-950/30',
            glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
            halo: 'rgba(251,191,36,0.4)',
            lightBg: 'bg-amber-50',
            lightBorder: 'border-amber-200',
            lightText: 'text-amber-700',
            gradient: 'from-amber-500 to-orange-500',
            colorHex: '#fbbf24'
          }
        },
        {
          id: 'step-development',
          stage: 'Development',
          phaseNumber: '03',
          title: 'Rough Cut, B-Roll & Dynamic Pacing',
          titleEn: 'Rough Cut, B-Roll & Dynamic Pacing',
          subtitle: 'Pacing Polish, J-Cuts & Audio Mixing',
          description: 'Refining the visual flow with rhythmic B-roll layering, audio frequency balancing, vocal isolation, and dynamic sound design.',
          descriptionEn: 'Refining the visual flow with rhythmic B-roll layering, audio frequency balancing, vocal isolation, and dynamic sound design.',
          deliverables: ['Fine Narrative Cut', 'Multi-Track Audio Mix', 'Pacing Retention Curves'],
          toolsUsed: ['Adobe Premiere Pro', 'Audition', 'DaVinci Resolve'],
          duration: 'Stage 3',
          status: 'completed',
          accentColor: {
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
            activeBorder: 'border-purple-400',
            bg: 'bg-purple-950/30',
            glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
            halo: 'rgba(168,85,247,0.4)',
            lightBg: 'bg-purple-50',
            lightBorder: 'border-purple-200',
            lightText: 'text-purple-700',
            gradient: 'from-purple-500 to-pink-500',
            colorHex: '#c084fc'
          }
        },
        {
          id: 'step-deployment',
          stage: 'Deployment',
          phaseNumber: '04',
          title: 'Color Finishing, 4K & Multi-Aspect Export',
          titleEn: 'Color Finishing, 4K & Multi-Aspect Export',
          subtitle: 'DaVinci Color Pass & Social Ratio Crops',
          description: 'Executing DaVinci Resolve color grading, loudness standard normalization (-14 LUFS), and publishing 16:9 & 9:16 deliverable packages.',
          descriptionEn: 'Executing DaVinci Resolve color grading, loudness standard normalization (-14 LUFS), and publishing 16:9 & 9:16 deliverable packages.',
          deliverables: ['4K UHD Broadcast Master', '1080x1920 Vertical Short Crops', 'Clean Textless Cut'],
          toolsUsed: ['DaVinci Resolve', 'Adobe Media Encoder', 'Frame.io'],
          duration: 'Final Delivery',
          status: 'completed',
          accentColor: {
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            activeBorder: 'border-emerald-400',
            bg: 'bg-emerald-950/30',
            glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
            halo: 'rgba(52,211,153,0.4)',
            lightBg: 'bg-emerald-50',
            lightBorder: 'border-emerald-200',
            lightText: 'text-emerald-700',
            gradient: 'from-emerald-500 to-teal-500',
            colorHex: '#34d399'
          }
        }
      ];

    case 'packaging':
      return [
        {
          id: 'step-planning',
          stage: 'Planning',
          phaseNumber: '01',
          title: 'Dieline Blueprint & Structural Analysis',
          titleEn: 'Dieline Blueprint & Structural Analysis',
          subtitle: 'Substrates, Tolerances & Compliance',
          description: 'Brainstorming structural dielines, aesthetic themes, and material finishes with Google AI Studio and Gemini for concept exploration, initial reference gathering, and creative brief drafting.',
          descriptionEn: 'Brainstorming structural dielines, aesthetic themes, and material finishes with Google AI Studio and Gemini for concept exploration, initial reference gathering, and creative brief drafting.',
          deliverables: ['1:1 Vector Dieline Template', 'Substrate & Coating Specs', 'Regulatory Placement Matrix'],
          toolsUsed: ['Google AI Studio', 'Gemini', 'Adobe Illustrator', 'Notion'],
          duration: 'Stage 1',
          status: 'completed',
          accentColor: {
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            text: 'text-cyan-400',
            border: 'border-cyan-500/30',
            activeBorder: 'border-cyan-400',
            bg: 'bg-cyan-950/30',
            glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
            halo: 'rgba(34,211,238,0.4)',
            lightBg: 'bg-cyan-50',
            lightBorder: 'border-cyan-200',
            lightText: 'text-cyan-700',
            gradient: 'from-cyan-500 to-blue-500',
            colorHex: '#22d3ee'
          }
        },
        {
          id: 'step-design',
          stage: 'Design',
          phaseNumber: '02',
          title: 'Graphic Artwork & Hierarchy Study',
          titleEn: 'Graphic Artwork & Hierarchy Study',
          subtitle: 'Typography, Custom Vectors & Spot Finishes',
          description: 'Refining packaging copywriting, product storytelling, and narrative validation with Claude (Anthropic), followed by designing typography, custom vectors, and spot UV/foil separation layers.',
          descriptionEn: 'Refining packaging copywriting, product storytelling, and narrative validation with Claude (Anthropic), followed by designing typography, custom vectors, and spot UV/foil separation layers.',
          deliverables: ['Surface Graphic Artwork', 'Pantone Spot Color Guide', 'Spot UV & Foil Separation Layers'],
          toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
          duration: 'Stage 2',
          status: 'completed',
          accentColor: {
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            text: 'text-amber-400',
            border: 'border-amber-500/30',
            activeBorder: 'border-amber-400',
            bg: 'bg-amber-950/30',
            glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
            halo: 'rgba(251,191,36,0.4)',
            lightBg: 'bg-amber-50',
            lightBorder: 'border-amber-200',
            lightText: 'text-amber-700',
            gradient: 'from-amber-500 to-orange-500',
            colorHex: '#fbbf24'
          }
        },
        {
          id: 'step-development',
          stage: 'Development',
          phaseNumber: '03',
          title: 'Product Photography & Styling',
          titleEn: 'Product Photography & Styling',
          subtitle: 'Studio Setup, Lighting & Composition',
          description: "Coordinating product photoshoot with styled props (coffee beans, cup, rustic textures) to capture the packaging's texture, color richness, and brand details in a warm, artisanal setting.",
          descriptionEn: "Coordinating product photoshoot with styled props (coffee beans, cup, rustic textures) to capture the packaging's texture, color richness, and brand details in a warm, artisanal setting.",
          deliverables: [
            'Studio & Lifestyle Product Shots',
            'Multi-Angle Packaging Photography',
            'Styled Flat-Lay Compositions'
          ],
          toolsUsed: ['DSLR Camera / Studio Lighting', 'Photoshop'],
          duration: 'Stage 3',
          status: 'completed',
          accentColor: {
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
            activeBorder: 'border-purple-400',
            bg: 'bg-purple-950/30',
            glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
            halo: 'rgba(168,85,247,0.4)',
            lightBg: 'bg-purple-50',
            lightBorder: 'border-purple-200',
            lightText: 'text-purple-700',
            gradient: 'from-purple-500 to-pink-500',
            colorHex: '#c084fc'
          }
        },
        {
          id: 'step-deployment',
          stage: 'Deployment',
          phaseNumber: '04',
          title: 'Pre-Press Proofing & Production Handover',
          titleEn: 'Pre-Press Proofing & Production Handover',
          subtitle: 'Color Proofs, Bleed Verifications & Press Prep',
          description: 'Exporting 100% vector press-ready PDF files with embedded bleed, crop marks, Pantone channel separations, and print vendor handover.',
          descriptionEn: 'Exporting 100% vector press-ready PDF files with embedded bleed, crop marks, Pantone channel separations, and print vendor handover.',
          deliverables: ['Press-Ready CMYK + Spot Plates', 'Final Vendor Dieline Package', 'Digital Marketing Assets Kit'],
          toolsUsed: ['Adobe Acrobat Pro', 'Illustrator', 'Vendor Preflight System'],
          duration: 'Final Delivery',
          status: 'completed',
          accentColor: {
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            activeBorder: 'border-emerald-400',
            bg: 'bg-emerald-950/30',
            glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
            halo: 'rgba(52,211,153,0.4)',
            lightBg: 'bg-emerald-50',
            lightBorder: 'border-emerald-200',
            lightText: 'text-emerald-700',
            gradient: 'from-emerald-500 to-teal-500',
            colorHex: '#34d399'
          }
        }
      ];

    case 'uiux':
    default:
      return [
        {
          id: 'step-planning',
          stage: 'Planning',
          phaseNumber: '01',
          title: 'User Research & Information Architecture',
          titleEn: 'User Research & Information Architecture',
          subtitle: 'Personas, Problem Statements & User Journeys',
          description: 'Synthesizing user research, brainstorming user personas and user journey maps with Google AI Studio and Gemini for rapid ideation, reference discovery, and initial creative brief alignment.',
          descriptionEn: 'Synthesizing user research, brainstorming user personas and user journey maps with Google AI Studio and Gemini for rapid ideation, reference discovery, and initial creative brief alignment.',
          deliverables: ['User Flow Maps', 'Information Architecture Sitemap', 'Competitive Benchmark Matrix'],
          toolsUsed: ['Google AI Studio', 'Gemini', 'Figma', 'Miro'],
          duration: 'Sprint 1',
          status: 'completed',
          accentColor: {
            badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            text: 'text-cyan-400',
            border: 'border-cyan-500/30',
            activeBorder: 'border-cyan-400',
            bg: 'bg-cyan-950/30',
            glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]',
            halo: 'rgba(34,211,238,0.4)',
            lightBg: 'bg-cyan-50',
            lightBorder: 'border-cyan-200',
            lightText: 'text-cyan-700',
            gradient: 'from-cyan-500 to-blue-500',
            colorHex: '#22d3ee'
          }
        },
        {
          id: 'step-design',
          stage: 'Design',
          phaseNumber: '02',
          title: 'Wireframing & Interactive Prototyping',
          titleEn: 'Wireframing & Interactive Prototyping',
          subtitle: 'Low-Fi Scaffolding & Usability Testing',
          description: 'Drafting microcopy, analyzing task completion flows, and validating concept architecture with Claude (Anthropic) before creating interactive wireframes and component hierarchies.',
          descriptionEn: 'Drafting microcopy, analyzing task completion flows, and validating concept architecture with Claude (Anthropic) before creating interactive wireframes and component hierarchies.',
          deliverables: ['Interactive Wireframe Prototypes', 'Usability Test Synthesis', 'Component Architecture'],
          toolsUsed: ['Claude (Anthropic)', 'Figma', 'Photoshop', 'Illustrator'],
          duration: 'Sprint 2',
          status: 'completed',
          accentColor: {
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            text: 'text-amber-400',
            border: 'border-amber-500/30',
            activeBorder: 'border-amber-400',
            bg: 'bg-amber-950/30',
            glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]',
            halo: 'rgba(251,191,36,0.4)',
            lightBg: 'bg-amber-50',
            lightBorder: 'border-amber-200',
            lightText: 'text-amber-700',
            gradient: 'from-amber-500 to-orange-500',
            colorHex: '#fbbf24'
          }
        },
        {
          id: 'step-development',
          stage: 'Development',
          phaseNumber: '03',
          title: 'Design System & High-Fidelity UI',
          titleEn: 'Design System & High-Fidelity UI',
          subtitle: 'Design Tokens, Components & Responsive Views',
          description: 'Building accessible WCAG color scales, reusable auto-layout UI components, micro-interaction states, and responsive breakpoints.',
          descriptionEn: 'Building accessible WCAG color scales, reusable auto-layout UI components, micro-interaction states, and responsive breakpoints.',
          deliverables: ['Atomic Design System', 'High-Fidelity Component Library', 'Interactive Clickable Master UI'],
          toolsUsed: ['Figma', 'Tailwind CSS', 'React / TypeScript'],
          duration: 'Sprint 3-4',
          status: 'completed',
          accentColor: {
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
            activeBorder: 'border-purple-400',
            bg: 'bg-purple-950/30',
            glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
            halo: 'rgba(168,85,247,0.4)',
            lightBg: 'bg-purple-50',
            lightBorder: 'border-purple-200',
            lightText: 'text-purple-700',
            gradient: 'from-purple-500 to-pink-500',
            colorHex: '#c084fc'
          }
        },
        {
          id: 'step-deployment',
          stage: 'Deployment',
          phaseNumber: '04',
          title: 'Design Handoff, QA Audit & Launch',
          titleEn: 'Design Handoff, QA Audit & Launch',
          subtitle: 'Token Specs, Responsive QA & Production Live',
          description: 'Exporting production SVG assets, generating token documentation for engineering, conducting responsive UI audits, and launch.',
          descriptionEn: 'Exporting production SVG assets, generating token documentation for engineering, conducting responsive UI audits, and launch.',
          deliverables: ['Production Handoff Specs', 'Optimized SVG / WebP Assets', 'Design QA Audit Report'],
          toolsUsed: ['Figma Dev Mode', 'GitHub', 'Vercel / Cloud Run'],
          duration: 'Final Stage',
          status: 'completed',
          accentColor: {
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            activeBorder: 'border-emerald-400',
            bg: 'bg-emerald-950/30',
            glow: 'shadow-[0_0_25px_rgba(52,211,153,0.25)]',
            halo: 'rgba(52,211,153,0.4)',
            lightBg: 'bg-emerald-50',
            lightBorder: 'border-emerald-200',
            lightText: 'text-emerald-700',
            gradient: 'from-emerald-500 to-teal-500',
            colorHex: '#34d399'
          }
        }
      ];
  }
};

export const RoadmapVisualizer: React.FC<RoadmapVisualizerProps> = ({ 
  project,
  className = ''
}) => {
  const steps = useMemo(() => getCategoryRoadmap(project), [project]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = steps[activeStepIndex] || steps[0];

  const getStageIcon = (stage: string, isCurrentActive: boolean) => {
    switch (stage) {
      case 'Planning':
        return <Compass className={`w-4 h-4 transition-transform duration-300 ${isCurrentActive ? 'text-cyan-400 scale-110' : 'text-slate-500 dark:text-gray-400'}`} />;
      case 'Design':
        return <Palette className={`w-4 h-4 transition-transform duration-300 ${isCurrentActive ? 'text-amber-400 scale-110' : 'text-slate-500 dark:text-gray-400'}`} />;
      case 'Development':
        return <Code className={`w-4 h-4 transition-transform duration-300 ${isCurrentActive ? 'text-purple-400 scale-110' : 'text-slate-500 dark:text-gray-400'}`} />;
      case 'Deployment':
      default:
        return <Rocket className={`w-4 h-4 transition-transform duration-300 ${isCurrentActive ? 'text-emerald-400 scale-110' : 'text-slate-500 dark:text-gray-400'}`} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`space-y-5 pt-1 ${className}`}
    >
      {/* Section Header with Glowing Indicator & Completion Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Layers className="w-4 h-4" />
            </div>
            {/* Glowing active ping */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-600 dark:text-cyan-400">
                PROJECT EXECUTION ROADMAP
              </h4>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hidden sm:inline">
                4-STAGE PIPELINE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-gray-400 font-mono">
              Planning • Design • Development • Deployment
            </p>
          </div>
        </div>

        {/* Global Progress Pill with Pulse Glow */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-gray-300 shadow-sm">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute opacity-50" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-semibold text-slate-800 dark:text-white">4/4 Milestones Completed</span>
        </div>
      </div>

      {/* HORIZONTAL STEP-BY-STEP TIMELINE TRACK WITH GLOWING CONNECTORS */}
      <div className="relative pt-2 md:pt-7">
        {/* Glow Ambient Filter Layer */}
        <div className="absolute inset-0 -top-2 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5 blur-xl pointer-events-none rounded-3xl" />

        {/* Top Connecting Pipeline (Desktop View) */}
        <div 
          className="hidden md:block absolute top-[12px] left-[12.5%] right-[12.5%] h-[3px] rounded-full bg-slate-200 dark:bg-white/10 z-0 overflow-hidden pointer-events-none" 
          aria-hidden="true"
        >
          {/* Base Inactive Track */}
          <div className="w-full h-full bg-slate-200 dark:bg-white/10" />

          {/* Animated Flowing Glowing Beam that lights up when opening */}
          <motion.div 
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          />

          {/* Continuous Traveling Light Photon Loop */}
          <motion.div
            animate={{
              x: ['-100%', '400%'],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-[1px]"
          />
        </div>

        {/* Responsive Horizontal Step Grid with Animated Glow Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
          {steps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;

            return (
              <motion.button
                key={step.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.45, 
                  delay: 0.15 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStepIndex(idx)}
                className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none ${
                  isSelected 
                    ? `dark:bg-black/80 bg-white/95 shadow-xl border-2 ${step.accentColor.activeBorder} ${step.accentColor.glow} ring-2 ring-cyan-500/20` 
                    : 'dark:bg-white/[0.02] bg-white/70 dark:border-white/10 border-slate-200/80 hover:border-slate-300 dark:hover:border-white/25 hover:bg-slate-50 dark:hover:bg-white/[0.05]'
                }`}
                aria-selected={isSelected}
                role="tab"
              >
                {/* Active Indicator Top Glow Beam */}
                {isSelected && (
                  <motion.div 
                    layoutId="activeRoadmapGlowBeam"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Subtle Ambient Radial Highlight for Selected Card */}
                {isSelected && (
                  <div 
                    className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-20 dark:opacity-30"
                    style={{ backgroundColor: step.accentColor.colorHex }}
                  />
                )}

                <div>
                  {/* Step Header: Glowing Node Indicator, Icon & Checkmark */}
                  <div className="flex items-center justify-between gap-1.5 mb-3">
                    <div className="flex items-center gap-1.5">
                      {/* Node Icon with Glowing Background Halo */}
                      <div className={`relative p-1.5 rounded-xl border transition-all duration-300 shrink-0 ${
                        isSelected 
                          ? 'dark:bg-black/90 bg-white border-cyan-400 shadow-md ring-2 ring-cyan-400/20' 
                          : 'dark:bg-black/50 bg-slate-100 dark:border-white/10 border-slate-200 group-hover:border-slate-300'
                      }`}>
                        {getStageIcon(step.stage, isSelected)}

                        {/* Pulsating Ring Indicator on Active Node */}
                        {isSelected && (
                          <motion.span 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -inset-1 rounded-xl border border-cyan-400 pointer-events-none"
                          />
                        )}
                      </div>

                      {/* Phase Number Badge */}
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border transition-colors ${
                        isSelected 
                          ? step.accentColor.badge 
                          : 'dark:bg-white/5 bg-slate-100 dark:text-gray-400 text-slate-600 dark:border-white/10 border-slate-200'
                      }`}>
                        {step.phaseNumber}
                      </span>
                    </div>

                    {/* Completion Status Marker */}
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      <div className="relative">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="absolute inset-0 rounded-full bg-emerald-400/30 blur-[2px]" />
                      </div>
                      <span className="hidden xl:inline text-[9px] font-semibold">Done</span>
                    </div>
                  </div>

                  {/* Stage Category Label */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold transition-colors ${
                      isSelected ? step.accentColor.text : 'text-slate-500 dark:text-gray-400'
                    }`}>
                      {step.stage}
                    </span>
                    <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                      isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-400 dark:text-gray-600 group-hover:translate-x-0.5'
                    }`} />
                  </div>

                  {/* Stage Headline */}
                  <h5 className={`font-semibold text-xs sm:text-sm line-clamp-2 leading-tight transition-colors ${
                    isSelected ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-300'
                  }`}>
                    {step.titleEn || step.title}
                  </h5>
                </div>

                {/* Bottom Duration / Status Footer */}
                <div className="pt-2.5 mt-3 border-t dark:border-white/10 border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-gray-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-gray-500" />
                    {step.duration}
                  </span>
                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full transition-all ${
                    isSelected 
                      ? 'bg-cyan-500/15 text-cyan-500 dark:text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]' 
                      : 'text-slate-400 dark:text-gray-500 group-hover:text-slate-600 dark:group-hover:text-gray-300'
                  }`}>
                    {isSelected ? 'Active' : 'Inspect'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE STAGE DEEP DIVE PANEL WITH ANIMATED TRANSITIONS */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeStep.id}
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.99 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-4 sm:p-5 rounded-2xl dark:bg-black/75 bg-slate-50/90 dark:border-white/10 border-slate-200 border shadow-lg overflow-hidden"
        >
          {/* Ambient Glow Accent in corner */}
          <div 
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-10 dark:opacity-20"
            style={{ backgroundColor: activeStep.accentColor.colorHex }}
          />

          {/* Panel Top Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b dark:border-white/10 border-slate-200 relative z-10">
            <div className="flex items-start gap-3.5">
              {/* Glowing Active Stage Icon */}
              <div className="relative p-3 rounded-2xl dark:bg-black/80 bg-white dark:border-white/15 border-slate-200 border shadow-md shrink-0 mt-0.5">
                {getStageIcon(activeStep.stage, true)}
                <span 
                  className="absolute inset-0 rounded-2xl blur-[6px] opacity-40 pointer-events-none"
                  style={{ backgroundColor: activeStep.accentColor.colorHex }}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shadow-sm ${activeStep.accentColor.badge}`}>
                    Stage {activeStep.phaseNumber} • {activeStep.stage}
                  </span>
                  <span className="text-slate-400 dark:text-gray-600 text-xs hidden sm:inline">•</span>
                  <span className="text-xs font-mono text-slate-600 dark:text-gray-300 font-medium">
                    {activeStep.subtitle}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{activeStep.titleEn || activeStep.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </h4>
              </div>
            </div>

            {/* Quick Step Navigation Arrows with Enhanced Styling */}
            <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500 hover:text-cyan-400 transition-all text-slate-700 dark:text-gray-300 shadow-sm"
                aria-label="Previous roadmap step"
              >
                ← Prev Stage
              </button>
              <div className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-white/5 text-[11px] font-mono text-slate-600 dark:text-gray-400">
                <span className="font-bold text-cyan-500">{activeStepIndex + 1}</span> / {steps.length}
              </div>
              <button
                type="button"
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 text-xs font-mono disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500 hover:text-cyan-400 transition-all text-slate-700 dark:text-gray-300 shadow-sm"
                aria-label="Next roadmap step"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Narrative Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed my-4 relative z-10">
            {activeStep.descriptionEn || activeStep.description}
          </p>

          {/* Deliverables & Tools Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 relative z-10">
            {/* Key Deliverables Card */}
            <div className="p-3.5 sm:p-4 rounded-xl dark:bg-white/[0.03] bg-white border dark:border-white/10 border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-1.5 mb-3 text-cyan-600 dark:text-cyan-400">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                    Key Deliverables & Verified Outputs
                  </span>
                </div>
                <ul className="space-y-2">
                  {activeStep.deliverables.map((item, dIdx) => (
                    <li key={`deliverable-${dIdx}`} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-gray-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)] shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Software & Stack Applied Card */}
            <div className="p-3.5 sm:p-4 rounded-xl dark:bg-white/[0.03] bg-white border dark:border-white/10 border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-1.5 mb-3 text-purple-600 dark:text-purple-400">
                  <Wrench className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                    Specialized Tools & Production Suite
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.toolsUsed.map((tool, tIdx) => {
                    const isAi = isAiTool(tool);
                    return (
                      <span 
                        key={`tool-${tIdx}`}
                        className={getToolBadgeClass(tool, true)}
                      >
                        {isAi && <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />}
                        <span>{tool}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
