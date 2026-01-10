'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import MandalaGrid from '@/components/MandalaGrid';
import Toolbar from '@/components/Toolbar';
import TemplateSelector from '@/components/TemplateSelector';
import GuideModal from '@/components/GuideModal';
import MobileNavigation from '@/components/MobileNavigation';
import MobileRegionView from '@/components/MobileRegionView';
import { useMandalaData } from '@/hooks/useMandalaData';
import { useExport } from '@/hooks/useExport';
import { getMandalaDataFromUrl } from '@/lib/encoder';
import { MandalaTemplate } from '@/lib/templates';
import { Region } from '@/types/mandala';

export default function MandalaApp() {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null = 아직 결정 안됨
  const [currentRegion, setCurrentRegion] = useState<Region>(Region.CENTER); // 중앙 영역으로 시작
  const gridRef = useRef<HTMLDivElement>(null);
  const exportGridRef = useRef<HTMLDivElement>(null); // 이미지 내보내기용 (모든 영역 표시)

  const { data, updateCell, resetData, loadData, activeRegions } = useMandalaData();
  const { exportToPng, copyToClipboard } = useExport(exportGridRef);

  // 내보내기 그리드 강제 재렌더링을 위한 키
  const exportGridKey = useMemo(() => data.join('|'), [data]);

  // 클라이언트 사이드 초기화 (모바일 감지 + URL 데이터 로드)
  useEffect(() => {
    // 모바일 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // URL에서 데이터 로드
    const urlData = getMandalaDataFromUrl();
    if (urlData.some((cell) => cell !== '')) {
      loadData(urlData);
    }
    setIsInitialized(true);

    return () => window.removeEventListener('resize', checkMobile);
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
      <div className="min-h-screen bg-slate-bg flex items-center justify-center">
        <div className="text-muted">로딩 중...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">만다라트</h1>
          <p className="text-sm md:text-base text-muted">
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
            onOpenGuide={() => setIsGuideOpen(true)}
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
        <div key={exportGridKey} className="fixed -left-[9999px] -top-[9999px]">
          <MandalaGrid
            ref={exportGridRef}
            data={data}
            onCellChange={updateCell}
            activeRegions={activeRegions}
            hideInactiveMessage={true}
          />
        </div>

        {/* 사용법 안내 */}
        <footer className="mt-8 text-center text-xs md:text-sm text-muted">
          <p>셀을 클릭하여 내용을 입력하세요. Enter로 저장, ESC로 취소합니다.</p>
          <p className="mt-1">중앙 영역의 모서리에 목표를 입력하면 해당 영역이 활성화됩니다.</p>
        </footer>

        {/* SEO 콘텐츠 */}
        <section className="mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-navy mb-4">만다라트란?</h2>
          <div className="text-sm text-muted space-y-3">
            <p>
              <strong>만다라트(Mandalart)</strong>는 목표 생성과 계획 수립을 위한 강력한 도구입니다.
              일본의 디자이너 이마이즈미 히로아키가 개발한 이 방법은 중심 목표를 8개의 세부 목표로 나누고,
              각 세부 목표를 다시 8개의 실행 항목으로 구체화하여 총 72개의 행동 계획을 만들어냅니다.
            </p>
            <p>
              야구 선수 오타니 쇼헤이가 고등학교 시절 &quot;8개 구단 드래프트 1순위&quot;라는 목표를 달성하기 위해
              만다라트를 활용한 것으로 유명해졌습니다. 그는 이 도구를 통해 체력, 멘탈, 기술 등
              다양한 영역의 실행 계획을 체계적으로 수립했습니다.
            </p>
            <h3 className="text-base font-medium text-navy pt-2">만다라트 사용법</h3>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li>중앙에 핵심 목표를 입력합니다</li>
              <li>핵심 목표 주변 8칸에 세부 목표를 작성합니다</li>
              <li>각 세부 목표가 외곽 영역의 중심이 되어 8개의 실행 항목으로 확장됩니다</li>
              <li>72개의 구체적인 행동 계획이 완성됩니다</li>
            </ol>
            <p className="pt-2">
              만다라트는 목표 설정, 자기계발, 프로젝트 계획 등 다양한 분야에서 활용할 수 있는
              무료 목표 계획표입니다. 지금 바로 목표를 세우고 실행 계획을 만들어보세요.
            </p>
          </div>
        </section>
      </div>

      {/* 템플릿 선택 모달 */}
      <TemplateSelector
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        onSelect={handleSelectTemplate}
      />

      {/* 가이드 모달 */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </main>
  );
}
