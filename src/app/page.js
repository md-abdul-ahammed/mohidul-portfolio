import AboutMe from "@/components/AboutMe/AboutMe";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import LetsCreateYourIdea from "@/components/LetsCreateYourIdea/LetsCreateYourIdea";
import LetsTalk from "@/components/LetsTalk/LetsTalk";
import MyWorkProcess from "@/components/MyWorkProcess/MyWorkProcess";
import Portfolio from "@/components/Portfolio/Portfolio";
import ProjectShowCase from "@/components/ProjectShowCase/ProjectShowCase";
import ProjectShowCase2 from "@/components/ProjectShowCase/ProjectShowCase2";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import Navbar from "@/components/Shared/Navbar";
import TrustedBy from "@/components/TrustedBy/TrustedBy";
import TrustedbyIndustryLeaders from "@/components/TrustedbyIndustryLeaders/TrustedbyIndustryLeaders";
import WhatIDo from "@/components/WhatIDo/WhatIDo";
import Image from "next/image";
import { API_ENDPOINTS } from "@/config/api";

export async function generateMetadata() {
  let ogImageUrl = null;
  try {
    const res = await fetch(API_ENDPOINTS.HERO, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.hero_section?.hero_image) {
        ogImageUrl = data.hero_section.hero_image;
      }
    }
  } catch (_) {}

  return {
    openGraph: {
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: "Mohidul Islam – UI/UX Designer Portfolio",
            },
          ]
        : undefined,
    },
    twitter: {
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default function HomePage() {
  return (
    <div className="">
      <div className="">
        <Hero></Hero>
      </div>
      <div>
        <ProjectShowCase></ProjectShowCase>

        <ProjectShowCase2></ProjectShowCase2>
      </div>

      <TrustedBy></TrustedBy>

      <AboutMe></AboutMe>
      <WhatIDo></WhatIDo>
      <Portfolio></Portfolio>
      <MyWorkProcess></MyWorkProcess>
      <LetsCreateYourIdea></LetsCreateYourIdea>
      <TrustedbyIndustryLeaders></TrustedbyIndustryLeaders>
      <div id="contact">
        <LetsTalk></LetsTalk>
      </div>
    </div>
  );
}
