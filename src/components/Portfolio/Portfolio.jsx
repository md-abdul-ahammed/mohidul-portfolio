"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import AnimatedImage from "../AnimatedImage";
import AnimatedButton from "../AnimatedButtons";
import { Subtitles } from "lucide-react";
import Loading from "../Loading";
import { API_ENDPOINTS } from "@/config/api";

const Portfolio = ({ title, subTitle, apiEndpoint = "portfolio" }) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a custom hook to manage refs
  const usePortfolioRefs = (count) => {
    const refs = [];

    // Create all refs at the top level
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
      refs.push({ ref, inView });
    }

    return refs;
  };

  console.log("portfolioData", portfolioData);

  // Fetch data from API
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // Use different API endpoint based on prop
        const endpoint = apiEndpoint === "blogs" ? API_ENDPOINTS.BLOGS : API_ENDPOINTS.PORTFOLIO;
        const dataKey = apiEndpoint === "blogs" ? "blogs" : "portfolio";
        
        console.log(`Fetching ${apiEndpoint} from:`, endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${apiEndpoint} data`);
        }

        const data = await response.json();
        console.log(`API Response for ${apiEndpoint}:`, data);

        if (data.success) {
          const items = data[dataKey] || [];
          console.log(`Setting ${apiEndpoint} data:`, items);
          setPortfolioData(items);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        setError(err.message);
        console.error(`Error fetching ${apiEndpoint} data:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [apiEndpoint]);

  // Determine layout pattern based on index
  const getLayoutClass = (index) => {
    // Pattern repeats every 6 items: left, right, center, left, right, center
    const position = index % 6;
    const patterns = [
      "max-w-full md:max-w-[410px] lg:max-w-[480px] xl:max-w-[700px]", // Pattern 0: left aligned
      "max-w-full md:flex md:justify-end", // Pattern 1: right aligned
      "col-span-1 md:col-span-2 flex md:justify-center", // Pattern 2: center aligned, spans 2 columns
      "max-w-full md:max-w-[410px] lg:max-w-[480px] xl:max-w-[700px]", // Pattern 3: left aligned
      "max-w-full md:flex md:justify-end", // Pattern 4: right aligned
      "col-span-1 md:col-span-2 flex md:justify-center", // Pattern 5: center aligned, spans 2 columns
    ];
    return patterns[position];
  };

  // Determine image dimensions based on layout pattern
  const getImageDimensions = (index) => {
    // Pattern repeats every 6 items, matching layout pattern
    const position = index % 6;
    const patterns = [
      {
        width: 700,
        height: 500,
        className:
          "w-full max-w-[360px] h-[250px] md:w-[380px] md:h-[300px] lg:w-[480px] lg:h-[360px] xl:w-[700px] xl:h-[500px] max-w-none mx-auto md:mx-0",
      },
      {
        width: 448,
        height: 300,
        className:
          "w-full max-w-[360px] h-[250px] md:w-[310px] md:h-[210px] lg:w-[360px] lg:h-[250px] xl:w-[448px] xl:h-[300px] max-w-none mx-auto md:mx-0",
      },
      {
        width: 700,
        height: 500,
        className:
          "w-full max-w-[360px] h-[250px] md:w-[380px] md:h-[300px] lg:w-[480px] lg:h-[360px] xl:w-[700px] xl:h-[500px] max-w-none mx-auto md:mx-0",
      },
      {
        width: 687,
        height: 450,
        className:
          "w-full max-w-[360px] h-[250px] md:w-[380px] md:h-[300px] lg:w-[480px] lg:h-[360px] xl:w-[700px] xl:h-[500px] max-w-none mx-auto md:mx-0",
      },
      {
        width: 448,
        height: 300,
        className:
          "w-full max-w-[360px] h-[250px] md:w-[310px] md:h-[210px] lg:w-[360px] lg:h-[250px] xl:w-[448px] xl:h-[300px] max-w-none mx-auto md:mx-0",
      },
      {
        width: 700,
        height: 500,
        className:
          "w-full max-w-[360px] h-[250px] md:w-[380px] md:h-[300px] lg:w-[480px] lg:h-[360px] xl:w-[700px] xl:h-[500px] max-w-none mx-auto md:mx-0",
      },
    ];
    return patterns[position];
  };

  // Determine content layout based on index
  const getContentLayout = (index) => {
    const imageDimensions = getImageDimensions(index);
    const isWide = imageDimensions.width === 700 || imageDimensions.width === 687;
    
    if (isWide) {
      // Wide images: title and tags side by side
      return "mt-3 md:mt-2 flex flex-col md:flex-row md:justify-between md:items-center";
    } else {
      // Narrow images: tags below title
      return "mt-3 md:mt-2 flex flex-col";
    }
  };

  // Create refs for the maximum possible items we might have
  // Using a reasonable maximum to avoid creating too many hooks
  // Increased to 50 to handle case page with many items
  const MAX_ITEMS = 50;
  const portfolioRefs = usePortfolioRefs(MAX_ITEMS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="md:mx-2">
        <div className="md:max-w-[1444px] px-4 mx-auto pt-12 pb-10 md:pt-16 md:pb-32 border-y md:border-x border-[#D3D8DF]">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:mx-2">
        <div className="md:max-w-[1444px] px-4 mx-auto pt-12 pb-10 md:pt-16 lg:pt-22 xl:pt-28 md:pb-16 lg:pb-24 xl:pb-32 border-y md:border-x border-[#D3D8DF]">
          {title && subTitle && (
            <div className="">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-3 pt-4 md:pt-0">
                <h6 className="text-[#66656A]">Home</h6>
                <h6 className="text-[#66656A]">/</h6>
                <h6 className="text-[#1D1C1F] py-1 px-1.5 bg-[#EFEFEF]">
                  {apiEndpoint === "blogs" ? "Blog" : "Case"}
                </h6>
              </div>

              {/* Title and description */}
              <div className="mt-2 md:mt-5 lg:mt-8 xl:mt-10 mb-10 md:mb-12 lg:mb-18 xl:mb-24 md:justify-between">
                <h1 className="text-[48px] md:text-4xl lg:text-6xl xl:text-8xl font-medium text-[#1D1C1F] mb-4 md:mb-5 lg:mb-6 ">
                  {title}
                </h1>
                <p className="text-base text-[#66656A] max-w-full md:max-w-[420px] lg:max-w-[580px] xl:w-[694px]">
                  {subTitle}
                </p>
              </div>
            </div>
          )}
          {/* title and details */}
          {!title && !subTitle && (
            <motion.div
              className="flex flex-col md:flex-row md:justify-between mb-10 md:mb-12 lg:mb-14 xl:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-[#1D1C1F] text-[34px] md:text-[38px] lg:text-[50px] xl:text-[60px] font-medium mb-6 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                Work Highlights
              </motion.h1>

              <motion.p
                className="text-[#66656A] text-base md:text-sm lg:text-base xl:text-lg max-w-full md:max-w-[310px] lg:max-w-[360px] xl:max-w-[448px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                A curated selection of my recent design work, showcasing clear thinking, practical problem-solving, and visually balanced digital experiences made with close attention to detail.
              </motion.p>
            </motion.div>
          )}

          {/* demos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-[48px] lg:gap-y-[64px] xl:gap-y-[60px] md:gap-x-[50px] lg:gap-x-[80px] xl:gap-x-[228px]">
            {(title ? portfolioData : portfolioData.slice(0, 6)).map((item, index) => {
              const layoutClass = getLayoutClass(index);
              const imageDimensions = getImageDimensions(index);
              const contentLayout = getContentLayout(index);
              const { ref } = portfolioRefs[index] || {};

              return (
                <div key={item.id} ref={ref} className={layoutClass}>
                  <Link href={apiEndpoint === "blogs" ? `/blog/${item.id}?${item.title.replaceAll(" ", "_")}` : `/project/${item.id}?${item.title.replaceAll(" ", "_")}`}>
                    <div className={`inline-block ${imageDimensions.width === 700 ? 'w-full md:w-[380px] lg:w-[480px] xl:w-[700px]' : imageDimensions.width === 448 ? 'w-full md:w-[310px] lg:w-[360px] xl:w-[448px]' : 'w-full md:w-[380px] lg:w-[480px] xl:w-[700px]'}`}>
                      <AnimatedImage
                        src={item.image}
                        alt={item.title}
                        width={imageDimensions.width}
                        height={imageDimensions.height}
                        className={imageDimensions.className}
                        animationDelay={0.1}
                      />
                      <div className={contentLayout}>
                        <h4 className="text-[24px] md:text-[22px] lg:text-[28px] xl:text-[34px] text-[#1D1C1F] font-medium leading-tight">
                          {item.title}
                        </h4>
                        <div className="text-[#66656A] text-sm flex flex-wrap gap-2 mt-2">
                          {item.tags && item.tags.split(",").map((tag, tagIndex) => (
                            <p
                              key={tagIndex}
                              className="px-3 py-1 bg-[#EDEDEF]"
                            >
                              {tag.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {!title && !subTitle && (
          <div>
            <center>
              <Link href={"/case"}>
                <AnimatedButton
                  label="View All Projects"
                  bgColor="#27B43E"
                  className="pt-4 pb-4 md:pt-4 md:pb-4 font-medium text-base border-x border-[#D3D8DF] max-w-[1444px]"
                  onClick={() => console.log("Services clicked")}
                />
              </Link>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
