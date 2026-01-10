"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import WhatsApp from "../svg/commons/WhatsApp";
import Image from "next/image";
import InNumbers from "../InNumbers/InNumbers";
import AnimatedImage from "../AnimatedImage";
import AnimatedButton from "../AnimatedButtons";
import { API_ENDPOINTS } from "@/config/api";

const AboutMe = () => {
  const containerRef = useRef(null);

  const [aboutData, setAboutData] = useState({
    about_text: "",
    projects: 0,
    experience: 0,
    revenue: 0,
    satisfaction: 0,
    cv_file: "",
    about_video: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.ABOUT_ME);

        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        console.log("Fetched Data:", data);

        if (data?.success && data?.about_me) {
          setAboutData({
            about_text: data.about_me.about_text || "",
            projects: data.about_me.projects || 0,
            experience: data.about_me.experience || 0,
            revenue: data.about_me.revenue || 0,
            satisfaction: data.about_me.satisfaction || 0,
            cv_file: data.about_me.cv_file || "",
            about_video: data.about_me.about_video || ""
          });
        } else {
          console.warn("No valid about_me data found:", data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Intersection Observer for triggering animations
  const { ref: textRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Mobile text ref
  const { ref: mobileTextRef, inView: mobileInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smoother and faster color transition
  const colorProgress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const words = aboutData.about_text?.split(" ");

  const MAX_WORDS = 100;
  const wordColors = Array.from({ length: MAX_WORDS }, (_, index) => {
    const wordProgress = index / MAX_WORDS;
    const start = Math.max(0, wordProgress - 0.15);
    const end = Math.min(1, wordProgress + 0.15);

    return useTransform(
      colorProgress,
      [start, end],
      ["#9CA9A9", "#1D1C1F"]
    );
  });

  const getWordColor = (index) => {
    return wordColors[index];
  };

  // Animation variants for smooth bottom-to-top animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.03,
        ease: "easeOut",
      },
    }),
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="md:mx-2 px-4  md:px-0 flex items-center">
        <motion.div
          className="max-w-[1444px] py-6 md:py-12 border-[#D3D8DF] md:border-x mx-auto w-full"
          variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row md:gap-6 lg:gap-12 xl:gap-16 md:justify-between items-center md:px-4 lg:px-5 xl:px-6 md:pt-10 lg:pt-12 xl:pt-16 md:pb-10 lg:pb-12 xl:pb-16">
            {/* Left Column */}
            <motion.div className="w-full md:w-auto" variants={containerVariants}>
              {/* title */}
              <motion.div
                className="font-medium text-lg md:text-lg lg:text-xl xl:text-2xl text-[#1D1C1F] mb-4 md:mb-6 text-left"
                variants={fadeInUp}
              >
                <motion.h1
                  className="flex gap-[16px] md:gap-[16px] lg:gap-[18px] xl:gap-[20px] items-center"
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div transition={{ type: "spring", stiffness: 300 }}>
                    <PiArrowElbowDownRightFill className="md:size-7 lg:size-7 xl:size-8" />
                  </motion.div>
                  ABOUT ME-
                </motion.h1>
              </motion.div>

              {/* image or video */}
              <motion.div className="mb-4 md:mb-6 w-full" variants={fadeInUp}>
                {aboutData.about_video ? (
                  <video
                    src={aboutData.about_video}
                    className="w-full h-[300px] md:h-[380px] lg:h-[420px] xl:h-[447px] object-cover"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      display: "block",
                    }}
                    controls
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <AnimatedImage
                    src={"/images/aboutMe/myimg.svg"}
                    alt="Mohidul - UI/UX Designer"
                    width={473}
                    height={447}
                    className="w-full md:w-[320px] lg:w-[400px] xl:w-[473px] h-auto"
                    animationDelay={0.1}
                  />
                )}
              </motion.div>

              {/* 2-buttons */}
              <motion.div className="grid gap-0 md:gap-2 w-full" variants={fadeInUp}>
                <AnimatedButton
                  label="Chat With me"
                  icon={<WhatsApp />}
                  textColor="text-white"
                  className="w-full md:w-[320px] lg:w-[400px] xl:w-[473px] py-4 bg-[#27B43E] text-white text-center cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden"
                  onClick={() => window.open("https://wa.me/8801710055978", "_blank")}
                />

                <AnimatedButton
                  label={"Download CV"}
                  className="w-full md:w-[320px] lg:w-[400px] xl:w-[473px] py-4 border border-[#D3D8DF] text-center cursor-pointer relative overflow-hidden"
                  onClick={() => aboutData.cv_file && window.open(aboutData.cv_file, "_blank")}
                />
              </motion.div>

              {/* Mobile text - shows below buttons with same animation as desktop */}
              <motion.div
                ref={mobileTextRef}
                className="md:hidden mt-6 text-base font-medium text-[#1D1C1F] leading-relaxed"
                variants={fadeInUp}
              >
                <h3 className="text-left leading-tight">
                  {words?.map((word, index) => (
                    <React.Fragment key={index}>
                      <motion.span
                        style={{
                          color: getWordColor(index),
                        }}
                        className="inline-block mr-2"
                        custom={index}
                        variants={wordAnimation}
                        initial={{ opacity: 0.5 }}
                        animate={mobileInView ? { opacity: 1 } : { opacity: 0.5 }}
                      >
                        {word}
                      </motion.span>
                    </React.Fragment>
                  ))}
                </h3>
              </motion.div>

              {/* Mobile Experiences Section */}
              <motion.div className="md:hidden mt-8" variants={fadeInUp}>
                <motion.div className="text-xl font-bold text-[#1D1C1F] mb-4" variants={itemAnimation}>
                  <h3>Experiences</h3>
                </motion.div>

                <motion.div variants={containerVariants}>
                  {[
                    {
                      role: "Lead UI/UX Designer",
                      company: "Dino Code LA",
                      period: "Feb 2021 - Present",
                    },
                    {
                      role: "UI/UX Designer",
                      company: "VGC IT. Inc.",
                      period: "Feb 2021 - Oct 2023",
                    },
                    {
                      role: "Sr. UI Designer",
                      company: "Najm Consultant",
                      period: "Feb 2021 - Jan 2023",
                    },
                    {
                      role: "UI/UX Intern",
                      company: "Just Creative Studio",
                      period: "Jan 2019 - Dec 2019",
                    },
                    {
                      role: "Game UI Designer",
                      company: "Business App Station",
                      period: "June 2015 - April 2017",
                    },
                  ].map((item, index) => {
                    const [startDate, endDate] = item.period.split(" - ");
                    return (
                      <motion.div
                        key={index}
                        className={`grid grid-cols-3 items-center border-b border-dashed border-[#9CA9A9] ${
                          index === 0 ? "border-t border-dashed" : ""
                        } py-3 text-sm group`}
                        variants={itemAnimation}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          delay: index * 0.1,
                        }}
                        whileHover={{
                          backgroundColor: "rgba(156, 169, 169, 0.05)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <motion.h1 className="text-nowrap text-xs">{item.role}</motion.h1>
                        <motion.h1 className="text-nowrap text-xs text-center">{item.company}</motion.h1>
                        <motion.div className="text-xs text-right flex flex-col">
                          <motion.h1>{startDate}</motion.h1>
                          <motion.h1>- {endDate}</motion.h1>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Mobile Stats Section */}
              <motion.div className="md:hidden mt-8" variants={fadeInUp} transition={{ delay: 0.4 }}>
                <InNumbers
                  projects={aboutData.projects}
                  experience={aboutData.experience}
                  revenue={aboutData.revenue}
                  satisfaction={aboutData.satisfaction}
                />
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div className="hidden md:block w-full md:w-auto" variants={containerVariants}>
              {/* main-text (desktop) with enhanced scroll-based color animation */}
              <motion.div
                ref={textRef}
                className="text-[20px] md:text-[20px] lg:text-[26px] xl:text-[30px] font-medium text-[#1D1C1F] sm:block hidden md:text-left mb-8 md:mb-0"
                variants={fadeInUp}
              >
                <h3 className="leading-tight">
                  {words?.map((word, index) => (
                    <React.Fragment key={index}>
                      <motion.span
                        style={{
                          color: getWordColor(index, words?.length),
                        }}
                        className="inline-block mr-2"
                        custom={index}
                        variants={wordAnimation}
                        initial={{ opacity: 0.5 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0.5 }}
                      >
                        <span className={index === 0 ? "pl-22" : "0"}>{word}</span>
                      </motion.span>
                    </React.Fragment>
                  ))}
                </h3>
              </motion.div>

              {/* table with enhanced animations */}
              <motion.div variants={fadeInUp}>
                <motion.div
                  className="md:text-lg lg:text-xl xl:text-2xl text-xl font-bold text-[#1D1C1F] mt-7 mb-4"
                  variants={itemAnimation}
                >
                  <h3>Experiences</h3>
                </motion.div>

                <motion.div variants={containerVariants}>
                  {[
                    {
                      role: "Lead UI/UX Designer",
                      company: "Dino Code LA",
                      period: "Feb 2021 - Present",
                    },
                    {
                      role: "UI/UX Designer",
                      company: "VGC IT. Inc.",
                      period: "Feb 2021 - Oct 2023",
                    },
                    {
                      role: "Sr. UI Designer",
                      company: "Najm Consultant",
                      period: "Feb 2021 - Jan 2023",
                    },
                    {
                      role: "UI/UX Intern",
                      company: "Just Creative Studio",
                      period: "Jan 2019 - Dec 2019",
                    },
                    {
                      role: "Game UI Designer",
                      company: "Business App Station",
                      period: "June 2015 - April 2017",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`grid grid-cols-3 items-center border-b border-dashed border-[#9CA9A9] ${
                        index === 0 ? "border-t border-dashed" : ""
                      } py-3 text-sm md:text-sm lg:text-base xl:text-lg group`}
                      variants={itemAnimation}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        backgroundColor: "rgba(156, 169, 169, 0.05)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.h1 className="text-nowrap md:text-xs lg:text-sm xl:text-base">{item.role}</motion.h1>
                      <motion.h1 className="text-nowrap md:text-xs lg:text-sm xl:text-base">{item.company}</motion.h1>
                      <motion.h1 className="ml-11 md:ml-0 md:text-xs lg:text-sm xl:text-base">{item.period}</motion.h1>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* in-numbers */}
              <motion.div variants={fadeInUp} transition={{ delay: 0.4 }}>
                <InNumbers
                  projects={aboutData.projects}
                  experience={aboutData.experience}
                  revenue={aboutData.revenue}
                  satisfaction={aboutData.satisfaction}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle background animation elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-1 h-1 bg-[#27B43E] rounded-full opacity-40"
        animate={{
          y: [0, -30, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default AboutMe;