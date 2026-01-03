'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  MandalaData,
  createEmptyMandala,
  getGlobalIndex,
  getRegionAndCellIndex,
  RegionIndex,
  CellIndex,
  CENTER_TO_OUTER_REGION
} from '@/types/mandala';

// 외곽 영역 인덱스 → 중앙 영역의 해당 셀 인덱스 매핑
const OUTER_REGION_TO_CENTER_CELL: Record<RegionIndex, CellIndex | null> = {
  0: 0, // 영역 0 → 중앙의 좌상 셀
  1: 1, // 영역 1 → 중앙의 상 셀
  2: 2, // 영역 2 → 중앙의 우상 셀
  3: 3, // 영역 3 → 중앙의 좌 셀
  4: null, // 영역 4 (중앙) → 없음
  5: 5, // 영역 5 → 중앙의 우 셀
  6: 6, // 영역 6 → 중앙의 좌하 셀
  7: 7, // 영역 7 → 중앙의 하 셀
  8: 8, // 영역 8 → 중앙의 우하 셀
};

export function useMandalaData(initialData?: MandalaData) {
  const [data, setData] = useState<MandalaData>(initialData || createEmptyMandala());

  const updateCell = useCallback((globalIndex: number, value: string) => {
    setData((prev) => {
      const newData = [...prev];
      newData[globalIndex] = value;

      const { regionIndex, cellIndex } = getRegionAndCellIndex(globalIndex);

      if (regionIndex === 4) {
        // 중앙 영역의 셀을 수정한 경우 → 외곽 영역의 중앙 셀 동기화
        const linkedOuterRegion = CENTER_TO_OUTER_REGION[cellIndex];
        if (linkedOuterRegion !== null) {
          const outerCenterIndex = getGlobalIndex(linkedOuterRegion, 4);
          newData[outerCenterIndex] = value;
        }
      } else if (cellIndex === 4) {
        // 외곽 영역의 중앙 셀을 수정한 경우 → 중앙 영역의 해당 모서리 셀 동기화
        const linkedCenterCell = OUTER_REGION_TO_CENTER_CELL[regionIndex];
        if (linkedCenterCell !== null) {
          const centerCellIndex = getGlobalIndex(4, linkedCenterCell);
          newData[centerCellIndex] = value;
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
    const active = new Set<RegionIndex>([4]); // 중앙 영역은 항상 활성화

    // 중앙 영역의 각 모서리 셀 확인
    const centerCells: CellIndex[] = [0, 1, 2, 3, 5, 6, 7, 8]; // 4는 메인 목표이므로 제외

    centerCells.forEach((cellIndex) => {
      const globalIndex = getGlobalIndex(4, cellIndex);
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
