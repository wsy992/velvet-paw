"use client";

import { useState, useRef } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-stack-sm bg-[#F5F5F5] rounded-[20px] p-2 inner-dimple border-2 border-transparent focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(255,140,66,0.2)] transition-all">
      <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors shrink-0 text-text-secondary">
        <span className="material-symbols-outlined">add_circle</span>
      </button>
      <input
        ref={inputRef}
        className="flex-1 bg-transparent border-none focus:ring-0 outline-none font-body-md text-body-md text-text-main placeholder:text-text-secondary py-2 px-1"
        placeholder="问问关于奶盖的事..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary text-on-primary hover:bg-surface-tint transition-colors shrink-0 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          send
        </span>
      </button>
    </div>
  );
}
