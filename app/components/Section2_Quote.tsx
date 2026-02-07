'use client';

import { motion } from 'framer-motion';
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
    // wedding-bg 클래스로 배경 처리
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden ${koreanFont.className} wedding-bg`}>

      {/* 3. 초대 문구 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm px-8 py-12 bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm text-center"
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

        {/* 본문: 문구 변경 및 레이아웃 조정 */}
        <div className="space-y-6 text-stone-700 text-[13px] leading-8 font-normal tracking-wide">
          <p>
            꽃향기와 함께 찾아온 당신과<br />
            사랑의 언약을 맺습니다.
          </p>
          <p>
            저희 두 사람이 삶의 동반자로서 맞이하는<br />
            첫 번째 봄에 함께 하시어 축복해 주시면
          </p>
          <p>
            큰 기쁨으로 영원히 간직하겠습니다.
          </p>
        </div>
        
        {/* 구분선 */}
        <div className="w-full h-[1px] bg-stone-400/30 my-10" />

        {/* 혼주 및 이름 */}
        <div className="space-y-4 font-normal text-stone-800">
            
            <div className="flex justify-center items-end gap-3">
                <span className="text-stone-500 text-sm tracking-tighter mb-[2px]">
                    박남용 · 곽영희<span className="text-stone-400 text-xs ml-1">의</span><span className="pl- text-stone-500 text-sm tracking-tighter mb-[2px]">아들</span>
                </span>
                <strong className="text-xl font-bold leading-none text-stone-900">형묵</strong>
            </div>

            <div className="flex justify-center items-end gap-3">
                <span className="text-stone-500 text-sm tracking-tighter mb-[2px]">
                    문장혁 · 김계숙<span className="text-stone-400 text-xs ml-1">의</span><span className="pl-2 text-stone-500 text-sm tracking-tighter mb-[2px]">딸</span>
                </span>
                <strong className="text-xl font-bold leading-none text-stone-900">원영</strong>
            </div>
            
        </div>
      </motion.div>
    </section>
  );
};

export default Section2_Quote;