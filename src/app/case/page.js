import Case from "@/components/Case/Case";
import Footer from "@/components/Footer/Footer";
import LetsTalk from "@/components/LetsTalk/LetsTalk";
import Portfolio from "@/components/Portfolio/Portfolio";
import Navbar from "@/components/Shared/Navbar";
import React from "react";

const CasePage = () => {
  return (
    <div className="">
      {/* <Case></Case> */}
      <Portfolio
        title={"Case Studies"}
        subTitle={
          "Every design tells a story — shaped by challenges, users, and context. These projects explore how thoughtful interfaces improve real outcomes. From product strategy to final visuals, here's what made an impact."
        }
      ></Portfolio>
      <LetsTalk></LetsTalk>
    </div>
  );
};

export default CasePage;
