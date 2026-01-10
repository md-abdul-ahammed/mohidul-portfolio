'use client'
import { motion } from "framer-motion";

// তোমার SVG path ডাটা
const textPath = "../components/svg/Heading.jsx";

const PathAnimation = () => {
  return (
    <svg width="200" height="200">
      <motion.path
        d={textPath}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ stroke: "white", strokeWidth: "2px", fill: "none" }}
      />
    </svg>
  );
};

export default PathAnimation;