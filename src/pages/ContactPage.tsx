import { useState } from "react";
import { site } from "@/config/site";
import { Socials } from "@/components/socials";
import { Reveal } from "@/components/reveal";
import { LiveClock } from "@/components/live-clock";
import { Mail, Send, CheckCircle2, Copy, Check } from "lucide-react";

export function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    // Simulating message submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            04 / Connect
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-neutral-100 font-normal mt-2">
            Get In Touch
          </h1>
          <p className="mt-3 text-neutral-400 text-lg max-w-2xl leading-relaxed">
            Got an idea, a project, a job opportunity, or just want to chat tech? Drop me a message below or email me directly.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Direct Info & Social Hub */}
          <Reveal delay={0.1}>
            <div className="flex flex-col justify-between h-full rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur-xl">
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl border border-neutral-800 bg-neutral-950 text-emerald-400">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-lg">Direct Inbox</h3>
                    <p className="text-xs text-neutral-400">Response within 24 hours</p>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Email Address</span>
                  <div className="mt-1.5 flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
                    <a href={`mailto:${site.email}`} className="font-mono text-sm text-neutral-200 hover:text-white truncate">
                      {site.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Social Handles</h4>
                  <Socials />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Location: {site.location}</span>
                <LiveClock />
              </div>
            </div>
          </Reveal>

          {/* Right Column: Contact Message Form */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur-xl">
              <h3 className="font-semibold text-neutral-100 text-xl mb-4">Send a Direct Message</h3>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-300">
                  <CheckCircle2 size={36} className="mx-auto mb-2 text-emerald-400" />
                  <h4 className="font-semibold text-lg">Message Sent!</h4>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    Thank you for reaching out, {formState.name}. I&apos;ll get back to you shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-neutral-400 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jahnvi"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-neutral-400 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-neutral-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-neutral-400 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, idea, or inquiry..."
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none focus:border-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-all hover:scale-[1.02] shadow-md"
                  >
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
