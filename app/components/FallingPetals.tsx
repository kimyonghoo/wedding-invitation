'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingPetals = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    const petalCount = 20; // 개수 약간 증가
    const newPetals = Array.from({ length: petalCount }).map((_, i) => i);
    setPetals(newPetals);
  }, []);

  return (
    // [수정 포인트] z-0 -> z-[50] (섹션 위로 올림)
    // pointer-events-none 덕분에 터치나 스크롤에는 방해되지 않습니다.
    <div className="pointer-events-none fixed inset-0 z-[50] overflow-hidden">
      {petals.map((i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x: Math.random() * 100 + "vw",
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "100vh",
            x: `calc(${Math.random() * 20 - 10}vw + ${Math.random() * 100}vw)`,
            opacity: [0, 0.8, 0.8, 0], // 투명도 약간 조절
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          // 색상을 조금 더 진하게 변경 (너무 연해서 안 보일 수도 있음)
          // bg-pink-200 -> bg-[#FFB7B2] (살짝 더 진한 벚꽃색)
          className="absolute top-0 w-3 h-3 bg-[#FFB7B2] rounded-tl-none rounded-br-none rounded-tr-xl rounded-bl-xl shadow-sm opacity-80"
          style={{ borderRadius: "100% 0% 100% 0% / 100% 0% 100% 0%" }} 
        />
      ))}
    </div>
  );
};

export default FallingPetals;