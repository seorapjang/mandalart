'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  MandalaData,
  createEmptyMandala,
  getGlobalIndex,
  getRegionAndCellIndex,
  Region,
  Cell,
  ALL_CELLS,
  CENTER_TO_OUTER_REGION
} from '@/types/mandala';

// 외곽 영역 → 중앙 영역의 해당 셀 매핑
const OUTER_REGION_TO_CENTER_CELL: Record<Region, Cell | null> = {
  [Region.TOP_LEFT]: Cell.TOP_LEFT,
  [Region.TOP]: Cell.TOP,
  [Region.TOP_RIGHT]: Cell.TOP_RIGHT,
  [Region.LEFT]: Cell.LEFT,
  [Region.CENTER]: null, // 중앙 영역은 연결 없음
  [Region.RIGHT]: Cell.RIGHT,
  [Region.BOTTOM_LEFT]: Cell.BOTTOM_LEFT,
  [Region.BOTTOM]: Cell.BOTTOM,
  [Region.BOTTOM_RIGHT]: Cell.BOTTOM_RIGHT,
};

// 특정 영역의 모든 셀 초기화
function clearRegion(data: MandalaData, region: Region): void {
  ALL_CELLS.forEach((cell) => {
    const index = getGlobalIndex(region, cell);
    data[index] = '';
  });
}

export function useMandalaData(initialData?: MandalaData) {
  const [data, setData] = useState<MandalaData>(initialData || createEmptyMandala());

  const updateCell = useCallback((globalIndex: number, value: string) => {
    setData((prev) => {
      const newData = [...prev];
      newData[globalIndex] = value;

      const { regionIndex, cellIndex } = getRegionAndCellIndex(globalIndex);
      const isClearing = value.trim() === '';

      if (regionIndex === Region.CENTER) {
        // 중앙 영역의 셀을 수정한 경우
        const linkedOuterRegion = CENTER_TO_OUTER_REGION[cellIndex];
        if (linkedOuterRegion !== null) {
          if (isClearing) {
            // 중앙 영역의 외곽 셀을 지우면 → 해당 외곽 영역 전체 초기화
            clearRegion(newData, linkedOuterRegion);
          } else {
            // 값이 있으면 → 외곽 영역의 중앙 셀만 동기화
            const outerCenterIndex = getGlobalIndex(linkedOuterRegion, Cell.CENTER);
            newData[outerCenterIndex] = value;
          }
        }
      } else if (cellIndex === Cell.CENTER) {
        // 외곽 영역의 중앙 셀을 수정한 경우
        const linkedCenterCell = OUTER_REGION_TO_CENTER_CELL[regionIndex];
        if (linkedCenterCell !== null) {
          if (isClearing) {
            // 외곽 영역의 중앙 셀을 지우면 → 해당 외곽 영역 전체 초기화 + 중앙 영역 외곽 셀 동기화
            clearRegion(newData, regionIndex);
            const centerCellIndex = getGlobalIndex(Region.CENTER, linkedCenterCell);
            newData[centerCellIndex] = '';
          } else {
            // 값이 있으면 → 중앙 영역의 해당 모서리 셀만 동기화
            const centerCellIndex = getGlobalIndex(Region.CENTER, linkedCenterCell);
            newData[centerCellIndex] = value;
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

  // 활성화된 영역 계산 (중앙 영역의 모서리 셀에 내용이 있으면 해당 외곽 영역 활성화)
  const activeRegions = useMemo(() => {
    const active = new Set<Region>([Region.CENTER]); // 중앙 영역은 항상 활성화

    // 중앙 영역의 각 모서리 셀 확인 (CENTER는 메인 목표이므로 제외)
    const outerCells: Cell[] = [
      Cell.TOP_LEFT, Cell.TOP, Cell.TOP_RIGHT,
      Cell.LEFT, Cell.RIGHT,
      Cell.BOTTOM_LEFT, Cell.BOTTOM, Cell.BOTTOM_RIGHT,
    ];

    outerCells.forEach((cellIndex) => {
      const globalIndex = getGlobalIndex(Region.CENTER, cellIndex);
      if (data[globalIndex] && data[globalIndex].trim() !== '') {
        const linkedRegion = CENTER_TO_OUTER_REGION[cellIndex];
        if (linkedRegion !== null) {
          active.add(linkedRegion);
        }
      }
    });

    return active;
  }, [data]);

  return {
    data,
    updateCell,
    resetData,
    loadData,
    activeRegions,
  };
}
