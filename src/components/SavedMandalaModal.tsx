'use client';

import { useState, useRef, useEffect } from 'react';
import { SavedMandala, MandalaData } from '@/types/mandala';

interface SavedMandalaModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: SavedMandala[];
  onLoad: (data: MandalaData) => void;
  onDelete: (id: string) => void;
  onUpdateName: (id: string, newName: string) => void;
}

export default function SavedMandalaModal({
  isOpen,
  onClose,
  savedList,
  onLoad,
  onDelete,
  onUpdateName,
}: SavedMandalaModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 편집 모드 시작 시 input focus
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  // 모달 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setEditingId(null);
      setEditValue('');
      setDeleteConfirmId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartEdit = (item: SavedMandala) => {
    setEditingId(item.id);
    setEditValue(item.name);
    setDeleteConfirmId(null);
  };

  const handleSaveEdit = () => {
    if (editingId && editValue.trim()) {
      onUpdateName(editingId, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleDeleteClick = (id: string) => {
    if (deleteConfirmId === id) {
      onDelete(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setEditingId(null);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-navy/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col shadow-xl border border-slate-border">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-slate-border">
          <h2 className="text-xl font-bold text-navy">내 만다라트</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-navy transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {savedList.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-slate-border mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-muted">저장된 만다라트가 없습니다</p>
              <p className="text-sm text-muted mt-1">상단의 &apos;저장&apos; 버튼을 눌러 저장해보세요</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-slate-border rounded-xl hover:bg-primary-soft/30 transition-colors"
                >
                  {/* 이름 (편집 가능) */}
                  <div className="mb-2">
                    {editingId === item.id ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyDown={handleKeyDown}
                        className="w-full px-2 py-1 text-navy font-semibold border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/35"
                      />
                    ) : (
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="text-left w-full font-semibold text-navy hover:text-primary transition-colors group flex items-center gap-1"
                      >
                        <span className="truncate">{item.name}</span>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* 날짜 */}
                  <div className="text-xs text-muted mb-3">
                    {formatDate(item.updatedAt)}
                  </div>

                  {/* 버튼들 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onLoad(item.data);
                        onClose();
                      }}
                      className="flex-1 px-3 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      불러오기
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        deleteConfirmId === item.id
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-surface text-muted border border-slate-border hover:bg-slate-bg hover:text-navy'
                      }`}
                    >
                      {deleteConfirmId === item.id ? '삭제 확인' : '삭제'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 */}
        {savedList.length > 0 && (
          <div className="p-4 border-t border-slate-border">
            <p className="text-xs text-muted text-center">
              이름을 클릭하여 수정할 수 있습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
