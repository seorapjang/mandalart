'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function DropdownMenu({
  isOpen,
  onClose,
  children,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full mt-1 z-50 bg-surface border border-slate-border rounded-xl shadow-lg py-1 min-w-[160px] right-0 md:right-auto md:left-0"
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
  danger?: boolean;
}

export function DropdownItem({ onClick, children, icon, danger }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
        danger
          ? 'text-red-500 hover:bg-red-50'
          : 'text-navy hover:bg-slate-bg'
      }`}
    >
      {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="border-t border-slate-border my-1" />;
}
