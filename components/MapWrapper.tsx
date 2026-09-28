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
      // --map-height dikonsumsi oleh VillageMap; 300px HP, 420px desktop
      style={{ '--map-height': '300px' } as React.CSSProperties}
      className="[--map-height:300px] lg:[--map-height:420px]"
    >
      <VillageMap
        center={center}
        villageName={villageName}
        subtitle={subtitle}
      />
    </div>
  );
}
