import { useEffect, useRef, useState, type FormEvent } from "react";
import { MotionConfig, motion } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";

type Msg = { name: string; text: string; time: string; mine: boolean };

function stamp(): string {
  return new Date()
    .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    .toLowerCase();
}

export function ChatPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [status, setStatus] = useState("");
  const [showJump, setShowJump] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  function scrollToLatest(behavior: ScrollBehavior = "smooth") {
    const el = feedRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToLatest(reduced ? "auto" : "smooth");
  }, [msgs]);

  function handleFeedScroll() {
    const el = feedRef.current;
    if (!el) return;
    setShowJump(el.scrollHeight - el.scrollTop - el.clientHeight > 48);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) return;

    const subject = `A note from ${cleanName}`;
    const body = `${cleanMessage}\n\n— ${cleanName}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMsgs((items) => [...items, { name: cleanName.toLowerCase(), text: cleanMessage.toLowerCase(), time: stamp(), mine: true }]);
    setMessage("");
    setStatus("your email app will open with this note ready to send.");
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
        <Shell className="min-h-[68vh] px-6 pb-20 pt-10 sm:px-8 sm:pt-14">
          <div className="mx-auto max-w-xl">
            <h1 className="font-serif text-5xl tracking-tight text-[var(--fg)] sm:text-6xl">Chat</h1>

            <hr className="mt-8 border-[var(--line)]" />

            <div className="relative">
              <div
                ref={feedRef}
                onScroll={handleFeedScroll}
                role="log"
                aria-live="polite"
                aria-label="Chat messages"
                className="flex h-[38vh] min-h-[240px] flex-col gap-[0.3rem] overflow-y-auto py-3 pr-1"
                style={{ maskImage: "linear-gradient(to bottom, transparent 0, black 2rem)" }}
              >
                {msgs.map((m, index) => (
                  <div key={index} className="flex items-baseline gap-2 text-[13px] font-light leading-6 sm:gap-3">
                    <span className="w-14 shrink-0 text-[11px] tabular-nums text-[var(--soft)]">
                      {m.time}
                    </span>
                    <span className="w-20 shrink-0 truncate text-[var(--fg)]">
                      {m.name}
                      <span className="text-[var(--soft)]">:</span>
                    </span>
                    <span className={`break-words ${m.mine ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollToLatest()}
                aria-label="Scroll to latest messages"
                tabIndex={showJump ? 0 : -1}
                className={`absolute bottom-2 right-2 grid size-7 place-items-center rounded-full border border-[var(--line)] bg-[var(--bg)] text-xs leading-none text-[var(--soft)] transition hover:text-[var(--fg)] ${showJump ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                ↓
              </button>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off" className="mt-2 flex items-center gap-3 border-t border-[var(--line)] pt-3">
              <label htmlFor="chat-name" className="sr-only">name</label>
              <input
                id="chat-name"
                type="text"
                autoComplete="name"
                required
                maxLength={32}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="name"
                aria-label="Display name"
                className="w-24 shrink-0 bg-transparent py-2 text-sm font-light text-[var(--fg)] outline-none placeholder:text-[var(--soft)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)] sm:w-28"
              />
              <label htmlFor="chat-message" className="sr-only">message</label>
              <input
                id="chat-message"
                type="text"
                required
                maxLength={500}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="say something..."
                aria-label="Message"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm font-light leading-relaxed text-[var(--fg)] outline-none placeholder:text-[var(--soft)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid size-11 shrink-0 place-items-center text-lg leading-none text-[var(--muted)] transition-colors duration-200 hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]"
              >
                ↵
              </button>
            </form>
            <p role="status" className="mt-3 min-h-4 font-mono text-[10px] text-[var(--soft)]">{status}</p>
          </div>
        </Shell>
      </motion.div>
    </MotionConfig>
  );
}
