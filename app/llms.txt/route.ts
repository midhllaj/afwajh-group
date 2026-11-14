import { businesses } from "@/data/businesses";
import { faqs } from "@/data/faq";
import { contact, emirates, intro, keyStats, ownerMessage, site } from "@/data/site";
import { formatStat } from "@/components/ui/Counter";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain Markdown brief for AI answer engines (llmstxt.org convention):
 * who the group is, the key facts, every business with its link, and common questions.
 */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    intro,
    "",
    "## Key facts",
    "",
    `- Name: ${site.name} (also known as ${site.shortName} or Afwajh)`,
    `- Founded: ${site.established}`,
    `- Owner: ${ownerMessage.signature}`,
    `- Headquarters: ${contact.address.line1}, ${contact.address.city}, ${contact.address.country}`,
    `- Operates in: ${emirates.join(", ")}`,
    ...keyStats.filter((s) => s.label !== "Since").map((s) => `- ${s.label}: ${formatStat(s)}`),
    `- Website: ${absoluteUrl("/")}`,
    "",
    "## Businesses",
    "",
    ...businesses.map((b) => `- [${b.name}](${absoluteUrl(b.href)}): ${b.label}. ${b.summary}`),
    "",
    "## Pages",
    "",
    `- [About the group](${absoluteUrl("/about")}): history, owner's message, vision, mission and workforce`,
    `- [All businesses](${absoluteUrl("/businesses")}): overview of the seven businesses`,
    `- [Locations](${absoluteUrl("/locations")}): all supermarkets, minimarts, cafes and restaurants on one map with directions`,
    `- [Clients](${absoluteUrl("/clients")}): developers, government entities and contractors served`,
    `- [Contact](${absoluteUrl("/contact")}): phone, WhatsApp, email and enquiry form`,
    "",
    "## Contact",
    "",
    `- Phone and WhatsApp: ${contact.call.display}`,
    `- Office: ${contact.landline}`,
    `- Email: ${contact.email}`,
    `- Address: ${contact.address.line1}, ${contact.address.city}; ${contact.address.poBox}`,
    "",
    "## Frequently asked questions",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
