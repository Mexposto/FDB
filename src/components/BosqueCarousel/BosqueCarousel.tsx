"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const FOTOS = [
  "/F1.JPEG",
  "/F2.JPG",
  "/F3.JPG",
  "/F4.JPG",
  "/F5.JPG",
  "/F6.JPG",
];

export default function BosqueCarousel() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className={styles.carousel}>
      <div className={styles.scroll}>
        {FOTOS.map((src, i) => (
          <div
            key={i}
            className={styles.imageWrapper}
            onClick={() => setSelected(src)}
          >
            <Image
              src={src}
              alt={`Foto ${i + 1} del festival`}
              width={320}
              height={240}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalContent}>
            <Image
              src={selected}
              alt="Foto ampliada"
              width={900}
              height={600}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
