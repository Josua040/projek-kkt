'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { site } from '@/data/site';
import { lingkungan } from '@/data/pemerintahan';

interface VillageMapProps {
  center?: [number, number];
  zoom?: number;
  villageName?: string;
  subtitle?: string;
}

// Konfigurasi static worker URL agar Next.js / Turbopack memuat worker dari folder public
if (typeof window !== 'undefined') {
  maplibregl.setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');
}

/**
 * Konversi koordinat [lat, lng] (standar data lokal / site.ts)
 * ke [lng, lat] yang dibutuhkan MapLibre GL JS.
 */
function toLngLat(coord: [number, number]): [number, number] {
  if (Math.abs(coord[0]) <= 90 && Math.abs(coord[1]) > 90) {
    return [coord[1], coord[0]];
  }
  return coord;
}

export default function VillageMap({
  center = site.koordinat,
  zoom = 14,
}: VillageMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [mapMode, setMapMode] = useState<'osm' | 'satellite'>('osm');
  const [is3D, setIs3D] = useState<boolean>(false);

  // Memoize koordinat agar referensi array tidak berubah di setiap render
  const [lng, lat] = useMemo(() => toLngLat(center), [center]);

  // Gugusan koordinat 7 lingkungan untuk inisialisasi fitBounds & tombol Pusatkan
  const clusterBounds = useMemo(() => {
    const bounds = new maplibregl.LngLatBounds();
    lingkungan.forEach((l) => {
      if (l.koordinat && l.koordinat.length >= 2) {
        // MapLibre menggunakan format [lng, lat], data/pemerintahan.ts menggunakan [lat, lng]
        bounds.extend([l.koordinat[1], l.koordinat[0]]);
      }
    });
    return bounds;
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    maplibregl.setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');

    // Basemap raster gratis (OSM & Esri Satellite) tanpa memerlukan API key
    const styleSpec: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
        },
        'satellite-tiles': {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
          attribution:
            'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a>',
        },
      },
      layers: [
        {
          id: 'osm-layer',
          type: 'raster',
          source: 'osm-tiles',
          minzoom: 0,
          maxzoom: 19,
          layout: {
            visibility: 'visible',
          },
        },
        {
          id: 'satellite-layer',
          type: 'raster',
          source: 'satellite-tiles',
          minzoom: 0,
          maxzoom: 19,
          layout: {
            visibility: 'none',
          },
        },
      ],
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleSpec,
      center: [lng, lat],
      zoom: zoom,
      bounds: !clusterBounds.isEmpty() ? clusterBounds : undefined,
      fitBoundsOptions: {
        padding: 60,
        maxZoom: 17,
      },
      pitch: 0,
      bearing: 0,
      // cooperativeGestures: scroll halaman dengan 1 jari di HP tidak terkunci
      cooperativeGestures: true,
      touchPitch: false,
    });

    // Navigasi kontrol zoom (+ / -) di pojok kanan bawah
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      'bottom-right'
    );

    map.on('load', () => {
      // ── 1. Muat batas wilayah GeoJSON kelurahan ───────────────────────
      map.addSource('kumelembuay-boundary', {
        type: 'geojson',
        data: '/data/kumelembuay-boundary.geojson',
      });

      // Layer Fill: Terracotta #BC6C25 dengan opacity rendah 0.15
      map.addLayer({
        id: 'boundary-fill',
        type: 'fill',
        source: 'kumelembuay-boundary',
        paint: {
          'fill-color': '#BC6C25',
          'fill-opacity': 0.15,
        },
      });

      // Layer Line: Border terracotta solid, width 2
      map.addLayer({
        id: 'boundary-line',
        type: 'line',
        source: 'kumelembuay-boundary',
        paint: {
          'line-color': '#BC6C25',
          'line-width': 2,
        },
      });

      // Tampilan awal: fitBounds ke gugusan 7 titik lingkungan (padding 60px, maxZoom 17)
      if (!clusterBounds.isEmpty()) {
        map.fitBounds(clusterBounds, {
          padding: 60,
          maxZoom: 17,
          duration: 0,
        });
      }

      // ── 2. Marker 7 Lingkungan (lingkaran ~28px dengan label Romawi I-VII) ──
      const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

      lingkungan.forEach((l, idx) => {
        if (!l.koordinat || l.koordinat.length < 2) return; // Lewati jika tanpa koordinat

        const romanMatch = l.nama.match(/\b([IVXLCDM]+)$/i);
        const romanLabel = romanMatch
          ? romanMatch[1].toUpperCase()
          : (ROMAN_NUMERALS[idx] ?? `${idx + 1}`);

        const markerEl = document.createElement('div');
        markerEl.className =
          'cursor-pointer select-none flex items-center justify-center font-bold text-white shadow-md transition-transform hover:scale-110';
        markerEl.style.width = '28px';
        markerEl.style.height = '28px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = '#1B4332';
        markerEl.style.color = '#FFFFFF';
        markerEl.style.border = '1.5px solid #FFFFFF';
        markerEl.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.35)';
        markerEl.style.fontSize = romanLabel.length >= 3 ? '10px' : '11px';
        markerEl.style.letterSpacing = romanLabel.length >= 3 ? '-0.5px' : 'normal';
        markerEl.style.lineHeight = '1';
        markerEl.setAttribute('role', 'button');
        markerEl.setAttribute('aria-label', `${l.nama}: Kepala ${l.kepala}, Wakil ${l.wakil}`);
        markerEl.textContent = romanLabel;

        const popup = new maplibregl.Popup({
          offset: [0, -16],
          closeButton: true,
          closeOnClick: true,
          maxWidth: '260px',
        }).setHTML(`
          <div style="font-family: inherit; padding: 4px 2px; color: #1C1C18;">
            <strong style="display: block; font-size: 13px; font-weight: 700; color: #1B4332; line-height: 1.3; margin-bottom: 5px; padding-bottom: 4px; border-bottom: 1px solid #E5E7EB;">${l.nama}</strong>
            <div style="font-size: 12px; line-height: 1.4; margin-bottom: 2px;">
              <span style="color: #414844; font-weight: 600;">Kepala:</span> <span style="font-weight: 500;">${l.kepala}</span>
            </div>
            <div style="font-size: 12px; line-height: 1.4;">
              <span style="color: #414844; font-weight: 600;">Wakil:</span> <span style="font-weight: 500;">${l.wakil}</span>
            </div>
          </div>
        `);

        // Urutan koordinat di data/pemerintahan.ts [lat, lng] dibalik ke [lng, lat]
        const markerLngLat: [number, number] = [l.koordinat[1], l.koordinat[0]];

        new maplibregl.Marker({ element: markerEl, anchor: 'center' })
          .setLngLat(markerLngLat)
          .setPopup(popup)
          .addTo(map);
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [lng, lat, zoom, clusterBounds]);

  // Handler pergantian mode Peta / Satelit yang aman dari error "Style is not done loading"
  const handleSetMapMode = (mode: 'osm' | 'satellite') => {
    setMapMode(mode);
    const map = mapRef.current;
    if (!map) return;

    const applyVisibility = () => {
      try {
        if (map.getLayer('osm-layer')) {
          map.setLayoutProperty(
            'osm-layer',
            'visibility',
            mode === 'osm' ? 'visible' : 'none'
          );
        }
        if (map.getLayer('satellite-layer')) {
          map.setLayoutProperty(
            'satellite-layer',
            'visibility',
            mode === 'satellite' ? 'visible' : 'none'
          );
        }
      } catch (err) {
        console.warn('Gagal mengubah visibility layer:', err);
      }
    };

    if (!map.isStyleLoaded()) {
      map.once('styledata', applyVisibility);
    } else {
      applyVisibility();
    }
  };

  // Handler pergantian 2D / 3D
  const handleToggle3D = (to3D: boolean) => {
    setIs3D(to3D);
    const map = mapRef.current;
    if (!map) return;

    map.easeTo({
      pitch: to3D ? 60 : 0,
      bearing: to3D ? -20 : 0,
      duration: 800,
    });
  };

  // Handler tombol Pusatkan mengembalikan ke gugusan 7 titik lingkungan
  const handleRecenter = () => {
    const map = mapRef.current;
    if (!map) return;

    if (!clusterBounds.isEmpty()) {
      map.fitBounds(clusterBounds, {
        padding: 60,
        maxZoom: 17,
        pitch: is3D ? 60 : 0,
        bearing: is3D ? -20 : 0,
        essential: true,
        duration: 1000,
      });
    } else {
      map.flyTo({
        center: [lng, lat],
        zoom: zoom,
        pitch: is3D ? 60 : 0,
        bearing: is3D ? -20 : 0,
        essential: true,
        duration: 1000,
      });
    }
  };

  return (
    <div
      className="relative isolate w-full overflow-hidden"
      style={{
        isolation: 'isolate',
        borderRadius: '1.5rem',
        border: '1.5px solid rgba(188, 108, 37, 0.2)',
        boxShadow: '0px 4px 16px -2px rgba(60, 40, 20, 0.08)',
      }}
    >
      {/* ── Toolbar Kontrol Peta Terpadu (Unified Glassmorphism Dock) ────── */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 select-none max-w-[calc(100%-1.5rem)]">
        <div className="inline-flex flex-wrap items-center gap-1 sm:gap-1.5 rounded-2xl bg-white/95 p-1 sm:p-1.5 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.15)] border border-[#C1C8C2]/80 backdrop-blur-md">
          {/* Segment 1: Toggle Mode Peta / Satelit */}
          <div className="flex items-center rounded-xl bg-[#FAF7F2] p-0.5 border border-[#E5E0D5]">
            <button
              type="button"
              onClick={() => handleSetMapMode('osm')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                mapMode === 'osm'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#1B4332]/10'
              }`}
              aria-pressed={mapMode === 'osm'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              <span>Peta</span>
            </button>
            <button
              type="button"
              onClick={() => handleSetMapMode('satellite')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                mapMode === 'satellite'
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#1B4332]/10'
              }`}
              aria-pressed={mapMode === 'satellite'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Satelit</span>
            </button>
          </div>

          {/* Pembatas halus 1 */}
          <div className="hidden xs:block h-5 w-[1px] bg-[#C1C8C2]/70 mx-0.5" aria-hidden="true" />

          {/* Segment 2: Toggle Sudut Pandang 2D / 3D */}
          <div className="flex items-center rounded-xl bg-[#FAF7F2] p-0.5 border border-[#E5E0D5]">
            <button
              type="button"
              onClick={() => handleToggle3D(false)}
              className={`inline-flex items-center gap-1 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                !is3D
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#1B4332]/10'
              }`}
              aria-pressed={!is3D}
              title="Tampilan Datar 2D"
            >
              <span>2D</span>
            </button>
            <button
              type="button"
              onClick={() => handleToggle3D(true)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2 sm:px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                is3D
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'text-[#1B4332] hover:bg-[#1B4332]/10'
              }`}
              aria-pressed={is3D}
              title="Tampilan Perspektif 3D"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span>3D</span>
            </button>
          </div>

          {/* Pembatas halus 2 */}
          <div className="hidden xs:block h-5 w-[1px] bg-[#C1C8C2]/70 mx-0.5" aria-hidden="true" />

          {/* Segment 3: Tombol Pusatkan */}
          <button
            type="button"
            onClick={handleRecenter}
            className="inline-flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#1B4332] bg-[#FAF7F2] border border-[#E5E0D5] hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
            title="Kembalikan posisi peta ke pusat kelurahan"
            aria-label="Pusatkan peta ke Kelurahan Kumelembuay"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            <span>Pusatkan</span>
          </button>
        </div>
      </div>

      {/* Kontainer Kanvas Peta MapLibre */}
      <div
        ref={mapContainerRef}
        style={{ height: 'var(--map-height, 420px)', width: '100%' }}
        className="h-[420px] sm:h-[500px] lg:h-[580px] w-full"
      />
    </div>
  );
}
