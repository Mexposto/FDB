"use client";

import { useState } from "react";
import Image from "next/image";
import RemeraCard from "@/components/RemeraCard/RemeraCard";
import RemeraForm from "@/components/RemeraForm/RemeraForm";
import styles from "./styles.module.css";

const MODELOS = [
  {
    id: 1,
    nombre: "Oso Guardián",
    precio: 20000,
    imagen: "/oso guardian.png",
  },
  { id: 2, nombre: "Oso Gozadera", precio: 20000, imagen: "/oso gozadera.png" },
  {
    id: 3,
    nombre: "Pavo del Bosque",
    precio: 20000,
    imagen: "/pavo del bosque.png",
  },
];

export default function RemerasPage() {
  const [selected, setSelected] = useState<null | (typeof MODELOS)[0]>(null);
  const [showTalles, setShowTalles] = useState(false);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Remeras del Bosque</h1>
      <div className={styles.tallesSection}>
        <button
          className={styles.tallesButton}
          onClick={() => setShowTalles(!showTalles)}
        >
          {showTalles ? "Ocultar tabla de talles" : "Ver tabla de talles"}
        </button>

        {showTalles && (
          <div className={styles.talles}>
            <Image
              src="/tabla talles.jpg"
              alt="Tabla de talles"
              width={600} // ⚡ ajustá según lo que necesites
              height={400}
              className={styles.tallesImg}
            />
          </div>
        )}
      </div>

      <h2 className={styles.subheading}>Elegí tu remera</h2>

      {!selected ? (
        <div className={styles.cards}>
          {MODELOS.map((m) => (
            <RemeraCard key={m.id} modelo={m} onSelect={() => setSelected(m)} />
          ))}
        </div>
      ) : (
        <RemeraForm modelo={selected} onBack={() => setSelected(null)} />
      )}
    </main>
  );
}
