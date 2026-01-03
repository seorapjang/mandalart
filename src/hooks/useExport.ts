'use client';

import { useCallback, RefObject } from 'react';
import { toPng } from 'html-to-image';

// DOM 업데이트를 기다리는 헬퍼 함수
const waitForDomUpdate = () => new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 100)));

export function useExport(gridRef: RefObject<HTMLDivElement | null>) {
  // PNG 이미지 다운로드
  const exportToPng = useCallback(async () => {
    if (!gridRef.current) {
      console.error('Grid element not found');
      return;
    }

    try {
      // DOM 업데이트 대기
      await waitForDomUpdate();

      const dataUrl = await toPng(gridRef.current, {
        quality: 1,
        pixelRatio: 2, // 고해상도
        backgroundColor: '#f3f4f6', // gray-100
        cacheBust: true, // 캐시 무효화
      });

      // 다운로드 링크 생성
      const link = document.createElement('a');
      link.download = `mandala-chart-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to export PNG:', error);
      alert('이미지 내보내기에 실패했습니다.');
    }
  }, [gridRef]);

  // 클립보드에 이미지 복사
  const copyToClipboard = useCallback(async () => {
    if (!gridRef.current) {
      console.error('Grid element not found');
      return;
    }

    try {
      // DOM 업데이트 대기
      await waitForDomUpdate();

      const dataUrl = await toPng(gridRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#f3f4f6',
        cacheBust: true, // 캐시 무효화
      });

      // Data URL을 Blob으로 변환
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // 클립보드에 복사
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);

      alert('클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('클립보드 복사에 실패했습니다. 브라우저가 이 기능을 지원하지 않을 수 있습니다.');
    }
  }, [gridRef]);

  return {
    exportToPng,
    copyToClipboard,
  };
}
