import LetsTalk from "@/components/LetsTalk/LetsTalk";
import Portfolio from "@/components/Portfolio/Portfolio";
import React from "react";

const MyBlogsPage = () => {
  return (
    <div className="">
      <Portfolio
        title={"My Blogs"}
        subTitle={
          "Insights, stories, and lessons learned from building digital products. Sharing my journey in UI/UX design, product development, and everything in between."
        }
        apiEndpoint="blogs"
      ></Portfolio>
      <LetsTalk></LetsTalk>
    </div>
  );
};

export default MyBlogsPage;
