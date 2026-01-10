"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import TrustedbyIndustryLeaders from "../TrustedbyIndustryLeaders/TrustedbyIndustryLeaders";
import { neueMontreal } from "@/fonts/neueMontreal";
import AnimatedImage from "../AnimatedImage";
import HoverVideo from "../HoverVideo";
import { API_ENDPOINTS } from "@/config/api";

const AbouttheProject = ({ aboutTheProject = [], data }) => {
  const [testimonials, setTestimonials] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.TESTIMONIALS);

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const result = await response.json();
        setTestimonials(result);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Filter testimonials with better error handling
  const filteredTestimonials = React.useMemo(() => {
    if (!testimonials?.success || !testimonials.testimonials || !Array.isArray(testimonials.testimonials)) {
      return [];
    }

    const portfolioId = data?.portfolio?.id?.toString();
    console.log("Filtering testimonials:", {
      portfolioId,
      totalTestimonials: testimonials.testimonials.length,
      testimonials: testimonials.testimonials
    });

    return testimonials.testimonials.filter(
      (t) => t.portfolio_id?.toString() === portfolioId
    );
  }, [testimonials, data?.portfolio?.id]);

  // Debug logs
  console.log("Testimonials state:", testimonials);
  console.log("Data portfolio:", data?.portfolio);
  console.log("Filtered testimonials count:", filteredTestimonials.length);
  console.log("All testimonials:", testimonials.testimonials);

  if (!aboutTheProject?.length) {
    return (
      <div className="container-section text-center py-10 text-gray-500">
        No project details found.
      </div>
    );
  }

  // MEDIA RENDER FUNCTION for aboutTheProject sections
  const renderMedia = (item) => {
    if (item.media_type === "iframe" && item.media_url) {
      return (
        <HoverVideo url={item.media_url} />
      );
    }

    if (item.media_type === "image" && item.media_url) {
      return (
        <Image
          src={item.media_url}
          alt={item.title || "Project media"}
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
              alt={`${item.title || "Project"} image ${idx + 1}`}
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

  // MEDIA RENDER FUNCTION for testimonials
  const renderTestimonialMedia = (testimonial) => {
    if (testimonial.media_type === "iframe" && testimonial.media_url) {
      return (
        <div className="w-full h-full">
          <iframe
            src={`${testimonial.media_url}?autoplay=1&muted=1&controls=0&loop=1`}

            className="w-full h-[413px] object-cover"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={`Testimonial from ${testimonial.user_name}`}
          />
        </div>
      );
    }

    // Default to image for other media types
    return (
      <AnimatedImage
        src={testimonial.media_url}
        alt={testimonial.user_name}
        width={365}
        height={413}
        className="w-full h-full object-cover"
        animationDelay={0.1}
      />
    );
  };

  return (
    <div className="mx-2 container-section">
      <div className="mx-auto max-w-[1036px] [@media(min-width:1920px)]:max-w-[1051px]">
        <div className="py-6 md:py-5 lg:py-6 xl:py-8 border-x border-[#D3D8DF] [@media(min-width:1920px)]:border-b">
          {aboutTheProject.map((item, index) => (
            <div
              key={item.id}
              className="mb-2 md:mb-2 pb-6"
            >
              <div className="px-4 md:px-5 lg:px-6 xl:px-8 mb-6">
                <h2 className="text-[30px] md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-4">
                  {item.title || `Section ${index + 1}`}
                </h2>

                <pre
                  className={`text-base md:text-base lg:text-base xl:text-lg text-[#66656A] whitespace-pre-wrap ${neueMontreal.className}`}
                >
                  {item.subtitle}
                </pre>
              </div>

              <div className="w-full">
                {renderMedia(item)}
              </div>
            </div>
          ))}

          {/* CLIENT FEEDBACK SECTION - Only show if testimonials exist */}
          {!loading && !error && filteredTestimonials.length > 0 && (
            <div>
              <div className="px-4 md:px-5 lg:px-6 xl:px-8">
                <h1 className="text-[30px] md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-4">
                  Client Feedback
                </h1>

                <p className="text-base md:text-base lg:text-base xl:text-lg text-[#66656A] mb-6">
                  Spacebook's new design has improved user satisfaction and platform
                  performance. More clarity in navigation and easier onboarding have
                  enabled users to communicate faster and stay longer.
                </p>
              </div>

              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="flex-shrink-0 w-full flex flex-col md:flex-row justify-center mb-10">

                      {/* Media - Conditionally render iframe or image */}
                      <motion.div
                        className="w-full md:w-[260px] lg:w-[320px] xl:w-[365px] border border-[#D3D8DF] mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        {renderTestimonialMedia(testimonial)}
                      </motion.div>

                      {/* Text */}
                      <motion.div
                        className="w-full md:h-[413px] md:w-[calc(100%-280px)] lg:w-[calc(100%-340px)] xl:w-[642px] border-b border-x md:border-y border-[#D3D8DF] p-4 md:p-5 lg:p-7 xl:p-10 mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <h4 className="text-[20px] md:text-[19px] lg:text-[22px] xl:text-[26px] font-medium mb-6 md:mb-6 lg:mb-7 xl:mb-10">
                          {testimonial.description}
                        </h4>
                        <h4 className="text-[20px] md:text-[18px] lg:text-[19px] xl:text-[20px] font-medium">
                          {testimonial.user_name}
                        </h4>
                        <p className="text-[#66656A] text-base md:text-sm lg:text-sm xl:text-base">
                          {testimonial.company}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbouttheProject;