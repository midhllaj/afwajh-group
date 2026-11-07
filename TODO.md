# TODO — items to confirm with Afwajh Group

Everything below is either marked `[CONFIRM]` in the code or was written or approximated for the website because the source PDFs don't include it. Every other number, name and client comes from the files in `/reference` or the client brief.

## Contact details
- [ ] **Second mobile number.** The catering profile prints `+971 56 564 4333`; the group profile prints `056 56 444 333`. The site uses `+971 56 564 4333`. → `data/site.ts`
- [x] **WhatsApp number.** Confirmed: `+971 54 333 8590` is the number for both WhatsApp and calls; the landline is display-only. → `data/site.ts` (`contact.whatsapp`, `contact.call`)
- [ ] **Social media URLs** (Instagram, LinkedIn, Facebook). Icons stay hidden until URLs are added. → `data/site.ts` (`contact.social`)
- [ ] **Business-specific contacts.** Every business except FHM currently shows the head-office phone and email. Add each business's own contact details. → `data/businesses.ts` (`contact`)
- [ ] **Outlet phone numbers** for each of the 14 supermarkets/minimarts. → `data/retail.ts` (`phone`)

## Missing figures
- [ ] **Technical Services employee count.** → `data/site.ts` (`workforce`), `data/businesses.ts`
- [ ] **Labour Supply employee count** and any headline stats (headcount supplied, years). → `data/site.ts`, `data/divisions.ts` (`labour.stats`)
- [ ] **"678+ people"** is the sum of the five confirmed divisions (300 + 160 + 110 + 90 + 18). Update it once the two numbers above are known. → `data/site.ts` (`keyStats`)
- [ ] **"22 retail & dining outlets"** = 14 retail outlets + 8 restaurants/cafeterias.

## Content to confirm
- [ ] **Labour Supply & Contracting:** exact legal company name. → `data/businesses.ts`, `data/divisions.ts`
- [ ] **Labour Supply:** full list of trades. The site shows the brief's list: masons, carpenters, steel fixers, electricians, plumbers, equipment operators, drivers, helpers ("8 core trades"). → `data/divisions.ts` (`labourTrades`)
- [ ] **Text written for the site (please approve):**
  - Labour Supply intro, offer and the 4-step process
  - Technical Services intro and the descriptions of its 10 activities
  - Each business's one-line positioning
  - The second intro paragraph on the Retail and Restaurants pages
- [ ] **Owner's message** (About and home pages): add the owner's name and title, have the owner approve the drafted text, and supply a larger photo if available. → `data/site.ts` (`ownerMessage`)
- [ ] **About page milestones** (2008 FHM, 2010 group, 2016 catering, 2026 technical-services licence), derived from dates in the documents. → `app/about/page.tsx`
- [ ] **Restaurant tags** and the cuisine marquee are drawn from each venue's description. Replace with real menu categories if preferred. → `data/restaurants.ts`
- [ ] **General Trading product categories.** The section stays hidden until categories are added. → `data/divisions.ts` (`trading.productCategories`)
- [ ] **Logo wordmark.** The original artwork reads "GROUP OF COMPANY"; the site's header lockup sets "Group of Companies" in type next to the vector mark. Confirm the preferred wording.
- [ ] **Arabic company name for the group** (only Technical Services' Arabic name was provided). Needed for the future Arabic version.

## Photography (biggest visual upgrade available)
- [ ] Real photos for every venue that uses an "Illustrative image": Picnic Tea, Lassi Day, Zero 6 Express, Shay Al Kadi, City Fresh, plus interiors for Cafe 52, Shay Marhaba and Khafayef Cafeteria. → drop into `public/images/custom/` (see the README there)
- [ ] Real photos of the supermarkets and minimarts (storefronts and interiors) to replace the stock aisle and produce imagery.
- [ ] Real project photography for Technical Services and Labour Supply.
- [ ] Higher-resolution originals of the FHM site photos. The PDF versions are about 330–500px wide, so they're used only as small gallery thumbnails.

## Map & locations
- [ ] Outlet pin positions on the stylised UAE map are **approximate**. Supply exact coordinates or Google Maps links if available. → `data/retail.ts` (`lat`, `lng`)

## Permissions & setup
- [ ] Confirm permission to display **client logos** (taken from Afwajh's own profiles).
- [ ] Create a **Formspree** (or similar) form and set `FORM_ENDPOINT`. See README.
- [ ] Point **afwajhgroup.com** at Vercel and set `SITE_URL`.
- [ ] **Arabic (RTL) translation**, when ready. See README → "Adding Arabic".

## Typos fixed from the PDFs (for reference)
- "Permenent Canteen" → "Permanent Canteen"
- "Project Valaue" → "Project Value"
- "DUBUID Construction" → "Dubuild Construction"
- "Ali & Son's Construction" → "Ali & Sons Construction"
- "Compnay" (FHM file name) / inconsistent capitalisation in FHM project and client names, normalised
