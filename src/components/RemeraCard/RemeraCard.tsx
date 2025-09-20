// src/components/RemeraCard/RemeraCard.tsx
import Image from "next/image";
import styles from "./styles.module.css";

interface Props {
  modelo: { id: number; nombre: string; precio: number; imagen: string };
  onSelect: () => void;
}

export default function RemeraCard({ modelo, onSelect }: Props) {
  return (
    <div className={styles.card} onClick={onSelect}>
      <Image
        src={modelo.imagen}
        alt={modelo.nombre}
        width={300} // 👈 ajustá según tamaño deseado
        height={130}
        className={styles.image}
      />
      <h3 className={styles.title}>{modelo.nombre}</h3>
      <p className={styles.price}>${modelo.precio}</p>
      <button className={styles.button}>Elegir</button>
    </div>
  );
}
