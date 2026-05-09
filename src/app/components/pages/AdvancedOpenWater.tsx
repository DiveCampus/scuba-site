// AdvancedOpenWater.tsx //LEVEL 2 · ADVANCED OPEN WATER...

"use client";

import { AdvancedTrainingGoldEliteSection } from "./AdvancedTrainingGoldEliteSection";
import { DiveEnvironmentSection } from "./DiveEnvironmentSection";
import { EliteBenefitsSection } from "./EliteBenefitsSection";
import { EliteFooter } from "./EliteFooter";
// import { Community } from "./Community";
import { HybridProtocolSection } from "./HybridProtocolSection";
import { OceanEliteSection } from "./OceanEliteSection";
import { OpenDiver } from "./OpenDiver";
import { TrainingComparisonSection } from "./TrainingComparisonSection";


export function AdvancedOpenWater() {
  return (
    <>
    <OpenDiver  />
    <HybridProtocolSection />
    <EliteBenefitsSection />
    <OceanEliteSection />
    <DiveEnvironmentSection /> 
     <AdvancedTrainingGoldEliteSection />
     <TrainingComparisonSection />
     {/* <Community />  */}
     <EliteFooter />
    </>
  );
}