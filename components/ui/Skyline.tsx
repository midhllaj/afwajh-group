import { cn } from "@/lib/utils";

/** Faint Dubai skyline line-art (Burj Khalifa, Emirates Towers, Burj Al Arab, Frame). */
export default function Skyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 260"
      preserveAspectRatio="xMidYMax slice"
      className={cn("pointer-events-none w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M0 259 H1600" />
      {/* low-rise left */}
      <path d="M20 259 V210 H70 V259 M80 259 V190 H120 V259 M130 259 V222 H190 V259" />
      {/* Dubai Frame */}
      <path d="M220 259 V120 H300 V259 M232 259 V132 H288 V259 M220 140 H300" />
      {/* towers */}
      <path d="M330 259 V160 L350 140 L370 160 V259 M340 170 V259 M360 170 V259" />
      <path d="M390 259 V100 H430 V259 M398 110 V259 M410 110 V259 M422 110 V259" />
      {/* Emirates Towers */}
      <path d="M470 259 V70 L500 40 V259 M470 259 M510 259 V96 L534 72 V259" />
      <path d="M560 259 V150 H600 V259 M620 259 V130 Q640 112 660 130 V259" />
      {/* Burj Khalifa */}
      <path d="M760 259 V200 H780 V150 H792 V100 H800 V40 L804 2 L808 40 V100 H816 V150 H828 V200 H848 V259" />
      <path d="M770 259 V214 M838 259 V214 M786 200 V160 M822 200 V160" />
      {/* Address-style towers */}
      <path d="M880 259 V120 Q900 96 920 120 V259 M940 259 V150 H980 V259 M948 160 H972" />
      <path d="M1000 259 V90 H1030 L1040 70 V259 M1010 100 V259" />
      {/* Cayan twist */}
      <path d="M1070 259 C1060 200 1090 160 1076 110 L1100 108 C1112 160 1086 200 1098 259" />
      <path d="M1120 259 V170 H1170 V259 M1130 180 H1160" />
      {/* Burj Al Arab */}
      <path d="M1230 259 V250 L1260 60 Q1300 140 1320 250 V259 M1260 60 V259 M1262 90 Q1292 160 1306 250 M1240 230 H1326" />
      <path d="M1250 60 V40" />
      {/* low-rise right */}
      <path d="M1360 259 V200 H1400 V259 M1410 259 V180 H1450 V259 M1460 259 V215 H1520 V259 M1530 259 V196 H1580 V259" />
    </svg>
  );
}
