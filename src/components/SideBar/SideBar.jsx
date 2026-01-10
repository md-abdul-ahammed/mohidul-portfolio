"use client";

import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../AnimatedButtons";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";

const SideBar = ({ caseStudyData }) => {
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef(null);
  const stickyRef = useRef(null);
  const originalPositionRef = useRef({ top: 0, left: 0 });

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

  // Get the first case study or use empty object as fallback
  const caseStudy = caseStudyData?.[0] || {};

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const sidebar = sidebarRef.current;
      const sidebarRect = sidebar.getBoundingClientRect();

      // Get the container section that the sidebar should follow
      const containerSection = document.querySelector('.container-section');
      if (!containerSection) return;

      const containerRect = containerSection.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;

      // When sidebar reaches top of viewport AND container section is still in view
      if (sidebarRect.top <= 20 && containerBottom > windowHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mx-2 md:mx-0 md:w-[280px] lg:w-[320px] xl:w-[365px]">
      {/* ---------------- MOBILE LAYOUT ---------------- */}
      <div className="block md:hidden p-4 border-b border-l border-r border-[#D3D8DF]">
        {/* Grid layout - 2 columns like screenshot */}
        {/* Row 1: CLIENT and CATEGORY */}
        <div className="grid grid-cols-2 gap-4 mb-4 border-b border-[#D3D8DF] pb-4">
          {/* 1 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">CLIENT</p>
            <h5 className="text-base font-medium mt-1">
              {caseStudy.client_name}
            </h5>
          </div>
          {/* 2 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
            <h5 className="text-base font-medium mt-1">
              {caseStudy.category}
            </h5>
          </div>
        </div>
        
        {/* Row 2: TIMELINE and LIVE VIEW */}
        <div className="grid grid-cols-2 gap-4 mb-4 border-b border-[#D3D8DF] pb-4">
          {/* 3 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">TIMELINE</p>
            <h5 className="text-base font-medium mt-1">
              {caseStudy.timeline}
            </h5>
          </div>
          {/* 4 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">LIVE VIEW</p>
            <h5 className="text-base font-medium mt-1">
              {caseStudy.project_link ? (
                <a 
                  href={caseStudy.project_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline flex items-center gap-1"
                >
                  Visit Website
                  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5C3.33579 1.5 3 1.16421 3 0.75C3 0.335786 3.33579 0 3.75 0H12.75C13.1642 0 13.5 0.335786 13.5 0.75V9.75C13.5 10.1642 13.1642 10.5 12.75 10.5C12.3358 10.5 12 10.1642 12 9.75V2.56066L1.28033 13.2803C0.987437 13.5732 0.512563 13.5732 0.21967 13.2803C-0.0732233 12.9874 -0.0732233 12.5126 0.21967 12.2197L10.9393 1.5H3.75Z" fill="#1D1C1F"/>
                  </svg>
                </a>
              ) : (
                "Not Available"
              )}
            </h5>
          </div>
        </div>

        {/* 5 */}
        <div className="mb-4">
          <p className="text-sm text-[#66656A] mt-4">SERVICE WE PROVIDE</p>
          <h5 className="text-base font-medium mt-1">
            {String(caseStudy.service)
              .split(/,\s*/g) // split ANY comma + spaces
              .map((item, index) => (
                <span key={index} className="block">
                  {item}
                </span>
              ))}
          </h5>

          {console.log("caseStudy", caseStudy.service)}

          {/* Button */}
          <div className="mt-4 flex justify-center">
            <Link href={'/book-a-call'}>
              <button className="py-3 px-4 sm:px-[35px] bg-[#34C779] font-medium text-[15px] sm:text-[17px] cursor-pointer flex items-center">
                <Image
                  src={"/images/Ideas/01.png"}
                  alt="phone"
                  width={34}
                  height={34}
                  className="inline mr-2"
                />
                Book a call with Mohidul{" "}
                <div className="w-[24px] h-[24px] ml-1.5">
                  <MoveUpRight />
                </div>
              </button>
            </Link>
          </div>

          {/* Share title + icons */}
          <div className="mt-4 text-center">
            <h5 className="text-base text-[#1D1C1F]">Share this Case Study:</h5>
            <div className="flex justify-center mt-2">
              <div className="p-[5px] border border-[#D3D8DF] flex items-center justify-center">
                <Image
                  src="/images/hero/instagram.svg"
                  alt="instagram"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>

              <div className="p-[5px] border-y border-[#D3D8DF] flex items-center justify-center">
                <Image
                  src="/images/hero/linkedin-02.svg"
                  alt="linkedin"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>

              <div className="p-[5px] border-y border-[#D3D8DF] flex items-center justify-center">
                <Image
                  src="/images/hero/dribbble.svg"
                  alt="dribbble"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>

              <div className="p-[5px] flex items-center justify-center border border-[#D3D8DF]">
                <Image
                  src="/images/hero/behance-01.svg"
                  alt="behance"
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- DESKTOP LAYOUT ---------------- */}
      <div
        ref={sidebarRef}
        className="hidden md:block md:w-[280px] lg:w-[320px] xl:w-[365px] relative"
        style={{ height: isSticky ? "0" : "auto" }}
      >
        {/* Original Position Content */}
        {!isSticky && (
          <div>
            <div className="md:pl-4 lg:pl-5 xl:pl-6 md:py-4 lg:py-5 xl:py-6 border-b border-l border-[#D3D8DF]">
              {/* Wrap 1–4 */}
              <div className="md:block">
                {/* 1 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">CLIENT</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {caseStudy.client_name}
                  </h5>
                </div>
                {/* 2 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {caseStudy.category}
                  </h5>
                </div>
                {/* 3 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">TIMELINE</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {caseStudy.timeline}
                  </h5>
                </div>
                {/* 4 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">LIVE VIEW</p>
                  <a
                    href={caseStudy.project_link || "#"}
                    target={caseStudy.project_link ? "_blank" : "_self"}
                    className={`text-base flex items-center gap-1 ${caseStudy.project_link ? "underline" : ""} font-medium mt-1 pb-4 border-b border-[#D3D8DF]`}
                  >
                    {caseStudy.project_link ? "Visit Website" : "Not Available"}
                    {caseStudy.project_link && (
                      <svg className="ml-1.5" width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5C3.33579 1.5 3 1.16421 3 0.75C3 0.335786 3.33579 0 3.75 0H12.75C13.1642 0 13.5 0.335786 13.5 0.75V9.75C13.5 10.1642 13.1642 10.5 12.75 10.5C12.3358 10.5 12 10.1642 12 9.75V2.56066L1.28033 13.2803C0.987437 13.5732 0.512563 13.5732 0.21967 13.2803C-0.0732233 12.9874 -0.0732233 12.5126 0.21967 12.2197L10.9393 1.5H3.75Z" fill="#1D1C1F"/>
                      </svg>
                    )}
                  </a>
                </div>
              </div>

              {/* 5 */}
              <div className="mt-4">
                <p className="text-sm text-[#66656A] mt-4">
                  SERVICES I PROVIDED
                </p>
                 <h5 className="text-base font-medium mt-1">
                {String(caseStudy.service)
                  .split(/,\s*/g) // split ANY comma + spaces
                  .map((item, index) => (
                    <span key={index} className="block">
                      {item}
                    </span>
                  ))}
              </h5>
              </div>
            </div>

            {/* Button + Social icons */}
            <div className="mt-4">
              {/* Button */}
              <div className="flex justify-center">
                <Link href={'/book-a-call'}>

                  <AnimatedButton
                    icon={
                      <Image
                        src={"/images/Ideas/01.png"}
                        alt="phone"
                        width={34}
                        height={34}
                        className="inline mr-2"
                      />
                    }
                    icon2={<MoveUpRight />}
                    textColor="white"
                    label={`Book a call with Mohidul`}
                    className="py-3 md:px-3 lg:px-4 xl:px-5 bg-[#34C779] font-medium md:text-[14px] lg:text-[15px] xl:text-[17px] cursor-pointer flex items-center relative"
                  />
                </Link>
              </div>

              {/* Share title + icons */}
              <div className="mt-4 text-center">
                <h5 className="text-base text-[#1D1C1F]">
                  Share this Case Study:
                </h5>
                <div className="flex border border-[#D3D8DF] w-fit mx-auto mt-3">
                  {[
                    {
                      href: ensureFullUrl(heroData?.social?.instagram) || "https://www.instagram.com/thisismohidul/",
                      src: "/images/hero/instagram.svg",
                      alt: "instagram",
                    },
                    {
                      href: ensureFullUrl(heroData?.social?.linkedin) || "https://www.linkedin.com/in/thisismohidul/",
                      src: "/images/hero/linkedin-02.svg",
                      alt: "linkedin",
                    },
                    {
                      href: ensureFullUrl(heroData?.social?.facebook) || "https://dribbble.com/thisismohidul",
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
                      className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out group hover:bg-[#F5F6F7]"
                    >
                      <Image
                        src={social.src}
                        alt={social.alt}
                        width={22}
                        height={22}
                        className="w-[22px] h-[22px] transition-transform duration-200 ease-out group-hover:scale-110 group-hover:opacity-90"
                        unoptimized
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Sidebar */}
      {isSticky && (
        <motion.div
          ref={stickyRef}
          className="hidden md:block fixed top-[73px] md:w-[280px] lg:w-[320px] xl:w-[365px] z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="md:p-4 lg:p-5 xl:p-6 border-b border-l border-[#D3D8DF] bg-white shadow-lg">
            {/* Wrap 1–4 */}
            <div className="md:block">
              {/* 1 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">CLIENT</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {caseStudy.client_name}
                </h5>
              </div>
              {/* 2 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {caseStudy.category}
                </h5>
              </div>
              {/* 3 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">TIMELINE</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {caseStudy.timeline}
                </h5>
              </div>
              {/* 4 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">LIVE VIEW</p>
                <a
                  href={caseStudy.project_link || "#"}
                  target={caseStudy.project_link ? "_blank" : "_self"}
                  className={`text-base flex items-center gap-1 ${caseStudy.project_link ? "underline" : ""} font-medium mt-1 pb-4 border-b border-[#D3D8DF]`}
                >
                  {caseStudy.project_link ? "Visit Website" : "Not Available"}
                  {caseStudy.project_link && (
                    <svg className="ml-1.5" width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5C3.33579 1.5 3 1.16421 3 0.75C3 0.335786 3.33579 0 3.75 0H12.75C13.1642 0 13.5 0.335786 13.5 0.75V9.75C13.5 10.1642 13.1642 10.5 12.75 10.5C12.3358 10.5 12 10.1642 12 9.75V2.56066L1.28033 13.2803C0.987437 13.5732 0.512563 13.5732 0.21967 13.2803C-0.0732233 12.9874 -0.0732233 12.5126 0.21967 12.2197L10.9393 1.5H3.75Z" fill="#1D1C1F"/>
                    </svg>
                  )}
                </a>
              </div>
            </div>

            {/* 5 */}
            <div className="mt-4">
              <p className="text-sm text-[#66656A] mt-4">SERVICES I PROVIDED</p>
              {/* <h5 className="text-base font-medium mt-1">{caseStudy.service}</h5> */}
              <h5 className="text-base font-medium mt-1">
                {String(caseStudy.service)
                  .split(/,\s*/g) // split ANY comma + spaces
                  .map((item, index) => (
                    <span key={index} className="block">
                      {item}
                    </span>
                  ))}
              </h5>

            </div>
          </div>

          {/* Button + Social icons */}
          <div className="Pt-4 bg-white md:p-4 lg:p-5 xl:p-4 shadow-lg">
            {/* Button */}
            <div className="flex justify-center">
              <AnimatedButton
                icon={
                  <Image
                    src={"/images/Ideas/01.png"}
                    alt="phone"
                    width={34}
                    height={34}
                    className="inline mr-2"
                  />
                }
                icon2={<MoveUpRight />}
                textColor="white"
                label={`Book a call with Mohidul`}
                className="py-3 md:px-3 lg:px-4 xl:px-5 bg-[#34C779] font-medium md:text-[14px] lg:text-[15px] xl:text-[17px] cursor-pointer flex items-center relative"
              />
            </div>

            {/* Share title + icons */}
            <div className="mt-4 text-center">
              <h5 className="text-base text-[#1D1C1F]">
                Share this Case Study:
              </h5>
              <div className="flex border border-[#D3D8DF] w-fit mx-auto mt-3">
                {[
                  {
                    href: ensureFullUrl(heroData?.social?.instagram) || "https://www.instagram.com/thisismohidul/",
                    src: "/images/hero/instagram.svg",
                    alt: "instagram",
                  },
                  {
                    href: ensureFullUrl(heroData?.social?.linkedin) || "https://www.linkedin.com/in/thisismohidul/",
                    src: "/images/hero/linkedin-02.svg",
                    alt: "linkedin",
                  },
                  {
                    href: ensureFullUrl(heroData?.social?.facebook) || "https://dribbble.com/thisismohidul",
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
                    className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out group hover:bg-[#F5F6F7]"
                  >
                    <Image
                      src={social.src}
                      alt={social.alt}
                      width={22}
                      height={22}
                      className="w-[22px] h-[22px] transition-transform duration-200 ease-out group-hover:scale-110 group-hover:opacity-90"
                      unoptimized
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SideBar;