export interface TranslationSchema {
  about: {
    googleAiCertified: string;
    googleAiBadgeSubtitle: string;
    fastworkBadge: string;
    fastworkSubtitle: string;
    impactBadge: string;
    impactSubtitle: string;
    academicDegree: string;
    viewCertifications: string;
    hackYourPotential: string;
    codeYourPath: string;
  };
  certifications: {
    googleAiTitle: string;
  };
  modal: {
    protectedMediaLabel: string;
    protectedMediaDisclaimer: string;
  };
}

export const PROTECTED_MEDIA_DISCLAIMER =
  'All visual content (photos, images, and videos) on this website is protected by copyright of its owner. Right-click and direct download are disabled to prevent casual copying. Unauthorized use, reproduction, or redistribution is strictly prohibited without written permission from the owner.';

export const TRANSLATIONS: Record<'en' | 'id', TranslationSchema> = {
  en: {
    about: {
      googleAiCertified: 'Google AI Certified',
      googleAiBadgeSubtitle: 'GOOGLE CAREER CERTIFICATES',
      fastworkBadge: 'Fastwork 5.0⭐',
      fastworkSubtitle: '15 Orders, 13 Clients',
      impactBadge: '+15% Clients',
      impactSubtitle: 'Company Deck Impact',
      academicDegree: 'Academic Degree',
      viewCertifications: 'View Certifications',
      hackYourPotential: 'Hack Your Potential',
      codeYourPath: 'Code Your Path',
    },
    certifications: {
      googleAiTitle: 'Google AI Professional',
    },
    modal: {
      protectedMediaLabel: 'Protected Media:',
      protectedMediaDisclaimer: PROTECTED_MEDIA_DISCLAIMER,
    },
  },
  id: {
    about: {
      googleAiCertified: 'Google AI Certified',
      googleAiBadgeSubtitle: 'GOOGLE CAREER CERTIFICATES',
      fastworkBadge: 'Fastwork 5.0⭐',
      fastworkSubtitle: '15 Pesanan, 13 Klien',
      impactBadge: '+15% Klien',
      impactSubtitle: 'Dampak Company Deck',
      academicDegree: 'Gelar Akademik',
      viewCertifications: 'Lihat Sertifikasi',
      hackYourPotential: 'Hack Your Potential',
      codeYourPath: 'Code Your Path',
    },
    certifications: {
      googleAiTitle: 'Google AI Professional',
    },
    modal: {
      protectedMediaLabel: 'Protected Media:',
      protectedMediaDisclaimer: PROTECTED_MEDIA_DISCLAIMER,
    },
  },
};

export default TRANSLATIONS;
