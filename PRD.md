# Product Requirements Document (PRD)
## Ardi Ulinnuha Portfolio & Creative Technologist Platform

---

## 1. Product Overview

### 1.1 Product Name & Ownership
- **Product Name:** Ardi Ulinnuha Portfolio Platform (also referred to as Ardi Ulinnuha Creative Technologist & Digital Showcase)
- **Product Owner:** Ardi Ulinnuha (Informatics Graduate, Creative Technologist, Video Editor, Brand & Creative Designer, Google AI Certified)
- **Email:** ardi.razen@gmail.com
- **Phone:** +62 852 3640 2997

### 1.2 Purpose & Mission
The platform serves as a high-performance personal web platform and digital portfolio that showcases Ardi Ulinnuha’s multidisciplinary work across video editing, motion graphics, branding, packaging, UI/UX design, and AI-assisted workflows. It provides recruiters, agency leads, creative directors, and prospective clients with verifiable proof of competence, client impact, educational background, professional credentials, and direct communication channels.

### 1.3 Value Proposition
- **Hybrid Domain Competence:** Unifies Computer Science/Informatics engineering fundamentals with creative multimedia direction (Adobe Creative Cloud + modern Generative AI tooling).
- **Verifiable Credibility:** Direct links to verified credentials (Coursera, Credly, Sanbercode, Cisco, Dicoding, Google Developers, Microsoft), client platform ratings (Fastwork 5.0/5.0), and official QR-based document authenticity verification (`/result/:id`).
- **Deep Production Transparency:** 4-stage interactive project roadmap breakdowns (Planning, Design, Development, Deployment), tool stacks, key deliverables, and metric-based client outcomes.
- **Zero-Latency Audio & Interaction Engine:** Zero-network-payload client-side sound effects engine using Web Audio API synthesis and responsive micro-interactions.
- **Intellectual Property Protection:** Client-side content and asset protection preventing casual media scraping, right-click copying, and unauthorized reproduction.

### 1.4 Goals & Success Metrics
- **Recruitment Conversion:** Fast access to CV milestones, education, verified certificates, and role-based deliverables for agency and corporate recruiters.
- **Client Inquiry Generation:** Streamlined contact pipeline via dynamic WhatsApp message builder and mailto generator.
- **Authenticity Assurance:** Rapid instant verification of printed/digital certificates or letters bearing Ardi Ulinnuha's verification QR code.
- **Performance & Usability Benchmarks:**
  - Sub-second first contentful paint (FCP) via code-splitting below-the-fold components and prefetching.
  - Clean URL routing for standalone project deep links (`/{code}`).
  - 100% functional fallback for non-JavaScript or restricted browser features.

---

## 2. Target Audience & Use Cases

### 2.1 User Personas
1. **Design Directors & Creative Agency Leads:**
   - Look for motion design timing, video editing rhythm, branding depth, dieline/packaging execution, and multi-asset consistency.
   - *Goal:* Evaluate creative execution, software tool proficiency, and past commercial project artifacts.
2. **Technical Recruiters & HR Specialists:**
   - Look for educational pedigree (S1 Informatika, Amikom Yogyakarta), verified certifications (Google AI Professional, Cisco, Dicoding, DTS Kominfo), and employment stability.
   - *Goal:* Verify candidate qualifications, download/view credentials, and check "Available for Work" status.
3. **SME Owners & Direct Business Clients:**
   - Look for business impact (e.g. +15% client acquisition with pitch decks, packaging design that drives retail shelf presence), pricing or project scope suitability, and reviews.
   - *Goal:* Review relevant case studies and initiate immediate discussion via WhatsApp or email.
4. **Event Organizers & Certificate Verifiers:**
   - Scan physical or digital document QR codes pointing to `/result/:id`.
   - *Goal:* Instantly confirm whether an official statement or document was genuinely signed and issued by Ardi Ulinnuha.

### 2.2 Core Use Cases
| Persona | User Intent / Action | Expected System Response |
| :--- | :--- | :--- |
| Client | Explore packaging or video work | Filters portfolio by category or searches keyword; views full asset spreads in modal |
| Recruiter | Verify academic & professional standing | Clicks external verification links to Credly, Coursera, or Dicoding; opens certificate detail modal |
| Client | Inquire about project rates/availability | Fills name and message in contact form; clicks "Send via WhatsApp" with pre-composed message |
| Verifier | Scans QR code on signed statement letter | Lands on `/result/:id` route; system reads ID from path and displays verified document record |
| Visitor | Deep-link to specific project (e.g. `/856`) | System immediately opens the project modal for code 856 with title updated in browser tab |

---

## 3. Site Map & Page Structure

The application functions as a Single-Page Application (SPA) with dual routing modes:
1. **Root Showcase Route (`/`):** Full single-page narrative with lazy-loaded sections and deep-linked project modals (`/{code}`).
2. **Document Verification Route (`/result/:id`):** Independent document verification landing page rendered when the URL path matches `/result/:id` or hash `#/result/:id`.

