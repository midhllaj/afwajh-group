# Afwajh Group of Companies — website

The marketing website for **Afwajh Group of Companies**, a diversified UAE business group with seven businesses: Supermarkets & Minimarts, Restaurants & Cafeterias, Catering, FHM General Transport, General Trading, Technical Services, and Labour Supply & Contracting.

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 · Framer Motion (lazy `m` components) · GSAP ScrollTrigger (desktop horizontal scroll only, loaded on demand) · Lenis smooth scrolling · `next/image` · `next/font`.

---

## Run it locally

Requires **Node.js 20.9+** (developed on Node 22).

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (static pages, on-the-fly image optimisation; for Vercel or `npm start`) |
| `npm start` | Serve the production build locally |
| `npm run build:static` | Fully static export to `/out`, uploadable to any static host |
| `npm run lint` | ESLint |
| `npm run images:sizes` | Regenerate `data/image-sizes.json` after adding or replacing images (used by galleries to prevent layout shift) |

### Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `FORM_ENDPOINT` | URL the contact and catering forms POST to as JSON, e.g. a [Formspree](https://formspree.io) form URL `https://formspree.io/f/xxxxxx`. If empty, the forms open the visitor's email app with the message pre-filled. |
| `SITE_URL` | Public URL used for canonical links, Open Graph, `sitemap.xml` and JSON-LD. Default `https://afwajhgroup.com`. |

Both are read at **build time**, so rebuild or redeploy after changing them.

---

## Editing content (no component changes needed)

All text lives in typed files in `/data`:

| File | Contents |
|---|---|
| `data/site.ts` | Group name, tagline, intro, vision, mission, core strengths, key numbers, workforce chart, **head-office contact details, WhatsApp and social links** |
| `data/businesses.ts` | The 7 businesses: names, summaries, card images, order |
| `data/retail.ts` | The 11 outlets (name, location, emirate, description, map coordinates, optional phone) and the Free Home Delivery block |
| `data/restaurants.ts` | The 8 restaurants & cafeterias (description, tags, photo) |
| `data/catering.ts` | Catering about/mission/vision, the 5 services, site-canteen steps, gallery |
| `data/fhm.ts` | FHM about, CEO message, vision/mission, services, fleet, **project table** (the total portfolio value is calculated automatically), gallery, contact |
| `data/divisions.ts` | General Trading, Technical Services (licence details and 10 services), Labour Supply |
| `data/clients.ts` | Client lists and logos |

Tips:
- **Headings:** `\n` forces a line break, and `*word*` renders that word in gold italic, e.g. `"Supermarkets\n& *Minimarts*"`.
- **Images:** put files in `public/images/…` (WebP, about 1600–2000 px wide), reference them as `/images/…` with descriptive `alt` text, then run `npm run images:sizes`. Set `illustrative: true` on stock photos that stand in for a real venue; the site then labels them "Illustrative image".
- **Placeholders:** every item awaiting client confirmation is marked `[CONFIRM]` in the code and listed in **TODO.md**.

---

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected **Next.js** settings.
3. Under **Environment Variables**, add `FORM_ENDPOINT` and `SITE_URL`.
4. Deploy, then add the `afwajhgroup.com` domain under **Settings → Domains**.

Every route is prerendered as static HTML. Vercel serves it from the edge and optimises images to AVIF/WebP on demand.

**Any other static host** (Netlify, S3, cPanel, etc.): run `npm run build:static` and upload the contents of `/out`. Images are served as-is in this mode; they are already compressed WebP.

---

## Project structure

