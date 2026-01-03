import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { decodeMandalaData, URL_PARAM_KEY } from '@/lib/encoder';
import { MandalaData, Region, MAIN_GOAL_INDEX } from '@/types/mandala';

export const runtime = 'edge';

// 영역별 색상 (hex 값)
const REGION_COLORS: Record<Region, string> = {
  [Region.TOP_LEFT]: '#DBEAFE', // blue-100
  [Region.TOP]: '#D1FAE5', // emerald-100
  [Region.TOP_RIGHT]: '#FCE7F3', // pink-100
  [Region.LEFT]: '#E0E7FF', // indigo-100
  [Region.CENTER]: '#FEF3C7', // amber-100
  [Region.RIGHT]: '#FEE2E2', // red-100
  [Region.BOTTOM_LEFT]: '#CFFAFE', // cyan-100
  [Region.BOTTOM]: '#F3E8FF', // purple-100
  [Region.BOTTOM_RIGHT]: '#ECFCCB', // lime-100
};

function getCellColor(globalIndex: number): string {
  const row = Math.floor(globalIndex / 9);
  const col = globalIndex % 9;
  const regionRow = Math.floor(row / 3);
  const regionCol = Math.floor(col / 3);
  const region = (regionRow * 3 + regionCol) as Region;
  return REGION_COLORS[region];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedData = searchParams.get(URL_PARAM_KEY);

  let data: MandalaData = Array(81).fill('');
  let mainGoal = '만다라트';

  if (encodedData) {
    const decoded = decodeMandalaData(encodedData);
    if (decoded) {
      data = decoded;
      mainGoal = data[MAIN_GOAL_INDEX] || '만다라트';
    }
  }

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
          backgroundColor: '#f3f4f6',
          padding: '40px',
        }}
      >
        {/* 타이틀 */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px',
          }}
        >
          {mainGoal}
        </div>

        {/* 9x9 그리드 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            backgroundColor: '#9ca3af',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          {Array.from({ length: 9 }).map((_, row) => (
            <div
              key={row}
              style={{
                display: 'flex',
                gap: '2px',
              }}
            >
              {Array.from({ length: 9 }).map((_, col) => {
                const globalIndex = row * 9 + col;
                const cellValue = data[globalIndex] || '';
                const isMainGoal = globalIndex === MAIN_GOAL_INDEX;

                return (
                  <div
                    key={col}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: getCellColor(globalIndex),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: cellValue.length > 10 ? '8px' : '10px',
                      color: '#1f2937',
                      textAlign: 'center',
                      padding: '2px',
                      fontWeight: isMainGoal ? 'bold' : 'normal',
                      border: isMainGoal ? '2px solid #f59e0b' : 'none',
                      overflow: 'hidden',
                    }}
                  >
                    {cellValue.slice(0, 20)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <div
          style={{
            marginTop: '20px',
            fontSize: '14px',
            color: '#6b7280',
          }}
        >
          만다라트 - 목표 설정 도구
        </div>
      </div>
    ),
    {
      width: 600,
      height: 630,
    }
  );
}
