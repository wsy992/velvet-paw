"use client";

import { PetProfile } from "@/lib/store/pet-store";
import { getAgeDisplay } from "@/lib/utils/date";
import { AvatarUpload } from "./avatar-upload";

interface ProfileHeaderProps {
  pet: PetProfile;
}

export function ProfileHeader({ pet }: ProfileHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-primary-fixed to-surface-container-highest rounded-3xl p-stack-lg mb-stack-lg relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-stack-md relative z-10">
        {/* Tappable avatar — tap to upload, shared with home */}
        <AvatarUpload
          size={96}
          iconSize={48}
          className="rounded-full border-4 border-white fluffy-shadow"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-headline-lg-mobile text-on-surface font-headline-lg-mobile">{pet.name}</h2>
            <span className="bg-secondary-fixed text-on-secondary-container rounded-full px-2 py-0.5 text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">male</span>
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">出生于: {pet.birthday.replace(/-/g, ".")}</p>
          <p className="font-label-lg text-label-lg text-primary">{getAgeDisplay(pet.birthday)}</p>
        </div>
      </div>
    </section>
  );
}
