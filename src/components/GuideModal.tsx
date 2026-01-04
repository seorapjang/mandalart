'use client';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b bg-orange-50">
          <h2 className="text-xl font-bold text-gray-900">만다라트 작성 가이드</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* 인트로 */}
          <div className="text-center bg-orange-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">
              만다라트는 할 일 목록이 아니라<br />
              <span className="text-orange-600 font-bold">'삶을 어떻게 바꿀지'</span>를 정리하는 도구입니다.
            </p>
            <p className="text-sm text-gray-500 mt-2">아래 순서대로 하나씩만 따라 해보세요.</p>
          </div>

          {/* STEP 1 */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-3">STEP 1. 가운데 목표부터 정하세요</h3>
            <p className="text-gray-700 mb-3">
              가운데에는 <strong>인생 목표가 아닌, 단기·중기 목표</strong>를 적습니다.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-red-600 font-medium mb-1">❌ 피해야 할 예시</p>
                <p className="text-gray-600">"행복해지기"</p>
                <p className="text-gray-600">"성공한 사람이 되기"</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-600 font-medium mb-1">⭕ 좋은 예시</p>
                <p className="text-gray-600">"1년 안에 기타 초급 완성하기"</p>
                <p className="text-gray-600">"6개월 안에 에세이를 더 재밌게 쓰기"</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">👉 기준</p>
              <ul className="list-disc list-inside mt-1">
                <li>지금부터 <strong>6개월~1년 안에</strong></li>
                <li>실제로 삶을 조금 바꿔야 가능한 목표</li>
              </ul>
            </div>
          </section>

          {/* STEP 2 */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-3">STEP 2. 이 목표를 위해 어떤 삶이 필요한지 생각해요</h3>
            <p className="text-gray-700 mb-3">질문은 하나면 충분합니다.</p>
            <blockquote className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
              <p className="text-orange-700 italic">
                "이 목표를 이루려면<br />
                나는 <strong>어떤 사람으로 살아야 할까?</strong>"
              </p>
            </blockquote>
            <p className="text-sm text-gray-600 mt-3">
              이 질문에서 <strong>주변 칸의 방향</strong>이 나옵니다.
            </p>
          </section>

          {/* STEP 3 */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-3">STEP 3. 주변 칸은 '연결된 것'만 적어요</h3>
            <p className="text-gray-700 mb-3">
              주변 칸은 하고 싶은 일을 나열하는 곳이 아닙니다.<br />
              <strong>가운데 목표에 실제로 도움이 되는 것만</strong> 적습니다.
            </p>
            <div className="bg-orange-50 p-3 rounded-lg mb-3">
              <p className="text-orange-600 font-medium">🎯 예시 - 가운데 목표: <em>에세이를 더 재밌게 쓰기</em></p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-600 font-medium mb-1">⭕ 관련 있음</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• 이야기 구조 공부하기</li>
                  <li>• 단편소설 읽기</li>
                  <li>• 매일 짧게 글 써보기</li>
                </ul>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-red-600 font-medium mb-1">❌ 관련 없음</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• 영어 공부</li>
                  <li>• 운동 루틴 만들기</li>
                  <li>• 재테크 공부</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">👉 체크 질문</p>
              <p className="mt-1">"이걸 하면 중심 목표에 가까워질까?"</p>
            </div>
          </section>

          {/* STEP 4 */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-3">STEP 4. 전부 채우지 않아도 괜찮아요</h3>
            <p className="text-gray-700 mb-3">64칸을 다 채우지 않아도 됩니다.</p>
            <ul className="text-gray-700 space-y-1 mb-3">
              <li>• 처음엔 <strong>1칸만</strong> 해도 충분해요</li>
              <li>• 많아질수록 실행 확률은 낮아집니다</li>
            </ul>
            <div className="bg-orange-50 p-3 rounded-lg text-orange-700 italic">
              👉 <em>한 칸을 꾸준히 실행하는 게<br />여덟 칸을 적어두는 것보다 낫습니다.</em>
            </div>
          </section>

          {/* STEP 5 */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-3">STEP 5. 시간 계획이 없으면 실행되지 않아요</h3>
            <p className="text-gray-700 mb-3">계획은 <strong>시간이 들어가야</strong> 작동합니다.</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-red-600 font-medium mb-1">❌ 피해야 할 예시</p>
                <p className="text-gray-600">"틈나면 하기"</p>
                <p className="text-gray-600">"언젠가 매일 하기"</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-600 font-medium mb-1">⭕ 좋은 예시</p>
                <p className="text-gray-600">"월·목 저녁 글쓰기 시간에 넣기"</p>
                <p className="text-gray-600">"기존 공부 시간 중 일부를 전환하기"</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">👉 기준</p>
              <ul className="list-disc list-inside mt-1">
                <li><strong>새 시간을 만들기보다</strong></li>
                <li>이미 쓰고 있는 시간 안에 끼워 넣기</li>
              </ul>
            </div>
          </section>

          {/* STEP 6 */}
          <section>
            <h3 className="text-lg font-bold text-orange-600 mb-3">STEP 6. 욕심내지 말고, 느슨하게 가세요</h3>
            <p className="text-gray-700 mb-3">빽빽한 계획은 오래가지 않습니다.</p>
            <ul className="text-gray-700 space-y-1 mb-3">
              <li>• 하루를 바꾸는 계획 ❌</li>
              <li>• <strong>삶의 방향을 조금 조정하는 계획</strong> ⭕</li>
            </ul>
            <div className="bg-orange-50 p-3 rounded-lg text-orange-700">
              👉 목표는 달성보다 <strong>지속</strong>이 더 중요합니다.
            </div>
          </section>

          {/* 마무리 */}
          <div className="text-center bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>만다라트는 마법의 도구가 아닙니다.</strong><br />
              하지만 삶을 정렬하는 데는 아주 강력한 도구입니다.
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
