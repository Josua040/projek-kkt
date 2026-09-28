'use client';

import dynamic from 'next/dynamic';

// Leaflet mengakses `window`, jadi komponennya WAJIB di-load tanpa SSR.
const VillageMap = dynamic(() => import('@/components/VillageMap'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 420, display: 'grid', placeItems: 'center' }}>
      Memuat peta...
    </div>
  ),
});

export default function PetaWilayahPage() {
  return (
    <section>
      <h2>Peta Wilayah</h2>
      <VillageMap />
    </section>
  );
}
