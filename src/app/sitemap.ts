import { MetadataRoute } from 'next';
import { TEMPLATES } from '@/lib/templates';
import { encodeMandalaData, URL_PARAM_KEY } from '@/lib/encoder';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://mandalart.seorapjang.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // 메인 페이지
  const mainPage = {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  };

  // 템플릿 페이지들
  const templatePages = TEMPLATES.map((template) => {
    const encoded = encodeMandalaData(template.data);
    return {
      url: `${BASE_URL}?${URL_PARAM_KEY}=${encoded}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [mainPage, ...templatePages];
}
