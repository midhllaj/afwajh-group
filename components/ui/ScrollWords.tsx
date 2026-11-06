import { Fragment } from "react";

/**
 * Statement whose words light up one by one as it scrolls past (see MotionDirector).
 * Wrap words in *asterisks* for the gold serif accent.
 */
export default function ScrollWords({ text }: { text: string }) {
  return (
    <span data-words>
      {text.split(" ").map((word, i) => {
        const accent = word.startsWith("*");
        return (
          <Fragment key={i}>
            {i > 0 && " "}
            <span data-word className={accent ? "accent-word text-gold-light" : undefined}>
              {word.replace(/\*/g, "")}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
