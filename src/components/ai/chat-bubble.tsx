"use client";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  // Safety: ensure content is a string
  const safeContent = typeof content === "string" ? content : String(content || "");

  if (role === "assistant") {
    return (
      <div className="flex items-start gap-stack-sm max-w-[85%]">
        <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 fluffy-shadow border border-surface-container-high bg-white flex items-center justify-center">
          <span className="material-symbols-outlined text-primary-container text-[20px]">pets</span>
        </div>
        <div className="flex flex-col gap-unit">
          <span className="font-label-sm text-label-sm text-text-secondary pl-2">奶盖的小助手</span>
          <div className="bg-white text-text-main font-body-md text-body-md p-stack-md rounded-[20px] rounded-tl-[4px] fluffy-shadow whitespace-pre-wrap">
            {safeContent || " "}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end justify-end max-w-[85%] self-end">
      <div className="bg-primary text-on-primary font-body-md text-body-md p-stack-md rounded-[20px] rounded-br-[4px] fluffy-shadow-active whitespace-pre-wrap">
        {safeContent}
      </div>
    </div>
  );
}

/** Combined streaming message: shows avatar + typing dots while loading, then transitions to content */
export function StreamingMessage({ content }: { content: string }) {
  return (
    <div className="flex items-start gap-stack-sm max-w-[85%]">
      <div className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 fluffy-shadow border border-surface-container-high bg-white flex items-center justify-center">
        <span className="material-symbols-outlined text-primary-container text-[20px]">pets</span>
      </div>
      <div className="flex flex-col gap-unit">
        <span className="font-label-sm text-label-sm text-text-secondary pl-2">奶盖的小助手</span>
        <div className="bg-white text-text-main font-body-md text-body-md p-stack-md rounded-[20px] rounded-tl-[4px] fluffy-shadow whitespace-pre-wrap min-h-[48px] flex items-center">
          {content ? (
            content
          ) : (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
              <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
