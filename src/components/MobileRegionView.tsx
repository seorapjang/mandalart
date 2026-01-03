'use client';

import { RegionIndex, MandalaData } from '@/types/mandala';
import MandalaRegion from './MandalaRegion';

interface MobileRegionViewProps {
  regionIndex: RegionIndex;
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onNavigateToRegion: (region: RegionIndex) => void;
  activeRegions?: Set<RegionIndex>;
}

export default function MobileRegionView({
  regionIndex,
  data,
  onCellChange,
  onNavigateToRegion,
  activeRegions,
}: MobileRegionViewProps) {
  // 비활성화된 영역에 접근하려고 하면 중앙으로 이동
  const isRegionActive = !activeRegions || activeRegions.has(regionIndex);

  if (!isRegionActive) {
    return (
      <div className="w-full max-w-sm mx-auto text-center py-8">
        <p className="text-gray-500 mb-4">
          이 영역은 아직 활성화되지 않았습니다.
        </p>
        <button
          onClick={() => onNavigateToRegion(4)}
          className="px-4 py-2 bg-amber-100 text-amber-900 rounded-lg font-medium hover:bg-amber-200 transition-colors"
        >
          중앙 영역으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* 현재 영역 표시 */}
      <div className="mb-4">
        <MandalaRegion
          regionIndex={regionIndex}
          data={data}
          onCellChange={onCellChange}
        />
      </div>

      {/* 중앙 영역일 때 안내 메시지 */}
      {regionIndex === 4 && (
        <p className="text-center text-sm text-gray-500 mt-2">
          모서리에 하위 목표를 입력하면 해당 영역이 활성화됩니다
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
