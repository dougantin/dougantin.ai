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
2. Save under `public/images/essays/<slug>.png`. Use a new versioned filename when replacing an already shared image to reduce stale social caches.
3. Set `socialImage: "/images/essays/<slug>.png"` in the essay's MDX frontmatter. Keep `description` consistent with the approved dek.
4. `app/writing/[slug]/page.tsx` explicitly sets Open Graph images and Twitter `summary_large_image`. Do not rely on nested metadata inheriting the root layout's image.
5. Run the production build. Verify the rendered essay HTML has `og:image`, image dimensions, `twitter:image`, and `twitter:card=summary_large_image`. Verify the image URL returns the PNG publicly.
6. After deployment, check the live article and image. Social services may cache previously shared previews; use their preview refresh tools when necessary.

Existing essays without `socialImage` use the generic site image. This is a fallback; new essays should receive their own card in this format.
