'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Gowun_Batang } from 'next/font/google'; // [수정] Gowun_Batang 임포트

// [수정] 고운바탕 폰트 설정
const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const IntroOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

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

            {/* [수정] 날짜: Gowun_Batang 적용 (class로 상속됨) */}
            <div className="flex items-center justify-center gap-6 text-stone-800">
                <motion.span 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, delay: 0.5 }}
                    // 고운바탕은 정자체(italic 제거)가 가장 예쁩니다.
                    // 숫자가 너무 얇으면 안 보이니 font-bold 추가
                    className="text-7xl md:text-8xl font-bold"
                >
                    04
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
                    18
                </motion.span>
            </div>

            {/* 연도 */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-stone-400 text-sm mt-6 tracking-[0.3em] font-bold"
            >
              2026
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;