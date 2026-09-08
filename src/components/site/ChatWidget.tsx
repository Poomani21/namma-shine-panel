import { Bot, MessageCircle, Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { askAssistant } from "@/lib/assistant.functions";
import { cn } from "@/lib/utils";
import { site, telLink, waLink } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: `Hi! I'm the Namma Laundry assistant. Ask me about our services, prices, pickup areas or delivery times.`,
};

const SUGGESTIONS = [
  { label: "Services", text: "What services do you offer?" },
  { label: "Pricing", text: "How much does dry cleaning cost?" },
  { label: "Pickup Areas", text: "Which areas do you pick up from?" },
  { label: "Book Pickup", text: "How do I book a pickup?" },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const { reply } = await askAssistant({
        data: { messages: next.filter((m) => m !== GREETING).slice(-12) },
      });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach our assistant just now. Please try again or message us on WhatsApp.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with Namma Laundry"
          className="fixed bottom-20 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
        >
          <Bot className="size-7" />
        </button>
      )}

      {open && (
        <div className="fixed inset-x-3 bottom-20 z-50 flex max-h-[75vh] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:right-4 sm:w-[380px] lg:bottom-6 lg:right-6">
          <div className="flex items-center justify-between gap-2 bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary-foreground/15">
                <Bot className="size-5" />
              </span>
              <span>
                <span className="block font-display text-sm leading-tight">
                  Namma Laundry Assistant
                </span>
                <span className="block text-[11px] opacity-80">{site.hours}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="inline-flex size-8 items-center justify-center rounded-md hover:bg-primary-foreground/15"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground"
                    : "text-foreground",
                )}
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="text-sm text-muted-foreground">Typing…</div>
            )}
          </div>

          <div className="border-t border-border px-3 pt-3">
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  disabled={busy}
                  onClick={() => send(s.text)}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/70 disabled:opacity-50"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <form
              className="mt-3 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about prices, services…"
                className="h-10 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>

            <div className="mt-2 grid grid-cols-2 gap-2 pb-3">
              <Button asChild size="sm" variant="secondary">
                <a href={waLink("Hi Namma Laundry, I would like to book a pickup.")}>
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={telLink}>
                  <Phone className="size-4" /> Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
