'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AutumnEffect {
  id: number;
  width: number;
  height: number;
  mainColor: string;
  left: string;
  duration: number;
  delay: number;
  rotateDir: number;
  swayAmount: string;
}

const Autumn = () => {
  const [needles, setNeedles] = useState<AutumnEffect[]>([]);

  useEffect(() => {
    const needleCount = 25; // 개수를 조금 더 늘림
    const colors = ['#2E7D32', '#388E3C', '#43A047', '#66BB6A']; // 푸르른 초록 계열 색상

    const newNeedles: AutumnEffect[] = Array.from({ length: needleCount }).map((_, i) => {
      const height = Math.random() * 20 + 30; // 30~50px (길게)
      const width = Math.random() * 2 + 1;  // 1~3px (얇게)
      const mainColor = colors[Math.floor(Math.random() * colors.length)];
      const left = `${Math.random() * 100}vw`;
      const duration = Math.random() * 15 + 10; // 10~25초 (조금 더 빠르게)
      const delay = Math.random() * 15;
      const rotateDir = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5 + 2); // 회전 속도 증가
      const swayAmount = `${Math.random() * 30 - 15}vw`; // 좌우 흔들림은 적게

      return {
        id: i,
        width,
        height,
        mainColor,
        left,
        duration,
        delay,
        rotateDir,
        swayAmount
      };
    });
    setNeedles(newNeedles);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {needles.map((needle) => {
        const gradientId = `pine-gradient-${needle.id}`;

        return (
          <motion.div
            key={needle.id}
            initial={{
              y: -50,
              x: needle.left,
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: "105vh",
              x: `calc(${needle.left} + ${needle.swayAmount})`,
              opacity: [0, 1, 0.8, 0], // 투명도 조절
              rotate: [null, 360 * needle.rotateDir],
            }}
            transition={{
              duration: needle.duration,
              repeat: Infinity,
              delay: needle.delay,
              ease: "linear",
            }}
            className="absolute top-0 flex items-center justify-center"
            style={{
              width: needle.width,
              height: needle.height,
              // filter: 'blur(0.1px)', // 흐림 효과 살짝 제거
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 100" // 얇고 긴 뷰박스
              width="100%"
              height="100%"
              stroke="none"
              preserveAspectRatio="none" // 비율 유지하지 않고 꽉 채움
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A5D6A7" stopOpacity="0.9" /> {/* 밝은 초록 */}
                  <stop offset="50%" stopColor={needle.mainColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={needle.mainColor} stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* [핵심] 얇고 긴 소나무 잎 Path */}
              <path
                fill={`url(#${gradientId})`}
                d="M5 0 C 7 30 10 70 5 100 C 0 70 3 30 5 0 Z" // 양쪽이 살짝 휜 바늘 모양
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Autumn;