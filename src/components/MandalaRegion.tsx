'use client';

import { Region, Cell, MandalaData, getGlobalIndex, MAIN_GOAL_INDEX, ALL_CELLS } from '@/types/mandala';
import MandalaCell from './MandalaCell';

interface MandalaRegionProps {
  region: Region;
  data: MandalaData;
  onCellChange: (globalIndex: number, value: string) => void;
  onRegionClick?: (region: Region) => void;
  forExport?: boolean;
}

export default function MandalaRegion({
  region,
  data,
  onCellChange,
  onRegionClick,
  forExport = false,
}: MandalaRegionProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-0.5 p-0.5 w-full h-full aspect-square">
      {ALL_CELLS.map((cell) => {
        const globalIndex = getGlobalIndex(region, cell);
        const isCenter = cell === Cell.CENTER;
        const isMainGoal = globalIndex === MAIN_GOAL_INDEX;

        return (
          <MandalaCell
            key={cell}
            value={data[globalIndex] || ''}
            onChange={(value) => onCellChange(globalIndex, value)}
            region={region}
            cell={cell}
            isCenter={isCenter}
            isMainGoal={isMainGoal}
            forExport={forExport}
          />
        );
      })}
    </div>
  );
}
