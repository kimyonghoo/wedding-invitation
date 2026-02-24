'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Gowun_Batang } from 'next/font/google';
import { WEDDING_INFO } from '@/app/config/weddingInfo';

const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const IntroOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  // [수정] 구조 분해 할당으로 날짜 정보 가져오기
  const { year, month, day } = WEDDING_INFO.date;

  // [수정] 월과 일을 항상 두 자리 문자열로 변환 (예: 4 -> '04', 18 -> '18')
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');

  useEffect(() => {
    // 2.2초 뒤에 사라짐
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`fixed inset-0 z-[9999] bg-[#fbfaf9] flex flex-col items-center justify-center ${koreanFont.className}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            {/* 작은 소제목 */}
            <p className="text-stone-500 text-xs tracking-[0.3em] mb-8 uppercase font-bold opacity-70">
              We invite you to our wedding
            </p>

            {/* 날짜 영역 */}
            <div className="flex items-center justify-center gap-6 text-stone-800">
                <motion.span 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-7xl md:text-8xl font-bold"
                >
                    {formattedMonth}
                </motion.span>
                
                {/* 가운데 사선 라인 */}
                <motion.span 
                    initial={{ scaleY: 0 }} 
                    animate={{ scaleY: 1 }} 
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="w-[2px] h-16 md:h-20 bg-stone-300 rotate-[15deg]"
                />
                
                <motion.span 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-7xl md:text-8xl font-bold"
                >
                    {formattedDay}
                </motion.span>
            </div>

            {/* 연도 */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-stone-400 text-sm mt-6 tracking-[0.3em] font-bold"
            >
              {year}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;