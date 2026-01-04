import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://mandalart.seorapjang.com"),
  title: "만다라트 - 목표 설정 도구 | Mandala Chart",
  description: "만다라트를 쉽게 만들고 공유하세요. 목표를 9개의 세부 목표로 나누고, 각각을 8개의 실행 항목으로 구체화하는 목표 설정 도구입니다.",
  keywords: ["만다라트", "mandala chart", "목표 설정", "자기계발", "오타니 쇼헤이", "목표 관리"],
  authors: [{ name: "Mandala Chart" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon_16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "만다라트 - 목표 설정 도구",
    description: "만다라트를 쉽게 만들고 공유하세요. 목표를 체계적으로 설정하는 도구입니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "만다라트",
    images: [
      {
        url: "/api/og",
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
    images: ["/api/og"],
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
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
