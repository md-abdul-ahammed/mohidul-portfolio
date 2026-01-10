"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { neueMontreal } from "@/fonts/neueMontreal";

const AbouttheBlog = ({ blogContent = [], blogData }) => {

  if (!blogContent?.length) {
    return (
      <div className="container-section text-center py-10 text-gray-500">
        No blog content found.
      </div>
    );
  }

  // Render media function
  const renderMedia = (item) => {
    if (item.iframe) {
      return (
        <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
          <iframe
            src={`${item.iframe}?autoplay=0&muted=1`}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={item.title}
          ></iframe>
        </div>
      );
    }

    if (item.image) {
      return (
        <div className="w-full">
          <Image
            src={item.image}
            alt={item.title || "Blog content"}
            width={2000}
            height={2000}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mx-2 container-section">
      <div className="mx-auto max-w-[1036px] [@media(min-width:1920px)]:max-w-[1051px]">
        <div className="px-4 md:px-5 lg:px-6 xl:px-8 py-6 md:py-5 lg:py-6 xl:py-8 border-x border-[#D3D8DF] [@media(min-width:1920px)]:border-b">
          {blogContent.map((item, index) => (
            <div
              key={item.id}
              className="mb-2 md:mb-2 pb-6"
            >
              {/* Title and Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h1
                  className={`${neueMontreal.className} text-[34px] md:text-5xl lg:text-[64px] text-[#1D1C1F] font-medium leading-[1.1] mb-4`}
                >
                  {item.title}
                </h1>

                {item.sub_title && (
                  <p className="text-[#66656A] text-base md:text-lg mb-6 max-w-3xl">
                    {item.sub_title}
                  </p>
                )}
              </motion.div>

              {/* Media (Image or Iframe) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="mb-8"
              >
                {renderMedia(item)}
              </motion.div>

              {/* Divider between sections (except last one) */}
              {index < blogContent.length - 1 && (
                <hr className="border-t border-[#D3D8DF] my-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AbouttheBlog;






