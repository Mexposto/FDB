"use client";

import Image from "next/image";
import useScrolled from "@/hooks/useScrolled";
import styles from "./styles.module.css";

export default function LogoWithScrollEffect() {
  const scrolled = useScrolled();
  console.log("Scroll state:", scrolled);

  return (
    <Image
      src="/logo.png"
      alt="Festival del Bosque"
      width={400}
      height={400}
      priority
      className={`${styles.logo} ${scrolled ? styles.hidden : ""}`}
    />
  );
}
