"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// Helper function to format numbers with leading zero if less than 10
const formatNumber = (num) => {
  const numValue = typeof num === 'number' ? num : parseInt(num) || 0;
  if (numValue < 10) {
    return numValue.toString().padStart(2, '0');
  }
  return numValue.toString();
};

// Custom component to handle formatted count up with leading zeros
const FormattedCountUp = ({ inView, end, suffix, isPrimary, label }) => {
  const [displayValue, setDisplayValue] = useState(formatNumber(0));

  useEffect(() => {
    if (inView) {
      // Use a simple animation approach
      const startValue = 0;
      const duration = 2500; // 2.5 seconds
      const steps = 60;
      const increment = end / steps;
      const stepDuration = duration / steps;
      
      let current = startValue;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setDisplayValue(formatNumber(Math.floor(current)));
      }, stepDuration);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(formatNumber(end));
    }
  }, [inView, end]);

  return (
    <div className="md:text-left">
      <h1 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl text-[#1D1C1F] font-machina">
        {displayValue}

        {/* Main suffix character (% or M) */}
        <span className={isPrimary ? "text-[#1D1C1F]" : "text-[#9E9BA4]"}>
          {suffix.replace("+", "") === "%"
            ? "%"
            : suffix.replace("+", "")}
        </span>

        {/* + sign always gray */}
        {suffix.includes("+") && (
          <span className="text-[#9E9BA4]">+</span>
        )}
      </h1>

      <h3 className="text-sm md:text-sm lg:text-sm xl:text-base text-[#66656A]">{label}</h3>
    </div>
  );
};

const InNumbers = ({
  projects = 0,
  experience = 0,
  revenue = 0,
  satisfaction = 0,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const items = [
    { end: projects, label: "Projects", suffix: "+" },
    { end: experience, label: "Years", suffix: "+" },
    { end: revenue, label: "Raised Revenue", suffix: "M+" },
    { end: satisfaction, label: "Client Satisfaction", suffix: "%+" },
  ];

  return (
    <section
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-6 lg:gap-y-7 xl:gap-y-8 gap-x-4 md:gap-x-3 lg:gap-x-3 xl:gap-x-4 mt-6 mb-5 md:mb-0"
    >
      {items.map((item, i) => {
        const suffix = item.suffix.trim();
        const isPrimary = suffix === "%+" || suffix === "M+";

        return (
          <FormattedCountUp
            key={i}
            inView={inView}
                  end={item.end}
            suffix={suffix}
            isPrimary={isPrimary}
            label={item.label}
          />
        );
      })}
    </section>
  );
};

export default InNumbers;
