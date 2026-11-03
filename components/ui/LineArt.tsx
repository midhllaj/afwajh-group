"use client";

import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

// Continuous line illustrations in the style of the group profile.
// Each one draws itself when scrolled into view.
const art = {
  bag: {
    viewBox: "0 0 240 240",
    paths: [
      // bag body
      "M58 96 L70 212 Q71 220 79 220 L171 220 Q179 220 180 212 L192 96 Z",
      // handles
      "M92 96 C90 60 104 44 125 44 C146 44 160 60 158 96",
      "M104 96 C104 70 112 58 125 58 C138 58 146 70 146 96",
      // baguette
      "M150 98 L184 30 Q190 22 196 28 Q200 33 196 40 L166 100",
      "M178 44 l8 6 M172 56 l8 6 M166 68 l8 6",
      // greens / leek
      "M80 98 C76 70 64 52 50 42 M86 98 C88 72 84 54 74 36 M94 98 C100 76 104 60 100 44",
      // apple
      "M118 98 C108 86 112 72 124 74 C128 70 136 70 140 76 C146 84 142 94 136 98 M126 74 C126 68 128 64 132 62",
      // bag fold
      "M64 128 L186 128",
    ],
  },
  cloche: {
    viewBox: "0 0 240 240",
    paths: [
      // dome
      "M44 146 C44 100 80 70 120 70 C160 70 196 100 196 146 Z",
      "M110 70 C110 62 114 58 120 58 C126 58 130 62 130 70",
      // tray
      "M30 146 L210 146 Q214 146 214 150 Q214 156 208 156 L36 156 Q30 156 30 150 Q30 146 34 146",
      // hand and cuff
      "M150 156 C156 172 168 182 186 186 L226 194",
      "M140 156 C142 176 150 190 164 198 L222 210",
      "M222 186 L230 216",
      // shine
      "M70 120 C74 104 84 92 98 86",
    ],
  },
  chef: {
    viewBox: "0 0 240 240",
    paths: [
      // hat
      "M90 70 C70 70 64 46 82 38 C86 22 108 18 116 30 C126 18 150 22 150 40 C168 44 166 70 146 70 Z",
      "M92 70 L92 86 L146 86 L146 70",
      // face
      "M98 86 C96 110 104 124 120 124 C136 124 142 110 140 86",
      // body / jacket
      "M84 132 C70 140 62 160 60 190 L60 222 M156 132 C170 140 178 160 180 190 L180 222",
      "M100 128 L120 150 L140 128",
      "M120 150 L120 222 M110 166 a2 2 0 1 0 0.1 0 M110 186 a2 2 0 1 0 0.1 0 M130 166 a2 2 0 1 0 0.1 0 M130 186 a2 2 0 1 0 0.1 0",
      // arm with whisk / pan
      "M156 150 C176 160 190 168 200 160 L214 140",
      "M206 132 C214 120 226 124 224 136 C222 146 210 146 206 132",
      // bowl
      "M150 196 C150 214 210 214 210 196 Z",
    ],
  },
  delivery: {
    viewBox: "0 0 240 240",
    paths: [
      // head & cap
      "M108 52 C108 36 136 36 136 52 C136 66 126 72 122 72 C116 72 108 66 108 52 Z",
      "M104 46 C110 30 140 30 142 46 L152 48",
      // torso
      "M100 84 C90 92 86 120 88 150 L92 220 M144 84 C154 92 156 116 154 140",
      "M100 84 L144 84",
      // clipboard arm
      "M100 100 C84 112 80 126 86 136 L120 128",
      "M66 104 L102 92 L112 128 L76 140 Z",
      "M78 112 l18 -6 M80 120 l18 -6",
      // box
      "M126 128 L190 118 L200 176 L136 186 Z",
      "M126 128 L144 112 L206 104 L190 118 M206 104 L214 160 L200 176",
      // legs
      "M112 186 L116 222 M138 186 L142 222",
    ],
  },
} as const;

export type LineArtName = keyof typeof art;

export default function LineArt({
  name,
  className,
  accent = "url(#lineart-gold)",
}: {
  name: LineArtName;
  className?: string;
  accent?: string;
}) {
  const reduce = useReducedMotion();
  const a = art[name];
  return (
    <svg viewBox={a.viewBox} className={cn("overflow-visible", className)} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lineart-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E2C26A" />
          <stop offset="0.55" stopColor="#F6F2EA" />
          <stop offset="1" stopColor="#B8862F" />
        </linearGradient>
      </defs>
      {a.paths.map((d, i) => (
        <m.path
          key={i}
          d={d}
          stroke={accent}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.2, delay: i * 0.18, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
}
