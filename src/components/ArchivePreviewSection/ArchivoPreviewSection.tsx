"use client";

import Link from "next/link";
import styles from "./styles.module.css";

export default function ArchivePreviewSection() {
  return (
    <section className={styles.archiveSection}>
      <div className={styles.archiveOverlay}>
        <h3 className={styles.archiveTitle}>Conocenos un poco más</h3>
        <Link href="/archivo" className={styles.archiveButton}>
          El bosque
        </Link>
      </div>
    </section>
  );
}
