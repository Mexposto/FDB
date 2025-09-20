"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export default function TuLugarSection() {
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const handleSelect = (price: number) => {
    setSelectedPrice(price);
  };

  return (
    <div className={styles.container}>
      <section className={styles.tuLugar}>
        <div className={styles.osoWrapper}>
          <Image
            src="/osopeludo.png"
            alt="Oso bailando"
            fill
            className={styles.oso}
            priority
          />
        </div>

        <div
          className={`${styles.content} ${
            selectedPrice !== null ? styles.contentExpanded : ""
          }`}
        >
          <div className={styles.textBlock}>
            <p className={styles.dateHeading}>Reservá tu entrada</p>
            <h2>Elegí cuánto podés aportar</h2>
            <p>Tu aporte sostiene el festival ✨</p>
          </div>

          <div className={styles.priceButtons}>
            {[3000, 4000, 5000].map((price) => (
              <button
                key={price}
                className={`${styles.priceButton} ${
                  selectedPrice === price ? styles.selected : ""
                }`}
                onClick={() => handleSelect(price)}
              >
                ${price}
              </button>
            ))}
          </div>

          {selectedPrice && (
            <div className={styles.info}>
              <p>
                Transferí <strong>${selectedPrice}</strong> al alias:{" "}
                <strong>festibosque2025</strong>
              </p>
              <p>
                Luego de abonar, envianos el comprobante por Instagram o
                completá el siguiente campo:
              </p>
              <textarea
                className={styles.textarea}
                placeholder="Pegá el comprobante o dejanos un mensaje"
              />
              <Link
                href="https://instagram.com/festidelbosque"
                target="_blank"
                className={styles.reserveButton}
              >
                Enviar por Instagram
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
