"use client";

import { AvatarUpload } from "@/components/profile/avatar-upload";

export function CatHeroCard() {
  return (
    <section className="bg-surface-container-lowest rounded-[20px] p-stack-md fluffy-shadow flex flex-col items-center relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-fixed opacity-30 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-fixed opacity-30 rounded-full blur-3xl" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Avatar — tap to upload; falls back to a cute icon placeholder */}
        <div className="relative -mt-4 mb-2 animate-breathe">
          <AvatarUpload
            size={192}
            iconSize={80}
            className="rounded-full bg-gradient-to-br from-primary-container/40 to-secondary-container/40"
          />
        </div>

        {/* Cat Name */}
        <h2 className="font-headline-md text-headline-md text-on-surface mb-unit">奶盖</h2>

        {/* Mood bubble */}
        <div className="bg-surface-container-low px-4 py-2 rounded-full mt-2">
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              mood
            </span>
            &ldquo;我今天心情超棒~&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
