//PadiOpenWater.tsx
"use client";

import { EnrollmentSection } from "./EnrollmentSection";
import { StepsSection } from "./StepsSection";
import { ComparisonSection } from "./ComparisonSection";
import { CommunityFAQSection } from "./CommunityFAQSection";
import { WhyChooseDiveCampusSection } from "./WhyChooseDiveCampusSection";
import { GoldStandardSection } from "./GoldStandardSection";
// import { CommunityGallerySection } from "./CommunityGallerySection";
import { LocationSection } from "./LocationSection";
import { PremiumFooter } from "./PremiumFooter";
import { Navbar } from "../Navbar";
import { HeroSection } from "./HeroSection";
export function PadiOpenWater() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EnrollmentSection />
      <StepsSection />
      <ComparisonSection />
      <CommunityFAQSection />
      <WhyChooseDiveCampusSection />
      <GoldStandardSection />
      {/* <CommunityGallerySection /> */}
      <LocationSection />
      <PremiumFooter />
    </>
  );
}