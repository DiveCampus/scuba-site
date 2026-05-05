// AdvancedOpenDiver.tsx
"use client";

import { AdvancedProtocolSection } from "./AdvancedProtocolSection";
import { AdvancedTrainingGoldSection } from "./AdvancedTrainingGoldSection";
import { AOWAdvantageSection } from "./AOWAdvantageSection";
import { ChooseEnvironmentSection } from "./ChooseEnvironmentSection";
import { MasteryGapSection } from "./MasteryGapSection";
import { GlobalPassportSection } from "./GlobalPassportSection";
import { PremiumSec } from "./PremiumSec";
import { PadiOpenDiver } from "./PadiOpenDiver";



export function AdvancedPadiOpenDiver() {
  return (
    <>
    <PadiOpenDiver    />
    <AdvancedProtocolSection />
    <AOWAdvantageSection />
    <GlobalPassportSection />
     <ChooseEnvironmentSection />
     <AdvancedTrainingGoldSection />
     <MasteryGapSection />
     {/* <Community />  */}
     <PremiumSec />
    </>
  );
}