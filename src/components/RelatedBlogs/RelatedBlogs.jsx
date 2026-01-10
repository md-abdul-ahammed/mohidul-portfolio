'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

const RelatedBlogs = ({ tags }) => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.BLOGS);

        if (!response.ok) {
          throw new Error(`Failed to fetch blog data`);
        }

        const data = await response.json();

        if (data.success) {
          setBlogData(data.blogs || []);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        setError(err.message);
        console.error(`Error fetching blog data:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Filter blogs based on tags
  const getRelatedBlogs = () => {
    let tagArray = [];
    if (typeof tags === 'string') {
      tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    } else if (Array.isArray(tags)) {
      tagArray = tags;
    }
    
    if (!tagArray || tagArray.length === 0 || blogData.length === 0) {
      return [];
    }

    return blogData.filter(blog => {
      if (!blog.tags) return false;

      const blogTags = blog.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag.length > 0);

      const inputTags = tagArray.map(tag => tag.toLowerCase());

      return inputTags.some(inputTag =>
        blogTags.some(blogTag => blogTag.includes(inputTag) || inputTag.includes(blogTag))
      );
    }).slice(0, 3);
  };

  const relatedBlogs = getRelatedBlogs();

  if (loading) {
    return (
      <div className="mx-2 [@media(min-width:1440px)]:border-t [@media(min-width:1440px)]:border-[#D3D8DF]">
        <div className="px-4 py-10 md:px-6 md:py-40 mx-auto border-b border-x border-[#D3D8DF] max-w-[1444px]">
          <div className="mb-6">
            <h1 className="text-[34px] text-[#1D1C1F] mb-6">Related Blogs</h1>
          </div>
          <div className="flex justify-center">
            <p className="text-[#66656A]">Loading related blogs...</p>
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
            <h1 className="text-[34px] text-[#1D1C1F] mb-6">Related Blogs</h1>
          </div>
          <div className="flex justify-center">
            <p className="text-[#66656A]">Error loading blogs: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!relatedBlogs || relatedBlogs.length === 0) {
    return null;
  }

  return (
    <div className="mx-2 [@media(min-width:1440px)]:border-t [@media(min-width:1440px)]:border-[#D3D8DF]">
      <div className="px-4 py-10 md:px-6 md:py-10 lg:py-20 mx-auto border-b border-x border-[#D3D8DF] max-w-[1444px]">
        <div className="mb-6">
          <h1 className="text-[34px] md:text-5xl lg:text-6xl text-[#1D1C1F] mb-4">
            Related Blogs
          </h1>
          <p className="text-[#66656A] text-base md:text-lg">
            More insights and stories you might enjoy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedBlogs.map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group block"
            >
              <div className="border border-[#D3D8DF] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                {/* Blog Image */}
                <div className="relative h-[250px] w-full overflow-hidden">
                  <Image
                    src={blog.image_url || '/placeholder-blog.jpg'}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#EFEFEF] text-[#1D1C1F] text-xs font-medium">
                      Blog
                    </span>
                  </div>

                  <h3 className="text-[#1D1C1F] text-xl font-medium mb-2 line-clamp-2 group-hover:text-[#4A5568]">
                    {blog.title}
                  </h3>

                  {blog.sub_title && (
                    <p className="text-[#66656A] text-sm line-clamp-2 mb-3">
                      {blog.sub_title}
                    </p>
                  )}

                  {/* Tags */}
                  {blog.tags && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.split(',').slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-[#EDEDEF] text-[#66656A] text-xs"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogs;






