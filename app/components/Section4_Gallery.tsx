'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

// 1. 감성적인 한글 폰트
const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// 2. 럭셔리한 영문 폰트
const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

const images = [
  '/images/wedding/gallery-1.jpg',
  '/images/wedding/gallery-2.jpg',
  '/images/wedding/gallery-3.jpg',
  '/images/wedding/gallery-4.jpg',
  '/images/wedding/gallery-5.jpg',
  '/images/wedding/gallery-6.jpg',
  '/images/wedding/gallery-7.jpg',
  '/images/wedding/gallery-8.jpg',
];

const Section4_Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const navigate = (newDirection: number) => {
    if (selectedIndex === null) return;
    setDirection(newDirection);
    const newIndex = (selectedIndex + newDirection + images.length) % images.length;
    setSelectedIndex(newIndex);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const { offset, velocity } = info;
    if (offset.x > swipeThreshold || velocity.x > 500) {
      navigate(-1);
    } else if (offset.x < -swipeThreshold || velocity.x < -500) {
      navigate(1);
    }
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.95, transition: { duration: 0.2 } })
  };

  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden ${koreanFont.className}`}>
      
      {/* 1. 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/modern-bg.png" alt="Gallery Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      {/* 2. 썸네일 그리드 카드 */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="relative z-10 w-full max-w-sm bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-8"
      >
        <div className="mb-8 text-center">
          {/* 영문 폰트 적용 */}
          <p className={`${englishFont.className} text-amber-700/80 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase`}>
            Gallery
          </p>
          {/* 한글 폰트 적용 (기본) */}
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">
            우리의 아름다운 순간
          </h2>
        </div>

        {/* 3열 그리드 */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setDirection(0); setSelectedIndex(i); }}
              className="relative aspect-square cursor-pointer rounded-sm overflow-hidden bg-stone-100 shadow-sm hover:shadow-md transition-all group border border-white/50"
            >
              <Image 
                src={src} 
                alt={`gallery-${i}`} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                sizes="(max-width: 768px) 33vw, 25vw" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="text-white drop-shadow-md w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[11px] text-stone-500 mt-6 tracking-wide opacity-80">
            사진을 터치하면 크게 보실 수 있습니다.
        </p>
      </motion.div>

      {/* 3. 확대된 라이트박스 */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/40 backdrop-blur-xl px-4"
          >
            <button className="absolute top-6 right-6 text-stone-600 hover:text-stone-900 transition-colors p-2 z-[70]">
                <X size={32} strokeWidth={1.5} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="absolute left-4 text-stone-400 hover:text-stone-800 transition-colors p-4 z-[70] hidden md:block">
                <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate(1); }} className="absolute right-4 text-stone-400 hover:text-stone-800 transition-colors p-4 z-[70] hidden md:block">
                <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key={selectedIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.8} onDragEnd={handleDragEnd}
                  className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  <div className="relative w-full h-full shadow-2xl rounded-sm overflow-hidden bg-white">
                      <Image src={images[selectedIndex]} alt="Full Screen Image" fill className="object-contain" priority />
                  </div>
                </motion.div>
            </div>
            
            <div className="absolute bottom-10 z-[70] flex flex-col items-center gap-2">
                {/* 페이지 번호: 영문 폰트 적용 */}
                <span className={`${englishFont.className} text-stone-600 text-sm tracking-widest bg-stone-200/50 px-4 py-1 rounded-full backdrop-blur-sm border border-stone-300/30`}>
                    {selectedIndex + 1} <span className="text-stone-400 mx-1">/</span> {images.length}
                </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Section4_Gallery;