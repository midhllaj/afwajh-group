"use client";

import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "./Field";
import FormStatus, { Honeypot } from "./FormStatus";
import { rules, useFormSubmit } from "./useFormSubmit";
import { businesses } from "@/data/businesses";

export default function ContactForm() {
  const params = useSearchParams();
  const preselect = businesses.find((b) => b.slug === params.get("business"))?.name;
  const { errors, status, onSubmit } = useFormSubmit(
    (d) => ({
      business: rules.required(d.business, "which business you’re contacting"),
      name: rules.required(d.name, "your name"),
      phone: rules.required(d.phone, "your phone number") || rules.phone(d.phone),
      email: rules.required(d.email, "your email") || rules.email(d.email),
      message: rules.required(d.message, "a message"),
    }),
    "Website enquiry — afwajhgroup.com",
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8 md:grid-cols-2" aria-label="Contact form">
      <Honeypot />
      <SelectField
        key={preselect}
        className="md:col-span-2"
        label="Which business?"
        name="business"
        required
        options={[...businesses.map((b) => b.name), "General enquiry"]}
        defaultValue={preselect}
        error={errors.business}
      />
      <TextField label="Name" name="name" required autoComplete="name" error={errors.name} />
      <TextField label="Company" name="company" autoComplete="organization" />
      <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone} />
      <TextField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />
      <TextArea className="md:col-span-2" label="Message" name="message" required rows={5} error={errors.message} />
      <div className="md:col-span-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <FormStatus status={status} />
      </div>
    </form>
  );
}
