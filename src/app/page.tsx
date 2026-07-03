"use client";

import { CatHeroCard } from "@/components/home/cat-hero-card";
import { QuickActions } from "@/components/home/quick-actions";
import { TodayStats } from "@/components/home/today-stats";

export default function HomePage() {
  return (
    <>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-40 bg-background/80 glass shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile pt-[max(0.5rem,env(safe-area-inset-top))] pb-stack-sm w-full max-w-3xl mx-auto">
          <button className="spring-press hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center border-2 border-surface-container">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
            </div>
          </button>
          <h1 className="font-headline-md text-headline-md text-primary">Velvet Paw</h1>
          <button className="spring-press hover:opacity-80 transition-opacity text-on-surface-variant p-2">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[80px] px-margin-mobile flex flex-col gap-stack-lg max-w-3xl mx-auto pb-8">
        <CatHeroCard />
        <QuickActions />
        <TodayStats />
      </main>
    </>
  );
}
