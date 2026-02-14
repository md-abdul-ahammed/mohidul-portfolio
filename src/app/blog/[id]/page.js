import BlogHero from "@/components/BlogHero/BlogHero";
import AbouttheBlog from "@/components/AbouttheBlog/AbouttheBlog";
import BlogSidebar from "@/components/BlogSidebar/BlogSidebar";
import RelatedBlogs from "@/components/RelatedBlogs/RelatedBlogs";
import LetsTalk from "@/components/LetsTalk/LetsTalk";
import React from "react";

// Use production API for static generation
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.mohidul.me';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mohidul-portfolio-five.vercel.app';

// Blog share preview: use blog title and subtitle for og/twitter
export async function generateMetadata({ params }) {
  const { id } = await Promise.resolve(params);
  let title = 'Blog';
  let description = '';
  let imageUrl = null;

  try {
    const res = await fetch(`${API_BASE_URL}/GET/blog_detail.php?blog_id=${id}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.success && data?.blog) {
        title = data.blog.title || title;
        description = data.blog.sub_title || data.blog.subtitle || '';
        imageUrl = data.blog.image_url || null;
      }
    }
  } catch (_) {}

  const url = `${SITE_URL}/blog/${id}`;
  const ogImage = imageUrl ? { url: imageUrl, width: 1200, height: 630, alt: title } : undefined;

  return {
    title: `${title} | Mohidul`,
    description: description || 'A blog post by Mohidul Islam.',
    openGraph: {
      title,
      description: description || 'A blog post by Mohidul Islam.',
      url,
      siteName: 'Mohidul',
      type: 'article',
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || 'A blog post by Mohidul Islam.',
      ...(ogImage && { images: [imageUrl] }),
    },
  };
}

// Generate static params for all blog IDs at build time
// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Fetch from production API during build
  try {
    const response = await fetch(`${API_BASE_URL}/GET/blog.php`, {
      cache: 'force-cache',
    });
    
    if (response && response.ok) {
      const data = await response.json();
      if (data && data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
        return data.blogs.map((blog) => ({
          id: blog.id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn('Build: API not accessible. Dynamic pages will be generated on-demand.');
  }
  
  // Return empty array - Next.js will generate pages on-demand via 404 handling
  return [];
}

const BlogPage = async ({ params }) => {
  const { id } = params;
  let blogData = {};
  let contentData = [];
  let blogInfo = null;

  try {
    // Fetch blog basic info (revalidate every 60s for ISR / static build)
    const blogResponse = await fetch(
      `${API_BASE_URL}/GET/blog.php`,
      { next: { revalidate: 60 } }
    );

    if (blogResponse.ok) {
      const allBlogs = await blogResponse.json();
      if (allBlogs.success) {
        blogData = allBlogs.blogs.find(b => b.id === parseInt(id)) || {};
      }
    }

    // Fetch blog content and blog_info (revalidate every 60s for ISR / static build)
    const contentResponse = await fetch(
      `${API_BASE_URL}/GET/blog_content.php?blog_id=${id}`,
      { next: { revalidate: 60 } }
    );

    if (contentResponse.ok) {
      const contentResult = await contentResponse.json();
      if (contentResult.success) {
        contentData = contentResult.blog_content || [];
        blogInfo = contentResult.blog_info || null;
      }
    }

    console.log("Blog data:", blogData);
    console.log("Content data:", contentData);
    console.log("Blog info:", blogInfo);
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  return (
    <div>
      <BlogHero blogHeroData={blogData} />
      <div className="md:mx-2">
        <div className="max-w-[1444px] mx-auto flex flex-col md:flex-row gap-0 md:gap-[15px]">
          {/* Sidebar container - fixed width */}
          <div className="md:w-[365px] flex-shrink-0">
            <BlogSidebar blogInfo={blogInfo} />
          </div>

          {/* About the Blog section - takes remaining space */}
          <div className="flex-1">
            <AbouttheBlog blogContent={contentData} blogData={blogData} />
          </div>
        </div>
      </div>

      <RelatedBlogs tags={blogData?.tags} currentBlogId={blogData?.id} />
      <LetsTalk></LetsTalk>
    </div>
  );
};

export default BlogPage;