```
app/                     Routes (one folder per page), sitemap.ts, robots.ts, not-found.tsx, icons
  businesses/<slug>/     The seven business pages (+ /businesses overview)
components/
  home/                  Home page sections
  layout/                Header (mega-menu + mobile menu), Footer, WhatsApp / mobile action bar
  providers/             Lenis smooth scroll, page-transition curtain, lazy Framer Motion
  ui/                    Design system: Button (magnetic), Reveal, SplitHeading, Counter, Photo,
                         PageHero, SectionHeader, Marquee, Gallery (lightbox), LineArt, Skyline, DotMap, Icon …
  retail/ catering/ fhm/ Page-specific interactive pieces (outlet map, canteen timeline, project table)
  forms/                 Form fields, validation and the FORM_ENDPOINT submit hook
data/                    All editable content (see above)
lib/                     SEO helpers, JSON-LD schema, UAE map projection, i18n, utilities
public/images/           Photos and logos (see IMAGE_CREDITS.md)
reference/               Source PDFs and licence the site was built from
scripts/                 image-sizes.mjs
```

### Design system

- **Colours** (Tailwind tokens in `app/globals.css`): `emerald-800 #0F3532` (main), `emerald-900 #0B2826`, `emerald-600 #1A5A52`, gold gradient `#B8862F → #E2C26A → #A87324`, `teal #0FA08A`, `ivory #F6F2EA`. Sub-brand accents (`catering-orange`, `catering-green`, `fhm-blue`) appear only on their own pages.
- **Type:** Instrument Serif (display), Manrope (body/UI), IBM Plex Sans Arabic (Arabic). Fluid scale utilities `display-xl`, `display-lg`, `display-md`, `display-sm`, `lead`, `eyebrow`.
- **Motifs:** numbered sections with gold hairlines, the triangle mark (loader, transitions, watermark), self-drawing line illustrations, grain on dark sections, a dotted UAE map, and the Dubai skyline in the footer.

### Motion & accessibility

- Intro loader (≤ 2 s) runs on the first visit only (remembered in `localStorage`) and is skipped for `prefers-reduced-motion`.
- With reduced motion: no smooth scrolling, curtain, cursor, parallax or marquee; reveals and counters show their final state.
- The custom cursor is desktop-only (fine pointer). Touch devices get native swipe carousels, tap states and a sticky Call / WhatsApp / Email bar.
- Semantic landmarks, skip link, visible focus rings, labelled controls, keyboard-operable menus and lightbox (Esc and arrow keys), and AA-contrast colour pairs.

### SEO

Each page has a unique title and description, a canonical URL, and Open Graph/Twitter cards. The site also generates `sitemap.xml` and `robots.txt`, plus JSON-LD: an `Organization` for the group and `LocalBusiness`-type entries (`GroceryStore`, `ConvenienceStore`, `Restaurant`, `CafeOrCoffeeShop`, `FoodEstablishment`) for every outlet and venue.

### Adding Arabic (RTL) later

The structure is ready:
1. Fill in the `ar` dictionary in `lib/i18n.ts`. UI strings come from `t.*`.
2. Add Arabic fields to the `/data` files (e.g. `nameAr`, `descriptionAr`) or create parallel `data/ar/*.ts` files.
3. Move routes under `app/[locale]/…`, set `<html lang dir>` from `localeDir[locale]`, and use Tailwind logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`) where direction matters. Arabic text already uses the `font-arabic` utility (IBM Plex Sans Arabic is loaded).

---

## Quality checks (production build, Lighthouse 12)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, desktop | 97 | 100 | 100 | 100 |
| Home, mobile (simulated slow 4G) | 86 | 100 | 100 | 100 |
| Supermarkets, mobile | 91 | 100 | 100 | 100 |
| FHM Transport, mobile | 91 | 100 | 100 | 100 |
| Contact, desktop | 99 | 100 | 100 | 100 |

Cumulative Layout Shift is 0 on every page tested. On the mobile home page, the observed LCP is about 0.3 s, but Lighthouse's simulated throttling estimates about 3.9 s. Most of the remaining gap comes from the 2-second intro loader (Speed Index) and the animation JavaScript. To push mobile above 90, shorten or remove the loader in `components/ui/Loader.tsx`.
