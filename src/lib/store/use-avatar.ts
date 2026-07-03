"use client";

import { useSyncExternalStore } from "react";
import { getAvatarBlob, setAvatarBlob, clearAvatar, compressImage } from "./photo-store";

// Module-level singleton so the avatar survives navigation and is shared
// between the home hero card and the profile header.

type Listener = () => void;

interface AvatarState {
  url: string | null;
  loading: boolean;
}

let url: string | null = null;
let loading = false;
let initialized = false;
let snapshot: AvatarState = { url, loading };
const listeners = new Set<Listener>();

function rebuild() {
  snapshot = { url, loading };
}
function notify() {
  rebuild();
  listeners.forEach((l) => l());
}

async function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const blob = await getAvatarBlob();
    if (blob) url = URL.createObjectURL(blob);
  } catch {}
  rebuild();
  notify();
}

function subscribe(l: Listener) {
  listeners.add(l);
  init();
  return () => listeners.delete(l);
}

function getSnapshot(): AvatarState {
  return snapshot;
}

export function useAvatar() {
  const { url: avatarUrl, loading: avatarLoading } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const upload = async (file: File) => {
    loading = true;
    notify();
    try {
      const blob = await compressImage(file, 512, 0.9);
      await setAvatarBlob(blob);
      if (url) URL.revokeObjectURL(url);
      url = URL.createObjectURL(blob);
    } catch {
      // ignore — keep previous avatar
    } finally {
      loading = false;
      notify();
    }
  };

  const remove = async () => {
    if (url) URL.revokeObjectURL(url);
    url = null;
    await clearAvatar();
    notify();
  };

  return { avatarUrl, loading: avatarLoading, upload, remove };
}
