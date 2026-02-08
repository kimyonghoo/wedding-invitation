'use client';

import Image from 'next/image';

const FixedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden bg-stone-50">
      {/* 배경 이미지 */}
      <Image
        src="/images/modern-bg.png" // 사용하시려는 배경 이미지 경로
        alt="Background"
        fill
        priority
        className="object-cover opacity-60" // 투명도 조절 (너무 진하면 글씨 안 보임)
        style={{ objectPosition: 'center' }}
      />
      
      {/* (선택사항) 그레인(노이즈) 효과 추가 - 더 종이 질감 같음 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
      </div>
    </div>
  );
};

export default FixedBackground;