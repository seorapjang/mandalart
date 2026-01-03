# Mandala Chart (만다라트) - SPEC

## Overview

### 목적
사람들이 쉽게 만다라트를 만들고 활용할 수 있는 웹 애플리케이션

### 핵심 가치
- 간단한 UI로 빠르게 목표 설정
- URL 기반 공유로 별도 로그인 불필요
- 이미지 내보내기로 활용도 극대화

### 타겟 사용자
모든 사용자 (자기계발, 학습, 업무 목표 등)

---

## Requirements

### Functional Requirements

#### FR1. 만다라트 그리드
- 9x9 그리드 (81칸) 표시
- 중앙에 핵심 목표 (1칸)
- 중앙 주변 8칸에 하위 목표
- 각 하위 목표가 외곽 3x3 그리드의 중앙이 되어 8개 세부 항목으로 둘러쌈

#### FR2. 셀 편집
- 셀 클릭 시 인라인 편집 모드 진입
- Enter 또는 외부 클릭으로 편집 완료
- ESC로 편집 취소

#### FR3. 영역별 색상
- 9개 영역(중앙 + 8개 외곽)이 각각 다른 고정 색상
- 시각적으로 영역 구분 용이

#### FR4. 데이터 저장 및 공유
- 만다라트 데이터를 URL에 인코딩하여 저장
- "공유하기" 버튼 클릭 시 현재 데이터 기반 공유 링크 생성
- 링크 접속 시 저장된 만다라트 복원

#### FR5. 내보내기
- PNG 이미지 다운로드
- 클립보드에 이미지 복사

#### FR6. 템플릿
- 오타니 쇼헤이 만다라트 템플릿 제공
- 빈 만다라트로 새로 시작 옵션

#### FR7. 모바일 UI
- 탭으로 9개 영역 전환
- 메인 영역(중앙)에서 모서리 영역 클릭 시 해당 영역으로 이동

### Non-Functional Requirements

#### NFR1. 성능
- 초기 로딩 2초 이내
- 셀 편집 즉각 반응

#### NFR2. 반응형
- 모바일/태블릿/데스크탑 지원

#### NFR3. 접근성
- 키보드 네비게이션 지원

#### NFR4. SEO
- 페이지 메타 태그 최적화 (title, description)
- Open Graph 태그 (og:title, og:description, og:image)
- 공유 시 만다라트 미리보기 이미지 동적 생성
- Twitter Card 지원
- 구조화된 데이터 (JSON-LD)

---

## Technical Design

### 기술 스택
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS
- **이미지 내보내기**: html-to-image
- **OG 이미지 생성**: @vercel/og (Satori)
- **URL 인코딩**: LZ-String (압축)
- **배포**: Vercel (권장)

### 프로젝트 구조
```
mandala-chart/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # 루트 레이아웃 + 메타데이터
│   │   ├── page.tsx                  # 메인 페이지
│   │   ├── api/
│   │   │   └── og/
│   │   │       └── route.tsx         # OG 이미지 동적 생성 API
│   │   └── globals.css
│   ├── components/
│   │   ├── MandalaGrid.tsx           # 9x9 전체 그리드
│   │   ├── MandalaRegion.tsx         # 3x3 영역
│   │   ├── MandalaCell.tsx           # 개별 셀
│   │   ├── Toolbar.tsx               # 공유/내보내기 버튼
│   │   ├── TemplateSelector.tsx      # 템플릿 선택
│   │   └── MobileNavigation.tsx      # 모바일 탭/네비게이션
│   ├── hooks/
│   │   ├── useMandalaData.ts         # 만다라트 데이터 관리
│   │   └── useExport.ts              # 이미지 내보내기
│   ├── lib/
│   │   ├── encoder.ts                # URL 인코딩/디코딩
│   │   └── templates.ts              # 템플릿 데이터
│   └── types/
│       └── mandala.ts                # 타입 정의
├── public/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 데이터 구조
```typescript
// 81칸 데이터 (9x9)
type MandalaData = string[]; // 길이 81

// 영역 인덱스 매핑
// [0] [1] [2]
// [3] [4] [5]  <- 영역 4가 중앙 (메인 목표)
// [6] [7] [8]

// URL 인코딩 형식
// ?d=<LZ-String 압축된 JSON>
```

### 영역별 색상 팔레트
```
영역0:   bg-blue-100    (좌상)
영역1:   bg-emerald-100 (상단 중앙)
영역2:   bg-pink-100    (우상)
영역3:   bg-indigo-100  (좌측 중앙)
영역4:   bg-amber-100   (중앙 - 메인)
영역5:   bg-red-100     (우측 중앙)
영역6:   bg-cyan-100    (좌하)
영역7:   bg-purple-100  (하단 중앙)
영역8:   bg-lime-100    (우하)
```

---

## Implementation Order

### Phase 1: 기본 구조 (MVP)
1. Next.js 15 + React 19 + Tailwind 프로젝트 초기화 ✅
2. 기본 타입 정의 ✅
3. MandalaGrid, MandalaRegion, MandalaCell 컴포넌트 ✅
4. 셀 편집 기능 ✅
5. 기본 SEO 메타태그 설정

### Phase 2: 데이터 저장 & 공유
6. URL 인코딩/디코딩 유틸 (LZ-String) ✅
7. 공유하기 버튼 (링크 복사) ✅

### Phase 3: OG 이미지 & SEO
8. OG 이미지 동적 생성 API (/api/og)
9. 동적 메타태그 (공유 URL에 따른 OG 이미지)
10. 구조화된 데이터 (JSON-LD)

### Phase 4: 내보내기
11. html-to-image 연동
12. PNG 다운로드
13. 클립보드 복사

### Phase 5: 템플릿 & 모바일
14. 오타니 쇼헤이 템플릿 데이터 ✅
15. 템플릿 선택 UI ✅
16. 모바일 네비게이션 (탭 + 영역 이동)

---

## Out of Scope
- 사용자 계정/로그인
- 서버 저장
- 다국어 지원
- PDF 내보내기

---

## Notes
- 언어: 한국어만 지원
- 프로젝트명: mandala-chart
- Node.js 버전: v22.16.0 (.nvmrc)
- 패키지 매니저: pnpm
