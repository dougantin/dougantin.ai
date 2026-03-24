# dougantin.ai

Personal site for Doug Antin, built with Next.js App Router and MDX-backed writing pages.

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content structure

- `app/page.tsx`: homepage
- `app/writing/page.tsx`: writing index
- `app/writing/[slug]/page.tsx`: individual essay pages
- `content/*.mdx`: essay content and frontmatter
- `components/`: shared UI

## Production build

Run:

```bash
npm run build
```

The build currently uses webpack explicitly for reliability across restricted environments.

## Deployment

The simplest path is Vercel:

1. Import the GitHub repo into Vercel.
2. Accept the default Next.js settings.
3. Set the production domain to `dougantin.ai` after the first deploy.
4. Point your DNS at Vercel using the records Vercel provides.

Because the current routes are statically generated, this site is a good fit for straightforward Vercel hosting.
