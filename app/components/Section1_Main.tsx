'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

// 1. 감성적인 한글 폰트 (고운바탕)
const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// 2. 럭셔리한 영문 폰트 (Playfair Display)
const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const Section1_Main = () => {
  return (
    <section className="wedding-bg snap-section relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-stone-50">
      
      {/* 1. 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/modern-bg.png" 
          alt="Main Background"
          fill
          className="object-cover object-bottom opacity-80"
          priority
        />
      </div>

      {/* 2. 상단 텍스트 (폰트 적용) */}
      <div className="absolute top-[8vh] w-full z-20 flex flex-col items-center text-center px-4">
        {/* 영문 타이틀: Playfair Display */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`${englishFont.className} text-xs md:text-sm tracking-[0.3em] uppercase mb-3 font-semibold text-stone-600`}
        >
          We Are Getting Married
        </motion.p>

        {/* 이름: 고운바탕 / & 기호: Playfair Display Italic */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-normal tracking-wide mb-5 text-stone-800 drop-shadow-sm flex items-center justify-center gap-3"
        >
          <span className={`${koreanFont.className} font-bold`}>박형묵</span>
          <span className={`${englishFont.className} text-xl md:text-3xl text-amber-700 italic font-medium`}>&</span>
          <span className={`${koreanFont.className} font-bold`}>문원영</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "40px" }}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-[1px] bg-stone-400 mb-5"
        />

        {/* 한글 메시지: 고운바탕 */}
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.8 }}
           className={`${koreanFont.className} text-sm md:text-base font-bold text-stone-600 tracking-wide`}
        >
          저희 두 사람, 결혼합니다.
        </motion.p>
      </div>


      {/* 3. 액자 + 와이어 (흔들리는 애니메이션 그룹 - 기존 유지) */}
      <motion.div 
        className="absolute top-0 w-full h-full flex flex-col items-center pointer-events-none z-10"
        style={{ transformOrigin: 'top center' }} 
        animate={{ rotate: [3.0, -3.0] }} 
        transition={{
            repeat: Infinity,    
            repeatType: "reverse", 
            duration: 4,         
            ease: "easeInOut"    
        }}
      >
        
        {/* (A) 와이어 & 천장 고정부 */}
        <div className="absolute top-0 flex flex-col items-center w-full">
            <div className="relative z-20">
              <div className="w-6 h-6 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center mt-[-12px]">
                <div className="w-1 h-1 rounded-full bg-stone-300"></div>
              </div>
            </div>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '30vh', opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-[2px] bg-white origin-top shadow-[1px_0_2px_rgba(0,0,0,0.1)]"
            />
        </div>

        {/* (B) 액자 본체 */}
        <motion.div
          initial={{ y: -600, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 20,
            damping: 12,
            mass: 2.5,
            delay: 0.5       
          }}
          className="relative pt-[30vh]" 
        >
            {/* 와이어 연결 고리 */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
               <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[10px] border-b-white drop-shadow-sm"></div>
            </div>

            {/* 실제 액자 프레임 */}
            <div className="relative z-10 p-3 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.15)] w-[70vw] max-w-[280px] aspect-[3/4]">
                <div className="relative w-full h-full bg-stone-50 overflow-hidden border border-stone-100">
                    <Image 
                        src="/images/wedding/gallery-3.jpg" 
                        alt="Wedding Couple"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* 유리 반사광 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                </div>
            </div>
        </motion.div>
      </motion.div>

      
      {/* 4. 스크롤 안내 (폰트 적용) */}
      <motion.div 
        animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 z-30 text-stone-500 flex flex-col items-center gap-2"
      >
        <span className={`${englishFont.className} text-[10px] tracking-[0.2em] font-medium`}>SCROLL</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-stone-400 to-transparent"></div>
      </motion.div>

    </section>
  );
};

export default Section1_Main;