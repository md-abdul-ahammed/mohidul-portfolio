import { useState } from "react";

export default function AnimatedButton({
  label,
  onClick,
  icon = null, // 👈 new prop for passing an icon
  icon2 = null,
  textColor = "text-black",
  hoverTextColor = "text-white",
  bgColor = "#010001",
  animationSpeed = "0.5s",
  className = "",
  isActive = false, // 👈 new prop for active state
  activeTextColor = "text-white", // 👈 optional: customize active text color
  activeBgColor = null, // 👈 optional: customize active bg color (defaults to bgColor)
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative flex-1 flex items-center justify-center cursor-pointer overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Text + Icon */}
      <span
        className={`z-10 flex items-center gap-2 transition-colors duration-300 ${
          isActive ? activeTextColor : hovered ? hoverTextColor : textColor
        }`}
      >
        {icon && <span className="text-xl">{icon}</span>} {/* 👈 icon slot */}
        {label} {icon2 && <span className="text-xl">{icon2}</span>}
      </span>

      {/* BG Animation */}
      <div
        className={`absolute inset-0`}
        style={{
          backgroundColor: activeBgColor || bgColor,
          transform: isActive ? "translateX(0)" : hovered ? "translateX(-100%)" : "translateX(100%)",
          animation: isActive 
            ? "none"
            : hovered
            ? `slideFill ${animationSpeed} forwards`
            : `slideExit ${animationSpeed} forwards`,
        }}
      />

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes slideFill {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes slideExit {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(110%);
          }
        }
      `}</style>
    </div>
  );
}