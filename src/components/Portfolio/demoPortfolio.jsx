"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ডেমো ডেটা - ভবিষ্যতে API থেকে replace হবে
const portfolioData = {
  title: "Portfolio®",
  description: "Explore a collection of high-quality, innovative designs crafted to elevate brands and captivate audiences. Each project reflects our commitment to creativity and excellence.",
  projects: [
    {
      id: 1,
      title: "The pixlplay studio",
      image: "/images/case/case1.png",
      width: 700,
      height: 500,
      tags: ["Design", "Branding", "Development"],
      layout: "large", // large, medium, full
      alignment: "left"
    },
    {
      id: 2,
      title: "Creative agency",
      image: "/images/case/case2.png",
      width: 448,
      height: 300,
      tags: ["Design", "Development"],
      layout: "medium",
      alignment: "right"
    },
    {
      id: 3,
      title: "E-commerce platform",
      image: "/images/case/case3.png",
      width: 700,
      height: 420,
      tags: ["Design", "Development", "E-commerce"],
      layout: "full",
      alignment: "center"
    },
    {
      id: 4,
      title: "Mobile app design",
      image: "/images/case/case4.png",
      width: 687,
      height: 450,
      tags: ["Design", "Mobile", "UX/UI"],
      layout: "large",
      alignment: "left"
    },
    {
      id: 5,
      title: "Brand identity",
      image: "/images/case/case5.png",
      width: 448,
      height: 300,
      tags: ["Branding", "Design", "Logo"],
      layout: "medium",
      alignment: "right"
    },
    {
      id: 6,
      title: "Web application",
      image: "/images/case/case6.png",
      width: 448,
      height: 300,
      tags: ["Development", "Design", "Web App"],
      layout: "medium",
      alignment: "left"
    },
    {
    id: 7,
    title: "Aurora Lights",
    image: "/images/case/case5.png",
    width: 687,
      height: 450,
    tags: ["Design", "Branding", "3D"],
    layout: "large",
    alignment: "right",
  },
    
  ]
};

const Portfolio = () => {
  const overlayAnimation = {
    initial: { y: "0%" },
    animate: { y: "100%" },
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
  };

  return (
    <div>
      <div className="md:mx-2">
        <div className="md:max-w-[1444px] px-4 mx-auto pt-12 pb-10 md:pt-[132px] md:pb-32 border-y md:border-x border-[#D3D8DF]">
          {/* title and details */}
          <div className="flex flex-col md:flex-row md:justify-between mb-10 md:mb-16">
            <h1 className="text-[#1D1C1F] text-[34px] md:text-[60px] font-medium mb-6 md:mb-0">
              {portfolioData.title}
            </h1>
            <p className="text-[#66656A] text-base md:text-lg max-w-[488px]">
              {portfolioData.description}
            </p>
          </div>

          {/* projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-[60px] md:gap-x-[228px]">
            {portfolioData.projects.map((project, index) => (
              <ProjectItem 
                key={project.id} 
                project={project} 
                index={index}
                overlayAnimation={overlayAnimation}
              />
            ))}
          </div>
        </div>

        <div>
          <center>
            <h5 className="pt-4 pb-9 md:pt-4 md:pb-4 font-medium text-base border-x border-[#D3D8DF] max-w-[1444px]">
              View All Projects
            </h5>
          </center>
        </div>
      </div>
    </div>
  );
};

// আলাদা কম্পোনেন্ট для প্রতিটি প্রজেক্ট আইটেম
const ProjectItem = ({ project, index, overlayAnimation }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // লেআউট based on project type
  const getLayoutClass = () => {
    switch (project.layout) {
      case "full":
        return "col-span-1 md:col-span-2 flex md:justify-center";
      case "large":
        return "max-w-full md:max-w-[700px]";
      case "medium":
        return "max-w-full md:flex md:justify-end";
      default:
        return "max-w-full";
    }
  };

  // ইমেজ সাইজ নির্ধারণ
  const getImageSize = () => {
    switch (project.layout) {
      case "full":
        return { width: 700, height: 500, class: "md:w-[700px] md:h-[500px]" };
      case "large":
        return { width: 700, height: 500, class: "md:w-[700px] md:h-[500px]" };
      case "medium":
        return { width: 448, height: 300, class: "md:w-[448px] md:h-[300px]" };
      default:
        return { width: 448, height: 300, class: "md:w-[448px] md:h-[300px]" };
    }
  };

  // কন্টেন্ট লেআউট
  const getContentLayout = () => {
    if (project.layout === "full") {
      return "mt-3";
    }
    return "mt-3 md:mt-0 flex flex-col md:flex-row md:justify-between md:items-center";
  };

  const imageSize = getImageSize();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={getLayoutClass()}
    >
      <div>
        <div className={`relative w-full max-w-[360px] h-[250px] ${imageSize.class} md:max-w-none mx-auto overflow-hidden`}>
          <motion.div
            className="absolute inset-0 z-10 bg-[#A6A6A6] will-change-transform"
            initial={{ y: "0%" }}
            animate={inView ? overlayAnimation.animate : overlayAnimation.initial}
            transition={overlayAnimation.transition}
          />
          <Image
            src={project.image}
            alt={project.title}
            width={imageSize.width}
            height={imageSize.height}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className={getContentLayout()}>
          <h4 className="text-[24px] md:text-[34px] mt-3 text-[#1D1C1F] font-medium leading-tight">
            {project.title}
          </h4>
          <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2 md:mt-0">
            {project.tags.map((tag, tagIndex) => (
              <p key={tagIndex} className="px-3 py-1 bg-[#EDEDEF]">
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;