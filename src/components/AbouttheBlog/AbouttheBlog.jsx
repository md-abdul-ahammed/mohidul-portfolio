"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { neueMontreal } from "@/fonts/neueMontreal";

// Turns plain URLs in text into clickable links (safe: rest of text is escaped)
function linkify(text) {
  if (!text || typeof text !== "string") return "";
  const escape = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  const html = parts
    .map((part) => {
      if (/^https?:\/\//.test(part)) {
        const href = part.replace(/[.,;:)]+$/, "");
        const safeHref = href.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="underline text-[#1D1C1F] hover:opacity-80">${escape(part)}</a>`;
      }
      return escape(part);
    })
    .join("");
  return html;
}

const AbouttheBlog = ({ blogContent = [], blogData }) => {

  if (!blogContent?.length) {
    return (
      <div className="container-section text-center py-10 text-gray-500">
        No blog content found.
      </div>
    );
  }

  // MEDIA RENDER FUNCTION for blogContent sections
  const renderMedia = (item) => {
    // Check for iframe first (blog content uses iframe property)
    if (item.iframe) {
      // Full width Vimeo video like banner
      return (
        <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black -mx-4 md:-mx-5 lg:-mx-6 xl:-mx-8">
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`${item.iframe}?autoplay=1&muted=1&controls=0&loop=1&background=1`}
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
      );
    }

    // Check for image property (blog content uses image property)
    if (item.image) {
      return (
        <Image
          src={item.image}
          alt={item.title || "Blog media"}
          width={2000}
          height={1000}
          className="w-full h-auto block"
          style={{ 
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
          sizes="100vw"
          priority
        />
      );
    }

    // Also support media_type and media_url format (for consistency)
    if (item.media_type === "iframe" && item.media_url) {
      // Full width Vimeo video like banner
      return (
        <div className="relative pb-[56.25%] h-0 overflow-hidden bg-black -mx-4 md:-mx-5 lg:-mx-6 xl:-mx-8">
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`${item.media_url}?autoplay=1&muted=1&controls=0&loop=1&background=1`}
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
      );
    }

    if (item.media_type === "image" && item.media_url) {
      return (
        <Image
          src={item.media_url}
          alt={item.title || "Blog media"}
          width={2000}
          height={1000}
          className="w-full h-auto block"
          style={{ 
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
          sizes="100vw"
          priority
        />
      );
    }

    if (item.images?.length > 0) {
      return (
        <div className="grid gap-4">
          {item.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${item.title || "Blog"} image ${idx + 1}`}
              width={2000}
              height={1000}
              className="w-full h-auto block"
              style={{ 
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
              sizes="100vw"
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mx-2 container-section">
      <div className="mx-auto max-w-[1036px] [@media(min-width:1920px)]:max-w-[1051px]">
        <div className="py-6 md:py-5 lg:py-6 xl:py-8 border-x border-[#D3D8DF] [@media(min-width:1920px)]:border-b">
          {blogContent.map((item, index) => (
            <div
              key={item.id}
              className="mb-2 md:mb-2 pb-6"
            >
              <div className="px-4 md:px-5 lg:px-6 xl:px-8 mb-6">
                <h2 className="text-[30px] md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-4">
                  {item.title || `Section ${index + 1}`}
                </h2>

                <div
                  className={`text-base md:text-base lg:text-base xl:text-lg text-[#66656A] whitespace-pre-wrap ${neueMontreal.className}`}
                  dangerouslySetInnerHTML={{
                    __html: linkify(item.subtitle || item.sub_title || ""),
                  }}
                />
              </div>

              <div className="w-full">
                {renderMedia(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AbouttheBlog;
