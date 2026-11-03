import TLink from "./TLink";
import Icon from "./IconMini";
import { cn } from "@/lib/utils";

type Variant = "gold" | "light" | "dark" | "outline-light" | "outline-dark" | "accent";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-emerald-deep",
  light: "bg-ivory text-emerald-deep hover:bg-white",
  dark: "bg-emerald text-ivory hover:bg-emerald-soft",
  "outline-light": "border border-ivory/30 text-ivory hover:border-gold-light hover:text-gold-light",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink",
  accent: "bg-[var(--accent)] text-emerald-deep",
};

interface Props {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  icon?: string | false;
  "aria-label"?: string;
}

/** Pill button with a magnetic hover (desktop) and a sliding arrow. */
export default function Button({ children, href, variant = "gold", className, type = "button", disabled, external, icon = "arrow", ...aria }: Props) {
  const cls = cn(
    "group relative inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full px-7 text-[15px] font-medium tracking-[0.01em] transition-[background-color,color,border-color] duration-300",
    "disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="relative -mr-1 inline-flex h-5 w-5 overflow-hidden" aria-hidden="true">
          <Icon name={icon} size={20} className="absolute transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-6" />
          <Icon name={icon} size={20} className="absolute -translate-x-6 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0" />
        </span>
      )}
    </>
  );
  if (href && (external || !href.startsWith("/"))) {
    return (
      <a href={href} className={cls} data-magnetic target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...aria}>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <TLink href={href} className={cls} data-magnetic {...aria}>
        {inner}
      </TLink>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cls} data-magnetic {...aria}>
      {inner}
    </button>
  );
}
