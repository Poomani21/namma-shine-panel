import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { SYSTEM_PROMPT, buildSiteKnowledge } from "@/lib/chat-context";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

const FALLBACK =
  "I don't have that information. Please contact Namma Laundry on WhatsApp.";

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) { console.error("[assistant] no api key"); return { reply: FALLBACK }; }

    const system = SYSTEM_PROMPT.replace("{{KNOWLEDGE}}", buildSiteKnowledge());

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-3.7-flash",
          temperature: 0.2,
          messages: [{ role: "system", content: system }, ...data.messages],
        }),
      });

      if (res.status === 429)
        return {
          reply:
            "We're getting a lot of questions right now. Please try again in a moment, or message us on WhatsApp.",
        };
      if (!res.ok) { console.error("[assistant] gateway", res.status, (await res.text()).slice(0,300)); return { reply: FALLBACK }; }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply = json.choices?.[0]?.message?.content?.trim();
      return { reply: reply && reply.length > 0 ? reply : FALLBACK };
    } catch (e) {
      console.error("[assistant] error", e);
      return { reply: FALLBACK };
    }
  });
