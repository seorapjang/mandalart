// 만다라트 데이터 타입 정의

// 81칸 데이터 (9x9 그리드)
export type MandalaData = string[];

// 영역 인덱스 (0-8)
// 레이아웃:
// [0] [1] [2]
// [3] [4] [5]  <- 영역 4가 중앙 (메인 목표)
// [6] [7] [8]
export type RegionIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 셀 인덱스 (각 3x3 영역 내에서 0-8)
// [0] [1] [2]
// [3] [4] [5]  <- 셀 4가 각 영역의 중앙
// [6] [7] [8]
export type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 영역별 색상
export const REGION_COLORS: Record<RegionIndex, { bg: string; border: string; text: string }> = {
  0: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900' },
  1: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-900' },
  2: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-900' },
  3: { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-900' },
  4: { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-900' }, // 중앙 (메인)
  5: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900' },
  6: { bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-900' },
  7: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-900' },
  8: { bg: 'bg-lime-100', border: 'border-lime-300', text: 'text-lime-900' },
};

// 영역의 9x9 그리드 내 시작 위치 (row, col)
const REGION_OFFSETS: Record<RegionIndex, [number, number]> = {
  0: [0, 0],
  1: [0, 3],
  2: [0, 6],
  3: [3, 0],
  4: [3, 3],
  5: [3, 6],
  6: [6, 0],
  7: [6, 3],
  8: [6, 6],
};

// 영역 인덱스와 셀 인덱스로 전체 그리드 인덱스 계산
export function getGlobalIndex(regionIndex: RegionIndex, cellIndex: CellIndex): number {
  const [rowOffset, colOffset] = REGION_OFFSETS[regionIndex];
  const cellRow = Math.floor(cellIndex / 3);
  const cellCol = cellIndex % 3;
  const globalRow = rowOffset + cellRow;
  const globalCol = colOffset + cellCol;
  return globalRow * 9 + globalCol;
}

// 전체 그리드 인덱스로 영역 인덱스와 셀 인덱스 계산
export function getRegionAndCellIndex(globalIndex: number): { regionIndex: RegionIndex; cellIndex: CellIndex } {
  const row = Math.floor(globalIndex / 9);
  const col = globalIndex % 9;

  const regionRow = Math.floor(row / 3);
  const regionCol = Math.floor(col / 3);
  const regionIndex = (regionRow * 3 + regionCol) as RegionIndex;

  const cellRow = row % 3;
  const cellCol = col % 3;
  const cellIndex = (cellRow * 3 + cellCol) as CellIndex;

  return { regionIndex, cellIndex };
}

// 중앙 영역의 셀과 연결된 외곽 영역 인덱스 매핑
// 중앙 영역의 셀 인덱스 -> 해당 셀이 테마가 되는 외곽 영역 인덱스
export const CENTER_TO_OUTER_REGION: Record<CellIndex, RegionIndex | null> = {
  0: 0, // 좌상
  1: 1, // 상
  2: 2, // 우상
  3: 3, // 좌
  4: null, // 중앙 (메인 목표, 연결 없음)
  5: 5, // 우
  6: 6, // 좌하
  7: 7, // 하
  8: 8, // 우하
};

// 빈 만다라트 데이터 생성
export function createEmptyMandala(): MandalaData {
  return Array(81).fill('');
}

// 중앙 영역의 중앙 셀 (메인 목표) 인덱스
export const MAIN_GOAL_INDEX = getGlobalIndex(4, 4); // 40
