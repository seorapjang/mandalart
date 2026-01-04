import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { decodeMandalaData, URL_PARAM_KEY } from '@/lib/encoder';
import { MAIN_GOAL_INDEX } from '@/types/mandala';

export const runtime = 'edge';

const DEFAULT_CONTENT = {
  title: "만다라트",
  description: "9칸으로 목표를 \"할 일\"로 바꿔보세요."
}

function createDynamicContent(encodedData: string | null) {
    if (!encodedData) {
        return DEFAULT_CONTENT;
    }

    const mandalaData = decodeMandalaData(encodedData);

    if(!mandalaData) {
        return DEFAULT_CONTENT;
    }

    const mainGoal = mandalaData[MAIN_GOAL_INDEX];

    if(!mainGoal) return DEFAULT_CONTENT;

    return {
        title: mainGoal,
        description: '을 위한 만다라트',
    }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedData = searchParams.get(URL_PARAM_KEY);

  const content = createDynamicContent(encodedData);

  // 배경 이미지 URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundImage: `url(${baseUrl}/default-og-image-background.png)`,
        }}
      >
        {/* 우측 텍스트 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '620px',
            paddingRight: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: content.title.length > 12 ? '56px' : '72px',
                  fontWeight: 'bold',
                  color: '#C2410C',
                  lineHeight: 1.1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {content.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '32px',
                  fontWeight: '500',
                  color: '#4b5563',
                }}
              >
                  {content.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
