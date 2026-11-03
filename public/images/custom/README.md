# Your own photos go here

Drop real Afwajh photography into this folder to replace stock images, for example:

    custom/cafe-52-interior.webp
    custom/gate-plus-jumeirah.webp

Then:

1. Point the relevant entry in `/data` at it, e.g. in `data/restaurants.ts`:
   `image: { src: "/images/custom/cafe-52-interior.webp", alt: "Cafe 52 seating area in Town Square" }`
   (remove `illustrative: true` so the "Illustrative image" label disappears).
2. Run `npm run images` to update sizes and blur placeholders.

Tips: landscape, at least 2400px wide for heroes (1600px for everything else), WebP or JPG, sharp and well lit.
