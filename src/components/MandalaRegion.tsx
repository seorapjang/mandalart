'use client';

import { RegionIndex, CellIndex, MandalaData, getGlobalIndex, MAIN_GOAL_INDEX } from '@/types/mandala';
import MandalaCell from './MandalaCell';

interface MandalaRegionProps {
  regionIndex: RegionIndex;
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onRegionClick?: (regionIndex: RegionIndex) => void; // 모바일에서 영역 클릭 시
}

export default function MandalaRegion({
  regionIndex,
  data,
  onCellChange,
  onRegionClick,
}: MandalaRegionProps) {
  const cells: CellIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full aspect-square">
      {cells.map((cellIndex) => {
        const globalIndex = getGlobalIndex(regionIndex, cellIndex);
        const isCenter = cellIndex === 4;
        const isMainGoal = globalIndex === MAIN_GOAL_INDEX;

        return (
          <MandalaCell
            key={cellIndex}
            value={data[globalIndex] || ''}
            onChange={(value) => onCellChange(globalIndex, value)}
            regionIndex={regionIndex}
            cellIndex={cellIndex}
            isCenter={isCenter}
            isMainGoal={isMainGoal}
          />
        );
      })}
    </div>
  );
}
