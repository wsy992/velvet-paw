"use client";

const activities = [
  { time: "10:30", label: "正在吃饭", icon: "restaurant", bg: "bg-primary-container" },
  { time: "09:15", label: "正在喝水", icon: "water_drop", bg: "bg-tertiary-container" },
  { time: "08:00", label: "正在睡觉", icon: "bed", bg: "bg-surface-variant" },
];

export default function CameraPage() {
  return (
    <>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-40 bg-background/80 glass shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile pt-[max(0.5rem,env(safe-area-inset-top))] pb-stack-sm w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">pets</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary">实时监控</h1>
          </div>
          <button className="spring-press text-on-surface-variant hover:opacity-80 p-2">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-margin-mobile max-w-3xl mx-auto pb-8">
        {/* Live Feed Placeholder */}
        <section className="mb-stack-lg">
          <div className="bg-inverse-surface rounded-3xl overflow-hidden shadow-floating relative aspect-video w-full">
            {/* Placeholder content */}
            <div className="absolute inset-0 bg-gradient-to-br from-inverse-surface to-on-surface/80 flex items-center justify-center">
              <div className="text-center text-inverse-on-surface">
                <span className="material-symbols-outlined text-[64px] opacity-50" style={{ fontVariationSettings: "'FILL' 1" }}>
                  videocam
                </span>
                <p className="font-body-md text-body-md mt-2 opacity-60">摄像头未连接</p>
              </div>
            </div>

            {/* Status indicator — offline since camera not connected */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-text-secondary rounded-full" />
              <span className="font-label-sm text-label-sm text-white/80 tracking-wider">离线</span>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
                <span className="font-body-sm text-body-sm text-white">客厅摄像头</span>
              </div>
              <div className="flex gap-2">
                <button className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors spring-press">
                  <span className="material-symbols-outlined">mic</span>
                </button>
                <button className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hover:bg-black/70 transition-colors spring-press">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Camera Actions */}
          <div className="flex gap-4 mt-stack-md justify-center">
            <button className="flex-1 max-w-[160px] flex items-center justify-center gap-2 bg-primary-container text-on-primary-container py-3 px-4 rounded-full shadow-fluffy spring-press font-label-lg text-label-lg">
              <span className="material-symbols-outlined">photo_camera</span>
              立即抓拍
            </button>
            <button className="flex-1 max-w-[160px] flex items-center justify-center gap-2 bg-surface-container-lowest border-2 border-outline-variant text-primary py-3 px-4 rounded-full shadow-fluffy spring-press font-label-lg text-label-lg">
              <span className="material-symbols-outlined">history</span>
              历史回放
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-surface-container-lowest rounded-[20px] p-stack-md shadow-fluffy">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">最近活动</h2>
          <div className="relative pl-6 border-l-2 border-dashed border-outline-variant space-y-stack-md">
            {activities.map((act, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[35px] top-1 w-[32px] h-[32px] rounded-full ${act.bg} flex items-center justify-center shadow-sm`}>
                  <span className="material-symbols-outlined text-[18px] text-on-primary-container">{act.icon}</span>
                </div>
                <div>
                  <p className="font-label-lg text-label-lg text-on-surface">{act.label}</p>
                  <p className="font-body-sm text-body-sm text-text-secondary">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
