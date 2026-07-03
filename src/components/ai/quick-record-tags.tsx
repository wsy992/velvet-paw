"use client";

const tags = [
  { label: "今天吃了什么？", icon: "restaurant", color: "text-tertiary" },
  { label: "体重记录", icon: "monitor_weight", color: "text-warning" },
  { label: "异常情况", icon: "warning", color: "text-emergency" },
  { label: "疫苗提醒", icon: "vaccines", color: "text-primary" },
];

interface QuickRecordTagsProps {
  onTagClick: (label: string) => void;
}

export function QuickRecordTags({ onTagClick }: QuickRecordTagsProps) {
  return (
    <div className="flex gap-stack-sm overflow-x-auto no-scrollbar pb-2 px-1 scroll-smooth snap-x">
      {tags.map((tag) => (
        <button
          key={tag.label}
          onClick={() => onTagClick(tag.label)}
          className="shrink-0 bg-white border border-surface-container-highest text-text-main font-label-lg text-label-lg px-4 py-3 rounded-full fluffy-shadow hover:bg-surface-container-lowest transition-colors snap-start flex items-center gap-2 spring-press"
        >
          <span className={`material-symbols-outlined text-[18px] ${tag.color}`}>{tag.icon}</span>
          {tag.label}
        </button>
      ))}
    </div>
  );
}
