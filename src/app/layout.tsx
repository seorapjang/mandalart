import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://mandalart.seorapjang.com"),
  title: "만다라트 - 목표 설정 도구 | Mandala Chart",
  description: "만다라트를 쉽게 만들고 공유하세요. 목표를 9개의 세부 목표로 나누고, 각각을 8개의 실행 항목으로 구체화하는 목표 설정 도구입니다.",
  keywords: ["만다라트", "mandala chart", "목표 설정", "자기계발", "오타니 쇼헤이", "목표 관리"],
  authors: [{ name: "Mandala Chart" }],
  openGraph: {
    title: "만다라트 - 목표 설정 도구",
    description: "만다라트를 쉽게 만들고 공유하세요. 목표를 체계적으로 설정하는 도구입니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "만다라트",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "만다라트 - 목표 설정 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "만다라트 - 목표 설정 도구",
    description: "만다라트를 쉽게 만들고 공유하세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
