'use client';

import Image from 'next/image';

const FixedBackground = () => {
  // 1. 환경 변수에서 SEASON 값 가져오기
  // process.env.NEXT_PUBLIC_SEASON 값이 없으면 기본값으로 'spring'을 사용합니다.
  const season = process.env.NEXT_PUBLIC_SEASON || 'spring';
  // 2. 동적 이미지 경로 생성
  // 예: season이 'summer'라면 -> '/images/bg/summer.png' 가 됩니다.
  // 대소문자 실수를 방지하기 위해 toLowerCase()를 사용합니다.
  const imagePath = `/images/bg/${season.toLowerCase()}.png`;

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden bg-stone-50">
      {/* 배경 이미지 */}
      <Image
        src={imagePath} // 3. 동적으로 생성된 경로 적용
        alt={`${season} background`} // alt 속성도 동적으로 변경
        fill
        priority
        className="object-cover opacity-60 transition-opacity duration-500" // 투명도 조절 및 부드러운 전환을 위한 transition 추가
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