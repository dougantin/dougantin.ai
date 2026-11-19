# Essay social image standard

Approved reference: `public/images/essays/building-for-an-audience-of-one.png`.
Use that file unchanged for the Audience of One essay. Use its composition for future essays.

## Design

- PNG canvas: 1200 × 630 pixels (1.91:1).
- Dark warm brown background fading into subdued forest green near the bottom.
- Approximately 64px left and right padding.
- Top-left: cyan uppercase DOUG ANTIN, spaced sans-serif lettering, approximately 28px.
- Main title: large warm ivory Playfair Display serif, approximately 90–96px, tight leading, left aligned. Keep to two or three balanced lines; reduce size for longer titles without clipping.
- Short copper horizontal rule beneath the title, approximately 187px wide and 2px tall.
- Short dek below the rule: warm gray sans-serif, approximately 30px. Use the essay's approved subtitle, ideally one line; never invent or silently rewrite it to fit.
- Footer: Doug Antin at bottom left and dougantin.ai at bottom right, muted warm gray sans-serif, approximately 24px, about 50px above the bottom.
- Match the supplied reference's spacing, hierarchy, and restrained palette. No extra badges, illustrations, or logos.

## Publishing

1. Create the PNG using the approved reference and the new essay's title and short dek. Inspect at full size and thumbnail size for clipping and legibility.
2. Save under `public/images/essays/<slug>.png` and set `socialImage: "/images/essays/<slug>.png"` in the MDX frontmatter. Keep the description consistent with the approved dek.
3. Share the normal article URL on `https://www.dougantin.ai`. The site points crawlers directly at the card on that hostname and automatically versions custom image URLs from their file contents.
4. The production build tests every sitemap page with a Twitterbot user agent. It checks the large-card tags, robots rules, direct HTTP responses, image dimensions, size, and decodability. To repeat these checks against the live site, run `npm run check:cards:live`.

Writing without custom artwork, Library entries, and published weekly briefings get a branded title card automatically. Nearside and the investor field guide keep their existing artwork. When changing the automatic card design, update the template version in `lib/share-cards.ts` so the image URLs change. X can retain an earlier preview for a link it has already seen.
