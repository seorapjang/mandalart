'use client';

import { useState, ReactNode } from 'react';
import DropdownMenu from './DropdownMenu';

interface SplitButtonProps {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  dropdownContent: ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function SplitButton({
  label,
  icon,
  onClick,
  dropdownContent,
  variant = 'primary',
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baseStyles = variant === 'primary'
    ? 'bg-primary/10 text-primary hover:bg-primary/20'
    : 'bg-surface text-navy border border-slate-border hover:bg-slate-bg';

  const dividerStyles = variant === 'primary'
    ? 'border-primary/20'
    : 'border-slate-border';

  return (
    <div className="relative inline-flex">
      <div className="inline-flex rounded-xl overflow-hidden">
        {/* 메인 버튼 */}
        <button
          onClick={onClick}
          className={`px-3 py-2 font-semibold flex items-center gap-2 transition-colors cursor-pointer ${baseStyles}`}
        >
          {icon && <span className="w-4 h-4">{icon}</span>}
          {label}
        </button>

        {/* 드롭다운 트리거 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-2 py-2 border-l transition-colors cursor-pointer ${baseStyles} ${dividerStyles}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      <DropdownMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {dropdownContent}
      </DropdownMenu>
    </div>
  );
}
