"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const AnimatedDropdown = ({ label, options, required = false, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full flex justify-between items-center text-left transition-all rounded-md ${selected ? "text-black" : "text-[#66656A]"
          }`}
        required={required}
      >
        {selected || label}
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 w-full bg-white shadow-lg border border-[#D3D8DF] rounded-md overflow-hidden"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.label)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;
