import { Hero } from "@/components/Hero";
import { StatsAndServices } from "@/components/StatsAndServices";
import { HowItWorks } from "@/components/HowItWorks";
import { Calculator } from "@/components/Calculator";
import { SuccessStories } from "@/components/SuccessStories";
import { ContactForm } from "@/components/ContactForm";

export default function Index() {
  return (
    <>
      <Hero />
      <StatsAndServices />
      <HowItWorks />
      <Calculator />
      <SuccessStories />
      <ContactForm />
    </>
  );
}
