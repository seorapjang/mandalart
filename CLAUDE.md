# Claude Code 프로젝트 룰

## 디자인 시스템 (Modern & Trust Blue)

### 테마 키워드
Modern, trustworthy, crisp, enterprise, clean, performant, data-driven

### 색상 토큰

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

### 색상 사용 규칙
- **Blue(Primary)**: 주요 CTA/링크/핵심 인터랙션에만 집중 사용
- **Lime(Accent)**: "강조 1~2개" 또는 특정 상태/뱃지/하이라이트에만 제한 사용 (남발 금지)
- **BG**: 매우 밝은 슬레이트 톤, Surface는 화이트(카드/모달)로 분리
- **텍스트**: Navy/Slate 계열로 고정하여 대비와 가독성 확보
- **Border**: 연한 슬레이트 톤으로 은은하게

### 컴포넌트 스타일

#### 버튼
```
Primary:   bg-primary text-white hover:bg-primary-hover active:bg-primary-active
Secondary: bg-surface text-navy border-slate-border hover:bg-slate-bg
Ghost:     bg-transparent text-primary hover:bg-primary-soft
```

#### 카드/모달
```
bg-surface border-slate-border rounded-2xl shadow-sm
헤더 배경: bg-primary-soft
```

#### 입력 필드
```
bg-surface border-slate-border
focus: border-primary ring-primary/35
```

### Spacing & Radius
- 8pt grid (4/8/12/16/24/32)
- 버튼 radius: 12-14px (`rounded-xl`)
- 카드/모달 radius: 16-20px (`rounded-2xl`)

### Do / Don't
**Do:**
- Blue로 신뢰/액션 강조
- Lime은 "포인트"로만 제한 사용
- 콘텐츠/데이터 위계(타이포/spacing)로 정보 구조 구성

**Don't:**
- Lime을 Primary처럼 쓰기
- 큰 배경 면적을 블루로 채우기
- 테두리/디바이더를 컬러로 처리하기

---

## 커밋 규칙

작업 완료 후 항상 적절한 커밋 메시지와 함께 커밋합니다.

### 커밋 메시지 형식
```
<type>: <subject>

<body>
```

### 타입
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: 스타일 변경 (코드 동작에 영향 없음)
- `docs`: 문서 변경
- `chore`: 빌드, 설정 등 기타 변경

### 커밋 시점
- 기능 구현 완료 시
- 버그 수정 완료 시
- 사용자 요청 작업 완료 시
