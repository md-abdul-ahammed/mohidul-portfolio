"use client";

import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../AnimatedButtons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API_ENDPOINTS } from "@/config/api";

const BlogSidebar = ({ blogInfo }) => {
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef(null);
  const stickyRef = useRef(null);
  const originalPositionRef = useRef({ top: 0, left: 0 });
  const pathname = usePathname();

  const [heroData, setHeroData] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

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

  // Share URL functions
  const getShareUrl = (platform) => {
    if (!currentUrl) return '#';
    
    // Clean URL - remove query parameters and hash for sharing
    const cleanUrl = currentUrl.split('?')[0].split('#')[0];
    const encodedUrl = encodeURIComponent(cleanUrl);
    
    // Professional share title
    const blogTitle = blogInfo?.author_name || 'This Blog';
    const shareTitle = `Check out "${blogTitle}" - A blog post by Mohidul Islam`;
    const encodedTitle = encodeURIComponent(shareTitle);
    
    // Short description for some platforms
    const description = `Explore this ${blogInfo?.category || 'blog'} post`;
    const encodedDescription = encodeURIComponent(description);
    
    switch (platform) {
      case 'facebook':
        // Facebook automatically fetches Open Graph meta tags, but we can provide URL with quote parameter
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
      case 'linkedin':
        // LinkedIn share with title
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case 'x':
        // Twitter/X with clean formatting
        return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
      case 'whatsapp':
        // WhatsApp with title on separate line
        return `https://wa.me/?text=${encodedTitle}%0A%0A${encodedUrl}`;
      default:
        return '#';
    }
  };

  // Copy to clipboard function
  const handleCopyLink = async (e) => {
    e.preventDefault();
    if (!currentUrl) return;
    try {
      // Copy clean URL without query parameters
      const cleanUrl = currentUrl.split('?')[0];
      await navigator.clipboard.writeText(cleanUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy link');
    }
  };

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

  if (!blogInfo) {
    return null;
  }

  // Helper function to check if source link exists
  const hasSource = blogInfo.source_link && String(blogInfo.source_link).trim() !== '' && String(blogInfo.source_link).trim() !== 'undefined';

  return (
    <div className="mx-2 md:mx-0 md:w-[280px] lg:w-[320px] xl:w-[365px]">
      {/* ---------------- MOBILE LAYOUT ---------------- */}
      <div className="block md:hidden p-4 border-b border-l border-r border-[#D3D8DF]">
        {/* Grid layout - 2 columns like screenshot */}
        {/* Row 1: AUTHOR and CATEGORY */}
        <div className="grid grid-cols-2 gap-4 mb-4 border-b border-[#D3D8DF] pb-4">
          {/* 1 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">AUTHOR</p>
            <h5 className="text-base font-medium mt-1">
              {blogInfo.author_name}
            </h5>
          </div>
          {/* 2 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
            <h5 className="text-base font-medium mt-1">
              {blogInfo.category}
            </h5>
          </div>
        </div>
        
        {/* Row 2: READING TIME and PUBLISHED */}
        <div className={`grid grid-cols-2 gap-4 mb-4 pb-4 ${hasSource ? "border-b border-[#D3D8DF]" : ""}`}>
          {/* 3 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">READING TIME</p>
            <h5 className="text-base font-medium mt-1">
              {blogInfo.reading_time}
            </h5>
          </div>
          {/* 4 */}
          <div>
            <p className="text-sm text-[#66656A] mt-4">PUBLISHED</p>
            <h5 className="text-base font-medium mt-1">
              {blogInfo.published_date}
            </h5>
          </div>
        </div>

        {/* 5 */}
        {hasSource && (
          <div className="mb-4">
            <p className="text-sm text-[#66656A] mt-4">SOURCE</p>
            <h5 className="text-base font-medium mt-1">
              {blogInfo.source_link ? (
                <a 
                  href={ensureFullUrl(blogInfo.source_link)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline flex items-center gap-1"
                >
                  Visit Source
                  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5C3.33579 1.5 3 1.16421 3 0.75C3 0.335786 3.33579 0 3.75 0H12.75C13.1642 0 13.5 0.335786 13.5 0.75V9.75C13.5 10.1642 13.1642 10.5 12.75 10.5C12.3358 10.5 12 10.1642 12 9.75V2.56066L1.28033 13.2803C0.987437 13.5732 0.512563 13.5732 0.21967 13.2803C-0.0732233 12.9874 -0.0732233 12.5126 0.21967 12.2197L10.9393 1.5H3.75Z" fill="#1D1C1F"/>
                  </svg>
                </a>
              ) : (
                "Not Available"
              )}
            </h5>
          </div>
        )}

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
          <div className="mt-4 mb-2 text-center">
            <h5 className="text-base text-[#1D1C1F]">Share this Blog:</h5>
            <div className="flex border border-[#D3D8DF] w-fit mx-auto mt-2">
              {[
                { platform: 'facebook', href: getShareUrl('facebook'), src: "/images/hero/facebook.svg", alt: "facebook" },
                { platform: 'linkedin', href: getShareUrl('linkedin'), src: "/images/hero/linkedin.svg", alt: "linkedin" },
                { platform: 'x', href: getShareUrl('x'), src: "/images/hero/x.svg", alt: "x" },
                { platform: 'whatsapp', href: getShareUrl('whatsapp'), src: "/images/hero/whatsapp.svg", alt: "whatsapp" },
                { platform: 'copy', href: '#', src: "/images/hero/copy.svg", alt: "copy" },
              ].map((social) => 
                social.platform === 'copy' ? (
                  <button
                    key={social.alt}
                    onClick={handleCopyLink}
                    className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 cursor-pointer bg-transparent"
                  >
                    <Image src={social.src} alt={social.alt} width={22} height={22} className="w-[22px] h-[22px]" unoptimized />
                  </button>
                ) : (
                  <a
                    key={social.alt}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0"
                  >
                    <Image src={social.src} alt={social.alt} width={22} height={22} className="w-[22px] h-[22px]" unoptimized />
                  </a>
                )
              )}
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
                  <p className="text-sm text-[#66656A] mt-4">AUTHOR</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {blogInfo.author_name}
                  </h5>
                </div>
                {/* 2 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {blogInfo.category}
                  </h5>
                </div>
                {/* 3 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">READING TIME</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {blogInfo.reading_time}
                  </h5>
                </div>
                {/* 4 */}
                <div className="mb-4">
                  <p className="text-sm text-[#66656A] mt-4">PUBLISHED</p>
                  <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                    {blogInfo.published_date}
                  </h5>
                </div>
              </div>

              {/* 5 */}
              {hasSource && (
                <div className="mt-4">
                  <p className="text-sm text-[#66656A] mt-4">
                    SOURCE
                  </p>
                  <h5 className="text-base font-medium mt-1">
                    {blogInfo.source_link ? (
                      <a 
                        href={ensureFullUrl(blogInfo.source_link)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline flex items-center gap-1"
                      >
                        Visit Source
                        <svg className="ml-1.5" width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5C3.33579 1.5 3 1.16421 3 0.75C3 0.335786 3.33579 0 3.75 0H12.75C13.1642 0 13.5 0.335786 13.5 0.75V9.75C13.5 10.1642 13.1642 10.5 12.75 10.5C12.3358 10.5 12 10.1642 12 9.75V2.56066L1.28033 13.2803C0.987437 13.5732 0.512563 13.5732 0.21967 13.2803C-0.0732233 12.9874 -0.0732233 12.5126 0.21967 12.2197L10.9393 1.5H3.75Z" fill="#1D1C1F"/>
                        </svg>
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </h5>
                </div>
              )}
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
              <div className="mt-4 mb-2 text-center">
                <h5 className="text-base text-[#1D1C1F]">
                  Share this Blog:
                </h5>
                <div className="flex border border-[#D3D8DF] w-fit mx-auto mt-3">
                  {[
                    {
                      platform: 'facebook',
                      href: getShareUrl('facebook'),
                      src: "/images/hero/facebook.svg",
                      alt: "facebook",
                    },
                    {
                      platform: 'linkedin',
                      href: getShareUrl('linkedin'),
                      src: "/images/hero/linkedin.svg",
                      alt: "linkedin",
                    },
                    {
                      platform: 'x',
                      href: getShareUrl('x'),
                      src: "/images/hero/x.svg",
                      alt: "x",
                    },
                    {
                      platform: 'whatsapp',
                      href: getShareUrl('whatsapp'),
                      src: "/images/hero/whatsapp.svg",
                      alt: "whatsapp",
                    },
                    {
                      platform: 'copy',
                      href: '#',
                      src: "/images/hero/copy.svg",
                      alt: "copy",
                    },
                  ].map((social) => (
                    social.platform === 'copy' ? (
                      <button
                        key={social.alt}
                        onClick={handleCopyLink}
                        className="group p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out hover:bg-[#F5F6F7] cursor-pointer bg-transparent"
                      >
                        <Image
                          src={social.src}
                          alt={social.alt}
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] transition-all duration-200 ease-out group-hover:scale-110"
                          style={{
                            filter: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.filter = 'brightness(0) saturate(100%) invert(64%) sepia(54%) saturate(2040%) hue-rotate(108deg) brightness(95%) contrast(85%)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.filter = 'none';
                          }}
                          unoptimized
                        />
                      </button>
                    ) : (
                      <a
                        key={social.alt}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out hover:bg-[#F5F6F7]"
                      >
                        <Image
                          src={social.src}
                          alt={social.alt}
                          width={30}
                          height={30}
                          className="w-[30px] h-[30px] transition-all duration-200 ease-out group-hover:scale-110"
                          style={{
                            filter: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.filter = 'brightness(0) saturate(100%) invert(64%) sepia(54%) saturate(2040%) hue-rotate(108deg) brightness(95%) contrast(85%)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.filter = 'none';
                          }}
                          unoptimized
                        />
                      </a>
                    )
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
                <p className="text-sm text-[#66656A] mt-4">AUTHOR</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {blogInfo.author_name}
                </h5>
              </div>
              {/* 2 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {blogInfo.category}
                </h5>
              </div>
              {/* 3 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">READING TIME</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {blogInfo.reading_time}
                </h5>
              </div>
              {/* 4 */}
              <div className="mb-4">
                <p className="text-sm text-[#66656A] mt-4">PUBLISHED</p>
                <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
                  {blogInfo.published_date}
                </h5>
              </div>
            </div>

            {/* 5 */}
            {hasSource && (
              <div className="mt-4">
                <p className="text-sm text-[#66656A] mt-4">SOURCE</p>
                <h5 className="text-base font-medium mt-1">
                  {blogInfo.source_link ? (
                    <a 
                      href={ensureFullUrl(blogInfo.source_link)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline flex items-center gap-1"
                    >
                      Visit Source
                      <svg className="ml-1.5" width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.75 1.5C3.33579 1.5 3 1.16421 3 0.75C3 0.335786 3.33579 0 3.75 0H12.75C13.1642 0 13.5 0.335786 13.5 0.75V9.75C13.5 10.1642 13.1642 10.5 12.75 10.5C12.3358 10.5 12 10.1642 12 9.75V2.56066L1.28033 13.2803C0.987437 13.5732 0.512563 13.5732 0.21967 13.2803C-0.0732233 12.9874 -0.0732233 12.5126 0.21967 12.2197L10.9393 1.5H3.75Z" fill="#1D1C1F"/>
                      </svg>
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </h5>
              </div>
            )}
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
            <div className="mt-4 mb-2 text-center">
              <h5 className="text-base text-[#1D1C1F]">
                Share this Blog:
              </h5>
              <div className="flex border border-[#D3D8DF] w-fit mx-auto mt-3">
                {[
                  { platform: 'facebook', href: getShareUrl('facebook'), src: "/images/hero/facebook.svg", alt: "facebook" },
                  { platform: 'linkedin', href: getShareUrl('linkedin'), src: "/images/hero/linkedin.svg", alt: "linkedin" },
                  { platform: 'x', href: getShareUrl('x'), src: "/images/hero/x.svg", alt: "x" },
                  { platform: 'whatsapp', href: getShareUrl('whatsapp'), src: "/images/hero/whatsapp.svg", alt: "whatsapp" },
                  { platform: 'copy', href: '#', src: "/images/hero/copy.svg", alt: "copy" },
                ].map((social) => 
                  social.platform === 'copy' ? (
                    <button
                      key={social.alt}
                      onClick={handleCopyLink}
                      className="group p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out hover:bg-[#F5F6F7] cursor-pointer bg-transparent"
                    >
                      <Image
                        src={social.src}
                        alt={social.alt}
                        width={22}
                        height={22}
                        className="w-[22px] h-[22px] transition-transform duration-200 ease-out group-hover:scale-110"
                        unoptimized
                      />
                    </button>
                  ) : (
                    <a
                      key={social.alt}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out hover:bg-[#F5F6F7]"
                    >
                      <Image
                        src={social.src}
                        alt={social.alt}
                        width={22}
                        height={22}
                        className="w-[22px] h-[22px] transition-transform duration-200 ease-out group-hover:scale-110"
                        unoptimized
                      />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BlogSidebar;
