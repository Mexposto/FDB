// src/app/admin/page.tsx
import styles from "./styles.module.css";
import ConfirmationsTable from "@/components/ConfirmationsTable/ConfirmationsTable";

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Lista 2025</h1>
      <ConfirmationsTable />
    </main>
  );
}
