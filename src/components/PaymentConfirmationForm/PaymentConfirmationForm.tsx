"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./styles.module.css";

interface Props {
  selectedAmount: number;
}

interface InsertData {
  name: string;
  surname: string;
  email: string;
  amount: number;
  proof_url?: string | null;
}

const PaymentConfirmationForm = ({ selectedAmount }: Props) => {
  const [form, setForm] = useState({ name: "", surname: "", email: "" });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (submitted) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            window.location.reload();
            return 100;
          }
          return prev + 7.5; // 2 segundos total
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (selectedAmount > 0 && !file) {
      return alert("Subí el comprobante.");
    }

    setLoading(true);

    try {
      let publicUrl: string | null = null;

      if (selectedAmount > 0 && file) {
        const filePath = `comprobantes/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("comprobantes")
          .upload(filePath, file);

        if (uploadError) throw new Error("Error subiendo el archivo");

        const { data: publicUrlData } = supabase.storage
          .from("comprobantes")
          .getPublicUrl(filePath);

        publicUrl = publicUrlData?.publicUrl ?? null;
        if (!publicUrl) throw new Error("No se pudo generar la URL pública.");
      }

      const insertData: InsertData = {
        name: form.name,
        surname: form.surname,
        email: form.email,
        amount: selectedAmount,
      };

      if (publicUrl) {
        insertData.proof_url = publicUrl;
      }

      const { error: insertError } = await supabase
        .from("confirmaciones")
        .insert(insertData);

      if (insertError) throw new Error("Error guardando los datos");

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.successMessageWrapper}>
        <p className={styles.successMessage}>¡Gracias, nos vemos ahí!</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.title}>Confirmá tu lugar:</h2>
      <p className={styles.description}>Monto elegido: ${selectedAmount}</p>

      <input
        className={styles.input}
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
        required
      />
      <input
        className={styles.input}
        name="surname"
        placeholder="Apellido"
        onChange={handleChange}
        required
      />
      <input
        className={styles.input}
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      {selectedAmount > 0 && (
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleFile}
          required
        />
      )}

      <button
        className={`${styles.button} ${loading ? styles.disabledButton : ""}`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Confirmar asistencia"}
      </button>
    </form>
  );
};

export default PaymentConfirmationForm;
