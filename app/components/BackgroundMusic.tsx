'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* 실제 오디오 태그 (화면에는 안 보임) */}
      <audio ref={audioRef} src="/music/bg.mp3" loop />

      {/* 우측 상단 고정 버튼 */}
      <motion.button
        onClick={toggleMusic}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`fixed top-4 right-4 z-[9999] w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-all duration-300 
          ${isPlaying 
            ? 'bg-stone-800/80 border-stone-700 text-white shadow-lg' 
            : 'bg-white/80 border-stone-200 text-stone-400 hover:text-stone-600 backdrop-blur-sm'
          }`}
        aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 3, ease: "linear" } 
              }}
            >
              <Music size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <VolumeX size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default BackgroundMusic;