# 디자인 시스템 (Modern & Trust Blue)

## 테마 키워드
Modern, trustworthy, crisp, enterprise, clean, performant, data-driven

## 색상 토큰

| 용도 | Tailwind 클래스 | HEX |
|------|----------------|-----|
| Primary | `bg-primary`, `text-primary` | #2563EB |
| Primary Hover | `hover:bg-primary-hover` | #1D4ED8 |
| Primary Active | `active:bg-primary-active` | #1E40AF |
| Primary Soft BG | `bg-primary-soft` | #EFF6FF |
| Accent Lime | `bg-lime`, `text-lime` | #A3E635 |
| Accent Lime Soft | `bg-lime-soft` | #ECFCCB |
| Text | `text-navy` | #0F172A |
| Text Muted | `text-muted` | #64748B |
| Background | `bg-slate-bg` | #F8FAFC |
| Surface | `bg-surface` | #FFFFFF |
| Border | `border-slate-border` | #E2E8F0 |
| Neutral | `bg-neutral` | #F1F5F9 |

## 색상 사용 규칙
- **Blue(Primary)**: 주요 CTA/링크/핵심 인터랙션에만 집중 사용
- **Lime(Accent)**: "강조 1~2개" 또는 특정 상태/뱃지/하이라이트에만 제한 사용 (남발 금지)
- **BG**: 매우 밝은 슬레이트 톤, Surface는 화이트(카드/모달)로 분리
- **텍스트**: Navy/Slate 계열로 고정하여 대비와 가독성 확보
- **Border**: 연한 슬레이트 톤으로 은은하게

## 컴포넌트 스타일

### 버튼
```
Primary:   bg-primary text-white hover:bg-primary-hover active:bg-primary-active rounded-xl
Secondary: bg-surface text-navy border border-slate-border hover:bg-slate-bg rounded-xl
Ghost:     bg-transparent text-primary hover:bg-primary-soft rounded-xl
```

### 카드/모달
```
bg-surface border border-slate-border rounded-2xl shadow-sm
헤더 배경: bg-primary-soft
푸터 배경: bg-neutral
```

### 입력 필드
```
bg-surface border border-slate-border rounded-xl
focus: border-primary ring-2 ring-primary/35
placeholder: text-muted
```

### 네비게이션
```
기본 배경: bg-slate-bg 또는 bg-surface
Active: bg-primary-soft text-primary ring-2 ring-primary
Hover: bg-neutral
```

## Spacing & Radius
- 8pt grid (4/8/12/16/24/32)
- 버튼 radius: 12-14px (`rounded-xl`)
- 카드/모달 radius: 16-20px (`rounded-2xl`)
- 입력 필드 radius: 12px (`rounded-xl`)

## Status 색상
| 상태 | 색상 | 용도 |
|------|------|------|
| Success | #16A34A | 성공 메시지, 완료 상태 |
| Warning | #F59E0B | 경고, 주의 |
| Error | #EF4444 | 오류, 삭제 |
| Info | #2563EB | 정보, 안내 (=Primary) |

## Do / Don't

### Do
- Blue로 신뢰/액션 강조
- Lime은 "포인트"로만 제한 사용
- 콘텐츠/데이터 위계(타이포/spacing)로 정보 구조 구성
- 상태색은 의미 전달에만 사용

### Don't
- Lime을 Primary처럼 쓰기 (브랜드 톤이 싸보일 수 있음)
- 큰 배경 면적을 블루로 채우기 (피로감 증가)
- 테두리/디바이더를 컬러로 처리하기
- 본문 텍스트를 컬러로 처리하기 (가독성 저하)

## 관련 파일
- `src/app/globals.css`: CSS 변수 및 @theme 정의
- `src/types/mandala.ts`: REGION_COLORS 정의
