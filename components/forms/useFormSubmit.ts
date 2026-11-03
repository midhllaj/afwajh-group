"use client";

import { useState } from "react";
import { contact } from "@/data/site";

export type Errors = Record<string, string>;
export type Validator = (data: Record<string, string>) => Errors;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export const rules = {
  required: (v: string | undefined, label: string) => (!v || !v.trim() ? `Please enter ${label}.` : ""),
  email: (v: string | undefined) => (v && !EMAIL.test(v.trim()) ? "Please enter a valid email address." : ""),
  phone: (v: string | undefined) => (v && !PHONE.test(v.trim()) ? "Please enter a valid phone number." : ""),
};

/**
 * Client-side validation + submission to the configurable FORM_ENDPOINT
 * (e.g. a Formspree URL). Without an endpoint, falls back to opening the
 * visitor's email app with the message pre-filled.
 */
export function useFormSubmit(validate: Validator, subject: string) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "mailto">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Honeypot: bots fill hidden fields.
    if (fd.get("company_website")) return;
    fd.delete("company_website");
    const data = Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
    const errs = Object.fromEntries(Object.entries(validate(data)).filter(([, v]) => v));
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }

    const endpoint = process.env.FORM_ENDPOINT;
    if (!endpoint) {
      const body = Object.entries(data)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _subject: subject }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return { errors, status, onSubmit, setStatus };
}
