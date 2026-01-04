'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Region, Cell, REGION_COLORS } from '@/types/mandala';

interface MandalaCellProps {
  value: string;
  onChange: (value: string) => void;
  region: Region;
  cell: Cell;
  isCenter: boolean; // 영역의 중앙 셀인지
  isMainGoal: boolean; // 메인 목표 셀인지 (전체 그리드의 정중앙)
  forExport?: boolean; // 내보내기용 (플레이스홀더 변경)
}

export default function MandalaCell({
  value,
  onChange,
  region,
  cell,
  isCenter,
  isMainGoal,
  forExport = false,
}: MandalaCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 외곽 영역의 중앙 셀은 중앙 그리드 색상 사용
  const shouldUseHighlight = isCenter && region !== Region.CENTER;
  const colors = shouldUseHighlight ? REGION_COLORS[Region.CENTER] : REGION_COLORS[region];

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleClick = useCallback(() => {
    setIsEditing(true);
    setEditValue(value);
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (editValue !== value) {
      onChange(editValue);
    }
  }, [editValue, value, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleBlur();
      } else if (e.key === 'Escape') {
        setEditValue(value);
        setIsEditing(false);
      }
    },
    [handleBlur, value]
  );

  // 꼭짓점 셀에 대한 border-radius 결정
  const getCornerRadius = () => {
    switch (cell) {
      case Cell.TOP_LEFT:
        return 'rounded-tl-lg';
      case Cell.TOP_RIGHT:
        return 'rounded-tr-lg';
      case Cell.BOTTOM_LEFT:
        return 'rounded-bl-lg';
      case Cell.BOTTOM_RIGHT:
        return 'rounded-br-lg';
      default:
        return '';
    }
  };

  // 스타일 결정
  const cellStyles = [
    'w-full h-full',
    'flex items-center justify-center',
    'text-center',
    colors.bg,
    colors.text,
    'border border-primary/10',
    'transition-all duration-200',
    'cursor-pointer',
    isMainGoal ? 'text-primary font-bold text-lg bg-primary/15 border border-primary/50 hover:bg-primary/20': '',
    !isEditing && 'hover:bg-primary/5 hover:border hover:border-primary/50',
    getCornerRadius(),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cellStyles} onClick={!isEditing ? handleClick : undefined}>
      {isEditing ? (
        <div className={`w-full h-full flex items-center justify-center ${colors.bg} brightness-105 ${getCornerRadius()}`}>
          <textarea
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`
              w-full h-full p-1
              text-center text-sm leading-tight
              resize-none
              bg-transparent
              focus:outline-none
              overflow-hidden
              ${colors.text}
            `}
          />
        </div>
      ) : (
        <span className="p-1 text-xs sm:text-sm break-words line-clamp-3 overflow-hidden">
          {value || (
            <span className={`${isMainGoal ? 'text-primary' : 'text-muted'}`}>
              {forExport ? '-' : isMainGoal ? '핵심목표' : '+'}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
