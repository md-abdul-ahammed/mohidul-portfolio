"use client";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "/public/name.json";
import { API_ENDPOINTS } from "@/config/api";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch(API_ENDPOINTS.HERO)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setHeroData(data.hero_section);
        }
      })
      .catch(error => console.error('Error fetching hero data:', error));
  }, []);

  // Helper function to ensure URL is complete
  const ensureFullUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="md:mx-2 mt-18">
      <div className="relative mx-auto md:max-w-[1444px] lg:max-w-[1444px] xl:max-w-[1444px] md:border-x md:border-b md:border-[#D3D8DF]">
        {/* Background Image */}
        <div
          className="
            w-full 
            h-[calc(100vh-72px)]
            lg:w-[680px] xl:w-[786px] lg:mx-auto
            bg-cover bg-center
            md:bg-contain md:bg-top
            bg-no-repeat 
          "
          style={{
            backgroundImage: heroData?.hero_image ? `url('${heroData.hero_image}')` : undefined
          }}
        />

        {/* Mid-text contents (tablet and desktop) */}
        <div className="hidden md:block absolute md:right-[16px] lg:right-[20px] xl:right-[24px] md:top-[160px] lg:top-[190px] xl:top-[212px] w-fit text-right font-medium md:text-lg lg:text-xl xl:text-2xl text-[#1D1C1F] z-10">
          <motion.img
            src="/images/hero/Top.svg"
            alt="Top Rated Badge"
            className="ml-auto mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              As a Top Rated Designer
            </motion.h1>

            <motion.h1
              className="mr-2.5"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              on Upwork or delivering high-
            </motion.h1>

            <motion.h1
              className="mr-[26px]"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              quality design solution for client.
            </motion.h1>

            {/* Visit Profile with same animation */}
            <motion.div
              className="flex justify-center items-center gap-2 mt-3 group cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Link Text */}
              <a
                href={ensureFullUrl(heroData?.hero_link) || "https://www.upwork.com/freelancers/thisismohidul"}
                target="_blank"
                className="underline text-[17px] font-normal text-[#1D1C1F] transition-all group-hover:text-[#333]"
              >
                Visit Profile
              </a>

              {/* Icon */}
              <div className="transition-all duration-300 ease-in-out">
                <MoveUpRight color="#1d1c1f" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom content - hero-bottom-safe: extra padding on real mobile so text isn't cut by browser nav bar */}
        <div className="hero-bottom-safe absolute bottom-0 left-0 w-full flex flex-col md:flex-row justify-between items-end px-4 md:px-4 lg:px-5 xl:px-6 pb-6 md:pb-8 lg:pb-5 xl:pb-6">
          <div className="w-full md:w-auto text-left">
            <h4
              className="text-white md:text-[#1D1C1F] 
                text-[20px] md:text-[1.75rem] lg:text-[2.5rem] xl:text-6xl
                px-4 md:px-0 font-machina font-normal"
            >
              ©{new Date().getFullYear()}
            </h4>

            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              className="w-[300px] md:w-[350px] lg:w-[500px] xl:w-[700px]"
            />
          </div>

          {/* Social Links - Figma: box 33×33px, icon 22×22px */}
          <div className="hidden md:flex w-fit h-[51px] flex-col">
            <h6 className="font-machina text-sm text-[#1D1C1F] mb-[4px]">Social Link</h6>
            <div className="flex border border-[#D3D8DF] w-fit shrink-0">
              {[
                {
                  href: ensureFullUrl(heroData?.social?.instagram) || "https://www.instagram.com/thisismohidul/",
                  src: "/images/hero/instagram.svg",
                  alt: "instagram",
                },
                {
                  href: "https://wa.me/8801710055978",
                  src: "/images/hero/whatsapp.svg",
                  alt: "whatsapp",
                },
                {
                  href: ensureFullUrl(heroData?.social?.linkedin) || "https://www.linkedin.com/in/thisismohidul/",
                  src: "/images/hero/linkedin.svg",
                  alt: "linkedin",
                },
                {
                  href: ensureFullUrl(heroData?.social?.facebook) ||  "https://dribbble.com/thisismohidul",
                  src: "/images/hero/dribbble.svg",
                  alt: "dribbble",
                },
                {
                  href: ensureFullUrl(heroData?.social?.twitter) || "https://www.behance.net/thisismohidul",
                  src: "/images/hero/behance-01.svg",
                  alt: "behance",
                },
              ].map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[33px] h-[33px] min-w-[33px] min-h-[33px] p-[5.5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out group hover:bg-[#F5F6F7] box-border"
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={22}
                    height={22}
                    className="w-[22px] h-[22px] flex-shrink-0 transition-transform duration-200 ease-out group-hover:scale-110 group-hover:opacity-90"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;