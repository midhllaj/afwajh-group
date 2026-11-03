import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
  tone?: "dark" | "light";
  hint?: string;
}

const inputCls = (tone: "dark" | "light", error?: string) =>
  cn(
    "peer w-full rounded-none border-0 border-b bg-transparent px-0 pb-3 pt-2 text-base outline-none transition-colors placeholder:text-transparent focus:ring-0",
    tone === "dark"
      ? "border-ivory/25 text-ivory focus:border-gold-light"
      : "border-ink/25 text-ink focus:border-emerald",
    error && (tone === "dark" ? "border-[#ff9b8a]" : "border-[#b42318]"),
  );

function Label({ label, required, htmlFor, tone }: { label: string; required?: boolean; htmlFor: string; tone: "dark" | "light" }) {
  return (
    <label htmlFor={htmlFor} className={cn("block t-label", tone === "dark" ? "text-ivory/60" : "text-ink/60")}>
      {label}
      {required && <span aria-hidden="true"> *</span>}
    </label>
  );
}

function ErrorText({ id, error, tone }: { id: string; error?: string; tone: "dark" | "light" }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className={cn("mt-2 text-sm", tone === "dark" ? "text-[#ffb4a6]" : "text-[#b42318]")}>
      {error}
    </p>
  );
}

export function TextField({
  label,
  name,
  error,
  required,
  className,
  tone = "dark",
  hint,
  type = "text",
  autoComplete,
  inputMode,
  min,
}: BaseProps & { type?: string; autoComplete?: string; inputMode?: "text" | "tel" | "email" | "numeric"; min?: string | number }) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label label={label} required={required} htmlFor={id} tone={tone} />
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cn(inputCls(tone, error), tone === "dark" && "[color-scheme:dark]")}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className={cn("mt-2 text-xs", tone === "dark" ? "text-ivory/60" : "text-ink/65")}>
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-err`} error={error} tone={tone} />
    </div>
  );
}

export function SelectField({ label, name, error, required, className, tone = "dark", options, defaultValue }: BaseProps & { options: string[]; defaultValue?: string }) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label label={label} required={required} htmlFor={id} tone={tone} />
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(inputCls(tone, error), "cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat pr-6", tone === "dark" ? "[color-scheme:dark] bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%23E2C26A' stroke-width='1.4'/%3E%3C/svg%3E\")]" : "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%230E2E2B' stroke-width='1.4'/%3E%3C/svg%3E\")]")}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ErrorText id={`${id}-err`} error={error} tone={tone} />
    </div>
  );
}

export function TextArea({ label, name, error, required, className, tone = "dark", rows = 4 }: BaseProps & { rows?: number }) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label label={label} required={required} htmlFor={id} tone={tone} />
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(inputCls(tone, error), "resize-y")}
      />
      <ErrorText id={`${id}-err`} error={error} tone={tone} />
    </div>
  );
}
