import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { decodeMandalaData, URL_PARAM_KEY } from '@/lib/encoder';
import { MandalaData, Region, Cell, getGlobalIndex, MAIN_GOAL_INDEX } from '@/types/mandala';

export const runtime = 'edge';

// 영역별 색상 (hex 값) - 더 진한 색상
const REGION_COLORS: Record<Region, { bg: string; border: string }> = {
  [Region.TOP_LEFT]: { bg: '#DBEAFE', border: '#3B82F6' },
  [Region.TOP]: { bg: '#D1FAE5', border: '#10B981' },
  [Region.TOP_RIGHT]: { bg: '#FCE7F3', border: '#EC4899' },
  [Region.LEFT]: { bg: '#E0E7FF', border: '#6366F1' },
  [Region.CENTER]: { bg: '#FEF3C7', border: '#F59E0B' },
  [Region.RIGHT]: { bg: '#FEE2E2', border: '#EF4444' },
  [Region.BOTTOM_LEFT]: { bg: '#CFFAFE', border: '#06B6D4' },
  [Region.BOTTOM]: { bg: '#F3E8FF', border: '#A855F7' },
  [Region.BOTTOM_RIGHT]: { bg: '#ECFCCB', border: '#84CC16' },
};

// 중앙 영역의 8개 하위 목표 (Cell 순서)
const SUB_GOAL_CELLS: Cell[] = [
  Cell.TOP_LEFT, Cell.TOP, Cell.TOP_RIGHT,
  Cell.LEFT, Cell.RIGHT,
  Cell.BOTTOM_LEFT, Cell.BOTTOM, Cell.BOTTOM_RIGHT,
];

// Cell을 Region으로 매핑 (색상용)
const CELL_TO_REGION: Record<Cell, Region> = {
  [Cell.TOP_LEFT]: Region.TOP_LEFT,
  [Cell.TOP]: Region.TOP,
  [Cell.TOP_RIGHT]: Region.TOP_RIGHT,
  [Cell.LEFT]: Region.LEFT,
  [Cell.CENTER]: Region.CENTER,
  [Cell.RIGHT]: Region.RIGHT,
  [Cell.BOTTOM_LEFT]: Region.BOTTOM_LEFT,
  [Cell.BOTTOM]: Region.BOTTOM,
  [Cell.BOTTOM_RIGHT]: Region.BOTTOM_RIGHT,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedData = searchParams.get(URL_PARAM_KEY);

  let data: MandalaData = Array(81).fill('');
  let mainGoal = '나의 목표';

  if (encodedData) {
    const decoded = decodeMandalaData(encodedData);
    if (decoded) {
      data = decoded;
      mainGoal = data[MAIN_GOAL_INDEX] || '나의 목표';
    }
  }

  // 하위 목표 8개 가져오기
  const subGoals = SUB_GOAL_CELLS.map((cell) => {
    const globalIndex = getGlobalIndex(Region.CENTER, cell);
    return {
      cell,
      region: CELL_TO_REGION[cell],
      value: data[globalIndex] || '',
    };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1f2937',
          padding: '40px',
        }}
      >
        {/* 메인 목표 - 중앙에 크게 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: REGION_COLORS[Region.CENTER].bg,
            border: `4px solid ${REGION_COLORS[Region.CENTER].border}`,
            borderRadius: '24px',
            padding: '32px 48px',
            marginBottom: '32px',
            boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#92400E',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            핵심 목표
          </div>
          <div
            style={{
              fontSize: mainGoal.length > 15 ? '36px' : '48px',
              fontWeight: 'bold',
              color: '#78350F',
              textAlign: 'center',
              maxWidth: '600px',
              lineHeight: 1.2,
            }}
          >
            {mainGoal}
          </div>
        </div>

        {/* 8개 하위 목표 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            maxWidth: '900px',
          }}
        >
          {subGoals.map(({ cell, region, value }) => {
            const colors = REGION_COLORS[region];
            return (
              <div
                key={cell}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.bg,
                  border: `2px solid ${colors.border}`,
                  borderRadius: '12px',
                  padding: '12px 20px',
                  minWidth: '120px',
                  maxWidth: '200px',
                }}
              >
                <div
                  style={{
                    fontSize: value.length > 10 ? '14px' : '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {value || '—'}
                </div>
              </div>
            );
          })}
        </div>

        {/* 푸터 */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
