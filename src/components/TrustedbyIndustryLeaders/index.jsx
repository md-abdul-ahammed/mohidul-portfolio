import React, { useState } from "react";

export default function ArrowSlider() {
  const [value, setValue] = useState(50); // default slider value

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="w-[234px] h-[48px] px-2 flex items-center justify-between border rounded">
      {/* Left arrow */}
      <button
        onClick={() => setValue((v) => Math.max(0, v - 10))}
        className="p-2 hover:bg-gray-200 rounded"
      >
        ◀
      </button>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full mx-2 accent-gray-500"
      />

      {/* Right arrow */}
      <button
        onClick={() => setValue((v) => Math.min(100, v + 10))}
        className="p-2 hover:bg-gray-200 rounded"
      >
        ▶
      </button>
    </div>
  );
}
