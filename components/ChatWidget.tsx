"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Zap, Bot, AlertCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! 👋 I'm Nova, your AI guide to the NovaOS Ecosystem. Ask me anything about the CyberNova 16 Pro, NovaWatch Ultra, or NovaBuds Pro!",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow">
        <Bot className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow">
          <Bot className="h-3.5 w-3.5 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
            : "rounded-bl-sm bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasOpened, setHasOpened] = useState(false); // for the hint dot

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      });

      const data: { reply?: string; error?: string } = await res.json();

      if (!res.ok || !data.reply) {
        throw new Error(data.error ?? "Unknown error from server.");
      }

      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: "assistant", content: data.reply! },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Nova AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <p className="text-xs text-violet-200">NovaOS Support · Online</p>
                  </div>
                </div>
              </div>
              <button
                id="chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingDots />}

              {/* Error banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-zinc-100 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-400/20 dark:border-zinc-700 dark:bg-zinc-800">
                <input
                  ref={inputRef}
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about NovaOS products…"
                  disabled={isTyping}
                  className="flex-1 bg-transparent py-1.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none disabled:opacity-50 dark:text-zinc-100 dark:placeholder-zinc-500"
                />
                <motion.button
                  id="chat-send-btn"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Send message"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow transition-opacity disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
              <p className="mt-2 text-center text-[10px] text-zinc-400 dark:text-zinc-600">
                Powered by Gemini · NovaOS Ecosystem
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating toggle button ── */}
      <motion.button
        id="chat-toggle-btn"
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/40 transition-shadow hover:shadow-violet-500/60"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Hint dot — visible until first open */}
        {!hasOpened && (
          <motion.span
            className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5 items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
