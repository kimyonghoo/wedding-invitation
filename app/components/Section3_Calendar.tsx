'use client';

import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

// 1. 감성적인 한글 폰트
const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// 2. 럭셔리한 영문/숫자 폰트
const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const Section3_Calendar = () => {
  const targetDate = new Date('2026-04-18T12:00:00+09:00');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 달력 데이터 생성 (null은 빈 칸)
  const calendarDays = [
    null, null, null, // 앞쪽 빈칸 3개
    1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17,
    18, // D-Day
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30,
    null, null // 뒤쪽 빈칸 2개
  ];

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) return <span className={`${koreanFont.className} text-sm text-stone-800 font-bold`}>결혼식을 축하합니다!</span>;
    
    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
      <div className="flex flex-col items-center mx-1">
        <div className="bg-white w-10 h-10 rounded-md flex items-center justify-center shadow-sm border border-stone-200">
          <span className={`${koreanFont.className} text-lg font-semibold text-stone-800 tabular-nums pt-1`}>
            {value < 10 ? `0${value}` : value}
          </span>
        </div>
        <span className={`${koreanFont.className} text-[8px] text-stone-500 mt-1 uppercase tracking-wider`}>{label}</span>
      </div>
    );

    return (
      <div className="flex flex-col items-center w-full">
        <div className={`${koreanFont.className} text-stone-500 font-medium text-sm mb-4 tracking-widest`}>
           D <span className="mx-1">-</span> <span className="text-xl text-amber-700 font-bold">{days}</span>
        </div>
        <div className="flex justify-center items-start gap-1">
            <TimeUnit value={hours} label="Hours" />
            <span className={`${koreanFont.className} text-stone-400 text-lg mt-1 font-light mx-0.5`}>:</span>
            <TimeUnit value={minutes} label="Mins" />
            <span className={`${koreanFont.className} text-stone-400 text-lg mt-1 font-light mx-0.5`}>:</span>
            <TimeUnit value={seconds} label="Secs" />
        </div>
      </div>
    );
  };

  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden wedding-bg`}>
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="relative z-10 w-full max-w-sm bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-8 flex flex-col items-center"
      >
        <h2 className={`${koreanFont.className} text-xl font-bold mb-3 text-stone-800 text-center tracking-wide`}>
            4월의 어느 멋진 날
        </h2>
        <p className={`${koreanFont.className} mb-8 text-center text-stone-600 text-xs font-medium tracking-[0.1em] uppercase`}>
            2026. 04. 18. Sat 12:00 PM
        </p>

        {/* 달력 본체 */}
        <div className="w-full mb-8 px-2">
          {/* 요일 헤더 */}
          <div className={`${koreanFont.className} grid grid-cols-7 gap-1 text-center text-[10px] text-stone-500 mb-4 font-semibold tracking-widest border-b border-stone-300/50 pb-2`}>
            <div className="text-red-400">SUN</div>
            <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div>
            <div className="text-stone-400">SAT</div>
          </div>
          
          {/* [수정] 날짜 그리드: map을 사용하여 모든 셀의 높이를 h-9로 고정 */}
          <div className={`${koreanFont.className} grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs text-stone-700 font-medium`}>
             {calendarDays.map((day, index) => {
                // 일요일(index % 7 === 0)은 빨간색, 토요일(index % 7 === 6)은 회색, 4일/11일/25일은 기존 코드대로 회색 처리
                const isSunday = index % 7 === 0;
                const isSaturday = index % 7 === 6;
                // 기존 코드의 특이사항(4,11,25일 회색) 유지
                const isSpecialGray = day === 4 || day === 11 || day === 25; 

                return (
                    <div 
                        key={index} 
                        // [핵심] 모든 셀에 h-9(36px) 높이를 강제하여 18일 하이라이트가 있어도 줄이 밀리지 않게 함
                        className={`flex items-center justify-center h-9 w-full ${
                            isSunday || day === 5 || day === 12 || day === 19 || day === 26 ? 'text-red-400' : 
                            isSaturday || isSpecialGray ? 'text-stone-400' : ''
                        }`}
                    >
                        {day === 18 ? (
                             // 18일 하이라이트 디자인
                             <div className="relative flex items-center justify-center w-full h-full">
                                <div className="absolute w-7 h-7 bg-amber-200/50 rounded-full animate-ping"></div>
                                <span className="relative z-10 text-white font-bold bg-amber-700 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md pt-[1px]">
                                    18
                                </span>
                             </div>
                        ) : (
                            // 일반 날짜
                            day
                        )}
                    </div>
                );
             })}
          </div>
        </div>

        {/* 카운트다운 박스 */}
        <div className="w-full py-6 px-4 rounded-lg border border-stone-300/50 flex justify-center min-h-[110px] bg-white/40 shadow-inner">
           {isMounted ? (
             <Countdown date={targetDate} renderer={renderer} />
           ) : (
             <div className={`${koreanFont.className} flex items-center justify-center text-stone-400 text-xs h-full w-full`}>
               <span className="animate-pulse">남은 시간을 불러오는 중...</span>
             </div>
           )}
        </div>
      </motion.div>
    </section>
  );
};

export default Section3_Calendar;