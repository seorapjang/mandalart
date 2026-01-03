'use client';

import { forwardRef } from 'react';
import { RegionIndex, MandalaData } from '@/types/mandala';
import MandalaRegion from './MandalaRegion';

interface MandalaGridProps {
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onRegionClick?: (regionIndex: RegionIndex) => void;
}

const MandalaGrid = forwardRef<HTMLDivElement, MandalaGridProps>(
  ({ data, onCellChange, onRegionClick }, ref) => {
    const regions: RegionIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    return (
      <div
        ref={ref}
        className="grid grid-cols-3 grid-rows-3 gap-1 w-full max-w-3xl mx-auto aspect-square bg-gray-200 p-1 rounded-lg"
      >
        {regions.map((regionIndex) => (
          <div
            key={regionIndex}
            className="bg-white rounded overflow-hidden"
          >
            <MandalaRegion
              regionIndex={regionIndex}
              data={data}
              onCellChange={onCellChange}
              onRegionClick={onRegionClick}
            />
          </div>
        ))}
      </div>
    );
  }
);

MandalaGrid.displayName = 'MandalaGrid';

export default MandalaGrid;
