"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils/date";
import type { PhotoRecord } from "@/lib/store/photo-store";

interface PhotoViewerProps {
  photo: PhotoRecord;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function PhotoViewer({ photo, onClose, onDelete }: PhotoViewerProps) {
  const [url, setUrl] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const u = URL.createObjectURL(photo.blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [photo.blob]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center animate-in fade-in">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 bg-gradient-to-b from-black/60 to-transparent z-10">
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white spring-press">
          <span className="material-symbols-outlined">close</span>
        </button>
        <span className="font-body-sm text-body-sm text-white/80">{formatDate(photo.date)}</span>
        <button
          onClick={() => setConfirming(true)}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white spring-press"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      {/* Image */}
      <img
        src={url}
        alt={photo.description || "奶盖的照片"}
        className="max-w-full max-h-[80vh] object-contain"
      />

      {photo.description && (
        <p className="absolute bottom-20 left-0 right-0 text-center text-white/90 font-body-md text-body-md px-6">
          {photo.description}
        </p>
      )}

      {/* Delete confirm */}
      {confirming && (
        <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center px-8">
          <div className="bg-surface-container-lowest rounded-3xl p-stack-lg w-full max-w-xs text-center shadow-floating">
            <span className="material-symbols-outlined text-[40px] text-emergency">delete</span>
            <p className="font-body-md text-body-md text-on-surface mt-2 mb-stack-lg">确定删除这张照片吗？</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-label-lg text-label-lg spring-press"
              >
                取消
              </button>
              <button
                onClick={() => onDelete(photo.id)}
                className="flex-1 py-2.5 rounded-full bg-emergency text-white font-label-lg text-label-lg spring-press"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
