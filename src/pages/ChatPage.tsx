import { useState, type FormEvent } from "react";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";

export function ChatPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) return;

    const subject = `A note from ${cleanName}`;
    const body = `${cleanMessage}\n\n— ${cleanName}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSentMessages((items) => [...items, cleanMessage]);
    setMessage("");
    setStatus("your email app will open with this note ready to send.");
  }

  return (
    <Shell className="min-h-[68vh] px-6 pb-20 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-xl">
        <h1 className="font-serif text-5xl tracking-tight text-[var(--fg)] sm:text-6xl">Chat</h1>

        <hr className="mt-8 border-[var(--line)]" />

        <div aria-live="polite" role="log" aria-label="Chat messages" className="space-y-4 py-6">
          <p className="max-w-[85%] text-sm leading-relaxed text-[var(--muted)]">
            hey — this goes straight to my inbox, not a bot.
          </p>
          <p className="max-w-[85%] text-sm leading-relaxed text-[var(--muted)]">
            leave your name and a note below. it will open in your email app, addressed to me.
          </p>
          {sentMessages.map((item, index) => (
            <p
              key={`${index}-${item}`}
              className="ml-auto max-w-[85%] border-l border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--fg)]"
            >
              {item}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" className="mt-2">
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
            className="w-full border-b border-[var(--line)] bg-transparent py-3 text-sm text-[var(--fg)] outline-none transition-colors duration-200 placeholder:text-[var(--soft)] focus:border-[var(--muted)]"
          />
          <div className="flex items-end gap-4">
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
              className="min-h-12 flex-1 border-b border-[var(--line)] bg-transparent py-3 text-sm leading-relaxed text-[var(--fg)] outline-none transition-colors duration-200 placeholder:text-[var(--soft)] focus:border-[var(--muted)]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="mb-1 shrink-0 px-1 text-lg leading-none text-[var(--muted)] transition-colors duration-200 hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]"
            >
              ↵
            </button>
          </div>
          <p role="status" className="mt-3 min-h-4 font-mono text-[10px] text-[var(--soft)]">{status}</p>
        </form>
      </div>
    </Shell>
  );
}
