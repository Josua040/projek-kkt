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
  villageName = 'Kumelembuay',
  subtitle = 'Kecamatan Tomohon Timur, Kota Tomohon',
}: VillageMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [mapMode, setMapMode] = useState<'osm' | 'satellite'>('osm');
  const [is3D, setIs3D] = useState<boolean>(false);

  // Memoize koordinat agar referensi array tidak berubah di setiap render
  const [lng, lat] = useMemo(() => toLngLat(center), [center]);

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

      // ── 2. Marker Pin Utama Pusat Kelurahan ──────────────────────────
      const centerPin = document.createElement('div');
      centerPin.className = 'cursor-pointer select-none';
      centerPin.innerHTML = `
        <svg width="34" height="46" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));">
          <path d="M18 0C8 0 0 8 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8 28 0 18 0z" fill="#BC6C25" stroke="#1B4332" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="7" fill="#FAF7F2"/>
        </svg>
      `;

      const centerPopup = new maplibregl.Popup({
        offset: [0, -36],
        closeButton: false,
      }).setHTML(`
        <div style="font-family: inherit; padding: 4px 6px; text-align: center;">
          <strong style="color: #1B4332; font-size: 13px; font-weight: 700; display: block;">${villageName}</strong>
          <span style="color: #414844; font-size: 11px; line-height: 1.3; display: block; margin-top: 2px;">${subtitle}</span>
        </div>
      `);

      new maplibregl.Marker({ element: centerPin, anchor: 'bottom' })
        .setLngLat([lng, lat])
        .setPopup(centerPopup)
        .addTo(map);

      // ── 3. Marker Bernomor untuk Lingkungan (jika koordinat terisi) ──
      lingkungan.forEach((l, idx) => {
        if (!l.koordinat) return; // Lewati lingkungan tanpa koordinat

        const markerEl = document.createElement('div');
        markerEl.className =
          'cursor-pointer select-none flex items-center justify-center font-bold text-white shadow-md transition-transform hover:scale-110';
        markerEl.style.width = '26px';
        markerEl.style.height = '26px';
        markerEl.style.borderRadius = '50%';
        markerEl.style.backgroundColor = '#1B4332';
        markerEl.style.border = '2px solid #FAF7F2';
        markerEl.style.fontSize = '12px';
        markerEl.style.lineHeight = '1';
        markerEl.textContent = `${idx + 1}`;

        const popup = new maplibregl.Popup({
          offset: [0, -14],
          closeButton: true,
        }).setHTML(`
          <div style="font-family: inherit; padding: 4px 2px; min-width: 150px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px;">
              <span style="background-color: #1B4332; color: white; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">${idx + 1}</span>
              <strong style="color: #1B4332; font-size: 13px;">${l.nama}</strong>
            </div>
            <p style="margin: 0; font-size: 11px; color: #1C1C18; line-height: 1.4;">
              <span style="color: #64748B; font-weight: 600;">Kepala:</span> <strong>${l.kepala}</strong>
            </p>
            <p style="margin: 3px 0 0; font-size: 11px; color: #1C1C18; line-height: 1.4;">
              <span style="color: #64748B; font-weight: 600;">Wakil:</span> ${l.wakil}
            </p>
          </div>
        `);

        new maplibregl.Marker({ element: markerEl, anchor: 'center' })
          .setLngLat(toLngLat(l.koordinat))
          .setPopup(popup)
          .addTo(map);
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [lng, lat, zoom, villageName, subtitle]);

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

  // Handler tombol Pusatkan ke center & zoom awal
  const handleRecenter = () => {
    const map = mapRef.current;
    if (!map) return;

    map.flyTo({
      center: [lng, lat],
      zoom: zoom,
      pitch: is3D ? 60 : 0,
      bearing: is3D ? -20 : 0,
      essential: true,
      duration: 1000,
    });
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
      {/* ── Toolbar Kontrol Peta (Pojok Kiri Atas) ────────────────────────── */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2 select-none">
        {/* Toggle Peta / Satelit */}
        <div className="inline-flex rounded-full bg-white/95 p-0.5 sm:p-1 shadow-md border border-[#C1C8C2]/80 backdrop-blur-xs">
          <button
            type="button"
            onClick={() => handleSetMapMode('osm')}
            className={`rounded-full px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              mapMode === 'osm'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-[#1B4332] hover:bg-[#1B4332]/10'
            }`}
            aria-pressed={mapMode === 'osm'}
          >
            Peta
          </button>
          <button
            type="button"
            onClick={() => handleSetMapMode('satellite')}
            className={`rounded-full px-2.5 sm:px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              mapMode === 'satellite'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-[#1B4332] hover:bg-[#1B4332]/10'
            }`}
            aria-pressed={mapMode === 'satellite'}
          >
            Satelit
          </button>
        </div>

        {/* Toggle 2D / 3D */}
        <div className="inline-flex rounded-full bg-white/95 p-0.5 sm:p-1 shadow-md border border-[#C1C8C2]/80 backdrop-blur-xs">
          <button
            type="button"
            onClick={() => handleToggle3D(false)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              !is3D
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-[#1B4332] hover:bg-[#1B4332]/10'
            }`}
            aria-pressed={!is3D}
          >
            2D
          </button>
          <button
            type="button"
            onClick={() => handleToggle3D(true)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              is3D
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-[#1B4332] hover:bg-[#1B4332]/10'
            }`}
            aria-pressed={is3D}
          >
            3D
          </button>
        </div>

        {/* Tombol Pusatkan */}
        <button
          type="button"
          onClick={handleRecenter}
          className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-[#1B4332] shadow-md border border-[#C1C8C2]/80 transition-colors hover:bg-[#1B4332] hover:text-white backdrop-blur-xs cursor-pointer active:scale-95"
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
          <span className="hidden xs:inline sm:inline">Pusatkan</span>
        </button>
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
