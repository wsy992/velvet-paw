import { getDB, type PhotoRecord } from "./db";

export type { PhotoRecord };

function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Today's date as YYYY-MM-DD in local time. */
export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export async function addPhoto(blob: Blob, date: string, description = ""): Promise<PhotoRecord> {
  const db = await getDB();
  const record: PhotoRecord = {
    id: genId(),
    blob,
    date,
    description,
    createdAt: Date.now(),
  };
  await db.put("photos", record);
  return record;
}

export async function getPhotos(): Promise<PhotoRecord[]> {
  const db = await getDB();
  const all = await db.getAll("photos");
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getPhoto(id: string): Promise<PhotoRecord | undefined> {
  const db = await getDB();
  return db.get("photos", id);
}

export async function updatePhoto(id: string, updates: Partial<Pick<PhotoRecord, "description" | "date">>): Promise<void> {
  const db = await getDB();
  const existing = await db.get("photos", id);
  if (!existing) return;
  await db.put("photos", { ...existing, ...updates });
}

export async function deletePhoto(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("photos", id);
}

// ── Avatar (stored as a Blob in the kv store) ──────────────────────────────

const AVATAR_KEY = "avatar";

export async function setAvatarBlob(blob: Blob): Promise<void> {
  const db = await getDB();
  await db.put("kv", blob, AVATAR_KEY);
}

export async function getAvatarBlob(): Promise<Blob | undefined> {
  const db = await getDB();
  return (await db.get("kv", AVATAR_KEY)) as Blob | undefined;
}

export async function clearAvatar(): Promise<void> {
  const db = await getDB();
  await db.delete("kv", AVATAR_KEY);
}

// ── Image helpers ──────────────────────────────────────────────────────────

/**
 * Downscale an image file so album photos don't bloat IndexedDB.
 * Returns a JPEG blob capped at maxDim on the longest edge.
 */
export async function compressImage(file: File | Blob, maxDim = 1600, quality = 0.85): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file instanceof Blob ? file : new Blob();
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  return new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob || file),
      "image/jpeg",
      quality,
    );
  });
}
