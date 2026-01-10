"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

const HoverVideo = ({ url }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      playerRef.current = new Player(iframeRef.current, {
        muted: true,
        loop: true,
        controls: false,
        responsive: true,
      });
    }

    // Override Vimeo player's max-width constraint
    const style = document.createElement('style');
    style.textContent = `
      .vp-center #player,
      #player {
        max-width: 100% !important;
        width: 100% !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleMouseEnter = () => playerRef.current?.play();
  const handleMouseLeave = () => playerRef.current?.pause();

  return (
    <div
      className="w-full relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
        position: 'relative'
      }}
    >
      <iframe
        ref={iframeRef}
        src={`${url}?background=1&responsive=1`}
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          border: 'none',
          display: 'block',
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        allow="autoplay; fullscreen"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default HoverVideo;
