"use client";

import { useEffect, useState } from "react";

export default function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const shouldBeScrolled = currentScroll > threshold;

      console.log(
        "[useScrolled] scrollY:",
        currentScroll,
        "-> scrolled:",
        shouldBeScrolled
      );

      setScrolled(shouldBeScrolled);
    };

    // Ejecutar una vez al inicio
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
