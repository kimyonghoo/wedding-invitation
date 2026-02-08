'use client';

import { motion } from 'framer-motion';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const Section2_Quote = () => {
  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden ${koreanFont.className}`}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm px-4 py-12 text-center"
      >
        {/* 장식 선 */}
        <div className="w-[1px] h-10 bg-stone-500 mx-auto mb-6 opacity-50"></div>

        <p className={`${englishFont.className} text-amber-800 text-[11px] tracking-[0.3em] uppercase mb-4 font-medium drop-shadow-sm`}>
            Invitation
        </p>

        <h2 className="text-stone-900 text-2xl font-bold mb-10 tracking-[0.2em] drop-shadow-sm">
          초대의 글
        </h2>

        <div className="space-y-7 text-stone-800 text-[15px] leading-8 font-medium tracking-wide drop-shadow-sm">
          <p>
            꽃향기와 함께 찾아온 당신과<br />
            사랑의 언약을 맺습니다.
          </p>
          <p>
            저희 두 사람이 삶의 동반자로서 맞이하는<br />
            첫 번째 봄에 함께 하시어 축복해 주시면<br />
            큰 기쁨으로 영원히 간직하겠습니다.
          </p>
        </div>
        
        <div className="w-[40px] h-[1px] bg-stone-400 mx-auto my-12 opacity-60" />

        {/* [수정] Grid를 사용하여 세로 줄(Align) 완벽하게 맞춤 */}
        {/* grid-cols-[auto_auto_auto]: 3개의 열이 내용물 크기에 맞게 자동 조절되면서 정렬됨 */}
        <div className="grid grid-cols-[auto_auto_auto] gap-x-3 gap-y-3 justify-center items-center drop-shadow-sm mx-auto max-w-[300px]">
            
            {/* --- 1열: 신랑 측 --- */}
            
            {/* 혼주 (오른쪽 정렬) */}
            <div className="text-right text-stone-700 text-[15px] tracking-tight whitespace-nowrap">
                박남용 · 곽영희
            </div>
            {/* 관계 (가운데 정렬) */}
            <div className="text-center text-stone-400 text-[11px] whitespace-nowrap pt-[2px]">
                의 아들
            </div>
            {/* 이름 (왼쪽 정렬) */}
            <div className="text-left text-xl font-bold text-stone-900 whitespace-nowrap">
                형묵
            </div>


            {/* --- 2열: 신부 측 --- */}

            {/* 혼주 (오른쪽 정렬) */}
            <div className="text-right text-stone-700 text-[15px] tracking-tight whitespace-nowrap">
                문장혁 · 김계숙
            </div>
            {/* 관계 (가운데 정렬) */}
            <div className="text-center text-stone-400 text-[11px] whitespace-nowrap pt-[2px]">
                의 딸
            </div>
            {/* 이름 (왼쪽 정렬) */}
            <div className="text-left text-xl font-bold text-stone-900 whitespace-nowrap">
                원영
            </div>

        </div>

      </motion.div>
    </section>
  );
};

export default Section2_Quote;