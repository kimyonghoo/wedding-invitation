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
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const Section2_Quote = () => {
  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden ${koreanFont.className}`}>
      
      {/* 2. 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/modern-bg.png"
          alt="Modern Background"
          fill
          className="object-cover"
          priority
        />
        {/* 배경 밝기 조절 */}
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* 3. 초대 문구 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm px-8 py-12 bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm text-center"
      >
        {/* 장식 선 */}
        <div className="w-[1px] h-8 bg-stone-400 mx-auto mb-4 opacity-60"></div>

        {/* 영문 소제목 포인트 */}
        <p className={`${englishFont.className} text-amber-700/70 text-[10px] tracking-[0.3em] uppercase mb-3`}>
            Invitation
        </p>

        <h2 className="text-stone-800 text-xl font-bold mb-8 tracking-[0.2em] opacity-90">
          초대의 글
        </h2>

        {/* 본문: 고운바탕체가 주는 서정적인 느낌 */}
        <div className="space-y-6 text-stone-700 text-[15px] leading-8 font-normal tracking-wide">
          <p>
            서로 다른 별에서 태어나<br />
            긴 여행 끝에 서로를 만났습니다.
          </p>
          <p>
            이제 같은 별을 바라보며<br />
            함께 걸어가려 합니다.
          </p>
          <p>
            저희 두 사람의 시작을<br />
            따뜻한 마음으로 축복해주세요.
          </p>
        </div>
        
        {/* 구분선 */}
        <div className="w-full h-[1px] bg-stone-400/30 my-10" />

        {/* 혼주 및 이름 */}
        <div className="space-y-4 font-normal text-stone-800">
            
            <div className="flex justify-center items-end gap-3">
                <span className="text-stone-500 text-sm tracking-tighter mb-[2px]">
                    박남용 · 곽영희 <span className="text-stone-400 text-xs ml-1">의 장남</span>
                </span>
                <strong className="text-xl font-bold leading-none text-stone-900">형묵</strong>
            </div>

            <div className="flex justify-center items-end gap-3">
                <span className="text-stone-500 text-sm tracking-tighter mb-[2px]">
                    000 · 000 <span className="text-stone-400 text-xs ml-1">의 장녀</span>
                </span>
                <strong className="text-xl font-bold leading-none text-stone-900">원영</strong>
            </div>
            
        </div>
      </motion.div>
    </section>
  );
};

export default Section2_Quote;