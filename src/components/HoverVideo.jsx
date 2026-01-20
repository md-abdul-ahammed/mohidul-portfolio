"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

const HoverVideo = ({ url }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  // Extract Vimeo video ID and convert to proper embed URL
  const getVimeoEmbedUrl = (inputUrl) => {
    if (!inputUrl) return null;
    
    // If already a player.vimeo.com URL, return as is
    if (inputUrl.includes('player.vimeo.com')) {
      return inputUrl;
    }
    
    // Extract video ID from various Vimeo URL formats
    let videoId = null;
    
    // Pattern 1: https://vimeo.com/123456789
    // Pattern 2: https://vimeo.com/123456789?params
    const match = inputUrl.match(/vimeo\.com\/(\d+)/);
    if (match) {
      videoId = match[1];
    }
    
    // If video ID found, return proper embed URL
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Fallback to original URL
    return inputUrl;
  };

  const embedUrl = getVimeoEmbedUrl(url);

  useEffect(() => {
    if (iframeRef.current && embedUrl) {
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
  }, [embedUrl]);

  const handleMouseEnter = () => playerRef.current?.play();
  const handleMouseLeave = () => playerRef.current?.pause();

  if (!embedUrl) return null;

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
        src={`${embedUrl}?background=1&responsive=1`}
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
