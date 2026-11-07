import { contact } from "@/data/site";
import { cn } from "@/lib/utils";

export default function FormStatus({ status, tone = "dark" }: { status: string; tone?: "dark" | "light" }) {
  const base = cn("mt-6 border-l-2 py-2 pl-4 text-sm", tone === "dark" ? "text-ivory/85" : "text-ink/85");
  return (
    <div aria-live="polite" role="status">
      {status === "sent" && <p className={cn(base, "border-gold-light")}>Thank you — your message has been sent. Our team will get back to you shortly.</p>}
      {status === "mailto" && (
        <p className={cn(base, "border-gold-light")}>
          Your email app should open with your message ready to send. If it doesn’t, email us at{" "}
          <a className="underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      )}
      {status === "error" && (
        <p className={cn(base, "border-[#ff9b8a]")}>
          Sorry, something went wrong. Please try again, or call us on{" "}
          <a className="underline" href={contact.call.href}>
            {contact.call.display}
          </a>
          .
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot field to deter spam bots. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
