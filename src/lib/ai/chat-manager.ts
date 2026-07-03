// Module-level singleton chat manager.
// Holds messages + in-flight request OUTSIDE the React component,
// so navigating away mid-request doesn't cancel it or lose state.

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "velvet-paw-chat-messages";
export const WELCOME_MSG: ChatMessage = {
  role: "assistant",
  content: "我是奶盖的专属助手～今天想了解奶盖的什么情况？",
};

type Listener = () => void;

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

let messages: ChatMessage[] = [];
let isLoading = false;
let error: string | null = null;
let initialized = false;
const listeners = new Set<Listener>();

// Cached snapshot — useSyncExternalStore requires a referentially stable
// return value from getSnapshot, or it loops forever.
let snapshot: ChatState = { messages, isLoading, error };

function rebuildSnapshot() {
  snapshot = { messages, isLoading, error };
}

function notify() {
  rebuildSnapshot();
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const cleaned = parsed
          .filter((m: any) => m && typeof m.content === "string")
          .map((m: any) => ({ role: m.role, content: m.content }));
        if (cleaned.length > 0) {
          messages = cleaned;
          return true;
        }
      }
    }
  } catch {}
  return false;
}

/**
 * Called on mount. Loads from storage if not yet done.
 * If there's a pending user message with no reply, we DON'T discard it —
 * instead we resume the request.
 */
export function init() {
  if (!initialized) {
    initialized = true;
    if (!loadFromStorage() || messages.length === 0) {
      messages = [WELCOME_MSG];
    } else if (messages[messages.length - 1]?.role === "user") {
      // Resume interrupted request: last message is a user message with no reply
      rebuildSnapshot();
      resumePending();
      return () => {};
    }
  }
  rebuildSnapshot();
  notify();
  return () => {};
}

export function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getState(): ChatState {
  return snapshot;
}

export function clear() {
  messages = [WELCOME_MSG];
  error = null;
  isLoading = false;
  persist();
  notify();
}

async function fetchReply(history: ChatMessage[]): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: history.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `请求失败 (${res.status})`);
  if (!data.content) throw new Error("AI 返回了空内容");
  return data.content as string;
}

export async function send(text: string) {
  if (isLoading) return;

  const userMessage: ChatMessage = { role: "user", content: text };
  messages = [...messages, userMessage];
  isLoading = true;
  error = null;
  persist();
  notify();

  const history = [...messages];
  try {
    const reply = await fetchReply(history);
    const replyMessage: ChatMessage = { role: "assistant", content: reply };
    messages = [...messages, replyMessage];
  } catch (err) {
    error = err instanceof Error ? err.message : "请求失败";
    // Drop the orphaned user message so it's clear the request failed
    if (messages[messages.length - 1]?.role === "user") {
      messages = messages.slice(0, -1);
    }
  } finally {
    isLoading = false;
    persist();
    notify();
  }
}

/** Resume a request that was interrupted by navigation. */
async function resumePending() {
  if (isLoading) return;
  const history = [...messages];
  isLoading = true;
  error = null;
  notify();

  try {
    const reply = await fetchReply(history);
    const replyMessage: ChatMessage = { role: "assistant", content: reply };
    messages = [...messages, replyMessage];
  } catch (err) {
    error = err instanceof Error ? err.message : "请求失败";
    if (messages[messages.length - 1]?.role === "user") {
      messages = messages.slice(0, -1);
    }
  } finally {
    isLoading = false;
    persist();
    notify();
  }
}
