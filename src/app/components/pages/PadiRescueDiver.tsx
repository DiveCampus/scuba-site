// LEVEL 3 · PADI RESCUE DIVER   
"use client";

import { Navbar } from "../Navbar";
import { DiveTrainingShowcase } from "./DiveTrainingShowcase";
import { LocationFooterSection } from "./LocationFooterSection";
import { MasterScubaCTA } from "./MasterScubaCTA";
import { Rescue } from "./Rescue";
import { RescueCapabilities } from "./RescueCapabilities";
import { RescueComparison } from "./RescueComparison";
import { RescueFAQSection } from "./RescueFAQSection";
import { SimulationToReality } from "./SimulationToReality";



export function PadiRescueDiver() {
  return (
    <>
     <Navbar/>
      <Rescue  />
      <RescueCapabilities />
      <RescueComparison />
      <SimulationToReality />
      <MasterScubaCTA />
      <RescueFAQSection />    
      <DiveTrainingShowcase />
      <LocationFooterSection />
    </>
  );
}