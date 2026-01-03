'use client';

import { RegionIndex, MandalaData, REGION_COLORS, getGlobalIndex, CellIndex, MAIN_GOAL_INDEX } from '@/types/mandala';

interface MobileNavigationProps {
  currentRegion: RegionIndex;
  onRegionChange: (region: RegionIndex) => void;
  activeRegions?: Set<RegionIndex>;
  data: MandalaData;
}

// 영역 인덱스 → 중앙 영역의 해당 셀 인덱스 (영역 이름을 가져오기 위해)
const REGION_TO_CENTER_CELL: Record<RegionIndex, CellIndex | null> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4, // 중앙 영역은 메인 목표
  5: 5,
  6: 6,
  7: 7,
  8: 8,
};

// 기본 레이블 (이름이 없을 때)
const DEFAULT_LABELS: Record<RegionIndex, string> = {
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
  activeRegions,
  data,
}: MobileNavigationProps) {
  // 중앙(4)을 가장 먼저 표시
  const regions: RegionIndex[] = [4, 0, 1, 2, 3, 5, 6, 7, 8];

  // activeRegions가 없으면 모든 영역 표시
  const isRegionActive = (region: RegionIndex) => {
    if (!activeRegions) return true;
    return activeRegions.has(region);
  };

  // 영역의 이름 가져오기 (중앙 영역의 해당 셀 값)
  const getRegionLabel = (region: RegionIndex) => {
    const cellIndex = REGION_TO_CENTER_CELL[region];
    if (cellIndex === null) return DEFAULT_LABELS[region];

    // 중앙 영역(4)의 경우 메인 목표
    const globalIndex = region === 4 ? MAIN_GOAL_INDEX : getGlobalIndex(4, cellIndex);
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
        if (!isActive && region !== 4) {
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
              ${isCurrent ? 'ring-2 ring-offset-1 ring-gray-800 scale-105' : 'opacity-70 hover:opacity-100'}
            `}
          >
            {getRegionLabel(region)}
          </button>
        );
      })}
    </div>
  );
}