```
/ (Root Portfolio Route)
├── Floating Header (Navbar)
│   ├── Brand Name / Monogram Link
│   ├── Section Navigation Links (#about, #experience, #portfolio, #skills, #certifications, #awards, #contact)
│   ├── Available for Work Status Indicator
│   └── Mobile Navigation Drawer Toggle
│
├── Section 00: Hero
│   ├── Real-time Dynamic Greeting (Morning / Afternoon / Evening based on local clock)
│   ├── Availability & Google AI Certified Badges
│   ├── Name Headline & Title Tagline
│   ├── Expandable Bio Summary
│   ├── Call to Action Buttons (Explore Portfolio, Watch Reels, Contact)
│   └── Core Tool Icons Summary
│
├── Section 01: About (Profile & Background)
│   ├── 3 Core Practice Pillars (Motion, Brand/Packaging, AI Tech)
│   ├── Detailed Narrative Card & Profile Avatar
│   ├── Quantitative Impact Highlights (Fastwork rating, Client boost, Google AI badge)
│   └── Academic Foundation Card (S1 Informatika, Amikom Yogyakarta)
│
├── Section 02: Experience (Work History & Roles)
│   ├── Professional Employment Entries (Adstart Digital Kreatif / Fastwork, PT Razen Teknologi)
│   ├── Deliverables, Metrics, Tags, and Client Outcomes
│   └── Organizational & Leadership Track (Nurulummah TV, Google Developer, Digistar Club)
│
├── Section 03: Portfolio (Selected Works & Explorations)
│   ├── External Showcase Links (Behance, YouTube)
│   ├── Active Skill Filter Alert Pill (when navigated from Skills section)
│   ├── Instant Search Input with 200ms Debouncing
│   ├── Category Filtering Tabs (All, Motion & Video, Graphic & Brand, Packaging, UI/UX & Web, Generative AI)
│   ├── Project Grid (Initial 6 items with "Show More / Show Less" toggle)
│   └── Interactive Project Modal (Deep-linked via /{code})
│       ├── Sticky Modal Header (Back/Close, Share, Previous/Next navigation)
│       ├── Project Banner, Badge, Title, and Client/Year Subtitle
│       ├── Metadata Grid (Client, Timeline, Category, Key Impact)
│       ├── Detailed Description & Process Narrative
│       ├── Interactive 4-Stage Roadmap Visualizer (Planning, Design, Dev, Deployment)
│       ├── Key Deliverables & Outcomes Checklist
│       ├── Software & Tech Stack Badges (with AI-indicator detection)
│       ├── Project Tags
│       ├── Visual Spreads & Responsive Gallery (with Image Lightbox)
│       ├── YouTube Facade Video Player
│       ├── Previous / Next Project Navigation Cards
│       └── External Action Links (Live Website, Behance, YouTube, Hackathon, Contact)
│
├── Section 04: Skills (Multidisciplinary Competencies)
│   ├── Category Tabs (Video, Graphic, UI/UX, AI Tech, AI Platforms, Content/Soft Skills)
│   ├── Search & Filter Bar
│   ├── Interactive Skill Cards with Proficiency Rating (0-100%) and Badges
│   ├── Detailed Tooltip Portal on Hover/Touch (Description & Production Workflow)
│   └── "Filter Portfolio by Skill" Action
│
├── Section 05: Certifications (Credentials & Training)
│   ├── Category Tabs (AI, Motion Design, UI/UX, IT & Network, Web)
│   ├── Search Filter
│   ├── Certification Cards (Initial 3 with "Show More" toggle)
│   ├── External Verification Action (Credly, Coursera, Sanbercode, Drive, Dicoding)
│   └── Detailed Certificate Modal (Syllabus, criteria, acquired skills)
│
├── Section 06: Awards (Honors & Recognition)
│   └── 3 Verified Achievement Cards (Top 19 Future of Tech, Top 30 CREATech, Hacktiv8 MSME AI)
│
├── Section 07: Contact (Initiate Collaboration)
│   ├── Direct Contact Info (Email, Phone, Location) with Copy-to-Clipboard
│   ├── Interactive Inquiry Form (Sanitized name, email, topic selector, message)
│   ├── Client-side Rate Limiting (15s submission cooldown)
│   ├── Dynamic "Send via WhatsApp" Button (URL-encoded structured message)
│   └── Dynamic "Send via Email" Mailto Action
│
├── Footer (Official Profiles & Showcase)
│   └── 6 External Social & Developer Profile Cards (LinkedIn, Behance, YouTube, Dicoding, Google Dev, Credly)
│
├── Global Utility Layer
│   ├── Custom Interactive Cursor (Desktop fine-pointer devices)
│   ├── Top Scroll Progress Bar
│   ├── Back-to-Top Floating Button
│   ├── Content & Asset Protection Handler (Context menu, shortcuts, drag prevention, toast notification)
│   └── Web Audio API Synthesizer (Zero-payload sound manager)
│
└── /result/:id (Document Verification Route)
    ├── Minimal Header with Ardi Ulinnuha Brand Shield
    ├── Page Heading ("Surat Pernyataan") & Subheading
    ├── Validated Data Card (Table: Signatory, Document Type, Event, Organizer, Place & Date)
    ├── Verification QR Status Badge & Document ID
    ├── Self-Verification Authenticity Disclaimer
    └── Return Home Navigation Action
```

---

## 4. Functional Requirements

