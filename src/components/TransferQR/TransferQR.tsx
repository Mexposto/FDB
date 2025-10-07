"use client";
import { useState } from "react";
import styles from "./styles.module.css";

interface Props {
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
}

const alias = "Alias: macambolemp";

const TransferQR = ({ selectedAmount, setSelectedAmount }: Props) => {
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | "">("");

  const handleAmountClick = (value: number) => {
    setIsCustomActive(false);
    setCustomAmount("");
    setSelectedAmount(value);
  };

  const handleCustomClick = () => {
    setIsCustomActive(true);
    setSelectedAmount(customAmount === "" ? null : Number(customAmount));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const num = value === "" ? "" : Number(value);
      if (num === "" || num > 0) {
        setCustomAmount(num);
        setSelectedAmount(num === "" ? null : num);
      }
    }
  };

  const handleZeroClick = () => {
    setIsCustomActive(false);
    setCustomAmount("");
    setSelectedAmount(0);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Acceso al Bosque</h2>
      <p className={styles.description}>
        Aunque el Festival Del Bosque es sin fines de lucro, valoramos mucho el
        trabajo de cada propuesta artística, por eso, el ingreso es “a la gorra”
        con un valor sugerido, que se reparte íntegramente entre les artistas de
        la noche. Dado que el festi se realiza en una reserva natural en Jose
        León Suarez, su capacidad es limitada. Para evitar reservas sin
        compromiso, este año implementamos una &quot;Gorra virtual&quot; como
        compromiso de asistencia. Su valor es sugerido, no obligatorio, y no
        condiciona el acceso: lo más importante es tu presencia. El formulario
        es personal, por lo que cada asistente debe completarlo de forma
        individual. Una vez hecho el aporte (si puede realizarse) y enviados tus
        datos, ¡tu lugar en el bosque estará reservado y te esperamos! La
        ubicación del festi te va a llegar al mail que pongas en el formulario
        de abajo.
      </p>

      <p className={styles.subtitle}>Seleccioná un monto:</p>
      <div className={styles.buttonGroup}>
        {[5000, 8000, 10000].map((value) => (
          <button
            key={value}
            onClick={() => handleAmountClick(value)}
            className={`${styles.button} ${
              selectedAmount === value ? styles.selected : ""
            }`}
          >
            ${value}
          </button>
        ))}

        {/* 🔹 Otro monto */}
        {isCustomActive ? (
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            placeholder="Ingresá otro monto"
            value={customAmount === "" ? "" : customAmount}
            onChange={handleCustomChange}
            className={`${styles.button} ${styles.customInput}`}
          />
        ) : (
          <button
            onClick={handleCustomClick}
            className={`${styles.button} ${
              customAmount !== "" ? styles.selected : ""
            }`}
          >
            Otro monto
          </button>
        )}

        {/* 🔹 Botón $0 */}
        <button
          onClick={handleZeroClick}
          className={`${styles.button} ${
            selectedAmount === 0 ? styles.selected : ""
          }`}
        >
          No puedo aportar ($0)
        </button>
      </div>

      {selectedAmount !== null && selectedAmount > 0 && (
        <div className={styles.transferInfo}>
          <p className={styles.transferText}>
            Transferí al siguiente alias y llená el formulario de abajo para
            confirmar tu lugar
          </p>
          <p className={styles.alias}>
            <strong>{alias}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default TransferQR;
