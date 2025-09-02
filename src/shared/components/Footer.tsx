import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Button } from "./form/Button";
import Input from "./form/Input";

const year = new Date().getFullYear();

const cols = [
  {
    title: "Learn",
    links: [
      { to: "/courses", label: "Courses" },
      { to: "/categories", label: "Categories" },
      { to: "/search?q=free", label: "Free Courses" },
    ],
  },
  {
    title: "Community",
    links: [
      { to: "/#instructors", label: "Instructors" },
      { to: "/#organizations", label: "Organizations" },
      { to: "/#join", label: "Become a Partner" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/blog", label: "Blog" },
      { to: "/careers", label: "Careers" },
    ],
  },
] as const;

function SocialIcon({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={title}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition bg-primary-dark hover:bg-dark text-primary-light"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [locale, setLocale] = useState("en");
  const [_msg, setMsg] = useState<null | "ok" | "err">(null);
  const [showTopShadow, setShowTopShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopShadow(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setMsg(isValid ? "ok" : "err");
    if (isValid) setEmail("");
    setTimeout(() => setMsg(null), 2500);
  };

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "var(--color-primary-darkest)",
        color: "white",
      }}
    >
      {/* subtle top border that uses theme primary */}
      <div
        className={`h-[2px] w-full transition-shadow ${
          showTopShadow ? "shadow-[0_-4px_12px_rgba(0,0,0,0.2)]" : ""
        }`}
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* brand + newsletter */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 mb-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{
                  backgroundColor: "var(--color-primary-dark)",
                  color: "var(--color-primary)",
                }}
              >
                <span className="text-lg font-black">C</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight group-hover:opacity-90 transition">
                Coachera
              </span>
            </Link>
            <p className="mt-4 leading-relaxed text-white/80">
              Learn modern skills with hands‑on courses curated by instructors
              and organizations. Upgrade your career with flexible, high‑quality
              learning.
            </p>

            {/* app badges placeholders (use your own images when ready) */}
            <div className="mt-5 flex items-center gap-3">
              <Button
                variant="secondaryInverted"
                className="hover:bg-primary-dark!"
              >
                App Store
              </Button>
              <Button
                variant="secondaryInverted"
                className="hover:bg-primary-dark!"
              >
                Google Play
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "var(--color-primary-dark)",
                border: "1px solid var(--color-primary-light)",
              }}
            >
              <h4 className="text-lg font-semibold">
                Subscribe to our newsletter
              </h4>
              <p className="mt-1 text-sm text-white/80">
                The latest courses, trends, and tips — straight to your inbox.
              </p>
              <form
                onSubmit={submitNewsletter}
                className="mt-4 flex flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  aria-label="Email address"
                  placeholder="you@example.com"
                  value={email}
                  prefixIcon={EnvelopeIcon}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-dark placeholder:text-dark/80"
                />
                <Button
                  variant="primary"
                  className="text-primary-dark! m-0! mb-4!"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* navigation columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="mb-4 text-lg font-bold">{c.title}</h3>
              <ul className="space-y-3 text-white/80">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="underline-offset-4 transition hover:underline"
                      style={{ color: "var(--color-primary-light)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <a
              href="mailto:support@coachera.com"
              className="break-all transition hover:opacity-90"
              style={{ color: "var(--color-primary-light)" }}
            >
              support@coachera.com
            </a>
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon title="X (Twitter)" href="https://x.com">
                {/* X icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M18.244 2H21l-6.59 7.523L22 22h-6.805l-5.32-6.984L3.66 22H1l7.12-8.134L2 2h6.805l4.89 6.423L18.244 2Zm-2.39 18h1.822L7.24 4H5.417l10.437 16Z" />
                </svg>
              </SocialIcon>
              <SocialIcon title="Facebook" href="https://facebook.com">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M22 12.06C22 6.49 17.52 2 11.94 2 6.36 2 2 6.49 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.81 8.44-4.95 8.44-9.94Z" />
                </svg>
              </SocialIcon>
              <SocialIcon title="LinkedIn" href="https://linkedin.com">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 22h4V7.5h-4V22ZM8 7.5v14h4v-7.5c0-2 2.5-2.2 2.5 0V22h4v-8.9c0-5.9-6.5-5.7-8.5-2.8V7.5H8Z" />
                </svg>
              </SocialIcon>
              <SocialIcon title="Instagram" href="https://instagram.com">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12 2.2c3.2 0 3.6.01 4.9.07 3.27.15 4.79 1.7 4.94 4.94.06 1.3.07 1.7.07 4.9 0 3.2-.01 3.6-.07 4.9-.15 3.26-1.66 4.79-4.94 4.94-1.3.06-1.7.07-4.9.07-3.2 0-3.6-.01-4.9-.07-3.26-.15-4.79-1.66-4.94-4.94C2.21 15.6 2.2 15.2 2.2 12c0-3.2.01-3.6.07-4.9C2.42 3.84 3.94 2.31 7.2 2.16 8.5 2.1 8.9 2.09 12 2.09V2.2Zm0 1.8c-3.15 0-3.52.01-4.76.07-2.2.1-3.22 1.13-3.33 3.33-.06 1.24-.07 1.61-.07 4.76 0 3.15.01 3.52.07 4.76.11 2.2 1.13 3.23 3.33 3.33 1.24.06 1.61.07 4.76.07 3.15 0 3.52-.01 4.76-.07 2.2-.1 3.22-1.13 3.33-3.33.06-1.24.07-1.61.07-4.76 0-3.15-.01-3.52-.07-4.76-.11-2.2-1.13-3.22-3.33-3.33-1.24-.06-1.61-.07-4.76-.07Zm0 3.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm5.98-2.13a1.1 1.1 0 1 1-2.21 0 1.1 1.1 0 0 1 2.21 0Z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row"
          style={{ borderColor: "var(--color-primary-dark)" }}
        >
          <p className="text-sm text-white/80">
            © {year} Coachera. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-sm hover:opacity-90"
              style={{ color: "var(--color-primary-light)" }}
            >
              Privacy
            </Link>
            <span className="text-white/30">•</span>
            <Link
              to="/terms"
              className="text-sm hover:opacity-90"
              style={{ color: "var(--color-primary-light)" }}
            >
              Terms
            </Link>
            <span className="text-white/30">•</span>

            <label className="inline-flex items-center gap-2 text-sm">
              <GlobeAltIcon className="h-5 w-5" />
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="bg-transparent outline-none"
                style={{ color: "var(--color-primary-light)" }}
                aria-label="Select language"
              >
                <option value="en" className="text-gray-900">
                  English
                </option>
                <option value="ar" className="text-gray-900">
                  العربية
                </option>
                <option value="tr" className="text-gray-900">
                  Türkçe
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}
