"use client";

import Button from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "./Field";
import FormStatus, { Honeypot } from "./FormStatus";
import { rules, useFormSubmit } from "./useFormSubmit";
import { cateringServices } from "@/data/catering";

export default function CateringEnquiryForm() {
  const { errors, status, onSubmit } = useFormSubmit(
    (d) => ({
      service_type: rules.required(d.service_type, "a service type"),
      name: rules.required(d.name, "your name"),
      phone: rules.required(d.phone, "your phone number") || rules.phone(d.phone),
      email: rules.required(d.email, "your email") || rules.email(d.email),
      guests: d.guests && Number(d.guests) < 1 ? "Please enter a valid number of guests." : "",
    }),
    "Catering enquiry — afwajhgroup.com",
  );

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8 md:grid-cols-2" aria-label="Catering enquiry form">
      <Honeypot />
      <input type="hidden" name="business" value="Afwajh Catering Services" />
      <SelectField className="md:col-span-2" label="Service type" name="service_type" required options={cateringServices.map((s) => s.title)} error={errors.service_type} />
      <TextField label="Event / start date" name="event_date" type="date" />
      <TextField label="Number of guests" name="guests" type="number" inputMode="numeric" min={1} error={errors.guests} />
      <TextField className="md:col-span-2" label="Location" name="location" autoComplete="address-level2" hint="Venue, project site or area" />
      <TextField label="Your name" name="name" required autoComplete="name" error={errors.name} />
      <TextField label="Company" name="company" autoComplete="organization" />
      <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" error={errors.phone} />
      <TextField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />
      <TextArea className="md:col-span-2" label="Message" name="message" />
      <div className="md:col-span-2">
        <Button type="submit" variant="orange" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <FormStatus status={status} />
      </div>
    </form>
  );
}