### 4.1 Navigation & Global Routing
- **FR-01: Hash & Smooth Scrolling Navigation:** Clicking any navbar or mobile drawer link (`#about`, `#experience`, etc.) smoothly scrolls the viewport to the target element without a full page reload.
- **FR-02: 3-Digit Project URL Routing (`/{code}`):**
  - Every project has a unique 3-digit numeric code (e.g. `101`, `214`, `305`, `856`).
  - Visiting `/{code}` directly opens the project detail modal for that project without redirecting or reloading.
  - The browser history state is updated via `window.history.pushState` when a project modal is opened, and updated to `/` when closed.
  - Supports backwards compatibility for legacy hash URLs (e.g. `/#101` or `/#project-856` cleanly redirects to `/{code}`).
- **FR-03: Browser Back/Forward Navigation:**
  - Pressing the browser’s "Back" button while a project modal is open closes the modal and returns to the home page at the exact prior scroll position.
  - Pressing "Forward" re-opens the modal.
- **FR-04: Document Title Sync:**
  - When viewing the root page, `document.title` is set to `"Ardi Ulinnuha - Portfolio"`.
  - When opening a project modal, `document.title` updates dynamically to `"{Project Title} | Ardi Ulinnuha Portfolio"`.
  - When navigating to `/result/:id`, the document title updates to reflect document verification status.
- **FR-05: Document Verification Routing (`/result/:id`):**
  - If `window.location.pathname` matches `/result/:id` (or hash `#/result/:id`), the application unmounts the portfolio and renders the `DocumentVerification` component.
  - If the ID matches a record in `DOCUMENTS_DATA` (case-insensitive fallback), the full verified document table is shown.
  - If the ID does not exist, an error card ("Dokumen Tidak Ditemukan") is displayed.

### 4.2 Hero & Time-Based Greeting
- **FR-06: Time-Aware Greeting Logic:**
  - Evaluates local device hours (`new Date().getHours()`):
    - `05:00 - 11:59`: "Good morning" with sunrise icon.
    - `12:00 - 16:59`: "Good afternoon" with sun icon.
    - `17:00 - 04:59`: "Good evening" with moon icon.
  - Automatically updates every 30 seconds via an active interval timer.
- **FR-07: Expandable Hero Bio on Mobile:**
  - Limits bio description to 4 lines on mobile viewports with a "Read more... ↓" toggle.
  - Toggling expands the full bio and updates aria attributes (`aria-expanded`).

### 4.3 Portfolio Showcase & Filtering
- **FR-08: Category Tab Filtering:**
  - Filter projects across categories: `All Projects`, `Motion & Video` (`motion` or `video`), `Graphic & Brand` (`branding`), `Packaging` (`packaging`), `UI/UX & Web` (`uiux`), and `Generative AI` (`ai`).
  - Displays real-time counts per category tab badge.
- **FR-09: Debounced Keyword Search:**
  - Text input filtered through a 200ms debounce timer.
  - Searches across pre-indexed search corpus: project code, titles, client name, categories, tags, tools, deliverables, search keywords, and descriptions.
  - Pressing `Escape` or clicking the clear icon resets the query instantly.
- **FR-10: Pagination ("Show More / Show Less"):**
  - In the "All Projects" category without an active search query, only the first 6 projects (`INITIAL_PROJECTS_COUNT = 6`) are displayed initially.
  - Clicking "Show More" reveals all 19 projects.
  - Clicking "Show Less" truncates back to 6 and scrolls the user cleanly back to the top of the portfolio section.
- **FR-11: Cross-Section Skill-to-Portfolio Filtering:**
  - When a user clicks "Filter Portfolio by Skill" in the Skills section, the viewport scrolls to `#portfolio`, the active skill filter pill is applied, and only projects matching the selected skill (via `matchProjectWithSkill`) are rendered.
  - An alert banner displays the active skill with an instant "Clear Filter" button.

### 4.4 Project Modal & Media Showcase
- **FR-12: Keyboard Accessibility & Focus Trapping:**
  - Modal listens for `Escape` key to close.
  - Modal listens for `ArrowLeft` / `ArrowRight` to navigate to the previous / next project.
  - Locks background document scrolling (`overflow: hidden` on `document.body`) while open.
- **FR-13: Interactive Project Execution Roadmap:**
  - Renders a 4-step pipeline: Stage 01 (Planning), Stage 02 (Design), Stage 03 (Development), Stage 04 (Deployment).
  - Users can click any stage to inspect the phase number, subtitle, description, verified deliverables, and specialized tools applied.
- **FR-14: High-Performance Video Facade (`YouTubeFacade`):**
  - Does NOT load the heavy YouTube iframe on initial modal render.
  - Renders high-resolution video thumbnail (`maxresdefault.jpg` with `hqdefault.jpg` fallback) and play button.
  - Iframe is injected only upon explicit user click, loading with `autoplay=1` from privacy-enhanced domain `https://www.youtube-nocookie.com/embed/{id}`.
  - Dispatches a custom window event (`portfolio:youtube-play`) so that playing one video automatically stops/unmounts any other playing video instance.
- **FR-15: Image Lightbox Expansion:**
  - Clicking any preview gallery card opens a full-screen image lightbox modal.
  - Supports zoom, keyboard `Escape` to close, and backdrop click dismissal.
