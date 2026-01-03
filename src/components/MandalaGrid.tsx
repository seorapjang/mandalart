'use client';

import { forwardRef } from 'react';
import { RegionIndex, MandalaData, REGION_COLORS } from '@/types/mandala';
import MandalaRegion from './MandalaRegion';

interface MandalaGridProps {
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onRegionClick?: (regionIndex: RegionIndex) => void;
  activeRegions?: Set<RegionIndex>;
  showAllRegions?: boolean; // true면 모든 영역 표시 (이미지 내보내기용)
}

const MandalaGrid = forwardRef<HTMLDivElement, MandalaGridProps>(
  ({ data, onCellChange, onRegionClick, activeRegions, showAllRegions = false }, ref) => {
    const regions: RegionIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // activeRegions가 없거나 showAllRegions가 true면 모든 영역 표시
    const shouldShowRegion = (regionIndex: RegionIndex) => {
      if (showAllRegions || !activeRegions) return true;
      return activeRegions.has(regionIndex);
    };

    return (
      <div
        ref={ref}
        className="grid grid-cols-3 grid-rows-3 gap-1 w-full max-w-3xl mx-auto aspect-square bg-gray-200 p-1 rounded-lg"
      >
        {regions.map((regionIndex) => {
          const isActive = shouldShowRegion(regionIndex);
          const colors = REGION_COLORS[regionIndex];

          return (
            <div
              key={regionIndex}
              className={`
                rounded overflow-hidden transition-all duration-300
                ${isActive ? 'bg-white' : `${colors.bg} opacity-30`}
              `}
            >
              {isActive ? (
                <MandalaRegion
                  regionIndex={regionIndex}
                  data={data}
                  onCellChange={onCellChange}
                  onRegionClick={onRegionClick}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-xs text-center p-2">
                    중앙 영역에서<br />목표를 입력하세요
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

MandalaGrid.displayName = 'MandalaGrid';

export default MandalaGrid;
