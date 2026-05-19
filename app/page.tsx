import { BioSection } from "@/app/components/landing/BioSection";
import { Deliverables } from "@/app/components/landing/Deliverables";
import { FaqAccordion } from "@/app/components/landing/FaqAccordion";
import { FinalCTA } from "@/app/components/landing/FinalCTA";
import { HeroSection } from "@/app/components/landing/HeroSection";
import { PainQualifier } from "@/app/components/landing/PainQualifier";
import { PriceBlock } from "@/app/components/landing/PriceBlock";
import { Testimonials } from "@/app/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-zinc-950 font-sans">
      <HeroSection />
      <PainQualifier />
      <Testimonials />
      <Deliverables />
      <BioSection />
      <PriceBlock />
      <FaqAccordion />
      <FinalCTA />
    </main>
  );
}
