"use client";

const stats = [
  { label: "饮食", value: "2", unit: "次", icon: "pet_supplies", bg: "bg-primary-fixed", color: "text-primary" },
  { label: "饮水", value: "3", unit: "次", icon: "local_drink", bg: "bg-tertiary-fixed", color: "text-tertiary" },
  { label: "睡眠", value: "4", unit: "小时", icon: "night_shelter", bg: "bg-secondary-fixed", color: "text-secondary" },
  { label: "活跃度", value: "活跃", unit: "", icon: "sports_esports", bg: "bg-[#FFF3CD]", color: "text-warning" },
];

export function TodayStats() {
  return (
    <section>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-md px-1">今日状态</h3>
      <div className="grid grid-cols-2 gap-stack-md">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-[20px] p-stack-md fluffy-shadow flex flex-col justify-between aspect-square"
          >
            <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-2`}>
              <span
                className={`material-symbols-outlined ${stat.color}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
            </div>
            <div>
              <p className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">{stat.label}</p>
              <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">
                {stat.value}
                {stat.unit && <span className="font-body-md text-body-md text-text-secondary normal-case ml-0.5">{stat.unit}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
