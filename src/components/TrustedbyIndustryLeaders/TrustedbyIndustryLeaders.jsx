"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../AnimatedButtons";
import AnimatedImage from "../AnimatedImage";
import Image from "next/image";
import { API_ENDPOINTS } from "@/config/api";

// SVG components are now defined directly in the file
const Arrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Arrow2 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// FadeInUp animation variant
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TrustedbyIndustryLeaders = ({ border, hidden, grouthBox, padding }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.TESTIMONIALS);

        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }

        const data = await response.json();

        if (data.success && data.testimonials && data.testimonials.length > 0) {
          // Transform API data to match the existing component structure
          const transformedTestimonials = data.testimonials.map(testimonial => ({
            image: testimonial.media_url,
            mediaType: testimonial.media_type,
            quote: testimonial.description,
            name: testimonial.user_name,
            title: testimonial.company,
            metrics: {
              value: `${testimonial.growth}X`,
              trend: "/images/indrustyLeader/TrendUp.svg",
              text: "Business Growth",
              description: testimonial.growth_description,
            },
          }));

          setTestimonials(transformedTestimonials);
        } else {
          throw new Error('No testimonials found');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000); // change 5000 to whatever delay in ms you want (5s here)

    return () => clearInterval(interval); // clean up on unmount
  }, [testimonials]);

  const goToNextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }
  };

  const goToPrevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="md:mx-2 border-b md:border-0 border-[#D3D8DF]">
        <div className="md:border border-[#D3D8DF] md:max-w-[1444px] mx-auto">
          <div className="px-4 py-12 md:px-6 md:py-32">
            <div className="text-center">
              <p className="text-[#66656A] text-base md:text-lg">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="md:mx-2 border-b md:border-0 border-[#D3D8DF]">
        <div className="md:border border-[#D3D8DF] md:max-w-[1444px] mx-auto">
          <div className="px-4 py-12 md:px-6 md:py-32">
            <div className="text-center">
              <p className="text-[#66656A] text-base md:text-lg">Error loading testimonials: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (testimonials.length === 0) {
    return (
      <div className="md:mx-2 border-b md:border-0 border-[#D3D8DF]">
        <div className="md:border border-[#D3D8DF] md:max-w-[1444px] mx-auto">
          <div className="px-4 py-12 md:px-6 md:py-32">
            <div className="text-center">
              <p className="text-[#66656A] text-base md:text-lg">No testimonials available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:mx-2 border-b md:border-0 border-[#D3D8DF]">
      <div className={`md:border border-[#D3D8DF] md:max-w-[1444px] mx-auto ${border}`}>
        <div className={`px-4 py-12 md:px-4 lg:px-5 xl:px-6 md:py-20 lg:py-26 xl:py-32 ${padding}`}>
          <div className="text-center mb-8 md:mb-10 lg:mb-11 xl:mb-12">
            <motion.h1
              className={`text-[34px] md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4  ${hidden}`}
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Trusted by Industry Leaders
            </motion.h1>
            <motion.p
              className={`text-[#66656A] text-base md:text-base lg:text-base xl:text-lg ${hidden}`}
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              Fieldguide is the modern, award-winning platform that powers{" "}
              <br className="hidden md:block" />
              many of the largest advisory and{" "}
              <br className="block md:hidden" />
              audit firms.
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex flex-col md:flex-row justify-center mb-10"
                >
                  {/* Image/Iframe Box */}
                  <motion.div
                    className="w-full md:w-[280px] lg:w-[320px] xl:w-[365px] border border-[#D3D8DF] mx-auto"
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  >
                    {slide.mediaType === 'iframe' ? (
                      <iframe
                        src={`${slide.image}?autoplay=1&muted=1&controls=0&loop=1`}

                        width={365}
                        height={413}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={slide.name}
                      ></iframe>
                    ) : (
                      <AnimatedImage
                        src={slide.image}
                        alt={slide.name}
                        width={365}
                        height={413}
                        className="w-full h-full object-cover"
                        animationDelay={0.1}
                      />
                    )}
                  </motion.div>

                  {/* Text Box */}
                  <motion.div
                    className="w-full md:h-[413px] md:w-[420px] lg:w-[520px] xl:w-[642px] border-b border-x md:border-y border-[#D3D8DF] p-4 md:p-5 lg:p-7 xl:p-10 mx-auto"
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  >
                    <h4 className="text-[20px] md:text-[17px] lg:text-[20px] xl:text-[26px] font-medium mb-6 md:mb-6 lg:mb-7 xl:mb-10 leading-tight">
                      {slide.quote}
                    </h4>
                    <h4 className="text-[20px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-medium">{slide.name}</h4>
                    <p className="text-[#66656A] text-base md:text-[13px] lg:text-sm xl:text-base">{slide.title}</p>
                  </motion.div>

                  {/* Growth Box (hidden on mobile) */}
                  <motion.div
                    className={`hidden md:flex flex-col md:w-[280px] lg:w-[320px] xl:w-[369px] h-[413px] border-r border-y border-[#D3D8DF] md:p-6 lg:p-8 xl:p-10 ${grouthBox}`}
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  >
                    <div className="flex gap-1.5">
                      <h1 className="md:text-[70px] lg:text-[85px] xl:text-[96px] font-medium">
                        {slide.metrics.value}
                      </h1>
                      <Image
                        src={slide.metrics.trend}
                        alt="Trend"
                        width={24}
                        height={24}
                        className="relative md:bottom-4 lg:bottom-5 xl:bottom-6"
                        priority
                      />
                    </div>
                    <h3 className="md:mt-4 lg:mt-5 xl:mt-6 mb-2 md:text-lg lg:text-xl xl:text-2xl font-medium">
                      {slide.metrics.text}
                    </h3>
                    <p className="text-[#66656A] md:text-sm lg:text-sm xl:text-base">
                      {slide.metrics.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* button */}
          <motion.div
            className={`flex justify-center items-center w-full mt-10 ${hidden}`}
            variants={fadeInUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Previous Slide */}
            <button
              onClick={goToPrevSlide}
              className="cursor-pointer border-y border-l h-[60px] w-[60px] flex items-center justify-center border-[#D3D8DF] 
             active:scale-95 active:bg-gray-100 transition-transform duration-150"
            >
              <AnimatedButton
                icon={<Arrow className=" hover:text-[white]" />}
                textColor="white"
                className="cursor-pointer border-y border-l h-[60px] w-[60px] flex items-center justify-center border-[#D3D8DF] 
             active:scale-95 active:bg-gray-100 transition-transform duration-150"
              />
            </button>

            {/* Slide Preview Lines */}
            <div className="border h-[60px] px-6 border-[#D3D8DF] flex items-center justify-center gap-2">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`h-[1px] w-[14px] rounded transition-colors duration-300 cursor-pointer ${currentSlide === index ? "bg-[#34C779]" : "bg-gray-500"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>

            {/* Next Slide */}
            <button
              onClick={goToNextSlide}
              className="cursor-pointer border-y border-r h-[60px] w-[60px] flex items-center justify-center border-[#D3D8DF]  
             active:scale-95 active:bg-gray-100 transition-transform duration-150"
            >
              <AnimatedButton
                icon={<Arrow2 className=" hover:text-[white]" />}
                textColor="#66656A"
                className="cursor-pointer border-y border-r h-[60px] w-[60px] flex items-center justify-center border-[#D3D8DF]  
                        active:scale-95 active:bg-gray-100 transition-transform duration-150"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustedbyIndustryLeaders;