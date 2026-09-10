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

The production domain `gabriellemes.com` is hosted by the Cloudflare Pages project `gabriel-lemes`. `npm run deploy` builds the site and publishes to its `main` production branch.

The build generates CSP script hashes in `dist/_headers` from the emitted HTML. Always deploy the complete build output so the policy matches the scripts. `wrangler.jsonc` describes the separate Worker deployment, not the production Pages project.
