import type { Metadata } from "next";
import { Gowun_Dodum } from "next/font/google";
import "./globals.css";

const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "박형묵 & 문원영 결혼합니다",
  description: "2026년 4월 18일, 저희의 시작을 축복해주세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={gowunDodum.className}>{children}</body>
    </html>
  );
}