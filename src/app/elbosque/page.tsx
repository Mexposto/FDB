import BosqueHero from "@/components/BosqueHero/BosqueHero";
import BosqueText from "@/components/BosqueText/BosqueText";
import BosqueCarousel from "@/components/BosqueCarousel/BosqueCarousel";
import styles from "./styles.module.css";

export default function ElBosquePage() {
  return (
    <main className={styles.main}>
      <BosqueHero />
      <BosqueText />
      <BosqueCarousel />
    </main>
  );
}
