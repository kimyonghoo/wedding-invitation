'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/app/lib/supabaseClient'; 
import { Copy, MessageCircle, Loader2, Send, X, ChevronRight } from 'lucide-react';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const englishFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

type GuestMessage = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

// 계좌 정보 데이터
const groomAccounts = [
    { bank: '우리은행', name: '박형묵', account: '1002-441-560976', copyText: '1002441560976' },
    { bank: '경남은행', name: '박남용', account: '503-22-0173504', copyText: '503220173504' },
    { bank: '경남은행', name: '곽영희', account: '513-22-0500311', copyText: '513220500311' },
];

const brideAccounts = [
    { bank: '하나은행', name: '문원영', account: '231-910586-17507', copyText: '23191058617507' },
    { bank: '토스뱅크', name: '문장혁', account: '1000-1700-7320', copyText: '100017007320' },
    { bank: 'NH농협', name: '김계숙', account: '301-0261-1959-01', copyText: '3010261195901' },
];

const Section6_Gift = () => {
  const [activeModal, setActiveModal] = useState<'groom' | 'bride' | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [guestbook, setGuestbook] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching:', error);
    else setGuestbook(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }
    const { error } = await supabase.from('guestbook').insert([{ name, message }]);
    
    if (error) { 
        alert('저장에 실패했습니다.'); 
    } else { 
        setName(''); 
        setMessage(''); 
        await fetchMessages(); 
        
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
  };

  const copy = (num: string) => {
    navigator.clipboard.writeText(num);
    alert('계좌번호가 복사되었습니다.');
  };

  return (
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-4 overflow-hidden ${koreanFont.className}`}>

      {/* 2. 메인 콘텐츠 카드 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[340px] max-h-[85vh] bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-6 flex flex-col"
      >
        
        {/* 헤더 */}
        <div className="shrink-0 text-center mb-6">
            <p className={`${englishFont.className} text-amber-700/80 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase`}>
                Account & Message
            </p>
            <h2 className="text-xl font-bold text-stone-800 tracking-widest mb-1">마음 전하는 곳</h2>
        </div>

        {/* 계좌 확인 버튼 (2개) */}
        <div className="shrink-0 flex flex-col gap-2 mb-6">
            <button 
                onClick={() => setActiveModal('groom')}
                className="w-full py-3 px-4 bg-white/80 border border-stone-200 rounded-sm shadow-sm flex items-center justify-between hover:bg-stone-50 transition-colors group"
            >
                <div className="flex flex-col items-start">
                    <span className="text-xs text-stone-400 mb-0.5">Groom's Side</span>
                    <span className="text-sm font-bold text-stone-800">신랑측 마음 전하기</span>
                </div>
                <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
                onClick={() => setActiveModal('bride')}
                className="w-full py-3 px-4 bg-white/80 border border-stone-200 rounded-sm shadow-sm flex items-center justify-between hover:bg-amber-50/50 transition-colors group"
            >
                <div className="flex flex-col items-start">
                    <span className="text-xs text-stone-400 mb-0.5">Bride's Side</span>
                    <span className="text-sm font-bold text-stone-800">신부측 마음 전하기</span>
                </div>
                <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>

        {/* 방명록 영역 */}
        <div className="flex-1 flex flex-col min-h-0 border-t border-stone-300/50 pt-4">
            <div className="flex items-center gap-1 mb-2 px-1 shrink-0">
                <MessageCircle size={14} className="text-stone-500" />
                <h3 className="text-xs font-bold text-stone-700">축하 메시지 <span className={`${englishFont.className} text-amber-700 ml-0.5 font-bold`}>{guestbook.length}</span></h3>
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="flex gap-1.5 mb-3 shrink-0 w-full">
                <input 
                    type="text" 
                    placeholder="이름" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-[3.5rem] bg-white border border-stone-200 rounded-sm px-1 py-2 text-xs text-center text-stone-800 focus:outline-none focus:border-stone-400 shadow-sm placeholder:text-stone-300 font-medium" 
                />
                <input 
                    type="text" 
                    placeholder="축하 메시지" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="flex-1 min-w-0 bg-white border border-stone-200 rounded-sm px-2 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-sm placeholder:text-stone-300 font-medium" 
                />
                <button type="submit" className="bg-stone-800 text-white px-2.5 rounded-sm text-xs hover:bg-stone-700 transition-colors shadow-sm flex items-center justify-center shrink-0">
                    <Send size={12} />
                </button>
            </form>

            {/* 메시지 리스트 */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pr-1 pb-2">
                {isLoading ? (
                    <div className="flex justify-center py-6"><Loader2 className="animate-spin text-stone-300 w-5 h-5" /></div>
                ) : guestbook.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-6">
                        <p className="text-stone-400 text-xs">작성된 메시지가 없습니다.</p>
                        <p className="text-stone-300 text-[10px] mt-1">따뜻한 마음을 남겨주세요!</p>
                    </div>
                ) : (
                    guestbook.map((msg) => (
                        <div key={msg.id} className="bg-white/70 rounded-sm p-2.5 border border-stone-100 shadow-sm animate-in slide-in-from-bottom-2">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-stone-800 text-xs truncate max-w-[80px]">{msg.name}</span>
                                <span className={`${koreanFont.className} text-[9px] text-stone-400 font-light whitespace-nowrap`}>
                                    {new Date(msg.created_at).toLocaleDateString().slice(2)}
                                </span>
                            </div>
                            <p className="text-stone-600 text-xs break-words leading-relaxed font-light">{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
      </motion.div>


      {/* 계좌번호 모달 팝업 */}
      <AnimatePresence>
        {activeModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full max-w-sm rounded-sm shadow-2xl overflow-hidden"
                >
                    {/* 모달 헤더 */}
                    <div className="bg-stone-50 p-4 border-b border-stone-100 flex justify-between items-center">
                        <h3 className="text-stone-800 font-bold text-sm tracking-wide">
                            {activeModal === 'groom' ? '신랑측 계좌번호' : '신부측 계좌번호'}
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="text-stone-400 hover:text-stone-800 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* 계좌 리스트 */}
                    <div className="p-4 space-y-3">
                        {(activeModal === 'groom' ? groomAccounts : brideAccounts).map((acc, idx) => (
                            <div key={idx} className="flex flex-col bg-stone-50/50 border border-stone-100 p-3 rounded-sm hover:border-stone-200 transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-stone-500 font-medium">{acc.bank}</span>
                                        <div className="w-[1px] h-2 bg-stone-300"></div>
                                        <span className="text-xs text-stone-800 font-bold">{acc.name}</span>
                                    </div>
                                    <button 
                                        onClick={() => copy(acc.copyText)} 
                                        className="text-[10px] bg-white border border-stone-200 text-stone-600 px-2 py-1 rounded-sm hover:bg-stone-50 hover:text-stone-900 transition-colors flex items-center gap-1 shadow-sm"
                                    >
                                        <Copy size={10} /> 복사
                                    </button>
                                </div>
                                {/* [수정] 폰트 변경: englishFont -> koreanFont */}
                                <p className={`${koreanFont.className} text-stone-800 text-sm font-bold tracking-wide mt-1`}>
                                    {acc.account}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-stone-50 p-3 text-center border-t border-stone-100">
                        <button onClick={() => setActiveModal(null)} className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2">
                            닫기
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
      
      {/* 스크롤 안내 */}
      <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 z-30 text-stone-500 flex flex-col items-center gap-2"
      >
          <span className={`${englishFont.className} text-[10px] tracking-[0.2em] font-medium`}>SCROLL</span>
      </motion.div>

    </section>
  );
};

export default Section6_Gift;
