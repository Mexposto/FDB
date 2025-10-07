"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./styles.module.css";

interface RemeraEntry {
  id: string;
  name: string;
  surname: string;
  email: string;
  size: string;
  model: string;
  proof_url: string;
  created_at: string;
}

// 🔹 Convierte la fecha UTC a hora local (Argentina)
const toLocalTime = (utcString: string) => {
  const date = new Date(utcString);
  date.setHours(date.getHours() - 3);
  return date.toLocaleString("es-AR", { hour12: false });
};

export default function RemerasTable() {
  const [entries, setEntries] = useState<RemeraEntry[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("pedidos_remeras")
        .select()
        .order("created_at", { ascending: false }); // 👈 ordenadas por fecha DESC

      if (error) {
        console.error("Error al obtener pedidos de remeras:", error);
        return;
      }

      if (data) setEntries(data);
    };

    fetchData();
  }, []);

  // 🔹 Filtrar por nombre o apellido
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
            <th>Talle</th>
            <th>Modelo</th>
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
              <td data-label="Talle">{e.size}</td>
              <td data-label="Modelo">{e.model}</td>
              <td data-label="Comprobante">
                {e.proof_url ? (
                  <a
                    href={e.proof_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver comprobante
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td data-label="Fecha">{toLocalTime(e.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
