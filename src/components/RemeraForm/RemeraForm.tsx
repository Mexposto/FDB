// src/components/RemeraForm/RemeraForm.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./styles.module.css";
import Image from "next/image";

interface Props {
  modelo: { id: number; nombre: string; precio: number; imagen: string };
  onBack: () => void;
}

export default function RemeraForm({ modelo, onBack }: Props) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    size: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!file) return alert("Subí el comprobante de pago.");

    setLoading(true);

    try {
      const filePath = `comprobantes/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("comprobantes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("comprobantes")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("pedidos_remeras")
        .insert({
          name: form.name,
          surname: form.surname,
          email: form.email,
          size: form.size,
          model: modelo.nombre,
          amount: modelo.precio,
          proof_url: publicUrlData.publicUrl,
        });

      if (insertError) throw insertError;

      alert("¡Pedido confirmado! Te contactaremos pronto.");
      onBack();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.back} onClick={onBack}>
        ← Volver
      </button>

      <h2 className={styles.title}>Confirmá tu compra</h2>

      {/* 🔥 Info del modelo elegido */}
      <div className={styles.modeloInfo}>
        <Image
          src={modelo.imagen}
          alt={modelo.nombre}
          width={200} // ajustá según lo que quieras
          height={200} // ajustá según lo que quieras
          className={styles.modeloImagen}
        />
        <div>
          <p className={styles.modeloNombre}>{modelo.nombre}</p>
          <p className={styles.modeloPrecio}>${modelo.precio}</p>
        </div>
      </div>

      <p className={styles.alias}>
        Alias de pago: <strong>turemera.alias.mp</strong>
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="surname"
          placeholder="Apellido"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className={styles.input}
        />
        <select
          name="size"
          onChange={handleChange}
          required
          className={styles.input}
        >
          <option value="">Elegí tu talle</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Enviando..." : "Confirmar pedido"}
        </button>
      </form>
    </div>
  );
}
