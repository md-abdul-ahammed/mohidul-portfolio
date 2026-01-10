"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";

export default function ProjectShowCase() {
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.HERO);
        const data = await response.json();

        if (data.success && data.sliders && data.sliders.row_1) {
          // Extract image URLs from row_1
          const images = data.sliders.row_1.map(item => item.image);
          setSliderImages(images);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // If loading or no images, show empty state or loading
  if (loading || sliderImages.length === 0) {
    return (
      <div className="md:mx-2">
        <div
          className="sm:px-6 py-4 p-0 sm:max-w-[1444px] mx-auto overflow-hidden
                    sm:border-x border-x border-[#D3D8DF] border- sm:border-[#D3D8DF] lg:border-b-0"
        >
          <div className="pt-[12px] md:pt-0">
            <div className="relative h-[220px] overflow-hidden">
              <div className="flex items-center justify-center h-full">
                {loading ? 'Loading...' : 'No images available'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // duplicate the set so we can scroll seamlessly
  const track = [...sliderImages, ...sliderImages];

  return (
    <div className="md:mx-2">
      <div
        className="sm:px-6 py-4 p-0 sm:max-w-[1444px] mx-auto overflow-hidden
                      sm:border-x border-x border-[#D3D8DF] border- sm:border-[#D3D8DF] lg:border-b-0"
      >
        <div className="pt-[12px] md:pt-0">
          {/* the magic track */}
          <div className="relative h-[220px] overflow-hidden">
            <div className="flex absolute animate-slide">
              {track.map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[340px] px-2">
                  <Image
                    src={src}
                    alt={`Project Showcase ${i + 1}`}
                    width={340}
                    height={220}
                    className="w-full h-[220px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}