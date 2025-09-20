"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      setIsAtBottom(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`${styles.footer} ${
        isAtBottom ? styles.visible : styles.hidden
      }`}
    >
      <p className={styles.text}>© Festival del Bosque 2025</p>
      <a
        href="https://instagram.com/festidelbosque"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.instagramLink}
      >
        <FaInstagram className={styles.icon} />
        <span>@festidelbosque</span>
      </a>
    </footer>
  );
}
