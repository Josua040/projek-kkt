'use client';

import dynamic from 'next/dynamic';

// dynamic + ssr:false HARUS ada di file 'use client' (lihat CONTEXT.md jebakan teknis)
const VillageMap = dynamic(() => import('./VillageMap'), { ssr: false });

interface MapWrapperProps {
  center: [number, number];
  villageName?: string;
  subtitle?: string;
}

export default function MapWrapper({ center, villageName, subtitle }: MapWrapperProps) {
  return (
    <div
      style={{ '--map-height': '420px' } as React.CSSProperties}
      className="w-full [--map-height:420px] sm:[--map-height:500px] lg:[--map-height:580px]"
    >
      <VillageMap
        center={center}
        villageName={villageName}
        subtitle={subtitle}
      />
    </div>
  );
}
