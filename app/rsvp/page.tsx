'use client';

import type { Metadata } from "next"; // 이 줄이 없으면 추가
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Lock, RefreshCw, LogOut, Loader2, Users, Utensils, X, List, TrendingUp, PieChart, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "RSVP Admin",
  description: "관리자 전용 페이지입니다.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "RSVP Admin",
    description: "관리자 전용 페이지입니다.",
    images: [], // 이미지를 빈 배열로 설정하여 상속 차단
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

export default function RsvpAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvpList, setRsvpList] = useState<RsvpData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 모달 및 필터 상태
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
      alert('데이터를 불러오지 못했습니다.');
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
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  // 모달 열기 함수
  const openModal = (type: 'all' | 'groom' | 'bride') => {
    setFilterType(type);
    setShowModal(true);
  };

  // 필터링 로직
  const getFilteredList = () => {
    if (filterType === 'all') return rsvpList;
    return rsvpList.filter(item => {
      const isGroom = item.side === 'groom' || item.side === '신랑측';
      return filterType === 'groom' ? isGroom : !isGroom;
    });
  };

  // 모달 제목
  const getModalTitle = () => {
    if (filterType === 'groom') return '신랑측 하객 명단';
    if (filterType === 'bride') return '신부측 하객 명단';
    return '전체 참석자 명단';
  };

  // 1. 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-sm shadow-sm max-w-sm w-full border border-neutral-200">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-neutral-900 rounded-full mb-4">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-neutral-800 tracking-tight">RSVP 관리자</h1>
            <p className="text-center text-neutral-400 text-sm mb-4">관리자 비밀번호를 입력하세요</p>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-sm mb-3 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-neutral-900 text-white py-3 rounded-sm font-semibold text-sm hover:bg-neutral-800 transition-colors"
          >
            대시보드 접속
          </button>
        </form>
      </div>
    );
  }

  const filteredData = getFilteredList();

  // 2. 관리자 대시보드
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans pb-20">
      
      {/* 상단 네비게이션 */}
      <nav className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 bg-neutral-900"></div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">웨딩 대시보드</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-sm hover:bg-neutral-200 transition-colors">
              <RefreshCw size={14} /> 새로고침
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-neutral-900 text-white rounded-sm hover:bg-neutral-700 transition-colors">
              <LogOut size={14} /> 나가기
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        
        {/* 섹션 1: 핵심 지표 (클릭 가능) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* 총 참석 인원 (클릭 시 전체 보기) */}
            <div 
                onClick={() => openModal('all')}
                className="bg-white p-6 rounded-sm border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-neutral-100 rounded-md group-hover:bg-neutral-200 transition-colors"><Users size={20} className="text-neutral-600"/></div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">집계중</span>
                </div>
                <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-neutral-700">총 참석 인원</h3>
                <div className="text-4xl font-extrabold text-neutral-900">{stats.totalGuests}</div>
                <ChevronRight className="absolute bottom-6 right-6 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
            </div>

            {/* 식사 예정 인원 (클릭 시 전체 보기 - 필터 없음) */}
            <div className="bg-white p-6 rounded-sm border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-50 rounded-md"><Utensils size={20} className="text-emerald-600"/></div>
                    <span className="text-xs font-bold text-neutral-400">
                        {stats.totalGuests > 0 ? Math.round((stats.mealYes / stats.totalGuests) * 100) : 0}% 식사 예정
                    </span>
                </div>
                <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">식사 현황</h3>
                <div className="text-4xl font-extrabold text-emerald-600">{stats.mealYes}</div>
            </div>

            {/* 신랑측 (클릭 시 신랑측 보기) */}
            <div 
                onClick={() => openModal('groom')}
                className="bg-white p-6 rounded-sm border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-l-4 border-l-blue-500 cursor-pointer hover:shadow-lg transition-all group"
            >
                <h3 className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                    신랑측 <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-neutral-900">{stats.groomCount}</span>
                    <span className="text-xs text-neutral-400">명</span>
                </div>
                <div className="mt-3 text-xs text-neutral-400">
                    비율: {stats.totalGuests > 0 ? Math.round((stats.groomCount / stats.totalGuests) * 100) : 0}%
                </div>
            </div>

            {/* 신부측 (클릭 시 신부측 보기) */}
            <div 
                onClick={() => openModal('bride')}
                className="bg-white p-6 rounded-sm border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-l-4 border-l-rose-500 cursor-pointer hover:shadow-lg transition-all group"
            >
                <h3 className="text-rose-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                    신부측 <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                </h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-neutral-900">{stats.brideCount}</span>
                    <span className="text-xs text-neutral-400">명</span>
                </div>
                <div className="mt-3 text-xs text-neutral-400">
                    비율: {stats.totalGuests > 0 ? Math.round((stats.brideCount / stats.totalGuests) * 100) : 0}%
                </div>
            </div>
        </div>

        {/* 섹션 2: 상세 분석 및 액션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 왼쪽: 식사 상세 분석 */}
            <div className="md:col-span-2 bg-white p-6 rounded-sm border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wide mb-6 flex items-center gap-2">
                    <TrendingUp size={16} /> 식사 상세 분석
                </h3>
                
                {/* 비주얼 바 */}
                <div className="flex h-4 rounded-full overflow-hidden mb-4">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(stats.mealYes / (stats.totalGuests || 1)) * 100}%` }}></div>
                    <div className="bg-amber-400 h-full" style={{ width: `${(stats.mealUnknown / (stats.totalGuests || 1)) * 100}%` }}></div>
                    <div className="bg-neutral-200 h-full" style={{ width: `${(stats.mealNo / (stats.totalGuests || 1)) * 100}%` }}></div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-emerald-50 rounded-sm">
                        <div className="text-emerald-800 font-bold text-lg">{stats.mealYes}</div>
                        <div className="text-emerald-600 text-xs font-medium">식사 예정</div>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-sm">
                        <div className="text-amber-800 font-bold text-lg">{stats.mealUnknown}</div>
                        <div className="text-amber-600 text-xs font-medium">미정</div>
                    </div>
                    <div className="p-4 bg-neutral-100 rounded-sm">
                        <div className="text-neutral-800 font-bold text-lg">{stats.mealNo}</div>
                        <div className="text-neutral-500 text-xs font-medium">안함</div>
                    </div>
                </div>
            </div>

            {/* 오른쪽: 액션 버튼 */}
            <div className="bg-white p-6 rounded-sm border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wide mb-2">관리 및 상세</h3>
                    <p className="text-sm text-neutral-500 mb-6">전체 참석자 명단을 확인하고 관리합니다.</p>
                </div>
                <div>
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
                        <span>총 응답 수</span>
                        <span className="font-bold">{rsvpList.length}</span>
                    </div>
                    <button 
                        onClick={() => openModal('all')}
                        className="w-full bg-neutral-900 text-white py-4 rounded-sm font-bold text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <List size={16} /> 참석자 전체보기
                    </button>
                </div>
            </div>
        </div>

      </main>

      {/* 3. 참석자 전체보기 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            {/* 배경 */}
            <div 
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" 
                onClick={() => setShowModal(false)}
            ></div>

            {/* 모달 컨텐츠 */}
            <div className="relative bg-white w-full max-w-5xl h-full max-h-[85vh] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* 모달 헤더 */}
                <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50 flex-shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                            {getModalTitle()}
                            <span className="text-xs bg-neutral-800 text-white px-2 py-0.5 rounded-full">{filteredData.length}명</span>
                        </h2>
                        <p className="text-xs text-neutral-500">등록된 하객 리스트입니다.</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
                    >
                        <X size={20} className="text-neutral-500" />
                    </button>
                </div>

                {/* 모달 바디 (스크롤) */}
                <div className="flex-1 overflow-auto bg-white p-0">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-neutral-500 uppercase bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-4 font-semibold bg-white">등록일시</th>
                                <th className="px-6 py-4 font-semibold bg-white">구분</th>
                                <th className="px-6 py-4 font-semibold bg-white">이름</th>
                                <th className="px-6 py-4 font-semibold text-center bg-white">인원</th>
                                <th className="px-6 py-4 font-semibold bg-white">식사여부</th>
                                <th className="px-6 py-4 font-semibold text-right bg-white">동의</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-neutral-400">데이터가 없습니다.</td>
                                </tr>
                            ) : (
                                filteredData.map((item) => {
                                    const sideText = (item.side === 'groom' || item.side === '신랑측') ? '신랑측' : '신부측';
                                    const sideStyle = sideText === '신랑측' 
                                        ? 'bg-blue-50 text-blue-700 border-blue-100' 
                                        : 'bg-rose-50 text-rose-700 border-rose-100';
                                    
                                    let mealColor = 'text-neutral-400';
                                    let mealText = '안함';
                                    if (item.meal === 'yes') { mealText = '식사함'; mealColor = 'text-emerald-600 font-bold'; }
                                    else if (item.meal === '미정' || item.meal === 'unknown') { mealText = '미정'; mealColor = 'text-amber-600 font-medium'; }

                                    return (
                                        <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                                            <td className="px-6 py-4 text-neutral-500 font-mono text-xs">
                                                {new Date(item.created_at).toLocaleString('ko-KR')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${sideStyle}`}>
                                                    {sideText}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-neutral-800">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-neutral-100 px-2 py-1 rounded text-neutral-700 font-medium">{item.count}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs ${mealColor}`}>{mealText}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {item.privacy_consent ? <span className="text-green-600 text-xs">✔</span> : <span className="text-red-400 text-xs">X</span>}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}