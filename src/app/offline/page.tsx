export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-6 bg-background-warm">
      <div className="text-center">
        <span className="material-symbols-outlined text-[80px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
          pets
        </span>
        <h1 className="font-headline-md text-headline-md text-on-surface mt-stack-md mb-stack-sm">当前无网络连接</h1>
        <p className="font-body-md text-body-md text-text-secondary">奶盖的档案、相册和对话记录都在本地，联网后会自动同步。</p>
      </div>
    </div>
  );
}
