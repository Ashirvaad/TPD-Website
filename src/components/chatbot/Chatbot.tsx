"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { chatbotEntries, chatbotFallback, chatbotWelcome } from "@/data/chatbot";
import type { ChatbotEntry } from "@/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Message = { id: number; from: "bot" | "user"; text: string; cta?: ChatbotEntry["cta"] };

const normalise = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Keyword matcher: the entry with the most keyword hits wins; ties go to the earlier entry. */
export function matchQuestion(input: string): ChatbotEntry | undefined {
  const text = ` ${normalise(input)} `;
  if (!text.trim()) return undefined;
  let best: ChatbotEntry | undefined;
  let bestScore = 0;
  for (const entry of chatbotEntries) {
    const score = entry.keywords.reduce((n, k) => {
      const key = normalise(k);
      return text.includes(` ${key} `) || (key.length > 4 && text.includes(key)) ? n + key.split(" ").length : n;
    }, 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: chatbotWelcome }]);
  const [asked, setAsked] = useState<string[]>([]);
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const push = (msg: Omit<Message, "id">) => setMessages((m) => [...m, { ...msg, id: nextId.current++ }]);

  const ask = (question: string, entry?: ChatbotEntry) => {
    const match = entry ?? matchQuestion(question);
    push({ from: "user", text: question });
    if (match) setAsked((a) => [...a, match.id]);
    window.setTimeout(
      () =>
        push(
          match
            ? { from: "bot", text: match.answer, cta: match.cta }
            : { from: "bot", text: chatbotFallback, cta: { label: "Contact our team", href: "/contact" } },
        ),
      350,
    );
  };

  const toggle = () => {
    if (!open) track("chatbot_open");
    setOpen(!open);
  };

  const suggestions = chatbotEntries.filter((e) => !asked.includes(e.id)).slice(0, 4);

  return (
    <div data-chat className="fixed bottom-4 right-4 z-[var(--z-chat)] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="flex h-[min(34rem,calc(100svh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-[#121116]/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p id={titleId} className="text-sm font-semibold">
                The Purple Door
              </p>
              <p className="text-xs text-muted">Quick answers · not a live agent</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-fg"
              aria-label="Close chat"
            >
              <X size={16} aria-hidden />
            </button>
          </div>

          <div
            ref={listRef}
            data-lenis-prevent
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.from === "user" ? "rounded-br-sm bg-accent text-accent-ink" : "rounded-bl-sm bg-surface text-fg",
                  )}
                >
                  <span className="sr-only">{m.from === "user" ? "You: " : "Assistant: "}</span>
                  {m.text}
                  {m.cta && (
                    <Link
                      href={m.cta.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 block font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      {m.cta.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {suggestions.length > 0 && (
            <div className="flex gap-2 overflow-x-auto border-t border-line-soft px-5 py-3 [scrollbar-width:none]" data-lenis-prevent>
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => ask(s.question, s)}
                  className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-fg hover:text-fg"
                >
                  {s.question}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-line px-4 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              const q = input.trim().slice(0, 300);
              if (!q) return;
              ask(q);
              setInput("");
            }}
          >
            <label htmlFor={`${titleId}-input`} className="sr-only">
              Ask a question
            </label>
            <input
              id={`${titleId}-input`}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              placeholder="Ask a question…"
              autoComplete="off"
              className="h-10 flex-1 rounded-full bg-surface px-4 text-sm placeholder:text-subtle focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-ink"
              aria-label="Send"
            >
              <Send size={15} aria-hidden />
            </button>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat — ask us a question"}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_10px_40px_rgba(101,68,155,0.45)] transition-transform hover:scale-105"
      >
        {open ? <X size={20} aria-hidden /> : <MessageSquare size={20} aria-hidden />}
      </button>
    </div>
  );
}
