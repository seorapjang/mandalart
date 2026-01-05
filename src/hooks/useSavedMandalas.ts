'use client';

import { useState, useCallback, useEffect } from 'react';
import { MandalaData, SavedMandala, MAIN_GOAL_INDEX } from '@/types/mandala';

const STORAGE_KEY = 'mandala_saved_list';

export function useSavedMandalas() {
  const [savedList, setSavedList] = useState<SavedMandala[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 클라이언트에서만 localStorage 로드
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SavedMandala[];
        // 최신순 정렬
        parsed.sort((a, b) => b.updatedAt - a.updatedAt);
        setSavedList(parsed);
      }
    } catch (error) {
      console.error('Failed to load saved mandalas:', error);
    }
    setIsLoaded(true);
  }, []);

  // localStorage에 저장
  const persistToStorage = useCallback((list: SavedMandala[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, []);

  // 새 만다라트 저장
  const saveMandala = useCallback((data: MandalaData) => {
    const now = Date.now();
    const mainGoal = data[MAIN_GOAL_INDEX] || '';
    const name = mainGoal.trim() || `만다라트 ${new Date(now).toLocaleDateString('ko-KR')}`;

    const newMandala: SavedMandala = {
      id: `mandala_${now}`,
      name,
      data: [...data],
      createdAt: now,
      updatedAt: now,
    };

    setSavedList((prev) => {
      const updated = [newMandala, ...prev];
      persistToStorage(updated);
      return updated;
    });

    return newMandala;
  }, [persistToStorage]);

  // 만다라트 삭제
  const deleteMandala = useCallback((id: string) => {
    setSavedList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      persistToStorage(updated);
      return updated;
    });
  }, [persistToStorage]);

  // 이름 수정
  const updateName = useCallback((id: string, newName: string) => {
    setSavedList((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? { ...item, name: newName.trim() || item.name, updatedAt: Date.now() }
          : item
      );
      persistToStorage(updated);
      return updated;
    });
  }, [persistToStorage]);

  return {
    savedList,
    isLoaded,
    saveMandala,
    deleteMandala,
    updateName,
  };
}
