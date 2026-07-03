import { NextRequest } from "next/server";

const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const BASE_URL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/anthropic";

const SYSTEM_PROMPT = `你是 Velvet Paw 宠物伴侣 App 中的 AI 宠物助手。

关于猫咪的信息：
- 名字：奶盖
- 品种：短腿长毛拿破仑猫（银白色）
- 性别：男孩子
- 生日：2026年1月1日（现在约半岁多）
- 性格：活泼好动，喜欢玩耍

你的职责：
1. 回答关于养猫的各种问题（健康、饮食、行为等）
2. 帮用户记录猫咪的日常（吃了什么、体重变化、异常情况等）
3. 提醒疫苗、驱虫等重要事项
4. 给出养猫建议和温馨提醒

回复风格：温暖、亲切、专业，偶尔带点调皮。用中文回复，称呼用户为"家长"。`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!API_KEY) return Response.json({ error: "API 密钥未配置" }, { status: 500 });

    // Strip leading assistant messages
    const msgs = [...(messages || [])].slice(-20);
    while (msgs.length > 0 && msgs[0]?.role === "assistant") msgs.shift();

    if (msgs.length === 0) {
      return Response.json({ error: "没有可发送的消息" }, { status: 400 });
    }

    console.log("[chat] Sending request...");

    // Call Anthropic-compatible API (non-streaming)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const res = await fetch(`${BASE_URL}/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash[1m]",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: msgs.map((m: any) => ({ role: m.role, content: m.content })),
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    // Read full response
    const rawText = await res.text();
    console.log("[chat] Status:", res.status);
    console.log("[chat] Raw:", rawText.slice(0, 400));

    if (!res.ok) {
      return Response.json({ error: `API 请求失败 (${res.status})` }, { status: 500 });
    }

    // Try to extract text from response
    let content = "";

    try {
      const json = JSON.parse(rawText);

      // Anthropic format: { content: [{ type: "text", text: "..." }, { type: "thinking", ... }] }
      if (Array.isArray(json.content)) {
        content = json.content
          .filter((b: any) => b.type === "text")
          .map((b: any) => b.text)
          .join("");
      }
      // Fallback: direct string or completion
      if (!content) content = json.content || json.completion || json.response || "";
      // Ensure it's a string
      if (typeof content !== "string") content = "";
    } catch {}

    // Format 2: Anthropic SSE stream collected as text
    if (!content) {
      const lines = rawText.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const d = JSON.parse(line.slice(6));
            if (d.type === "content_block_delta") {
              content += d.delta?.text || "";
            }
            if (d.type === "message_start" && d.message?.content) {
              for (const block of d.message.content) {
                if (block.type === "text") content += block.text || "";
              }
            }
          } catch {}
        }
      }
    }

    if (!content) {
      console.log("[chat] Could not extract content from response");
      return Response.json({ error: `AI 返回内容为空: ${rawText.slice(0, 200)}` }, { status: 500 });
    }

    console.log("[chat] Success, content length:", content.length);
    return Response.json({ content });
  } catch (err: any) {
    console.error("[chat] Error:", err?.message);
    if (err?.name === "AbortError") {
      return Response.json({ error: "请求超时，请稍后重试" }, { status: 504 });
    }
    return Response.json({ error: "服务器错误" }, { status: 500 });
  }
}
