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
  description: '8구단 드래프트 1순위 지명을 위한 만다라트 (고교 시절 작성)',
  data: createTemplateData({
    // 영역 0 (좌상): 몸 만들기
    0: [
      '몸관리', '영양제 먹기', 'FSQ 90kg',
      '유연성', '몸 만들기', 'RSQ 130kg',
      '스테미너', '가동역', '식사\n저녁7술갈\n아침3술갈',
    ],
    // 영역 1 (상단 중앙): 제구
    1: [
      '인스텝 개선', '몸통 강화', '축 흔들지 않기',
      '릴리즈 포인트\n안정', '제구', '불안정 없애기',
      '하체 강화', '몸을 열지 않기', '멘탈을 컨트롤',
    ],
    // 영역 2 (우상): 구위
    2: [
      '각도를 만든다', '위에서부터\n공을 던진다', '손목 강화',
      '힘 모으기', '구위', '하반신 주도',
      '볼을 앞에서\n릴리즈', '회전수 증가', '가동력',
    ],
    // 영역 3 (좌측 중앙): 멘탈
    3: [
      '뚜렷한\n목표·목적', '일희일비\n하지 않기', '머리는 차갑게\n심장은 뜨겁게',
      '핀치에 강하게', '멘탈', '분위기에\n휩쓸리지 않기',
      '마음의 파도를\n안만들기', '승리에 대한\n집념', '동료를\n배려하는 마음',
    ],
    // 영역 4 (중앙): 메인 목표 - 8구단 드래프트 1순위
    4: [
      '몸 만들기', '제구', '구위',
      '멘탈', '8구단\n드래프트\n1순위', '스피드\n160km/h',
      '인간성', '운', '변화구',
    ],
    // 영역 5 (우측 중앙): 스피드 160km/h
    5: [
      '축을 돌리기', '하체 강화', '체중 증가',
      '몸통 강화', '스피드\n160km/h', '어깨주변 강화',
      '가동력', '라이너 캐치볼', '피칭 늘리기',
    ],
    // 영역 6 (좌하): 인간성
    6: [
      '감성', '사랑받는 사람', '계획성',
      '배려', '인간성', '감사',
      '예의', '신뢰받는 사람', '지속력',
    ],
    // 영역 7 (하단 중앙): 운
    7: [
      '인사하기', '쓰레기 줍기', '부실 청소',
      '물건을\n소중히 쓰자', '운', '심판을\n대하는 태도',
      '긍정적 사고', '응원받는 사람', '책읽기',
    ],
    // 영역 8 (우하): 변화구
    8: [
      '카운트볼\n늘리기', '포크볼 완성', '슬라이더 구위',
      '늦게 낙차가\n있는 커브', '변화구', '좌타자 결정구',
      '직구와 같은\n폼으로 던지기', '스트라이크 볼을\n던질 때 제구', '거리를 상상하기',
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
