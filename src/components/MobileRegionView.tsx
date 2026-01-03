'use client';

import { RegionIndex, MandalaData, CENTER_TO_OUTER_REGION, CellIndex } from '@/types/mandala';
import MandalaRegion from './MandalaRegion';

interface MobileRegionViewProps {
  regionIndex: RegionIndex;
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onNavigateToRegion: (region: RegionIndex) => void;
}

// 중앙 영역 뷰에서 각 셀 위치와 연결된 외곽 영역
const CELL_POSITION_TO_REGION: Record<CellIndex, RegionIndex | null> = {
  0: 0, // 좌상 -> 영역 0
  1: 1, // 상 -> 영역 1
  2: 2, // 우상 -> 영역 2
  3: 3, // 좌 -> 영역 3
  4: null, // 중앙 -> 없음 (메인 목표)
  5: 5, // 우 -> 영역 5
  6: 6, // 좌하 -> 영역 6
  7: 7, // 하 -> 영역 7
  8: 8, // 우하 -> 영역 8
};

export default function MobileRegionView({
  regionIndex,
  data,
  onCellChange,
  onNavigateToRegion,
}: MobileRegionViewProps) {
  // 중앙 영역(4)일 때는 모서리 셀 클릭으로 해당 영역으로 이동 가능
  const handleRegionClick = (clickedRegion: RegionIndex) => {
    if (regionIndex === 4 && clickedRegion !== 4) {
      // 중앙 영역에서 외곽 영역으로 이동
      onNavigateToRegion(clickedRegion);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* 현재 영역 표시 */}
      <div className="mb-4">
        <MandalaRegion
          regionIndex={regionIndex}
          data={data}
          onCellChange={onCellChange}
          onRegionClick={handleRegionClick}
        />
      </div>

      {/* 중앙 영역일 때 안내 메시지 */}
      {regionIndex === 4 && (
        <p className="text-center text-sm text-gray-500 mt-2">
          모서리 셀을 탭하면 해당 영역으로 이동합니다
        </p>
      )}

      {/* 외곽 영역일 때 중앙으로 돌아가기 버튼 */}
      {regionIndex !== 4 && (
        <button
          onClick={() => onNavigateToRegion(4)}
          className="w-full mt-4 py-2 bg-amber-100 text-amber-900 rounded-lg font-medium hover:bg-amber-200 transition-colors"
        >
          중앙 영역으로 돌아가기
        </button>
      )}
    </div>
  );
}
