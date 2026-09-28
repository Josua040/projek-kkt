'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom pin icon (terracotta), dibangun dari SVG inline agar tidak bergantung
// pada aset gambar default Leaflet yang sering rusak di Next.js.
const villageIcon = L.divIcon({
  className: '',
  html: `
    <svg width="36" height="48" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 0C8 0 0 8 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8 28 0 18 0z"
            fill="#BC6C25" stroke="#1B4332" stroke-width="1.5"/>
      <circle cx="18" cy="18" r="7" fill="#FAF7F2"/>
    </svg>
  `,
  iconSize: [36, 48],
  iconAnchor: [18, 48], // ujung pin menunjuk tepat ke koordinat
  popupAnchor: [0, -44],
});

interface VillageMapProps {
  center?: [number, number];
  zoom?: number;
  villageName?: string;
  subtitle?: string;
}

export default function VillageMap({
  // TODO: ganti dengan koordinat presisi Kelurahan Kumelembuay
  // (klik kanan di Google Maps → salin koordinat)
  center = [1.3306, 124.8722],
  zoom = 14,
  villageName = 'Kumelembuay',
  subtitle = 'Kecamatan Tomohon Timur, Kota Tomohon',
}: VillageMapProps) {
  // Matikan dragging satu jari di perangkat sentuh (mobile) agar geser halaman
  // tidak terkunci oleh peta. Pinch-zoom dan popup tetap berfungsi.
  const isMobile = typeof L !== 'undefined' && L.Browser.mobile;

  return (
    <div
      className="isolate"
      style={{
        borderRadius: '1.5rem',
        overflow: 'hidden',
        border: '1.5px solid rgba(188, 108, 37, 0.2)',
        boxShadow: '0px 4px 16px -2px rgba(60, 40, 20, 0.08)',
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={!isMobile}
        style={{ height: 'var(--map-height, 300px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={villageIcon}>
          <Popup>
            <strong>{villageName}</strong>
            <br />
            {subtitle}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
