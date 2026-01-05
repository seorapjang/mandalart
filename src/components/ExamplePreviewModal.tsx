'use client';

import { useState, useEffect } from 'react';
import { MandalaTemplate } from '@/lib/templates';
import { Region, Cell, getGlobalIndex, ALL_CELLS, MAIN_GOAL_INDEX } from '@/types/mandala';

interface ExamplePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: MandalaTemplate | null;
}

// 영역 이름
const REGION_LABELS: Record<Region, string> = {
  [Region.TOP_LEFT]: '좌상',
  [Region.TOP]: '상',
  [Region.TOP_RIGHT]: '우상',
  [Region.LEFT]: '좌',
  [Region.CENTER]: '중앙',
  [Region.RIGHT]: '우',
  [Region.BOTTOM_LEFT]: '좌하',
  [Region.BOTTOM]: '하',
  [Region.BOTTOM_RIGHT]: '우하',
};

// 영역 → 중앙 영역의 해당 셀
const REGION_TO_CENTER_CELL: Record<Region, Cell> = {
  [Region.TOP_LEFT]: Cell.TOP_LEFT,
  [Region.TOP]: Cell.TOP,
  [Region.TOP_RIGHT]: Cell.TOP_RIGHT,
  [Region.LEFT]: Cell.LEFT,
  [Region.CENTER]: Cell.CENTER,
  [Region.RIGHT]: Cell.RIGHT,
  [Region.BOTTOM_LEFT]: Cell.BOTTOM_LEFT,
  [Region.BOTTOM]: Cell.BOTTOM,
  [Region.BOTTOM_RIGHT]: Cell.BOTTOM_RIGHT,
};

export default function ExamplePreviewModal({
  isOpen,
  onClose,
  template,
}: ExamplePreviewModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region>(Region.CENTER);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모달 열릴 때 중앙으로 초기화 및 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      setCurrentRegion(Region.CENTER);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !template) return null;

  // 셀 배경색 결정
  const getCellBgClass = (region: Region, cell: Cell) => {
    const isCenterCell = cell === Cell.CENTER;
    const isCenterRegion = region === Region.CENTER;
    const isMainGoal = isCenterRegion && isCenterCell;

    if (isMainGoal) return 'bg-primary/15';
    if (isCenterRegion) return 'bg-primary-soft';
    if (isCenterCell) return 'bg-primary-soft';
    return 'bg-white';
  };

  // 셀 텍스트 스타일 결정
  const getCellTextClass = (region: Region, cell: Cell) => {
    const isCenterCell = cell === Cell.CENTER;
    const isCenterRegion = region === Region.CENTER;
    const isMainGoal = isCenterRegion && isCenterCell;

    if (isMainGoal) return 'text-primary font-bold';
    if (isCenterCell) return 'font-semibold text-navy';
    return 'text-navy';
  };

  // 영역 레이블 가져오기
  const getRegionLabel = (region: Region) => {
    const cell = REGION_TO_CENTER_CELL[region];
    const globalIndex = region === Region.CENTER
      ? MAIN_GOAL_INDEX
      : getGlobalIndex(Region.CENTER, cell);
    const value = template.data[globalIndex]?.trim();

    if (!value) return REGION_LABELS[region];
    return value.length > 6 ? value.slice(0, 5) + '…' : value;
  };

  // 3x3 단일 영역 렌더링 (모바일용)
  const renderSingleRegion = (region: Region) => {
    return (
      <div className="grid grid-cols-3 gap-0.5 bg-slate-border rounded-xl overflow-hidden p-0.5">
        {ALL_CELLS.map((cell) => {
          const globalIndex = getGlobalIndex(region, cell);
          const value = template.data[globalIndex];

          return (
            <div
              key={cell}
              className={`
                aspect-square p-2 text-sm leading-tight
                flex items-center justify-center text-center
                rounded-lg
                ${getCellBgClass(region, cell)}
                ${getCellTextClass(region, cell)}
              `}
            >
              <span className="line-clamp-3 break-words whitespace-pre-wrap overflow-hidden">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // 9x9 전체 그리드 렌더링 (데스크톱용)
  const renderFullGrid = () => {
    const rows = [];

    for (let row = 0; row < 9; row++) {
      const cells = [];
      for (let col = 0; col < 9; col++) {
        const regionRow = Math.floor(row / 3);
        const regionCol = Math.floor(col / 3);
        const region = (regionRow * 3 + regionCol) as Region;

        const cellRow = row % 3;
        const cellCol = col % 3;
        const cell = (cellRow * 3 + cellCol) as Cell;

        const globalIndex = getGlobalIndex(region, cell);
        const value = template.data[globalIndex];

        cells.push(
          <div
            key={`${row}-${col}`}
            className={`
              aspect-square p-1 text-[10px] leading-tight
              flex items-center justify-center text-center
              border border-primary/10
              ${getCellBgClass(region, cell)}
              ${getCellTextClass(region, cell)}
            `}
          >
            <span className="line-clamp-3 break-words whitespace-pre-wrap overflow-hidden">
              {value}
            </span>
          </div>
        );
      }
      rows.push(
        <div key={row} className="grid grid-cols-9">
          {cells}
        </div>
      );
    }

    return rows;
  };

  // 모바일 네비게이션
  const regions: Region[] = [
    Region.CENTER,
    Region.TOP_LEFT, Region.TOP, Region.TOP_RIGHT,
    Region.LEFT, Region.RIGHT,
    Region.BOTTOM_LEFT, Region.BOTTOM, Region.BOTTOM_RIGHT,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-navy/50"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-surface rounded-2xl shadow-xl w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col border border-slate-border">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-slate-border bg-primary-soft">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-base md:text-lg font-bold text-navy truncate">{template.name}</h2>
            <p className="text-xs md:text-sm text-muted truncate">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral rounded-full transition-colors text-navy flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 그리드 */}
        <div className="flex-1 overflow-auto p-2 md:p-4">
          {isMobile ? (
            <div className="max-w-sm mx-auto">
              {/* 모바일 네비게이션 */}
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {regions.map((region) => {
                  const isCurrent = currentRegion === region;
                  const isCenterRegion = region === Region.CENTER;

                  return (
                    <button
                      key={region}
                      onClick={() => setCurrentRegion(region)}
                      className={`
                        px-2 py-1 rounded-md text-xs font-medium
                        transition-all duration-200
                        ${isCenterRegion ? 'bg-primary-soft text-primary' : 'bg-white text-navy'}
                        ${isCurrent ? 'ring-2 ring-offset-1 ring-primary scale-105' : 'opacity-70 hover:opacity-100'}
                      `}
                    >
                      {getRegionLabel(region)}
                    </button>
                  );
                })}
              </div>

              {/* 단일 영역 */}
              {renderSingleRegion(currentRegion)}

              {/* 중앙으로 돌아가기 버튼 */}
              {currentRegion !== Region.CENTER && (
                <button
                  onClick={() => setCurrentRegion(Region.CENTER)}
                  className="w-full mt-4 py-2 bg-primary-soft text-primary rounded-xl font-medium hover:bg-neutral transition-colors text-sm"
                >
                  중앙 영역으로 돌아가기
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-border overflow-hidden aspect-square max-w-full mx-auto">
              {renderFullGrid()}
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="p-3 md:p-4 border-t border-slate-border bg-neutral">
          <p className="text-xs text-muted text-center">
            이 예시를 참고하여 나만의 만다라트를 작성해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
