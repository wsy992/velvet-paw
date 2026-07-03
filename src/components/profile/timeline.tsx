"use client";

import { TimelineEvent } from "@/lib/store/pet-store";
import { formatDate } from "@/lib/utils/date";

const typeConfig: Record<string, { bg: string; icon: string; color: string }> = {
  vaccine: { bg: "bg-tertiary-container", icon: "vaccines", color: "text-on-tertiary-container" },
  deworming: { bg: "bg-secondary-fixed", icon: "bug_report", color: "text-on-secondary-container" },
  weight: { bg: "bg-primary-fixed", icon: "monitor_weight", color: "text-on-primary-container" },
  checkup: { bg: "bg-surface-variant", icon: "favorite", color: "text-on-surface-variant" },
  note: { bg: "bg-lavender/30", icon: "note", color: "text-on-surface-variant" },
  food: { bg: "bg-primary-fixed", icon: "restaurant", color: "text-on-primary-container" },
  water: { bg: "bg-tertiary-fixed", icon: "water_drop", color: "text-on-tertiary-container" },
  sleep: { bg: "bg-secondary-fixed", icon: "bedtime", color: "text-on-secondary-container" },
};

interface TimelineProps {
  events: TimelineEvent[];
  filter?: string;
  onEdit?: (event: TimelineEvent) => void;
  onDelete?: (id: string) => void;
}

export function Timeline({ events, filter, onEdit, onDelete }: TimelineProps) {
  const filtered = filter ? events.filter((e) => e.type === filter) : events;

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary font-body-md text-body-md">
        暂无记录，点击右下角 + 添加第一条吧 🐾
      </div>
    );
  }

  return (
    <section className="pl-2">
      {filtered.map((event) => {
        const config = typeConfig[event.type] || typeConfig.note;
        return (
          <div key={event.id} className="relative mb-stack-lg group">
            <div className="timeline-line flex gap-stack-md relative z-10">
              <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center shrink-0 z-10 shadow-sm`}>
                <span className={`material-symbols-outlined text-[18px] ${config.color}`}>{config.icon}</span>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-stack-md fluffy-shadow flex-1 hover:shadow-md transition-shadow relative group/card">
                {/* Edit/Delete buttons — always visible (touch has no hover) */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(event)}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container/30 active:bg-primary-container/40 transition-colors spring-press"
                      title="编辑"
                      aria-label="编辑"
                    >
                      <span className="material-symbols-outlined text-[16px] text-text-secondary">edit</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(event.id)}
                      className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-error-container/30 active:bg-error-container/40 transition-colors spring-press"
                      title="删除"
                      aria-label="删除"
                    >
                      <span className="material-symbols-outlined text-[16px] text-emergency">delete</span>
                    </button>
                  )}
                </div>

                <span className="font-label-sm text-label-sm text-text-secondary mb-1 block">{formatDate(event.date)}</span>
                <h3 className="font-body-lg text-body-lg text-on-surface pr-16">{event.title}</h3>
                {event.value && (
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-on-surface">{event.value}</span>
                    <span className="font-body-sm text-body-sm text-text-secondary">{event.unit}</span>
                  </div>
                )}
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{event.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
