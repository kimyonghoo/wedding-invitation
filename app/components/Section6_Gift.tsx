'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/app/lib/supabaseClient'; 
import { Copy, MessageCircle, Loader2, Send } from 'lucide-react';
import Image from 'next/image';
import { Gowun_Batang, Playfair_Display } from 'next/font/google';
import { motion } from 'framer-motion';

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

type GuestMessage = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

const Section6_Gift = () => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
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
    // [레이아웃 통일] koreanFont 적용
    <section className={`snap-section relative w-full min-h-[100dvh] flex items-center justify-center p-4 overflow-hidden ${koreanFont.className}`}>

      {/* 2. 메인 콘텐츠 카드 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[320px] max-h-[85vh] bg-white/70 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 rounded-sm p-5 flex flex-col"
      >
        
        {/* 헤더 & 계좌 정보 (고정 영역) */}
        <div className="shrink-0">
            <div className="text-center mb-5">
                {/* 영문 폰트 적용 */}
                <p className={`${englishFont.className} text-amber-700/80 text-[10px] font-bold tracking-[0.3em] mb-2 uppercase`}>
                    Account & Message
                </p>
                <h2 className="text-xl font-bold text-stone-800 tracking-widest">마음 전하는 곳</h2>
            </div>

            {/* 계좌번호 탭 */}
            <div className="mb-5">
                <div className="flex border-b border-stone-300/50 mb-3">
                    <button 
                        onClick={() => setActiveTab('groom')} 
                        className={`flex-1 pb-2 text-xs transition-all border-b-2 ${
                            activeTab === 'groom' 
                            ? 'text-stone-900 font-bold border-stone-900' 
                            : 'text-stone-400 font-light border-transparent hover:text-stone-600'
                        }`}
                    >
                        신랑측 계좌
                    </button>
                    <button 
                        onClick={() => setActiveTab('bride')} 
                        className={`flex-1 pb-2 text-xs transition-all border-b-2 ${
                            activeTab === 'bride' 
                            ? 'text-amber-700 font-bold border-amber-700' 
                            : 'text-stone-400 font-light border-transparent hover:text-stone-600'
                        }`}
                    >
                        신부측 계좌
                    </button>
                </div>

                <div className="bg-white/50 p-3 rounded-sm border border-white/50 shadow-sm min-h-[60px] flex items-center">
                    {activeTab === 'groom' ? (
                        <div className="w-full flex justify-between items-center animate-in fade-in duration-300">
                            <div>
                                <span className="text-xs text-stone-500 block mb-0.5">국민은행 (박형묵)</span>
                                {/* 숫자 폰트: Playfair Display */}
                                <span className={`${koreanFont.className} text-sm text-stone-800 font-bold tracking-tight`}>123-456-7890</span>
                            </div>
                            <button onClick={() => copy('1234567890')} className="text-[10px] bg-stone-800 text-white px-2 py-1.5 rounded-sm hover:bg-stone-700 transition-colors flex items-center gap-1 shadow-sm shrink-0 ml-2"><Copy size={10} /> 복사</button>
                        </div>
                    ) : (
                        <div className="w-full flex justify-between items-center animate-in fade-in duration-300">
                            <div>
                                <span className="text-xs text-stone-500 block mb-0.5">우리은행 (문원영)</span>
                                <span className={`${koreanFont.className} text-sm text-stone-800 font-bold tracking-tight`}>1002-123-4444</span>
                            </div>
                            <button onClick={() => copy('10021234444')} className="text-[10px] bg-amber-700 text-white px-2 py-1.5 rounded-sm hover:bg-amber-600 transition-colors flex items-center gap-1 shadow-sm shrink-0 ml-2"><Copy size={10} /> 복사</button>
                        </div>
                    )}
                </div>
            </div>
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
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-2 pr-1">
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
                                {/* 날짜: Playfair Display */}
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

      {/* 4. 스크롤 안내 (폰트 적용) */}
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