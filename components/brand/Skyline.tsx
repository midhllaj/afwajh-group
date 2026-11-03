import { cn } from "@/lib/utils";

/** Fine-line Dubai skyline (Frame, Emirates Towers, Burj Khalifa, Cayan, Burj Al Arab). */
export default function Skyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 260"
      preserveAspectRatio="xMidYMax slice"
      className={cn("w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      <path d="M0 259.5H1600" />
      <path d="M20 259V212H68V259M80 259V192H118V259M130 259V224H188V259" />
      <path d="M220 259V120H300V259M232 259V132H288V259M220 141H300" />
      <path d="M330 259V160L350 140L370 160V259M340 170V259M360 170V259" />
      <path d="M390 259V100H430V259M398 110V259M410 110V259M422 110V259" />
      <path d="M470 259V70L500 40V259M510 259V96L534 72V259" />
      <path d="M560 259V150H600V259M620 259V130Q640 112 660 130V259" />
      <path d="M760 259V200H780V150H792V100H800V40L804 2L808 40V100H816V150H828V200H848V259" />
      <path d="M770 259V214M838 259V214M786 200V160M822 200V160" />
      <path d="M880 259V120Q900 96 920 120V259M940 259V150H980V259M948 160H972" />
      <path d="M1000 259V90H1030L1040 70V259M1010 100V259" />
      <path d="M1070 259C1060 200 1090 160 1076 110L1100 108C1112 160 1086 200 1098 259" />
      <path d="M1120 259V170H1170V259M1130 180H1160" />
      <path d="M1230 259V250L1260 60Q1300 140 1320 250V259M1260 60V259M1262 90Q1292 160 1306 250M1240 230H1326M1250 60V40" />
      <path d="M1360 259V200H1400V259M1410 259V180H1450V259M1460 259V215H1520V259M1530 259V196H1580V259" />
    </svg>
  );
}
