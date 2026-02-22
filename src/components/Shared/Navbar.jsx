"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import AnimatedButton from "../AnimatedButtons";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { API_ENDPOINTS } from "@/config/api";

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScroll = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - lastScrollY) > 5
      ) {
        setScrollDirection(direction);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
};
const NAV_ITEMS = ["HOME", "WORKS", "CONTACT", "MY BLOGS"];

const getNavHref = (item) => {
  const routes = {
    HOME: "/",
    WORKS: "/case",
    CONTACT: "/contact",
    "MY BLOGS": "/my-blogs", // ✅ wrap it in quotes
  };

  return routes[item] || "#";
};

const navVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  hidden: {
    y: "-100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { scrollDirection, scrollY } = useScrollDirection();
  const router = useRouter();
  const pathname = usePathname();

  const isHidden = scrollDirection === "down" && scrollY > 100;

  const [aboutData, setAboutData] = useState({
    cv_file: "",
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.ABOUT_ME);

        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        // console.log("Fetched Data:", data);

        if (data?.success) {
          setAboutData({
            cv_file: data.about_me.cv_file || "",
          });
        } else {
          console.warn("No valid about_me data found:", data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAboutData();
  }, []);

  // Helper function to check if nav item is active
  const isNavItemActive = (item) => {
    const href = getNavHref(item);
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white"
      variants={navVariants}
      animate={isHidden ? "hidden" : "visible"}
      initial="visible"
    >
      <div className="w-full border-b border-[#D3D8DF]">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center">
          <div className="flex items-center text-sm mt-2">
            <Link href="/">
              <Image
                src="/images/navbar/logo.svg"
                alt="logo"
                width={198}
                height={64}
                className="md:w-[150px] lg:w-[180px] xl:w-[198px] h-16 md:px-4 lg:px-4 xl:px-4 border-t border-l border-[#D3D8DF] cursor-pointer"
              />
            </Link>

            <div className="md:w-[240px] lg:w-[300px] xl:w-[382px] h-16 md:px-4 lg:px-5 xl:px-6 py-2.5 font-medium border-l border-t border-[#D3D8DF] cursor-pointer relative overflow-hidden group">
              <h3
                className={`md:text-[11px] md:leading-tight lg:text-xs xl:text-sm transition-colors duration-200 ${
                  hoveredItem === "portfolio"
                    ? "text-black translate-x-0.5"
                    : ""
                }`}
              >
                PERSONAL
                <br />
                PORTFOLIO WEBSITE
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-600 group-hover:translate-x-full -translate-x-full" />
            </div>

            <div className="w-[auto] h-16 border-l border-t border-[#D3D8DF] py-[21px]">
              <ul className="flex md:gap-3 lg:gap-5 xl:gap-10 md:mx-3 lg:mx-5 xl:mx-10 items-center">
                {NAV_ITEMS.map((item) => {
                  const isActive = isNavItemActive(item);
                  return (
                    <li
                      key={item}
                      className="cursor-pointer relative group/navitem"
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Link href={getNavHref(item)}>
                        <span className="block transition-all duration-200 md:text-[11px] lg:text-sm xl:text-base whitespace-nowrap">
                          {item}
                        </span>
                      </Link>
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[2px] bg-black transition-transform duration-300 origin-center ${
                          isActive || hoveredItem === item
                            ? "scale-x-100"
                            : "scale-x-0"
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="md:w-[240px] lg:w-[300px] xl:w-[407px] h-16 border-t border-l border-r border-[#D3D8DF] overflow-hidden">
              <div className="h-full flex flex-col">
                <AnimatedButton
                  label="DOWNLOAD CV"
                  onClick={() =>
                    aboutData.cv_file &&
                    window.open(aboutData.cv_file, "_blank")
                  }
                />
                <div className="w-full border-t border-[#D3D8DF]" />
                <AnimatedButton
                  label="BOOK A CALL"
                  onClick={() => router.push("/book-a-call")}
                  isActive={pathname === "/book-a-call"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between h-[56px] px-4 border-b border-[#D3D8DF]">
          <Link href={"/"}>
            <Image
              src="/images/navbar/logo.svg"
              alt="logo"
              width={91}
              height={24}
              className="w-[91px] h-[24px] cursor-pointer active:scale-95 transition-transform"
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 hover:scale-110 active:scale-90 transition-transform"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} />
            ) : (
              <div className="flex flex-col gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="block w-6 h-[3px] bg-black rounded"
                  />
                ))}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden"
          >
            <div className="fixed top-[56px] left-0 right-0 bottom-0 z-50 flex flex-col bg-white">
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-[24px] border-x border-b border-[#D3D8DF] p-4 mx-4">
                  {NAV_ITEMS.map((item) => {
                    const isActive = isNavItemActive(item);
                    return (
                      <div
                        key={item}
                        className={`border-b border-[#D3D8DF] pb-2 hover:translate-x-1 transition-transform duration-200 ${
                          isActive ? "font-bold" : ""
                        }`}
                      >
                        <Link
                          href={getNavHref(item)}
                          onClick={() => setIsOpen(false)}
                        >
                          {item}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mx-4 mb-4">
                <AnimatedButton
                  label="DOWNLOAD CV"
                  onClick={() =>
                    aboutData.cv_file &&
                    window.open(aboutData.cv_file, "_blank")
                  }
                />
                <div className="w-full border-t border-[#D3D8DF]" />
                <AnimatedButton
                  label="BOOK A CALL"
                  onClick={() => router.push("/book-a-call")}
                  isActive={pathname === "/book-a-call"}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
