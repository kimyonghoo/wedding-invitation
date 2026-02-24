import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WEDDING_INFO } from '@/app/config/weddingInfo';

const inter = Inter({ subsets: ["latin"] });

// ▼ 이 부분을 수정하시면 됩니다 ▼
export const metadata: Metadata = {
  // 1. 브라우저 탭에 보이는 제목
  title: `${WEDDING_INFO.groom.lastname}${WEDDING_INFO.groom.firstname} & ${WEDDING_INFO.bride.lastname}${WEDDING_INFO.bride.firstname} 결혼합니다`,
  
  // 2. 검색엔진 등에 보이는 설명
  description: `${WEDDING_INFO.date.year}년 ${WEDDING_INFO.date.month}월 ${WEDDING_INFO.date.day}일 오후 ${WEDDING_INFO.date.hour}시, ${WEDDING_INFO.place.location}`,
  
  // 3. SNS 공유용 설정 (카카오톡, 문자 등)
  openGraph: {
    title: `${WEDDING_INFO.groom.lastname}${WEDDING_INFO.groom.firstname} & ${WEDDING_INFO.bride.lastname}${WEDDING_INFO.bride.firstname} 결혼식에 초대합니다`,
    description: `${WEDDING_INFO.date.year}년 ${WEDDING_INFO.date.month}월 ${WEDDING_INFO.date.day}일 오후 ${WEDDING_INFO.date.hour}시, ${WEDDING_INFO.place.location}`,
    url: "https://our-sping-0418.vercel.app", // 실제 배포된 사이트 주소 (없으면 생략 가능)
    siteName: "Wedding Invitation",
    images: [
      {
        url: "/images/wedding/gallery-20.jpg", // public 폴더 안의 이미지 경로
        width: 800,
        height: 800,
        alt: "결혼식 초대장 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}