'use client';

import { motion } from 'framer-motion';
import { MapPin, Train, Bus, Car } from 'lucide-react';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';
// [추가] 카카오맵 라이브러리 임포트
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

const Section5_Map = () => {
  // [1] 카카오맵 로드 (API 키 입력 필수!)
  // 발급받은 JavaScript 키를 아래 문자열에 넣어주세요.
  const [loading, error] = useKakaoLoader({
    appkey: "a604d8920a0dd167831ffad84b10b2d3", // 예: "a1b2c3d4e5..."
  });

  // 호텔나루서울 엠갤러리 좌표
  const HOTEL_LAT = 37.539822;
  const HOTEL_LNG = 126.945371;

  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden ${koreanFont.className} wedding-bg`}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-8"
      >
        <div className="text-center mb-8">
            <p className={`${englishFont.className} text-amber-700/80 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase`}>
                Location
            </p>
            <h2 className="text-xl font-bold text-stone-800 tracking-widest">오시는 길</h2>
        </div>
        
        <div className="w-full mb-6">
            <div className="text-center mb-5">
                <h3 className="text-base font-bold text-stone-900 mb-1">호텔나루서울 엠갤러리</h3>
                <div className="flex items-center justify-center gap-1 text-stone-500 text-[11px] font-medium">
                    <MapPin size={12} className="text-stone-400"/> 
                    <span>서울 마포구 마포대로 8</span>
                </div>
            </div>
            
            {/* [2] 실제 지도 영역 (높이를 조금 늘려서 h-52) */}
            <div className="w-full h-52 bg-stone-100 rounded-sm mb-4 relative overflow-hidden border border-stone-200 shadow-inner">
                {/* 지도가 로딩되기 전이나 에러가 났을 때 보여줄 대체 UI */}
                {loading || error ? (
                     <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 text-xs">
                        {error ? "지도 로드 실패" : "지도 불러오는 중..."}
                     </div>
                ) : (
                    <Map
                        center={{ lat: HOTEL_LAT, lng: HOTEL_LNG }}
                        style={{ width: "100%", height: "100%" }}
                        level={3} // 확대 레벨 (숫자가 작을수록 확대)
                        draggable={true} // 드래그 이동 가능
                        zoomable={true}  // 줌 가능
                    >
                        {/* 지도 위 마커 표시 */}
                        <MapMarker 
                            position={{ lat: HOTEL_LAT, lng: HOTEL_LNG }}
                        >
                            {/* 마커 위에 뜰 텍스트 (원하면 사용) */}
                            {/* <div style={{padding:"5px", color:"#000"}}>호텔나루</div> */}
                        </MapMarker>
                    </Map>
                )}
            </div>

            {/* 지도 앱 바로가기 버튼들 */}
            <div className="grid grid-cols-3 gap-2">
                <a href="https://map.kakao.com/link/search/호텔나루서울엠갤러리" target="_blank" className="py-2.5 bg-[#FEE500] hover:brightness-95 text-stone-900 rounded-[4px] font-bold text-[10px] flex items-center justify-center shadow-sm transition-all">카카오맵</a>
                <a href="https://map.naver.com/v5/search/호텔나루서울엠갤러리" target="_blank" className="py-2.5 bg-[#03C75A] hover:brightness-95 text-white rounded-[4px] font-bold text-[10px] flex items-center justify-center shadow-sm transition-all">네이버지도</a>
                <a href="https://www.google.com/maps/search/?api=1&query=호텔나루서울엠갤러리" target="_blank" className="py-2.5 bg-[#4285F4] hover:brightness-95 text-white rounded-[4px] font-bold text-[10px] flex items-center justify-center shadow-sm transition-all">구글지도</a>
            </div>
        </div>

        <div className="w-full h-[1px] bg-stone-300/50 my-6"></div>

        {/* 교통편 안내 */}
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