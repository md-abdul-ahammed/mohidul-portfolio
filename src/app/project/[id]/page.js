import AbouttheProject from "@/components/AbouttheProject/AbouttheProject";
import Footer from "@/components/Footer/Footer";
import LetsTalk from "@/components/LetsTalk/LetsTalk";
import ProjectHero from "@/components/ProjectHero/ProjectHero";
import RelatedProjects from "@/components/RelatedProjects/RelatedProjects";
import Navbar from "@/components/Shared/Navbar";
import SideBar from "@/components/SideBar/SideBar";
import React from "react";

// Use production API for static generation
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.mohidul.me';

// Generate static params for all portfolio IDs at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_BASE_URL}/GET/portfolio.php`, {
      cache: 'force-cache',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.portfolio) && data.portfolio.length > 0) {
        return data.portfolio.map((item) => ({
          id: item.id.toString(),
        }));
      }
    }
  } catch (error) {
    console.warn('Failed to fetch portfolio IDs for static generation:', error.message);
  }
  
  // For static export, we need to return at least an empty array
  // Missing pages will be handled by 404
  return [];
}

const ProjectPage = async ({ params }) => {
  const { id } = params;
  let data = {};

  try {
    // Fetch data from the API (revalidate every 60s for ISR / static build)
    const response = await fetch(
      `${API_BASE_URL}/GET/case_study.php?portfolio_id=${id}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = await response.json();
    console.log("data from project page", data?.portfolio);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div>
      <ProjectHero projectHeroData={data?.portfolio} />
      <div className="md:mx-2">
        <div className="max-w-[1444px] mx-auto flex flex-col md:flex-row gap-0 md:gap-[15px]">
          {/* Sidebar container - fixed width */}
          <div className="md:w-[365px] flex-shrink-0">
            <SideBar caseStudyData={data.case_studies} />
          </div>

          {/* About the Project section - takes remaining space */}
          <div className="flex-1">
            <AbouttheProject aboutTheProject={data?.process_items} data={data} />
          </div>
        </div>
      </div>

      <RelatedProjects tags={data?.portfolio?.tags}></RelatedProjects>
      <LetsTalk></LetsTalk>
    </div>
  );
};

export default ProjectPage;
