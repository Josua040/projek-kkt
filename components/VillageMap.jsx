'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom pin icon (terracotta), built with inline SVG so it doesn't depend
// on Leaflet's default marker image assets (which often break in Next.js).
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
  iconAnchor: [18, 48], // tip of the pin points to the exact coordinate
  popupAnchor: [0, -44],
});

export default function VillageMap({
  center = [1.348987, 124.885827],
  zoom = 14,
  villageName = 'Kumelembuay',
  subtitle = 'Kecamatan Tomohon Timur, Kota Tomohon',
}) {
  return (
    <div
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
        style={{ height: '420px', width: '100%' }}
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
