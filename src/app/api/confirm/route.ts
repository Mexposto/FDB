// src/app/api/confirm/route.ts

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
  const email = formData.get("email");
  const amount = formData.get("amount");
  const file = formData.get("proof") as File | null;

  if (!name || !email || !amount) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 }
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "comprobantes");
  await mkdir(uploadsDir, { recursive: true });

  let proofUrl: string | null = null;

  // 🔑 Solo procesar archivo si hay aporte (amount > 0) y realmente se subió un file
  if (amount !== "0" && file && typeof file !== "string") {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = path.join(uploadsDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    proofUrl = `/comprobantes/${filename}`;
  }

  // Guardar en data.json
  const dataPath = path.join(process.cwd(), "data", "data.json");
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
    email,
    amount,
    proofUrl,
    timestamp: Date.now(),
  };
  existing.push(newEntry);

  await writeJson(dataPath, JSON.stringify(existing, null, 2), "utf8");

  return NextResponse.json({ success: true });
}
