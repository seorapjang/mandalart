'use client';

import { Region, MandalaData } from '@/types/mandala';
import MandalaRegion from './MandalaRegion';

interface MobileRegionViewProps {
  region: Region;
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onNavigateToRegion: (region: Region) => void;
  activeRegions?: Set<Region>;
}

export default function MobileRegionView({
  region,
  data,
  onCellChange,
  onNavigateToRegion,
  activeRegions,
}: MobileRegionViewProps) {
  // 비활성화된 영역에 접근하려고 하면 중앙으로 이동
  const isRegionActive = !activeRegions || activeRegions.has(region);

  if (!isRegionActive) {
    return (
      <div className="w-full max-w-sm mx-auto text-center py-8">
        <p className="text-gray-500 mb-4">
          이 영역은 아직 활성화되지 않았습니다.
        </p>
        <button
          onClick={() => onNavigateToRegion(Region.CENTER)}
          className="px-4 py-2 bg-orange-100 text-orange-900 rounded-lg font-medium hover:bg-orange-200 transition-colors"
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
          region={region}
          data={data}
          onCellChange={onCellChange}
        />
      </div>

      {/* 중앙 영역일 때 안내 메시지 */}
      {region === Region.CENTER && (
        <p className="text-center text-sm text-gray-500 mt-2">
          모서리에 하위 목표를 입력하면 해당 영역이 활성화됩니다
        </p>
      )}

      {/* 외곽 영역일 때 중앙으로 돌아가기 버튼 */}
      {region !== Region.CENTER && (
        <button
          onClick={() => onNavigateToRegion(Region.CENTER)}
          className="w-full mt-4 py-2 bg-orange-100 text-orange-900 rounded-lg font-medium hover:bg-orange-200 transition-colors"
        >
          중앙 영역으로 돌아가기
        </button>
      )}
    </div>
  );
}
