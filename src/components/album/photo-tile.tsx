"use client";

import { useState, useEffect } from "react";
import type { PhotoRecord } from "@/lib/store/photo-store";

interface PhotoTileProps {
  photo: PhotoRecord;
  featured?: boolean;
  onClick: () => void;
}

/** Manages its own object URL lifecycle (create on mount, revoke on unmount). */
export function PhotoTile({ photo, featured, onClick }: PhotoTileProps) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const u = URL.createObjectURL(photo.blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [photo.blob]);

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-surface-container fluffy-shadow spring-press ${
        featured ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={photo.description || "奶盖的照片"}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </button>
  );
}
