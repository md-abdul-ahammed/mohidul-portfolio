"use client";

import { useRef, useEffect, createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Context to provide scroll position
const LocomotiveContext = createContext({
  scrollY: 0,
  scrollDirection: "down",
});

export const useLocomotiveScroll = () => useContext(LocomotiveContext);

export default function ScrollProvider({ children }) {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const pathname = usePathname();

  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollDirection: "down",
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const LocomotiveScroll = require("locomotive-scroll").default;

    // destroy previous instance if exists
    if (scrollRef.current) scrollRef.current.destroy();

    scrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.08,
      multiplier: 1,
      getDirection: true,
    });

    // Listen for scroll events
    scrollRef.current.on("scroll", (obj) => {
      setScrollData({
        scrollY: obj.scroll.y,
        scrollDirection: obj.direction,
      });
    });

    // Update scroll on images load
    const imgs = containerRef.current.querySelectorAll("img");
    imgs.forEach((img) =>
      img.addEventListener("load", () => scrollRef.current.update())
    );

    const handleResize = () => scrollRef.current.update();
    window.addEventListener("resize", handleResize);

    return () => {
      scrollRef.current.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  return (
    <LocomotiveContext.Provider value={scrollData}>
      <div ref={containerRef} data-scroll-container>
        {children}
      </div>
    </LocomotiveContext.Provider>
  );
}