- **FR-16: Native Share Button:**
  - Uses `navigator.share` on supported mobile/desktop devices with project title, description, and direct URL (`/{code}`).
  - Falls back to copying the direct project URL to the clipboard with visual confirmation ("Copied!").

### 4.5 Multidisciplinary Skills Section
- **FR-17: Category Tabs & Keyword Filter:**
  - Skills organized into 6 categories: Video & Motion, Graphic Design, UI/UX, AI Tech, AI Tools, and Content/Soft Skills.
  - Interactive search bar filters skills in real-time across titles, workflows, and tool descriptions.
- **FR-18: Interactive Skill Detail Portal:**
  - Hovering (or tapping on touch devices) a skill badge opens an interactive portal tooltip.
  - Displays skill level percentage bar, competency description, production workflow summary, and a direct button "View Matching Projects".

### 4.6 Certifications & Modal
- **FR-19: Expandable Certificate Descriptions:**
  - Truncates descriptions strictly to 3 lines using canvas/DOM measurement with clean word-boundary ellipsis (`...`).
  - "Show More / Show Less" toggle expands the full 10 certificate items.
- **FR-20: Certificate Detail Modal (`CertModal`):**
  - Clicking a certificate card opens a detail modal with full syllabus, issuing organization, criteria, issue date, and direct external verification link.

### 4.7 Contact System & WhatsApp Generator
- **FR-21: Input Sanitization & Security Validation:**
  - Strips ASCII control characters, null bytes, HTML brackets (`<`, `>`), and dangerous URI schemes (`javascript:`, `vbscript:`, `data:`).
  - Enforces RFC 5322 email regex formatting.
  - Validates character length constraints (Name: 2–80 chars; Email: max 100 chars; Message: 10–2000 chars).
- **FR-22: Client-side Rate Limiting:**
  - Enforces a 15-second cooldown period between submissions using `sessionStorage` (`au_last_form_submit`).
  - Shows real-time countdown timer if repeated submissions are attempted.
- **FR-23: Dynamic WhatsApp Direct Messaging:**
  - "Send via WhatsApp" button encodes sanitized user name, selected project topic, and message into an official WhatsApp Web/API link: `https://wa.me/6285236402997?text=...`.
- **FR-24: Dynamic Mailto Link Generator:**
  - Creates formatted `mailto:` link with pre-filled subject line `[Project Inquiry] {Topic} - {Name}` and structured body text.
- **FR-25: Direct Contact Copy-to-Clipboard:**
  - Quick-action buttons to copy phone number and email address to clipboard with temporary visual feedback ("Copied!") and synthesized audio chime.

### 4.8 Intellectual Property & Content Protection
- **FR-26: Global Context Menu Block:**
  - `contextmenu` events are intercepted globally to prevent image saving, asset downloads, and inspect shortcuts.
- **FR-27: Developer Shortcut Interception:**
  - Blocks `F12`, `Ctrl+Shift+I/J/C`, `Cmd+Option+I/J/C`, `Ctrl+U`, `Cmd+Option+U`, `Ctrl+S`, `Cmd+S`.
- **FR-28: Asset Drag Prevention:**
  - `dragstart` is blocked on all `img`, `picture`, `video`, and protected media containers.
- **FR-29: Protection Feedback Toast:**
  - When a blocked action occurs, an animated notification banner appears ("Content & Assets Protected • Official Copyright © Ardi Ulinnuha") for 2.7 seconds and plays a subtle audio shield cue.
- **FR-30: Video Element Attribute Enforcement:**
  - Automatically injects `controlsList="nodownload"` and `disablePictureInPicture="true"` on all video DOM elements.

### 4.9 Zero-Payload Audio Synthesis Engine
- **FR-31: Ambient Web Audio Synthesizer:**
  - Generates sound effects dynamically in browser memory using `AudioContext`, oscillators (sine, triangle), gain nodes, and biquad filters.
  - No external audio files (.mp3/.wav) are downloaded (0 KB network overhead).
  - Audio types: `click`, `modalOpen`, `modalClose`, `success`, `error`, `shield`, and contextual hover types (`card`, `button`, `pill`, `tab`, `subtle`).
- **FR-32: Autoplay Policy Handling:**
  - Automatically unlocks the suspended `AudioContext` on the first user interaction (`click`, `pointerdown`, `touchstart`, `keydown`).
  - Master volume set to comfortable 35% with persistence in `localStorage` (`au_sfx_volume`).

---

## 5. Content & Data Model

### 5.1 Type Definitions (`src/types.ts`)

```typescript
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
  hackathonUrl?: string;
  hackathonLabel?: string;
  searchKeywords?: string[];
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
  syllabus?: string;
  syllabusEn?: string;
  earningCriteria?: string;
  credentialType?: string;
  credentialUrl: string;
  skillsAcquired: string[];
  competencies?: string[];
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
  level: number;
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
```

### 5.2 Document Verification Data (`src/data/documentsData.ts`)

```typescript
export interface VerifiedDocument {
  id: string;                  // Random unguessable alphanumeric ID (e.g. "k7Xp2Qm9Vd4RtLw8")
  jenisDokumen: string;        // Document title / type
  namaPenandatangan: string;   // Signatory name ("Ardi Ulinnuha")
  kegiatan: string;            // Program / event title
  penyelenggara: string;       // Committee / institution
  tempatTanggal: string;       // Place and date issued
  status: 'Terverifikasi' | string;
}
```

