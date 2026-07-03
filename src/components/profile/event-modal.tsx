"use client";

import { useState } from "react";
import { TimelineEvent } from "@/lib/store/pet-store";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<TimelineEvent, "id">) => void;
  editEvent?: TimelineEvent | null;
}

const eventTypes = [
  { key: "vaccine", label: "疫苗" },
  { key: "deworming", label: "驱虫" },
  { key: "weight", label: "体重" },
  { key: "checkup", label: "体检" },
  { key: "note", label: "笔记" },
  { key: "food", label: "饮食" },
  { key: "water", label: "饮水" },
  { key: "sleep", label: "睡眠" },
] as const;

export function EventModal({ isOpen, onClose, onSave, editEvent }: EventModalProps) {
  const [type, setType] = useState<TimelineEvent["type"]>(editEvent?.type || "note");
  const [title, setTitle] = useState(editEvent?.title || "");
  const [description, setDescription] = useState(editEvent?.description || "");
  const [date, setDate] = useState(editEvent?.date || new Date().toISOString().split("T")[0]);
  const [value, setValue] = useState(editEvent?.value?.toString() || "");
  const [unit, setUnit] = useState(editEvent?.unit || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type,
      title,
      description,
      date,
      ...(value ? { value: parseFloat(value), unit: unit || undefined } : {}),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full md:max-w-md bg-surface-container-lowest rounded-t-3xl md:rounded-3xl p-stack-lg shadow-floating max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom">
        <div className="flex justify-between items-center mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {editEvent ? "编辑记录" : "添加记录"}
          </h2>
          <button onClick={onClose} className="spring-press p-2 rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          {/* Date */}
          <div>
            <label className="font-label-sm text-label-sm text-text-secondary mb-1 block">日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#F5F5F5] rounded-[16px] p-3 font-body-md text-body-md text-text-main border-2 border-transparent focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,140,66,0.2)] outline-none transition-all inner-dimple"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="font-label-sm text-label-sm text-text-secondary mb-1 block">类型</label>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((et) => (
                <button
                  key={et.key}
                  type="button"
                  onClick={() => setType(et.key as TimelineEvent["type"])}
                  className={`px-4 py-2 rounded-full font-body-sm text-body-sm transition-all spring-press ${
                    type === et.key
                      ? "bg-primary-container text-on-primary-container shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {et.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-label-sm text-label-sm text-text-secondary mb-1 block">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="记录标题"
              className="w-full bg-[#F5F5F5] rounded-[16px] p-3 font-body-md text-body-md text-text-main border-2 border-transparent focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,140,66,0.2)] outline-none transition-all inner-dimple"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-label-sm text-label-sm text-text-secondary mb-1 block">描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="详细记录..."
              rows={3}
              className="w-full bg-[#F5F5F5] rounded-[16px] p-3 font-body-md text-body-md text-text-main border-2 border-transparent focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,140,66,0.2)] outline-none transition-all inner-dimple resize-none"
            />
          </div>

          {/* Value (optional - for weight etc.) */}
          <div className="flex gap-stack-md">
            <div className="flex-1">
              <label className="font-label-sm text-label-sm text-text-secondary mb-1 block">数值（可选）</label>
              <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="例如 4.2"
                className="w-full bg-[#F5F5F5] rounded-[16px] p-3 font-body-md text-body-md text-text-main border-2 border-transparent focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,140,66,0.2)] outline-none transition-all inner-dimple"
              />
            </div>
            <div className="w-24">
              <label className="font-label-sm text-label-sm text-text-secondary mb-1 block">单位</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="kg"
                className="w-full bg-[#F5F5F5] rounded-[16px] p-3 font-body-md text-body-md text-text-main border-2 border-transparent focus:border-primary focus:shadow-[0_0_0_4px_rgba(255,140,66,0.2)] outline-none transition-all inner-dimple"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-3 px-6 rounded-full font-label-lg text-label-lg shadow-fluffy-active hover:opacity-90 transition-all spring-press mt-stack-sm"
          >
            {editEvent ? "保存修改" : "添加记录"}
          </button>
        </form>
      </div>
    </div>
  );
}
