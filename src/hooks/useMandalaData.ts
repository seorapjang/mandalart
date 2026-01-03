'use client';

import { useState, useCallback } from 'react';
import { MandalaData, createEmptyMandala, getGlobalIndex, RegionIndex, CellIndex, CENTER_TO_OUTER_REGION } from '@/types/mandala';

export function useMandalaData(initialData?: MandalaData) {
  const [data, setData] = useState<MandalaData>(initialData || createEmptyMandala());

  const updateCell = useCallback((globalIndex: number, value: string) => {
    setData((prev) => {
      const newData = [...prev];
      newData[globalIndex] = value;

      // 중앙 영역(4)의 셀을 수정하면 연결된 외곽 영역의 중앙 셀도 동기화
      // 예: 중앙 영역의 좌상 셀(0) = 영역 0의 중앙 셀(4)
      const centerRegionIndex: RegionIndex = 4;
      const centerRegionStart = getGlobalIndex(centerRegionIndex, 0);
      const centerRegionEnd = getGlobalIndex(centerRegionIndex, 8);

      if (globalIndex >= centerRegionStart && globalIndex <= centerRegionEnd) {
        // 중앙 영역 내의 셀
        const cellIndexInCenter = (globalIndex - centerRegionStart) as CellIndex;
        // 셀 인덱스를 다시 계산 (3x3 내에서의 위치)
        const row = Math.floor((globalIndex - 30) / 9); // 30은 중앙 영역 시작점 (행 3, 열 3)
        const col = (globalIndex - 30) % 9;
        if (col >= 0 && col < 3 && row >= 0 && row < 3) {
          const actualCellIndex = (row * 3 + col) as CellIndex;
          const linkedOuterRegion = CENTER_TO_OUTER_REGION[actualCellIndex];

          if (linkedOuterRegion !== null) {
            // 외곽 영역의 중앙 셀(인덱스 4)을 동기화
            const outerCenterIndex = getGlobalIndex(linkedOuterRegion, 4);
            newData[outerCenterIndex] = value;
          }
        }
      }

      return newData;
    });
  }, []);

  const resetData = useCallback(() => {
    setData(createEmptyMandala());
  }, []);

  const loadData = useCallback((newData: MandalaData) => {
    setData(newData);
  }, []);

  return {
    data,
    updateCell,
    resetData,
    loadData,
  };
}