### 5.3 Editable vs Hardcoded Data

| Data Category | File Location | Update Mechanism | Editable Scope |
| :--- | :--- | :--- | :--- |
| Personal Info & Stats | `src/data/portfolioData.ts` | Code edit | Bio, roles, phone, email, university, statistics |
| Portfolio Projects | `src/data/portfolioData.ts` | Code edit | 19 projects; append or modify project objects |
| Work & Org Experience | `src/data/portfolioData.ts` | Code edit | Add/edit experience entries, metrics, deliverables |
| Verified Certificates | `src/data/portfolioData.ts` | Code edit | 10 certificate items, Credly/Coursera links, syllabus |
| Honors & Awards | `src/data/portfolioData.ts` | Code edit | 3 awards, issuers, dates, credential URLs |
| Skills & Tool Stacks | `src/data/portfolioData.ts` | Code edit | 6 categories, proficiency scores, workflows |
| Verification Documents | `src/data/documentsData.ts` | Code edit | Add verified document objects with random alphanumeric IDs |
| Static Translations | `src/data/translations.ts` | Code edit | Disclaimer texts, micro-copy, badge labels |

---

## 6. User Flows

### Flow 1: Recruiter Explores & Evaluates Project Credentials
```
User lands on /
  │
  ├─► Scans Hero (sees "Google AI Certified" and "Available for Work")
  │
  ├─► Clicks "Explore Portfolio" or scrolls to #portfolio
  │
  ├─► Filters by "UI/UX & Web" or searches "AI"
  │
  ├─► Clicks "NurmaOne" card
  │     └─► Browser updates URL to /856
  │     └─► Title updates to "NurmaOne... | Ardi Ulinnuha Portfolio"
  │     └─► User reviews 4-Stage Roadmap (Planning, Design, Dev, Deployment)
  │     └─► User clicks YouTube video preview (loads facade iframe)
  │     └─► User clicks "AI BUILDER CUP" external link
  │
  └─► Presses browser Back button -> Modal closes, user returns smoothly to scroll position
```

### Flow 2: Potential Client Inquires via WhatsApp
```
User scrolls to #contact
  │
  ├─► Enters Name: "Sarah Jenkins"
  ├─► Enters Email: "sarah@brandagency.com"
  ├─► Selects Topic: "Commercial Video Editing"
  ├─► Types Project Brief (min 10 chars)
  │
  ├─► Submits Form
  │     ├─► Client-side validator sanitizes input against XSS
  │     ├─► Enforces 15s cooldown in sessionStorage
  │     └─► Plays success audio chime
  │
  └─► Clicks "Send via WhatsApp"
        └─► Opens WhatsApp with pre-filled message:
            "Hi Ardi Ulinnuha, my name is Sarah Jenkins. I would like to discuss about Commercial Video Editing. Message: [brief]..."
```

### Flow 3: Document Authenticity Verification via QR Code
```
User scans physical document QR code
  │
  └─► Scanner opens browser URL: https://[domain]/result/k7Xp2Qm9Vd4RtLw8
        │
        ├─► App.tsx inspects path via getResultIdFromLocation()
        ├─► Finds path starts with /result/ and extracts ID "k7Xp2Qm9Vd4RtLw8"
        ├─► Matches ID in DOCUMENTS_DATA via getDocumentById()
        │
        └─► Renders DocumentVerification Component:
              ├── Top bar: Ardi Ulinnuha Shield
              ├── Title: "Surat Pernyataan"
              ├── Subtitle: "Hasil validasi dokumen berdasarkan QR code."
              ├── Data Card: Signatory, Document Type, Event, Organizer, Place/Date
              ├── ID Display: "ID Dokumen: k7Xp2Qm9Vd4RtLw8"
              └── Self-Verification authenticity statement
```

---

## 7. Component Architecture

All components reside in `src/components/` and are built using functional React with TypeScript.

```
App.tsx
├── ContentProtection (Global right-click, shortcut, and drag protection)
├── CustomCursor (Interactive pointer tracking for desktop devices)
├── ScrollProgress (Top scroll percentage indicator)
├── Navbar (Header navigation bar)
│   └── MobileDrawer (Responsive slide-out navigation for mobile)
│
├── [Main Content Flow]
│   ├── Hero (Time-aware greeting, bio, CTAs, tool summary)
│   ├── SectionDivider
│   ├── RevealSection (About)
│   │   └── About (Bio narrative, avatars, education card)
│   ├── SectionDivider
│   ├── RevealSection (Experience)
│   │   └── Experience (Employment track & organizational roles)
│   ├── SectionDivider
│   ├── RevealSection (PortfolioShowcase)
│   │   └── PortfolioShowcase (Search, categories, grid, pagination)
│   │       ├── SectionHeader
│   │       ├── ProjectCard (Interactive 3D card tilt & hover)
│   │       │   └── LazyImage (Lazy-loaded images with skeleton)
│   │       ├── ProjectCardSkeleton (Loading skeleton placeholder)
│   │       └── ProjectModal (Code-split detailed modal via /{code})
│   │           ├── RoadmapVisualizer (Interactive 4-stage execution roadmap)
│   │           ├── YouTubeFacade (High-performance lazy video player)
│   │           ├── YouTubeIcon (SVG icon)
│   │           ├── ImageLightbox (Full-screen preview image expander)
│   │           └── ShareButton (Web Share API & clipboard copy)
│   ├── SectionDivider
│   ├── RevealSection (Skills)
│   │   └── Skills (Category tabs, skill ratings, workflow tooltips)
│   ├── SectionDivider
│   ├── RevealSection (Certifications)
│   │   └── Certifications (Search, categories, cards, description truncation)
│   │       ├── LazyCertIcon (Issuer brand icon with fallback)
│   │       └── CertModal (Code-split certificate syllabus modal)
│   ├── SectionDivider
│   ├── RevealSection (Awards)
│   │   └── Awards (3 achievement cards with external credential links)
│   ├── SectionDivider
│   └── RevealSection (Contact)
│       └── Contact (Contact info, inquiry form, WhatsApp/mailto builder)
│
├── Footer (Official social profile links)
├── BackToTop (Floating scroll-to-top button)
│
└── [Conditional Route View]
    └── DocumentVerification (Rendered when path matches /result/:id)
```

