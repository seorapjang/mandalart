import { MandalaData, createEmptyMandala, getGlobalIndex, Region, Cell } from '@/types/mandala';

export interface MandalaTemplate {
  id: string;
  name: string;
  description: string;
  data: MandalaData;
}

// 템플릿에 데이터를 쉽게 입력하기 위한 헬퍼 함수
function createTemplateData(
  regions: Record<Region, string[]>
): MandalaData {
  const data = createEmptyMandala();

  for (const [regionKey, cells] of Object.entries(regions)) {
    const region = parseInt(regionKey) as Region;
    cells.forEach((value, cellIndex) => {
      const globalIndex = getGlobalIndex(region, cellIndex as Cell);
      data[globalIndex] = value;
    });
  }

  return data;
}

// 오타니 쇼헤이 만다라트 (고등학교 시절 작성)
// 영역 배치:
// [0] [1] [2]
// [3] [4] [5]
// [6] [7] [8]
// 각 영역 내 셀 배치:
// [0] [1] [2]
// [3] [4] [5]  <- 4가 중앙
// [6] [7] [8]
export const OHTANI_TEMPLATE: MandalaTemplate = {
  id: 'ohtani',
  name: '오타니 쇼헤이',
  description: '8개 구단 드래프트 1순위 지명을 위한 만다라트 (고교 시절 작성)',
  data: createTemplateData({
    // 영역 0 (좌상): 체력 만들기
    0: [
      '체력', '가동성', 'RSQ66.7→25',
      '스태미나', '체력 만들기', '음식,영양 조절',
      '유연성', 'FSQ90kg', '몸 상태',
    ],
    // 영역 1 (상단 중앙): 컨트롤
    1: [
      '인스텝', '체간 강화', '축 만들기',
      '릴리스', '컨트롤', '멘탈',
      '팔꿈치를 올리기', '하체 주도', '던지는 폼 유지',
    ],
    // 영역 2 (우상): 키구력
    2: [
      '하체 강화', '각도를 지으며', '스트레이트로 승부',
      '팔로우 폼', '키구력', '팔꿈치를 앞으로',
      '변화구', '기세', '가쁜 호흡',
    ],
    // 영역 3 (좌측 중앙): 멘탈
    3: [
      '상대를 맞추기', '상황에 대응', '파워 있게',
      '잘 되지 않을 때의 대처', '멘탈', '승부 집착',
      '배짱', '자신감', '동요하지 않는다',
    ],
    // 영역 4 (중앙): 메인 목표 - 8개 구단 드래프트 1순위
    4: [
      '체력 만들기', '컨트롤', '키구력',
      '멘탈', '8개 구단\n드래프트 1순위', '구속 160km/h',
      '인간성', '운', '변화구',
    ],
    // 영역 5 (우측 중앙): 구속 160km/h
    5: [
      '가동성', '어깨 주변', '몸통의 힘',
      '피칭 폼', '구속\n160km/h', '하체 강화',
      '라인 만들기', '체중증가', '손목 강화',
    ],
    // 영역 6 (좌하): 인간성
    6: [
      '감사', '생각', '계속해서 성장',
      '예의', '인간성', '신뢰받는 사람',
      '배려', '사랑받는 캐릭터', '계획성',
    ],
    // 영역 7 (하단 중앙): 운
    7: [
      '인사', '쓰레기 줍기', '심판에 대한 태도',
      '물건을 소중히', '운', '긍정적 사고',
      '응원받기', '책 읽기', '도구 관리',
    ],
    // 영역 8 (우하): 변화구
    8: [
      '커브', '슬라이더', '포크',
      '스피드', '변화구', '체인지업',
      '구종 늘리기', '투스트라이크에서 치게 하다', '패스트볼처럼 팔을 흔들기',
    ],
  }),
};

// 만다라트 웹앱 프로젝트 기획 만다라트
export const PROJECT_TEMPLATE: MandalaTemplate = {
  id: 'mandala-project',
  name: '만다라트 프로젝트',
  description: '이 만다라트 웹앱을 만들기 위해 고민했던 내용들',
  data: createTemplateData({
    // 영역 0 (좌상): UI/UX 디자인
    0: [
      '색상 팔레트', '영역별 구분', '직관적 편집',
      '시각적 피드백', 'UI/UX 디자인', '반응형 레이아웃',
      '폰트 선택', '여백과 정렬', '일관된 스타일',
    ],
    // 영역 1 (상단 중앙): 데이터 구조
    1: [
      '81칸 배열', '영역-셀 매핑', '인덱스 계산',
      'enum 타입', '데이터 구조', '양방향 동기화',
      '타입 안전성', '상태 관리', '불변성 유지',
    ],
    // 영역 2 (우상): 공유 기능
    2: [
      'URL 인코딩', 'LZ-String 압축', 'Base64 변환',
      '링크 복사', '공유 기능', '복원 로직',
      '짧은 URL', '클립보드 API', '공유 미리보기',
    ],
    // 영역 3 (좌측 중앙): 모바일 대응
    3: [
      '탭 네비게이션', '영역별 보기', '터치 최적화',
      '화면 감지', '모바일 대응', '버튼 크기',
      '스크롤 처리', '점진적 표시', '제스처 지원',
    ],
    // 영역 4 (중앙): 메인 목표
    4: [
      'UI/UX 디자인', '데이터 구조', '공유 기능',
      '모바일 대응', '만다라트\n웹앱 완성', '내보내기',
      'SEO 최적화', '사용자 경험', '기술 스택',
    ],
    // 영역 5 (우측 중앙): 내보내기
    5: [
      'PNG 생성', 'html-to-image', '클립보드 복사',
      '이미지 품질', '내보내기', '전체 영역 표시',
      '파일 다운로드', '비동기 처리', '에러 핸들링',
    ],
    // 영역 6 (좌하): SEO 최적화
    6: [
      '메타 태그', 'OG 이미지', '동적 제목',
      '키워드 설정', 'SEO 최적화', '구조화 데이터',
      'Twitter Card', '사이트맵', '접근성',
    ],
    // 영역 7 (하단 중앙): 사용자 경험
    7: [
      '즉각 반응', '로딩 상태', '에러 메시지',
      '키보드 지원', '사용자 경험', '자동 저장',
      '템플릿 제공', '안내 문구', '직관적 흐름',
    ],
    // 영역 8 (우하): 기술 스택
    8: [
      'Next.js 15', 'React 19', 'TypeScript',
      'Tailwind CSS', '기술 스택', 'Vercel OG',
      'pnpm', 'Pretendard', 'Edge Runtime',
    ],
  }),
};

// 모든 템플릿 목록
export const TEMPLATES: MandalaTemplate[] = [
  OHTANI_TEMPLATE,
  PROJECT_TEMPLATE,
];

// ID로 템플릿 찾기
export function getTemplateById(id: string): MandalaTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
