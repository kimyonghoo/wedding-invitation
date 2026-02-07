// app/page.tsx

import Section1_Hero from '@/app/components/Section1_Hero';
import Section2_Quote from '@/app/components/Section2_Quote';
import Section3_Calendar from '@/app/components/Section3_Calendar';
import Section4_Gallery from '@/app/components/Section4_Gallery';
import Section5_Map from '@/app/components/Section5_Map';
import Section6_Gift from '@/app/components/Section6_Gift';
import Section7_Closing from '@/app/components/Section7_Closing';

// 1. 대문자로 import 수정
import BackgroundEffect from '@/app/components/BackgroundEffect';

export default function Home() {
  return (
    <main className="snap-container scrollbar-hide relative">
      {/* 2. 대문자로 컴포넌트 사용 */}
      <BackgroundEffect />
      
      {/* BackgroundEffect가 fixed 포지션이라 순서는 상관없지만, 
          논리적으로 배경 -> 컨텐츠 순서가 좋습니다. 
          각 섹션(Section1~6) 내부에 z-index나 relative가 설정되어 있어야 
          배경 위에 정상적으로 뜹니다. (앞서 드린 코드엔 다 적용되어 있습니다)
      */}
      
      <Section1_Hero />
      <Section2_Quote />
      <Section3_Calendar />
      <Section4_Gallery />
      <Section5_Map />
      <Section6_Gift />
      <Section7_Closing />
    </main>
  );
}