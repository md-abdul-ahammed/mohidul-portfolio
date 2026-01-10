// components/AnimatedHeading.jsx
'use client';

import { useEffect, useRef } from 'react';

const AnimatedHeading = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    // Get all path elements (letters) in the SVG
    const paths = svgElement.querySelectorAll('path');
    
    // Set initial state - all paths are invisible
    paths.forEach(path => {
      path.style.opacity = '0';
      path.style.strokeDasharray = path.getTotalLength() + 'px';
      path.style.strokeDashoffset = path.getTotalLength() + 'px';
    });

    // Animate each letter with a delay
    const animateLetters = () => {
      paths.forEach((path, index) => {
        setTimeout(() => {
          path.style.transition = 'opacity 0.3s ease, stroke-dashoffset 0.8s ease';
          path.style.opacity = '1';
          path.style.strokeDashoffset = '0';
        }, index * 200); // 200ms delay between letters
      });
    };

    // Start animation when component mounts
    animateLetters();
  }, []);

  return (
    <div className="animated-heading">
      <svg 
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg" 
        width="934" 
        height="327" 
        viewBox="0 0 934 327"
        className="animated-svg"
      >
        {/* Replace the image with actual text paths */}
        <path 
          d="M100,150 H120 V130 H140 V150 H160 V170 H140 V190 H120 V170 H100 V150 Z" 
          fill="currentColor"
        />
        <path 
          d="M180,130 V190 H200 V150 H220 V190 H240 V130 H220 V140 H200 V130 H180 Z" 
          fill="currentColor"
        />
        <path 
          d="M260,130 V190 H300 V170 H280 V130 H260 Z M280,150 H290 V170 H280 V150 Z" 
          fill="currentColor"
        />
        <path 
          d="M320,130 V190 H340 V150 H360 V190 H380 V130 H360 V140 H340 V130 H320 Z" 
          fill="currentColor"
        />
        <path 
          d="M400,130 V190 H440 V170 H420 V130 H400 Z M420,150 H430 V170 H420 V150 Z" 
          fill="currentColor"
        />
        {/* Continue with paths for "I'm Mohidul" */}
        <path 
          d="M480,130 V190 H500 V130 H480 Z" 
          fill="currentColor"
        />
        <path 
          d="M520,130 V150 H540 V170 H520 V190 H560 V170 H540 V150 H560 V130 H520 Z" 
          fill="currentColor"
        />
        <path 
          d="M600,130 V170 H620 V190 H640 V170 H660 V130 H640 V150 H620 V130 H600 Z M620,170 H640 V150 H620 V170 Z" 
          fill="currentColor"
        />
        <path 
          d="M700,130 V150 H720 V170 H700 V190 H740 V170 H720 V150 H740 V130 H700 Z" 
          fill="currentColor"
        />
        <path 
          d="M760,130 V190 H800 V170 H780 V130 H760 Z M780,150 H790 V170 H780 V150 Z" 
          fill="currentColor"
        />
        <path 
          d="M820,130 V170 H840 V190 H860 V170 H880 V130 H860 V150 H840 V130 H820 Z M840,170 H860 V150 H840 V170 Z" 
          fill="currentColor"
        />
        <path 
          d="M900,130 V190 H940 V170 H920 V130 H900 Z M920,150 H930 V170 H920 V150 Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default AnimatedHeading;