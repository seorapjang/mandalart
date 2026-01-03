'use client';

import { TEMPLATES, MandalaTemplate } from '@/lib/templates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: MandalaTemplate) => void;
}

export default function TemplateSelector({
  isOpen,
  onClose,
  onSelect,
}: TemplateSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">템플릿 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                onSelect(template);
                onClose();
              }}
              className="w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-semibold text-gray-900">{template.name}</div>
              <div className="text-sm text-gray-600">{template.description}</div>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          템플릿을 선택하면 현재 내용이 대체됩니다
        </p>
      </div>
    </div>
  );
}
