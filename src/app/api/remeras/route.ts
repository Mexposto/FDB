// src/app/api/remeras/route.ts

import {
  writeFile,
  mkdir,
  readFile,
  writeFile as writeJson,
} from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name");
  const surname = formData.get("surname");
  const email = formData.get("email");
  const size = formData.get("size");
  const model = formData.get("model");
  const amount = formData.get("amount");
  const file = formData.get("proof") as File | null;

  // 🚨 Validación de campos obligatorios
  if (!name || !surname || !email || !size || !model || !amount) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "comprobantes");
  await mkdir(uploadsDir, { recursive: true });

  let proofUrl: string | null = null;

  // ✅ Procesar comprobante solo si se subió
  if (file && typeof file !== "string") {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    proofUrl = `/comprobantes/${filename}`;
  }

  // 📂 Guardar en data/pedidos_remeras.json
  const dataPath = path.join(process.cwd(), "data", "pedidos_remeras.json");
  await mkdir(path.dirname(dataPath), { recursive: true });

  let existing = [];
  try {
    const raw = await readFile(dataPath, "utf8");
    existing = JSON.parse(raw);
  } catch {
    // si no existe, arrancamos con array vacío
  }

  const newEntry = {
    name,
    surname,
    email,
    size,
    model,
    amount,
    proofUrl,
    timestamp: Date.now(),
  };
  existing.push(newEntry);

  await writeJson(dataPath, JSON.stringify(existing, null, 2), "utf8");

  return NextResponse.json({ success: true });
}
