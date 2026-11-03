import { cn } from "@/lib/utils";

// Thin-line icon set drawn on a 24px grid to match the brand's hairline style.
const paths: Record<string, React.ReactNode> = {
  leaf: <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14m-1 0 8-8" />,
  gears: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M4.9 19.1 7 17m10-10 2.1-2.1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />,
  grid: <path d="M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.2a3 3 0 0 1 0 5.6M17.5 14a5.5 5.5 0 0 1 3 5" />
    </>
  ),
  steel: <path d="M3 6h18M3 18h18M8 6v12M16 6v12M8 10l8 4M16 10l-8 4" />,
  ornament: <path d="M12 3c2 3 5 4 8 4-1 3-1 7 0 10-3 0-6 1-8 4-2-3-5-4-8-4 1-3 1-7 0-10 3 0 6-1 8-4Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  parking: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5" />
    </>
  ),
  ceiling: <path d="M3 5h18M5 5v3h14V5M7 8v2m5-2v2m5-2v2M4 20V12h16v8M9 20v-4h6v4" />,
  pool: <path d="M3 17c1.5 0 1.5 1.5 3 1.5S7.5 17 9 17s1.5 1.5 3 1.5S13.5 17 15 17s1.5 1.5 3 1.5S19.5 17 21 17M8 14V5a2 2 0 0 1 4 0M16 14V5a2 2 0 0 0-4 0M8 9h8" />,
  glass: <path d="M4 3h16v18H4zM12 3v18M4 12h16M7 6l3 3M15 15l2 2" />,
  kitchen: <path d="M3 10h18v10H3zM3 10V7h18v3M12 10v10M7 14h2M15 14h2M8 4h2M14 4h2" />,
  tiles: <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />,
  wood: <path d="M3 7h18M3 12h18M3 17h18M8 7v5M15 12v5M11 17v4M17 3v4" />,
  excavator: <path d="M3 18h11M4 18a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0M4 14h9v4M6 14v-3h4l1 3M11 11l5-6 4 3-2 5M18 13l2 3" />,
  demolition: <path d="M4 20h16M6 20V9h6v11M14 20v-6h4v6M15 4l5 5M17 2l5 5-3 3-5-5Z" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9m-4 4 3 3m-6-0 2 2" />
    </>
  ),
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.8-.7-.7-2.8 2.5-2.5Z" />,
  gps: (
    <>
      <path d="M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  truck: <path d="M2 6h12v10H2zM14 9h4l4 4v3h-8M5 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01" />,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  mail: <path d="M3 5h18v14H3zM3 6l9 7 9-7" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: <path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4" />,
  bag: <path d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />,
  cloche: <path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V6m-1.5 0h3M2 20h20" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </>
  ),
  linkedin: <path d="M4 9h3.5v11H4zM5.75 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10 9h3.3v1.6c.6-1 1.8-1.9 3.6-1.9 3 0 3.6 2 3.6 4.6V20H17v-5.8c0-1.4-.2-2.6-1.8-2.6s-1.9 1.2-1.9 2.5V20H10z" />,
  facebook: <path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.5 1.6-1.5H17V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8.3v3H11V21" />,
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm-3 5c.2-.4.5-.4.8-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.5.9 1.2 1.6 2 2.1.3.2.5.1.6 0l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .6-.2 1.4-.9 1.8-.6.4-1.5.6-3.2-.1a9.6 9.6 0 0 1-4.3-4c-.8-1.3-.8-2.4-.4-3.3Z" />
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({ name, className, strokeWidth = 1.4 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6 shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}
