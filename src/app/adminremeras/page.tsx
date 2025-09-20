// src/app/admin/remeras/page.tsx
import styles from "./styles.module.css";
import RemerasTable from "@/components/RemerasTable/RemerasTable";

export default function RemerasAdminPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Pedidos de Remeras</h1>
      <RemerasTable />
    </main>
  );
}
