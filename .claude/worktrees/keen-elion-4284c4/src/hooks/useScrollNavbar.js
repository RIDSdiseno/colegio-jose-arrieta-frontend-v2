import { useEffect, useState, useRef } from "react";

// Returns { scrolled, visible }
// scrolled: true when past threshold (used for solid bg)
// visible: false when scrolling down, true when scrolling up or at top
export function useScrollNavbar(threshold = 50) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > threshold
  );
  const [visible, setVisible] = useState(true);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      setScrolled(currentY > threshold);

      if (currentY <= threshold) {
        // Near the top — always show
        setVisible(true);
      } else if (diff > 6) {
        // Scrolling down fast enough — hide
        setVisible(false);
      } else if (diff < -4) {
        // Scrolling up — show
        setVisible(true);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, visible };
}

export default useScrollNavbar;
