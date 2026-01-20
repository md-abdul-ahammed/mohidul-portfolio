"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const BlogHero = ({ blogHeroData, breadcrumbType = "Blog" }) => {
  const {
    image_url,
    sub_title,
    iframe,
    video,
    tags: rawTags = [],
    title,
  } = blogHeroData || {};

  // Parse tags if they're a string (for consistency with blog API)
  const tags = typeof rawTags === 'string' 
    ? rawTags.split(',').map(t => t.trim()).filter(Boolean)
    : (Array.isArray(rawTags) ? rawTags : []);

  console.log("iframe", iframe);
  console.log("video", video);

  return (
    <div className="mx-2 mt-18">
      <div className="px-4 md:px-4 lg:px-6 py-10 border-x border-b border-[#D3D8DF] mx-auto md:max-w-[1444px]">
        {/* Breadcrumb */}
        <motion.div
          className="flex flex-wrap items-center gap-2 md:gap-3 lg:gap-5"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h6 className="text-[#66656A] text-base">Home</h6>
          <h6 className="text-[#66656A]">/</h6>
          <h6 className="text-[#66656A] text-base">{breadcrumbType}</h6>
          <h6 className="text-[#66656A]">/</h6>
          <h6 className="text-[#1D1C1F] text-base font-medium px-1.5 py-1 bg-[#EFEFEF] underline">
            {title}
          </h6>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          className="pt-6 pb-10 md:pt-8 lg:pt-10 md:items-end md:justify-between gap-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h1 className="text-[34px] md:text-5xl lg:text-8xl text-[#1D1C1F] mb-4 md:mb-6 md:whitespace-normal lg:whitespace-nowrap">
            {title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full">
            <motion.p
              className="text-[#66656A] text-base md:max-w-[500px] lg:w-[694px]"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              {sub_title}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <h6
                    key={index}
                    className="px-3 py-1 bg-[#EDEDEF] text-[#66656A] text-sm capitalize"
                  >
                    {tag}
                  </h6>
                ))
              ) : (
                <h6 className="px-3 py-1 bg-[#EDEDEF] text-[#66656A] text-sm italic">
                  No Tags
                </h6>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          {iframe && (
            <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black">
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  src={`${iframe}?autoplay=1&muted=1&controls=0&loop=1&background=1`}
                  className="absolute top-1/2 left-1/2 w-[177.78%] h-[177.78%] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    minWidth: '100%',
                    minHeight: '100%'
                  }}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          {!iframe && video && (
            <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black">
              <video
                src={video}
                width="100%"
                height="450"
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          )}
          {!iframe && !video && (
            <Image
              src={image_url || "/images/project/projectHero.svg"}
              alt={title || "blog image"}
              width={687}
              height={450}
              className="w-full h-auto"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogHero;






