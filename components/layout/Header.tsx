"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import TLink from "@/components/ui/TLink";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { businesses } from "@/data/businesses";
import { contact } from "@/data/site";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getLenis } from "@/components/providers/SmoothScroll";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<number | null>(null);

  // Transparent at the top, solid after scrolling; hide on scroll down, show on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 320);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes (adjusting state during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    const lenis = getLenis();
    if (mobile) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
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

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 160);
  };

  const solid = scrolled || mega;
  const isBusiness = pathname.startsWith("/businesses");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-gold-light focus:px-5 focus:py-3 focus:text-emerald-900">
        {t.nav.skip}
      </a>
      <m.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          solid ? "border-b border-gold-light/15 bg-emerald-900/90 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
        animate={{ y: hidden && !mega && !mobile ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <TLink href="/" className="relative z-10 flex items-center gap-3" aria-label="Afwajh Group of Companies — home">
            <Image src="/images/logos/afwajh-mark.png" alt="" width={46} height={40} className="h-9 w-auto md:h-10" preload />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[1.45rem] tracking-[0.08em] text-gold-light">AFWAJH</span>
              <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-ivory/70">Group of Companies</span>
            </span>
          </TLink>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <NavLink href="/about" active={pathname === "/about"}>
              {t.nav.about}
            </NavLink>
            <div onMouseEnter={openMega} onMouseLeave={closeMega} className="relative">
              <button
                type="button"
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-gold-light",
                  isBusiness || mega ? "text-gold-light" : "text-ivory/90",
                )}
                aria-expanded={mega}
                aria-controls="mega-menu"
                onClick={() => setMega((m) => !m)}
                onFocus={openMega}
              >
                {t.nav.businesses}
                <svg viewBox="0 0 12 12" className={cn("h-3 w-3 transition-transform", mega && "rotate-180")} aria-hidden="true">
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
            <NavLink href="/clients" active={pathname === "/clients"}>
              {t.nav.clients}
            </NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>
              {t.nav.contact}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href="/contact" className="min-h-11 px-6 py-2.5 text-sm">
                {t.nav.getInTouch}
              </Button>
            </div>
            <button
              type="button"
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/20 lg:hidden"
              aria-label={mobile ? t.nav.close : t.nav.menu}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile((m) => !m)}
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 top-0 h-px w-5 bg-ivory transition-transform duration-500", mobile && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-ivory transition-transform duration-500", mobile && "-translate-y-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <m.div
              id="mega-menu"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.55, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-b border-gold-light/15 bg-emerald-900/97 backdrop-blur-xl lg:block"
            >
              <div className="container-x grid grid-cols-12 gap-6 py-10">
                <div className="col-span-3 flex flex-col justify-between pr-6">
                  <div>
                    <p className="eyebrow text-teal-light">Our businesses</p>
                    <p className="mt-4 font-serif text-3xl leading-tight text-ivory">Seven businesses. One standard of excellence.</p>
                  </div>
                  <TLink href="/about" className="mt-6 inline-flex items-center gap-2 text-sm text-gold-light hover:underline">
                    About the group <Icon name="arrow" className="h-4 w-4" />
                  </TLink>
                </div>
                <ul className="col-span-9 grid grid-cols-4 gap-4">
                  {businesses.map((b, i) => (
                    <m.li
                      key={b.slug}
                      className={cn(i < 2 && "col-span-2")}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.5 }}
                    >
                      <TLink href={b.href} className="group flex h-full flex-col gap-3 rounded-sm focus-visible:outline-offset-4">
                        <span className={cn("img-hover photo-grade relative block overflow-hidden", i < 2 ? "aspect-[16/7]" : "aspect-[4/3]")}>
                          <Image src={b.image.src} alt="" fill sizes="(min-width: 1024px) 30vw, 1px" quality={70} className="object-cover" />
                        </span>
                        <span className="flex items-baseline gap-3">
                          <span className="font-serif text-sm italic text-gold-light">{b.index}</span>
                          <span className="text-sm font-medium text-ivory transition-colors group-hover:text-gold-light">{b.name}</span>
                        </span>
                      </TLink>
                    </m.li>
                  ))}
                </ul>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.header>

      <MobileMenu open={mobile} pathname={pathname} />
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <TLink
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors hover:text-gold-light",
        active ? "text-gold-light" : "text-ivory/90",
      )}
    >
      {children}
      {active && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold-gradient" />}
    </TLink>
  );
}

function MobileMenu({ open, pathname }: { open: boolean; pathname: string }) {
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    ...businesses.map((b) => ({ href: b.href, label: b.name })),
    { href: "/clients", label: t.nav.clients },
    { href: "/contact", label: t.nav.contact },
  ];
  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-emerald-900 pb-28 pt-[calc(var(--header-h)+1.5rem)] lg:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 44px) 38px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 44px) 38px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 44px) 38px)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <nav aria-label="Mobile" className="container-x">
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-ivory/10"
                >
                  <TLink
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between py-3 font-serif text-[1.65rem] leading-tight",
                      pathname === l.href ? "text-gold-light" : "text-ivory",
                    )}
                  >
                    {l.label}
                    <Icon name="arrowUpRight" className="h-5 w-5 text-gold-light/70" />
                  </TLink>
                </m.li>
              ))}
            </ul>
          </nav>
          <m.div
            className="container-x mt-10 grid gap-3 text-sm text-ivory/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href={contact.tel.href} className="flex items-center gap-3">
              <Icon name="phone" className="h-5 w-5 text-gold-light" /> {contact.tel.display}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3">
              <Icon name="mail" className="h-5 w-5 text-gold-light" /> {contact.email}
            </a>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
