'use client';

import { useState } from 'react';
import { MandalaData } from '@/types/mandala';
import { createShareUrl } from '@/lib/encoder';
import { TEMPLATES, MandalaTemplate } from '@/lib/templates';
import SplitButton from './ui/SplitButton';
import DropdownMenu, { DropdownItem } from './ui/DropdownMenu';

interface ToolbarProps {
  data: MandalaData;
  onExportPng: () => void;
  onCopyToClipboard: () => void;
  onReset: () => void;
  onOpenGuide: () => void;
  onSave: () => void;
  onOpenSavedList: () => void;
  onSelectExample: (template: MandalaTemplate) => void;
}

export default function Toolbar({
  data,
  onExportPng,
  onCopyToClipboard,
  onReset,
  onOpenGuide,
  onSave,
  onOpenSavedList,
  onSelectExample,
}: ToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [isExampleOpen, setIsExampleOpen] = useState(false);

  const handleShare = async () => {
    const shareUrl = createShareUrl(data);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      window.prompt('공유 링크를 복사하세요:', shareUrl);
    }
  };

  // 아이콘 버튼 스타일
  const iconBtnStyle = "p-2 bg-surface text-muted border border-slate-border rounded-xl hover:bg-slate-bg hover:text-navy transition-colors cursor-pointer relative group";

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {/* 저장 Split Button */}
      <SplitButton
        label="저장"
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        }
        onClick={onSave}
        dropdownContent={
          <DropdownItem
            onClick={onOpenSavedList}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            내 만다라트
          </DropdownItem>
        }
      />

      {/* 공유하기 Split Button */}
      <SplitButton
        label={copied ? '복사됨!' : '공유하기'}
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        }
        onClick={handleShare}
        dropdownContent={
          <>
            <DropdownItem
              onClick={onExportPng}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
            >
              이미지 다운로드
            </DropdownItem>
            <DropdownItem
              onClick={onCopyToClipboard}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              }
            >
              클립보드 복사
            </DropdownItem>
          </>
        }
      />

      {/* 예시 드롭다운 버튼 */}
      <div className="relative">
        <button
          onClick={() => setIsExampleOpen(!isExampleOpen)}
          className="flex items-center gap-1.5 px-3 py-2 bg-surface text-muted border border-slate-border rounded-xl hover:bg-slate-bg hover:text-navy transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-medium">예시</span>
        </button>
        <DropdownMenu
          isOpen={isExampleOpen}
          onClose={() => setIsExampleOpen(false)}
        >
          {TEMPLATES.map((template) => (
            <DropdownItem
              key={template.id}
              onClick={() => {
                onSelectExample(template);
                setIsExampleOpen(false);
              }}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            >
              {template.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </div>

      {/* 가이드 버튼 */}
      <button
        onClick={onOpenGuide}
        className="flex items-center gap-1.5 px-3 py-2 bg-surface text-muted border border-slate-border rounded-xl hover:bg-slate-bg hover:text-navy transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">가이드</span>
      </button>

      {/* 초기화 아이콘 버튼 */}
      <button
        onClick={onReset}
        className={iconBtnStyle}
        title="초기화"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {/* 툴팁 */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-navy text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          초기화
        </span>
      </button>
    </div>
  );
}
