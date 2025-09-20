import Image from "next/image";
import styles from "./styles.module.css";

export default function BosqueHero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/almuerzo.JPG" // 🔥 poné tu foto en /public
        alt="Festival en el bosque"
        fill
        priority
        className={styles.image}
      />
      <div className={styles.overlay}>
        <h1 className={styles.title}>El Bosque</h1>
      </div>
    </section>
  );
}
