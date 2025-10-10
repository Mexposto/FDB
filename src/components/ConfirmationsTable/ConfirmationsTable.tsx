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

// 🔹 Convierte UTC a hora local (Argentina)
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
      const { data, error } = await supabase
        .from("confirmaciones")
        .select()
        .order("created_at", { ascending: false }); // 👈 ordenado por fecha DESC

      if (error) {
        console.error("Error al obtener confirmaciones:", error);
        return;
      }

      if (data) setEntries(data);
    };

    fetchData();
  }, []);

  // 🔹 Filtra por nombre o apellido
  const filtered = entries.filter((e) =>
    `${e.name} ${e.surname}`.toLowerCase().includes(filter.toLowerCase())
  );

  // 🔹 Calcula el total de montos filtrados
  const total = filtered.reduce((acc, curr) => acc + (curr.amount || 0), 0);

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
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Monto</th>
            <th>Comprobante</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e, index) => (
            <tr key={e.id} className={styles.row}>
              {/* Número invertido */}
              <td data-label="Número">{filtered.length - index}</td>
              <td data-label="Nombre">{e.name}</td>
              <td data-label="Apellido">{e.surname}</td>
              <td data-label="Email">{e.email}</td>
              <td data-label="Monto">
                {e.amount ? `$${e.amount.toLocaleString("es-AR")}` : "-"}
              </td>
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

      {/* 🔹 Total de montos aportados */}
      <div className={styles.totalContainer}>
        <p>
          <strong>Total aportado:</strong>{" "}
          <span className={styles.totalAmount}>
            ${total.toLocaleString("es-AR")}
          </span>
        </p>
      </div>
    </div>
  );
}
