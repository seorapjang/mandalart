import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-575GLJXM";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://mandalart.seorapjang.com"),
  title: "만다라트 - 목표 설정 도구 | Mandala Chart",
  description: "만다라트로 목표를 생성하고 계획을 세우세요. 9개의 세부 목표와 72개의 실행 항목으로 구체화하는 무료 목표 설정 도구입니다.",
  keywords: [
    "만다라트",
    "mandalart",
    "mandala chart",
    "목표 설정",
    "목표 생성",
    "계획",
    "실행 계획",
    "목표 달성",
    "자기계발",
    "오타니 쇼헤이",
    "목표 관리",
    "만다라 차트",
    "목표 계획표",
    "목표 세우기",
  ],
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
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "만다라트",
              alternateName: ["Mandalart", "Mandala Chart", "만다라 차트"],
              description:
                "만다라트로 목표를 생성하고 계획을 세우세요. 9개의 세부 목표와 72개의 실행 항목으로 구체화하는 무료 목표 설정 도구입니다.",
              url: "https://mandalart.seorapjang.com",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              featureList: [
                "목표 설정",
                "목표 생성",
                "계획 수립",
                "실행 계획 작성",
                "목표 시각화",
              ],
              inLanguage: "ko",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
