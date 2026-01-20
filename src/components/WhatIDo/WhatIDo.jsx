"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";

const WhatIDo = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState(() => new Set());
  const [mounted, setMounted] = useState(false);

  const borderClasses = [
    "border-b border-r",
    "border-b border-r-0 sm:border-r",
    "border-b border-r sm:border-r-0",
    "border-r-0 sm:border-r",
    "border-r",
    "border-t sm:border-t-0",
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const fetchServices = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.SERVICES);

        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.status} ${response.statusText}`);
        }

        // Check if response has content
        const text = await response.text();
        console.log('Services API Raw Response:', text);

        if (!text || text.trim() === '') {
          throw new Error("Empty response from server");
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          console.error('Response text:', text);
          throw new Error("Invalid JSON response from server");
        }

        console.log('Services API Response:', data);

        // Handle successful response with empty services array
        if (data.success !== undefined) {
          if (data.success && data.services && Array.isArray(data.services)) {
            if (data.services.length > 0) {
              const servicesWithBorders = data.services.map((service, index) => {
                return {
                  id: service.id,
                  icon: service.icon || '/assets/img/services/default_icon.png',
                  title: service.title || 'Service',
                  description: service.subtitle || service.description || '',
                  borderClass: borderClasses[index] || "border-b border-r",
                };
              });
              setServices(servicesWithBorders);
            } else {
              // Empty services array - not an error, just no data
              setServices([]);
              setError("No services found in database");
            }
          } else {
            // API returned success:false or missing services array
            throw new Error(data.message || "API returned unsuccessful response");
          }
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message || "Error loading services");
        setServices([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [mounted]);

  if (!mounted || loading) {
    return (
      <div className="mx-4 sm:mx-2">
        <div className="pb-12 md:pb-20 lg:pb-26 xl:pb-32 md:max-w-[1444px] border-[#D3D8DF] mx-auto sm:border-x">
          <div className="grid grid-cols-2 sm:grid-cols-3 border border-[#D3D8DF] md:mx-4 lg:mx-5 xl:mx-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`relative p-4 md:p-6 lg:p-8 xl:p-10 aspect-square sm:aspect-auto border-[#D3D8DF] flex flex-col justify-center items-center overflow-hidden ${borderClasses[index]}`}
              >
                <div className="animated-bar-container">
                  <div className="sliding-glow"></div>
                </div>
                <center>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="mt-[20px] md:mt-[25px] lg:mt-[29px] xl:mt-[33px] mb-1 w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="hidden sm:block mt-2 w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                </center>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 sm:mx-2">
        <div className="pb-12 md:pb-20 lg:pb-26 xl:pb-32 md:max-w-[1444px] border-[#D3D8DF] mx-auto sm:border-x">
          <div className="text-center p-8 text-red-500">
            Error loading services: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 sm:mx-2">
        <div className="pb-12 md:pb-20 lg:pb-26 xl:pb-32 md:max-w-[1444px] border-[#D3D8DF] mx-auto sm:border-x">
          <div className="grid grid-cols-2 sm:grid-cols-3 border border-[#D3D8DF] md:mx-4 lg:mx-5 xl:mx-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`card-container relative p-4 md:p-6 lg:p-8 xl:p-10 aspect-square sm:aspect-auto border-[#D3D8DF] flex flex-col justify-center items-center overflow-hidden ${service.borderClass}`}
              >
                <div className="animated-bar-container">
                  <div className="sliding-glow"></div>
                </div>
                <center>
                  {!imageErrors.has(service.id) ? (
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={48}
                      height={48}
                      className="object-contain"
                      onError={() => {
                        setImageErrors(prev => new Set([...prev, service.id]));
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Icon</span>
                    </div>
                  )}
                  <h2 className="mt-[20px] md:mt-[22px] lg:mt-[28px] xl:mt-[33px] mb-1 text-[16px] md:text-[15px] lg:text-base xl:text-lg font-medium text-[#1D1C1F]">
                    {service.title}
                  </h2>
                  <p className="hidden sm:block text-[14px] md:text-[13px] lg:text-[15px] xl:text-[16px] text-[#66656A]">
                    {service.description}
                  </p>
                </center>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIDo;
