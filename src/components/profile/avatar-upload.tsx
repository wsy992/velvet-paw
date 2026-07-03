"use client";

import { useRef } from "react";
import { useAvatar } from "@/lib/store/use-avatar";

interface AvatarUploadProps {
  size: number; // px
  className?: string; // wrapper classes (shape, border, etc.)
  iconSize?: number;
}

/**
 * Tappable avatar: shows the uploaded photo or a pets-icon placeholder.
 * Tap to pick a new photo (shared across home + profile via useAvatar).
 */
export function AvatarUpload({ size, className = "", iconSize = 48 }: AvatarUploadProps) {
  const { avatarUrl, loading, upload, remove } = useAvatar();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (file && file.type.startsWith("image/")) await upload(file);
  };

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-surface-container spring-press disabled:opacity-60"
        title="点击更换头像"
        aria-label="更换头像"
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="奶盖的头像" className="w-full h-full object-cover" />
        ) : (
          <span
            className="material-symbols-outlined text-primary-container"
            style={{ fontSize: iconSize, fontVariationSettings: "'FILL' 1" }}
          >
            {loading ? "hourglass_top" : "pets"}
          </span>
        )}
      </button>

      {/* Camera badge */}
      <span
        className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center border-2 border-white shadow-sm"
        style={{ fontSize: 14 }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          photo_camera
        </span>
      </span>

      {avatarUrl && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            remove();
          }}
          className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-surface-container-high text-text-secondary flex items-center justify-center shadow-sm spring-press"
          title="移除头像"
          aria-label="移除头像"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          if (fileRef.current) fileRef.current.value = "";
        }}
      />
    </div>
  );
}
