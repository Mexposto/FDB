"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

const FOTOS = [
  "/F1.jpeg",
  "/F2.jpg",
  "/F3.jpg",
  "/F4.jpg",
  "/F5.jpg",
  "/F6.jpg",
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
              width={400}
              height={300}
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
              width={1200}
              height={800}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
