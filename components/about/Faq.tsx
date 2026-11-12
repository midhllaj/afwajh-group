import Kicker from "@/components/ui/Kicker";
import Rich from "@/components/ui/Rich";
import Icon from "@/components/ui/IconMini";
import JsonLd from "@/components/seo/JsonLd";
import { faqs } from "@/data/faq";
import { faqSchema } from "@/lib/schema";

/**
 * Common questions in plain language. Native <details> keeps every answer in the HTML,
 * so search and AI crawlers can read and quote them without running JavaScript.
 */
export default function Faq({ index = "08" }: { index?: string }) {
  return (
    <section className="tone-light border-t border-line-light bg-ivory py-20 md:py-36" aria-labelledby="faq-title">
      <JsonLd data={faqSchema(faqs)} />
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <Kicker index={index} tone="light">
            Questions
          </Kicker>
          <h2 id="faq-title" className="t-h2 mt-8" data-split>
            <Rich text={"Afwajh at\na *glance*"} />
          </h2>
        </div>
        <div className="col-span-12 border-t border-line-light lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line-light" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 md:py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="t-h4">{f.q}</h3>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-light text-gold-deep transition-transform duration-500 group-open:rotate-45">
                  <Icon name="plus" size={16} />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 text-ink/75 md:text-[17px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