### Component Details & Props Reference

| Component | Responsibility | Props / State |
| :--- | :--- | :--- |
| `App.tsx` | Root coordinator, theme setup, routing detection (`/result/:id`), code-splitting suspense boundaries. | State: `selectedSkillFilter`, `resultDocumentId`, `hdMode`. |
| `Navbar.tsx` | Fixed navigation bar, mobile menu toggle, active section tracking. | State: `isScrolled`, `isMobileMenuOpen`. |
| `Hero.tsx` | First viewport paint, dynamic greeting by hour, expandable bio on mobile, primary CTAs. | State: `timeInfo`, `isBioExpanded`. |
| `About.tsx` | Detailed personal narrative, practice pillars, academic degree highlight. | Props: None. Imports `profileAvatar`. |
| `Experience.tsx` | Work history cards, metrics, and organizational roles. | Props: None. Reads `EXPERIENCES_DATA`, `ORGANIZATIONS_DATA`. |
| `PortfolioShowcase.tsx` | Project filtering, search indexing, URL sync (`/{code}`), pagination. | Props: `selectedSkillFilter`, `onClearSkillFilter`, `isLoading`. |
| `ProjectCard.tsx` | Individual project card with mouse tilt, category badge, and detail trigger. | Props: `project`, `onOpenModal`. |
| `ProjectModal.tsx` | Full-screen modal for project details, roadmap, gallery, video, and action links. | Props: `project`, `isOpen`, `onClose`, `previousProject`, `nextProject`, `onPreviousProject`, `onNextProject`. |
| `RoadmapVisualizer.tsx`| 4-stage milestone visualizer (Planning, Design, Dev, Deployment). | Props: `project`, `className`. |
| `YouTubeFacade.tsx` | Performance-optimized YouTube player facade using thumbnail and click-to-play. | Props: `videoUrlOrId`, `title`, `aspectRatioClass`. |
| `Skills.tsx` | Skill matrix, category switching, search, and hover portal tooltip. | Props: `onSelectSkill`, `activeSkillFilter`. |
| `Certifications.tsx`| Certificate grid, line-clamped description calculation, modal trigger. | Props: None. Reads `CERTIFICATIONS_DATA`. |
| `CertModal.tsx` | Modal displaying certificate syllabus, criteria, and verification link. | Props: `cert`, `isOpen`, `onClose`. |
| `Awards.tsx` | Displays honors, rank badges, and credential verification buttons. | Props: None. Reads `AWARDS_DATA`. |
| `Contact.tsx` | Direct contact channels, form validation, rate-limiting, and WhatsApp builder. | State: `formState`, `formErrors`, `cooldownRemaining`. |
| `ContentProtection.tsx` | Intercepts right-click, shortcuts, and drag events; displays copyright toast. | Props: `title`, `subtitle`. State: `isOpen`. |
| `DocumentVerification.tsx` | QR code verification page for `/result/:id`. | Props: `documentId`, `onNavigateHome`. |
| `CustomCursor.tsx` | Fine-pointer interactive custom cursor with trailing dot and magnetics. | Props: None. State: `position`, `cursorType`. |
| `ScrollProgress.tsx`| Tracks window scroll position and renders top progress bar. | Props: None. State: `scrollPercentage`. |
| `BackToTop.tsx` | Floating button appearing after 400px scroll to return to top. | Props: None. State: `isVisible`. |
| `ErrorBoundary.tsx` | React class boundary catching rendering errors and displaying fallback UI. | Props: `children`. State: `hasError`. |

---

## 8. Technical Stack & Architecture

### 8.1 Core Technologies
- **Runtime & Language:** Node.js, TypeScript (Strict Mode, ESNext modules).
- **Frontend Framework:** React 19 (`react` 19.0.1, `react-dom` 19.0.1).
- **Build Tool & Bundler:** Vite 6 (`vite` 6.2.3, `@vitejs/plugin-react` 5.0.4).
- **Backend / Dev Server:** Express 4 (`express` 4.21.2) with `tsx` development runner.
  - Production build bundles `server.ts` via `esbuild` to `dist/server.cjs`.
  - Serves static assets from `dist/` and provides SPA fallback for client routing.
