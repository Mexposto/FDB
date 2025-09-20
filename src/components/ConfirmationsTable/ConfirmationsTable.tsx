"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./styles.module.css";

interface Entry {
  id: string;
  name: string;
  surname: string;
  email: string;
  amount: number;
  proof_url: string;
  created_at: string;
}

const toLocalTime = (utcString: string) => {
  const date = new Date(utcString);
  date.setHours(date.getHours() - 3);
  return date.toLocaleString("es-AR", { hour12: false });
};

export default function ConfirmationsTable() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("confirmaciones")
        .select()
        .order("surname", { ascending: true });

      if (data) setEntries(data);
    };

    fetchData();
  }, []);

  const filtered = entries.filter((e) =>
    `${e.name} ${e.surname}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filtrar por nombre o apellido..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterInput}
        />
      </div>

      <table className={styles.confirmTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Monto</th>
            <th>Comprobante</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id} className={styles.row}>
              <td data-label="Nombre">{e.name}</td>
              <td data-label="Apellido">{e.surname}</td>
              <td data-label="Email">{e.email}</td>
              <td data-label="Monto">${e.amount}</td>
              <td data-label="Comprobante">
                <a href={e.proof_url} target="_blank" rel="noopener noreferrer">
                  Ver comprobante
                </a>
              </td>
              <td data-label="Fecha">{toLocalTime(e.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
