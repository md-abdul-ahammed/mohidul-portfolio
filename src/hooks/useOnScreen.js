import { useEffect, useRef, useState } from "react";

export default function useOnScreen(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current; // copy ref.current safely
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(node);

    return () => {
      observer.unobserve(node); // safe now
    };
  }, [options]);

  return [ref, isVisible];
}
