// Diverty.tsx
"use client";

import { Navbar } from "../components/Navbar";
import { AdventureGallery } from "../components/pages/AdventureGallery";
import { ChooseDiveSite } from "../components/pages/ChooseDiveSite";
import { ContactLocations } from "../components/pages/ContactLocations";
import { DiveConfidenceFAQ } from "../components/pages/DiveConfidenceFAQ";
import Divetry from "../components/pages/Divetry";
import { ExpertHands } from "../components/pages/ExpertHands";
import { FirstDiveStepsSection } from "../components/pages/FirstDiveStepsSection";
import { LegacyOfTrust } from "../components/pages/LegacyOfTrust";
import { TryDiveFooter } from "../components/pages/TryDiveFooter";
import { WeekendRoutine } from "../components/pages/WeekendRoutine";






export function TryDive() {
  return (
    <>
    <Navbar />
    <Divetry/>
    <FirstDiveStepsSection />
    <WeekendRoutine />
    <DiveConfidenceFAQ />
    <ChooseDiveSite />
    <ExpertHands />
    <LegacyOfTrust />
    <ContactLocations />
    <AdventureGallery />
    <TryDiveFooter />
    </>
  );
}    