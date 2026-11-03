"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TLink from "@/components/ui/TLink";
import Icon from "@/components/ui/IconMini";
import Logo from "@/components/brand/Logo";
import { businesses } from "@/data/businesses";
import { contact } from "@/data/site";
import { getLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/about", label: "About" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [preview, setPreview] = useState(0);
  const lastY = useRef(0);
  const closeTimer = useRef<number | null>(null);

  // Close menus on route change (state adjusted during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 400);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (mobile) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const close = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 180);
  };

  const solid = scrolled || mega;

  return (
    <>
      <a href="#main" className="sr-only z-[120] rounded-full bg-gold-light px-5 py-3 text-emerald-deep focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-ivory transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-quart)]",
          solid ? "border-b border-line-dark bg-emerald-deep/85 backdrop-blur-xl" : "border-b border-transparent",
          hidden && !mega && !mobile && "-translate-y-full",
        )}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-8">
          <TLink href="/" aria-label="Afwajh Group of Companies — home" className="relative z-10">
            <Logo id="hdr" />
          </TLink>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <NavLink href="/about" active={pathname === "/about"}>
              About
            </NavLink>
            <div onMouseEnter={open} onMouseLeave={close}>
              <button
                type="button"
                aria-expanded={mega}
                aria-controls="mega"
                onClick={() => setMega((v) => !v)}
                onFocus={open}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-[15px] transition-colors hover:text-gold-light",
                  pathname.startsWith("/businesses") || mega ? "text-gold-light" : "text-ivory/85",
                )}
              >
                Our Businesses
                <Icon name="plus" size={14} className={cn("transition-transform duration-500", mega && "rotate-45")} />
              </button>
            </div>
            {nav.slice(1).map((n) => (
              <NavLink key={n.href} href={n.href} active={pathname === n.href}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <TLink
              href="/contact"
              data-magnetic
              className="hidden min-h-11 items-center gap-2 rounded-full border border-ivory/25 px-5 text-[14px] transition-colors hover:border-gold-light hover:text-gold-light lg:inline-flex"
            >
              Get in touch <Icon name="arrowUpRight" size={16} />
            </TLink>
            <button
              type="button"
              onClick={() => setMobile((v) => !v)}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              aria-label={mobile ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/25 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500", mobile && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500", mobile && "-translate-y-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          id="mega"
          onMouseEnter={open}
          onMouseLeave={close}
          className={cn(
            "absolute inset-x-0 top-full hidden border-b border-line-dark bg-emerald-deep transition-[clip-path,opacity] duration-700 ease-[var(--ease-quart)] lg:block",
            mega ? "pointer-events-auto opacity-100 [clip-path:inset(0_0_0_0)]" : "pointer-events-none opacity-0 [clip-path:inset(0_0_100%_0)]",
          )}
        >
          <div className="wrap grid grid-cols-12 gap-10 py-10">
            <ul className="col-span-7">
              {businesses.map((b, i) => (
                <li key={b.slug} className="border-t border-line-dark last:border-b">
                  <TLink
                    href={b.href}
                    tabIndex={mega ? 0 : -1}
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-4"
                  >
                    <span className="t-label text-gold-light">{b.index}</span>
                    <span>
                      <span className="t-h4 block transition-colors group-hover:text-gold-light">{b.name}</span>
                      <span className="mt-1 block text-[14px] text-ivory/55">{b.summary}</span>
                    </span>
                    <Icon name="arrowUpRight" size={20} className="text-ivory/55 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-light" />
                  </TLink>
                </li>
              ))}
            </ul>
            <div className="relative col-span-5 overflow-hidden">
              {businesses.map((b, i) => (
                <div
                  key={b.slug}
                  className={cn("grade absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)]", preview === i ? "scale-100 opacity-100" : "scale-105 opacity-0")}
                >
                  <Image src={b.hero.src} alt="" fill sizes="40vw" quality={70} className="object-cover" />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-emerald-deep/80 to-transparent p-6">
                <p className="t-label text-ivory/70">
                  {businesses[preview].index} / 07 — {businesses[preview].label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobile}
        className={cn(
          "grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-emerald-deep pb-32 pt-[calc(var(--header-h)+1rem)] text-ivory transition-[clip-path] duration-700 ease-[var(--ease-quart)] lg:hidden",
          mobile ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <nav aria-label="Mobile" className="wrap">
          <p className="t-label mb-3 text-gold-light">Our Businesses</p>
          <ul>
            {businesses.map((b, i) => (
              <li
                key={b.slug}
                className="border-t border-line-dark transition-[opacity,transform] duration-700 ease-[var(--ease-expo)]"
                style={{ transitionDelay: mobile ? `${120 + i * 45}ms` : "0ms", opacity: mobile ? 1 : 0, transform: mobile ? "none" : "translateY(24px)" }}
              >
                <TLink href={b.href} tabIndex={mobile ? 0 : -1} className="flex min-h-16 items-center gap-4 py-3">
                  <span className="t-label w-7 text-gold-light">{b.index}</span>
                  <span className="t-h4 flex-1">{b.name}</span>
                  <Icon name="arrowUpRight" size={20} className="text-ivory/50" />
                </TLink>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid grid-cols-2 gap-3">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/businesses", label: "All businesses" }].map((n, i) => (
              <li
                key={n.href}
                className="transition-[opacity,transform] duration-700 ease-[var(--ease-expo)]"
                style={{ transitionDelay: mobile ? `${450 + i * 40}ms` : "0ms", opacity: mobile ? 1 : 0, transform: mobile ? "none" : "translateY(16px)" }}
              >
                <TLink
                  href={n.href}
                  tabIndex={mobile ? 0 : -1}
                  aria-current={pathname === n.href ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between rounded-full border border-line-dark px-5 text-[15px]"
                >
                  {n.label}
                </TLink>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-2 text-[15px] text-ivory/75">
            <a href={contact.tel.href} tabIndex={mobile ? 0 : -1} className="flex items-center gap-3">
              <Icon name="phone" size={18} className="text-gold-light" /> {contact.tel.display}
            </a>
            <a href={`mailto:${contact.email}`} tabIndex={mobile ? 0 : -1} className="flex items-center gap-3">
              <Icon name="mail" size={18} className="text-gold-light" /> {contact.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <TLink
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn("relative px-4 py-2 text-[15px] transition-colors hover:text-gold-light", active ? "text-gold-light" : "text-ivory/85")}
    >
      {children}
    </TLink>
  );
}
