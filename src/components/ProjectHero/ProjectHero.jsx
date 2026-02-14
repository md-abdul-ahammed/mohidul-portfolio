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

const ProjectHero = ({ projectHeroData, breadcrumbType = "Case" }) => {
  const {
    image_url,
    sub_title,
    iframe,
    video,
    tags = [],
    title,
  } = projectHeroData || {};

  console.log("iframe", iframe);
  console.log("video", video);

  return (
    <div className="mt-18">
      {/* Breadcrumb + Title + Description – contained */}
      <div className="mx-2 px-4 md:px-4 lg:px-6 py-10 border-x border-b border-[#D3D8DF] mx-auto md:max-w-[1444px]">
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
      </div>

      {/* Media – full viewport width, no side gaps (covers black/empty space) */}
      <motion.div
        className="w-full overflow-hidden border-b border-[#D3D8DF]"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        {iframe && (
          <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
            <iframe
              src={`${iframe}?autoplay=1&muted=1&controls=0&loop=1&background=1`}
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 'none' }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video"
            />
          </div>
        )}
        {!iframe && video && (
          <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
            <video
              src={video}
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
          <div className="relative w-full bg-[#F5F5F5]" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src={image_url || "/images/project/projectHero.svg"}
              alt={title || "project image"}
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-center"
              sizes="100vw"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectHero;
