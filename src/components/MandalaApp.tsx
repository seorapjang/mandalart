'use client';

import { useState, useRef, useEffect } from 'react';
import MandalaGrid from '@/components/MandalaGrid';
import Toolbar from '@/components/Toolbar';
import TemplateSelector from '@/components/TemplateSelector';
import MobileNavigation from '@/components/MobileNavigation';
import MobileRegionView from '@/components/MobileRegionView';
import { useMandalaData } from '@/hooks/useMandalaData';
import { useExport } from '@/hooks/useExport';
import { getMandalaDataFromUrl } from '@/lib/encoder';
import { MandalaTemplate } from '@/lib/templates';
import { Region } from '@/types/mandala';

export default function MandalaApp() {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region>(Region.CENTER); // 중앙 영역으로 시작
  const gridRef = useRef<HTMLDivElement>(null);
  const exportGridRef = useRef<HTMLDivElement>(null); // 이미지 내보내기용 (모든 영역 표시)

  const { data, updateCell, resetData, loadData, activeRegions } = useMandalaData();
  const { exportToPng, copyToClipboard } = useExport(exportGridRef);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // URL에서 데이터 로드 (클라이언트 사이드에서만)
  useEffect(() => {
    const urlData = getMandalaDataFromUrl();
    if (urlData.some((cell) => cell !== '')) {
      loadData(urlData);
    }
    setIsInitialized(true);
  }, [loadData]);

  const handleSelectTemplate = (template: MandalaTemplate) => {
    loadData([...template.data]); // 깊은 복사
  };

  const handleReset = () => {
    if (confirm('모든 내용을 초기화하시겠습니까?')) {
      resetData();
      // URL 파라미터도 제거
      window.history.replaceState({}, '', window.location.pathname);
      setCurrentRegion(Region.CENTER); // 중앙 영역으로 리셋
    }
  };

  const handleNavigateToRegion = (region: Region) => {
    setCurrentRegion(region);
  };

  // 초기화 전에는 로딩 표시
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">만다라트</h1>
          <p className="text-sm md:text-base text-gray-600">
            목표를 9개의 세부 목표로 나누고, 각각을 8개의 실행 항목으로 구체화하세요
          </p>
        </header>

        {/* 툴바 */}
        <div className="mb-6">
          <Toolbar
            data={data}
            onExportPng={exportToPng}
            onCopyToClipboard={copyToClipboard}
            onReset={handleReset}
            onSelectTemplate={() => setIsTemplateOpen(true)}
          />
        </div>

        {/* 모바일 네비게이션 (활성화된 영역만 표시) */}
        {isMobile && (
          <MobileNavigation
            currentRegion={currentRegion}
            onRegionChange={setCurrentRegion}
            activeRegions={activeRegions}
            data={data}
          />
        )}

        {/* 만다라트 그리드 */}
        {isMobile ? (
          <MobileRegionView
            region={currentRegion}
            data={data}
            onCellChange={updateCell}
            onNavigateToRegion={handleNavigateToRegion}
            activeRegions={activeRegions}
          />
        ) : (
          <MandalaGrid
            ref={gridRef}
            data={data}
            onCellChange={updateCell}
            activeRegions={activeRegions}
          />
        )}

        {/* 이미지 내보내기용 전체 그리드 (숨김) */}
        <div className="fixed -left-[9999px] -top-[9999px]">
          <MandalaGrid
            ref={exportGridRef}
            data={data}
            onCellChange={updateCell}
            showAllRegions={true}
          />
        </div>

        {/* 사용법 안내 */}
        <footer className="mt-8 text-center text-xs md:text-sm text-gray-500">
          <p>셀을 클릭하여 내용을 입력하세요. Enter로 저장, ESC로 취소합니다.</p>
          <p className="mt-1">중앙 영역의 모서리에 목표를 입력하면 해당 영역이 활성화됩니다.</p>
        </footer>
      </div>

      {/* 템플릿 선택 모달 */}
      <TemplateSelector
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        onSelect={handleSelectTemplate}
      />
    </main>
  );
}
