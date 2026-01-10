"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedButton from "../AnimatedButtons";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/config/api";

const LetsCreateYourIdea = () => {
    const router = useRouter();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [ctaData, setCtaData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fix encoding issues (e.g., Letâ€™s -> Let's)
  const fixEncoding = (text) => {
    if (!text) return text;
    return text
      .replace(/â€™/g, "'")  // Fix apostrophe encoding issue
      .replace(/â€œ/g, '"')  // Fix left double quote
      .replace(/â€/g, '"')   // Fix right double quote
      .replace(/â€"/g, '—')  // Fix em dash
      .replace(/â€"/g, '–'); // Fix en dash
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: "easeOut",
      },
    }),
  };

  // Fetch data from API
  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.CTA);
        const data = await response.json();
        
        if (data.success && data.cta_section) {
          setCtaData(data.cta_section);
        }
      } catch (error) {
        console.error('Error fetching CTA data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCtaData();
  }, []);

  // Fallback data in case API fails or during loading
  const fallbackTitleWords = ["Let's", "Create,", "Your", "Idea!"];
  const fallbackSubtitle = "Ready to share your unique narrative with the world? and let's bring your brand story to life.";

  // Use API data or fallback, and fix encoding issues
  const titleText = ctaData?.title ? fixEncoding(ctaData.title) : null;
  const titleWords = titleText 
    ? titleText.split(/(?=[A-Z])/).filter(word => word.trim()) 
    : fallbackTitleWords;
  
  const subtitleText = ctaData?.subtitle ? fixEncoding(ctaData.subtitle) : fallbackSubtitle;

  if (loading) {
    return (
      <div ref={ref} className="md:mx-2">
        <div className="py-20 md:py-20 lg:py-26 xl:py-32 px-4 md:px-0 md:max-w-[1444px] mx-auto bg-[#EEEEEE] flex flex-col justify-center items-center border-b lg:border-b-0 border-x border-[#D3D8DF] relative overflow-hidden">
          {/* Loading state - you can add a loader here if needed */}
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="md:mx-2">
      <div className="py-20 md:py-20 lg:py-26 xl:py-32 px-4 md:px-0 md:max-w-[1444px] mx-auto bg-[#EEEEEE] flex flex-col justify-center items-center border-b lg:border-b-0 border-x border-[#D3D8DF] relative overflow-hidden">
        <div className="w-full md:w-1/2">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-[#1D1C1F] font-medium mb-4 md:mb-5 lg:mb-5 xl:mb-6 text-center"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            {titleWords.map((word, index) => (
              <React.Fragment key={index}>
                <span
                  className="inline-block mr-2"
                  style={{ display: "inline-block", marginRight: "0.5rem" }}
                >
                  {word}
                </span>
                {(word.toLowerCase().includes("create") || index === 1) && <br />}
              </React.Fragment>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base lg:text-base xl:text-lg text-[#66656A] leading-relaxed text-center md:px-0 px-4 mb-6"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
          >
            {subtitleText.split("Get in touch").map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index === 0 && <br className="hidden md:block" />}
              </React.Fragment>
            ))}
          </motion.p>

          {/* Button */}
          <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0.5}>
            <AnimatedButton
              onClick={() => router.push("/book-a-call")}
              icon={
                <Image
                  src={ctaData?.image || "/images/Ideas/01.png"}
                  alt="phone"
                  width={34}
                  height={34}
                  className="inline mr-2"
                />
              }
              textColor="white"
              label={`Book a call with Mohidul`}
              className="py-3 px-4 md:px-4 lg:px-4 xl:px-5 bg-[#34C779] font-medium w-fit mx-auto md:text-[15px] lg:text-[16px] xl:text-[17px] cursor-pointer flex items-center relative"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LetsCreateYourIdea;