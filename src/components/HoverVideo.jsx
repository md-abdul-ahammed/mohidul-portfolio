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
        aspectRatio: '16 / 10',
        position: 'relative',
        maxWidth: '100%',
      }}
    >
      <iframe
        ref={iframeRef}
        src={`${url}?background=1&responsive=1`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 box-border"
        style={{
          border: 'none',
          display: 'block',
          width: '177.78vh',
          height: '56.25vw',
          minWidth: '100%',
          minHeight: '100%',
        }}
        allow="autoplay; fullscreen"
        frameBorder="0"
      />
    </div>
  );
};

export default HoverVideo;
