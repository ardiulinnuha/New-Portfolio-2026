import { Project, ExperienceItem, CertificationItem, AwardItem, OrganizationItem, SkillCategory } from '../types';
import razenCoverVision from '../assets/projects/razen/project-1-01.webp';
import razenStartupGovt from '../assets/projects/razen/project-1-02.webp';
import razenVideoSosmed from '../assets/projects/razen/project-1-03.webp';
import razenKolhypeCamp from '../assets/projects/razen/project-1-06.webp';
import kopiGarasiCover from '../assets/projects/kopi-garasi/cover.webp';
import kopiGarasiPreview1 from '../assets/projects/kopi-garasi/preview-01.webp';
import kopiGarasiPreview2 from '../assets/projects/kopi-garasi/preview-02.webp';
import kopiGarasiPreview3 from '../assets/projects/kopi-garasi/preview-03.webp';
import uiuxGrid1 from '../assets/projects/uiux-design/uiuxgrid-1.webp';
import uiuxGrid2 from '../assets/projects/uiux-design/uiuxgrid-2.webp';
import uiuxGrid3 from '../assets/projects/uiux-design/uiuxgrid-3.webp';
import fastingCover from '../assets/projects/fasting/fasting.webp';
import bellyFatCover from '../assets/projects/belly-fat/cover.webp';
import nurulummahCover from '../assets/projects/nurulummah/cover.webp';
import kalimandauCover from '../assets/projects/kalimandau/cover.webp';
import travelGrid1 from '../assets/projects/travel/grid-1.webp';
import travelGrid2 from '../assets/projects/travel/grid-2.webp';
import travelGrid3 from '../assets/projects/travel/grid-3.webp';
import travelGrid4 from '../assets/projects/travel/grid-4.webp';
import travelGrid5 from '../assets/projects/travel/grid-5.webp';
import travelGrid6 from '../assets/projects/travel/grid-6.webp';
import foodGrid1 from '../assets/projects/food/grid-1-1.webp';
import foodGrid2 from '../assets/projects/food/grid-2.webp';
import foodGrid3 from '../assets/projects/food/grid-3.webp';
import coffee01 from '../assets/projects/coffeshop/Coffe-01.webp';
import coffee02 from '../assets/projects/coffeshop/Coffe-02.webp';
import coffee03 from '../assets/projects/coffeshop/Coffe-03.webp';
import coffee04 from '../assets/projects/coffeshop/Coffe-04.webp';
import coffee05 from '../assets/projects/coffeshop/Coffe-05.webp';
import coffee06 from '../assets/projects/coffeshop/Coffe-06.webp';
import coffee07 from '../assets/projects/coffeshop/Coffe-07.webp';
import coffee08 from '../assets/projects/coffeshop/Coffe-08.webp';
import muslimcap01 from '../assets/projects/muslimcap/muslimcap-01.webp';
import sribufood01 from '../assets/projects/sribufood/sribufood-01.webp';
import sribufood02 from '../assets/projects/sribufood/sribufood-02.webp';
import makanpus01 from '../assets/projects/makanpus/makanpus-01.webp';
import makanpus02 from '../assets/projects/makanpus/makanpus-02.webp';
import makanpus03 from '../assets/projects/makanpus/makanpus-03.webp';
import ptroyalidn01 from '../assets/projects/royalidn/ptroyalidn-01.webp';
import ptroyalidn02 from '../assets/projects/royalidn/ptroyalidn-02.webp';
import ptroyalidn03 from '../assets/projects/royalidn/ptroyalidn-03.webp';
import ptroyalidn04 from '../assets/projects/royalidn/ptroyalidn-04.webp';
import ptroyalidn05 from '../assets/projects/royalidn/ptroyalidn-05.webp';
import ptroyalidn06 from '../assets/projects/royalidn/ptroyalidn-06.webp';
import leadly01 from '../assets/projects/leadly/leadly-01.webp';
import leadly02 from '../assets/projects/leadly/leadly-02.webp';
import leadly03 from '../assets/projects/leadly/leadly-03.webp';
import leadly04 from '../assets/projects/leadly/leadly-04.webp';
import buhanif01 from '../assets/projects/buhanif/buhanif-01.webp';
import buhanif02 from '../assets/projects/buhanif/buhanif-02.webp';
import buhanif03 from '../assets/projects/buhanif/buhanif-03.webp';
import buhanif04 from '../assets/projects/buhanif/buhanif-04.webp';

