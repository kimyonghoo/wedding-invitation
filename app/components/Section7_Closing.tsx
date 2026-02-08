'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

// 1. 폰트 설정 (Section 1과 동일)
const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const Section7_Closing = () => {
  return (
    <section className="snap-section relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-stone-50">
      
      {/* 2. 액자 + 와이어 (위쪽으로 배치) */}
      <motion.div 
        className="absolute top-0 w-full h-full flex flex-col items-center pointer-events-none z-10"
        style={{ transformOrigin: 'top center' }} 
        animate={{ rotate: [2.0, -2.0] }} // 마지막이니 조금 더 잔잔하게 흔들림
        transition={{
            repeat: Infinity,    
            repeatType: "reverse", 
            duration: 5, // 더 천천히        
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
            
            {/* 와이어 길이: Section 1보다 짧게 설정하여 사진을 위로 올림 (15vh) */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: '15vh', opacity: 1 }} // 15vh 길이
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-[2px] bg-white origin-top shadow-[1px_0_2px_rgba(0,0,0,0.1)]"
            />
        </div>

        {/* (B) 액자 본체 */}
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 12,
            mass: 1.2,
            delay: 0.5       
          }}
          className="relative pt-[10vh]" // 와이어 길이만큼 띄움
        >
            {/* 와이어 연결 고리 */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
               <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[10px] border-b-white drop-shadow-sm"></div>
            </div>

            {/* 실제 액자 프레임 (다른 사진 사용 가능) */}
            <div className="relative z-10 p-3 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.15)] w-[65vw] max-w-[280px] aspect-[3/4]">
                <div className="relative w-full h-full bg-stone-50 overflow-hidden border border-stone-100">
                    {/* 마지막 사진은 가장 잘 나온 사진이나 웃는 사진 추천 */}
                    <Image 
                        src="/images/wedding/gallery-1.jpg" 
                        alt="Closing Couple"
                        fill
                        className="object-cover"
                    />
                    {/* 유리 반사광 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                </div>
            </div>
        </motion.div>
      </motion.div>


      {/* 3. 하단 마무리 텍스트 (액자 아래 배치) */}
      <div className="absolute bottom-[12vh] w-full z-20 flex flex-col items-center text-center px-4">
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.0 }}
          className="h-[1px] bg-stone-400 mb-6"
        />

        {/* 감사 메시지 */}
        <motion.p
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 1.2 }}
           className={`${koreanFont.className} text-stone-600 text-sm md:text-base mb-4 leading-relaxed`}
        >
          저희의 새로운 시작을<br/>
          함께 축복해주셔서 감사합니다.
        </motion.p>

        {/* 날짜 강조 메시지 */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          className={`${koreanFont.className} text-2xl md:text-3xl font-bold text-stone-800 tracking-wide mb-6 drop-shadow-sm`}
        >
          4월 18일에 만나요
        </motion.h2>

        {/* 영문 마무리 (Thank You) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8 }}
          className={`${englishFont.className} text-amber-700/80 text-xs md:text-sm tracking-[0.4em] uppercase font-semibold`}
        >
          Thank You
        </motion.p>

      </div>

    </section>
  );
};

export default Section7_Closing;