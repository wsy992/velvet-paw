"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "首页", icon: "home", activeIcon: "home" },
  { href: "/ai-chat", label: "AI 助手", icon: "smart_toy", activeIcon: "smart_toy" },
  { href: "/profile", label: "档案", icon: "inventory_2", activeIcon: "inventory_2" },
  { href: "/camera", label: "监控", icon: "photo_camera", activeIcon: "photo_camera" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <div className="flex justify-around items-center px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-surface/80 glass shadow-[0_-4px_12px_rgba(0,0,0,0.06)] rounded-t-2xl">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container scale-105"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
                style={{ width: 64 }}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                <span className="font-label-sm text-label-sm mt-0.5">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex-col p-stack-md z-50">
        <div className="flex items-center gap-3 px-3 py-6 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container">pets</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary">Velvet Paw</h1>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary-container/30 text-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                <span className="font-body-md text-body-md">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
