"use client";

import { useState, useEffect } from "react";
import CompaniesLogos from "@/components/CompaniesLogo";
import DomesticTrip from "@/components/DomasticTrip";
import { FAQsAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import HowItWorksSection from "@/components/HowItWork";
import { LeadPopupForm } from "@/components/LeadPopupForm";
import PackageCard from "@/components/PackageCard";
import PackageCrousel from "@/components/PackageCrousel";
import ReasonsSection from "@/components/ReasonSection";
import TripStats from "@/components/tripStar";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Phone, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000); // Open after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <LeadPopupForm open={isPopupOpen} setOpen={setIsPopupOpen} />
      <HeroSection />
      <TripStats />
      <DomesticTrip />
      <ReasonsSection />
      <HowItWorksSection />
      <PackageCrousel />
      <CompaniesLogos />
      <FAQsAccordion />
      <div className=" px-4">
        <img className=" w-full max-w-6xl rounded-2xl my-6 md:my-20 mx-auto" src="./vector-blue-mountain.jpg" alt="" />
      </div>
    </div>
  );
}



const HeroSection = () => {
  return (
    <div>
      <video src="./WhatsApp Video 2026-02-28 at 2.35.53 PM.mp4" className=" w-full h-auto" autoPlay loop muted />
    </div>
  );
}

