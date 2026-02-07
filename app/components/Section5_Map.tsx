'use client';

import { motion } from 'framer-motion';
import { MapPin, Train, Bus, Car } from 'lucide-react';
import Image from 'next/image';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

// 1. 감성적인 한글 폰트
const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// 2. 럭셔리한 영문 폰트
const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

const Section5_Map = () => {
  return (
    // [레이아웃 통일] koreanFont 적용
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden ${koreanFont.className}`}>
      
      {/* 1. 배경 이미지 (통일) */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/modern-bg.png" alt="Map Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* 2. 메인 콘텐츠 카드 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-8"
      >
        <div className="text-center mb-8">
            {/* 영문 폰트 적용 */}
            <p className={`${englishFont.className} text-amber-700/80 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase`}>
                Location
            </p>
            <h2 className="text-xl font-bold text-stone-800 tracking-widest">오시는 길</h2>
        </div>
        
        {/* 지도 정보 */}
        <div className="w-full mb-6">
            <div className="text-center mb-5">
                <h3 className="text-base font-bold text-stone-900 mb-1">호텔나루서울 엠갤러리</h3>
                <div className="flex items-center justify-center gap-1 text-stone-500 text-[11px] font-medium">
                    <MapPin size={12} className="text-stone-400"/> 
                    <span>서울 마포구 마포대로 8</span>
                </div>
            </div>
            
            {/* 지도 박스 */}
            <div className="w-full h-40 bg-stone-100 rounded-sm mb-4 relative overflow-hidden border border-stone-200 group">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-stone-400 bg-[url('https://www.transparenttextures.com/patterns/map-light.png')] opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-700 drop-shadow-md pb-4">
                    <MapPin size={28} fill="currentColor" />
                </div>
            </div>

            {/* 지도 버튼 */}
            <div className="grid grid-cols-3 gap-2">
                <a href="https://map.kakao.com/link/search/호텔나루서울엠갤러리" target="_blank" className="py-2.5 bg-[#FEE500] hover:brightness-95 text-stone-900 rounded-[4px] font-bold text-[10px] flex items-center justify-center shadow-sm transition-all">카카오맵</a>
                <a href="https://map.naver.com/v5/search/호텔나루서울엠갤러리" target="_blank" className="py-2.5 bg-[#03C75A] hover:brightness-95 text-white rounded-[4px] font-bold text-[10px] flex items-center justify-center shadow-sm transition-all">네이버지도</a>
                <a href="https://surl.tmobiapi.com/search/호텔나루서울엠갤러리" target="_blank" className="py-2.5 bg-[#2c86d3] hover:brightness-95 text-white rounded-[4px] font-bold text-[10px] flex items-center justify-center shadow-sm transition-all">티맵</a>
            </div>
        </div>

        <div className="w-full h-[1px] bg-stone-300/50 my-6"></div>

        {/* 교통편 안내 (고운바탕체 적용으로 감성 UP) */}
        <div className="space-y-4 pl-2">
            <div className="flex gap-3 items-start">
                <div className="mt-0.5 text-stone-400 min-w-[16px]"><Train size={14} /></div>
                <div className="text-[11px] md:text-[12px] leading-relaxed text-stone-600 font-medium">
                    <strong className="text-stone-800 font-bold mr-1">지하철</strong>
                    <span className="text-[#8936E0] font-bold">5호선</span> 마포역 4번 출구 도보 3분
                </div>
            </div>
            <div className="flex gap-3 items-start">
                <div className="mt-0.5 text-stone-400 min-w-[16px]"><Bus size={14} /></div>
                <div className="text-[11px] md:text-[12px] leading-relaxed text-stone-600 font-medium">
                    <strong className="text-stone-800 font-bold mr-1">버스</strong>
                    마포역 정류장 하차 <span className="text-stone-400 text-[10px]">(간선 160, 260 등)</span>
                </div>
            </div>
            <div className="flex gap-3 items-start">
                <div className="mt-0.5 text-stone-400 min-w-[16px]"><Car size={14} /></div>
                <div className="text-[11px] md:text-[12px] leading-relaxed text-stone-600 font-medium">
                    <strong className="text-stone-800 font-bold mr-1">주차</strong>
                    호텔 내 주차장 이용 <span className="text-amber-700 font-bold">(3시간 무료)</span>
                </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Section5_Map;