- **Iconography:** Lucide React (`lucide-react` 0.546.0).
- **Animation Engine:** Motion / Framer Motion (`motion` 12.23.24, `framer-motion` 13.1.1).
- **Audio Synthesizer:** Native Web Audio API (`AudioContext`, `GainNode`, `OscillatorNode`, `BiquadFilterNode`).

### 8.2 Directory & File Structure
```
├── PRD.md                         # Product Requirements Document
├── index.html                     # HTML5 entry point & SEO metadata
├── package.json                   # Dependencies, scripts, and engine specs
├── server.ts                      # Express server with Vite middleware / production static server
├── tsconfig.json                  # TypeScript compiler configuration
├── vite.config.ts                 # Vite bundler plugins and build configuration
│
└── src/
    ├── main.tsx                   # React root mount (createRoot)
    ├── App.tsx                    # Root application component & route coordinator
    ├── types.ts                   # Central TypeScript interface declarations
    ├── index.css                  # Global CSS, Tailwind import, and utility rules
    ├── vite-env.d.ts              # Vite environment types
    │
    ├── assets/                    # Static WebP image assets and project collaterals
    │   ├── images/                # Profile avatars and branding assets
    │   └── projects/              # Project gallery images (Razen, Kopi Garasi, Food, etc.)
    │
    ├── components/                # Modular React functional components (31 components)
    │   ├── About.tsx
    │   ├── Awards.tsx
    │   ├── BackToTop.tsx
    │   ├── CertModal.tsx
    │   ├── Certifications.tsx
    │   ├── Contact.tsx
    │   ├── ContentProtection.tsx
    │   ├── CustomCursor.tsx
    │   ├── DocumentVerification.tsx
    │   ├── ErrorBoundary.tsx
    │   ├── Experience.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── ImageLightbox.tsx
    │   ├── LazyCertIcon.tsx
    │   ├── LazyImage.tsx
    │   ├── MobileDrawer.tsx
    │   ├── Navbar.tsx
    │   ├── PortfolioShowcase.tsx
    │   ├── ProjectCard.tsx
    │   ├── ProjectCardSkeleton.tsx
    │   ├── ProjectModal.tsx
    │   ├── RevealSection.tsx
    │   ├── RoadmapVisualizer.tsx
    │   ├── ScrollProgress.tsx
    │   ├── SectionHeader.tsx
    │   ├── ShareButton.tsx
    │   ├── Skills.tsx
    │   ├── SoundControl.tsx
    │   ├── YouTubeFacade.tsx
    │   └── YouTubeIcon.tsx
    │
    ├── data/                      # Structured dataset repositories
    │   ├── portfolioData.ts       # Master dataset: personal info, 19 projects, experience, certs, skills
    │   ├── documentsData.ts       # Master registry of verified QR documents
    │   └── translations.ts        # Multilingual schemas, labels, and copyright notices
    │
    ├── hooks/                     # Custom reusable React hooks
    │   ├── useDraggableScroll.ts  # Drag-to-scroll support for horizontal category tab bars
    │   ├── useIntersectionObserver.ts # Viewport entry observer for scroll reveals
    │   └── useSoundEffects.ts     # Interface hook for audio synthesizer cues
    │
    └── utils/                     # Algorithmic and helper modules
        ├── aiToolHelper.ts        # Helper to identify and style AI tools in tech stacks
        ├── skillMatcher.ts        # Keyword & semantic matcher connecting skills to projects
        └── soundEffects.ts        # Web Audio API ambient audio synthesis engine
```

---

## 9. Non-Functional Requirements

### 9.1 Performance & Resource Loading
- **Code-Splitting Below the Fold:** Heavy sections (`PortfolioShowcase`, `Skills`, `Certifications`, `Awards`, `Contact`, and modals `ProjectModal`, `CertModal`, `ImageLightbox`, `DocumentVerification`) are wrapped in `React.lazy()` and `Suspense` with lightweight skeleton fallbacks.
- **Deferred Video Embeds:** YouTube iframes are not loaded into the DOM until explicit user interaction via `YouTubeFacade`.
- **CSS Content-Visibility:** Off-screen sections use `content-visibility: auto` to allow the browser to skip layout and painting until scrolled near.
- **Search Pre-Indexing:** Search corpuses are computed once at module initialization into `Map<string, string>` structures (`SEARCH_CORPUS_MAP`, `SKILL_CAT_CORPUS`, `SKILL_ITEM_CORPUS`) to guarantee O(1) keyword lookups without per-keystroke garbage collection.
- **Image Optimization & Layout Shift Prevention:** All images specify explicit `width`, `height`, and aspect-ratio classes. Critical above-the-fold images use `fetchPriority="high"` and `loading="eager"`, while project gallery thumbnails use `loading="lazy"` and `decoding="async"`.

