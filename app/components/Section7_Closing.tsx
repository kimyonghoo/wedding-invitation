'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
// Montserrat 폰트 추가
import { Gowun_Batang, Playfair_Display, Montserrat } from 'next/font/google'; 
import { useEffect, useState } from 'react';

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

// Copyright용 깔끔한 산세리프 폰트 설정
const copyrightFont = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
});

const Section7_Closing = () => {
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    // 이름 업데이트 함수
    const updateName = () => {
      const name = localStorage.getItem('rsvp_name');
      if (name) setGuestName(name);
    };

    // 1. 처음 마운트 될 때 확인
    updateName();

    // 2. 'rsvp-updated' 이벤트가 발생하면 다시 확인 (이벤트 리스너 등록)
    window.addEventListener('rsvp-updated', updateName);

    // 3. 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('rsvp-updated', updateName);
    };
  }, []);

  return (
    <section className="snap-section relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-stone-50">
      
      {/* 2. 액자 + 와이어 */}
      <motion.div 
        className="absolute top-0 w-full h-full flex flex-col items-center pointer-events-none z-10"
        style={{ transformOrigin: 'top center' }} 
        animate={{ rotate: [2.0, -2.0] }}
        transition={{
            repeat: Infinity,    
            repeatType: "reverse", 
            duration: 5,        
            ease: "easeInOut"    
        }}
      >
        <div className="absolute top-0 flex flex-col items-center w-full">
            <div className="relative z-20">
              <div className="w-6 h-6 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center mt-[-12px]">
                <div className="w-1 h-1 rounded-full bg-stone-300"></div>
              </div>
            </div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: '15vh', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-[2px] bg-white origin-top shadow-[1px_0_2px_rgba(0,0,0,0.1)]"
            />
        </div>
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 30, damping: 12, mass: 1.2, delay: 0.5 }}
          className="relative pt-[10vh]"
        >
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
               <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[10px] border-b-white drop-shadow-sm"></div>
            </div>
            <div className="relative z-10 p-3 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.15)] w-[65vw] max-w-[280px] aspect-[3/4]">
                <div className="relative w-full h-full bg-stone-50 overflow-hidden border border-stone-100">
                    <Image 
                        src="/images/wedding/gallery-10.jpg" 
                        alt="Closing Couple"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                </div>
            </div>
        </motion.div>
      </motion.div>

      {/* 3. 하단 마무리 텍스트 */}
      <div className="absolute bottom-[12vh] w-full z-20 flex flex-col items-center text-center px-4">
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.0 }}
          className="h-[1px] bg-stone-400 mb-4"
        />

        {/* 감사 메시지 (이름 반영) */}
        <motion.p
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 1.2 }}
           className={`${koreanFont.className} text-stone-600 text-sm md:text-base mb-4 leading-relaxed`}
        >
          {guestName ? (
            <>
              <span className="font-bold text-stone-800 text-lg mr-0.5">{guestName}</span>님,<br/>
              저희의 새로운 시작을<br/>
              함께 축복해주셔서 감사합니다.
            </>
          ) : (
            <>
              저희의 새로운 시작을<br/>
              함께 축복해주셔서 감사합니다.
            </>
          )}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          className={`${koreanFont.className} text-2xl md:text-3xl font-bold text-stone-800 tracking-wide mb-4 drop-shadow-sm`}
        >
          4월 18일에 만나요
        </motion.h2>

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

      {/* 4. Copyright 추가 영역 (폰트 교체 완료) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute bottom-6 w-full z-20 flex justify-center"
      >
        <p className={`${copyrightFont.className} text-[8px] text-stone-400 tracking-widest font-light opacity-80`}>
          &copy; 2026. O&apos;hoo All rights reserved.
        </p>
      </motion.div>

    </section>
  );
};

export default Section7_Closing;