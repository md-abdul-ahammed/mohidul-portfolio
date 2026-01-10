"use client";

import { MoveUpRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../AnimatedButtons";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";

const BlogSidebar = ({ blogInfo }) => {
  const [isSticky, setIsSticky] = useState(false);
  const sidebarRef = useRef(null);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      const sidebar = sidebarRef.current;
      const sidebarRect = sidebar.getBoundingClientRect();

      const containerSection = document.querySelector('.container-section');
      if (!containerSection) return;

      const containerRect = containerSection.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const windowHeight = window.innerHeight;

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

  return (
    <div className="mx-2 md:mx-0 md:w-[280px] lg:w-[320px] xl:w-[365px]">
      {/* ---------------- MOBILE LAYOUT ---------------- */}
      <div className="block md:hidden p-4 border-b border-l border-[#D3D8DF]">
        <div className="flex flex-wrap -mx-2">
          {/* Author */}
          <div className="w-1/2 px-2">
            <p className="text-sm text-[#66656A] mt-4">AUTHOR</p>
            <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.author_name}
            </h5>
          </div>
          {/* Category */}
          <div className="w-1/2 px-2">
            <p className="text-sm text-[#66656A] mt-4">CATEGORY</p>
            <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.category}
            </h5>
          </div>
          {/* Reading Time */}
          <div className="w-1/2 px-2">
            <p className="text-sm text-[#66656A] mt-4">READING TIME</p>
            <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.reading_time}
            </h5>
          </div>
          {/* Published */}
          <div className="w-1/2 px-2">
            <p className="text-sm text-[#66656A] mt-4">PUBLISHED</p>
            <h5 className="text-base font-medium mt-1 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.published_date}
            </h5>
          </div>
        </div>

        {/* Source Link */}
        <div className="mt-4">
          <p className="text-sm text-[#66656A]">SOURCE</p>
          <div className="mt-2">
            {blogInfo.source_link && (
              <a
                href={ensureFullUrl(blogInfo.source_link)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#1D1C1F] font-medium hover:underline"
              >
                Visit Source
                <MoveUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Share */}
        <div className="mt-6 pb-4">
          <p className="text-sm text-[#66656A] mb-3">SHARE THIS BLOG</p>
          <div className="flex gap-2">
            <a href="#" className="w-10 h-10 border border-[#D3D8DF] flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-sm">𝕏</span>
            </a>
            <a href="#" className="w-10 h-10 border border-[#D3D8DF] flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-sm">in</span>
            </a>
            <a href="#" className="w-10 h-10 border border-[#D3D8DF] flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-sm">f</span>
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- DESKTOP LAYOUT ---------------- */}
      <div
        ref={sidebarRef}
        className={`hidden md:block border border-[#D3D8DF] transition-all duration-300 ${
          isSticky
            ? "fixed top-5 w-[280px] lg:w-[320px] xl:w-[365px] z-10"
            : "relative"
        }`}
      >
        <div className="p-6">
          {/* Author */}
          <div>
            <p className="text-sm text-[#66656A]">AUTHOR</p>
            <h5 className="text-base font-medium mt-2 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.author_name}
            </h5>
          </div>

          {/* Category */}
          <div className="mt-4">
            <p className="text-sm text-[#66656A]">CATEGORY</p>
            <h5 className="text-base font-medium mt-2 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.category}
            </h5>
          </div>

          {/* Reading Time */}
          <div className="mt-4">
            <p className="text-sm text-[#66656A]">READING TIME</p>
            <h5 className="text-base font-medium mt-2 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.reading_time}
            </h5>
          </div>

          {/* Published */}
          <div className="mt-4">
            <p className="text-sm text-[#66656A]">PUBLISHED</p>
            <h5 className="text-base font-medium mt-2 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.published_date}
            </h5>
          </div>

          {/* Source Link */}
          <div className="mt-4">
            <p className="text-sm text-[#66656A]">SOURCE</p>
            <div className="mt-2 pb-4 border-b border-[#D3D8DF]">
              {blogInfo.source_link && (
                <a
                  href={ensureFullUrl(blogInfo.source_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1D1C1F] font-medium hover:underline"
                >
                  Visit Source
                  <MoveUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-6">
            <p className="text-sm text-[#66656A] mb-3">SHARE THIS BLOG</p>
            <div className="flex gap-2">
              <a href="#" className="w-10 h-10 border border-[#D3D8DF] flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-sm">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 border border-[#D3D8DF] flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-sm">in</span>
              </a>
              <a href="#" className="w-10 h-10 border border-[#D3D8DF] flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-sm">f</span>
              </a>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 pt-6 border-t border-[#D3D8DF]">
            <h5 className="text-lg font-medium mb-2">Looking for a designer?</h5>
            <p className="text-sm text-[#66656A] mb-4">
              Let's discuss how I can help bring your vision to life
            </p>
            <Link href="/contact" className="block">
              <AnimatedButton
                text="Get in Touch"
                className="w-full justify-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;





