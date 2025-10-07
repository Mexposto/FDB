import Link from "next/link";
import styles from "./styles.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/tulugar">Tu lugar</Link>
        </li>
        {/* <li>
          <Link href="/remeras">Remeras</Link>
        </li> */}
        <li>
          <Link href="/elbosque">El bosque</Link>
        </li>
      </ul>
    </nav>
  );
}
