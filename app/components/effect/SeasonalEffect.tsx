"use client"; // [추가] 클라이언트 컴포넌트로 선언

import dynamic from 'next/dynamic';
const currentSeason = (process.env.NEXT_PUBLIC_SEASON || 'spring').toLowerCase();
const EffectComponents: Record<string, React.ComponentType> = {
  spring: dynamic(() => import('./Spring'), { ssr: false }),
  summer: dynamic(() => import('./Summer'), { ssr: false }),
  autumn: dynamic(() => import('./Autumn'), { ssr: false }),
  winter: dynamic(() => import('./Winter'), { ssr: false }),
};

export default function SeasonalEffect() {
  // 환경변수 값에 맞는 컴포넌트를 찾고, 오타 등으로 못 찾으면 봄을 렌더링합니다.
  const ActiveEffect = EffectComponents[currentSeason] || EffectComponents['spring'];

  return <ActiveEffect />;
}