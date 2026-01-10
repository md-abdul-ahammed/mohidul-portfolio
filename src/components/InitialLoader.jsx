"use client";
import { useState, useEffect } from "react";

export default function InitialLoader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const hideLoader = () => setHide(true);

    // পেজ লোড হলে লোডার হাইডt
    window.addEventListener("load", hideLoader);

    // fallback, যদি 3 সেকেন্ডে লোড না হয়
    const fallback = setTimeout(hideLoader, 0.1);

    return () => {
      window.removeEventListener("load", hideLoader);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      id="initial-loader"
      className={`fixed inset-0 z-[9999] ${
        hide ? "hide pointer-events-none" : ""
      }`}
    >
      <div className="loader-layer top-layer"></div>
      <div className="loader-layer bottom-layer"></div>
      <div className="loader-content">{/* logo/text */}</div>
    </div>
  );
}
