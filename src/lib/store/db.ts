import { openDB, type DBSchema, type IDBPDatabase } from "idb";

export interface PhotoRecord {
  id: string;
  blob: Blob;
  date: string; // YYYY-MM-DD (local)
  description: string;
  createdAt: number;
}

interface VelvetDB extends DBSchema {
  photos: {
    key: string;
    value: PhotoRecord;
    indexes: { "by-date": string; "by-createdAt": number };
  };
  kv: {
    key: string;
    value: unknown;
  };
}

const DB_NAME = "velvet-paw";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<VelvetDB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("IndexedDB unavailable on server"));
  }
  if (!dbPromise) {
    dbPromise = openDB<VelvetDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("photos")) {
          const store = db.createObjectStore("photos", { keyPath: "id" });
          store.createIndex("by-date", "date");
          store.createIndex("by-createdAt", "createdAt");
        }
        if (!db.objectStoreNames.contains("kv")) {
          db.createObjectStore("kv");
        }
      },
    });
  }
  return dbPromise;
}
