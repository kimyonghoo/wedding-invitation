'use client';
import type { Metadata } from "next"; // 이 줄이 없으면 추가
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Lock, RefreshCw, LogOut, Loader2, Users, Utensils, X, List, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: "RSVP Mobile Admin",
  description: "모바일 관리자 페이지",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "RSVP Mobile Admin",
    description: "모바일 관리자 페이지",
    images: [], // 이미지 제거
  },
};

interface RsvpData {
  id: number;
  created_at: string;
  name: string;
  side: string;
  count: number;
  meal: string;
  privacy_consent: boolean;
}

export default function RsvpMobilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvpList, setRsvpList] = useState<RsvpData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 모달 제어 및 필터 상태
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'groom' | 'bride'>('all');

  const [stats, setStats] = useState({
    totalGuests: 0,
    groomCount: 0,
    brideCount: 0,
    mealYes: 0,
    mealUnknown: 0,
    mealNo: 0,
  });

  const fetchData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('rsvp')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('데이터 로드 실패');
    } else {
      const list = data as RsvpData[];
      setRsvpList(list);
      calculateStats(list);
    }
    setIsLoading(false);
  };

  const calculateStats = (data: RsvpData[]) => {
    const newStats = {
      totalGuests: 0,
      groomCount: 0,
      brideCount: 0,
      mealYes: 0,
      mealUnknown: 0,
      mealNo: 0,
    };

    data.forEach((item) => {
      const count = item.count || 1;
      newStats.totalGuests += count;

      if (item.side === 'groom' || item.side === '신랑측') newStats.groomCount += count;
      else newStats.brideCount += count;

      if (item.meal === 'yes') newStats.mealYes += count;
      else if (item.meal === 'no') newStats.mealNo += count;
      else newStats.mealUnknown += count;
    });

    setStats(newStats);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'wedding0418%$') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('비밀번호 불일치');
    }
  };

  // 모달 열기 함수 (필터 지정)
  const openModal = (type: 'all' | 'groom' | 'bride') => {
    setFilterType(type);
    setShowModal(true);
  };

  // 필터링된 리스트 가져오기
  const getFilteredList = () => {
    if (filterType === 'all') return rsvpList;
    return rsvpList.filter(item => {
      const isGroom = item.side === 'groom' || item.side === '신랑측';
      return filterType === 'groom' ? isGroom : !isGroom;
    });
  };

  // 모달 제목 가져오기
  const getModalTitle = () => {
    if (filterType === 'groom') return '신랑측 명단';
    if (filterType === 'bride') return '신부측 명단';
    return '전체 참석자 명단';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-neutral-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xs">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-neutral-200">
              <Lock className="w-6 h-6 text-neutral-900" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center text-neutral-900 mb-2">RSVP Mobile</h1>
          <p className="text-center text-neutral-400 text-sm mb-8">관리자 비밀번호를 입력하세요</p>
          
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              inputMode="text" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white border border-neutral-200 rounded-xl text-center text-lg tracking-widest focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 shadow-sm transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold text-base active:scale-[0.98] transition-transform shadow-md"
            >
              대시보드 접속
            </button>
          </form>
        </div>
      </div>
    );
  }

  const displayList = getFilteredList();

  return (
    <div className="min-h-[100dvh] bg-neutral-50 text-neutral-800 pb-safe">
      <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 px-4 py-3 sticky top-0 z-40 flex justify-between items-center h-14">
        <h1 className="text-lg font-bold tracking-tight text-neutral-900">웨딩 대시보드</h1>
        <div className="flex gap-2">
          <button onClick={fetchData} className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full active:bg-neutral-200 transition-colors">
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full active:bg-neutral-200 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="p-4 space-y-4 pb-24">
        
        {/* 요약 통계 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between h-28">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Users size={14} />
              <span className="text-[10px] font-bold uppercase">Total Guests</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-neutral-900">{stats.totalGuests}</span>
                <span className="text-xs font-medium text-neutral-500">명</span>
              </div>
              <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">Confirmed</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between h-28">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Utensils size={14} />
              <span className="text-[10px] font-bold uppercase">Meal Plan</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-emerald-600">{stats.mealYes}</span>
                <span className="text-xs font-medium text-neutral-500">명</span>
              </div>
              <span className="text-[10px] text-neutral-400">식사 예정 인원</span>
            </div>
          </div>
        </div>

        {/* 신랑/신부 비율 (클릭 가능하도록 수정) */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold uppercase text-neutral-400">Side Breakdown</span>
                <span className="text-xs font-mono text-neutral-500 font-bold">{stats.groomCount} vs {stats.brideCount}</span>
             </div>
             <div className="w-full bg-neutral-100 h-3 rounded-full overflow-hidden flex mb-3">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(stats.groomCount / (stats.totalGuests || 1)) * 100}%` }}></div>
                <div className="bg-rose-400 h-full transition-all duration-500" style={{ width: `${(stats.brideCount / (stats.totalGuests || 1)) * 100}%` }}></div>
             </div>
             
             {/* [수정] 클릭 가능한 영역 생성 */}
             <div className="flex justify-between text-xs font-semibold">
                <button 
                    onClick={() => openModal('groom')}
                    className="flex items-center gap-1.5 text-blue-600 hover:bg-blue-50 px-2 py-1 -ml-2 rounded-lg transition-colors"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> 
                    신랑측 {stats.groomCount}명
                    <ChevronRight size={12} className="text-blue-400" />
                </button>
                <button 
                    onClick={() => openModal('bride')}
                    className="flex items-center gap-1.5 text-rose-500 hover:bg-rose-50 px-2 py-1 -mr-2 rounded-lg transition-colors"
                >
                    <div className="w-2 h-2 rounded-full bg-rose-400"></div> 
                    신부측 {stats.brideCount}명
                    <ChevronRight size={12} className="text-rose-300" />
                </button>
             </div>
        </div>

        {/* 식사 상세 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold uppercase text-neutral-400">Meal Details</span>
             </div>
             <div className="w-full bg-neutral-100 h-3 rounded-full overflow-hidden flex mb-3">
                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(stats.mealYes / (stats.totalGuests || 1)) * 100}%` }}></div>
                <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${(stats.mealUnknown / (stats.totalGuests || 1)) * 100}%` }}></div>
                <div className="bg-neutral-300 h-full transition-all duration-500" style={{ width: `${(stats.mealNo / (stats.totalGuests || 1)) * 100}%` }}></div>
             </div>
             <div className="grid grid-cols-3 gap-1 text-center text-xs">
                <div className="bg-emerald-50 p-1.5 rounded text-emerald-700 font-bold">예정 {stats.mealYes}</div>
                <div className="bg-amber-50 p-1.5 rounded text-amber-700 font-bold">미정 {stats.mealUnknown}</div>
                <div className="bg-neutral-100 p-1.5 rounded text-neutral-600 font-bold">안함 {stats.mealNo}</div>
             </div>
        </div>

        {/* 전체보기 버튼 */}
        <div className="pt-2">
            <button 
                onClick={() => openModal('all')}
                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold text-base shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                <List size={18} /> 전체 명단 보기 ({rsvpList.length})
            </button>
        </div>

      </main>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-50 flex flex-col animate-in slide-in-from-bottom-10 duration-200">
            {/* 모달 헤더 (동적 제목) */}
            <div className="bg-white px-4 py-3 border-b border-neutral-200 flex justify-between items-center shadow-sm shrink-0 h-14">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-neutral-900">{getModalTitle()}</span>
                    <span className="text-xs font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                        {displayList.length}
                    </span>
                </div>
                <button 
                    onClick={() => setShowModal(false)}
                    className="p-2 -mr-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            {/* 리스트 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-100">
                {displayList.length === 0 ? (
                    <div className="text-center py-10 text-neutral-400">해당하는 명단이 없습니다.</div>
                ) : (
                    displayList.map((item) => {
                        const sideText = (item.side === 'groom' || item.side === '신랑측') ? '신랑측' : '신부측';
                        const sideColor = sideText === '신랑측' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700';
                        
                        let mealText = '안함';
                        let mealStyle = 'text-neutral-400 bg-neutral-100';
                        
                        if (item.meal === 'yes') { 
                            mealText = '식사함'; 
                            mealStyle = 'text-emerald-700 bg-emerald-50 border border-emerald-100'; 
                        } else if (item.meal === '미정' || item.meal === 'unknown') { 
                            mealText = '미정'; 
                            mealStyle = 'text-amber-700 bg-amber-50 border border-amber-100'; 
                        }

                        return (
                            <div key={item.id} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-bold text-neutral-900">{item.name}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${sideColor}`}>
                                            {sideText}
                                        </span>
                                    </div>
                                    <div className={`text-xs px-2 py-1 rounded font-bold ${mealStyle}`}>
                                        {mealText}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-end border-t border-neutral-50 pt-2 mt-2">
                                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                                        <Clock size={10} />
                                        {new Date(item.created_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-neutral-500">인원</span>
                                        <span className="text-sm font-bold text-neutral-800 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                                            {item.count}명
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                {/* 하단 여백 */}
                <div className="h-8"></div>
            </div>
        </div>
      )}

    </div>
  );
}