/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VerifiedDocument {
  /**
   * Unique unguessable alphanumeric ID for QR code verification
   * Example: "k7Xp2Qm9Vd4RtLw8"
   */
  id: string;

  /**
   * Type / title of the document
   * Example: "Surat Pernyataan Kesediaan Mengikuti Kegiatan Sampai Akhir"
   */
  jenisDokumen: string;

  /**
   * Signatory's full name
   * Example: "Ardi Ulinnuha"
   */
  namaPenandatangan: string;

  /**
   * Program, workshop, or event name
   * Example: "Pelatihan Media Pesantren dalam Rangka Hari Santri Nasional 2026"
   */
  kegiatan: string;

  /**
   * Organizer / organizing committee
   * Example: "NU Online Institute, RMI DIY, dan PP Nurul Ummah Kotagede"
   */
  penyelenggara: string;

  /**
   * Signing place and date
   * Example: "Yogyakarta, 15 Oktober 2026"
   */
  tempatTanggal: string;

  /**
   * Verification status
   * Example: "Terverifikasi"
   */
  status: 'Terverifikasi' | string;
}

/**
 * Master Registry of Verified Documents
 * To add a new document, simply append a new object to this array with a unique random ID.
 */
export const DOCUMENTS_DATA: VerifiedDocument[] = [
  {
    id: 'k7Xp2Qm9Vd4RtLw8',
    jenisDokumen: 'Surat Pernyataan Kesediaan Mengikuti Kegiatan Sampai Akhir',
    namaPenandatangan: 'Ardi Ulinnuha',
    kegiatan: 'Pelatihan Media Pesantren dalam Rangka Hari Santri Nasional 2026',
    penyelenggara: 'NU Online Institute, RMI DIY, dan PP Nurul Ummah Kotagede',
    tempatTanggal: 'Yogyakarta, 15 Oktober 2026',
    status: 'Terverifikasi'
  }
];

/**
 * Helper function to find a verified document by its random ID
 */
export const getDocumentById = (id: string | null | undefined): VerifiedDocument | undefined => {
  if (!id) return undefined;
  const cleanId = id.trim();
  // 1. Exact match (case-sensitive)
  const exactMatch = DOCUMENTS_DATA.find(doc => doc.id === cleanId);
  if (exactMatch) return exactMatch;
  // 2. Case-insensitive fallback (e.g., if mobile scanner lowers URL case)
  return DOCUMENTS_DATA.find(doc => doc.id.toLowerCase() === cleanId.toLowerCase());
};
