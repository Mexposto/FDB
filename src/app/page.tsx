import CanvasVideo from "@/components/CanvasVIdeo/CanvasVideo";
import LogoWithScrollEffect from "@/components/LogoScrollEffect/LogoScrollEffect";
import IntroSection from "@/components/IntroSection/IntroSection";
import ArchivePreviewSection from "@/components/ArchivePreviewSection/ArchivoPreviewSection";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <main className={styles.main}>
        <CanvasVideo src="/droneloop.webm" />
        <LogoWithScrollEffect />
      </main>
      <IntroSection />
      <ArchivePreviewSection />
    </>
  );
}
