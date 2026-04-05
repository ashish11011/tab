import CompaniesLogos from "@/components/CompaniesLogo";
import DomesticTrip from "@/components/DomasticTrip";
import { FAQsAccordion } from "@/components/FAQAccordion";
import HowItWorksSection from "@/components/HowItWork";
import { LeadPopupForm } from "@/components/LeadPopupForm";
import PackageCrousel from "@/components/PackageCrousel";
import ReasonsSection from "@/components/ReasonSection";
import TripStats from "@/components/tripStar";

export default function Home() {


  const instaReels = [
    "/reels/reel1.mp4",
    "/reels/reel2.mp4",
    "/reels/reel3.mp4",
    "/reels/reel4.mp4",
  ]

  return (
    <div>
      <LeadPopupForm />
      <HeroSection />
      <TripStats />
      <DomesticTrip />
      <ReasonsSection />
      <HowItWorksSection />
      <PackageCrousel />
      <InstagramReels instaReels={instaReels} />
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



const InstagramReels = ({ instaReels }: { instaReels: string[] }) => {
  return (
    <div className=" w-full flex md:grid overflow-x-scroll grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-20">
      {
        instaReels.map((reelURL: string) => {
          return <div className=" w-full h-auto min-w-48">
            <video src={reelURL} muted autoPlay loop />
          </div>
        })
      }
    </div>
  )
}