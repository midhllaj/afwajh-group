"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor (desktop / fine pointer only): a gold dot that grows over links and
 * shows a label over elements with data-cursor="View" etc.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok = matchMedia("(hover: hover) and (pointer: fine)").matches && document.documentElement.classList.contains("motion");
    if (!ok) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100,
      y = -100,
      cx = -100,
      cy = -100,
      raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.visible = "1";
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, [role='button'], input, select, textarea, label, summary");
      el.dataset.mode = labelled ? "label" : interactive ? "link" : "dot";
      if (labelRef.current) labelRef.current.textContent = labelled?.dataset.cursor ?? "";
    };
    const leave = () => (el.dataset.visible = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" data-mode="dot" data-visible="0" className="cursor pointer-events-none fixed left-0 top-0 z-[110]">
      <div className="cursor-dot">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <style>{`
        .cursor { display: none; }
        html.has-cursor .cursor { display: block; }
        .cursor[data-visible="0"] .cursor-dot { opacity: 0; }
        .cursor-dot { position: absolute; left: 0; top: 0; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 999px;
          background: #E2C26A; display: flex; align-items: center; justify-content: center; mix-blend-mode: normal;
          transition: width .45s var(--ease-expo), height .45s var(--ease-expo), margin .45s var(--ease-expo), background-color .3s, border-color .3s, opacity .3s;
          border: 1px solid transparent; }
        .cursor[data-mode="link"] .cursor-dot { width: 48px; height: 48px; margin: -24px 0 0 -24px; background: rgb(226 194 106 / .12); border-color: rgb(226 194 106 / .8); }
        .cursor[data-mode="label"] .cursor-dot { width: 96px; height: 96px; margin: -48px 0 0 -48px; background: #E2C26A; }
        .cursor-label { font: 500 11px/1 var(--font-sans); letter-spacing: .18em; text-transform: uppercase; color: #0A2321; opacity: 0; transition: opacity .3s; }
        .cursor[data-mode="label"] .cursor-label { opacity: 1; }
      `}</style>
    </div>
  );
}
