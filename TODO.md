# TODO — items to confirm with Afwajh Group

Everything below is marked `[CONFIRM]` in the code or was written or approximated for the website because the source PDFs didn't include it. Nothing else was invented: every other number, name and client comes from the reference files.

## Contact details
- [ ] **Second mobile number.** The catering profile prints `+971 56 564 4333`; the group profile prints `056 56 444 333`. The site uses `+971 56 564 4333`. → `data/site.ts`
- [ ] **WhatsApp number.** The floating button, mobile bar and contact page use `+971 54 333 8590`. → `data/site.ts` (`contact.whatsapp`)
- [ ] **Social media URLs** (Instagram, LinkedIn, Facebook). Icons stay hidden until URLs are added. → `data/site.ts` (`contact.social`)
- [ ] **Outlet phone numbers** for each of the 11 supermarkets/minimarts. → `data/retail.ts` (`phone` field on each outlet)
- [ ] **Free Home Delivery numbers** `052 765 1869 | 052 702 6791`, read off the Greenmart storefront photo: which outlet do they belong to? Is "Greenmart" one of the 11 listed outlets under another name? → `data/retail.ts` (`homeDelivery`)
- [ ] **Business-specific contacts.** All businesses except FHM currently show the group head-office phone and email. → `app/contact/page.tsx`

## Missing figures
- [ ] **Technical Services employee count.** → `data/site.ts` (`workforce`)
- [ ] **Labour Supply employee count**, plus any headline stats (headcount supplied, trades, years). → `data/site.ts`, `data/divisions.ts` (`labour.stats`)
- [ ] **"678+ employees"** is the sum of the five confirmed divisions (300 + 160 + 110 + 90 + 18). Update it once the two numbers above are known. → `data/site.ts` (`keyStats`)

## Content to confirm
- [ ] **Labour Supply & Contracting:** the exact legal company name. → `data/businesses.ts`, `data/divisions.ts`
- [ ] **Labour Supply:** the full list of trades supplied. The site lists masons, carpenters, steel fixers, equipment operators, drivers and helpers. → `data/divisions.ts` (`labourTrades`)
- [ ] **Labour Supply page copy** (written for the site): intro, offer, 4-step process. Please approve.
- [ ] **General Trading product categories.** The section stays hidden until categories are added. → `data/divisions.ts` (`trading.productCategories`)
- [ ] **Technical Services descriptions** (written for the site from the 10 licensed activities). Please approve. → `data/divisions.ts`
- [ ] **FHM "Message from the CEO":** a shortened summary of the brochure message, signed by Haroon Sharifi. Please approve. → `data/fhm.ts`
- [ ] **About page milestones** (2008 FHM, 2010 group, 2016 catering, 2026 technical-services licence) are derived from dates in the documents. Confirm, or add more. → `app/about/page.tsx`
- [ ] **Restaurant cuisine/highlight tags** are drawn from each venue's description. Confirm, or replace with real menu categories. → `data/restaurants.ts`
- [ ] **Logo wordmark** reads "GROUP OF COMPANY", while the company name is "Group of Companies". Is a corrected logo file available?
- [ ] **Arabic company name for the group** (only Technical Services' Arabic name was provided). Needed for the future Arabic version.

## Photography
- [ ] Real photos for **Picnic Tea Cafeteria, Lassi Day, Zero 6 Express, Shay Al Kadi and City Fresh**. They currently use Unsplash images and are labelled "Illustrative image". → `public/images/restaurants/`
- [ ] Real project photos for **Technical Services** and **Labour Supply** (currently Unsplash, labelled illustrative).
- [ ] Higher-resolution originals of the FHM site photos. The PDF versions are about 330 px wide, so they look soft in the lightbox.
- [ ] Outlet photos for each supermarket/minimart, to add to the directory cards.

## Map & locations
- [ ] Outlet pin positions on the stylised UAE map are **approximate**, from public locations of the malls, hospitals and areas named in the profile. Supply exact coordinates or Google Maps links if available. → `data/retail.ts` (`lat`, `lng`)

## Permissions & setup
- [ ] Confirm permission to display **client logos** (Emaar, Meydan, Sobha, DAMAC, etc.). They were extracted from Afwajh's own profiles.
- [ ] Create a **Formspree** (or similar) form and set `FORM_ENDPOINT`. See README.
- [ ] Point the **domain** `afwajhgroup.com` at Vercel and set `SITE_URL`.
- [ ] **Arabic (RTL) translation**, when ready. See README → "Adding Arabic".

## Typos fixed from the PDFs (for reference)
- "Permenent Canteen" → "Permanent Canteen"
- "Project Valaue" → "Project Value"
- "DUBUID Construction" → "Dubuild Construction"
- "Ali & Son's Construction" → "Ali & Sons Construction"
- "Supermarket & Minimarts" (section title) → "Supermarkets & Minimarts"
- Inconsistent capitalisation in FHM project names and client names normalised (e.g. "M/S Gardinia Building Contracting L.l.c" → "Gardinia Building Contracting")
