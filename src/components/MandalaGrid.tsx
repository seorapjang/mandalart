'use client';

import { forwardRef } from 'react';
import { Region, MandalaData, REGION_COLORS, ALL_REGIONS } from '@/types/mandala';
import MandalaRegion from './MandalaRegion';

interface MandalaGridProps {
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onRegionClick?: (region: Region) => void;
  activeRegions?: Set<Region>;
  showAllRegions?: boolean; // true면 모든 영역 표시 (이미지 내보내기용)
  hideInactiveMessage?: boolean; // true면 비활성 영역에 메시지 숨김 (내보내기용)
}

const MandalaGrid = forwardRef<HTMLDivElement, MandalaGridProps>(
  ({ data, onCellChange, onRegionClick, activeRegions, showAllRegions = false, hideInactiveMessage = false }, ref) => {
    // activeRegions가 없거나 showAllRegions가 true면 모든 영역 표시
    const shouldShowRegion = (region: Region) => {
      if (showAllRegions || !activeRegions) return true;
      return activeRegions.has(region);
    };

    return (
      <div
        ref={ref}
        className="grid grid-cols-3 grid-rows-3 gap-1 w-full max-w-3xl mx-auto aspect-square bg-slate-border p-1 rounded-xl"
      >
        {ALL_REGIONS.map((region) => {
          const isActive = shouldShowRegion(region);
          const colors = REGION_COLORS[region];

          return (
            <div
              key={region}
              className={`
                rounded overflow-hidden transition-all duration-300
                ${isActive ? 'bg-white' : `${colors.bg} opacity-30`}
              `}
            >
              {isActive ? (
                <MandalaRegion
                  region={region}
                  data={data}
                  onCellChange={onCellChange}
                  onRegionClick={onRegionClick}
                  forExport={hideInactiveMessage}
                />
              ) : hideInactiveMessage ? (
                <div className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-muted text-xs text-center p-2">
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
