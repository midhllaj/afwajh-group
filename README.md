# Afwajh Group of Companies — website

The corporate website for **Afwajh Group of Companies**, a diversified UAE group with seven businesses. The home page presents the group; each business has its own page, and visitors can step through all seven in order via "Next business →".

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger + SplitText, loaded on demand) · Lenis smooth scroll · Framer Motion (page transitions) · `next/image` · `next/font` · Phosphor icons (Light).

---

## Run it locally

Requires **Node.js 20.9+** and npm.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages static; images optimised on demand on Vercel / `npm start`) |
| `npm start` | Serve the production build |
| `npm run build:static` | Fully static export to `/out`, for any static host |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate `data/image-meta.json` (sizes + blur placeholders). **Run after adding or replacing images.** |
| `node scripts/screenshots.mjs` | Full-page screenshots of every route at 390px and 1440px (needs Google Chrome; dev server running) |

### Environment variables (`.env.local`, see `.env.example`)

| Variable | Purpose |
|---|---|
| `FORM_ENDPOINT` | Where the contact and catering forms POST (JSON), e.g. a [Formspree](https://formspree.io) URL `https://formspree.io/f/xxxxxx`. If empty, the forms open the visitor's email app with the message pre-filled. |
| `SITE_URL` | Public URL used for canonical links, Open Graph, sitemap and JSON-LD. Default `https://afwajhgroup.com`. |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code (only the `content` value). Adds the ownership meta tag to every page. |

Both are read at build time; redeploy after changing them.

---

## Site structure

```
/                                       Home (group)
/about                                  About the Group
/businesses                             All 7 businesses
/businesses/supermarkets-minimarts      01 Supermarkets & Minimarts
/businesses/restaurants-cafeterias      02 Restaurants & Cafeterias
/businesses/catering                    03 Afwajh Catering Services
/businesses/fhm-general-transport       04 FHM General Transport
/businesses/general-trading             05 Afwajh General Trading
/businesses/technical-services          06 Afwajh Technical Services
/businesses/labour-supply               07 Afwajh Labour Supply & Contracting
/clients                                Clients
/contact                                Contact
(any other URL)                         Custom 404
```

Every business page follows the same template (`components/business/`):

1. **BusinessHero**: full-bleed image, "01 / 07", name, positioning line
2. **IntroFacts**: introduction plus animated key facts
3. **What we offer**: outlets, venues, services, fleet…
4. **A business-specific section**: outlet map (retail), venue showcase (restaurants), site-canteen timeline (catering), project table (FHM), locations (trading), licensed-services grid (technical), process (labour)
5. **Gallery**: swipe or scroll, with a lightbox
6. **BusinessContact**: business contact details (and the catering enquiry form)
7. **NextBusiness**: a full-width band. Clicking it grows the image to full screen and it becomes the next page's hero; business 7 loops back to business 1. It also has Previous and All businesses links.

---

## Editing content (no component changes needed)

All copy lives in typed files in `/data`:

| File | Contents |
|---|---|
| `data/site.ts` | Group name, intro, vision, mission, core strengths, key numbers, workforce, **head-office contact, WhatsApp, social links** |
| `data/businesses.ts` | The 7 businesses: order, name, number, accent colour, positioning, summary, hero image, key facts, contact details |
| `data/retail.ts` | The 14 outlets (location, emirate, description, map coordinates), gallery |
| `data/restaurants.ts` | The 8 venues (description, tags, image, optional real-photo inset) |
| `data/catering.ts` | Catering about/mission/vision, 5 services, site-canteen steps, gallery |
| `data/fhm.ts` | FHM about, vision/mission, services, fleet, **projects** (the total value is calculated automatically), galleries |
| `data/divisions.ts` | General Trading, Technical Services (licence and 10 activities), Labour Supply |
| `data/clients.ts` | Client lists and logos |

Heading text supports two shortcuts: `\n` forces a line break, and `*word*` sets that word in the Instrument Serif italic accent (e.g. `"One *standard*"`).

## Replacing images

1. Put the new photo in `public/images/custom/` (or the business folder): WebP or JPG, **at least 2400px wide for heroes** and 1600px for everything else.
2. Point the matching entry in `/data` at it (`src`), write a descriptive `alt`, and remove `illustrative: true` if it's a real photo of that venue or service.
3. Run `npm run images` to refresh sizes and blur placeholders.

All photos go through `components/ui/Media.tsx`, which applies the shared colour grade, blur-up loading, clip-path reveal and parallax automatically. Image sources and photographers are listed in **IMAGE_CREDITS.md**. Social-share cards (one per page) live in `public/og/`.

---

## Design system

- **Colours** (`app/globals.css`): emerald `#0E2E2B`, deep emerald `#0A2321`, ivory `#F5F1E8`, ink `#121212`, gold gradient `#B8862F → #E2C26A → #A87324` (accents and hairlines only). Each business page sets one accent through `--accent`: Retail `#5FA84B`, Restaurants `#C8643B`, Catering `#EE9A24`, FHM `#1173BE`, Trading `#0FA08A`, Technical `#7A8A99`, Labour `#E3A21A`.
- **Type:** Clash Display (display, 500, −0.03em), Satoshi (body, 17–18px / 1.6), Instrument Serif Italic (one or two accent words per heading), IBM Plex Sans Arabic. Fluid scale: `t-hero` 56→168px, `t-h1`, `t-h2` 40→96px, `t-h3` 24→40px, `t-h4`, `t-lead`, and `t-label` (12px uppercase, +0.2em).
- **Layout:** `wrap` container plus a strict 12-column `grid-12`, with dark and light sections alternating.
- **Motifs:** the vector triangle mark (loader, transition curtain, watermarks), gold hairlines, "01 —" micro-labels, film grain on dark sections, Dubai skyline in the footer.

## Motion

- **Hero headlines** reveal line by line in pure CSS, so text paints immediately (fast LCP).
- **Everything else** is declarative: add `data-split` (SplitText line reveal), `data-reveal` (fade-rise), `data-clip` (image clip-path and scale-down), `data-parallax="8"`, `data-counter` or `data-magnetic` to any element. `components/motion/MotionDirector.tsx` animates it with GSAP and ScrollTrigger, loaded once the browser is idle.
- **Intro loader:** the gold mark draws itself while a counter runs 0–100 (first visit only, about 2s).
- **Page transitions:** an emerald curtain with the gold mark (Framer Motion). The "Next business" band uses the expanding-image transition.
- **Desktop extras:** custom cursor with labels, magnetic buttons, cursor-following image previews on the home business index, and a header that hides on scroll down.
- **Mobile:** tall image cards, swipe galleries, tap states, and a sticky Call / WhatsApp bar.
- **Reduced motion:** with `prefers-reduced-motion` everything is static and fully visible, with no smooth scrolling.

## SEO & accessibility

- **SEO:** unique titles and descriptions, canonical URLs, per-page Open Graph images (`public/og/*.jpg`), `sitemap.xml`, `robots.txt`, and JSON-LD (Organization, BreadcrumbList, and GroceryStore / ConvenienceStore / Restaurant / CafeOrCoffeeShop / FoodEstablishment / LocalBusiness entries for every outlet and venue).
- **Accessibility:** semantic landmarks, skip link, visible focus states, keyboard-operable menus and lightbox, labelled form fields with error messages, and AA-contrast colour pairs.

## Adding Arabic (RTL) later

1. Fill in the `ar` dictionary in `lib/i18n.ts`.
2. Add Arabic fields to the `/data` files, or create parallel `data/ar/*.ts` files.
3. Move routes under `app/[locale]/…` and set `<html lang dir>` from `localeDir[locale]`. IBM Plex Sans Arabic is already loaded, and `[lang="ar"]` text uses it automatically.

---

## Deploy to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project**, import the repository and keep the detected Next.js settings.
3. Add the `FORM_ENDPOINT` and `SITE_URL` environment variables.
4. Deploy, then connect `afwajhgroup.com` under **Settings → Domains**.

**Other hosts:** run `npm run build:static` and upload the contents of `/out`.

## Quality checks (production build, Lighthouse 12)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, desktop | 98 | 100 | 100 | 100 |
| Contact / Catering, desktop | 98 | 100 | 100 | 100 |
| Home, mobile (simulated slow 4G) | 84 | 100 | 100 | 100 |
| Business and group pages, mobile | 84–88 | 100 | 100 | 100 |

Cumulative Layout Shift is 0 on every page tested. On mobile, the measured first and largest paint both happen at about 0.3s (the hero text paints immediately), but Lighthouse's simulated throttling attributes the JavaScript bundle to LCP and estimates 3.7–4.3s. The remaining gap to 90 on mobile is that simulated LCP.
