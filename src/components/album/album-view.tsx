"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { PhotoViewer } from "./photo-viewer";
import { PhotoTile } from "./photo-tile";
import {
  getPhotos,
  addPhoto,
  compressImage,
  todayStr,
  type PhotoRecord,
} from "@/lib/store/photo-store";
import { formatMonthYear } from "@/lib/utils/date";

interface MonthGroup {
  key: string; // YYYY-MM
  label: string;
  photos: PhotoRecord[];
}

function groupByMonth(photos: PhotoRecord[]): MonthGroup[] {
  const map = new Map<string, MonthGroup>();
  for (const p of photos) {
    const key = p.date.slice(0, 7); // YYYY-MM
    if (!map.has(key)) {
      map.set(key, { key, label: formatMonthYear(p.date), photos: [] });
    }
    map.get(key)!.photos.push(p);
  }
  // Sort months descending (most recent first)
  return Array.from(map.values()).sort((a, b) => b.key.localeCompare(a.key));
}

export function AlbumView() {
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewerId, setViewerId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    try {
      setPhotos(await getPhotos());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const groups = useMemo(() => groupByMonth(photos), [photos]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const today = todayStr();
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const blob = await compressImage(file, 1600, 0.85);
        await addPhoto(blob, today, "");
      }
      await refresh();
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setViewerId(null);
    const { deletePhoto } = await import("@/lib/store/photo-store");
    await deletePhoto(id);
  };

  const viewerPhoto = photos.find((p) => p.id === viewerId) || null;

  return (
    <div className="pb-8">
      {/* Upload bar */}
      <div className="flex items-center justify-between mb-stack-lg">
        <span className="font-body-sm text-body-sm text-text-secondary">
          共 {photos.length} 张照片
        </span>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full shadow-fluffy-active spring-press font-label-lg text-label-lg disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[20px]">
            {uploading ? "hourglass_top" : "add_a_photo"}
          </span>
          {uploading ? "上传中" : "上传照片"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary font-body-md text-body-md">
          加载中...
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-16 text-text-secondary font-body-md text-body-md">
          <span className="material-symbols-outlined text-[56px] block mb-2 opacity-40">photo_library</span>
          还没有照片，点击上方上传奶盖的第一张照片吧 🐾
        </div>
      ) : (
        <div className="flex flex-col gap-stack-lg">
          {groups.map((group) => (
            <section key={group.key}>
              {/* Sticky month header */}
              <div className="sticky top-[64px] z-20 -mx-1 px-1 py-1 mb-stack-sm bg-background-warm/90 backdrop-blur-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{group.label}</h3>
                <span className="font-label-sm text-label-sm text-text-secondary">{group.photos.length} 张</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {group.photos.map((photo, i) => (
                  <PhotoTile
                    key={photo.id}
                    photo={photo}
                    featured={i === 0}
                    onClick={() => setViewerId(photo.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {viewerPhoto && (
        <PhotoViewer photo={viewerPhoto} onClose={() => setViewerId(null)} onDelete={handleDelete} />
      )}
    </div>
  );
}
