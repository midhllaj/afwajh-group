import { Fragment } from "react";

/**
 * Renders heading copy: "\n" forces a line break and *words* become the
 * Instrument Serif italic accent (e.g. "One standard of *excellence*").
 */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li, lines) => (
        <Fragment key={li}>
          {line.split(/(\*[^*]+\*)/g).map((part, pi) =>
            part.startsWith("*") && part.endsWith("*") ? (
              <em key={pi} className="accent-word">
                {part.slice(1, -1)}
              </em>
            ) : (
              <Fragment key={pi}>{part}</Fragment>
            ),
          )}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

/** Plain text version for aria-labels and metadata. */
export const plain = (text: string) => text.replace(/\*/g, "").replace(/\n/g, " ");
