// app/page.tsx
import FixedBackground from '@/app/components/FixedBackground';
import Section1_Main from '@/app/components/Section1_Main';
import Section2_Quote from '@/app/components/Section2_Quote';
import Section3_Calendar from '@/app/components/Section3_Calendar';
import Section_RSVP from '@/app/components/Section_RSVP';
import Section4_Gallery from '@/app/components/Section4_Gallery';
import Section5_Map from '@/app/components/Section5_Map';
import Section6_Gift from '@/app/components/Section6_Gift';
import Section7_Closing from '@/app/components/Section7_Closing';

import IntroOverlay from '@/app/components/IntroOverlay';
import BackgroundMusic from '@/app/components/BackgroundMusic';
import SeasonalEffect from '@/app/components/effect/SeasonalEffect'; // [추가 및 변경]

export default function Home() {
  return (
    <main className="snap-container scrollbar-hide relative">
      <IntroOverlay />   {/* 맨 위에 배치 */}
      
      {/* 환경변수에 따라 봄/여름/가을/겨울 이펙트를 알아서 뿌려줍니다 */}
      <SeasonalEffect /> 
      <BackgroundMusic />
      <FixedBackground />
      <Section1_Main />
      <Section2_Quote />
      <Section3_Calendar />
      <Section_RSVP />
      <Section4_Gallery />
      <Section5_Map />
      <Section6_Gift />
      <Section7_Closing />
    </main>
  );
}