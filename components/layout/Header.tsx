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

const STORES_HREF = "/businesses/supermarkets-minimarts#outlets";

const mobileNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/businesses", label: "Businesses" },
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
  const [bizOpen, setBizOpen] = useState(false);
  const lastY = useRef(0);
  const progressRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);

  // Close menus on route change (state adjusted during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMega(false);
    setMobile(false);
    setBizOpen(false);
  }

  useEffect(() => {
    // At most one update per frame: phones fire scroll events faster than they paint.
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 400);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
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
          "fixed inset-x-0 top-0 z-50 text-ivory transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-quart)] max-lg:px-2 max-lg:pt-2.5",
          solid ? "lg:border-b lg:border-line-dark lg:bg-emerald-deep/85 lg:backdrop-blur-xl" : "lg:border-b lg:border-transparent",
          hidden && !mega && !mobile && "-translate-y-[120%]",
        )}
      >
        {/* Phones: a floating glass capsule that firms up once the page scrolls. */}
        <div
          className={cn(
            "wrap relative flex h-[var(--header-h)] items-center justify-between gap-8 transition-[background-color,border-color,box-shadow] duration-500 max-lg:h-16 max-lg:gap-3 max-lg:overflow-hidden max-lg:rounded-full max-lg:border max-lg:pl-3 max-lg:pr-2",
            scrolled && !mobile
              ? // A lighter blur (cost grows with radius) over a denser tint keeps the glass look cheap to repaint while scrolling.
                "max-lg:border-ivory/10 max-lg:bg-emerald-deep/85 max-lg:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] max-lg:backdrop-blur-md"
              : "max-lg:border-transparent",
          )}
        >
          {/* Scroll progress hairline along the capsule's base. */}
          <span
            ref={progressRef}
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left bg-gold-light/70 transition-opacity duration-500 lg:hidden",
              scrolled && !mobile ? "opacity-100" : "opacity-0",
            )}
            style={{ transform: "scaleX(0)" }}
          />
          <TLink href="/" aria-label="Afwajh Group of Companies — home" className="relative z-10 max-lg:origin-left max-lg:scale-[0.8]">
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
              href={STORES_HREF}
              className="hidden min-h-11 items-center gap-2 whitespace-nowrap px-3 text-[14px] text-ivory/85 transition-colors hover:text-gold-light xl:inline-flex"
            >
              <Icon name="pin" size={16} className="text-gold-light" /> Find a store
            </TLink>
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
              className={cn(
                "relative z-10 flex h-10 shrink-0 items-center gap-2.5 rounded-full pl-3.5 pr-3 transition-colors duration-500 lg:hidden",
                mobile ? "bg-gold-light text-emerald-deep" : "bg-ivory/10",
              )}
            >
              {/* Label rolls between Menu and Close. */}
              <span aria-hidden className="t-label relative block h-4 overflow-hidden text-[10px] leading-4">
                <span className={cn("block transition-transform duration-500 ease-[var(--ease-expo)]", mobile && "-translate-y-4")}>
                  <span className="block">Menu</span>
                  <span className="block">Close</span>
                </span>
              </span>
              <span className="relative block h-2.5 w-4">
                <span className={cn("absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-500", mobile && "translate-y-[5px] rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-500", mobile && "-translate-y-[5px] -rotate-45")} />
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
          // Drops down like a blind: the panel slides in from above while its content slides the
          // opposite way by the same amount, so the content holds still. Transforms only (no
          // full-screen clip-path repaint), so it runs on the compositor.
          "grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-emerald-deep pb-10 pt-[calc(var(--header-h)+1rem)] text-ivory transition-[translate,visibility] duration-700 ease-[var(--ease-quart)] will-change-transform lg:hidden",
          mobile ? "translate-y-0" : "pointer-events-none invisible -translate-y-[100dvh]",
        )}
      >
        <nav
          aria-label="Mobile"
          className={cn(
            "wrap flex flex-1 flex-col transition-transform duration-700 ease-[var(--ease-quart)] will-change-transform",
            mobile ? "translate-y-0" : "translate-y-[100dvh]",
          )}
        >
          <p
            className="t-label mb-6 text-[11px] text-ivory/40 transition-opacity duration-700"
            style={{ transitionDelay: mobile ? "150ms" : "0ms", opacity: mobile ? 1 : 0 }}
          >
            Menu
          </p>

          {/* Oversized editorial links; each line slides up out of its own mask. */}
          <ul className="border-t border-line-dark">
            {mobileNav.map((n, i) => {
              const active = n.href === "/businesses" ? pathname.startsWith("/businesses") : pathname === n.href;
              const label = (
                <span className="relative block overflow-hidden py-1">
                  <span
                    className="block transition-transform duration-[900ms] ease-[var(--ease-expo)]"
                    style={{ transitionDelay: mobile ? `${180 + i * 70}ms` : "0ms", transform: mobile ? "none" : "translateY(110%)" }}
                  >
                    <span className={cn("t-h2 text-[clamp(2.4rem,9vw,3.4rem)]", active && "accent-word text-gold-light")}>{n.label}</span>
                  </span>
                </span>
              );
              const num = <sup className="t-label ml-2 self-start pt-3 text-[10px] text-gold-light/80">{String(i + 1).padStart(2, "0")}</sup>;
              return (
                <li key={n.href} className="border-b border-line-dark">
                  {n.href === "/businesses" ? (
                    <>
                      <button
                        type="button"
                        tabIndex={mobile ? 0 : -1}
                        aria-expanded={bizOpen}
                        aria-controls="mobile-biz"
                        onClick={() => setBizOpen((v) => !v)}
                        className="flex w-full items-center py-2 text-left"
                      >
                        {label}
                        {num}
                        <span className="ml-auto grid size-11 place-items-center rounded-full border border-ivory/20">
                          <Icon name="plus" size={16} className={cn("transition-transform duration-500", bizOpen && "rotate-45")} />
                        </span>
                      </button>
                      <div
                        id="mobile-biz"
                        className={cn(
                          "grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)]",
                          bizOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <ul className="overflow-hidden">
                          {businesses.map((b, j) => (
                            <li
                              key={b.slug}
                              className="transition-[opacity,transform] duration-500"
                              style={{ transitionDelay: bizOpen ? `${120 + j * 40}ms` : "0ms", opacity: bizOpen ? 1 : 0, transform: bizOpen ? "none" : "translateY(10px)" }}
                            >
                              <TLink
                                href={b.href}
                                tabIndex={mobile && bizOpen ? 0 : -1}
                                className={cn(
                                  "flex items-baseline gap-4 py-2.5 text-[17px] transition-colors",
                                  pathname === b.href ? "text-gold-light" : "text-ivory/75",
                                )}
                              >
                                <span className="t-label w-6 text-[10px] text-gold-light/70">{b.index}</span>
                                {b.name}
                              </TLink>
                            </li>
                          ))}
                          <li className="pb-5 pt-2">
                            <TLink
                              href="/businesses"
                              tabIndex={mobile && bizOpen ? 0 : -1}
                              className="t-label ml-10 inline-flex items-center gap-2 text-[11px] text-gold-light"
                            >
                              View all <Icon name="arrowUpRight" size={14} />
                            </TLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <TLink
                      href={n.href}
                      tabIndex={mobile ? 0 : -1}
                      aria-current={active ? "page" : undefined}
                      className="flex items-center py-2"
                    >
                      {label}
                      {num}
                    </TLink>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer: quiet contact details and one clear call to action. */}
          <div
            className="mt-auto pt-12 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)]"
            style={{ transitionDelay: mobile ? "600ms" : "0ms", opacity: mobile ? 1 : 0, transform: mobile ? "none" : "translateY(16px)" }}
          >
            <div className="grid grid-cols-2 gap-6 text-[14px]">
              <div>
                <p className="t-label text-[10px] text-ivory/40">Call</p>
                <a href={contact.call.href} tabIndex={mobile ? 0 : -1} className="mt-2 block text-ivory/85">
                  {contact.call.display}
                </a>
              </div>
              <div className="min-w-0">
                <p className="t-label text-[10px] text-ivory/40">Email</p>
                <a href={`mailto:${contact.email}`} tabIndex={mobile ? 0 : -1} className="mt-2 block break-all text-ivory/85">
                  {contact.email}
                </a>
              </div>
            </div>
            <TLink
              href={STORES_HREF}
              tabIndex={mobile ? 0 : -1}
              onClick={() => setMobile(false)}
              className="mt-8 flex min-h-14 items-center justify-between rounded-full border border-gold-light/40 px-6 text-[15px] text-gold-light"
            >
              <span className="flex items-center gap-3">
                <Icon name="pin" size={18} /> Find a store
              </span>
              <Icon name="arrowUpRight" size={18} />
            </TLink>
            <a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobile ? 0 : -1}
              className="mt-3 flex min-h-14 items-center justify-between rounded-full bg-gold-light px-6 text-[15px] font-medium text-emerald-deep"
            >
              Chat on WhatsApp
              <Icon name="arrowUpRight" size={18} />
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
