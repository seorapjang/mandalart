'use client';

import { RegionIndex, REGION_COLORS } from '@/types/mandala';

interface MobileNavigationProps {
  currentRegion: RegionIndex;
  onRegionChange: (region: RegionIndex) => void;
}

const REGION_LABELS: Record<RegionIndex, string> = {
  0: '좌상',
  1: '상',
  2: '우상',
  3: '좌',
  4: '중앙',
  5: '우',
  6: '좌하',
  7: '하',
  8: '우하',
};

export default function MobileNavigation({
  currentRegion,
  onRegionChange,
}: MobileNavigationProps) {
  const regions: RegionIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex flex-wrap justify-center gap-1 mb-4">
      {regions.map((region) => {
        const colors = REGION_COLORS[region];
        const isActive = currentRegion === region;

        return (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium
              transition-all duration-200
              ${colors.bg} ${colors.text}
              ${isActive ? 'ring-2 ring-offset-1 ring-gray-800 scale-105' : 'opacity-70 hover:opacity-100'}
            `}
          >
            {REGION_LABELS[region]}
          </button>
        );
      })}
    </div>
  );
}
