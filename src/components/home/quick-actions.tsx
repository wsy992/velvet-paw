"use client";

const actions = [
  { label: "喂食", icon: "restaurant", color: "text-primary" },
  { label: "喂水", icon: "water_drop", color: "text-tertiary" },
  { label: "睡觉", icon: "bedtime", color: "text-secondary" },
  { label: "驱虫", icon: "medication", color: "text-warning" },
];

export function QuickActions() {
  return (
    <section className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x">
      {actions.map((action) => (
        <button
          key={action.label}
          className="snap-start shrink-0 flex items-center gap-2 px-5 py-3 rounded-full bg-surface-container-lowest fluffy-shadow spring-press border border-surface-container-highest hover:bg-surface-container-low transition-colors"
        >
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1", color: "inherit" }}
          >
            {action.icon}
          </span>
          <span className={`font-label-lg text-label-lg text-on-surface ${action.color}`}>
            {action.label}
          </span>
        </button>
      ))}
    </section>
  );
}
