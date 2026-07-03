"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { ChatBubble } from "@/components/ai/chat-bubble";
import { ChatInput } from "@/components/ai/chat-input";
import { QuickRecordTags } from "@/components/ai/quick-record-tags";
import {
  init,
  subscribe,
  getState,
  send,
  clear,
} from "@/lib/ai/chat-manager";

export default function AIChatPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to the module-level singleton so state survives unmount/navigation
  const state = useSyncExternalStore(subscribe, getState, getState);
  const { messages, isLoading, error } = state;

  useEffect(() => {
    init();
    setIsLoaded(true);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [messages, isLoading, isLoaded]);

  const handleSend = (text: string) => send(text);
  const handleTagClick = (label: string) => send(label);
  const handleClear = () => clear();

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-background/80 glass shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile pt-[max(0.5rem,env(safe-area-inset-top))] pb-stack-sm w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-stack-sm">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-primary-container bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">pets</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary">AI 助手</h1>
          </div>
          <button onClick={handleClear} className="spring-press hover:opacity-80 transition-opacity text-on-surface-variant p-2" title="清空">
            <span className="material-symbols-outlined">delete_sweep</span>
          </button>
        </div>
      </header>

      <main className="pt-[80px] px-margin-mobile max-w-3xl mx-auto w-full flex flex-col gap-stack-lg pb-[180px] min-h-dvh">
        <div className="flex-1 flex flex-col gap-stack-lg">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-stack-sm max-w-[85%]">
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 fluffy-shadow border border-surface-container-high bg-white flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-[20px]">pets</span>
              </div>
              <div className="flex flex-col gap-unit">
                <span className="font-label-sm text-label-sm text-text-secondary pl-2">奶盖的小助手</span>
                <div className="bg-white text-text-main font-body-md text-body-md p-stack-md rounded-[20px] rounded-tl-[4px] fluffy-shadow min-h-[48px] flex items-center">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-error-container/20 text-on-error-container font-body-sm text-body-sm p-stack-md rounded-xl text-center border border-error-container/50">
              {error}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <div className="fixed bottom-[72px] left-0 w-full bg-gradient-to-t from-background-warm via-background-warm to-transparent pt-stack-lg pb-stack-sm z-40">
        <div className="max-w-3xl mx-auto px-margin-mobile flex flex-col gap-stack-md">
          <QuickRecordTags onTagClick={handleTagClick} />
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </div>
    </>
  );
}
