'use client';

import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) return <span className={`${koreanFont.className} text-sm text-stone-800 font-bold`}>결혼식을 축하합니다!</span>;
    
    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
      <div className="flex flex-col items-center mx-1">
        <div className="bg-white w-10 h-10 rounded-md flex items-center justify-center shadow-sm border border-stone-200">
          {/* 숫자 폰트 변경: Playfair Display */}
          <span className={`${englishFont.className} text-xl font-semibold text-stone-800 tabular-nums pt-1`}>
            {value < 10 ? `0${value}` : value}
          </span>
        </div>
        <span className={`${englishFont.className} text-[9px] text-stone-500 mt-1 uppercase tracking-wider`}>{label}</span>
      </div>
    );

    return (
      <div className="flex flex-col items-center w-full">
        <div className={`${englishFont.className} text-stone-500 font-medium text-sm mb-4 tracking-widest`}>
           D <span className="mx-1">-</span> <span className="text-2xl text-amber-700 font-bold">{days}</span>
        </div>
        <div className="flex justify-center items-start gap-1">
            <TimeUnit value={hours} label="Hours" />
            <span className={`${englishFont.className} text-stone-400 text-lg mt-1 font-light mx-0.5`}>:</span>
            <TimeUnit value={minutes} label="Mins" />
            <span className={`${englishFont.className} text-stone-400 text-lg mt-1 font-light mx-0.5`}>:</span>
            <TimeUnit value={seconds} label="Secs" />
        </div>
      </div>
    );
  };

  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden wedding-bg`}>
      {/* 2. 메인 콘텐츠 카드 */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="relative z-10 w-full max-w-sm bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-8 flex flex-col items-center"
      >
        {/* 타이틀: 고운바탕 */}
        <h2 className={`${koreanFont.className} text-xl font-bold mb-3 text-stone-800 text-center tracking-wide`}>
            4월의 어느 멋진 날
        </h2>
        {/* 날짜: Playfair Display */}
        <p className={`${englishFont.className} mb-8 text-center text-stone-600 text-sm font-medium tracking-[0.1em] uppercase`}>
            2026. 04. 18. Sat 12:00 PM
        </p>

        {/* 달력 본체 */}
        <div className="w-full mb-8 px-2">
          {/* 요일 헤더: Playfair Display */}
          <div className={`${englishFont.className} grid grid-cols-7 gap-1 text-center text-[10px] text-stone-500 mb-4 font-semibold tracking-widest border-b border-stone-300/50 pb-2`}>
            <div className="text-red-400">SUN</div>
            <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div>
            <div className="text-stone-400">SAT</div>
          </div>
          
          {/* 날짜 그리드: Playfair Display (숫자가 예쁨) */}
          <div className={`${englishFont.className} grid grid-cols-7 gap-y-5 gap-x-1 text-center text-sm text-stone-700 font-medium`}>
             <div></div><div></div><div></div>
             <div>1</div><div>2</div><div>3</div><div className="text-stone-400">4</div>
             <div className="text-red-400">5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div className="text-stone-400">11</div>
             <div className="text-red-400">12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div>
             <div className="relative flex items-center justify-center">
                <div className="absolute w-7 h-7 bg-amber-200/50 rounded-full animate-ping"></div>
                {/* 선택된 날짜 원형 배경 */}
                <span className="relative z-10 text-white font-bold bg-amber-700 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md pt-[1px]">
                    18
                </span>
             </div>
             <div className="text-red-400">19</div><div>20</div><div>21</div><div>22</div><div>23</div><div>24</div><div className="text-stone-400">25</div>
             <div className="text-red-400">26</div><div>27</div><div>28</div><div>29</div><div>30</div><div></div><div></div>
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