### 9.2 Accessibility (a11y)
- **ARIA Semantics:** Proper roles (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-expanded`, `aria-hidden`) on modals, mobile drawers, and accordion toggles.
- **Touch Target Compliance:** Minimum interactive touch targets of 44x44px for buttons, links, and pagination controls on mobile viewports.
- **Reduced Motion Support:** System queries `useReducedMotion()`. When `prefers-reduced-motion: reduce` is detected, animations and card tilts are disabled or simplified to instant transitions.
- **Keyboard Navigation:** Full tab order navigation with focus outlines (`focus-visible`), `Escape` key listeners on modals, and arrow key support for project navigation.

### 9.3 SEO & Social Graph Metadata
- **Semantic HTML5:** Correct use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Meta Tags & Social Sharing:**
  - `<title>` dynamically synced with project titles.
  - Standard OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type="website"`).
  - Twitter Card metadata (`summary_large_image`).
  - Canonical URL links.

### 9.4 Browser Support & Compatibility
- **Desktop Browsers:** Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge (latest 2 major releases).
- **Mobile Browsers:** Mobile Safari (iOS 15+), Chrome for Android (Android 10+), Samsung Internet.
- **Fallback Handling:** Graceful degradation if Web Audio API, Clipboard API, or Web Share API are unavailable or blocked by browser permissions.

### 9.5 Security & Integrity
- **Client Input Sanitization:** Form fields are aggressively sanitized against script tags, null bytes, and malicious schemes before being processed or inserted into URLs.
- **External Link Hardening:** All external anchor links strictly declare `target="_blank"` and `rel="noopener noreferrer"`.
- **Content Protection Layer:** Reduces unauthorized scraping and casually copied source media.

---

## 10. Integrations & External Services

| Service / Platform | Integration Type | Technical Implementation | Purpose |
| :--- | :--- | :--- | :--- |
| **YouTube** | Embedded Facade & Direct Link | `YouTubeFacade.tsx` via `youtube-nocookie.com/embed/{id}` | Video reels, motion graphic demos, and tutorials |
| **WhatsApp** | Direct Messaging URL API | `https://wa.me/{phone}?text={encodedText}` | Direct client lead generation and communication |
| **Google AI Studio / Gemini** | Project Output Links | External URLs (e.g. `https://nurmaone.ai.studio/`) | Showcase live AI prototypes and vibe-coded platforms |
| **AI Builder Cup** | External Event Link | `https://aibuildercup.com/` | Hackathon entry verification for NurmaOne |
| **Behance** | External Profile & Case Studies | `https://www.behance.net/ardiulinnuha/` | Full-resolution visual identity portfolios & graphic sets |
| **LinkedIn** | Professional Profile Link | `https://www.linkedin.com/in/ardiulinnuha982/` | Professional networking and career background |
| **Google Developers** | Developer Profile Link | `https://g.dev/ardiulinnuha` | Public Google Developer verified badges & skills |
| **Dicoding Indonesia** | Academy Profile & Certificates | `https://www.dicoding.com/users/ardiulinnuha/` | Academy graduate verification and transcript |
| **Credly** | Digital Credential Badges | `https://www.credly.com/users/ardiulinnuha/` | Google AI & Cisco verified digital badge credentials |
| **Sanbercode** | Bootcamp Certificates | Direct certificate URLs (`sanbercode.com/certificate/...`) | UI/UX and Graphic Design bootcamp credential verification |
| **Fastwork.id** | Freelance Platform Profile | Metric display in portfolio & experience data | Verified freelance client ratings (5.0/5.0) |
| **Web Audio API** | Native Browser Audio Engine | Client-side synthesizers via `AudioContext` | Zero-payload interactive sound effects |

---

## 11. Known Issues, Limitations & Future Improvements

### 11.1 Identified Code Patterns & Limitations
1. **Mock Dispatch on Contact Form:**
   - The contact form simulates submission via a 400ms timeout rather than sending an HTTP POST to an active backend email API (e.g. SendGrid or Nodemailer).
   - *Current Design Intent:* The form acts as a builder for the user to dispatch via WhatsApp or mailto client.
   - *Future Improvement:* Add an Express backend endpoint (`POST /api/contact`) with email delivery service integration.
2. **Hardcoded Master Data Arrays:**
   - All 19 projects, 10 certificates, and verified documents are stored in static TypeScript files (`portfolioData.ts`, `documentsData.ts`).
   - *Limitation:* Adding a new project or verified document requires committing code and rebuilding the app.
   - *Future Improvement:* Connect to a headless CMS or database (e.g. Firestore / Supabase) for live content management.
3. **Client-Side Media Protection Bounds:**
   - While context menu, drag, and common key combinations are blocked, determined users can still access network requests or browser cache to download assets.
   - *Current Design Intent:* Serves as a clear copyright deterrent against casual right-click saving.
4. **Single Verified Document in Registry:**
   - `DOCUMENTS_DATA` currently contains one active verified record (`k7Xp2Qm9Vd4RtLw8`).
   - *Future Improvement:* Implement an administrative dashboard or CLI script to batch-generate and cryptographically sign verification IDs for issued certificates.
5. **Sound Control Visibility:**
   - `SoundControl.tsx` returns `null` because visual sound toggle buttons were hidden per design preference, while the synthesized audio engine remains active with stored volume defaults.
   - *Future Improvement:* Provide an accessible, discreet sound preference switch in the footer or settings drawer.

---
*Document Version: 1.0.0*  
*Last Updated: November 2026*  
*Author: Engineering Team & Ardi Ulinnuha*
