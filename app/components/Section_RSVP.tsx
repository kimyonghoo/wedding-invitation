'use client';

import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, Check, RefreshCw } from 'lucide-react';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';

const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const Section_RSVP = () => {
  const [formData, setFormData] = useState({
    side: '신랑측', // [수정] 기본값 한글로 변경
    name: '',
    count: 1,
    meal: 'yes',    // yes/no는 유지하되 미정만 변경
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }
    if (!formData.privacy) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('rsvp').upsert([
      {
        side: formData.side,
        name: formData.name,
        count: formData.count,
        meal: formData.meal,
        privacy_consent: formData.privacy,
      },
    ], { onConflict: 'name, side' });

    setIsSubmitting(false);

    if (error) {
      alert('전송에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
    } else {
      setIsSubmitted(true);
      
      // 로컬 스토리지 저장 후 'rsvp-updated' 이벤트 발생
      localStorage.setItem('rsvp_name', formData.name);
      window.dispatchEvent(new Event('rsvp-updated')); 
    }
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const btnBase = "flex-1 py-3 text-xs rounded-sm border transition-all duration-200 flex items-center justify-center gap-1.5";
  const activeBtn = "bg-stone-800 text-white border-stone-800 font-bold shadow-md";
  const inactiveBtn = "bg-white text-stone-400 border-stone-200 hover:bg-stone-50";

  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-6 overflow-hidden wedding-bg ${koreanFont.className}`}>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/60 rounded-sm p-8"
      >
        <div className="text-center mb-8">
          <p className={`${koreanFont.className} text-amber-700/80 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase`}>
            RSVP
          </p>
          <h2 className="text-xl font-bold text-stone-800 tracking-wide">참석 의사 전달</h2>
          <p className="text-stone-500 text-[11px] mt-2 tracking-tight opacity-80 leading-relaxed">
            원활한 예식 진행을 위해<br />
            참석 정보를 알려주시면 감사하겠습니다.
          </p>
        </div>

        <AnimatePresence mode='wait'>
          {isSubmitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-amber-700 mb-4" />
              <h3 className="text-lg font-bold text-stone-800 mb-2">전달되었습니다!</h3>
              <p className="text-xs text-stone-500 leading-relaxed mb-8">
                소중한 시간 내어주셔서 감사합니다.<br/>
                정보를 수정하시려면 아래 버튼을 눌러주세요.
              </p>
              
              <button 
                onClick={handleEdit}
                className="text-xs text-stone-400 border-b border-stone-300 pb-0.5 hover:text-stone-800 hover:border-stone-800 transition-colors flex items-center gap-1"
              >
                <RefreshCw size={10} />
                정보 수정하기
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-stone-500 ml-1">구분</label>
                <div className="flex gap-2">
                  {/* [수정] side 값 변경: groom -> 신랑측 */}
                  <button type="button" onClick={() => setFormData({...formData, side: '신랑측'})} className={`${btnBase} ${formData.side === '신랑측' ? activeBtn : inactiveBtn}`}>
                    신랑측
                  </button>
                  {/* [수정] side 값 변경: bride -> 신부측 */}
                  <button type="button" onClick={() => setFormData({...formData, side: '신부측'})} className={`${btnBase} ${formData.side === '신부측' ? 'bg-amber-700 text-white border-amber-700 font-bold shadow-md' : inactiveBtn}`}>
                    신부측
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-[1.2fr_1fr] gap-3">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-stone-500 ml-1">성함</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="성함"
                    className="w-full bg-white border border-stone-200 rounded-sm px-3 py-3 text-sm text-stone-800 focus:outline-none focus:border-stone-500 transition-colors text-center"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-bold text-stone-500 ml-1">인원 (본인포함)</label>
                   <div className="flex items-center justify-between bg-white border border-stone-200 rounded-sm p-1 h-[46px]">
                      <button type="button" onClick={() => setFormData(prev => ({...prev, count: Math.max(1, prev.count - 1)}))} className="w-8 h-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-50 rounded-sm transition-colors text-lg">-</button>
                      <span className="text-sm font-bold text-stone-800 w-6 text-center">{formData.count}</span>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, count: Math.min(10, prev.count + 1)}))} className="w-8 h-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-50 rounded-sm transition-colors text-lg">+</button>
                   </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-stone-500 ml-1">식사 여부</label>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => setFormData({...formData, meal: 'yes'})} className={`${btnBase} ${formData.meal === 'yes' ? activeBtn : inactiveBtn}`}>
                    식사 예정
                  </button>
                  {/* [수정] meal 값 변경: unknown -> 미정 */}
                  <button type="button" onClick={() => setFormData({...formData, meal: '미정'})} className={`${btnBase} ${formData.meal === '미정' ? activeBtn : inactiveBtn}`}>
                    미정
                  </button>
                  <button type="button" onClick={() => setFormData({...formData, meal: 'no'})} className={`${btnBase} ${formData.meal === 'no' ? activeBtn : inactiveBtn}`}>
                    안함
                  </button>
                </div>
              </div>

              <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${formData.privacy ? 'bg-stone-800 border-stone-800' : 'bg-white border-stone-300'}`}>
                          {formData.privacy && <Check size={12} className="text-white" />}
                      </div>
                      <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.privacy} 
                          onChange={(e) => setFormData({...formData, privacy: e.target.checked})} 
                      />
                      <span className="text-[10px] text-stone-500 group-hover:text-stone-700 transition-colors">
                          개인정보 수집 및 이용에 동의합니다.
                      </span>
                  </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-amber-800 text-white py-4 rounded-sm text-sm font-bold shadow-md hover:bg-amber-900 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : (formData.name && formData.privacy ? '참석 의사 전달하기' : '정보를 입력해주세요')}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Section_RSVP;