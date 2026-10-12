'use client';

import React from 'react';

/**
 * HeroAnimatedBackground
 *
 * Background animasi modern, elegan, dan ringan untuk Hero Beranda.
 * Menggantikan foto statis yang sering terpotong di layar mobile.
 *
 * Fitur visual:
 * 1. Gradien dasar hijau hutan Tomohon (deep pine & emerald)
 * 2. Orb cahaya lembut (ambient aura) yang bernafas perlahan (slow float/glow)
 * 3. Siluet bukit & kontur topografi Gunung Mahawu dalam bentuk vektor SVG presisi
 * 4. Partikel gelembung/embun mikro naik perlahan melambangkan etimologi "kumelembuay" (air memancar)
 * 5. Pattern dot-grid halus untuk tekstur modern berkelas
 */
export default function HeroAnimatedBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 1. Gradien Dasar Kaya Warna */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 95% 85% at 75% 25%, #1f503c 0%, #163e2e 45%, #0d261c 100%)',
        }}
      />

      {/* 2. Tekstur Dot Matrix Halus Modern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 85%)',
        }}
      />

      {/* 3. Ambient Glow Orbs (Animasi Halus & Ringan) */}
      {/* Orb 1: Hijau Zamrud Lembut di kanan atas */}
      <div
        className="absolute -top-24 -right-24 sm:-top-32 sm:-right-20 w-80 sm:w-[520px] h-80 sm:h-[520px] rounded-full bg-[#40916C]/25 blur-3xl animate-hero-orb-1"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Orb 2: Aksen Hangat Terakota / Sunrise di kanan tengah */}
      <div
        className="absolute top-1/3 -right-12 sm:top-1/4 sm:right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#BC6C25]/20 blur-3xl animate-hero-orb-2"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Orb 3: Hijau Sage Dingin di kiri bawah */}
      <div
        className="absolute -bottom-20 -left-20 sm:bottom-0 sm:left-10 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#52B788]/15 blur-2xl animate-hero-orb-3"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* 4. Siluet Vektor Lanskap Pegunungan Mahawu (Presisi di Mobile & Desktop) */}
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 opacity-50 sm:opacity-60">
        <svg
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lapisan Bukit Belakang / Gunung Mahawu */}
          <path
            d="M0 240 Q180 140 380 180 T760 110 Q940 70 1200 160 L1200 320 L0 320 Z"
            fill="#123826"
            fillOpacity="0.45"
          />
          {/* Garis kontur bukit belakang */}
          <path
            d="M0 240 Q180 140 380 180 T760 110 Q940 70 1200 160"
            stroke="#52B788"
            strokeWidth="1.5"
            strokeOpacity="0.18"
            fill="none"
          />

          {/* Lapisan Bukit Tengah */}
          <path
            d="M0 260 Q220 180 480 220 T920 170 Q1060 160 1200 200 L1200 320 L0 320 Z"
            fill="#0F2E20"
            fillOpacity="0.7"
          />
          <path
            d="M0 260 Q220 180 480 220 T920 170 Q1060 160 1200 200"
            stroke="#52B788"
            strokeWidth="1.2"
            strokeOpacity="0.15"
            fill="none"
          />

          {/* Lapisan Bukit Depan */}
          <path
            d="M0 290 Q260 230 540 260 T1040 230 Q1120 230 1200 250 L1200 320 L0 320 Z"
            fill="#0B2318"
            fillOpacity="0.9"
          />
          <path
            d="M0 290 Q260 230 540 260 T1040 230 Q1120 230 1200 250"
            stroke="#74C69D"
            strokeWidth="1"
            strokeOpacity="0.2"
            fill="none"
          />
        </svg>
      </div>

      {/* 5. Partikel Mikro Naik Perlahan (Filosofi "Kumelembuay" = Air Berdenyut/Memancar) */}
      <div className="absolute inset-0">
        {[
          { left: '15%', size: 4, dur: '11s', delay: '0s', opacity: 0.35 },
          { left: '28%', size: 3, dur: '14s', delay: '2s', opacity: 0.25 },
          { left: '42%', size: 5, dur: '10s', delay: '4s', opacity: 0.3 },
          { left: '60%', size: 3, dur: '13s', delay: '1s', opacity: 0.3 },
          { left: '74%', size: 4, dur: '12s', delay: '3s', opacity: 0.25 },
          { left: '88%', size: 3, dur: '15s', delay: '5s', opacity: 0.2 },
        ].map((bubble, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#A5D0B9] animate-hero-particle"
            style={{
              left: bubble.left,
              bottom: '10%',
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDuration: bubble.dur,
              animationDelay: bubble.delay,
              opacity: bubble.opacity,
              boxShadow: '0 0 6px rgba(165, 208, 185, 0.6)',
            }}
          />
        ))}
      </div>

      {/* 6. Aksen Cahaya Horison Halus di Bawah */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(13, 38, 28, 0.9) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
