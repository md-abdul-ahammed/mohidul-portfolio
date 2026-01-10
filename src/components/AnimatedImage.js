"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "", 
  imageClassName = "",
  overlayColor = "#DBE8E1",
  animationDelay = 0.2,
  threshold = 0.2,
  triggerOnce = true 
}) => {
  const [ref, inView] = useInView({ triggerOnce, threshold });

  const overlayAnimation = {
    initial: { y: "0%" },
    animate: { y: "100%" },
    transition: { duration: 1.2, ease: "easeInOut", delay: animationDelay },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          className="absolute inset-0 z-10 will-change-transform"
          style={{ backgroundColor: overlayColor }}
          initial={{ y: "0%" }}
          animate={inView ? overlayAnimation.animate : overlayAnimation.initial}
          transition={overlayAnimation.transition}
        />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${imageClassName}`}
        />
      </div>
    </motion.div>
  );
};

export default AnimatedImage;