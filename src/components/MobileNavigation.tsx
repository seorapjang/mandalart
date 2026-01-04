'use client';

import { Region, Cell, MandalaData, REGION_COLORS, getGlobalIndex, MAIN_GOAL_INDEX } from '@/types/mandala';

interface MobileNavigationProps {
  currentRegion: Region;
  onRegionChange: (region: Region) => void;
  activeRegions?: Set<Region>;
  data: MandalaData;
}

// 영역 → 중앙 영역의 해당 셀 (영역 이름을 가져오기 위해)
const REGION_TO_CENTER_CELL: Record<Region, Cell> = {
  [Region.TOP_LEFT]: Cell.TOP_LEFT,
  [Region.TOP]: Cell.TOP,
  [Region.TOP_RIGHT]: Cell.TOP_RIGHT,
  [Region.LEFT]: Cell.LEFT,
  [Region.CENTER]: Cell.CENTER,
  [Region.RIGHT]: Cell.RIGHT,
  [Region.BOTTOM_LEFT]: Cell.BOTTOM_LEFT,
  [Region.BOTTOM]: Cell.BOTTOM,
  [Region.BOTTOM_RIGHT]: Cell.BOTTOM_RIGHT,
};

// 기본 레이블 (이름이 없을 때)
const DEFAULT_LABELS: Record<Region, string> = {
  [Region.TOP_LEFT]: '좌상',
  [Region.TOP]: '상',
  [Region.TOP_RIGHT]: '우상',
  [Region.LEFT]: '좌',
  [Region.CENTER]: '중앙',
  [Region.RIGHT]: '우',
  [Region.BOTTOM_LEFT]: '좌하',
  [Region.BOTTOM]: '하',
  [Region.BOTTOM_RIGHT]: '우하',
};

export default function MobileNavigation({
  currentRegion,
  onRegionChange,
  activeRegions,
  data,
}: MobileNavigationProps) {
  // 중앙을 가장 먼저 표시
  const regions: Region[] = [
    Region.CENTER,
    Region.TOP_LEFT, Region.TOP, Region.TOP_RIGHT,
    Region.LEFT, Region.RIGHT,
    Region.BOTTOM_LEFT, Region.BOTTOM, Region.BOTTOM_RIGHT,
  ];

  // activeRegions가 없으면 모든 영역 표시
  const isRegionActive = (region: Region) => {
    if (!activeRegions) return true;
    return activeRegions.has(region);
  };

  // 영역의 이름 가져오기 (중앙 영역의 해당 셀 값)
  const getRegionLabel = (region: Region) => {
    const cell = REGION_TO_CENTER_CELL[region];

    // 중앙 영역의 경우 메인 목표
    const globalIndex = region === Region.CENTER
      ? MAIN_GOAL_INDEX
      : getGlobalIndex(Region.CENTER, cell);
    const value = data[globalIndex]?.trim();

    if (!value) return DEFAULT_LABELS[region];

    // 너무 긴 경우 자르기
    return value.length > 8 ? value.slice(0, 7) + '…' : value;
  };

  return (
    <div className="flex flex-wrap justify-center gap-1 mb-4">
      {regions.map((region) => {
        const colors = REGION_COLORS[region];
        const isActive = isRegionActive(region);
        const isCurrent = currentRegion === region;

        // 비활성화된 영역은 숨김 (중앙 영역 제외)
        if (!isActive && region !== Region.CENTER) {
          return null;
        }

        return (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium
              transition-all duration-200
              ${colors.bg} ${colors.text}
              ${isCurrent ? 'ring-2 ring-offset-1 ring-burnt scale-105' : 'opacity-70 hover:opacity-100'}
            `}
          >
            {getRegionLabel(region)}
          </button>
        );
      })}
    </div>
  );
}