export const PERSONAL_INFO = {
  name: 'Ardi Ulinnuha',
  role: 'Creative Technologist | Video Editor & Creative Designer | Google AI Certified',
  roleShort: 'Creative Technologist & Visual Designer',
  location: 'Makassar - Yogyakarta, Indonesia',
  locationEn: 'Makassar - Yogyakarta, Indonesia',
  phone: '+62 852 3640 2997',
  phoneRaw: '6285236402997',
  email: 'ardi.razen@gmail.com',
  education: {
    degree: 'S1 Informatika',
    degreeEn: 'Bachelor of Informatics',
    university: 'Amikom Yogyakarta University',
    universityEn: 'Amikom Yogyakarta University',
    badge1: 'Hack Your Potential',
    badge2: 'Code Your Path',
    badge1En: 'Hack Your Potential',
    badge2En: 'Code Your Path',
    concentration: 'Multimedia (Computer Graphics, Interactive Media, Video & Broadcasting)',
    summary: 'Latar belakang S1 Informatika dengan fokus Multimedia memberikan fondasi teknis dan pemahaman komputasi grafis yang kuat dalam mengombinasikan desain visual, motion graphics, video editing, dan integrasi Artificial Intelligence modern.',
    summaryEn: 'Bachelor of Informatics background with a Multimedia focus provides a solid technical foundation in computer graphics, visual storytelling, video editing, and modern Generative AI workflows.'
  },
  socialLinks: {
    behance: 'https://www.behance.net/ardiulinnuha/',
    youtube: 'https://www.youtube.com/@wotion982',
    linkedin: 'https://www.linkedin.com/in/ardiulinnuha982/',
    dicoding: 'https://www.dicoding.com/users/ardiulinnuha/',
    developer: 'https://g.dev/ardiulinnuha',
    credly: 'https://www.credly.com/users/ardiulinnuha/',
    whatsapp: 'https://wa.me/6285236402997'
  },
  stats: [
    { value: '4+', label: 'Tahun Pengalaman', labelEn: 'Years Experience' },
    { value: '5.0', label: 'Rating Fastwork.id', labelEn: 'Fastwork Client Rating' },
    { value: '10+', label: 'Sertifikasi Terverifikasi', labelEn: 'Certified Credentials' },
    { value: '100+', label: 'Aset Visual & Video', labelEn: 'Visual & Video Assets' }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'interactive-company-profile',
    code: '101',
    title: 'Interactive Multi-Page Company Profile & Pitch Deck',
    titleEn: 'Interactive Multi-Page Company Profile & Pitch Deck',
    category: 'branding',
    categoryLabel: 'Brand & Corporate Design',
    categoryLabelEn: 'Brand & Corporate Design',
    description: 'Designed and produced a comprehensive multi-page interactive company profile and pitch deck for PT Razen Teknologi Indonesia, a Yogyakarta-based technology company. The deck showcases the company\'s vision & mission, core service offerings across software development, startup incubation, government digital solutions, video creative production, and social media management — all packaged into a clickable, presentation-ready PDF.',
    descriptionEn: 'Designed and produced a comprehensive multi-page interactive company profile and pitch deck for PT Razen Teknologi Indonesia, a Yogyakarta-based technology company. The deck showcases the company\'s vision & mission, core service offerings across software development, startup incubation, government digital solutions, video creative production, and social media management — all packaged into a clickable, presentation-ready PDF.',
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Interactive PDF', 'Figma', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'PT Razen Teknologi Indonesia',
    year: '2024 - 2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#38bdf8',
    gradientBg: 'from-sky-950 via-slate-900 to-indigo-950',
    imageUrl: razenCoverVision,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/228189833/Company-Profile_Razen-Catalog',
    gallery: [
      {
        id: 'razen-preview-1',
        title: 'Cover Design & Company Vision',
        titleEn: 'Cover Design & Company Vision',
        isPlaceholder: false,
        imageUrl: razenCoverVision
      },
      {
        id: 'razen-preview-2',
        title: 'Startup Portfolio & Government Solutions',
        titleEn: 'Startup Portfolio & Government Solutions',
        isPlaceholder: false,
        imageUrl: razenStartupGovt
      },
      {
        id: 'razen-preview-3',
        title: 'Video Creative & Social Media Management',
        titleEn: 'Video Creative & Social Media Management',
        isPlaceholder: false,
        imageUrl: razenVideoSosmed
      },
      {
        id: 'razen-preview-4',
        title: 'Kolhype Product Campaign',
        titleEn: 'Kolhype Product Campaign',
        isPlaceholder: false,
        imageUrl: razenKolhypeCamp
      }
    ],
    deliverables: [
      'Company Vision & Mission Layout',
      'Sistem Informasi & Aplikasi Service Page',
      'Startup Portfolio Showcase (Sulcon, Kolhype, Akadsah, Mami Clean, Frigel, Laden)',
      'Government Smart Service Solutions Page',
      'Video Creative & Social Media Management Spread',
      'Interactive QR Code Integration for Video Demos'
    ],
    deliverablesEn: [
      'Company Vision & Mission Layout',
      'Sistem Informasi & Aplikasi Service Page',
      'Startup Portfolio Showcase (Sulcon, Kolhype, Akadsah, Mami Clean, Frigel, Laden)',
      'Government Smart Service Solutions Page',
      'Video Creative & Social Media Management Spread',
      'Interactive QR Code Integration for Video Demos'
    ],
    metrics: '+15% Client Acquisition Growth',
    metricsEn: '+15% Client Acquisition Growth',
    roadmap: [
      {
        id: 'razen-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Brand Discovery & Content Strategy',
        titleEn: 'Brand Discovery & Content Strategy',
        subtitle: 'Audit, Persona Mapping & Architecture',
        description: 'Brainstormed corporate capability positioning, service pillars, and technology portfolio hierarchy using Google AI Studio and Gemini for visual reference research, content structuring, and initial creative brief drafting.',
        descriptionEn: 'Brainstormed corporate capability positioning, service pillars, and technology portfolio hierarchy using Google AI Studio and Gemini for visual reference research, content structuring, and initial creative brief drafting.',
        deliverables: ['Creative Brief', 'Brand Information Hierarchy', 'Content Matrix'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Miro'],
        duration: 'Week 1-2',
        status: 'completed'
      },
      {
        id: 'razen-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Identity & Editorial Layout',
        titleEn: 'Identity & Editorial Layout',
        subtitle: 'Typography, Grid System & Style Guide',
        description: 'Synthesized corporate service copy, value proposition drafts, and narrative validation with Claude (Anthropic), followed by precision vector geometry, high-contrast technology palettes, and multi-page master templates.',
        descriptionEn: 'Synthesized corporate service copy, value proposition drafts, and narrative validation with Claude (Anthropic), followed by precision vector geometry, high-contrast technology palettes, and multi-page master templates.',
        deliverables: ['Vector Identity System', 'Color Palette & Typography Kit', 'Master Layout Spreads'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'InDesign', 'Photoshop'],
        duration: 'Week 3-4',
        status: 'completed'
      },
      {
        id: 'razen-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Interactive Multi-Page Deck & QR Systems',
        titleEn: 'Interactive Multi-Page Deck & QR Systems',
        subtitle: 'Service Pages, Startup Showcases & Digital Navigation',
        description: 'Composed multi-page spreads covering startup incubation, government digital products, and video production services with embedded interactive PDF buttons and QR codes.',
        descriptionEn: 'Composed multi-page spreads covering startup incubation, government digital products, and video production services with embedded interactive PDF buttons and QR codes.',
        deliverables: ['Interactive Multi-Page PDF', 'Linked QR Code System', 'Catalog Spreads'],
        toolsUsed: ['Adobe InDesign', 'Photoshop', 'Interactive PDF'],
        duration: 'Week 5-6',
        status: 'completed'
      },
      {
        id: 'razen-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Quality Assurance & Pitch Readiness',
        titleEn: 'Quality Assurance & Pitch Readiness',
        subtitle: 'Link Audits, Color Gamut & Client Distribution',
        description: 'Conducted rigorous digital preflight QA, verified interactive links and QR redirects across devices, and packaged ready-to-present pitch collateral.',
        descriptionEn: 'Conducted rigorous digital preflight QA, verified interactive links and QR redirects across devices, and packaged ready-to-present pitch collateral.',
        deliverables: ['Final Interactive Presentation PDF', 'Final Files & Assets Handed Over to Client', 'High-Res Print Backup'],
        toolsUsed: ['Adobe Acrobat Pro', 'Behance'],
        duration: 'Final Delivery',
        status: 'completed'
      }
    ]
  },
  {
    id: 'kopi-garasi-packaging',
    code: '214',
    title: 'Kopi Garasi — Coffee Packaging & Brand Identity',
    titleEn: 'Kopi Garasi — Coffee Packaging & Brand Identity',
    category: 'packaging',
    categoryLabel: 'Packaging & Product Design',
    categoryLabelEn: 'Packaging & Product Design',
    description: 'Desain kemasan lengkap dan identitas merek untuk Kopi Garasi, produk kopi robusta dari Warung Garasi Cozy Space. Memadukan tema motor antik dengan estetika kopi artisanal yang hangat — mencakup kemasan pouch ber-die-cut, logo lencana melingkar, integrasi kode QR, dan branding cup terkoordinasi untuk ritel dan kafe.',
    descriptionEn: 'Designed complete packaging and brand identity for Kopi Garasi, a robusta coffee product by Warung Garasi Cozy Space. The design blends a bold vintage motorcycle theme with a warm, artisanal coffee aesthetic — featuring die-cut pouch packaging, circular brand badge logo, QR code integration, and coordinated cup branding for retail and cafe presentation.',
    tools: ['Adobe Illustrator', 'Photoshop', 'DSLR Camera / Studio Lighting', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    tags: ['#PACKAGING DESIGN', '#BRAND IDENTITY', '#VINTAGE ILLUSTRATION'],
    clientOrContext: 'Warung Garasi Cozy Space',
    year: '2024 - 2025',
    featured: false,
    aspectRatio: '1:1',
    accentColor: '#d97706',
    gradientBg: 'from-amber-950 via-stone-900 to-yellow-950',
    imageUrl: kopiGarasiPreview2,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    behanceUrl: 'https://www.behance.net/gallery/226144045/Design-Packaging_Kopi-Garasi',
    gallery: [
      {
        id: 'kopi-preview-1',
        title: 'Packaging Design & Vintage Illustration',
        titleEn: 'Packaging Design & Vintage Illustration',
        isPlaceholder: false,
        imageUrl: kopiGarasiPreview1
      },
      {
        id: 'kopi-preview-2',
        title: 'Product Photography & Retail Presentation',
        titleEn: 'Product Photography & Retail Presentation',
        isPlaceholder: false,
        imageUrl: kopiGarasiPreview2
      },
      {
        id: 'kopi-preview-3',
        title: 'Brand Application on Coffee Cup',
        titleEn: 'Brand Application on Coffee Cup',
        isPlaceholder: false,
        imageUrl: kopiGarasiPreview3
      },
      {
        id: 'kopi-preview-4',
        title: 'Retail Pouch & Badge Overview',
        titleEn: 'Retail Pouch & Badge Overview',
        isPlaceholder: false,
        imageUrl: kopiGarasiCover
      }
    ],
    deliverables: [
      'Pouch Packaging Design (Front & Back)',
      'Circular Brand Logo & Badge System',
      'Vintage Illustration & Typography',
      'QR Code & Product Info Layout',
      'Coffee Cup Branding Application'
    ],
    deliverablesEn: [
      'Pouch Packaging Design (Front & Back)',
      'Circular Brand Logo & Badge System',
      'Vintage Illustration & Typography',
      'QR Code & Product Info Layout',
      'Coffee Cup Branding Application'
    ],
    metrics: 'Retail-Ready Brand Launch',
    metricsEn: 'Retail-Ready Brand Launch',
    roadmap: [
      {
        id: 'step-planning',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Dieline Blueprint & Structural Analysis',
        titleEn: 'Dieline Blueprint & Structural Analysis',
        subtitle: 'Substrates, Tolerances & Compliance',
        description: 'Brainstormed vintage motorcycle coffee branding concepts, dieline substrate specifications, and regulatory standards using Google AI Studio and Gemini for rapid research, reference collection, and creative brief outlining.',
        descriptionEn: 'Brainstormed vintage motorcycle coffee branding concepts, dieline substrate specifications, and regulatory standards using Google AI Studio and Gemini for rapid research, reference collection, and creative brief outlining.',
        deliverables: ['1:1 Vector Dieline Template', 'Substrate & Coating Specs', 'Regulatory Placement Matrix'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Adobe Illustrator', 'CAD Tools', 'Notion'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'step-design',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Graphic Artwork & Hierarchy Study',
        titleEn: 'Graphic Artwork & Hierarchy Study',
        subtitle: 'Typography, Custom Vectors & Spot Finishes',
        description: 'Refined product narrative copy, tasting notes, and package romance copy with Claude (Anthropic) for concept validation, followed by hand-crafting vector vintage emblems, badge typography, and spot UV finishing layers.',
        descriptionEn: 'Refined product narrative copy, tasting notes, and package romance copy with Claude (Anthropic) for concept validation, followed by hand-crafting vector vintage emblems, badge typography, and spot UV finishing layers.',
        deliverables: ['Surface Graphic Artwork', 'Pantone Spot Color Guide', 'Spot UV & Foil Separation Layers'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
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
        status: 'completed'
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
        status: 'completed'
      }
    ]
  },
  {
    id: 'coffee-shop-social-media',
    code: '305',
    title: 'Coffee Shop Social Media Promo Design',
    titleEn: 'Coffee Shop Social Media Promo Design',
    category: 'branding',
    categoryLabel: 'Graphic & Brand',
    categoryLabelEn: 'Graphic & Brand',
    tagBadge: 'Social Media Design | Food & Beverage',
    description: 'Designed a series of Instagram promotional content for a coffee shop brand, featuring product highlights such as Coffee Frappe, Coffee Special, Coffee Blend, and seasonal promos (discounts, buy-1-get-1 offers). The set combines rich brown & warm color palettes, bold typography, and appetizing product photography with dynamic elements (steam, splash, coffee beans) to create scroll-stopping social media content that drives orders.',
    descriptionEn: 'Designed a series of Instagram promotional content for a coffee shop brand, featuring product highlights such as Coffee Frappe, Coffee Special, Coffee Blend, and seasonal promos (discounts, buy-1-get-1 offers). The set combines rich brown & warm color palettes, bold typography, and appetizing product photography with dynamic elements (steam, splash, coffee beans) to create scroll-stopping social media content that drives orders.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Coffee Shop Brand',
    year: '2024 - 2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#d97706',
    gradientBg: 'from-amber-950 via-stone-900 to-amber-900',
    imageUrl: coffee01,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/225921551/Coffe-Shop-Instagram-Post',
    previewGridType: 'coffee-grid',
    tags: ['#Graphic Design', '#Social Media', '#Food & Beverage', '#Instagram Content'],
    gallery: [
      {
        id: 'coffee-preview-1',
        title: 'Coffee Frappe — Hero Product Highlight & Promotional Spread',
        titleEn: 'Coffee Frappe — Hero Product Highlight & Promotional Spread',
        isPlaceholder: false,
        imageUrl: coffee01,
        aspectRatio: '16:9'
      },
      {
        id: 'coffee-preview-2',
        title: 'Coffee Shop Promotional Campaign & Seasonal Menu Spread',
        titleEn: 'Coffee Shop Promotional Campaign & Seasonal Menu Spread',
        isPlaceholder: false,
        imageUrl: coffee02,
        aspectRatio: '16:9'
      },
      {
        id: 'coffee-preview-3',
        title: 'Coffee Special — Signature Roasted Beans & Rich Aroma',
        titleEn: 'Coffee Special — Signature Roasted Beans & Rich Aroma',
        isPlaceholder: false,
        imageUrl: coffee03,
        aspectRatio: '1:1'
      },
      {
        id: 'coffee-preview-4',
        title: 'Special Promo — Limited Time Discount & Price Offer',
        titleEn: 'Special Promo — Limited Time Discount & Price Offer',
        isPlaceholder: false,
        imageUrl: coffee04,
        aspectRatio: '1:1'
      },
      {
        id: 'coffee-preview-5',
        title: 'Coffee Blend — Roasted Bean Selection & Dynamic Splash Art',
        titleEn: 'Coffee Blend — Roasted Bean Selection & Dynamic Splash Art',
        isPlaceholder: false,
        imageUrl: coffee05,
        aspectRatio: '1:1'
      },
      {
        id: 'coffee-preview-6',
        title: 'Buy 1 Get 1 Promo — Afternoon Refreshment Social Campaign',
        titleEn: 'Buy 1 Get 1 Promo — Afternoon Refreshment Social Campaign',
        isPlaceholder: false,
        imageUrl: coffee06,
        aspectRatio: '1:1'
      },
      {
        id: 'coffee-preview-7',
        title: 'Artisan Espresso & Beverage Feature Post',
        titleEn: 'Artisan Espresso & Beverage Feature Post',
        isPlaceholder: false,
        imageUrl: coffee07,
        aspectRatio: '1:1'
      },
      {
        id: 'coffee-preview-8',
        title: 'Order Now — High-Conversion Call-to-Action Post',
        titleEn: 'Order Now — High-Conversion Call-to-Action Post',
        isPlaceholder: false,
        imageUrl: coffee08,
        aspectRatio: '1:1'
      }
    ],
    deliverables: [
      'Rangkaian Desain Konten Promosi Media Sosial (Instagram Feed Suite)',
      'Visual Product Highlight: Coffee Frappe, Coffee Special, & Coffee Blend',
      'Materi Kampanye Promosi Musiman: Diskon Spesial & Penawaran Buy 1 Get 1',
      'Palet Warna Hangat & Rich Brown dengan Tipografi Bold Eye-Catching',
      'Integrasi Elemen Dinamis (Steam, Splash, & Biji Kopi) untuk Konversi Pemesanan'
    ],
    deliverablesEn: [
      'Instagram Feed Promotional Content Series (8 Key Assets)',
      'Hero Product Highlights: Coffee Frappe, Coffee Special, & Coffee Blend',
      'Seasonal Promotional Campaign: Special Discounts & Buy-1-Get-1 Offers',
      'Rich Warm Brown Palette & High-Contrast Bold Typographic Hierarchy',
      'Dynamic Beverage Elements (Steam, Splash, & Coffee Beans) for High Engagement'
    ],
    metrics: 'Scroll-Stopping Social Media Promo Kit',
    metricsEn: 'Scroll-Stopping Social Media Promo Kit',
    roadmap: [
      {
        id: 'coffee-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Brand Brief & Beverage Campaign Strategy',
        titleEn: 'Brand Brief & Beverage Campaign Strategy',
        subtitle: 'Audience Persona, F&B Trends & Beverage Highlight Selection',
        description: 'Brainstormed campaign themes, beverage trend insights, and visual references with Google AI Studio and Gemini for rapid ideation and creative brief structuring, focusing on coffee culture demographics, appetite appeal, and promotional messaging.',
        descriptionEn: 'Brainstormed campaign themes, beverage trend insights, and visual references with Google AI Studio and Gemini for rapid ideation and creative brief structuring, focusing on coffee culture demographics, appetite appeal, and promotional messaging.',
        deliverables: ['Campaign Strategy Brief', 'Menu Highlights Selection', 'Social Content Pillars'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Canva'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'coffee-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Rich Warm Palette & Dynamic Visual Direction',
        titleEn: 'Rich Warm Palette & Dynamic Visual Direction',
        subtitle: 'Coffee Brown Tones, Bold Type Hierarchy & Dynamic Splash Elements',
        description: 'Developed promotional copywriting drafts, discount hooks, and narrative validation using Claude (Anthropic), followed by engineering a rich warm color system featuring espresso browns, caramel highlights, bold typography, and appetizing dynamic elements.',
        descriptionEn: 'Developed promotional copywriting drafts, discount hooks, and narrative validation using Claude (Anthropic), followed by engineering a rich warm color system featuring espresso browns, caramel highlights, bold typography, and appetizing dynamic elements.',
        deliverables: ['Color & Typography System', 'Dynamic Element Assets Kit', 'Social Badge Accents'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Photoshop', 'Adobe Illustrator'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'coffee-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'High-Fidelity Social Asset Crafting & Layout',
        titleEn: 'High-Fidelity Social Asset Crafting & Layout',
        subtitle: 'Product Highlights, Promo Discounts & Buy-1-Get-1 Callouts',
        description: 'Composed 8 cohesive promotional artworks for Instagram feeds, blending appetizing product imagery with prominent discount tags, call-to-action badges, and order links.',
        descriptionEn: 'Composed 8 cohesive promotional artworks for Instagram feeds, blending appetizing product imagery with prominent discount tags, call-to-action badges, and order links.',
        deliverables: ['8-Post Promotional Asset Suite', 'Product Highlight Posts', 'Promo & Discount Banners'],
        toolsUsed: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'coffee-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'High-DPI Mobile Mastering & Output Archiving',
        titleEn: 'High-DPI Mobile Mastering & Output Archiving',
        subtitle: 'Lossless WebP Mastering & Ready-to-Publish Asset Packaging',
        description: 'Exported color-accurate, high-DPI assets optimized for Instagram feed compression, verified visual legibility across mobile viewports, and packaged final files for marketing team deployment.',
        descriptionEn: 'Exported color-accurate, high-DPI assets optimized for Instagram feed compression, verified visual legibility across mobile viewports, and packaged final files for marketing team deployment.',
        deliverables: ['Social-Ready Mobile Graphics Kit', 'High-DPI WebP Asset Archive', 'Campaign Source Files'],
        toolsUsed: ['Adobe Photoshop', 'Canva'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'kayla-hotel-seafood-promo',
    code: '318',
    title: 'Kayla Hotel Yogyakarta — Seafood Weekend Promo Design',
    titleEn: 'Kayla Hotel Yogyakarta — Seafood Weekend Promo Design',
    category: 'branding',
    categoryLabel: 'Graphic & Brand',
    categoryLabelEn: 'Graphic & Brand',
    tagBadge: 'F&B Social Media | Campaign Design',
    description: 'Designed a series of social media promotional content for Kayla Hotel Yogyakarta\'s "Seafood Weekend" campaign, featuring fresh seafood menu highlights, pricing, and reservation information. The set combines bold, appetizing food photography with vibrant color themes (dark & moody, and deep purple/orange) to create eye-catching Instagram posts that drive engagement and reservations.',
    descriptionEn: 'Designed a series of social media promotional content for Kayla Hotel Yogyakarta\'s "Seafood Weekend" campaign, featuring fresh seafood menu highlights, pricing, and reservation information. The set combines bold, appetizing food photography with vibrant color themes (dark & moody, and deep purple/orange) to create eye-catching Instagram posts that drive engagement and reservations.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Kayla Hotel Yogyakarta',
    year: '2024',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#a855f7',
    gradientBg: 'from-purple-950 via-slate-900 to-amber-950',
    imageUrl: foodGrid1,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/225592505/Food-Instagram-Post',
    previewGridType: 'featured-duo',
    gallery: [
      {
        id: 'kayla-preview-1',
        title: 'Kayla Hotel Yogyakarta — Seafood Weekend Social Media Presentation Spread',
        titleEn: 'Kayla Hotel Yogyakarta — Seafood Weekend Social Media Presentation Spread',
        isPlaceholder: false,
        imageUrl: foodGrid1,
        aspectRatio: '16:9'
      },
      {
        id: 'kayla-preview-2',
        title: 'Fresh Seafood Highlights & Appetizing Food Photography Post (Dark & Moody Theme)',
        titleEn: 'Fresh Seafood Highlights & Appetizing Food Photography Post (Dark & Moody Theme)',
        isPlaceholder: false,
        imageUrl: foodGrid2,
        aspectRatio: '1:1'
      },
      {
        id: 'kayla-preview-3',
        title: 'Seafood Weekend Promo & Reservation Call-to-Action Post (Purple Theme)',
        titleEn: 'Seafood Weekend Promo & Reservation Call-to-Action Post (Purple Theme)',
        isPlaceholder: false,
        imageUrl: foodGrid3,
        aspectRatio: '1:1'
      }
    ],
    deliverables: [
      'Rangkaian Desain Konten Promosi Media Sosial (Instagram Feed)',
      'Food Photography Editing & Color Grading (Dark & Moody vs Deep Purple)',
      'Layout Informasi Menu Spesial Seafood, Pricing, & Kontak Reservasi',
      'Tipografi Bold Eye-Catching & Call-to-Action Konversi Penjualan Hotel',
      'Aset Grafis Digital Siap Publikasi untuk Kampanye Promosi F&B'
    ],
    deliverablesEn: [
      'Instagram Feed Promotional Campaign Content Series',
      'Food Photography Editing & Color Grading (Dark & Moody vs Deep Purple)',
      'Special Seafood Menu Highlights, Pricing & Reservation Details',
      'Bold Eye-Catching Typography & High-Conversion Promotional Call-to-Action',
      'Ready-to-Publish Digital Graphic Assets for Hotel F&B Marketing'
    ],
    metrics: 'High-Engagement F&B Campaign Design',
    metricsEn: 'High-Engagement F&B Campaign Design',
    tags: ['#Graphic Design', '#Social Media', '#Food & Beverage', '#Instagram Content'],
    roadmap: [
      {
        id: 'kayla-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Campaign Brief & Menu Strategy',
        titleEn: 'Campaign Brief & Menu Strategy',
        subtitle: 'Hotel Dining Audience Mapping, Weekend Offerings & Messaging Angle',
        description: 'Brainstormed luxury hotel dining angles, seafood campaign themes, and visual references using Google AI Studio and Gemini for rapid ideation and creative brief structuring, mapping guest demographics in Yogyakarta.',
        descriptionEn: 'Brainstormed luxury hotel dining angles, seafood campaign themes, and visual references using Google AI Studio and Gemini for rapid ideation and creative brief structuring, mapping guest demographics in Yogyakarta.',
        deliverables: ['Campaign Strategy Brief', 'Menu Highlights Selection', 'Key Messaging & Value Proposition'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Google Docs'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'kayla-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Direction & Color Grading Dual System',
        titleEn: 'Visual Direction & Color Grading Dual System',
        subtitle: 'Dark & Moody Gourmet Aesthetic vs Vibrant Deep Purple & Warm Orange Accents',
        description: 'Synthesized culinary promotional copy, reservation hooks, and narrative framing with Claude (Anthropic) for concept validation, followed by developing contrasting visual directions (dark & moody gourmet vs vibrant purple/orange).',
        descriptionEn: 'Synthesized culinary promotional copy, reservation hooks, and narrative framing with Claude (Anthropic) for concept validation, followed by developing contrasting visual directions (dark & moody gourmet vs vibrant purple/orange).',
        deliverables: ['Dual Visual Theme System', 'Food Photography Color Grades', 'Typography & Badge Hierarchy'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Photoshop', 'Adobe Illustrator'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'kayla-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Post Composition & Conversion Layout Engineering',
        titleEn: 'Post Composition & Conversion Layout Engineering',
        subtitle: 'Focal Photography Alignment, Price Point Callouts & Reservation Channels',
        description: 'Engineered post compositions balancing mouthwatering hero food imagery with essential promotional details: pricing, menu items, event schedule, and clear WhatsApp/call reservation contact tags.',
        descriptionEn: 'Engineered post compositions balancing mouthwatering hero food imagery with essential promotional details: pricing, menu items, event schedule, and clear WhatsApp/call reservation contact tags.',
        deliverables: ['Square Feed Post Artworks (1:1)', 'Promotional Headline Graphics', 'Reservation CTA Callouts'],
        toolsUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'kayla-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'High-DPI Mobile Export & Case Study Presentation',
        titleEn: 'High-DPI Mobile Export & Case Study Presentation',
        subtitle: 'Lossless WebP/PNG Mastering & Client Asset Handover',
        description: 'Exported color-accurate, high-DPI graphics optimized for Instagram feed clarity without compression artifacts, and completed the final handover of production assets and promotional graphics to the client.',
        descriptionEn: 'Exported color-accurate, high-DPI graphics optimized for Instagram feed clarity without compression artifacts, and completed the final handover of production assets and promotional graphics to the client.',
        deliverables: ['Social-Ready Mobile Graphics Kit', 'Final Files & Assets Handed Over to Client', 'Design Asset Archive'],
        toolsUsed: ['Adobe Photoshop', 'Behance'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'nurmaone-ai-event-platform',
    code: '856',
    title: 'NurmaOne — Where Every Edition Leaves a Legacy',
    titleEn: 'NurmaOne — Where Every Edition Leaves a Legacy',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web Development',
    categoryLabelEn: 'UI/UX & Web Development',
    tagBadge: 'WEB APP | AI EVENT PLATFORM',
    badge: 'HACKATHON ENTRY',
    description: 'Every event leaves a trail: plans, tasks, deadlines, moments, and lessons. NurmaOne keeps the moments. Nurma Command Center keeps everything that makes them happen.\n\nCommittee members see what to do next and who is responsible. Committee chairs, including section coordinators, see every section, plan the work, and watch progress and risks in one place.\n\nNurmaOne was built as my entry for the Google Cloud AI Builder Cup 2026, a JAPAC-wide hackathon organized by Hack2skill and sponsored by Google Cloud, where participants build a working prototype that solves a real-world problem.',
    descriptionEn: 'Every event leaves a trail: plans, tasks, deadlines, moments, and lessons. NurmaOne keeps the moments. Nurma Command Center keeps everything that makes them happen.\n\nCommittee members see what to do next and who is responsible. Committee chairs, including section coordinators, see every section, plan the work, and watch progress and risks in one place.\n\nNurmaOne was built as my entry for the Google Cloud AI Builder Cup 2026, a JAPAC-wide hackathon organized by Hack2skill and sponsored by Google Cloud, where participants build a working prototype that solves a real-world problem.',
    overviewDescription: 'Every event leaves a trail: plans, tasks, deadlines, moments, and lessons. NurmaOne keeps the moments. Nurma Command Center keeps everything that makes them happen.\n\nCommittee members see what to do next and who is responsible. Committee chairs, including section coordinators, see every section, plan the work, and watch progress and risks in one place.\n\nNurmaOne was built as my entry for the Google Cloud AI Builder Cup 2026, a JAPAC-wide hackathon organized by Hack2skill and sponsored by Google Cloud, where participants build a working prototype that solves a real-world problem.',
    overviewDescriptionEn: 'Every event leaves a trail: plans, tasks, deadlines, moments, and lessons. NurmaOne keeps the moments. Nurma Command Center keeps everything that makes them happen.\n\nCommittee members see what to do next and who is responsible. Committee chairs, including section coordinators, see every section, plan the work, and watch progress and risks in one place.\n\nNurmaOne was built as my entry for the Google Cloud AI Builder Cup 2026, a JAPAC-wide hackathon organized by Hack2skill and sponsored by Google Cloud, where participants build a working prototype that solves a real-world problem.',
    tools: ['Google AI Studio', 'Gemini', 'Claude (Anthropic)', 'Vibe Coding', 'UI/UX Design', 'Prompt Engineering', 'YouTube'],
    clientOrContext: 'AI Builder Cup 2026',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#10b981',
    gradientBg: 'from-emerald-950 via-slate-900 to-cyan-950',
    imageUrl: 'https://img.youtube.com/vi/jW_tA4qxcFI/maxresdefault.jpg',
    isPlaceholder: false,
    websiteUrl: 'https://nurmaone.ai.studio/',
    youtubeUrl: 'https://youtu.be/jW_tA4qxcFI',
    hackathonUrl: 'https://aibuildercup.com/',
    searchKeywords: ['Pondok Pesantren Nurul Ummah', 'Pondok Pesantren Nurul Ummah (Event Committee)'],
    previewGridType: 'single',
    gallery: [
      {
        id: 'nurmaone-preview-1',
        title: 'NurmaOne — Where Every Edition Leaves a Legacy (Event Archive & Nurma Command Center)',
        titleEn: 'NurmaOne — Where Every Edition Leaves a Legacy (Event Archive & Nurma Command Center)',
        isPlaceholder: false,
        imageUrl: 'https://img.youtube.com/vi/jW_tA4qxcFI/maxresdefault.jpg',
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Event Archive by Year (2023-2026)',
      'Timeline & Gallery Pages',
      'Nurma Command Center (AI Event Planner)',
      'Role-Based Task Lists for Committee Members and Chair',
      'Live Website and YouTube Demo Video'
    ],
    deliverablesEn: [
      'Event Archive by Year (2023-2026)',
      'Timeline & Gallery Pages',
      'Nurma Command Center (AI Event Planner)',
      'Role-Based Task Lists for Committee Members and Chair',
      'Live Website and YouTube Demo Video'
    ],
    metrics: 'Event Archive & AI-Assisted Event Planning',
    metricsEn: 'Event Archive & AI-Assisted Event Planning',
    tags: ['#NurmaOne', '#AI Event Planning', '#Event Management', '#Event Archive', '#Command Center', '#Vibe Coding', '#AI Web App', '#Pesantren', '#AI Builder Cup', '#Hackathon', '#Google Cloud', '#Pondok Pesantren Nurul Ummah'],
    roadmap: [
      {
        id: 'nurmaone-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Product Vision & PRD',
        titleEn: 'Product Vision & PRD',
        subtitle: 'Product Vision, User Roles & Feature Scope',
        description: 'Defined the product vision, user roles (committee member and Committee Chair), and feature scope, then drafted a Product Requirements Document.',
        descriptionEn: 'Defined the product vision, user roles (committee member and Committee Chair), and feature scope, then drafted a Product Requirements Document.',
        deliverables: ['Product Requirements Document', 'User Roles', 'Feature Scope'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'nurmaone-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'UI/UX & Information Architecture',
        titleEn: 'UI/UX & Information Architecture',
        subtitle: 'App Structure, Event Archive Layout & Command Center Interface',
        description: 'Designed the app structure, the Event Archive layout with Timeline and Gallery pages, and the Command Center interface.',
        descriptionEn: 'Designed the app structure, the Event Archive layout with Timeline and Gallery pages, and the Command Center interface.',
        deliverables: ['Information Architecture', 'Archive & Gallery Layouts', 'Command Center Interface'],
        toolsUsed: ['Google AI Studio', 'Gemini'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'nurmaone-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Vibe Coding & AI Integration',
        titleEn: 'Vibe Coding & AI Integration',
        subtitle: 'Web App Development & AI Event Planner Integration',
        description: 'Built the web app with vibe coding in Google AI Studio and integrated the AI assistant that generates the event concept, plan, structure, budget, rundown, and checklist.',
        descriptionEn: 'Built the web app with vibe coding in Google AI Studio and integrated the AI assistant that generates the event concept, plan, structure, budget, rundown, and checklist.',
        deliverables: ['Event Archive', 'Nurma Command Center', 'Task Lists by Role'],
        toolsUsed: ['Google AI Studio', 'Gemini'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'nurmaone-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Launch & Demo',
        titleEn: 'Launch & Demo',
        subtitle: 'Google AI Studio Deployment & YouTube Demo Walkthrough',
        description: 'Published the app on Google AI Studio and produced a YouTube demo video walking through the main features.',
        descriptionEn: 'Published the app on Google AI Studio and produced a YouTube demo video walking through the main features.',
        deliverables: ['Live Website', 'YouTube Demo Video'],
        toolsUsed: ['Google AI Studio', 'YouTube'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'fasting-motion-video',
    code: '512',
    title: 'FASTING – An Ancient Secret for a Modern Life',
    titleEn: 'FASTING – An Ancient Secret for a Modern Life',
    category: 'motion',
    categoryLabel: 'Motion Graphic & Video Editing',
    categoryLabelEn: 'Motion Graphic & Video Editing',
    tagBadge: 'Motion Graphic | YouTube Video Project',
    description: 'A motion graphic YouTube video exploring the science, history, and myths behind fasting — from ancient tradition to modern intermittent fasting trends. Covers the real health benefits, common misconceptions, and what actually happens inside the body during fasting.',
    descriptionEn: 'A motion graphic YouTube video exploring the science, history, and myths behind fasting — from ancient tradition to modern intermittent fasting trends. Covers the real health benefits, common misconceptions, and what actually happens inside the body during fasting.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Sunnah Youtube Channel',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#ef4444',
    gradientBg: 'from-red-950 via-slate-900 to-amber-950',
    imageUrl: fastingCover,
    isPlaceholder: false,
    youtubeUrl: 'https://youtu.be/N6hkEURMHag',
    previewGridType: 'single',
    gallery: [
      {
        id: 'fasting-preview-1',
        title: 'FASTING – Motion Graphic Video Preview & Visual System',
        titleEn: 'FASTING – Motion Graphic Video Preview & Visual System',
        isPlaceholder: false,
        imageUrl: fastingCover,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Full Motion Graphic YouTube Video',
      'Animated Typography & Callouts',
      'Custom Visual Identity for Video',
      'Medical & Biological Vector Illustrations',
      'High-CTR YouTube Thumbnail Package'
    ],
    deliverablesEn: [
      'Full Motion Graphic YouTube Video',
      'Animated Typography & Callouts',
      'Custom Visual Identity for Video',
      'Medical & Biological Vector Illustrations',
      'High-CTR YouTube Thumbnail Package'
    ],
    metrics: 'High Audience Retention & Engagement',
    metricsEn: 'High Audience Retention & Engagement',
    tags: ['Motion Graphic', 'YouTube Video Project', 'Explainer Video', 'After Effects', 'Health & Science'],
    roadmap: [
      {
        id: 'fasting-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Pre-Production & Script Research',
        titleEn: 'Pre-Production & Script Research',
        subtitle: 'Script Breakdown, Medical & Scientific Literature Research',
        description: 'Conducted rigorous research on metabolic literature, autophagy science, and fasting physiology using Google AI Studio and Gemini for reference synthesis, creative brief drafting, and storyboard beat ideation.',
        descriptionEn: 'Conducted rigorous research on metabolic literature, autophagy science, and fasting physiology using Google AI Studio and Gemini for reference synthesis, creative brief drafting, and storyboard beat ideation.',
        deliverables: ['Narrative Script', 'Storyboard Beats', 'VO Cue Sheet'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Milanote'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'fasting-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Style, Titling & Motion Assets',
        titleEn: 'Visual Style, Titling & Motion Assets',
        subtitle: 'Vector Illustration, Kinetic Typography & Color Grading Board',
        description: 'Structured scientific explainer script phrasing, narration pacing, and educational clarity with Claude (Anthropic) for concept validation, followed by engineering vector biological assets and kinetic typography systems.',
        descriptionEn: 'Structured scientific explainer script phrasing, narration pacing, and educational clarity with Claude (Anthropic) for concept validation, followed by engineering vector biological assets and kinetic typography systems.',
        deliverables: ['Custom Vector Graphics', 'Animated Title System', 'Visual Identity Assets'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'fasting-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Rough Cut, Voice Over Sync & Motion Animation',
        titleEn: 'Rough Cut, Voice Over Sync & Motion Animation',
        subtitle: 'Smooth Keyframe Curves, Character/Organ Rigging & Dynamic Callouts',
        description: 'Assembled primary voice-over timeline, keyframed smooth easing curves in After Effects, animated dynamic medical callouts, and integrated ambient sound design.',
        descriptionEn: 'Assembled primary voice-over timeline, keyframed smooth easing curves in After Effects, animated dynamic medical callouts, and integrated ambient sound design.',
        deliverables: ['Full Motion Sequence', 'Audio & VO Synchronization', 'Kinetic Callout Graphics'],
        toolsUsed: ['Adobe After Effects', 'Premiere Pro'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'fasting-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Color Grade, Final Render & Upload',
        titleEn: 'Color Grade, Final Render & Upload',
        subtitle: 'Audio Mastering, UHD Master Render & YouTube SEO Packaging',
        description: 'Performed broadcast color correction and audio mastering, exported crisp high-definition deliverables, and created high-CTR custom thumbnails with optimized SEO metadata.',
        descriptionEn: 'Performed broadcast color correction and audio mastering, exported crisp high-definition deliverables, and created high-CTR custom thumbnails with optimized SEO metadata.',
        deliverables: ['YouTube Master Video', 'Thumbnail Package', 'Timestamps & Video Chapters'],
        toolsUsed: ['Premiere Pro', 'Media Encoder', 'YouTube Studio'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'burn-belly-fat-motion-video',
    code: '520',
    title: 'How to Burn Belly Fat FAST According to Islam (Backed by Sunnah & Science!)',
    titleEn: 'How to Burn Belly Fat FAST According to Islam (Backed by Sunnah & Science!)',
    category: 'motion',
    categoryLabel: 'Motion Graphic & Video Editing',
    categoryLabelEn: 'Motion Graphic & Video Editing',
    tagBadge: 'Motion Graphic | YouTube Video Project',
    description: 'A motion graphic YouTube video exploring actionable, holistic approaches to burning visceral belly fat fast by uniting prophetic Sunnah guidance with evidence-based metabolic science, circadian rhythms, and nutritional biology.',
    descriptionEn: 'A motion graphic YouTube video exploring actionable, holistic approaches to burning visceral belly fat fast by uniting prophetic Sunnah guidance with evidence-based metabolic science, circadian rhythms, and nutritional biology.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Sunnah Youtube Channel',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#f59e0b',
    gradientBg: 'from-amber-950 via-slate-900 to-red-950',
    imageUrl: bellyFatCover,
    isPlaceholder: false,
    youtubeUrl: 'https://youtu.be/D0qaXne1fKo',
    previewGridType: 'single',
    gallery: [
      {
        id: 'belly-fat-preview-1',
        title: 'How to Burn Belly Fat FAST – Motion Graphic Video Preview & Visual System',
        titleEn: 'How to Burn Belly Fat FAST – Motion Graphic Video Preview & Visual System',
        isPlaceholder: false,
        imageUrl: bellyFatCover,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Full Motion Graphic YouTube Video',
      'Animated Typography & Callouts',
      'Metabolic & Biological Vector Illustrations',
      'Dietary & Sunnah Habit Visual Guides',
      'High-CTR YouTube Thumbnail Package'
    ],
    deliverablesEn: [
      'Full Motion Graphic YouTube Video',
      'Animated Typography & Callouts',
      'Metabolic & Biological Vector Illustrations',
      'Dietary & Sunnah Habit Visual Guides',
      'High-CTR YouTube Thumbnail Package'
    ],
    metrics: 'High Audience Retention & Engagement',
    metricsEn: 'High Audience Retention & Engagement',
    tags: ['Motion Graphic', 'YouTube Video Project', 'Explainer Video', 'Sunnah & Science', 'After Effects', 'Health & Fitness'],
    roadmap: [
      {
        id: 'belly-fat-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Scripting, Literature & Hadith Research',
        titleEn: 'Scripting, Literature & Hadith Research',
        subtitle: 'Metabolic Endocrinology, Sunnah Eating Etiquette & Storyboarding',
        description: 'Brainstormed health concepts and conducted literature research cross-referencing prophetic fasting traditions with peer-reviewed fat oxidation studies using Google AI Studio and Gemini for rapid ideation, reference synthesis, and creative brief drafting.',
        descriptionEn: 'Brainstormed health concepts and conducted literature research cross-referencing prophetic fasting traditions with peer-reviewed fat oxidation studies using Google AI Studio and Gemini for rapid ideation, reference synthesis, and creative brief drafting.',
        deliverables: ['Research Synthesis & Script', 'Narrative Storyboard', 'Voiceover Timing Guide'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Milanote'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'belly-fat-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Assets & Infographic Illustrations',
        titleEn: 'Visual Assets & Infographic Illustrations',
        subtitle: 'Visceral Adipose Tissue Diagrams, Food Portions & Kinetic Lower Thirds',
        description: 'Refined explanatory narrative copy, dietary guidelines phrasing, and concept clarity with Claude (Anthropic) for validation, followed by designing anatomical vector diagrams, insulin curves, and kinetic lower thirds.',
        descriptionEn: 'Refined explanatory narrative copy, dietary guidelines phrasing, and concept clarity with Claude (Anthropic) for validation, followed by designing anatomical vector diagrams, insulin curves, and kinetic lower thirds.',
        deliverables: ['Vector Infographic Library', 'Custom Typography Presets', 'Thumbnails & Style Boards'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'belly-fat-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Kinetic Motion & Audio-Visual Synchronization',
        titleEn: 'Kinetic Motion & Audio-Visual Synchronization',
        subtitle: 'Dynamic Biological Motion Sequences & Voiceover Timing',
        description: 'Crafted smooth graph editor easing curves in After Effects, rigged diagrammatic transitions, animated text callouts, and layered contextual sound effects for maximum viewer retention.',
        descriptionEn: 'Crafted smooth graph editor easing curves in After Effects, rigged diagrammatic transitions, animated text callouts, and layered contextual sound effects for maximum viewer retention.',
        deliverables: ['Full Motion Video Timeline', 'Audio Mastering & SFX Mix', 'Kinetic Explainer Sequences'],
        toolsUsed: ['Adobe After Effects', 'Premiere Pro'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'belly-fat-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Master Rendering, Thumbnail Packaging & Delivery',
        titleEn: 'Master Rendering, Thumbnail Packaging & Delivery',
        subtitle: 'High-Bitrate Master Render, High-Contrast YouTube Thumbnail & Metadata',
        description: 'Executed broadcast color correction, rendered crisp high-bitrate output, designed click-optimized thumbnails with high contrast, and structured comprehensive chapter timestamps.',
        descriptionEn: 'Executed broadcast color correction, rendered crisp high-bitrate output, designed click-optimized thumbnails with high contrast, and structured comprehensive chapter timestamps.',
        deliverables: ['YouTube Master Video', 'A/B Test Thumbnail Suite', 'SEO Video Description & Chapters'],
        toolsUsed: ['Premiere Pro', 'Media Encoder', 'YouTube Studio'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'kalimandau-web-app-promo',
    code: '628',
    title: 'Kalimandau — Public Service Web App Design & Motion Promo',
    titleEn: 'Kalimandau — Public Service Web App Design & Motion Promo',
    category: 'motion',
    categoryLabel: 'Motion Graphics & Video Editing',
    categoryLabelEn: 'Motion Graphics & Video Editing',
    tagBadge: 'Motion Graphic | Web App Promo',
    description: 'Motion graphic promo video untuk Kalimandau, sebuah aplikasi web layanan publik yang dikembangkan untuk SISDA BWS Kalimantan V, menampilkan alur fitur seperti pendaftaran permohonan dan pengecekan status permohonan dalam tampilan UI yang modern dan elegan.',
    descriptionEn: 'Motion graphic promo video for Kalimandau, a public service web application developed for SISDA BWS Kalimantan V. The video demonstrates core user journeys including application submission, document tracking, and real-time status inquiry within a modern, refined UI aesthetic.',
    tools: ['After Effects', 'Premiere Pro', 'Illustrator', 'Photoshop', 'Figma', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'SISDA BWS Kalimantan V',
    year: '2024',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#9333ea',
    gradientBg: 'from-purple-950 via-slate-900 to-black',
    imageUrl: kalimandauCover,
    isPlaceholder: false,
    youtubeUrl: 'https://youtu.be/_jW0I10P3ec',
    previewGridType: 'single',
    gallery: [
      {
        id: 'kalimandau-preview-1',
        title: 'Kalimandau — Public Service Web App Design & Motion Promo Cover',
        titleEn: 'Kalimandau — Public Service Web App Design & Motion Promo Cover',
        isPlaceholder: false,
        imageUrl: kalimandauCover,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Motion Graphic Web App Promo Video',
      'Interactive UI Screen Flow Animations',
      'Feature Workflow & Application Status Explainer',
      'Kinetic Lower Thirds & Feature Callouts',
      'Social Media & YouTube Broadcast Package'
    ],
    deliverablesEn: [
      'Motion Graphic Web App Promo Video',
      'Interactive UI Screen Flow Animations',
      'Feature Workflow & Application Status Explainer',
      'Kinetic Lower Thirds & Feature Callouts',
      'Social Media & YouTube Broadcast Package'
    ],
    metrics: 'Official SISDA Public Service Motion Promo',
    metricsEn: 'Official SISDA Public Service Motion Promo',
    tags: ['#Motion Graphic', '#YouTube Video Project', '#Web App', '#Government/Public Service'],
    roadmap: [
      {
        id: 'kalimandau-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'App Flow Breakdown & Scripting',
        titleEn: 'App Flow Breakdown & Scripting',
        subtitle: 'Feature Mapping, User Journey & Storyboard Design',
        description: 'Analyzed SISDA BWS Kalimantan V public service guidelines using Google AI Studio and Gemini for flow mapping, user journey structuring, and narrative creative brief drafting.',
        descriptionEn: 'Analyzed SISDA BWS Kalimantan V public service guidelines using Google AI Studio and Gemini for flow mapping, user journey structuring, and narrative creative brief drafting.',
        deliverables: ['Promo Narrative Script', 'UI Feature Storyboard', 'User Flow Blueprint'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Figma', 'Notion'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'kalimandau-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'UI Assets & Brand Identity Framing',
        titleEn: 'UI Assets & Brand Identity Framing',
        subtitle: 'High-Fidelity Mockups, Vector Graphics & Purple-Black Theme',
        description: 'Refined UI explanatory voiceover script, feature benefit callouts, and step-by-step clarity with Claude (Anthropic) for validation, followed by crafting high-fidelity web app screen interfaces and dark purple promotional assets.',
        descriptionEn: 'Refined UI explanatory voiceover script, feature benefit callouts, and step-by-step clarity with Claude (Anthropic) for validation, followed by crafting high-fidelity web app screen interfaces and dark purple promotional assets.',
        deliverables: ['Hi-Fi UI Screens', 'Vector Feature Icons', 'Promotional Style Boards'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop', 'Figma'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'kalimandau-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Kinetic Motion & Screen Compositing',
        titleEn: 'Kinetic Motion & Screen Compositing',
        subtitle: 'UI Interactions, 3D Device Framing & Motion Transitions',
        description: 'Created dynamic screen walkthroughs in After Effects with cursor interactions, smooth camera pans, UI state transitions, and glowing indicator callouts.',
        descriptionEn: 'Created dynamic screen walkthroughs in After Effects with cursor interactions, smooth camera pans, UI state transitions, and glowing indicator callouts.',
        deliverables: ['Animated Screen Compositions', 'Feature Interaction Sequences', 'Kinetic Typography Overlay'],
        toolsUsed: ['Adobe After Effects'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'kalimandau-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Audio Mixing & Final Broadcast Master',
        titleEn: 'Audio Mixing & Final Broadcast Master',
        subtitle: 'Modern Electronic Audio Bed, SFX Mixing & Multi-Format Render',
        description: 'Mastered the promo video with synchronized UI interface click SFX, upbeat tech background audio, and exported high-bitrate masters for official YouTube streaming and social media ads.',
        descriptionEn: 'Mastered the promo video with synchronized UI interface click SFX, upbeat tech background audio, and exported high-bitrate masters for official YouTube streaming and social media ads.',
        deliverables: ['High-Bitrate Promo Master', 'YouTube Ad Cut', 'Custom Video Thumbnail Suite'],
        toolsUsed: ['Premiere Pro', 'Media Encoder'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'travel-agency-social-media',
    code: '715',
    title: 'Travel Agency — Social Media Content Design',
    titleEn: 'Travel Agency — Social Media Content Design',
    category: 'branding',
    categoryLabel: 'Graphic & Brand',
    categoryLabelEn: 'Graphic & Brand',
    tagBadge: 'Social Media Design | Travel & Tour',
    description: 'Desain rangkaian konten promosi media sosial untuk Travel Agency, sebuah layanan rental mobil & paket tour wisata berbasis di Yogyakarta. Rangkaian aset ini mencakup postingan feed Instagram dan grafis promosi yang menonjolkan destinasi wisata unggulan, penawaran paket perjalanan, armada sewa, serta identitas merek — memadukan tipografi yang berani, citra visual perjalanan bernuansa langit cerah, dan palet warna kontras yang dinamis (biru & oranye) untuk mendorong interaksi serta konversi pemesanan.',
    descriptionEn: 'Designed a series of social media promotional content for Travel Agency, a Yogyakarta-based travel rental & tour service. The set includes Instagram feed posts and promotional graphics featuring destination highlights, service offerings, and brand identity — combining bold typography, sky/travel imagery, and vibrant color palettes (blue & orange) to drive engagement and bookings.',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Social Media Design', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Travel Agency (Yogyakarta Travel Rental & Tour)',
    year: '2024 - 2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#f97316',
    gradientBg: 'from-sky-950 via-slate-900 to-orange-950',
    imageUrl: travelGrid6,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/225947091/Travel-Instagram-Post',
    previewGridType: 'social-grid',
    gallery: [
      {
        id: 'travel-preview-main',
        title: 'Travel Agency — Social Media Feed Architecture & Campaign Spread',
        titleEn: 'Travel Agency — Social Media Feed Architecture & Campaign Spread',
        isPlaceholder: false,
        imageUrl: travelGrid6,
        aspectRatio: '16:9'
      },
      {
        id: 'travel-preview-row1-hero',
        title: 'Traveling With Us is More Easy Than Ever — Search & Destination Highlight',
        titleEn: 'Traveling With Us is More Easy Than Ever — Search & Destination Highlight',
        isPlaceholder: false,
        imageUrl: travelGrid3,
        aspectRatio: '1:1'
      },
      {
        id: 'travel-preview-row2-grid1',
        title: 'Travel Rental Brand Identity & Contact Direct Booking Card',
        titleEn: 'Travel Rental Brand Identity & Contact Direct Booking Card',
        isPlaceholder: false,
        imageUrl: travelGrid1,
        aspectRatio: '1:1'
      },
      {
        id: 'travel-preview-row2-grid2',
        title: 'Explore Yogyakarta — Destination Highlight & Tour Package Post',
        titleEn: 'Explore Yogyakarta — Destination Highlight & Tour Package Post',
        isPlaceholder: false,
        imageUrl: travelGrid2,
        aspectRatio: '1:1'
      },
      {
        id: 'travel-preview-row3-grid4',
        title: 'Promo Holiday Tour — Special Offer & Call to Action Graphic',
        titleEn: 'Promo Holiday Tour — Special Offer & Call to Action Graphic',
        isPlaceholder: false,
        imageUrl: travelGrid4,
        aspectRatio: '1:1'
      },
      {
        id: 'travel-preview-row3-grid5',
        title: 'Fleet Rental Showcase & Customer Trip Recommendation Post',
        titleEn: 'Fleet Rental Showcase & Customer Trip Recommendation Post',
        isPlaceholder: false,
        imageUrl: travelGrid5,
        aspectRatio: '1:1'
      }
    ],
    deliverables: [
      'Rangkaian Desain Konten Feed Instagram (Multi-Post)',
      'Visual Promosi Rental Mobil & Paket Wisata Yogyakarta',
      'Layout Tipografi Bold & Call-to-Action Penjualan',
      'Palet Warna Kontras Dinamis (Sky Blue & Warm Orange)',
      'Template Identitas Visual & Branding Media Sosial Siap Publikasi'
    ],
    deliverablesEn: [
      'Instagram Feed Promotional Content Series',
      'Tour Packages & Vehicle Rental Promo Visuals',
      'Bold Typographic Hierarchy & Conversion CTAs',
      'Vibrant Dynamic Palette (Sky Blue & Warm Orange)',
      'Ready-to-Publish Social Media Visual Identity System'
    ],
    metrics: 'High-Engagement Social Media Content Kit',
    metricsEn: 'High-Engagement Social Media Content Kit',
    tags: ['#Graphic Design', '#Social Media', '#Travel & Tourism', '#Instagram Content'],
    roadmap: [
      {
        id: 'travel-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Brand Brief & Target Audience Mapping',
        titleEn: 'Brand Brief & Target Audience Mapping',
        subtitle: 'Audience Persona, Competitor Analysis & Travel Themes',
        description: 'Brainstormed campaign strategy, traveler pain points, and tourism visual references using Google AI Studio and Gemini for rapid ideation and creative brief drafting, mapping key Yogyakarta destinations into clear rental and tour conversion funnels.',
        descriptionEn: 'Brainstormed campaign strategy, traveler pain points, and tourism visual references using Google AI Studio and Gemini for rapid ideation and creative brief drafting, mapping key Yogyakarta destinations into clear rental and tour conversion funnels.',
        deliverables: ['Campaign Strategy Brief', 'Content Pillar Breakdown', 'Visual Moodboard'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Milanote'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'travel-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Style System & Dynamic Palette Direction',
        titleEn: 'Visual Style System & Dynamic Palette Direction',
        subtitle: 'Color Harmonic Contrast (Sky Blue & Vibrant Orange), Bold Type System',
        description: 'Synthesized promotional headlines, destination hooks, and narrative copywriting with Claude (Anthropic) for concept validation, followed by crafting an energetic visual system with bold sans-serif display typography and vibrant sky-blue/orange contrast.',
        descriptionEn: 'Synthesized promotional headlines, destination hooks, and narrative copywriting with Claude (Anthropic) for concept validation, followed by crafting an energetic visual system with bold sans-serif display typography and vibrant sky-blue/orange contrast.',
        deliverables: ['Color & Typography System', 'Visual Brand Assets Kit', 'Badge & Sticker Accents'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Adobe Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'travel-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'High-Fidelity Social Asset Crafting & Layout',
        titleEn: 'High-Fidelity Social Asset Crafting & Layout',
        subtitle: 'Multi-Post Grid Design, Photo Retouching & Destination Highlights',
        description: 'Composed high-converting Instagram feed graphics with photo retouching, price badge placement, fleet showcase cards, and customer conversion CTAs.',
        descriptionEn: 'Composed high-converting Instagram feed graphics with photo retouching, price badge placement, fleet showcase cards, and customer conversion CTAs.',
        deliverables: ['6-Post Feed Graphic Suite', 'Promotional Pricing Graphics', 'Service Highlights Carousel Set'],
        toolsUsed: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'travel-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Format Optimization & Ready-to-Publish Export',
        titleEn: 'Format Optimization & Ready-to-Publish Export',
        subtitle: 'High-DPI WebP/PNG Mastering & Client Asset Packaging',
        description: 'Mastered graphics for high-density mobile screens with crisp compression, verified contrast and readability on mobile viewports, and completed the final handover of social media campaign assets to the client.',
        descriptionEn: 'Mastered graphics for high-density mobile screens with crisp compression, verified contrast and readability on mobile viewports, and completed the final handover of social media campaign assets to the client.',
        deliverables: ['Final Social-Ready Graphics Kit', 'Final Files & Assets Handed Over to Client', 'Design System Archive'],
        toolsUsed: ['Adobe Photoshop', 'Behance'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ai-assisted-video-synthesis',
    code: '802',
    title: 'Muslim Chaplaincy: Solusi Krisis Kesehatan Mental & Spiritual Indonesia',
    titleEn: 'Muslim Chaplaincy: Solusi Krisis Kesehatan Mental & Spiritual Indonesia',
    category: 'ai',
    categoryLabel: 'Generative AI & Motion Video',
    categoryLabelEn: 'Generative AI & Motion Video',
    description: "Indonesia faces an invisible crisis: rising mental and spiritual fatigue among healthcare workers, students, and public institution personnel. This video introduces Muslim Chaplaincy — a professional, non-doctrinal spiritual care profession that complements, rather than replaces, existing professionals. The idea is explored further in the book 'Chaplaincy Muslim: Model, Praktik, dan Kebijakan untuk Indonesia' by Rr Rhetno Arobiatul Jauzak.",
    descriptionEn: "Indonesia faces an invisible crisis: rising mental and spiritual fatigue among healthcare workers, students, and public institution personnel. This video introduces Muslim Chaplaincy — a professional, non-doctrinal spiritual care profession that complements, rather than replaces, existing professionals. The idea is explored further in the book 'Chaplaincy Muslim: Model, Praktik, dan Kebijakan untuk Indonesia' by Rr Rhetno Arobiatul Jauzak.",
    tools: ['Google AI Studio', 'Gemini', 'Claude (Anthropic)', 'Midjourney', 'Runway', 'After Effects', 'Premiere Pro', 'Adobe Audition'],
    clientOrContext: 'Rr Rhetno Arobiatul Jauzak',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#06b6d4',
    gradientBg: 'from-cyan-950 via-slate-900 to-teal-950',
    imageUrl: muslimcap01,
    isPlaceholder: false,
    behanceUrl: 'https://www.behance.net/ardiulinnuha/',
    youtubeUrl: 'https://www.youtube.com/watch?v=oI-P1kRf9c0',
    previewGridType: 'portrait-video-showcase',
    gallery: [
      {
        id: 'muslimcap-preview-1',
        title: 'Muslim Chaplaincy Visual Identity & Keyframe Showcase',
        titleEn: 'Muslim Chaplaincy Visual Identity & Keyframe Showcase',
        isPlaceholder: false,
        imageUrl: muslimcap01,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'High-Impact Portrait Motion Video (9:16)',
      'Generative AI Concept Art & Scene Keyframes',
      'Spiritual Healthcare Narrative & Scripting',
      'Social Advocacy Visual Communication'
    ],
    deliverablesEn: [
      'High-Impact Portrait Motion Video (9:16)',
      'Generative AI Concept Art & Scene Keyframes',
      'Spiritual Healthcare Narrative & Scripting',
      'Social Advocacy Visual Communication'
    ],
    metrics: 'Spiritual Care Advocacy',
    metricsEn: 'Spiritual Care Advocacy',
    tags: ['Muslim Chaplaincy', 'Mental Health', 'Spiritual Care', 'Generative AI', 'Motion Video', 'Rr Rhetno Arobiatul Jauzak'],
    roadmap: [
      {
        id: 'muslimcap-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Spiritual Crisis Research & Thematic Framing',
        titleEn: 'Spiritual Crisis Research & Thematic Framing',
        subtitle: 'Healthcare Literature, Institutional Chaplaincy Models & Narrative Brief',
        description: 'Conducted in-depth research on spiritual healthcare distress in Indonesia, analyzing global chaplaincy standards (hospital, military, prison) to frame an empathetic, non-doctrinal educational narrative.',
        descriptionEn: 'Conducted in-depth research on spiritual healthcare distress in Indonesia, analyzing global chaplaincy standards (hospital, military, prison) to frame an empathetic, non-doctrinal educational narrative.',
        deliverables: ['Research Synthesis Deck', 'Narrative Concept Brief', 'Contextual Factsheet'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'muslimcap-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Generative Concept Synthesis & Visual Art Direction',
        titleEn: 'Generative Concept Synthesis & Visual Art Direction',
        subtitle: 'Character Keyframing, Scene Environments & AI Concept Art',
        description: 'Crafted cohesive prompt architectures and generated high-resolution scene keyframes depicting institutional settings (hospitals, military bases, campuses) with dignified and calming visual aesthetics.',
        descriptionEn: 'Crafted cohesive prompt architectures and generated high-resolution scene keyframes depicting institutional settings (hospitals, military bases, campuses) with dignified and calming visual aesthetics.',
        deliverables: ['Prompt Blueprint Suite', 'Scene Keyframe Collection', 'Visual Style Guide'],
        toolsUsed: ['Midjourney', 'Claude (Anthropic)', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'muslimcap-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Portrait Motion Design & Generative Video Synthesis',
        titleEn: 'Portrait Motion Design & Generative Video Synthesis',
        subtitle: 'Vertical 9:16 Composition, Motion Graphics & Sound Scape',
        description: 'Directed vertical portrait motion compositions, kinetic typography, voiceover pacing, and atmospheric sound design engineered specifically for impactful mobile broadcast.',
        descriptionEn: 'Directed vertical portrait motion compositions, kinetic typography, voiceover pacing, and atmospheric sound design engineered specifically for impactful mobile broadcast.',
        deliverables: ['Vertical 9:16 Motion Master', 'Kinetic Typography Assets', 'Audio Bed & Voiceover Mix'],
        toolsUsed: ['Runway', 'After Effects', 'Adobe Audition'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'muslimcap-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Final Packaging & Social Impact Distribution',
        titleEn: 'Final Packaging & Social Impact Distribution',
        subtitle: 'Color Grading, YouTube Optimization & Campaign Advocacy',
        description: 'Finalized high-bitrate rendering, color grading, thumbnail packaging, and public YouTube release to foster national dialogue on professional spiritual care infrastructure.',
        descriptionEn: 'Finalized high-bitrate rendering, color grading, thumbnail packaging, and public YouTube release to foster national dialogue on professional spiritual care infrastructure.',
        deliverables: ['Master 9:16 Video (YouTube)', 'Campaign Thumbnail Assets', 'Project Documentation'],
        toolsUsed: ['Premiere Pro', 'YouTube Studio'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'uiux-mobile-web-system',
    code: '819',
    title: 'Voltura Energy — B2B Energy Consultancy Website UI/UX Design',
    titleEn: 'Voltura Energy — B2B Energy Consultancy Website UI/UX Design',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web',
    categoryLabelEn: 'UI/UX & Web',
    description: 'Design exploration for Voltura Energy, a clean energy brand. This concept reimagines how solar/renewable energy companies can present themselves — bold, modern, and conversion-focused, blending sharp layouts, warm tones, and confident messaging to reflect both innovation and sustainability. Covers clean eco-focused UI, a bold hero section with strong value proposition & CTA, modular service breakdown, trust-building testimonials, and an interactive FAQ.',
    descriptionEn: 'Design exploration for Voltura Energy, a clean energy brand. This concept reimagines how solar/renewable energy companies can present themselves — bold, modern, and conversion-focused, blending sharp layouts, warm tones, and confident messaging to reflect both innovation and sustainability. Covers clean eco-focused UI, a bold hero section with strong value proposition & CTA, modular service breakdown, trust-building testimonials, and an interactive FAQ.',
    tools: ['Figma', 'Figma Dev Mode', 'Adobe Photoshop', 'Notion', 'HTML/CSS/JS', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Voltura Energy',
    year: '2025',
    featured: false,
    aspectRatio: '16:9',
    accentColor: '#06b6d4',
    gradientBg: 'from-cyan-950 via-slate-900 to-sky-950',
    imageUrl: uiuxGrid1,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/234120697/Voltura-Energy-UIUX-Case-Study',
    previewGridType: '3-grid',
    gallery: [
      {
        id: 'uiux-preview-1',
        title: 'Clean Eco-Focused UI & Value Proposition',
        titleEn: 'Clean Eco-Focused UI & Value Proposition',
        isPlaceholder: false,
        imageUrl: uiuxGrid1,
        aspectRatio: '16:9'
      },
      {
        id: 'uiux-preview-2',
        title: 'Modular Service Breakdown & Conversion Flows',
        titleEn: 'Modular Service Breakdown & Conversion Flows',
        isPlaceholder: false,
        imageUrl: uiuxGrid2,
        aspectRatio: '16:9'
      },
      {
        id: 'uiux-preview-3',
        title: 'Trust-Building Testimonials & Interactive FAQ',
        titleEn: 'Trust-Building Testimonials & Interactive FAQ',
        isPlaceholder: false,
        imageUrl: uiuxGrid3,
        aspectRatio: '4:5'
      }
    ],
    deliverables: ['Clean Eco-Focused UI/UX', 'Bold Hero Section & CTA', 'Modular Service Breakdown', 'Interactive FAQ & Testimonials'],
    deliverablesEn: ['Clean Eco-Focused UI/UX', 'Bold Hero Section & CTA', 'Modular Service Breakdown', 'Interactive FAQ & Testimonials'],
    metrics: 'Clean Energy Brand Website Concept',
    metricsEn: 'Clean Energy Brand Website Concept',
    roadmap: [
      {
        id: 'uiux-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'UX Research & Information Architecture',
        titleEn: 'UX Research & Information Architecture',
        subtitle: 'B2B Renewable Energy Benchmarking & User Personas',
        description: 'Conducted competitive UX analysis, user journey mapping, and conversion funnel strategy using Google AI Studio and Gemini for rapid research synthesis, persona development, and initial creative brief drafting.',
        descriptionEn: 'Conducted competitive UX analysis, user journey mapping, and conversion funnel strategy using Google AI Studio and Gemini for rapid research synthesis, persona development, and initial creative brief drafting.',
        deliverables: ['UX Research Synthesis', 'Site Information Architecture', 'Content Strategy Matrix'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Figma'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'uiux-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Value Proposition Copywriting & Design System',
        titleEn: 'Value Proposition Copywriting & Design System',
        subtitle: 'Editorial Tone, Color Harmonics & Component Tokens',
        description: 'Crafted bold value propositions, B2B consultative copy drafts, and narrative validation with Claude (Anthropic), followed by developing a high-contrast eco-focused design system with warm solar accents and typography tokens.',
        descriptionEn: 'Crafted bold value propositions, B2B consultative copy drafts, and narrative validation with Claude (Anthropic), followed by developing a high-contrast eco-focused design system with warm solar accents and typography tokens.',
        deliverables: ['Figma Design System Tokens', 'Copywriting & Content Deck', 'Wireframe Flow Blueprints'],
        toolsUsed: ['Claude (Anthropic)', 'Figma', 'Adobe Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'uiux-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'High-Fidelity Interface & Interactive Prototype',
        titleEn: 'High-Fidelity Interface & Interactive Prototype',
        subtitle: 'Hero CTA Section, Modular Services & Accordion FAQ',
        description: 'Engineered high-fidelity responsive screens for desktop and mobile, interactive micro-animations, service breakdown tabs, and interactive FAQ components.',
        descriptionEn: 'Engineered high-fidelity responsive screens for desktop and mobile, interactive micro-animations, service breakdown tabs, and interactive FAQ components.',
        deliverables: ['Hi-Fi Desktop & Mobile Screens', 'Interactive Figma Prototype', 'Component Library Specs'],
        toolsUsed: ['Figma', 'Figma Dev Mode'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'uiux-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Dev Mode Handoff & Client Delivery',
        titleEn: 'Dev Mode Handoff & Client Delivery',
        subtitle: 'Design System Handoff, Asset Export & Client Handover',
        description: 'Prepared clean developer handoff documentation with spacing tokens, responsive constraints, asset exports, and completed the final design system and prototype handover to the client.',
        descriptionEn: 'Prepared clean developer handoff documentation with spacing tokens, responsive constraints, asset exports, and completed the final design system and prototype handover to the client.',
        deliverables: ['Developer Handoff Package', 'Final Files & Assets Handed Over to Client', 'Design Asset Export Archive'],
        toolsUsed: ['Figma Dev Mode', 'Behance'],
        duration: 'Final Delivery',
        status: 'completed'
      }
    ]
  },
  {
    id: 'sribufood-box-packaging',
    code: '226',
    title: 'Sribufood Restaurant — Box Packaging Design',
    titleEn: 'Sribufood Restaurant — Box Packaging Design',
    category: 'packaging',
    categoryLabel: 'Packaging Design',
    categoryLabelEn: 'Packaging Design',
    tagBadge: 'Packaging Design | Indonesian Culinary Brand',
    description: 'Desain kemasan kotak makanan (nasi box) untuk Sribufood Restaurant, sebuah brand kuliner khas nusantara. Desain menampilkan ilustrasi kustom dari 5 hidangan unggulan (ayam goreng, sate ayam, Soto Lamongan, Opor Ayam, pepes) yang disusun dalam bingkai medali di setiap panel kotak, dipadukan dengan pola batik tradisional Indonesia sebagai latar belakang dan siluet peta Indonesia sebagai elemen identitas brand. Palet warna hangat merah dan emas dipilih untuk mencerminkan identitas kuliner tradisional Indonesia yang autentik dan menggugah selera.',
    descriptionEn: 'Designed a food box (nasi box) packaging for Sribufood Restaurant, an Indonesian culinary brand. The design features custom illustrations of signature dishes (fried chicken, chicken satay, Soto Lamongan, Opor Ayam, pepes) arranged in medallion frames on each panel of the box, paired with a batik/traditional Indonesian pattern as the background and a silhouette of the Indonesian map as a brand mark element. A warm red-and-gold color palette was chosen to reflect a traditional Indonesian culinary identity.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Google AI Studio', 'Gemini', 'Canva', 'Claude (Anthropic)'],
    clientOrContext: 'Sribufood Restaurant (Indonesian Culinary Brand)',
    year: '2024 - 2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#dc2626',
    gradientBg: 'from-red-950 via-amber-950 to-stone-950',
    imageUrl: sribufood01,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/226094433/Box-Packaging-Design',
    gallery: [
      {
        id: 'sribufood-preview-1',
        title: 'Sribufood Restaurant — Box Packaging Design Presentation Spread',
        titleEn: 'Sribufood Restaurant — Box Packaging Design Presentation Spread',
        isPlaceholder: false,
        imageUrl: sribufood01,
        aspectRatio: '16:9'
      },
      {
        id: 'sribufood-preview-2',
        title: 'Sribufood Restaurant — Custom Food Illustrations & Packaging Dieline Layout',
        titleEn: 'Sribufood Restaurant — Custom Food Illustrations & Packaging Dieline Layout',
        isPlaceholder: false,
        imageUrl: sribufood02,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Ilustrasi Makanan Kustom (5 Menu: Ayam Goreng, Sate Ayam, Soto Lamongan, Opor Ayam, Pepes)',
      'Pola Latar Belakang Batik Tradisional & Siluet Peta Indonesia',
      'Layout Dieline Kotak Makanan Siap Cetak (Crease & Bleed Margins Akurat)',
      'Palet Warna Tradisional Merah & Emas Khas Kuliner Indonesia',
      'Aset Presentasi Mockup Kemasan Retail Siap Produksi'
    ],
    deliverablesEn: [
      'Custom Food Illustrations (5 Signature Dishes: Fried Chicken, Chicken Satay, Soto Lamongan, Opor Ayam, Pepes)',
      'Traditional Batik Pattern Background & Indonesian Map Silhouette Branding',
      'Print-Ready Food Box Dieline Layout with Precise Crease & Bleed Margins',
      'Warm Red & Gold Color Palette for Authentic Indonesian Culinary Identity',
      'Retail Food Packaging Mockup & Production-Ready Presentation Assets'
    ],
    metrics: 'Print-Ready Retail Food Packaging',
    metricsEn: 'Print-Ready Retail Food Packaging',
    tags: ['#Packaging Design', '#Food Packaging', '#Culinary Identity', '#Indonesian Heritage', '#Vector Illustration'],
    roadmap: [
      {
        id: 'sribufood-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Culinary Brand Strategy & Dieline Research',
        titleEn: 'Culinary Brand Strategy & Dieline Research',
        subtitle: 'Indonesian Heritage Mapping, Box Dimensions & Food Selection',
        description: 'Conducted brand positioning research and packaging dieline analysis using Google AI Studio and Gemini for rapid culinary ideation, menu curation, and creative brief drafting, mapping Sribufood\'s 5 signature dishes and traditional Indonesian culinary identity.',
        descriptionEn: 'Conducted brand positioning research and packaging dieline analysis using Google AI Studio and Gemini for rapid culinary ideation, menu curation, and creative brief drafting, mapping Sribufood\'s 5 signature dishes and traditional Indonesian culinary identity.',
        deliverables: ['Culinary Brand Creative Brief', 'Packaging Dieline Blueprint Specs', 'Menu Feature Architecture'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Miro'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'sribufood-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Heritage Visual Identity & Medallion Illustration',
        titleEn: 'Heritage Visual Identity & Medallion Illustration',
        subtitle: 'Warm Red & Gold Harmonics, Batik Patterning & Map Silhouette',
        description: 'Synthesized food copywriting, culinary heritage storytelling, and flavor messaging validation with Claude (Anthropic), followed by developing a warm red-and-gold palette, Indonesian map silhouette branding, and ornate medallion frames.',
        descriptionEn: 'Synthesized food copywriting, culinary heritage storytelling, and flavor messaging validation with Claude (Anthropic), followed by developing a warm red-and-gold palette, Indonesian map silhouette branding, and ornate medallion frames.',
        deliverables: ['Red & Gold Color Palette System', 'Batik Heritage Background Motif', 'Indonesian Map Brand Elements'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'sribufood-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Custom Food Vector Illustrations & Panel Layout',
        titleEn: 'Custom Food Vector Illustrations & Panel Layout',
        subtitle: '5 Signature Dishes (Ayam Goreng, Sate Ayam, Soto, Opor, Pepes)',
        description: 'Illustrated 5 detailed culinary vectors for signature dishes within medallion panel frames, aligning nutritional labels, brand emblems, and appetite-appeal artwork across each folding box panel.',
        descriptionEn: 'Illustrated 5 detailed culinary vectors for signature dishes within medallion panel frames, aligning nutritional labels, brand emblems, and appetite-appeal artwork across each folding box panel.',
        deliverables: ['5 Custom Food Vector Illustrations', 'Modular Box Panel Layouts', 'Appetite-Appeal Visual Emblems'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop', 'Canva'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'sribufood-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Print-Ready Dieline Preflight & Client Handover',
        titleEn: 'Print-Ready Dieline Preflight & Client Handover',
        subtitle: 'CMYK Offset Separation, Crease/Bleed Margins & Client Production Delivery',
        description: 'Executed industrial prepress preflight with accurate crease lines, fold tolerances, and 3mm bleed margins for CMYK food-grade folding boxboard, followed by completing the final handover of press-ready assets and dielines to the client.',
        descriptionEn: 'Executed industrial prepress preflight with accurate crease lines, fold tolerances, and 3mm bleed margins for CMYK food-grade folding boxboard, followed by completing the final handover of press-ready assets and dielines to the client.',
        deliverables: ['Industrial Print-Ready Dieline (PDF/AI)', 'CMYK Color Separation Package', 'Final Files & Assets Handed Over to Client'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop', 'Behance'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'makanpus-cat-food-packaging',
    code: '238',
    title: 'Makan Pus — Healthy Cat Food Packaging Design',
    titleEn: 'Makan Pus — Healthy Cat Food Packaging Design',
    category: 'packaging',
    categoryLabel: 'Packaging Design',
    categoryLabelEn: 'Packaging Design',
    tagBadge: 'Packaging Design | Pet Food & Cat Care',
    description: 'Desain kemasan makanan kucing (pouch packaging) untuk Makan Pus bertajuk "Healthy Food for Healthy Cat". Kemasan dirancang untuk varian Tuna Flavour dengan formula nutrisi seimbang (kaya Omega 3, protein tinggi, mudah dicerna, nett 800g). Desain memadukan ilustrasi maskot kucing ceria, palet warna hijau zaitun dan emas alami, tipografi yang ramah namun profesional, serta tata letak dieline kemasan presisi yang mencakup tabel Nutrition Facts, petunjuk pemberian pakan (feeding guide), dan kode barcode siap produksi retail.',
    descriptionEn: 'Designed a premium cat food pouch packaging for Makan Pus titled "Healthy Food for Healthy Cat". The packaging is created for the Tuna Flavour variant featuring balanced feline nutrition (Rich in Omega 3, High Protein, Easily Digestible, 800g net weight). The design blends playful cat mascot illustrations, a warm olive green and natural gold palette, friendly yet professional typography, and a print-ready dieline layout complete with Nutrition Facts, daily feeding guidelines, and retail barcodes.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Makan Pus (Freelance Client / Fastwork)',
    year: '2024 - 2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#65a30d',
    gradientBg: 'from-lime-950 via-stone-900 to-emerald-950',
    imageUrl: makanpus01,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/ardiulinnuha/projects',
    previewGridType: 'packaging-duo',
    gallery: [
      {
        id: 'makanpus-preview-1',
        title: 'Makan Pus — Hero Product Packaging Mockup & Presentation Spread',
        titleEn: 'Makan Pus — Hero Product Packaging Mockup & Presentation Spread',
        isPlaceholder: false,
        imageUrl: makanpus01,
        aspectRatio: '16:9'
      },
      {
        id: 'makanpus-preview-2',
        title: 'Makan Pus — Print-Ready Dieline Net Layout & Nutrition Facts Specifications',
        titleEn: 'Makan Pus — Print-Ready Dieline Net Layout & Nutrition Facts Specifications',
        isPlaceholder: false,
        imageUrl: makanpus02,
        aspectRatio: '16:9'
      },
      {
        id: 'makanpus-preview-3',
        title: 'Makan Pus — Formula Highlights & Key Nutritional Benefits Display',
        titleEn: 'Makan Pus — Formula Highlights & Key Nutritional Benefits Display',
        isPlaceholder: false,
        imageUrl: makanpus03,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Desain Kemasan Pouch Makanan Kucing (Front & Back Layout)',
      'Ilustrasi Vektor Maskot Kucing & Grafis Varian Tuna Flavour',
      'Tabel Informasi Nilai Gizi (Nutrition Facts) & Petunjuk Pemberian Pakan (Feeding Guide)',
      'Tata Letak Dieline Kemasan Siap Cetak (Bleed & Crease Margins Presisi)',
      'Mockup Presentasi Produk 3D & Aset Visual Komersial Retail'
    ],
    deliverablesEn: [
      'Cat Food Pouch Packaging Design (Front & Back Layout)',
      'Custom Cat Mascot Vector Illustration & Tuna Flavour Graphics',
      'Nutrition Facts Panel & Daily Feeding Guidelines Typography',
      'Print-Ready Packaging Dieline Layout (Accurate Bleed & Fold Tolerances)',
      '3D Product Packaging Mockup & Retail Commercial Presentation Assets'
    ],
    metrics: 'Print-Ready Pet Food Packaging',
    metricsEn: 'Print-Ready Pet Food Packaging',
    tags: ['#Packaging Design', '#Pet Food', '#Cat Care', '#Pouch Packaging', '#Vector Illustration'],
    roadmap: [
      {
        id: 'makanpus-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Pet Care Brand Positioning & Dieline Blueprint',
        titleEn: 'Pet Care Brand Positioning & Dieline Blueprint',
        subtitle: 'Feline Nutrition Architecture, Pouch Form Factor & Competitive Audit',
        description: 'Conducted target pet owner research and retail shelf visibility analysis using Google AI Studio and Gemini for rapid copywriting generation, nutritional claims structure (Omega 3, High Protein, Easy Digestion), and pouch dieline dimensional calibration.',
        descriptionEn: 'Conducted target pet owner research and retail shelf visibility analysis using Google AI Studio and Gemini for rapid copywriting generation, nutritional claims structure (Omega 3, High Protein, Easy Digestion), and pouch dieline dimensional calibration.',
        deliverables: ['Pet Nutrition Copy Brief', 'Pouch Packaging Dieline Blueprint', 'Shelf Competitor Benchmark Matrix'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'makanpus-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Identity, Mascot Illustration & Color Harmony',
        titleEn: 'Visual Identity, Mascot Illustration & Color Harmony',
        subtitle: 'Olive Green & Natural Gold Harmonics, Cat Character Art & Tuna Flavour Emblems',
        description: 'Refined brand voice and back-of-pack claims with Claude (Anthropic), followed by vectorizing the playful cat mascot, tuna fish emblem, and establishing an earthy olive-green and natural gold color scheme symbolizing healthy organic pet nutrition.',
        descriptionEn: 'Refined brand voice and back-of-pack claims with Claude (Anthropic), followed by vectorizing the playful cat mascot, tuna fish emblem, and establishing an earthy olive-green and natural gold color scheme symbolizing healthy organic pet nutrition.',
        deliverables: ['Custom Cat Mascot Illustration', 'Tuna Flavour Iconography', 'Olive & Gold Color Palette System'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'makanpus-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Full Packaging Layout & Regulatory Compliance Panels',
        titleEn: 'Full Packaging Layout & Regulatory Compliance Panels',
        subtitle: 'Nutrition Facts, Feeding Guidelines Table, Ingredients & Barcode Hierarchy',
        description: 'Engineered the complete flat pouch dieline net in Adobe Illustrator, organizing front hero branding, back nutrition facts table, daily feeding portion guides by cat weight, guaranteed analysis, and barcode positioning.',
        descriptionEn: 'Engineered the complete flat pouch dieline net in Adobe Illustrator, organizing front hero branding, back nutrition facts table, daily feeding portion guides by cat weight, guaranteed analysis, and barcode positioning.',
        deliverables: ['Front & Back Pouch Artwork Panels', 'Structured Nutrition Facts & Feeding Chart', 'Regulatory Compliance & Barcode Integration'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'makanpus-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Print-Ready Prepress Preflight & 3D Retail Mockup',
        titleEn: 'Print-Ready Prepress Preflight & 3D Retail Mockup',
        subtitle: 'CMYK Color Separation, Bleed/Seal Margins & High-Impact Visual Presentation',
        description: 'Completed industrial prepress verification with 3mm bleed margins, heat-seal boundary clearance, and CMYK color profile conversion, followed by rendering high-resolution 3D pouch mockups for retail commercial presentation.',
        descriptionEn: 'Completed industrial prepress verification with 3mm bleed margins, heat-seal boundary clearance, and CMYK color profile conversion, followed by rendering high-resolution 3D pouch mockups for retail commercial presentation.',
        deliverables: ['Print-Ready Prepress Package (Vector AI / Press PDF)', 'CMYK Color Separation Standards', '3D Photorealistic Pouch Presentation Spreads'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'pt-royal-innovation-interior',
    code: '142',
    title: 'PT Royal Innovation Interior — Company Profile & Brand Guidelines',
    titleEn: 'PT Royal Innovation Interior — Company Profile & Brand Guidelines',
    category: 'branding',
    categoryLabel: 'Graphic & Brand Design',
    categoryLabelEn: 'Graphic & Brand Design',
    tagBadge: 'Company Profile & Brand Guidelines | Luxury Interior',
    description: 'Desain profil perusahaan dan panduan identitas merek (brand guidelines) komprehensif untuk PT Royal Innovation Interior, perusahaan yang bergerak di bidang desain interior mewah, dekorasi eksterior, dan perdagangan furnitur. Cakupan proyek meliputi buku profil perusahaan multi-halaman (cover, tentang kami, visi & misi, layanan, struktur organisasi), paket stationery lengkap (kop surat, kartu nama, folder), serta sistem pedoman identitas merek terperinci yang mencakup konstruksi logo, palet warna, hierarki tipografi, dan implementasi identitas korporat siap cetak.',
    descriptionEn: 'Designed a comprehensive company profile and brand guidelines document for PT Royal Innovation Interior, a company specializing in luxury interior design, exterior decoration, and furniture trading. The deliverables include a full multi-page company profile brochure (cover, about us, vision & mission, services, organizational structure), a complete stationery set (letterhead, business card, folder), and a detailed brand guidelines system covering logo construction, color palette, typography hierarchy, and corporate identity applications.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'PT Royal Innovation Interior',
    year: '2024 - 2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#d97706',
    gradientBg: 'from-amber-950 via-stone-900 to-yellow-950',
    imageUrl: ptroyalidn01,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/ardiulinnuha/projects',
    previewGridType: 'single-column-stack',
    gallery: [
      {
        id: 'royal-preview-1',
        title: 'Cover Design & Executive Presentation Spread',
        titleEn: 'Cover Design & Executive Presentation Spread',
        isPlaceholder: false,
        imageUrl: ptroyalidn01,
        aspectRatio: '16:9'
      },
      {
        id: 'royal-preview-2',
        title: 'About Us, Corporate Vision & Architectural Capabilities',
        titleEn: 'About Us, Corporate Vision & Architectural Capabilities',
        isPlaceholder: false,
        imageUrl: ptroyalidn02,
        aspectRatio: '16:9'
      },
      {
        id: 'royal-preview-3',
        title: 'Core Services, Luxury Interior Pillars & Mission Statement',
        titleEn: 'Core Services, Luxury Interior Pillars & Mission Statement',
        isPlaceholder: false,
        imageUrl: ptroyalidn03,
        aspectRatio: '16:9'
      },
      {
        id: 'royal-preview-4',
        title: 'Client Transformation CTA, Contact Spread & Back Cover',
        titleEn: 'Client Transformation CTA, Contact Spread & Back Cover',
        isPlaceholder: false,
        imageUrl: ptroyalidn04,
        aspectRatio: '16:9'
      },
      {
        id: 'royal-preview-5',
        title: 'Brand Guidelines & Visual Identity Specifications (2025 Edition)',
        titleEn: 'Brand Guidelines & Visual Identity Specifications (2025 Edition)',
        isPlaceholder: false,
        imageUrl: ptroyalidn05,
        aspectRatio: '16:9'
      },
      {
        id: 'royal-preview-6',
        title: 'Corporate Stationery Collateral (Letterhead, Business Cards, Folder)',
        titleEn: 'Corporate Stationery Collateral (Letterhead, Business Cards, Folder)',
        isPlaceholder: false,
        imageUrl: ptroyalidn06,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Multi-Page Company Profile Brochure (Cover, About, Vision, Services)',
      'Complete Stationery & Collateral System (Letterhead, Business Cards, Folder)',
      'Brand Guidelines & Visual Identity Standard (Logo Construction & Philosophy)',
      'Corporate Typography Hierarchy & Luxury Gold/Neutral Color System',
      'High-Resolution Print-Ready Assets & Pre-Press Production Files'
    ],
    deliverablesEn: [
      'Multi-Page Company Profile Brochure (Cover, About, Vision, Services)',
      'Complete Stationery & Collateral System (Letterhead, Business Cards, Folder)',
      'Brand Guidelines & Visual Identity Standard (Logo Construction & Philosophy)',
      'Corporate Typography Hierarchy & Luxury Gold/Neutral Color System',
      'High-Resolution Print-Ready Assets & Pre-Press Production Files'
    ],
    metrics: 'Complete Corporate Identity & Brand System',
    metricsEn: 'Complete Corporate Identity & Brand System',
    tags: ['#Graphic Design', '#Brand Identity', '#Company Profile', '#Brand Guidelines'],
    roadmap: [
      {
        id: 'royal-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Brand Discovery & Corporate Architecture',
        titleEn: 'Brand Discovery & Corporate Architecture',
        subtitle: 'Luxury Positioning, Client Audit & Narrative Matrix',
        description: 'Conducted brand positioning and luxury architectural market analysis using Google AI Studio and Gemini for rapid research, executive copywriting framing, value proposition drafting, and structural content matrix definition.',
        descriptionEn: 'Conducted brand positioning and luxury architectural market analysis using Google AI Studio and Gemini for rapid research, executive copywriting framing, value proposition drafting, and structural content matrix definition.',
        deliverables: ['Brand Discovery Brief', 'Company Profile Information Hierarchy', 'Luxury Positioning Matrix'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Miro'],
        duration: 'Week 1-2',
        status: 'completed'
      },
      {
        id: 'royal-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Brand Guidelines & Vector Identity System',
        titleEn: 'Brand Guidelines & Vector Identity System',
        subtitle: 'Logo Geometry, Luxury Gold Palette & Typography Standards',
        description: 'Synthesized brand voice, vision narrative, and core values with Claude (Anthropic), followed by developing precise geometric logo vectors, royal gold and warm neutral harmonies, and comprehensive brand guidelines specifications in Adobe Illustrator.',
        descriptionEn: 'Synthesized brand voice, vision narrative, and core values with Claude (Anthropic), followed by developing precise geometric logo vectors, royal gold and warm neutral harmonies, and comprehensive brand guidelines specifications in Adobe Illustrator.',
        deliverables: ['Vector Logotype & Emblem System', 'Brand Guidelines Specification Deck', 'Corporate Typography & Color Kit'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Week 3-4',
        status: 'completed'
      },
      {
        id: 'royal-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Multi-Page Profile Editorial & Stationery Suite',
        titleEn: 'Multi-Page Profile Editorial & Stationery Suite',
        subtitle: 'Brochure Master Layouts, Corporate Collateral & Print Systems',
        description: 'Engineered multi-page editorial spreads for the company profile brochure covering about us, vision & mission, services, and organizational structure in Adobe InDesign, accompanied by a complete corporate stationery set including official letterheads, business cards, envelopes, and presentation folders.',
        descriptionEn: 'Engineered multi-page editorial spreads for the company profile brochure covering about us, vision & mission, services, and organizational structure in Adobe InDesign, accompanied by a complete corporate stationery set including official letterheads, business cards, envelopes, and presentation folders.',
        deliverables: ['Multi-Page Editorial Company Profile Brochure', 'Complete Corporate Stationery Suite', 'Presentation Folder & Card Assets'],
        toolsUsed: ['Adobe InDesign', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Week 5-6',
        status: 'completed'
      },
      {
        id: 'royal-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Pre-Press Verification & Production Handover',
        titleEn: 'Pre-Press Verification & Production Handover',
        subtitle: 'CMYK Calibration, Bleed & Margin Audits & Client Production Handover',
        description: 'Executed thorough industrial prepress checks with accurate trim, bleed, and safe margins for offset and digital printing, validated color gamut consistency across digital and print substrates, and completed the final handover of production files and brand assets to the client.',
        descriptionEn: 'Executed thorough industrial prepress checks with accurate trim, bleed, and safe margins for offset and digital printing, validated color gamut consistency across digital and print substrates, and completed the final handover of production files and brand assets to the client.',
        deliverables: ['Press-Ready PDF Packages with Bleeds & Crops', 'Digital High-Resolution Corporate Profile PDF', 'Final Files & Assets Handed Over to Client'],
        toolsUsed: ['Adobe Acrobat Pro', 'Adobe InDesign', 'Behance'],
        duration: 'Final Delivery',
        status: 'completed'
      }
    ]
  },
  {
    id: 'leadly-ai-growth-platform',
    code: '835',
    title: 'Leadly — AI-Powered Growth Platform UI/UX Case Study',
    titleEn: 'Leadly — AI-Powered Growth Platform UI/UX Case Study',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web',
    categoryLabelEn: 'UI/UX & Web',
    tagBadge: 'UI/UX Case Study | AI-Powered SaaS Platform',
    description: 'UI/UX case study for Leadly, an AI-powered growth platform for small teams. This project explores landing page design, product dashboard concepts, and automation flow visualizations — combining clean SaaS aesthetics with bold typography, AI-driven feature highlights, and conversion-focused CTAs.',
    descriptionEn: 'UI/UX case study for Leadly, an AI-powered growth platform for small teams. This project explores landing page design, product dashboard concepts, and automation flow visualizations — combining clean SaaS aesthetics with bold typography, AI-driven feature highlights, and conversion-focused CTAs.',
    overviewDescription: 'Design exploration for Leadly, an AI-powered SaaS platform for small teams. This concept reimagines how AI-driven marketing tools can present themselves through smart campaigns, real-time lead scoring, and automated CRM workflows. Covers CRM enrichment integration, AI email campaign tools, and an automation dashboard with a clean, modern interface.',
    overviewDescriptionEn: 'Design exploration for Leadly, an AI-powered SaaS platform for small teams. This concept reimagines how AI-driven marketing tools can present themselves through smart campaigns, real-time lead scoring, and automated CRM workflows. Covers CRM enrichment integration, AI email campaign tools, and an automation dashboard with a clean, modern interface.',
    tools: ['Figma', 'Figma Dev Mode', 'Adobe Photoshop', 'Notion', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Leadly',
    year: '2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#6366f1',
    gradientBg: 'from-indigo-950 via-slate-900 to-violet-950',
    imageUrl: leadly01,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    behanceUrl: 'https://www.behance.net/gallery/234931101/UIUX-Case-Study-for-Leadly',
    previewGridType: 'single-column-stack',
    metrics: 'AI-Powered SaaS Landing Page & Product Design',
    metricsEn: 'AI-Powered SaaS Landing Page & Product Design',
    tags: ['#UI/UX Design', '#SaaS Design', '#Product Design', '#AI Platform', '#Landing Page'],
    gallery: [
      {
        id: 'leadly-preview-1',
        title: 'Hero Landing Page & Value Proposition — Clean SaaS Aesthetics',
        titleEn: 'Hero Landing Page & Value Proposition — Clean SaaS Aesthetics',
        isPlaceholder: false,
        imageUrl: leadly01,
        aspectRatio: '16:9'
      },
      {
        id: 'leadly-preview-2',
        title: 'Smart Campaigns & Real-Time Lead Scoring Interface',
        titleEn: 'Smart Campaigns & Real-Time Lead Scoring Interface',
        isPlaceholder: false,
        imageUrl: leadly02,
        aspectRatio: '16:9'
      },
      {
        id: 'leadly-preview-3',
        title: 'AI Email Campaign Builder & Automated CRM Workflows',
        titleEn: 'AI Email Campaign Builder & Automated CRM Workflows',
        isPlaceholder: false,
        imageUrl: leadly03,
        aspectRatio: '16:9'
      },
      {
        id: 'leadly-preview-4',
        title: 'Modular Automation Flow Visualizations & Interactive Component Specs',
        titleEn: 'Modular Automation Flow Visualizations & Interactive Component Specs',
        isPlaceholder: false,
        imageUrl: leadly04,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'AI-Powered SaaS Landing Page UI/UX Design',
      'Lead Scoring & CRM Enrichment Interface',
      'AI Email Campaign Builder & Workflow Dashboard',
      'Modular Automation Flow Visualization',
      'High-Fidelity Interactive Prototype & Design System'
    ],
    deliverablesEn: [
      'AI-Powered SaaS Landing Page UI/UX Design',
      'Lead Scoring & CRM Enrichment Interface',
      'AI Email Campaign Builder & Workflow Dashboard',
      'Modular Automation Flow Visualization',
      'High-Fidelity Interactive Prototype & Design System'
    ],
    roadmap: [
      {
        id: 'leadly-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'UX Research & B2B SaaS Benchmarking',
        titleEn: 'UX Research & B2B SaaS Benchmarking',
        subtitle: 'Competitive Landscape & User Persona Mapping',
        description: 'Conducted competitive UX analysis across top AI marketing platforms, user journey mapping, and conversion funnel strategy using Google AI Studio and Gemini for rapid research synthesis and persona definition.',
        descriptionEn: 'Conducted competitive UX analysis across top AI marketing platforms, user journey mapping, and conversion funnel strategy using Google AI Studio and Gemini for rapid research synthesis and persona definition.',
        deliverables: ['Competitive SaaS UX Audit', 'User Journey Maps & Personas', 'Information Architecture Blueprint'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Figma'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'leadly-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Design System & Information Architecture',
        titleEn: 'Design System & Information Architecture',
        subtitle: 'Component Tokens, Typography & Dark/Light Accents',
        description: 'Synthesized value proposition copy and messaging hierarchy with Claude (Anthropic), followed by developing a modern SaaS design system with reusable component tokens, accessible color palettes, and structured wireframes.',
        descriptionEn: 'Synthesized value proposition copy and messaging hierarchy with Claude (Anthropic), followed by developing a modern SaaS design system with reusable component tokens, accessible color palettes, and structured wireframes.',
        deliverables: ['Figma Design System Tokens', 'Wireframe Flow Blueprints', 'Messaging & Copy Deck'],
        toolsUsed: ['Claude (Anthropic)', 'Figma', 'Adobe Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'leadly-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'High-Fidelity UI & Dashboard Workflows',
        titleEn: 'High-Fidelity UI & Dashboard Workflows',
        subtitle: 'Landing Page Hero, CRM Enrichment & Campaign Automation',
        description: 'Engineered high-fidelity responsive screens for the marketing landing page, real-time lead scoring dashboard, and intuitive visual automation flow builder with interactive micro-states.',
        descriptionEn: 'Engineered high-fidelity responsive screens for the marketing landing page, real-time lead scoring dashboard, and intuitive visual automation flow builder with interactive micro-states.',
        deliverables: ['Hi-Fi Landing Page Screens', 'Product Dashboard & Workflow Views', 'Interactive Figma Prototype'],
        toolsUsed: ['Figma', 'Figma Dev Mode'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'leadly-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Dev Mode Handoff & Client Delivery',
        titleEn: 'Dev Mode Handoff & Client Delivery',
        subtitle: 'Design Tokens Handoff, Asset Archive & Case Study Publication',
        description: 'Documented developer handoff specifications using Figma Dev Mode, prepared production asset exports, organized design files for client handover, and published the comprehensive UI/UX case study to Behance.',
        descriptionEn: 'Documented developer handoff specifications using Figma Dev Mode, prepared production asset exports, organized design files for client handover, and published the comprehensive UI/UX case study to Behance.',
        deliverables: ['Figma Dev Mode Specifications', 'Final Production Asset Package', 'Behance Case Study Publication'],
        toolsUsed: ['Figma Dev Mode', 'Behance'],
        duration: 'Final Delivery',
        status: 'completed'
      }
    ]
  },
  {
    id: 'buhan-umkm-website-development',
    code: '846',
    title: 'BUHAN — UMKM Bu Hanif Website Design & Development',
    titleEn: 'BUHAN — UMKM Bu Hanif Website Design & Development',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web',
    categoryLabelEn: 'UI/UX & Web',
    tagBadge: 'Website Design & Development | Agro-Industry UMKM',
    description: "Designed and developed a complete business website for BUHAN, a local UMKM producing fresh oyster mushrooms and crispy mushroom chips ('Kripik Jamur Krispy Buhan') from Muna Barat, Sulawesi Tenggara. The site features product showcases, company profile, benefits, testimonials, FAQ, and conversion-focused WhatsApp ordering CTA.",
    descriptionEn: "Designed and developed a complete business website for BUHAN, a local UMKM producing fresh oyster mushrooms and crispy mushroom chips ('Kripik Jamur Krispy Buhan') from Muna Barat, Sulawesi Tenggara. The site features product showcases, company profile, benefits, testimonials, FAQ, and conversion-focused WhatsApp ordering CTA.",
    overviewDescription: "Full website design and development for BUHAN, a local agro-industry UMKM based in Muna Barat, Southeast Sulawesi, specializing in fresh oyster mushroom cultivation and processed crispy mushroom snacks ('Kripik Jamur Krispy'). Built to establish digital presence, elevate brand credibility, and drive direct customer orders via WhatsApp. The project encompasses information architecture, clean responsive UI design, interactive product showcase, value proposition highlights, customer testimonials, and an AI-assisted vibe coding workflow using Vite, React, and Tailwind CSS.",
    overviewDescriptionEn: "Full website design and development for BUHAN, a local agro-industry UMKM based in Muna Barat, Southeast Sulawesi, specializing in fresh oyster mushroom cultivation and processed crispy mushroom snacks ('Kripik Jamur Krispy'). Built to establish digital presence, elevate brand credibility, and drive direct customer orders via WhatsApp. The project encompasses information architecture, clean responsive UI design, interactive product showcase, value proposition highlights, customer testimonials, and an AI-assisted vibe coding workflow using Vite, React, and Tailwind CSS.",
    tools: ['Vite', 'React', 'Tailwind CSS', 'Google AI Studio', 'Figma', 'Lucide Icons'],
    clientOrContext: 'UMKM Bu Hanif',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#10b981',
    gradientBg: 'from-emerald-950 via-slate-900 to-teal-950',
    imageUrl: buhanif01,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    websiteUrl: 'https://buhanif.ai.studio/',
    previewGridType: 'single-column-stack',
    metrics: 'Business Website for Local UMKM Product',
    metricsEn: 'Business Website for Local UMKM Product',
    tags: ['#Website', '#UMKM', '#Agroindustry', '#E-Commerce', '#Vibe Coding', '#Local Brand'],
    gallery: [
      {
        id: 'buhan-preview-1',
        title: 'Full Landing Page Overview — Hero Section, Product Catalog & UMKM Brand Story',
        titleEn: 'Full Landing Page Overview — Hero Section, Product Catalog & UMKM Brand Story',
        isPlaceholder: false,
        imageUrl: buhanif01,
        aspectRatio: '16:9'
      },
      {
        id: 'buhan-preview-2',
        title: 'Hero Section & Desktop Navigation — Brand Value, Harvest Schedule & Trust Badges',
        titleEn: 'Hero Section & Desktop Navigation — Brand Value, Harvest Schedule & Trust Badges',
        isPlaceholder: false,
        imageUrl: buhanif02,
        aspectRatio: '16:9'
      },
      {
        id: 'buhan-preview-3',
        title: 'Direct WhatsApp Ordering Flow & Multi-Column Footer Navigation Interface',
        titleEn: 'Direct WhatsApp Ordering Flow & Multi-Column Footer Navigation Interface',
        isPlaceholder: false,
        imageUrl: buhanif03,
        aspectRatio: '16:9'
      },
      {
        id: 'buhan-preview-4',
        title: 'Product Packaging & Retail Label Assets — Standing Pouch Mockup & Regulatory Net Layout',
        titleEn: 'Product Packaging & Retail Label Assets — Standing Pouch Mockup & Regulatory Net Layout',
        isPlaceholder: false,
        imageUrl: buhanif04,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Full Responsive Business Website',
      'Interactive Product Catalog & WhatsApp Ordering Flow',
      'Brand Identity & Digital Asset Integration',
      'SEO-Friendly Architecture & Fast-Loading Mobile Experience'
    ],
    deliverablesEn: [
      'Full Responsive Business Website',
      'Interactive Product Catalog & WhatsApp Ordering Flow',
      'Brand Identity & Digital Asset Integration',
      'SEO-Friendly Architecture & Fast-Loading Mobile Experience'
    ],
    roadmap: [
      {
        id: 'buhan-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'UMKM Brand Discovery & Information Architecture',
        titleEn: 'UMKM Brand Discovery & Information Architecture',
        subtitle: 'Local Agro-Industry Positioning & Conversion Journey',
        description: 'Analyzed local business requirements, target retail consumers, and direct-to-WhatsApp ordering journeys using Google AI Studio and Gemini for rapid copywriting synthesis, product categorization, and structured site architecture.',
        descriptionEn: 'Analyzed local business requirements, target retail consumers, and direct-to-WhatsApp ordering journeys using Google AI Studio and Gemini for rapid copywriting synthesis, product categorization, and structured site architecture.',
        deliverables: ['Brand Discovery & Narrative Matrix', 'Information Architecture & Sitemap', 'WhatsApp Ordering Conversion Funnel'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Figma'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'buhan-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'UI Design System & Mobile-First Component Library',
        titleEn: 'UI Design System & Mobile-First Component Library',
        subtitle: 'Natural Green Harmonics, Typography & Micro-Interactions',
        description: 'Crafted modern agribusiness design tokens featuring organic green harmonies, crisp product photography cards, accessible typography hierarchies, and mobile-optimized touch targets in Figma.',
        descriptionEn: 'Crafted modern agribusiness design tokens featuring organic green harmonies, crisp product photography cards, accessible typography hierarchies, and mobile-optimized touch targets in Figma.',
        deliverables: ['Figma Design Tokens & UI Kit', 'Responsive Mobile & Desktop Wireframes', 'Product Card & Badge Components'],
        toolsUsed: ['Figma', 'Adobe Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'buhan-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'AI-Assisted Vibe Coding & Front-End Engineering',
        titleEn: 'AI-Assisted Vibe Coding & Front-End Engineering',
        subtitle: 'Vite, React, Tailwind CSS & Dynamic WhatsApp Integration',
        description: 'Implemented high-performance web components using an AI-assisted vibe coding workflow with Vite, React, and Tailwind CSS, featuring smooth scroll transitions, interactive accordion FAQ, dynamic product filtering, and one-click WhatsApp pre-filled order messages.',
        descriptionEn: 'Implemented high-performance web components using an AI-assisted vibe coding workflow with Vite, React, and Tailwind CSS, featuring smooth scroll transitions, interactive accordion FAQ, dynamic product filtering, and one-click WhatsApp pre-filled order messages.',
        deliverables: ['Responsive Web App Codebase', 'Dynamic Product Catalog View', 'Automated WhatsApp Ordering Handler'],
        toolsUsed: ['Vite', 'React', 'Tailwind CSS', 'Google AI Studio'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'buhan-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Performance Optimization & Live Production Launch',
        titleEn: 'Performance Optimization & Live Production Launch',
        subtitle: 'SEO Meta Tags, Asset Compression & Cloud Hosting',
        description: 'Executed lighthouse performance tuning, image compression, mobile usability checks, and deployed the live business website to production at buhanif.ai.studio.',
        descriptionEn: 'Executed lighthouse performance tuning, image compression, mobile usability checks, and deployed the live business website to production at buhanif.ai.studio.',
        deliverables: ['Live Production Website (buhanif.ai.studio)', 'Optimized WebP Assets Package', 'Comprehensive Handoff Documentation'],
        toolsUsed: ['Google AI Studio', 'Vite'],
        duration: 'Final Delivery',
        status: 'completed'
      }
    ]
  },
  {
    id: 'buhan-kripik-jamur-packaging',
    code: '255',
    title: 'Kripik Jamur Krispy "Buhan" — Product Packaging Design',
    titleEn: 'Kripik Jamur Krispy "Buhan" — Product Packaging Design',
    category: 'packaging',
    categoryLabel: 'Packaging Design',
    categoryLabelEn: 'Packaging Design',
    tagBadge: 'Product Packaging Design | Indonesian UMKM Snack',
    description: "Product packaging design for Kripik Jamur Krispy 'Buhan', a crispy oyster mushroom snack by UMKM Bu Hanif from Muna Barat, Sulawesi Tenggara. Features a modern retail standing pouch layout with product photography, nutritional claims, composition, P-IRT, Halal MUI labels, and print-ready dieline specifications.",
    descriptionEn: "Product packaging design for Kripik Jamur Krispy 'Buhan', a crispy oyster mushroom snack by UMKM Bu Hanif from Muna Barat, Sulawesi Tenggara. Features a modern retail standing pouch layout with product photography, nutritional claims, composition, P-IRT, Halal MUI labels, and print-ready dieline specifications.",
    overviewDescription: "Comprehensive packaging design and retail branding for Kripik Jamur Krispy 'Buhan', the signature processed snack line of UMKM Bu Hanif from Muna Barat, Southeast Sulawesi. Created to enhance market shelf presence, protect product freshness, and meet national retail distribution standards. Covers front and back pouch layout, appetizing visual presentation, balanced typography, clear nutritional facts, and regulatory certification information (P-IRT and Halal MUI compliance) with accurate dieline tolerances ready for production.",
    overviewDescriptionEn: "Comprehensive packaging design and retail branding for Kripik Jamur Krispy 'Buhan', the signature processed snack line of UMKM Bu Hanif from Muna Barat, Southeast Sulawesi. Created to enhance market shelf presence, protect product freshness, and meet national retail distribution standards. Covers front and back pouch layout, appetizing visual presentation, balanced typography, clear nutritional facts, and regulatory certification information (P-IRT and Halal MUI compliance) with accurate dieline tolerances ready for production.",
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Google AI Studio', 'Figma'],
    clientOrContext: 'UMKM Bu Hanif',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#16a34a',
    gradientBg: 'from-green-950 via-stone-900 to-amber-950',
    imageUrl: buhanif04,
    imageFit: 'cover',
    imagePosition: 'center',
    isPlaceholder: false,
    hideOverlayText: true,
    websiteUrl: 'https://buhanif.ai.studio/',
    previewGridType: 'single-column-stack',
    metrics: 'Retail Standing Pouch Packaging Design',
    metricsEn: 'Retail Standing Pouch Packaging Design',
    tags: ['#Packaging Design', '#Standing Pouch', '#UMKM', '#Food Packaging', '#Retail Branding', '#Agroindustry'],
    gallery: [
      {
        id: 'buhan-pack-preview-1',
        title: 'Retail Brand Presentation & Digital Product Catalog Showcase',
        titleEn: 'Retail Brand Presentation & Digital Product Catalog Showcase',
        isPlaceholder: false,
        imageUrl: buhanif01,
        aspectRatio: '16:9'
      },
      {
        id: 'buhan-pack-preview-2',
        title: 'Hero Product Packaging Mockup Teaser & Official Certification Badges',
        titleEn: 'Hero Product Packaging Mockup Teaser & Official Certification Badges',
        isPlaceholder: false,
        imageUrl: buhanif02,
        aspectRatio: '16:9'
      },
      {
        id: 'buhan-pack-preview-3',
        title: 'Retail Distribution Flow & Regulatory Compliance (Halal MUI & P-IRT) Display',
        titleEn: 'Retail Distribution Flow & Regulatory Compliance (Halal MUI & P-IRT) Display',
        isPlaceholder: false,
        imageUrl: buhanif03,
        aspectRatio: '16:9'
      },
      {
        id: 'buhan-pack-preview-4',
        title: 'Standing Pouch Retail Packaging Mockup & Print-Ready Net Layout Specifications',
        titleEn: 'Standing Pouch Retail Packaging Mockup & Print-Ready Net Layout Specifications',
        isPlaceholder: false,
        imageUrl: buhanif04,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Retail Standing Pouch Packaging Design (Front & Back Layout)',
      'Appetizing Crispy Mushroom Visual Presentation',
      'Nutrition Facts, Ingredients & Regulatory Label Integration (P-IRT & Halal MUI)',
      'Print-Ready Prepress Dieline & Production Specifications'
    ],
    deliverablesEn: [
      'Retail Standing Pouch Packaging Design (Front & Back Layout)',
      'Appetizing Crispy Mushroom Visual Presentation',
      'Nutrition Facts, Ingredients & Regulatory Label Integration (P-IRT & Halal MUI)',
      'Print-Ready Prepress Dieline & Production Specifications'
    ],
    roadmap: [
      {
        id: 'buhan-pack-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Snack Market Research & Packaging Dimension Audit',
        titleEn: 'Snack Market Research & Packaging Dimension Audit',
        subtitle: 'Standing Pouch Sizing, Shelf Impact & Regulatory Legal Review',
        description: 'Analyzed competitive local snack packaging, retail shelf visibility, and Indonesian food regulation standards (P-IRT and Halal MUI compliance requirements) using Google AI Studio and Gemini for rapid research synthesis.',
        descriptionEn: 'Analyzed competitive local snack packaging, retail shelf visibility, and Indonesian food regulation standards (P-IRT and Halal MUI compliance requirements) using Google AI Studio and Gemini for rapid research synthesis.',
        deliverables: ['Packaging Creative Brief & Positioning', 'Standing Pouch Dieline Dimensional Blueprint', 'Legal & Regulatory Compliance Checklist (P-IRT / Halal)'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'buhan-pack-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Front & Back Artwork Hierarchy and Visual Identity',
        titleEn: 'Front & Back Artwork Hierarchy and Visual Identity',
        subtitle: 'Appetite Appeal, Logo Architecture & Typography Harmony',
        description: 'Developed vibrant brand identity assets, golden crispy mushroom appetizing focal points, modern typography hierarchy, and a natural green and warm gold color scheme reflecting organic freshness.',
        descriptionEn: 'Developed vibrant brand identity assets, golden crispy mushroom appetizing focal points, modern typography hierarchy, and a natural green and warm gold color scheme reflecting organic freshness.',
        deliverables: ['Custom Brand Logotype & Badge Assets', 'Appetizing Product Visual Composition', 'Front-of-Pack Visual System'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'buhan-pack-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Technical Back-Panel Composition & Nutrition Facts',
        titleEn: 'Technical Back-Panel Composition & Nutrition Facts',
        subtitle: 'Ingredients Table, Net Weight, Barcode & Storage Instructions',
        description: 'Constructed the comprehensive back-of-pack information architecture, structuring ingredients composition, nutrition facts panel, certified P-IRT numbering, Halal MUI certification mark, and manufacturer origin details.',
        descriptionEn: 'Constructed the comprehensive back-of-pack information architecture, structuring ingredients composition, nutrition facts panel, certified P-IRT numbering, Halal MUI certification mark, and manufacturer origin details.',
        deliverables: ['Back-of-Pack Nutrition Facts & Composition Layout', 'Legal Certification Badges (P-IRT, Halal MUI)', 'EAN-13 Retail Barcode Integration'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'buhan-pack-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Print-Ready Prepress Preflight & 3D Retail Render',
        titleEn: 'Print-Ready Prepress Preflight & 3D Retail Render',
        subtitle: 'CMYK Separation, Bleed Margins & Final Production Handover',
        description: 'Executed industrial prepress preflight verification with 3mm bleed margins, crease calibration, and CMYK color profile management for rotogravure/digital pouch printing, along with photorealistic 3D retail mockups.',
        descriptionEn: 'Executed industrial prepress preflight verification with 3mm bleed margins, crease calibration, and CMYK color profile management for rotogravure/digital pouch printing, along with photorealistic 3D retail mockups.',
        deliverables: ['Print-Ready Vector Dieline Package (AI / PDF)', 'CMYK Color Separation Standards', '3D Photorealistic Pouch Presentation Spreads'],
        toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
        duration: 'Final Delivery',
        status: 'completed'
      }
    ]
  },
  {
    id: 'project-grand-pengajian-maulid-nabi-2026',
    code: '926',
    title: 'Grand Pengajian & Maulid Nabi 2026 — Event Teaser Video',
    titleEn: 'Grand Pengajian & Maulid Nabi 2026 — Event Teaser Video',
    category: 'motion',
    categoryLabel: 'Motion Graphics & Video Editing',
    categoryLabelEn: 'Motion Graphics & Video Editing',
    tagBadge: 'MOTION GRAPHIC | EVENT TEASER VIDEO',
    badge: 'OFFICIAL EVENT TEASER',
    description: 'A short teaser video for the Pengajian Akbar commemorating Maulid Nabi Muhammad SAW and the Haul of Syaikh Muhammad Bahauddin An-Naqsyabandi at Pondok Pesantren Nurul Huda, Kajen, Pati.',
    descriptionEn: 'A short teaser video for the Pengajian Akbar commemorating Maulid Nabi Muhammad SAW and the Haul of Syaikh Muhammad Bahauddin An-Naqsyabandi at Pondok Pesantren Nurul Huda, Kajen, Pati.',
    overviewDescription: "Video editing and motion graphics for the Grand Pengajian & Maulid Nabi 2026 teaser, organized by Yayasan Nurul Huda Kajen Pati and held on Saturday, 29 August 2026. This 39-second teaser serves as an introduction to the event, presenting its title, date, venue, and featured speakers, and is built from event documentation photos and footage. Featured speakers: Habib Ali Zainal Abidin Assegaf (Maulid Nabi recitation), Habib Umar Muthohar, S.H. (Mau'idhah Hasanah), and KH Syarofuddin Ismail Qoimaz (Mau'idhah Hasanah).",
    overviewDescriptionEn: "Video editing and motion graphics for the Grand Pengajian & Maulid Nabi 2026 teaser, organized by Yayasan Nurul Huda Kajen Pati and held on Saturday, 29 August 2026. This 39-second teaser serves as an introduction to the event, presenting its title, date, venue, and featured speakers, and is built from event documentation photos and footage. Featured speakers: Habib Ali Zainal Abidin Assegaf (Maulid Nabi recitation), Habib Umar Muthohar, S.H. (Mau'idhah Hasanah), and KH Syarofuddin Ismail Qoimaz (Mau'idhah Hasanah).",
    tools: ['After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator', 'Motion Design', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Yayasan Nurul Huda Kajen Pati (Margoyoso, Pati, Central Java)',
    year: '2026',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#10b981',
    gradientBg: 'from-emerald-950 via-slate-900 to-teal-950',
    imageUrl: 'https://img.youtube.com/vi/fPfoqvN0Sio/maxresdefault.jpg',
    isPlaceholder: false,
    youtubeUrl: 'https://youtu.be/fPfoqvN0Sio',
    previewGridType: 'single',
    gallery: [
      {
        id: 'grand-pengajian-preview-1',
        title: 'Grand Pengajian & Maulid Nabi 2026 — Official Event Teaser & Speaker Announcement',
        titleEn: 'Grand Pengajian & Maulid Nabi 2026 — Official Event Teaser & Speaker Announcement',
        isPlaceholder: false,
        imageUrl: 'https://img.youtube.com/vi/fPfoqvN0Sio/maxresdefault.jpg',
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      '39-Second Event Teaser Video',
      'Animated Title & Speaker Announcement',
      'Motion Graphics from Documentation Photos',
      '16:9 Full HD Format for YouTube',
      'Published on YouTube'
    ],
    deliverablesEn: [
      '39-Second Event Teaser Video',
      'Animated Title & Speaker Announcement',
      'Motion Graphics from Documentation Photos',
      '16:9 Full HD Format for YouTube',
      'Published on YouTube'
    ],
    metrics: 'Official Event Teaser & Speaker Announcement',
    metricsEn: 'Official Event Teaser & Speaker Announcement',
    tags: ['#Motion Graphic', '#Event Teaser', '#Maulid Nabi', '#Pengajian Akbar', '#Video Editing'],
    roadmap: [
      {
        id: 'grand-pengajian-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Event Brief & Teaser Concept',
        titleEn: 'Event Brief & Teaser Concept',
        subtitle: 'Concept Definition, Information Flow & Documentation Assets',
        description: 'Defined the teaser concept, the information flow (title, date, venue, speakers), and collected documentation assets.',
        descriptionEn: 'Defined the teaser concept, the information flow (title, date, venue, speakers), and collected documentation assets.',
        deliverables: ['Teaser Concept', 'Information Flow', 'Asset Collection'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'grand-pengajian-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Identity & Typography',
        titleEn: 'Visual Identity & Typography',
        subtitle: 'Islamic-Themed Style, Typography & Layout Architecture',
        description: 'Designed an Islamic-themed visual style, title and speaker-name typography, and the event information layout.',
        descriptionEn: 'Designed an Islamic-themed visual style, title and speaker-name typography, and the event information layout.',
        deliverables: ['Title Typography', 'Speaker Name Layout', 'Color & Style Direction'],
        toolsUsed: ['Photoshop', 'Illustrator'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'grand-pengajian-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Motion Design & Editing',
        titleEn: 'Motion Design & Editing',
        subtitle: 'Motion Graphics Animation, Photo & Footage Transitions & Timeline Assembly',
        description: 'Animated the motion graphics, built transitions between photos and footage, and assembled the video timeline.',
        descriptionEn: 'Animated the motion graphics, built transitions between photos and footage, and assembled the video timeline.',
        deliverables: ['Motion Graphics', 'Photo & Footage Edit', 'Transitions'],
        toolsUsed: ['After Effects', 'Premiere Pro'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'grand-pengajian-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Sound, Export & Publishing',
        titleEn: 'Sound, Export & Publishing',
        subtitle: 'Audio Balancing, Full HD 1080p Rendering & YouTube Upload',
        description: 'Balanced the audio, rendered in 16:9 Full HD, and published to YouTube.',
        descriptionEn: 'Balanced the audio, rendered in 16:9 Full HD, and published to YouTube.',
        deliverables: ['Final 1080p Render', 'YouTube Upload'],
        toolsUsed: ['Premiere Pro', 'YouTube'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  },
  {
    id: 'nurulummah-graduation-motion',
    code: '434',
    title: 'Nurulummah 25Graduation — A Journey and Dreams',
    titleEn: 'Nurulummah 25Graduation — A Journey and Dreams',
    category: 'motion',
    categoryLabel: 'Motion Graphics & Video Editing',
    categoryLabelEn: 'Motion Graphics & Video Editing',
    tagBadge: 'Motion Graphic | Graduation Ceremony Video',
    description: 'Produksi video motion graphic bertema "A Journey and Dreams" untuk prosesi wisuda Nurulummah 25Graduation. Mengangkat narasi perjalanan perjuangan para wisudawan dari awal menuntut ilmu hingga melangkah menyongsong masa depan ("Welcome Dream", "Graduates, Ladies and Gentlemen") — memadukan kinetic typography, visual stage display bernuansa biru langit yang megah, compositing sinematik, dan sound design yang membangkitkan emosi haru dan bangga.',
    descriptionEn: 'Creative direction and motion graphic production for the Nurulummah 25Graduation ceremony titled "A Journey and Dreams". The video celebrates the transformative journey and aspirations of the graduates ("Welcome Dream", "Graduates, Ladies and Gentlemen") — combining dynamic kinetic typography, majestic sky-blue stage display graphics, cinematic pacing, and emotional orchestral sound design.',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator', 'Motion Design', 'Google AI Studio', 'Gemini', 'Claude (Anthropic)'],
    clientOrContext: 'Nurulummah Graduation',
    year: '2025',
    featured: true,
    aspectRatio: '16:9',
    accentColor: '#38bdf8',
    gradientBg: 'from-sky-950 via-slate-900 to-indigo-950',
    imageUrl: nurulummahCover,
    isPlaceholder: false,
    youtubeUrl: 'https://youtu.be/RTE7AFaD7fE',
    behanceUrl: 'https://www.behance.net/ardiulinnuha/',
    previewGridType: 'single',
    gallery: [
      {
        id: 'grad-preview-1',
        title: 'Nurulummah 25Graduation — A Journey and Dreams Cover & Visual System',
        titleEn: 'Nurulummah 25Graduation — A Journey and Dreams Cover & Visual System',
        isPlaceholder: false,
        imageUrl: nurulummahCover,
        aspectRatio: '16:9'
      }
    ],
    deliverables: [
      'Cinematic Graduation Motion Video',
      'Stage LED Backdrop & Opener',
      'Kinetic Typography ("Welcome Dream")',
      'Visual Identity & Lower Thirds Package',
      'High-Bitrate Broadcast Render Package'
    ],
    deliverablesEn: [
      'Cinematic Graduation Motion Video',
      'Stage LED Backdrop & Opener',
      'Kinetic Typography ("Welcome Dream")',
      'Visual Identity & Lower Thirds Package',
      'High-Bitrate Broadcast Render Package'
    ],
    metrics: 'Official Ceremony Video Opener & Stage Visuals',
    metricsEn: 'Official Ceremony Video Opener & Stage Visuals',
    tags: ['Motion Graphic', 'Graduation Ceremony', 'A Journey and Dreams', 'After Effects', 'Kinetic Typography'],
    roadmap: [
      {
        id: 'grad-step-1',
        stage: 'Planning',
        phaseNumber: '01',
        title: 'Theme Conception & Narrative Arc',
        titleEn: 'Theme Conception & Narrative Arc',
        subtitle: 'Creative Ideation for "A Journey and Dreams" & "Welcome Dream"',
        description: 'Brainstormed graduation ceremony thematic concepts, emotional narrative arcs, and visual reference moodboards using Google AI Studio and Gemini for rapid ideation and creative brief structuring.',
        descriptionEn: 'Brainstormed graduation ceremony thematic concepts, emotional narrative arcs, and visual reference moodboards using Google AI Studio and Gemini for rapid ideation and creative brief structuring.',
        deliverables: ['Narrative Treatment', 'Scene Storyboard', 'Ceremony Beat Sheet'],
        toolsUsed: ['Google AI Studio', 'Gemini', 'Notion', 'Milanote'],
        duration: 'Stage 1',
        status: 'completed'
      },
      {
        id: 'grad-step-2',
        stage: 'Design',
        phaseNumber: '02',
        title: 'Visual Identity & Sky-Blue Art Direction',
        titleEn: 'Visual Identity & Sky-Blue Art Direction',
        subtitle: 'Typography Layouts, Color System & 3D Emblem Elements',
        description: 'Drafted ceremonial voiceover prose, typographic pacing, and narrative message validation with Claude (Anthropic), followed by designing luminous sky-blue gradients, ceremonial emblems, and custom typographic layouts.',
        descriptionEn: 'Drafted ceremonial voiceover prose, typographic pacing, and narrative message validation with Claude (Anthropic), followed by designing luminous sky-blue gradients, ceremonial emblems, and custom typographic layouts.',
        deliverables: ['Event Style Guide', 'Stage LED Moodboards', 'Emblem Vector Assets'],
        toolsUsed: ['Claude (Anthropic)', 'Adobe Illustrator', 'Photoshop'],
        duration: 'Stage 2',
        status: 'completed'
      },
      {
        id: 'grad-step-3',
        stage: 'Development',
        phaseNumber: '03',
        title: 'Motion Design & Stage Compositing',
        titleEn: 'Motion Design & Stage Compositing',
        subtitle: 'Kinetic Motion Graphics, Light Rays & Multi-Screen Compositing',
        description: 'Animated high-impact title sequences, glowing particle clouds, and kinetic type transitions tailored for massive ultra-wide stage LED projections and online broadcast.',
        descriptionEn: 'Animated high-impact title sequences, glowing particle clouds, and kinetic type transitions tailored for massive ultra-wide stage LED projections and online broadcast.',
        deliverables: ['After Effects Motion Compositions', 'Stage LED Visual Loops', 'Opening Bumper'],
        toolsUsed: ['After Effects', 'Cinema 4D'],
        duration: 'Stage 3',
        status: 'completed'
      },
      {
        id: 'grad-step-4',
        stage: 'Deployment',
        phaseNumber: '04',
        title: 'Audio Scoring & Final Ceremony Delivery',
        titleEn: 'Audio Scoring & Final Ceremony Delivery',
        subtitle: 'Orchestral Sound Design Sync & YouTube Broadcast Mastering',
        description: 'Synchronized orchestral crescendo soundtracks with ceremonial voice-overs, color calibrated for wide LED gamuts, and mastered for YouTube streaming on the nurulummah TV channel.',
        descriptionEn: 'Synchronized orchestral crescendo soundtracks with ceremonial voice-overs, color calibrated for wide LED gamuts, and mastered for YouTube streaming on the nurulummah TV channel.',
        deliverables: ['Final Ceremonial Video Master', 'YouTube Broadcast Cut (nurulummah TV Channel)', 'Stage Playback Package'],
        toolsUsed: ['Adobe Premiere Pro', 'Audition'],
        duration: 'Stage 4',
        status: 'completed'
      }
    ]
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'adstart-fastwork',
    role: 'Creative Designer & Video Editor',
    roleEn: 'Creative Designer & Video Editor',
    company: 'Adstart Digital Kreatif',
    platform: 'Fastwork.id Freelance Platform',
    period: 'Mei 2022 – Agustus 2026',
    periodEn: 'May 2022 – August 2026',
    location: 'Makassar, Indonesia',
    type: 'Freelance',
    typeEn: 'Freelance',
    points: [
      'Klien UMKM dan ritel di platform Fastwork.id membutuhkan konten visual dan video promosi yang konsisten untuk bersaing di media sosial.',
      'Bertanggung jawab merancang banner promosi, sistem feed Instagram, video editing untuk YouTube/Reels/TikTok, iklan komersial, dan desain kemasan produk.',
      'Memproduksi aset visual end-to-end yang disesuaikan dengan kebutuhan setiap klien, dari konsep hingga file siap cetak/publikasi, dengan komunikasi aktif dan ketepatan waktu pengiriman.',
      'Menyelesaikan 15 pesanan untuk 13 klien dengan rating rata-rata 5.0; 2 klien memesan kembali, mencerminkan kualitas yang konsisten dan komunikasi yang jelas.'
    ],
    pointsEn: [
      'SME and retail clients on the Fastwork.id platform needed consistent visual content and promotional videos to compete on social media.',
      'Responsible for designing banners, Instagram feed systems, video editing for YouTube/Reels/TikTok, commercial ads, and product packaging design.',
      'Produced end-to-end visual assets tailored to each client\'s needs, from concept to print/publish-ready files, while maintaining active communication and on-time delivery.',
      'Delivered 15 orders for 13 clients with a 5.0 average rating; 2 clients rehired, reflecting consistent quality and clear communication.'
    ],
    highlightMetric: '15 Proyek • Rating 5.0/5.0 • 2 Repeat Clients',
    highlightMetricEn: '15 Projects • 5.0/5.0 Rating • 2 Repeat Clients',
    tags: ['Commercial Video Editing', 'Motion Graphics', 'Packaging & Label Design', 'Paid Social Content', 'Multi-Client Delivery']
  },
  {
    id: 'pt-razen-teknologi',
    role: 'Creative Content Creator',
    roleEn: 'Creative Content Creator',
    company: 'PT Razen Teknologi Indonesia',
    period: 'Maret 2023 – Februari 2025',
    periodEn: 'March 2023 – February 2025',
    location: 'Yogyakarta, Indonesia (On-site / Hybrid)',
    type: 'Paruh Waktu (Part-time)',
    typeEn: 'Part-time',
    points: [
      'Perusahaan membutuhkan konten visual dan materi presentasi yang konsisten untuk memperkuat eksistensi brand di media sosial dan di hadapan klien.',
      'Mengelola media sosial, produksi konten, identitas brand, materi presentasi, dan company profile interaktif.',
      'Memproduksi motion graphics dan video promosi untuk Instagram/TikTok, merancang sistem brand identity dan proposal bisnis, berkolaborasi menyusun copywriting dengan tim marketing, membangun PDF company profile interaktif, serta mengelola kalender konten dan alur produksi dari konsep hingga publikasi.',
      'PDF company profile interaktif berkontribusi langsung pada peningkatan akuisisi klien baru sebesar 15%, diiringi konsistensi brand dan engagement audiens yang lebih baik.'
    ],
    pointsEn: [
      'The company needed consistent visual content and presentation materials to strengthen its brand presence on social media and with clients.',
      'Managed social media, content production, brand identity, presentation materials, and an interactive company profile.',
      'Produced motion graphics and promotional videos for Instagram/TikTok, designed brand identity systems and business proposals, co-wrote copy with the marketing team, built an interactive company profile PDF, and managed the content calendar and production pipeline from concept to publication.',
      'The interactive company profile PDF directly contributed to a 15% increase in new client onboarding, alongside improved brand consistency and audience engagement.'
    ],
    highlightMetric: '+15% Kenaikan Konversi Klien Baru',
    highlightMetricEn: '+15% New Client Acquisition Boost',
    tags: ['Brand Identity Design', 'Motion & Video Production', 'Social Media Content', 'Pitch Deck Design', 'Content Planning & Analytics']
  }
];

export const ORGANIZATIONS_DATA: OrganizationItem[] = [
  {
    id: 'nurulummah-tv',
    role: 'MEMBER',
    roleEn: 'MEMBER',
    organization: 'Nurulummah TV',
    url: 'https://www.youtube.com/@nurulummahTV',
    badgeLabel: 'CREATIVE COMMUNITY',
    period: '2021 - Present',
    periodEn: '2021 - Present',
    description: 'Active contributor at Nurulummah TV, leading creative direction and motion graphics production for community broadcast and event content.',
    descriptionEn: 'Active contributor at Nurulummah TV, leading creative direction and motion graphics production for community broadcast and event content.',
    deliverables: [
      'Stage Creative Direction',
      'Motion Graphics Production',
      'LED Screen Visual Design',
      'Broadcast Team Management'
    ],
    deliverablesEn: [
      'Stage Creative Direction',
      'Motion Graphics Production',
      'LED Screen Visual Design',
      'Broadcast Team Management'
    ]
  },
  {
    id: 'google-developer',
    role: 'MEMBER',
    roleEn: 'MEMBER',
    organization: 'Google Developer',
    url: 'https://me.developers.google.com/u/ardiulinnuha',
    badgeLabel: 'TECH COMMUNITY',
    period: '2026 - Present',
    periodEn: '2026 - Present',
    description: 'Anggota aktif Google Developer, berpartisipasi dalam pembelajaran praktis seputar AI, cloud, dan tool pengembangan modern melalui certified badges dan program komunitas.',
    descriptionEn: 'Active member of Google Developer, engaging in hands-on learning across AI, cloud, and modern development tools through certified badges and community programs.',
    deliverables: [
      'Google Cloud & NVIDIA Community Badge',
      'Gemini Enterprise Agent Ready Certified',
      'Firebase Studio Developer Badge',
      'Google Cloud Innovator Recognition'
    ],
    deliverablesEn: [
      'Google Cloud & NVIDIA Community Badge',
      'Gemini Enterprise Agent Ready Certified',
      'Firebase Studio Developer Badge',
      'Google Cloud Innovator Recognition'
    ]
  },
  {
    id: 'digistar-club',
    role: 'MEMBER',
    roleEn: 'MEMBER',
    organization: 'Digistar Club',
    url: 'https://digistartelkom.id/',
    badgeLabel: 'TECH COMMUNITY',
    period: '2025 - Present',
    periodEn: '2025 - Present',
    description: 'Anggota aktif Digistar Club, komunitas resmi Telkom Indonesia yang menghubungkan talenta digital nasional untuk belajar, berkolaborasi, dan berkembang di bidang AI & Software, Digital Business, dan Cyber & IoT.',
    descriptionEn: 'Active member of Digistar Club, the official Telkom Indonesia community connecting digital talents nationwide to learn, collaborate, and grow across AI & Software, Digital Business, and Cyber & IoT.',
    deliverables: [
      'Digital Talent Development Program',
      'AI & Software Learning Track',
      'Industry Networking & Collaboration',
      'National Digital Ecosystem Contribution'
    ],
    deliverablesEn: [
      'Digital Talent Development Program',
      'AI & Software Learning Track',
      'Industry Networking & Collaboration',
      'National Digital Ecosystem Contribution'
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'google-ai-professional',
    title: 'Google AI Professional',
    issuer: 'Coursera & Google',
    issuerBadge: 'Google Certified',
    period: '2025 - 2026',
    issueDate: 'August 11, 2026',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    categoryLabelEn: 'Artificial Intelligence',
    description: 'A professional certification made up of 8 courses on applying AI to real workplace tasks: brainstorming, research, communication, content creation, data analysis, and vibe coding.',
    descriptionEn: 'A professional certification made up of 8 courses on applying AI to real workplace tasks: brainstorming, research, communication, content creation, data analysis, and vibe coding.',
    syllabus: 'A professional certification made up of 8 courses on applying AI to real workplace tasks: AI Fundamentals, AI for Brainstorming & Planning, AI for Research, Writing & Communicating, AI for Content Creation, Data Analysis, App Building, and App Deployment. The program covers brainstorming, research, communication, content creation, data analysis, and vibe coding. Learners build a portfolio of 20+ artifacts using AI and vibe code a custom AI solution, while learning to prompt effectively, evaluate outputs, and use AI tools responsibly.',
    syllabusEn: 'A professional certification made up of 8 courses on applying AI to real workplace tasks: AI Fundamentals, AI for Brainstorming & Planning, AI for Research, Writing & Communicating, AI for Content Creation, Data Analysis, App Building, and App Deployment. The program covers brainstorming, research, communication, content creation, data analysis, and vibe coding. Learners build a portfolio of 20+ artifacts using AI and vibe code a custom AI solution, while learning to prompt effectively, evaluate outputs, and use AI tools responsibly.',
    credentialType: 'Digital badge via Credly (issued by Coursera)',
    earningCriteria: 'Successfully completed all 8 courses in the Google AI Professional Certificate with a passing score of 80% or higher.',
    credentialUrl: 'https://www.credly.com/badges/43df9f94-a404-4140-9d93-6aaf8ef12d93',
    skillsAcquired: [
      'Generative AI Workflows',
      'Prompt Engineering',
      'AI for Content Creation',
      'Vibe Coding',
      'Responsible AI'
    ],
    competencies: [
      'AI Acumen',
      'Artificial Intelligence (AI)',
      'Prompt Engineering',
      'Responsible AI',
      'Vibe Coding',
      'AI for Brainstorming & Planning',
      'AI for Research & Insights',
      'AI for Writing & Communicating',
      'AI for Content Creation',
      'AI for Data Analysis'
    ]
  },
  {
    id: 'sanbercode-graphic-design',
    title: 'Graphic Design Intensive Bootcamp',
    issuer: 'Sanbercode',
    issuerBadge: 'Bootcamp Graduate',
    period: '2024',
    category: 'motion_design',
    categoryLabel: 'Graphic Design',
    categoryLabelEn: 'Graphic Design',
    description: 'Penguasaan tingkat lanjut Adobe Illustrator & Photoshop: manajemen layer kompleks, manipulasi gambar foto realistis, tipografi komersial, masking, dan ekspor aset industri.',
    descriptionEn: 'Advanced mastery of Adobe Illustrator and Photoshop: complex layers, photo manipulation, vector illustration, masking, color grading, and print production specs.',
    credentialUrl: 'https://sanbercode.com/certificate/in/a7004173-55c9-4f7a-9fbd-d4c222aff587',
    skillsAcquired: ['Adobe Photoshop', 'Adobe Illustrator', 'Photo Manipulation', 'Commercial Typography', 'Asset Export Optimization']
  },
  {
    id: 'hellomotion-motion-graphic',
    title: 'Motion Graphic Artist',
    fullTitle: 'Motion Graphic Artist (Fresh Graduate Academy DTS)',
    issuer: 'Digital Literacy Dev Center x Hellomotion Academy',
    issuerBadge: '92-Hour Certified',
    period: '',
    category: 'motion_design',
    categoryLabel: 'Motion Graphics',
    categoryLabelEn: 'Motion Graphics',
    description: 'Pelatihan komprehensif 92 jam mengenai prinsip dasar animasi motion graphics, 2D vector animation, kinetic typography, editing video, dan storytelling visual bersama instruktur Hellomotion Academy.',
    descriptionEn: 'Comprehensive 92-hour professional training covering 12 principles of animation, 2D motion graphics, kinetic typography, video pacing, and visual storytelling.',
    credentialUrl: 'https://drive.google.com/file/d/1oyj9xw93xEED4qgiG2eT2IKNAed8SchA/view?usp=sharing',
    skillsAcquired: ['After Effects Animation', 'Kinetic Typography', 'Keyframing & Graph Editor', 'Visual Rhythm & Pacing']
  },
  {
    id: 'kominfo-video-creator',
    title: 'Video Content Creator',
    fullTitle: 'Video Content Creator (Digital Talent Scholarship 2025)',
    issuer: 'Kementerian Komunikasi dan Digital (Kominfo)',
    issuerBadge: 'Kominfo DTS 2025',
    period: '',
    category: 'motion_design',
    categoryLabel: 'Video & Media Production',
    categoryLabelEn: 'Video & Media Production',
    description: 'Pelatihan intensif perencanaan konten video, teknik pengambilan gambar (filming/camera angles), editing video profesional, dan strategi publikasi konten digital lintas platform.',
    descriptionEn: 'Intensive training in video content strategy, cinematic filming techniques, professional NLE video editing, and multi-platform digital distribution tactics.',
    credentialUrl: 'https://drive.google.com/file/d/187FsRuO-bw3KSHAilNl2NOhxJQhXKGTf/view?usp=sharing',
    skillsAcquired: ['Video Production', 'Color Grading & Audio Sync', 'Visual Storytelling', 'Content Publishing Strategy']
  },
  {
    id: 'sanbercode-uiux',
    title: 'UI/UX Design Intensive Bootcamp',
    issuer: 'Sanbercode',
    issuerBadge: 'Bootcamp Graduate',
    period: '2024',
    category: 'uiux',
    categoryLabel: 'UI/UX & Product Design',
    categoryLabelEn: 'UI/UX & Product Design',
    description: 'Design Thinking methodology, user research, low & high fidelity wireframing, interactive prototyping di Figma, usability testing, visual hierarchy, typography, dan teori warna.',
    descriptionEn: 'Design Thinking methodology, user research, wireframing, Figma prototyping, usability testing, accessibility, visual design tokens, and modern color theory.',
    credentialUrl: 'https://sanbercode.com/certificate/in/4d089151-c552-4d3f-a847-ebe099c0b91a',
    skillsAcquired: ['Figma Prototyping', 'User Research', 'Design Systems', 'Usability Testing']
  },
  {
    id: 'cisco-it-essentials',
    title: 'IT Essentials: Hardware & OS',
    issuer: 'Cisco Networking Academy',
    issuerBadge: 'Cisco Verified',
    period: '2023',
    category: 'it_network',
    categoryLabel: 'IT & Computing',
    categoryLabelEn: 'IT & Computing',
    description: 'Fondasi arsitektur perangkat keras komputer, instalasi OS Windows/Linux/macOS, troubleshooting sistemik, virtualisasi, dan cloud computing dasar.',
    descriptionEn: 'Computer hardware architecture, OS installation and configuration across Windows/Linux/macOS, hardware diagnostics, virtualization, and foundational cloud principles.',
    credentialUrl: 'https://www.credly.com/badges/2c54d151-cdd5-441f-b23b-1430b15da8ae',
    skillsAcquired: ['Computer Hardware', 'Operating Systems (Win/Linux/Mac)', 'Hardware Diagnostics', 'Cloud Virtualization']
  },
  {
    id: 'cisco-ccna-intro',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    issuerBadge: 'Cisco Verified',
    period: '2023',
    category: 'it_network',
    categoryLabel: 'Networking & Infrastructure',
    categoryLabelEn: 'Networking & Infrastructure',
    description: 'Konsep protokol jaringan komputer, model OSI dan TCP/IP, pengalamatan IPv4 & IPv6, switching, routing dasar, dan konfigurasi perangkat Cisco IOS.',
    descriptionEn: 'Computer networking protocols, OSI & TCP/IP models, IPv4/IPv6 addressing, subnetting, Ethernet switching, static routing, and Cisco IOS configuration.',
    credentialUrl: 'https://www.credly.com/badges/a6a81ed1-5d05-4138-bb82-85151deda4ab',
    skillsAcquired: ['Network Topologies', 'TCP/IP & OSI Models', 'IPv4 / IPv6 Subnetting', 'Routing & Switching']
  },
  {
    id: 'dicoding-frontend',
    title: 'DBS Foundation Coding Camp',
    issuer: 'DBS Foundation x Dicoding Indonesia',
    issuerBadge: 'DBS x Dicoding',
    period: '2026',
    category: 'web',
    categoryLabel: 'Web Development',
    categoryLabelEn: 'Web Development',
    description: 'Pelatihan full-stack web development komprehensif mencakup fundamental front-end, pemrograman JavaScript, dan pengembangan soft skills sebagai bagian dari program Road to Future Workforce DBS Foundation.',
    descriptionEn: 'Comprehensive full-stack web development training covering front-end fundamentals, JavaScript programming, and soft skills development, as part of DBS Foundation\'s Road to Future Workforce program.',
    credentialUrl: 'https://www.dicoding.com/users/ardiulinnuha/academies',
    skillsAcquired: ['Front-End Web Development', 'JavaScript Programming', 'Soft Skill Development']
  },
  {
    id: 'microsoft-elevate',
    title: 'Microsoft Elevate Training Center',
    fullTitle: 'Microsoft Elevate Training Center (Fabric & Azure AI)',
    issuer: 'Microsoft',
    issuerBadge: 'Microsoft Indonesia',
    period: '',
    category: 'ai',
    categoryLabel: 'Cloud & AI Engineering',
    categoryLabelEn: 'Cloud & AI Engineering',
    description: 'Pelatihan intensif 14 jam penerapan Data Science menggunakan Microsoft Fabric dan pengembangan aplikasi Generative AI cerdas dengan layanan Microsoft Azure.',
    descriptionEn: '14-hour intensive training in applied Data Science with Microsoft Fabric and engineering Generative AI solutions using Microsoft Azure cloud services.',
    credentialUrl: 'https://www.dicoding.com/elevate/certificates/PREJRWTRX1',
    skillsAcquired: ['Microsoft Fabric Data Science', 'Azure Generative AI Services', 'Cloud AI Solutions', 'Data Pipelines']
  }
];

export const AWARDS_DATA: AwardItem[] = [
  {
    id: 'pijak-future-tech-award',
    title: 'Top #19 The Future of Tech',
    titleEn: 'Top #19 The Future of Tech',
    issuer: 'Pijak Career Dicoding Indonesia',
    date: 'Oct 2026',
    description: 'Ranked in the prestigious Top 19 talent cohort for future tech innovation and high-impact digital industry readiness.',
    descriptionEn: 'Ranked in the prestigious Top 19 talent cohort for future tech innovation and high-impact digital industry readiness.',
    iconName: 'Trophy',
    credentialUrl: 'https://pijak-career-fair.dicoding.com/u/dc_5119913'
  },
  {
    id: 'createch-award',
    title: 'CREATech Future Talents 2026',
    titleEn: 'CREATech Future Talents 2026',
    issuer: 'Kementerian Ekonomi Kreatif RI',
    date: 'Sep 2026',
    description: 'Ranked among the Top 30 best participants in CREATech Future Talents 2026 by the Ministry of Creative Economy of Indonesia (Final Project Track AI, Batch 1).',
    descriptionEn: 'Ranked among the Top 30 best participants in CREATech Future Talents 2026 by the Ministry of Creative Economy of Indonesia (Final Project Track AI, Batch 1).',
    iconName: 'Sparkles',
    credentialUrl: 'https://www.instagram.com/p/DdTQAIVlE8E/'
  },
  {
    id: 'hacktiv8-msme-ai-award',
    title: 'Boosting MSME Growth through AI',
    titleEn: 'Boosting MSME Growth through AI',
    issuer: 'Hacktiv8 Indonesia',
    date: 'Dec 2025',
    description: 'Completed the Maju Bareng AI program by Hacktiv8 Indonesia, part of the AI Opportunity Fund: Asia Pacific in collaboration with AVPN, Google.org, and the Asian Development Bank — focused on leveraging AI to drive MSME growth.',
    descriptionEn: 'Completed the Maju Bareng AI program by Hacktiv8 Indonesia, part of the AI Opportunity Fund: Asia Pacific in collaboration with AVPN, Google.org, and the Asian Development Bank — focused on leveraging AI to drive MSME growth.',
    iconName: 'GraduationCap',
    credentialUrl: 'https://students.hacktiv8.com/certificates/22387932-7aaa-4485-8af0-b673e35d6e5e'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'creative-video',
    title: 'Video & Motion Design',
    titleEn: 'Video & Motion Design',
    icon: 'Film',
    description: 'Produksi video dinamis, editing berkecepatan tinggi, kinetic typography, dan animasi 2D.',
    descriptionEn: 'Dynamic video production, high-retention editing, kinetic typography, and 2D animations.',
    skills: [
      {
        name: 'Adobe Premiere Pro',
        level: 95,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Software standar industri untuk editing video non-linear, audio mixing, dan perakitan timeline komersial.',
        descriptionEn: 'Industry-standard non-linear video editing suite for commercials, brand films, and social reels.',
        workflow: 'Editing multi-kamera, pacing ritmis berkecepatan tinggi, audio ducking, dan perakitan master video komersial.',
        workflowEn: 'Multi-cam editing, fast turnaround rhythmic pacing, dynamic audio ducking, and commercial master video assembly.'
      },
      {
        name: 'Adobe After Effects',
        level: 92,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Pembuatan grafis bergerak tingkat lanjut, efek visual (VFX), compositing, dan animasi logo.',
        descriptionEn: 'Advanced motion graphics, VFX compositing, dynamic camera animation, and kinetic brand assets.',
        workflow: 'Keyframe curve animation, kinetic typography kompleks, compositing VFX, serta visual identitas bergerak.',
        workflowEn: 'Keyframe curve animation, complex kinetic typography, VFX compositing, and animated brand identity packages.'
      },
      {
        name: 'Motion Graphics & Kinetic Typography',
        level: 90,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Seni animasi teks dan elemen grafis untuk meningkatkan retensi penonton dan daya tarik visual promosi.',
        descriptionEn: 'Art of animating expressive typography and visual elements to maximize viewer retention and marketing punch.',
        workflow: 'Perancangan hook visual sosial media, tipografi kinetik berdaya pikat tinggi, dan lower thirds broadcast.',
        workflowEn: 'Crafting high-retention social media hooks, dynamic kinetic type systems, and broadcast lower thirds.'
      },
      {
        name: 'Video Color Grading & Audio Pacing',
        level: 88,
        badge: 'Proficient',
        description: 'Penyelarasan warna sinematik dan penyuntingan audio ritmis untuk membangun emosi dan mood cerita.',
        descriptionEn: 'Cinematic color correction, mood grading, and rhythmic sound design to elevate emotional engagement.',
        workflow: 'Koreksi warna Lumetri, styling tone sinematik, spectral audio cleaning, dan sinkronisasi beat musik.',
        workflowEn: 'Lumetri color correction, cinematic tone styling, spectral audio cleanup, and beat-matched pacing.'
      },
      {
        name: 'Short-Form Reels/TikTok Ads Optimization',
        level: 95,
        badge: 'Expert',
        isPrimary: true,
        description: 'Strategi produksi dan format konten video pendek 9:16 untuk memaksimalkan retensi dan rasio konversi.',
        descriptionEn: 'Strategic production and formatting of 9:16 short-form video ads engineered for viral retention and conversions.',
        workflow: 'Optimasi hook 3 detik awal, rasio 9:16 safe margins, subtitle dinamis, dan struktur CTA dengan retensi tinggi.',
        workflowEn: '3-second hook optimization, 9:16 safe zone compliance, dynamic captioning, and high-retention CTA frameworks.'
      }
    ]
  },
  {
    id: 'graphic-branding',
    title: 'Graphic Design & Brand Identity',
    titleEn: 'Graphic Design & Brand Identity',
    icon: 'Palette',
    description: 'Komposisi visual tajam, manipulasi foto, sistem branding terpadu, dan desain kemasan.',
    descriptionEn: 'Sharp visual composition, photo manipulation, brand guidelines, and packaging dielines.',
    skills: [
      {
        name: 'Adobe Photoshop',
        level: 94,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Pengolahan citra digital raster, komposisi multi-layer, digital imaging, dan retouching foto profesional.',
        descriptionEn: 'Raster digital imaging, high-end photo retouching, multi-layer key visual composition, and print preparation.',
        workflow: 'Manipulasi foto presisi tinggi, komposisi multi-layer, digital imaging, dan visual promosi siap cetak & digital.',
        workflowEn: 'Precision photo manipulation, multi-layer digital imaging, high-fidelity mockups, and cross-channel key visuals.'
      },
      {
        name: 'Adobe Illustrator',
        level: 92,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Pembuatan ilustrasi vektor resolusi bebas batas, desain logo korporat, ikonografi, dan grafis cetak.',
        descriptionEn: 'Scalable vector illustration, corporate logo design, iconography systems, and precision typography.',
        workflow: 'Konstruksi vektor geometris, desain logo scalable, ikonografi kustom, dan pembuatan pola grafis korporat.',
        workflowEn: 'Geometric vector construction, scalable logo design, custom iconography systems, and brand pattern generation.'
      },
      {
        name: 'Adobe InDesign',
        level: 90,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Tata letak editorial profesional untuk buku, majalah, katalog produk, proposal bisnis, dan company profile.',
        descriptionEn: 'Professional editorial desktop publishing for books, catalogs, corporate profiles, and multi-page documents.',
        workflow: 'Tata letak publikasi multi-halaman, hierarki tipografi editorial, kontrol master page, dan persiapan prepress.',
        workflowEn: 'Multi-page publication layouts, editorial typography hierarchy, master page architectures, and prepress export.'
      },
      {
        name: 'Brand Identity & Logo Systems',
        level: 88,
        badge: 'Proficient',
        description: 'Perancangan identitas visual merek yang kohesif, filosofi logo, palet warna, tipografi, dan buku panduan merek.',
        descriptionEn: 'Cohesive brand identity architectures, logo philosophy, color harmony, typography systems, and brand guidelines.',
        workflow: 'Penyusunan brand guidelines komprehensif, standarisasi warna/font, serta variasi logo sekunder & monogram.',
        workflowEn: 'Comprehensive brand guideline manuals, color/font standardization, and responsive logo variations.'
      },
      {
        name: 'Packaging & Dieline Design',
        level: 86,
        badge: 'Proficient',
        description: 'Desain kemasan produk dengan perhitungan garis potong/lipat (dieline) presisi dan visualisasi mockup realistis.',
        descriptionEn: 'Packaging dieline engineering, print production separation (CMYK/Pantone), and photorealistic 3D product mockups.',
        workflow: 'Perhitungan garis pisau cetak (dieline), separasi warna CMYK/Pantone, serta visualisasi 3D mockup kemasan produk.',
        workflowEn: 'Print-ready dieline engineering, CMYK/Pantone separations, and realistic 3D product packaging mockups.'
      },
      {
        name: 'Interactive Company Profile & Deck',
        level: 92,
        badge: 'Expert',
        description: 'Perancangan dokumen profil perusahaan dan slide presentasi bisnis dengan navigasi digital interaktif.',
        descriptionEn: 'High-impact corporate decks and interactive digital brochures with hyperlinked navigation and visual hierarchy.',
        workflow: 'Perancangan pitch deck interaktif, navigasi tombol hyperlink, presentasi bisnis eksekutif, dan portofolio digital.',
        workflowEn: 'Interactive pitch decks, hyperlinked document navigation, executive business presentations, and digital profiles.'
      }
    ]
  },
  {
    id: 'uiux-web',
    title: 'UI/UX & Web Technologies',
    titleEn: 'UI/UX & Web Technologies',
    icon: 'Layout',
    description: 'Design thinking, prototyping antarmuka, wireframing, serta pemahaman front-end web modern.',
    descriptionEn: 'Design thinking, interactive prototyping, wireframing, and modern front-end web fundamentals.',
    skills: [
      {
        name: 'Figma & UI Prototyping',
        level: 86,
        badge: 'Proficient',
        isPrimary: true,
        description: 'Alat kolaboratif utama untuk perancangan antarmuka aplikasi/web, pembuatan design system, dan prototipe interaktif.',
        descriptionEn: 'Collaborative UI/UX workspace for design systems, responsive auto-layouts, and clickable interactive prototypes.',
        workflow: 'Pembangunan design system, auto-layout bersarang, komponen varian interaktif, dan handover developer terstruktur.',
        workflowEn: 'Atomic design systems, nested auto-layouts, interactive component variants, and structured developer handoff.'
      },
      {
        name: 'Design Thinking & User Research',
        level: 84,
        badge: 'Certified',
        description: 'Metodologi pemecahan masalah yang berpusat pada pengguna untuk menghasilkan solusi desain yang tepat sasaran.',
        descriptionEn: 'Human-centered problem solving methodology to uncover user needs, map journeys, and formulate validated solutions.',
        workflow: 'Wawancara empati pengguna, persona mapping, analisis user journey, dan perumusan problem statement berorientasi solusi.',
        workflowEn: 'Empathy user interviews, persona mapping, user journey analysis, and solution-oriented problem formulation.'
      },
      {
        name: 'Wireframing & Usability Testing',
        level: 85,
        badge: 'Proficient',
        description: 'Penyusunan kerangka struktur aplikasi (low/high fidelity) dan pengujian keterpakaian antarmuka kepada pengguna.',
        descriptionEn: 'Information architecture layouting, wireframe prototyping, heuristic evaluation, and iterative usability testing.',
        workflow: 'Eksplorasi wireframe low-fidelity hingga high-fidelity, usability heuristics testing, dan iterasi umpan balik cepat.',
        workflowEn: 'Low to high-fidelity wireframing, usability heuristic evaluations, and rapid feedback iteration cycles.'
      },
      {
        name: 'HTML5, CSS3 & Responsive Grid',
        level: 82,
        badge: 'Certified',
        description: 'Pondasi markup web semantik dan penataan gaya visual responsif modern untuk tampilan sempurna di semua perangkat.',
        descriptionEn: 'Semantic markup architecture and modern responsive styling (Flexbox/Grid) for clean cross-device rendering.',
        workflow: 'Struktur semantik HTML5, CSS Flexbox/Grid modern, prinsip mobile-first, dan konsistensi lintas layar perangkat.',
        workflowEn: 'Semantic HTML5 structure, modern CSS Flexbox/Grid, mobile-first design, and cross-device visual parity.'
      },
      {
        name: 'Modern Web APIs & JavaScript',
        level: 78,
        badge: 'Competent',
        description: 'Dasar pemrograman web dinamis, interaksi DOM interaktif, dan komunikasi data berbasis REST API.',
        descriptionEn: 'Client-side web scripting, DOM manipulation, asynchronous REST APIs consumption, and event-driven interactivity.',
        workflow: 'Manipulasi DOM dinamis, integrasi REST API asynchronous, event listeners interaktif, dan animasi web.',
        workflowEn: 'Dynamic DOM manipulation, asynchronous REST API integration, interactive event handling, and UI transitions.'
      }
    ]
  },
  {
    id: 'ai-creative-tech',
    title: 'AI & Creative Technology',
    titleEn: 'AI & Creative Technology',
    icon: 'Cpu',
    description: 'Workflow Generative AI bersertifikasi Google, rekayasa prompt, dan otomasi konten modern.',
    descriptionEn: 'Google-certified Generative AI workflows, advanced prompt engineering, and modern creative automation.',
    skills: [
      {
        name: 'Google AI Generative Suite',
        level: 92,
        badge: 'Google Certified',
        isPrimary: true,
        description: 'Pemanfaatan rangkaian alat AI generatif Google untuk riset ide, kreasi konten multimodal, dan efisiensi alur kerja.',
        descriptionEn: 'Enterprise Google Gen AI workflows for multimodal asset generation, strategic ideation, and automated synthesis.',
        workflow: 'Pemanfaatan model multimodal Google untuk sintesis aset kreatif, riset tren visual, dan automasi materi promosi.',
        workflowEn: 'Leveraging Google multimodal models for creative asset synthesis, trend analysis, and workflow automation.'
      },
      {
        name: 'Prompt Engineering (Text, Image, Video)',
        level: 90,
        badge: 'Expert',
        description: 'Teknik perumusan instruksi presisi untuk mengarahkan model AI menghasilkan output teks, visual, dan video berkualitas tinggi.',
        descriptionEn: 'Advanced prompt architecture with few-shot context, negative constraints, and structured styling parameters.',
        workflow: 'Strukturisasi prompt few-shot, parameter negatif, constraint persona, dan kontrol komposisi visual AI tingkat lanjut.',
        workflowEn: 'Few-shot prompt structuring, negative weighting, persona constraints, and advanced visual AI composition control.'
      },
      {
        name: 'Commercial AI Scriptwriting',
        level: 88,
        badge: 'Advanced',
        description: 'Penyusunan naskah video komersial dan materi iklan berdaya konversi tinggi menggunakan asistensi AI.',
        descriptionEn: 'Direct-response advertising script crafting, hook variations, and persuasive copy frameworks guided by AI.',
        workflow: 'Penyusunan naskah iklan persuasif, formulasi AIDA/PAS hook variations, dan kalibrasi tone-of-voice spesifik brand.',
        workflowEn: 'Persuasive advertising script drafting, AIDA/PAS hook iterations, and brand-specific tone-of-voice alignment.'
      },
      {
        name: 'Microsoft Azure AI & Fabric Basics',
        level: 80,
        badge: 'Certified',
        description: 'Pemahaman fundamental komputasi awan Microsoft, layanan AI kognitif, dan konsep analitik data modern.',
        descriptionEn: 'Core Microsoft Cloud AI services, cognitive intelligence endpoints, and unified enterprise analytics concepts.',
        workflow: 'Pemahaman ekosistem cloud AI, dasar pengolahan data analitik, dan implementasi layanan kognitif korporat.',
        workflowEn: 'Cloud AI ecosystem fundamentals, analytical data pipelines, and enterprise cognitive service awareness.'
      },
      {
        name: 'AI Augmented Video Production',
        level: 88,
        badge: 'Advanced',
        description: 'Integrasi alat kecerdasan buatan dalam tahapan pra-produksi, produksi, dan pasca-produksi video.',
        descriptionEn: 'End-to-end integration of AI tools for script brainstorming, automated subtitling, voice synthesis, and visual upscaling.',
        workflow: 'Sintesis b-roll berbasis AI, otomasi transkrip/subtitle cerdas, denoise audio AI, dan akselerasi turnaround render.',
        workflowEn: 'AI b-roll synthesis, smart speech-to-text subtitling, neural audio enhancement, and accelerated rendering.'
      }
    ]
  },
  {
    id: 'ai-tools-platforms',
    title: 'AI Tools & Platforms',
    titleEn: 'AI Tools & Platforms',
    icon: 'Bot',
    description: 'Pengalaman praktis dengan platform AI terdepan untuk creative workflow, prompt engineering, sintesis suara, dan asistensi pengembangan.',
    descriptionEn: 'Hands-on experience with leading AI platforms for creative workflows, prompting, voice generation, and development assistance.',
    skills: [
      {
        name: 'Google AI Studio',
        level: 94,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Lingkungan pengembangan dan eksperimen prompt untuk model Gemini, fine-tuning sistem, dan integrasi API.',
        descriptionEn: 'Interactive prototyping workspace for testing Gemini models, temperature tuning, and structured system prompts.',
        workflow: 'Prototyping cepat sistem instruksi, pengujian payload parameter model Gemini, dan evaluasi respon terstruktur.',
        workflowEn: 'Rapid system prompt tuning, Gemini parameter payload experimentation, and structured JSON output evaluation.'
      },
      {
        name: 'Gemini',
        level: 93,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Model AI multimodal mutakhir dari Google untuk penalaran konteks panjang, analisis gambar, dan riset mendalam.',
        descriptionEn: 'Google multimodal foundation model for deep reasoning, long-context document analysis, and strategic ideation.',
        workflow: 'Penalaran multimodal teks & gambar, eksplorasi ide kreatif lintas disiplin, dan riset mendalam berbasis web.',
        workflowEn: 'Multimodal image-text reasoning, cross-disciplinary creative ideation, and grounded web research synthesis.'
      },
      {
        name: 'Claude (Anthropic)',
        level: 88,
        badge: 'Proficient',
        description: 'Asisten AI dengan kemampuan penulisan prosa alami tingkat tinggi, analisis kode, dan penalaran kontekstual yang bernuansa.',
        descriptionEn: 'Advanced LLM by Anthropic renowned for nuanced writing, complex reasoning, and structured editorial drafting.',
        workflow: 'Penulisan narasi panjang berkualitas tinggi, pemecahan logika kompleks, serta kalibrasi gaya bahasa profesional.',
        workflowEn: 'Long-form editorial drafting, nuanced logical breakdown, code analysis, and high-fidelity professional prose.'
      },
      {
        name: 'ChatGPT',
        level: 88,
        badge: 'Proficient',
        description: 'Platform AI serbaguna dari OpenAI untuk eksplorasi ide cepat, pembuatan variasi copywriting, dan produktivitas harian.',
        descriptionEn: 'Versatile AI assistant for rapid copy variations, brainstorm framing, and daily creative workflow optimization.',
        workflow: 'Brainstorming variasi sudut pandang konten, penyusunan daftar kerja operasional, dan otomasi copywriting cepat.',
        workflowEn: 'Creative angle brainstorming, operational checklist generation, and rapid copy variation drafting.'
      },
      {
        name: 'ElevenLabs',
        level: 86,
        badge: 'Proficient',
        description: 'Platform sintesis suara AI generatif terkemuka untuk menghasilkan sulih suara (voiceover) alami dan emosional.',
        descriptionEn: 'Pioneering generative AI voice engine for emotional, studio-quality multilingual text-to-speech voiceovers.',
        workflow: 'Sintesis voiceover natural multilingual, pengaturan kestabilan emosi vokal, dan audio narration bermutu komersial.',
        workflowEn: 'Multilingual natural voice synthesis, emotional inflection stability tuning, and commercial audio narration.'
      },
      {
        name: 'AI-Assisted Development Workflow',
        level: 95,
        badge: 'Expert',
        isPrimary: true,
        description: 'Penerapan alat AI coding untuk mempercepat pembuatan prototipe aplikasi web, debugging, dan refactoring kode.',
        descriptionEn: 'Pair programming workflows with generative AI to scaffold web components, troubleshoot errors, and optimize code.',
        workflow: 'Pair programming berbasis AI, pembuatan modul cepat, inspeksi bug otomatis, dan optimalisasi arsitektur kode web.',
        workflowEn: 'AI pair programming, rapid boilerplate scaffolding, automated bug diagnosis, and front-end code refactoring.'
      }
    ]
  },
  {
    id: 'content-broadcast',
    title: 'Content Strategy & Soft Skills',
    titleEn: 'Content Strategy & Soft Skills',
    icon: 'Radio',
    description: 'Perencanaan kalender editorial, copywriting persuasif, live broadcast, manajemen relasi klien, dan kolaborasi tim.',
    descriptionEn: 'Content calendar planning, persuasive copywriting, live broadcasting, client communication, and cross-functional leadership.',
    skills: [
      {
        name: 'Content Calendar & Strategy',
        level: 90,
        badge: 'Advanced',
        description: 'Perancangan jadwal publikasi konten terstruktur yang selaras dengan tujuan bisnis, pilar konten, dan tren audiens.',
        descriptionEn: 'Strategic content calendar mapping aligned with business KPIs, thematic pillars, and audience analytics.',
        workflow: 'Perencanaan pilar konten bulanan, jadwal rilis lintas platform (Instagram/TikTok/YouTube), dan analisis performa.',
        workflowEn: 'Monthly content pillar planning, cross-platform scheduling (IG/TikTok/YT), and analytics-driven content tuning.'
      },
      {
        name: 'Copywriting & Social Captions',
        level: 88,
        badge: 'Proficient',
        description: 'Penulisan teks pemasaran persuasif, judul pemancing klik yang etis, dan narasi media sosial yang menggerakkan aksi.',
        descriptionEn: 'Crafting high-conversion sales copy, ethical click-worthy hooks, and engaging social storytelling captions.',
        workflow: 'Penulisan headline pemantik atensi, micro-copy pemicu interaksi, dan storytelling merek yang konsisten.',
        workflowEn: 'Attention-grabbing headlines, interaction-focused microcopy, and authentic brand storytelling captions.'
      },
      {
        name: 'Live Broadcast Operation',
        level: 85,
        badge: 'Experienced',
        description: 'Pengoperasian siaran langsung teknis multi-kamera, integrasi grafik real-time, dan manajemen audio live streaming.',
        descriptionEn: 'Technical live stream production, OBS/vMix multi-camera switching, real-time overlays, and audio feed control.',
        workflow: 'Manajemen switching multi-kamera OBS/vMix, penempatan lower third real-time, dan monitoring audio siaran langsung.',
        workflowEn: 'OBS/vMix multi-camera switching, real-time live overlay integration, and broadcast audio monitoring.'
      },
      {
        name: 'Creative Direction & Leadership',
        level: 88,
        badge: 'Proven',
        description: 'Memimpin visi artistik proyek kreatif dari konsep awal hingga eksekusi akhir serta membimbing kolaborator tim.',
        descriptionEn: 'Steering high-level creative vision from briefing to final delivery while mentoring designers and media creators.',
        workflow: 'Penyelarasan visi kreatif proyek, perumusan creative brief terarah, evaluasi mutu karya, dan mentoring tim kreatif.',
        workflowEn: 'Creative vision alignment, actionable brief formulation, milestone quality reviews, and design mentoring.'
      },
      {
        name: 'Microsoft Office & Presentation',
        level: 92,
        badge: 'Expert',
        description: 'Penguasaan Word, Excel, dan PowerPoint untuk penyusunan dokumentasi resmi, analisis data, dan presentasi eksekutif.',
        descriptionEn: 'Advanced proficiency in MS Office suite for corporate reporting, data organization, and executive presentations.',
        workflow: 'Penyusunan laporan bisnis terstruktur di Word/Excel serta desain slide presentasi eksekutif di PowerPoint.',
        workflowEn: 'Structured corporate reporting in Word/Excel and high-impact executive presentation slide design in PowerPoint.'
      },
      {
        name: 'Client Communication & Relationship Management',
        level: 92,
        badge: 'Advanced',
        isPrimary: true,
        description: 'Komunikasi proaktif dengan klien, penerjemahan kebutuhan teknis, negosiasi ekspektasi, dan menjaga kepuasan jangka panjang.',
        descriptionEn: 'Proactive stakeholder communication, requirement scoping, expectation management, and long-term client satisfaction.',
        workflow: 'Penggalian kebutuhan klien secara transparan, update progres berkala, pengelolaan ekspektasi, dan retensi klien jangka panjang.',
        workflowEn: 'Transparent client requirement discovery, periodic milestone updates, expectation setting, and long-term trust.'
      },
      {
        name: 'Time Management & Multi-Project Handling',
        level: 91,
        badge: 'Advanced',
        description: 'Kemampuan mengelola beberapa proyek secara bersamaan, menetapkan prioritas, dan menyelesaikan deadline tepat waktu.',
        descriptionEn: 'Rigorous task prioritization, multi-project timeline orchestration, and dependable on-schedule delivery.',
        workflow: 'Prioritas tugas berbasis urgensi/dampak, pengelolaan multiple deadline secara paralel, dan eksekusi proyek tepat waktu.',
        workflowEn: 'Impact-based task prioritization, parallel multi-client deadline management, and on-time deliverable execution.'
      },
      {
        name: 'Problem Solving & Creative Adaptability',
        level: 89,
        badge: 'Proficient',
        description: 'Ketangkasan berpikir kritis untuk mengatasi kendala teknis dan beradaptasi cepat dengan perubahan arahan kreatif.',
        descriptionEn: 'Analytical agility to resolve technical bottlenecks and swiftly adapt to shifting design requirements.',
        workflow: 'Penanganan revisi mendadak dengan solusi cepat, adaptasi gaya visual sesuai target audiens, dan fleksibilitas teknis.',
        workflowEn: 'Rapid pivot solutions during crunch revisions, swift visual adaptability to target niches, and technical agility.'
      },
      {
        name: 'Team Collaboration',
        level: 88,
        badge: 'Proficient',
        description: 'Bekerja secara sinergis dalam tim multidisiplin dengan komunikasi terbuka, empati, dan komitmen pada kualitas bersama.',
        descriptionEn: 'Effective cross-functional synergy with copywriters, developers, and project managers towards unified quality.',
        workflow: 'Sinkronisasi aktif bersama desainer, videografer, dan pemangku kepentingan untuk kesatuan visi output akhir.',
        workflowEn: 'Active cross-functional synchronization with designers, videographers, and stakeholders for cohesive delivery.'
      },
      {
        name: 'Attention to Detail & Quality Control',
        level: 96,
        badge: 'Expert',
        isPrimary: true,
        description: 'Ketelitian tinggi dalam memeriksa setiap detail grafis, tipografi, warna, dan kesesuaian format sebelum pengiriman akhir.',
        descriptionEn: 'Meticulous pre-flight inspection of typography, alignment, color consistency, and export specifications.',
        workflow: 'Pemeriksaan ketat tipografi, margin, konsistensi warna, validasi format render, dan checklist mutu sebelum pengiriman akhir.',
        workflowEn: 'Rigorous pre-delivery QC checking typography, margins, color fidelity, export rendering, and brief specs compliance.'
      }
    ]
  }
];
