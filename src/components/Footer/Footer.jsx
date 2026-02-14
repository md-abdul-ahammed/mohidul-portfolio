"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Insta from "../svg/commons/insta";
import Linkdin from "../svg/commons/linkdin";
import Dribb from "../svg/commons/Dribb";
import Brhance from "../svg/commons/Brhance";
import WhatsApp from "../svg/commons/WhatsApp";
import Link from "next/link";
import AnimatedButton from "../AnimatedButtons";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/config/api";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [socialLinks, setSocialLinks] = useState(null);
  const router = useRouter();
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
  // Fetch gallery images from API
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FOOTER_GALLERY);
        const data = await response.json();

        if (data.success && data.footer_gallery) {
          // Extract image URLs from the API response
          const images = data.footer_gallery.map(item => item.image);
          setGalleryImages(images);
        }
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        // Fallback to default images if API fails
        setGalleryImages([
          "/images/footer/image1.png",
          "/images/footer/image2.png",
          "/images/footer/image3.png",
          "/images/footer/image4.png",
        ]);
      }
    };



    // Fetch social links from API
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('https://api.mohidul.me/GET/index.php');
        const data = await response.json();

        if (data.success && data.hero_section && data.hero_section.social) {
          setSocialLinks(data.hero_section.social);
        }
      } catch (error) {
        console.error("Failed to fetch social links:", error);
      }
    };

    fetchGalleryImages();
    fetchSocialLinks();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@mohidul.me");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  // Fallback images in case API doesn't return data
  const defaultImgs = [
    "/images/footer/image1.png",
    "/images/footer/image2.png",
    "/images/footer/image3.png",
    "/images/footer/image4.png",
  ];

  // Use API images if available, otherwise use fallback
  const displayImages = galleryImages.length > 0 ? galleryImages : defaultImgs;

  // Default social links in case API fails
  const defaultSocialLinks = [
    {
      href: "https://www.instagram.com/thisismohidul/",
      component: <Insta />,
      alt: "instagram",
    },
    {
      href: "https://wa.me/8801710055978",
      component: <WhatsApp />,
      alt: "whatsapp",
    },
    {
      href: "https://www.linkedin.com/in/thisismohidul/",
      component: <Linkdin />,
      alt: "linkedin",
    },
    {
      href: "https://dribbble.com/thisismohidul",
      component: <Dribb />,
      alt: "dribbble",
    },
    {
      href: "https://www.behance.net/thisismohidul",
      component: <Brhance />,
      alt: "behance",
    },
  ];

  // Use API social links if available, otherwise use fallback
  const socialLinksToUse = socialLinks ? [
    {
      href: socialLinks.instagram,
      component: <Insta />,
      alt: "instagram",
    },
    {
      href: "https://wa.me/8801710055978",
      component: <WhatsApp />,
      alt: "whatsapp",
    },
    {
      href: socialLinks.linkedin,
      component: <Linkdin />,
      alt: "linkedin",
    },
    {
      href: socialLinks.facebook, // Note: API returns dribbble as facebook key
      component: <Dribb />,
      alt: "dribbble",
    },
    {
      href: socialLinks.twitter, // Note: API returns behance as twitter key
      component: <Brhance />,
      alt: "behance",
    },
  ] : defaultSocialLinks;

  return (
    <div className="md:mx-2 relative">
      <div className="bg-black text-center md:max-w-[1444px] mx-auto">
        {/* top section */}
        <div className="flex justify-between items-center px-4 pt-12 md:px-4 lg:px-5 xl:px-6 md:pt-10 lg:pt-12 xl:pt-16">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={copyEmail}>
            <h5 className="text-white text-base md:text-base lg:text-lg xl:text-xl">Copy email</h5>
            <Image
              src="/images/footer/copy.svg"
              alt="copy"
              width={24}
              height={24}
              className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px]"
            />
          </div>

          <div>
            <div className="md:flex h-[53px] flex-col text-left">
              <h6 className="text-sm text-white">Social Link</h6>
              <div className="flex border border-[#D3D8DF] w-fit">
                {socialLinksToUse.map((social, index, array) => (
                  <a
                    key={social.alt}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-[5px] border-r border-[#D3D8DF] flex items-center justify-center last:border-r-0 transition-all duration-200 ease-out group "
                  >
                    <div className="transition-transform duration-200 ease-out group-hover:scale-110 group-hover:opacity-90">
                      {social.component}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* background images with infinite slide */}
        <div className="relative pb-[5px] overflow-hidden">
          <div className="absolute inset-0 footer-bg-animate items-end px-2">
            {displayImages.map((src, i) => (
              <Image
                key={`row1-${i}`}
                src={src}
                alt={`bg-${i}`}
                width={687}
                height={450}
                className="w-full max-w-[340px] h-[100px] md:h-[120px] lg:h-[140px] xl:h-[156px] object-cover"
              />
            ))}
            {displayImages.map((src, i) => (
              <Image
                key={`row2-${i}`}
                src={src}
                alt={`bg-dup-${i}`}
                width={687}
                height={450}
                className="w-full max-w-[340px] h-[100px] md:h-[120px] lg:h-[140px] xl:h-[156px] object-cover"
              />
            ))}
          </div>

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* email text */}
          <div className="relative z-10">
            <h1 className="text-[42px] mt-10 md:mt-0 px-4 sm:text-[44px] md:text-[3.5rem] lg:text-[5.5rem] xl:text-[10.875rem] font-medium text-white text-center relative bottom-6 md:bottom-6 lg:bottom-8 xl:bottom-10 break-all md:break-normal">
              hello@mohidul.me
            </h1>
          </div>
        </div>

        {/* footer nav */}
        <div className="text-white text-sm grid md:grid-cols-2 grid-cols-1 items-center w-full border-t border-[#676667]">
          <div className="border-x border-[#676667] md:border-0">
            <ul className="flex justify-evenly text-[12px] md:text-[11px] lg:text-xs xl:text-sm p-4 md:p-0">
              {["HOME", "WORKS", "CONTACT", "MY BLOGS"].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer relative group/navitem"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={
                      item === "HOME"
                        ? "/"
                        : item === "WORKS"
                        ? "/case"
                        : item === "CONTACT"
                        ? "/contact"
                        : item === "MY BLOGS"
                        ? "/my-blogs"
                        : "#"
                    }
                  >
                    <span className="block transition-all duration-200">{item}</span>
                  </Link>

                  {/* Underline animation */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[white] transition-transform duration-300 origin-center ${
                      hoveredItem === item ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-r border-[#676667] md:border-0">
            <ul className="text-center">
              <li className="">
                <AnimatedButton
                  textColor="white"
                  bgColor="white"
                  className="border-l border-[#676667] pt-[7px] pb-1"
                  hoverTextColor="text-black"
                  label="DOWNLOAD CV"
                  onClick={() => aboutData.cv_file && window.open(aboutData.cv_file, "_blank")}
                />
              </li>
              <li className="">
                <AnimatedButton
                  textColor="white"
                  bgColor="white"
                  className="border-t border-l border-[#676667] pt-1 pb-[7px]"
                  hoverTextColor="text-black"
                  label="BOOK A CALL"
                  onClick={() => router.push("/book-a-call")}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* copy popup */}
      {copied && (
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 bg-white text-black text-sm px-3 py-1 rounded shadow-lg transition-opacity duration-300">
          Email copied!
        </div>
      )}
    </div>
  );
};

export default Footer;