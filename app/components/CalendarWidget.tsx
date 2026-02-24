// app/components/CalendarWidget.tsx
'use client';

import { Gowun_Batang } from 'next/font/google';
import { WEDDING_INFO } from '@/app/config/weddingInfo';

const koreanFont = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function CalendarWidget() {
  const { year, month, day } = WEDDING_INFO.date;

  // 1. 해당 월의 1일이 무슨 요일인지 계산 (0: 일요일, 1: 월요일 ... 6: 토요일)
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  
  // 2. 해당 월이 며칠까지 있는지 계산
  const daysInMonth = new Date(year, month, 0).getDate();

  // 3. 앞쪽 빈칸 배열
  const emptyDays = Array(firstDayOfMonth).fill(null);
  
  // 4. 날짜 배열 (1일부터 daysInMonth까지)
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // 5. 전체 달력 배열 결합
  const calendarDays = [...emptyDays, ...monthDays];

  // (선택) 마지막 줄 빈칸 채우기 (달력 모양을 네모 반듯하게 유지)
  const totalSlots = Math.ceil(calendarDays.length / 7) * 7;
  const trailingEmptyDays = Array(totalSlots - calendarDays.length).fill(null);
  const fullCalendarDays = [...calendarDays, ...trailingEmptyDays];

  return (
    <div className="w-full mb-8 px-2">
      {/* 요일 헤더 */}
      <div className={`${koreanFont.className} grid grid-cols-7 gap-1 text-center text-[10px] text-stone-500 mb-4 font-semibold tracking-widest border-b border-stone-300/50 pb-2`}>
        <div className="text-red-400">SUN</div>
        <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div>
        <div className="text-stone-400">SAT</div>
      </div>
      
      {/* 날짜 그리드 */}
      <div className={`${koreanFont.className} grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs text-stone-700 font-medium`}>
        {fullCalendarDays.map((currentDay, index) => {
          // 빈 칸 처리
          if (currentDay === null) {
            return <div key={`empty-${index}`} className="h-9 w-full"></div>;
          }

          // 요일 판별 (0: 일, 6: 토)
          const isSunday = index % 7 === 0;
          const isSaturday = index % 7 === 6;
          const isDday = currentDay === day; // D-Day 확인

          return (
            <div 
              key={`day-${currentDay}`} 
              className={`flex items-center justify-center h-9 w-full ${
                isSunday ? 'text-red-400' : 
                isSaturday ? 'text-stone-400' : ''
              }`}
            >
              {isDday ? (
                // D-Day 하이라이트
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="absolute w-7 h-7 bg-amber-200/50 rounded-full animate-ping"></div>
                  <span className="relative z-10 text-white font-bold bg-amber-700 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md pt-[1px]">
                    {currentDay}
                  </span>
                </div>
              ) : (
                // 일반 날짜
                currentDay
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}