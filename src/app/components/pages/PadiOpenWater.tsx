//PadiOpenWater.tsx
"use client";

import { HeroSection } from "./HeroSection";
import { EnrollmentSection } from "./EnrollmentSection";
import { StepsSection } from "./StepsSection";
import { ComparisonSection } from "./ComparisonSection";
import { CommunityFAQSection } from "./CommunityFAQSection";
import { WhyChooseNemoSection } from "./WhyChooseNemoSection";
import { GoldStandardSection } from "./GoldStandardSection";
// import { CommunityGallerySection } from "./CommunityGallerySection";
import { LocationSection } from "./LocationSection";
import { PremiumFooter } from "./PremiumFooter";
import { Navbar } from "../Navbar";

export function PadiOpenWater() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EnrollmentSection />
      <StepsSection />
      <ComparisonSection />
      <CommunityFAQSection />
      <WhyChooseNemoSection />
      <GoldStandardSection />
      {/* <CommunityGallerySection /> */}
      <LocationSection />
      <PremiumFooter />
    </>
  );
}