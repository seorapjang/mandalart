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

  // URL 파라미터가 없으면 layout.tsx의 기본 메타데이터 사용
  if (typeof encodedData !== 'string') {
    return {};
  }

  const data = decodeMandalaData(encodedData);
  const mainGoal = data?.[MAIN_GOAL_INDEX];

  // mainGoal이 없으면 layout.tsx의 기본 메타데이터 사용
  if (!mainGoal) {
    return {};
  }

  const description = `${mainGoal} - 만다라트로 목표를 체계적으로 관리하세요.`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogImageUrl = `${baseUrl}/api/og?${URL_PARAM_KEY}=${encodeURIComponent(encodedData)}`;

  return {
    title: `${mainGoal} - 만다라트`,
    description,
    openGraph: {
      title: `${mainGoal} - 만다라트`,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
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
