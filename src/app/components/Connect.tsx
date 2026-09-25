import { Mail, Send } from "lucide-react";
import { PageShell } from "./PageShell";

const inputClass =
  "w-full rounded-sm border border-border bg-[color:var(--input-background)] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/30";

export function Connect() {
  return (
    <PageShell breadcrumb={[["Home", "/"], ["Connect"]]}>
      <header className="mb-8 max-w-3xl">
        <h1 className="mb-3 text-4xl font-semibold lg:text-5xl">Connect With Us</h1>
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">
          We welcome collaboration opportunities, data requests, speaking
          invitations, and partnership inquiries. Reach out to learn more about
          LASER&rsquo;s work and how we might connect across research, data, and
          interdisciplinary projects.
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        {/* Contact form */}
        <div className="rounded-md border border-border bg-white p-6 lg:p-8">
          <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>

          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className={inputClass}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className={inputClass}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="affiliation" className="mb-2 block font-medium">
                Affiliation
              </label>
              <input
                type="text"
                id="affiliation"
                name="affiliation"
                autoComplete="organization"
                className={inputClass}
                placeholder="Your institution or organization"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block font-medium">
                Subject
              </label>
              <select id="subject" name="subject" className={inputClass}>
                <option>Research Collaboration</option>
                <option>Data Request</option>
                <option>Partnership Inquiry</option>
                <option>Speaking Invitation</option>
                <option>Media Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your inquiry…"
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-sm bg-[color:var(--primary)] px-6 py-3 font-semibold text-white transition-[filter] hover:brightness-110"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <div className="rounded-md border border-border bg-[color:var(--secondary)] p-6 lg:p-7">
            <h2 className="mb-5 text-xl font-semibold">Contact Information</h2>
            <div className="flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-border bg-white">
                <Mail className="h-5 w-5 text-[color:var(--primary)]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="mb-1 font-semibold">Email</h3>
                <a
                  href="mailto:seas-laser@umich.edu"
                  className="text-[color:var(--primary)] hover:underline"
                >
                  seas-laser@umich.edu
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-border bg-white p-6 lg:p-7">
            <h3 className="mb-3 text-lg font-semibold">Research Affiliations</h3>
            <p className="leading-7 text-[color:var(--muted-foreground)]">
              LASER is a multi-institutional research collaboration with work
              spanning the United States, Canada, and Brazil.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
