// Diverty.tsx
"use client";

import { Navbar } from "../components/Navbar";
import Divetry from "../components/pages/Divetry";
import { FirstDiveStepsSection } from "../components/pages/FirstDiveStepsSection";






export function TryDive() {
  return (
    <>
    <Navbar />
    <Divetry/>
    <FirstDiveStepsSection />      
    </>
  );
}    