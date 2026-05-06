# Gabriel Lemes Portfolio - Astro

Astro version of the original Next.js portfolio, keeping the same React components, language toggle, theme toggle, typography, icons, copy, links, and public assets.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run deploy
```

## Cloudflare

This project uses Astro 6 and `wrangler` for Cloudflare Workers Assets hosting.

OpenNext is only needed for deploying Next.js apps to Cloudflare. Since this folder is an Astro app and the portfolio is fully static/client-side, Cloudflare Workers Assets is the correct deployment path.
