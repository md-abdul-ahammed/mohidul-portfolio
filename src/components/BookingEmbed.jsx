"use client";

import { useEffect, useRef, useState } from "react";

const CalEmbed = () => {
  const calContainerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!calContainerRef.current) return;

    const script = document.createElement("script");
    script.src = "https://cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Cal && calContainerRef.current) {
        window.Cal("inline", {
          elementOrSelector: calContainerRef.current,
          calLink: "thisismohidul/30min",
          config: {
            theme: "light", // ✅ forces light theme
          },
        });
        setLoaded(true); // mark loaded for fade-in or loader
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-white min-h-screen flex justify-center items-center">
      {!loaded && <p className="text-gray-500">Loading booking...</p>}
      <div
        ref={calContainerRef}
        className="w-full max-w-5xl h-[90vh] rounded-xl shadow-md"
      />
    </section>
  );
};

export default CalEmbed;
