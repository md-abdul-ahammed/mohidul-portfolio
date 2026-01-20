"use client";
import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

const MyWorkProcess = () => {
  const cards = [
    {
      title: "Step- 01",
      subtitle: "Understanding needs with a focused project overview",
      image: "/images/MyWorkProcess/business-deal.svg",
      heading: "Initial Consultation",
      description:
        "Understanding your goals, challenges, and expectations to ensure the project starts with full clarity and direction",
      rotate: "-6deg",
    },
    {
      title: "Step- 02",
      subtitle: "A quick review of the current product to identify issues",
      image: "/images/MyWorkProcess/filling-survey.svg",
      heading: "Audit Existing Design",
      description:
        "Reviewing the current interface to identify pain points, gaps, and areas that need improvement for a smoother experience",
      rotate: "6deg",
    },
    {
      title: "Step- 03",
      subtitle: "Shaping clear insights that guide the design direction",
      image: "/images/MyWorkProcess/designer-working.svg",
      heading: "Research & Planning",
      description:
        "Exploring user needs, market standards, and functional requirements to shape a plan that supports the project's purpose",
      rotate: "-6deg",
    },
    {
      title: "Step- 04",
      subtitle: "Structuring core layouts for smooth user interaction",
      image: "/images/MyWorkProcess/designer-desk.svg",
      heading: "Wireframe",
      description:
        "Mapping out the core layout and user flow to establish structure, usability, and how each screen should guide the user",
      rotate: "6deg",
    },
    {
      title: "Step- 05",
      subtitle: "A new way of a meaningful socialization platform",
      image: "/images/MyWorkProcess/fitness-app.svg",
      heading: "Delivery & Support",
      description:
        "Providing final files with clear guidance, plus ongoing support to ensure the design works smoothly after handoff",
      rotate: "-6deg",
    },
  ];

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const x = useMotionValue(0);
  const maxScroll = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.offsetWidth;
        maxScroll.current = contentWidth - containerWidth;

        setDragConstraints({
          left: -(contentWidth - containerWidth),
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, [cards.length]);

  const handleMouseMove = (event) => {
    if (isMobile) return; // Skip mouse move on mobile

    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerRect = containerRef.current.getBoundingClientRect();

      const mouseX = event.clientX - containerRect.left;
      const percentage = Math.max(0, Math.min(1, mouseX / containerWidth));

      const easePercentage = easeInOutCubic(percentage);
      const newX = -easePercentage * maxScroll.current;

      x.set(newX);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Skip on mobile

    animate(x, 0, {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6,
    });
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return (
    <div className="md:mx-2">
      <div className="bg-black overflow-hidden md:max-w-[1444px] mx-auto flex flex-col items-center justify-center py-12 md:py-20 lg:py-26 xl:py-32">
        <div className="text-white text-center mb-[80px] md:mb-[90px] lg:mb-[105px] xl:mb-[115px] px-4">
          <motion.h1
            className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-medium"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            My Work Process
          </motion.h1>

          <motion.p
            className="text-base md:text-base lg:text-base xl:text-lg mt-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            An overview of how ideas are shaped through my design process into
            practical outcomes.
          </motion.p>
          <motion.p
            className="text-base md:text-base lg:text-base xl:text-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            Each project highlights the thought, effort, and purpose behind my work.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="flex w-full cursor-grab active:cursor-grabbing"
          style={{ maxWidth: "1424px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={contentRef}
            className="flex flex-row items-center gap-0 px-4"
            style={{ x }}
            drag={isMobile ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-4 md:p-5 lg:p-5 xl:p-6 w-[360px] md:w-[380px] lg:w-[410px] xl:w-[435px] flex-shrink-0 bg-white ring-[white]/30 ring-8 relative mx-4 md:mx-0 ${
                  index % 2 === 0 ? "rotate-[-6deg]" : "rotate-[6deg]"
                } ${
                  index === 2
                    ? "shadow-[0_2px_8px_-1px_rgba(20,28,46,0.08)]"
                    : ""
                } ${index === 1 ? "md:-top-[28px] lg:-top-[32px] xl:-top-[35px]" : ""}`}
              >
                <h3 className="text-xl md:text-xl lg:text-xl xl:text-2xl font-medium pb-1">{card.title}</h3>
                <p className="text-sm md:text-sm lg:text-base xl:text-base text-[#66656A] pb-[14px] md:pb-[15px] lg:pb-[16px] xl:pb-[17px]">
                  {card.subtitle}
                </p>
                <div className="bg-[#D3D8DF] w-full h-[1px] mb-[14px] md:mb-[15px] lg:mb-[16px] xl:mb-[17px]"></div>
                <Image
                  src={card.image}
                  alt={card.title}
                  width={500}
                  height={179}
                  className="bg-[#F7F7F7] w-full h-[150px] md:h-[160px] lg:h-[170px] xl:h-[179px]"
                />
                <div className="bg-[#D3D8DF] w-full h-[1px] mt-[14px] md:mt-[15px] lg:mt-[16px] xl:mt-[17px]"></div>
                <h3 className="text-xl md:text-xl lg:text-xl xl:text-2xl font-medium pt-[14px] md:pt-[15px] lg:pt-[16px] xl:pt-[17px]">
                  {card.heading}
                </h3>
                <p className="text-sm md:text-sm lg:text-base xl:text-base text-[#66656A] pt-1.5">
                  {card.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyWorkProcess;
