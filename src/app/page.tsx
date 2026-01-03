import { Metadata } from 'next';
import MandalaApp from '@/components/MandalaApp';
import { decodeMandalaData, URL_PARAM_KEY } from '@/lib/encoder';
import { MAIN_GOAL_INDEX } from '@/types/mandala';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const encodedData = params[URL_PARAM_KEY];

  let mainGoal = '만다라트';
  let description = '만다라트를 쉽게 만들고 공유하세요. 목표를 9개의 세부 목표로 나누고, 각각을 8개의 실행 항목으로 구체화하는 목표 설정 도구입니다.';

  if (typeof encodedData === 'string') {
    const data = decodeMandalaData(encodedData);
    if (data && data[MAIN_GOAL_INDEX]) {
      mainGoal = data[MAIN_GOAL_INDEX];
      description = `${mainGoal} - 만다라트로 목표를 체계적으로 관리하세요.`;
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogImageUrl = typeof encodedData === 'string'
    ? `${baseUrl}/api/og?${URL_PARAM_KEY}=${encodeURIComponent(encodedData)}`
    : `${baseUrl}/api/og`;

  return {
    title: `${mainGoal} - 만다라트`,
    description,
    openGraph: {
      title: `${mainGoal} - 만다라트`,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 600,
          height: 630,
          alt: `${mainGoal} 만다라트`,
        },
      ],
      type: 'website',
      locale: 'ko_KR',
      siteName: '만다라트',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${mainGoal} - 만다라트`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function Home() {
  return <MandalaApp />;
}
