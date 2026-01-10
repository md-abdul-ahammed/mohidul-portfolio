"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_ENDPOINTS } from "@/config/api";

const TrustedBy = () => {
  const [brandLogos, setBrandLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BRAND_LOGO);
        const data = await response.json();

        if (data.success && data.brand_logos) {
          // Extract logo URLs from brand_logos array
          const logos = data.brand_logos.map(item => item.logo);
          setBrandLogos(logos);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create logo arrays from API data
  const desktopLogosRow1 = brandLogos;
  // const desktopLogosRow2 = brandLogos; // Using same logos for both rows as in original
  const mobileLogos = brandLogos; // Duplicate for mobile as in original

  // State to trigger animations
  const [currentLogos, setCurrentLogos] = useState({
    desktop1: desktopLogosRow1,
    // desktop2: desktopLogosRow2,
    mobile: mobileLogos,
  });

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Set up interval to shuffle logos
  useEffect(() => {
    if (brandLogos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLogos({
        desktop1: shuffleArray(desktopLogosRow1),
        // desktop2: shuffleArray(desktopLogosRow2),
        mobile: shuffleArray(mobileLogos),
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [brandLogos]);

  // Animation variants for Framer Motion
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const highlightVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  // Show loading or empty state
  if (loading) {
    return (
      <div className="md:mx-2">
        <div className="max-w-[1444px] mx-auto border-t border-b border-[#D3D8DF] md:border-x">
          <div className="text-center pt-[40px] mt-2 md:mt-0 pb-6 md:pt-12 md:pb-4">
            <h6 className="text-sm text-[#707070]">Loading...</h6>
          </div>
        </div>
      </div>
    );
  }

  if (brandLogos.length === 0) {
    return (
      <div className="md:mx-2">
        <div className="max-w-[1444px] mx-auto border-t border-b border-[#D3D8DF] md:border-x">
          <div className="text-center pt-[40px] mt-2 md:mt-0 pb-6 md:pt-12 md:pb-4">
            <h6 className="text-sm text-[#707070]">No brand logos available</h6>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:mx-2">
      <div className="max-w-[1444px] mx-auto border-t border-b border-[#D3D8DF] md:border-x">
        {/* Title */}
        <motion.div
          className="text-center pt-[40px] mt-2 md:mt-0 pb-6 md:pt-10 lg:pt-11 xl:pt-12 md:pb-3 lg:pb-3 xl:pb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h1
            className="text-sm md:text-xs lg:text-sm xl:text-sm text-[#707070]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <motion.span variants={textVariants}>
              Trusted UI/UX Designer by{" "}
            </motion.span>
            <motion.span
              className="block font-bold text-black md:inline"
              variants={highlightVariants}
            >
              40+ Global Brands
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Logos wrapper */}
        <div className="md:h-auto flex flex-col">
          {/* First row logos (desktop) */}
          <div className="hidden md:grid md:grid-cols-7 md:place-items-center mx-auto md:mx-5">
            {currentLogos.desktop1.map((logo, index) => (
              <AnimatePresence mode="wait" key={`desktop1-${index}`}>
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={logo} // Change key to trigger animation
                  className="md:mx-[16px] lg:mx-[19px] xl:mx-[22px] md:my-[16px] lg:my-[10px] xl:my-[19px]"
                >
                  <Image src={logo} alt="Trusted By" width={119} height={39} className="md:w-[100px] lg:w-[110px] xl:w-[119px]" />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>

          {/* Mobile layout (2-column logos, with exact gaps) */}
          <div className="flex justify-center gap-x-[33px] md:hidden mb-5 md:mb-0 pl-4">
            {/* Calculate how many logos per column */}
            {(() => {
              const logos = currentLogos.mobile;
              const midPoint = Math.ceil(logos.length / 2);

              return (
                <>
                  {/* First column */}
                  <div>
                    {logos.slice(0, midPoint).map((logo, index) => (
                      <AnimatePresence mode="wait" key={`mobile-col1-${index}`}>
                        <motion.div
                          variants={logoVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          key={logo}
                          className="my-[16px] mx-[22px] pb-6"
                        >
                          <Image
                            src={logo}
                            alt="Trusted By"
                            width={119}
                            height={39}
                          />
                        </motion.div>
                      </AnimatePresence>
                    ))}
                  </div>

                  {/* Second column */}
                  <div className="pr-4">
                    {logos.slice(midPoint).map((logo, index) => (
                      <AnimatePresence mode="wait" key={`mobile-col2-${index}`}>
                        <motion.div
                          variants={logoVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          key={logo}
                          className="my-[16px] mx-[22px] pb-6"
                        >
                          <Image
                            src={logo}
                            alt="Trusted By"
                            width={119}
                            height={39}
                          />
                        </motion.div>
                      </AnimatePresence>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Second row logos (desktop only) */}
          {/* <div className="hidden md:grid md:grid-cols-7 md:gap-10 md:place-items-center md:mx-auto md:mt-4 md:mb-12">
            {currentLogos.desktop2.map((logo, index) => (
              <AnimatePresence mode="wait" key={`desktop2-${index}`}>
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={logo}
                  className="mx-[22px] my-4"
                >
                  <Image src={logo} alt="Trusted By" width={119} height={39} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;