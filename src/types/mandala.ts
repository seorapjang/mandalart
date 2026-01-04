// 만다라트 데이터 타입 정의

// 81칸 데이터 (9x9 그리드)
export type MandalaData = string[];

// 영역 enum
// 레이아웃:
// [TOP_LEFT]    [TOP]    [TOP_RIGHT]
// [LEFT]        [CENTER] [RIGHT]      <- CENTER가 메인 목표
// [BOTTOM_LEFT] [BOTTOM] [BOTTOM_RIGHT]
export enum Region {
  TOP_LEFT = 0,
  TOP = 1,
  TOP_RIGHT = 2,
  LEFT = 3,
  CENTER = 4,
  RIGHT = 5,
  BOTTOM_LEFT = 6,
  BOTTOM = 7,
  BOTTOM_RIGHT = 8,
}

// 셀 위치 enum (각 3x3 영역 내에서)
// [TOP_LEFT]    [TOP]    [TOP_RIGHT]
// [LEFT]        [CENTER] [RIGHT]      <- CENTER가 각 영역의 중앙
// [BOTTOM_LEFT] [BOTTOM] [BOTTOM_RIGHT]
export enum Cell {
  TOP_LEFT = 0,
  TOP = 1,
  TOP_RIGHT = 2,
  LEFT = 3,
  CENTER = 4,
  RIGHT = 5,
  BOTTOM_LEFT = 6,
  BOTTOM = 7,
  BOTTOM_RIGHT = 8,
}

// 모든 영역 목록
export const ALL_REGIONS: Region[] = [
  Region.TOP_LEFT,
  Region.TOP,
  Region.TOP_RIGHT,
  Region.LEFT,
  Region.CENTER,
  Region.RIGHT,
  Region.BOTTOM_LEFT,
  Region.BOTTOM,
  Region.BOTTOM_RIGHT,
];

// 모든 셀 목록
export const ALL_CELLS: Cell[] = [
  Cell.TOP_LEFT,
  Cell.TOP,
  Cell.TOP_RIGHT,
  Cell.LEFT,
  Cell.CENTER,
  Cell.RIGHT,
  Cell.BOTTOM_LEFT,
  Cell.BOTTOM,
  Cell.BOTTOM_RIGHT,
];

// 영역별 색상 (OG 이미지 배경과 유사한 파스텔톤)
export const REGION_COLORS: Record<Region, { bg: string; border: string; text: string; ring: string }> = {
  [Region.TOP_LEFT]: { bg: 'bg-sky-200', border: 'border-sky-300', text: 'text-sky-900', ring: 'ring-sky-400' },
  [Region.TOP]: { bg: 'bg-rose-200', border: 'border-rose-300', text: 'text-rose-900', ring: 'ring-rose-400' },
  [Region.TOP_RIGHT]: { bg: 'bg-lime-200', border: 'border-lime-300', text: 'text-lime-900', ring: 'ring-lime-400' },
  [Region.LEFT]: { bg: 'bg-amber-200', border: 'border-amber-300', text: 'text-amber-900', ring: 'ring-amber-400' },
  [Region.CENTER]: { bg: 'bg-orange-300', border: 'border-orange-400', text: 'text-orange-900', ring: 'ring-orange-500' },
  [Region.RIGHT]: { bg: 'bg-yellow-200', border: 'border-yellow-300', text: 'text-yellow-900', ring: 'ring-yellow-400' },
  [Region.BOTTOM_LEFT]: { bg: 'bg-teal-200', border: 'border-teal-300', text: 'text-teal-900', ring: 'ring-teal-400' },
  [Region.BOTTOM]: { bg: 'bg-orange-200', border: 'border-orange-300', text: 'text-orange-900', ring: 'ring-orange-400' },
  [Region.BOTTOM_RIGHT]: { bg: 'bg-green-200', border: 'border-green-300', text: 'text-green-900', ring: 'ring-green-400' },
};

// 영역의 9x9 그리드 내 시작 위치 (row, col)
const REGION_OFFSETS: Record<Region, [number, number]> = {
  [Region.TOP_LEFT]: [0, 0],
  [Region.TOP]: [0, 3],
  [Region.TOP_RIGHT]: [0, 6],
  [Region.LEFT]: [3, 0],
  [Region.CENTER]: [3, 3],
  [Region.RIGHT]: [3, 6],
  [Region.BOTTOM_LEFT]: [6, 0],
  [Region.BOTTOM]: [6, 3],
  [Region.BOTTOM_RIGHT]: [6, 6],
};

// 영역 인덱스와 셀 인덱스로 전체 그리드 인덱스 계산
export function getGlobalIndex(region: Region, cell: Cell): number {
  const [rowOffset, colOffset] = REGION_OFFSETS[region];
  const cellRow = Math.floor(cell / 3);
  const cellCol = cell % 3;
  const globalRow = rowOffset + cellRow;
  const globalCol = colOffset + cellCol;
  return globalRow * 9 + globalCol;
}

// 전체 그리드 인덱스로 영역 인덱스와 셀 인덱스 계산
export function getRegionAndCellIndex(globalIndex: number): { regionIndex: Region; cellIndex: Cell } {
  const row = Math.floor(globalIndex / 9);
  const col = globalIndex % 9;

  const regionRow = Math.floor(row / 3);
  const regionCol = Math.floor(col / 3);
  const regionIndex = (regionRow * 3 + regionCol) as Region;

  const cellRow = row % 3;
  const cellCol = col % 3;
  const cellIndex = (cellRow * 3 + cellCol) as Cell;

  return { regionIndex, cellIndex };
}

// 중앙 영역의 셀과 연결된 외곽 영역 매핑
// 중앙 영역의 셀 -> 해당 셀이 테마가 되는 외곽 영역
export const CENTER_TO_OUTER_REGION: Record<Cell, Region | null> = {
  [Cell.TOP_LEFT]: Region.TOP_LEFT,
  [Cell.TOP]: Region.TOP,
  [Cell.TOP_RIGHT]: Region.TOP_RIGHT,
  [Cell.LEFT]: Region.LEFT,
  [Cell.CENTER]: null, // 메인 목표, 연결 없음
  [Cell.RIGHT]: Region.RIGHT,
  [Cell.BOTTOM_LEFT]: Region.BOTTOM_LEFT,
  [Cell.BOTTOM]: Region.BOTTOM,
  [Cell.BOTTOM_RIGHT]: Region.BOTTOM_RIGHT,
};

// 빈 만다라트 데이터 생성
export function createEmptyMandala(): MandalaData {
  return Array(81).fill('');
}

// 중앙 영역의 중앙 셀 (메인 목표) 인덱스
export const MAIN_GOAL_INDEX = getGlobalIndex(Region.CENTER, Cell.CENTER); // 40
