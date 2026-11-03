"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode };

/** next/link that plays the page-transition curtain for internal routes. */
export default function TLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = usePageTransition();
  const target = String(href);
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (rest.target === "_blank" || !target.startsWith("/")) return;
        e.preventDefault();
        navigate(target);
      }}
    >
      {children}
    </Link>
  );
}
