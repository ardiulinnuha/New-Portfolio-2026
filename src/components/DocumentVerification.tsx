/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useReducedMotion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from 'motion/react';
import { 
  ShieldCheck, 
  QrCode, 
  AlertTriangle 
} from 'lucide-react';
import { getDocumentById } from '../data/documentsData';

interface DocumentVerificationProps {
  documentId: string;
  onNavigateHome?: () => void;
}

export const DocumentVerification: React.FC<DocumentVerificationProps> = ({
  documentId
}) => {
  const document = getDocumentById(documentId);
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse interaction state for desktop 3D tilt & spotlight
  const [canHover, setCanHover] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  // Check if device supports fine cursor hover
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(pointer: fine)');
      setCanHover(media.matches);
      const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Smooth springs for card tilt
  const springConfig = { damping: 22, stiffness: 140, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Tilt range capped at subtle ±3.5 degrees
  const rotateX = useTransform(smoothMouseY, [0, 1], [3.5, -3.5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-3.5, 3.5]);

  // Spotlight radial gradient follow cursor
  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(420px circle at ${x}px ${y}px, rgba(6,182,212,0.08), transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!canHover || shouldReduceMotion) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Apple spring entrance configuration
  const entranceTransition = {
    type: 'spring' as const,
    stiffness: 140,
    damping: 24,
    mass: 0.8
  };

  const tableRows = document ? [
    { label: 'Nama Penandatangan', value: document.namaPenandatangan, isStrong: true },
    { label: 'Jenis Dokumen', value: document.jenisDokumen },
    { label: 'Kegiatan', value: document.kegiatan },
    { label: 'Penyelenggara', value: document.penyelenggara },
    { label: 'Tempat dan Tanggal', value: document.tempatTanggal },
  ] : [];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col justify-between items-center bg-[#050505] text-[#e5e7eb] font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden p-4 sm:p-6 lg:p-8">
      
      {/* ========================================================
       * 1. LATAR: AURORA LEMBUT (BERGERAK PELAN & HALUS)
       * ======================================================== */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        aria-hidden="true"
      >
        {/* Blob 1: Cyan / Blue (Kiri Atas) */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, 35, -25, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.12, 0.95, 1],
            opacity: [0.18, 0.26, 0.20, 0.18],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-cyan-500/20 blur-[120px] will-change-transform"
        />

        {/* Blob 2: Emerald / Teal (Kanan Tengah) */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, -40, 20, 0],
            y: [0, 45, -30, 0],
            scale: [1, 1.15, 0.92, 1],
            opacity: [0.16, 0.24, 0.18, 0.16],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-36 w-[36rem] h-[36rem] rounded-full bg-emerald-500/18 blur-[130px] will-change-transform"
        />

        {/* Blob 3: Violet / Deep Blue (Kiri Bawah) */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, 30, -35, 0],
            y: [0, -30, 35, 0],
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.12, 0.20, 0.14, 0.12],
          }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -left-20 w-[38rem] h-[38rem] rounded-full bg-indigo-600/15 blur-[140px] will-change-transform"
        />

        {/* Blob 4: Soft Cyan (Tengah Bawah) */}
        <motion.div
          animate={shouldReduceMotion ? {} : {
            x: [0, -25, 30, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.08, 0.96, 1],
            opacity: [0.14, 0.22, 0.16, 0.14],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-400/15 blur-[120px] will-change-transform"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-gradient opacity-60" />
      </div>

      {/* ========================================================
       * MAIN CONTENT WRAPPER (STAGGERED ENTRANCE ALA APPLE)
       * ======================================================== */}
      <div className="w-full max-w-3xl lg:max-w-4xl mx-auto relative z-10 flex flex-col my-auto py-1 sm:py-2 gap-3.5 sm:gap-4 lg:gap-5.5">
        
        {/* 1. HEADER: PILL GLASS MELAYANG */}
        <motion.header
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...entranceTransition, delay: 0.05 }}
          className="w-full flex items-center justify-between px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/[0.04] border border-white/10 border-t-white/20 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
        >
          {/* Ikon Perisai Bernapas + Pulse Ring */}
          <div className="inline-flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={shouldReduceMotion ? {} : {
                  scale: [1, 1.06, 1],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.22)] relative z-10"
              >
                <ShieldCheck className="w-4.5 h-4.5" />
              </motion.div>

              {/* Pulse Ring Memancar Keluar */}
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-cyan-400/50 pointer-events-none"
                  animate={{ scale: [1, 1.85], opacity: [0.75, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </div>

            <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
              Ardi Ulinnuha
            </span>
          </div>

          {/* Label Verifikasi QR + Pulse Ring Hijau */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400">
            <span className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute w-2 h-2 rounded-full border border-emerald-400 pointer-events-none"
                  animate={{ scale: [1, 2.5], opacity: [0.85, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </span>
            <span className="tracking-wide">Verifikasi QR</span>
          </div>
        </motion.header>

        {document ? (
          /* ========================================================
           * DOKUMEN DITEMUKAN (TERVERIFIKASI)
           * ======================================================== */
          <>
            {/* 2 & 3. JUDUL & SUBJUDUL DENGAN GRADASI HALUS */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...entranceTransition, delay: 0.15 }}
              className="px-1 text-left"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display tracking-tight leading-snug bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                Surat Pernyataan
              </h1>
              <p className="text-sm sm:text-base text-neutral-400/90 mt-1 sm:mt-1.5 font-normal tracking-normal">
                Hasil validasi dokumen berdasarkan QR code.
              </p>
            </motion.div>

            {/* 4. KARTU LIQUID GLASS DENGAN 3D TILT & SPOTLIGHT */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...entranceTransition, delay: 0.25 }}
              style={{
                perspective: 1200,
              }}
              className="w-full"
            >
              <motion.article
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={canHover && !shouldReduceMotion ? {
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                } : {}}
                className="relative rounded-3xl bg-[#0c0d12]/75 backdrop-blur-3xl border border-white/10 border-t-white/20 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-hidden transition-shadow duration-300"
              >
                {/* Spotlight Cahaya Mengikuti Kursor */}
                {canHover && !shouldReduceMotion && (
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100"
                    style={{
                      background: spotlightBackground,
                      opacity: 1,
                    }}
                  />
                )}

                {/* Header Kartu: Ikon QR Scan Line + Floating */}
                <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 bg-white/[0.025] border-b border-white/[0.08]">
                  <motion.div
                    animate={shouldReduceMotion ? {} : {
                      y: [-2, 2, -2],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0 relative overflow-hidden shadow-[0_0_16px_rgba(6,182,212,0.18)]"
                  >
                    <QrCode className="w-6 h-6 sm:w-6.5 sm:h-6.5 relative z-10" />

                    {/* Garis Pemindai (Scan Line) Naik-Turun */}
                    {!shouldReduceMotion && (
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] z-20 pointer-events-none"
                        animate={{
                          top: ['8%', '90%', '8%'],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </motion.div>

                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-tight">
                      Data Dokumen
                    </h2>
                    <p className="text-xs sm:text-sm text-cyan-400/90 font-medium leading-tight mt-0.5">
                      Data dokumen yang divalidasi dari hasil verifikasi QR.
                    </p>
                  </div>
                </div>

                {/* Isi Kartu: Baris Data dengan Animasi Masuk Staggered & Hover Halus */}
                <div className="divide-y divide-white/[0.05]">
                  {tableRows.map((row, index) => (
                    <motion.div
                      key={row.label}
                      initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...entranceTransition, delay: 0.35 + index * 0.06 }}
                      className="flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-3.5 lg:py-4 px-4 sm:px-6 gap-1 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.03]"
                    >
                      <div className="w-full sm:w-52 lg:w-56 shrink-0 text-sm sm:text-base text-neutral-400 font-normal">
                        {row.label}
                      </div>
                      <div className={`min-w-0 flex-1 text-sm sm:text-base text-neutral-100 leading-relaxed ${row.isStrong ? 'font-semibold text-white' : 'font-medium'}`}>
                        {row.value}
                      </div>
                    </motion.div>
                  ))}

                  {/* Baris Status: Terverifikasi dengan Animated Stroke Draw & Pulse Ring */}
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...entranceTransition, delay: 0.35 + tableRows.length * 0.06 }}
                    className="flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-3.5 lg:py-4 px-4 sm:px-6 gap-1 sm:gap-4 transition-colors duration-200 hover:bg-white/[0.03]"
                  >
                    <div className="w-full sm:w-52 lg:w-56 shrink-0 text-sm sm:text-base text-neutral-400 font-normal">
                      Status
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center gap-2.5 font-semibold text-emerald-400 text-sm sm:text-base">
                        
                        {/* Animated Checkmark Stroke Draw */}
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0">
                          <motion.svg
                            className="w-3.5 h-3.5 text-emerald-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <motion.path
                              d="M20 6L9 17L4 12"
                              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                            />
                          </motion.svg>
                        </div>

                        {/* Pulse Ring Hijau */}
                        <span className="relative flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {!shouldReduceMotion && (
                            <motion.span
                              className="absolute w-2 h-2 rounded-full border border-emerald-400 pointer-events-none"
                              animate={{ scale: [1, 2.5], opacity: [0.85, 0] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                            />
                          )}
                        </span>

                        <span>{document.status}</span>
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* ID Dokumen */}
                <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-white/[0.015] border-t border-white/[0.06]">
                  <div className="font-mono text-sm text-neutral-400">
                    ID Dokumen: <span className="text-neutral-200 font-semibold">{document.id}</span>
                  </div>
                </div>

                {/* Catatan Verifikasi Mandiri Ringkas + Pulse Perisai */}
                <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white/[0.015] border-t border-white/[0.06] flex items-start gap-3">
                  <motion.div
                    animate={shouldReduceMotion ? {} : {
                      scale: [1, 1.08, 1],
                      opacity: [0.85, 1, 0.85],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="shrink-0 mt-0.5"
                  >
                    <ShieldCheck className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-cyan-400" />
                  </motion.div>
                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                    Halaman ini adalah verifikasi mandiri yang dibuat oleh penandatangan sebagai penanda keaslian dokumen.
                  </p>
                </div>
              </motion.article>
            </motion.div>
          </>
        ) : (
          /* ========================================================
           * DOKUMEN TIDAK DITEMUKAN
           * ======================================================== */
          <>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...entranceTransition, delay: 0.15 }}
              className="px-1 text-left"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display tracking-tight leading-snug bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                Verifikasi Dokumen
              </h1>
              <p className="text-sm sm:text-base text-neutral-400/90 mt-1 sm:mt-1.5 font-normal">
                Hasil validasi dokumen berdasarkan QR code.
              </p>
            </motion.div>

            <motion.article 
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ ...entranceTransition, delay: 0.25 }}
              className="rounded-3xl bg-[#0c0d12]/75 backdrop-blur-3xl border border-red-500/25 border-t-red-500/40 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-8 text-center flex flex-col items-center gap-3.5"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.08, 1],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)] relative z-10"
                >
                  <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>

                {!shouldReduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-red-400/50 pointer-events-none"
                    animate={{ scale: [1, 1.8], opacity: [0.75, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </div>

              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                Dokumen Tidak Ditemukan
              </h2>

              <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
                Kode QR tidak valid atau dokumen tidak terdaftar di sistem verifikasi Ardi Ulinnuha.
              </p>

              {documentId && (
                <div className="font-mono text-sm text-neutral-400 bg-white/[0.04] px-3.5 py-1.5 rounded-lg border border-white/10 break-all max-w-full">
                  ID: <span className="text-neutral-200 font-semibold">{documentId}</span>
                </div>
              )}
            </motion.article>
          </>
        )}
      </div>

      {/* FOOTER */}
      <motion.footer 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 w-full text-center text-xs sm:text-sm text-neutral-400 font-mono py-2"
      >
        &copy; 2026 Ardi Ulinnuha &bull; Sistem Verifikasi
      </motion.footer>
    </div>
  );
};
