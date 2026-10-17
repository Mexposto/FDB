"use client";

import Image from "next/image";
import { useState } from "react";
import TransferQR from "@/components/TransferQR/TransferQR";
import PaymentConfirmationForm from "@/components/PaymentConfirmationForm/PaymentConfirmationForm";
import styles from "./styles.module.css";

export default function TuLugarPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.column}>
        <Image
          src="/osopeludo1.png"
          alt="Oso con gorro"
          className={styles.osoImage}
          width={260}
          height={390}
          priority
          draggable={false}
        />
      </div>

      <div className={styles.column}>
        <TransferQR
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
      </div>

      <div className={styles.column}>
        {selectedAmount !== null ? (
          <PaymentConfirmationForm selectedAmount={selectedAmount} />
        ) : (
          <p className={styles.waiting}>
            Seleccioná un monto para confirmar tu lugar y completá el
            formulario.
          </p>
        )}
      </div>
    </main>
  );
}
