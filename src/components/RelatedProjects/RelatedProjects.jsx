'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

const RelatedProjects = ({ tags, apiEndpoint = "portfolio" }) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('tag inside', tags);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // Use different API endpoint based on prop
        const endpoint = apiEndpoint === "blogs" ? API_ENDPOINTS.BLOGS : API_ENDPOINTS.PORTFOLIO;
        const dataKey = apiEndpoint === "blogs" ? "blogs" : "portfolio";
        
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${apiEndpoint} data`);
        }

        const data = await response.json();

        if (data.success) {
          setPortfolioData(data[dataKey] || []);
        } else {
          throw new Error('API returned unsuccessful response');
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

  // Filter projects based on tags
  const getRelatedProjects = () => {
    // Handle tags as string (comma-separated) or array
    let tagArray = [];
    if (typeof tags === 'string') {
      tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    } else if (Array.isArray(tags)) {
      tagArray = tags;
    }
    
    if (!tagArray || tagArray.length === 0 || portfolioData.length === 0) {
      return [];
    }

    return portfolioData.filter(project => {
      if (!project.tags) return false;

      // Convert project tags to array and clean them
      const projectTags = project.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0);

      // Convert input tags to lowercase for case-insensitive comparison
      const inputTags = tagArray.map(tag => tag.toLowerCase());

      // Check if any of the input tags match any of the project tags
      return inputTags.some(inputTag =>
        projectTags.some(projectTag => projectTag.includes(inputTag) || inputTag.includes(projectTag))
      );
    }).slice(0, 3); // Limit to 3 projects maximum
  };

  const relatedProjects = getRelatedProjects();

  if (loading) {
    return (
      <div className="mx-2 [@media(min-width:1440px)]:border-t [@media(min-width:1440px)]:border-[#D3D8DF]">
        <div className="px-4 py-10 md:px-6 md:py-40 mx-auto border-b border-x border-[#D3D8DF] max-w-[1444px]">
          <div className="mb-6">
            <h1 className="text-[34px] text-[#1D1C1F] mb-6">Related Projects</h1>
          </div>
          <div className="flex justify-center">
            <p className="text-[#66656A]">Loading {apiEndpoint === "blogs" ? "related blogs" : "related projects"}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-2 [@media(min-width:1440px)]:border-t [@media(min-width:1440px)]:border-[#D3D8DF]">
        <div className="px-4 py-10 md:px-6 md:py-40 mx-auto border-b border-x border-[#D3D8DF] max-w-[1444px]">
          <div className="mb-6">
            <h1 className="text-[34px] text-[#1D1C1F] mb-6">Related Projects</h1>
          </div>
          <div className="flex justify-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-2 [@media(min-width:1440px)]:border-t [@media(min-width:1440px)]:border-[#D3D8DF]">
      <div className="px-4 py-10 md:px-6 md:py-40 mx-auto border-b border-x border-[#D3D8DF] max-w-[1444px]">
        {/* Top Title */}
        <div className="mb-6">
          <h1 className="text-[34px] text-[#1D1C1F] mb-6">{apiEndpoint === "blogs" ? "Related Blogs" : "Related Projects"}</h1>
        </div>

        {/* Projects Container */}
        <div className="flex justify-between flex-wrap gap-y-6">
          {relatedProjects.length > 0 ? (
            relatedProjects.map((project, index) => (
              <Link href={apiEndpoint === "blogs" ? `/blog/${project.id}` : `/project/${project.id}`} key={project.id}>
                <div
                  className={`w-full sm:w-auto mb-6 sm:mb-0 ${index > 0 ? 'hidden sm:block' : ''
                    }`}
                >
                  <Image
                    src={project.image || "/images/project/rp1.svg"}
                    alt={project.title || "Project image"}
                    width={687}
                    height={450}
                    className="w-full sm:w-[432px] mb-4"
                    onError={(e) => {
                      e.target.src = "/images/project/rp1.svg";
                    }}
                  />
                  <h4 className="text-[24px] text-[#1D1C1F] mb-4">
                    {project.title || "The pixlplay studio"}
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags ? (
                      project.tags
                        .split(',')
                        .map(tag => tag.trim())
                        .filter(tag => tag.length > 0)
                        .map((tag, tagIndex) => (
                          <h6
                            key={tagIndex}
                            className="px-3 py-1 bg-[#EDEDEF] text-[#66656A] text-sm"
                          >
                            {tag}
                          </h6>
                        ))
                    ) : (
                      // Fallback tags if no tags available
                      <div>no tags found</div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Show fallback content when no related projects found
            <div>no related project found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProjects;