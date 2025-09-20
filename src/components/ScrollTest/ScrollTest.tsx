"use client";

import { useEffect, useState } from "react";

export default function ScrollTest() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      console.log("Scroll Y:", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // comprobar al montar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        height: "200vh",
        padding: "2rem",
        color: "white",
        background: "black",
      }}
    >
      <h1>Scroll down the page</h1>
      <p>Scrolled? {scrolled ? "YES" : "NO"}</p>
    </div>
  );
}
