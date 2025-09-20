"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

const festivalDate = new Date("2025-11-15T20:00:00"); // 👈 fuera del componente

export default function IntroSection() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = festivalDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); // 👈 ya no marca warning

  return (
    <section className={styles.intro}>
      <div className={styles.osoWrapper}>
        <Image
          src="/oso-gorro1.png"
          alt="Oso con gorro"
          width={240}
          height={320}
          className={`${styles.oso} ${styles.visible}`}
          priority
        />
      </div>

      <div className={styles.introContent}>
        <div className={styles.introTextBlock}>
          <p className={styles.dateHeading}>
            Capítulo 5 · 15 de noviembre · 20 hs.
          </p>
          <h3>Próximo encuentro en el bosque</h3>
          <p>Amistad y arte en la naturaleza</p>
        </div>

        <div className={styles.countdown}>
          <div className={styles.timeBox}>
            <span>{countdown.days}</span>
            <small>días</small>
          </div>
          <div className={styles.timeBox}>
            <span>{countdown.hours}</span>
            <small>hs</small>
          </div>
          <div className={styles.timeBox}>
            <span>{countdown.minutes}</span>
            <small>min</small>
          </div>
          <div className={styles.timeBox}>
            <span>{countdown.seconds}</span>
            <small>seg</small>
          </div>
        </div>

        <p className={styles.countdownNote}>¡Ya está llegando!</p>

        <Link href="/tulugar" className={styles.reserveButton}>
          Reservá tu lugar
        </Link>
      </div>
    </section>
  );
}
