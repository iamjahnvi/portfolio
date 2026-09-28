import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
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
    setStatus("Your email app will open with this note ready to send.");
  }

  return (
    <Shell className="min-h-[68vh] px-6 pb-20 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--soft)]">A direct line</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-[var(--fg)] sm:text-6xl">Chat</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Have a project in mind or want to talk about something I&apos;m building? Leave a note.
        </p>

        <div aria-live="polite" className="mt-12 min-h-24 space-y-4 border-y border-[var(--line)] py-5">
          {sentMessages.length === 0 ? (
            <p className="font-mono text-xs text-[var(--soft)]">Your conversation will appear here.</p>
          ) : sentMessages.map((item, index) => (
            <p key={`${index}-${item}`} className="ml-auto max-w-[85%] border-l border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--fg)]">{item}</p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="chat-name" className="sr-only">Your name</label>
          <input id="chat-name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="w-full border-b border-[var(--line)] bg-transparent py-3 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--soft)] focus:border-[var(--muted)]" />
          <div className="flex items-end gap-4">
            <label htmlFor="chat-message" className="sr-only">Your message</label>
            <textarea id="chat-message" required rows={2} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Write a note…" className="min-h-16 flex-1 resize-y border-b border-[var(--line)] bg-transparent py-3 text-sm leading-relaxed text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--soft)] focus:border-[var(--muted)]" />
            <button type="submit" className="mb-2 inline-flex shrink-0 items-center gap-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]">
              Send <ArrowUpRight className="size-3.5" />
            </button>
          </div>
          <p role="status" className="mt-3 min-h-4 font-mono text-[10px] text-[var(--soft)]">{status}</p>
        </form>
      </div>
    </Shell>
  );
}
