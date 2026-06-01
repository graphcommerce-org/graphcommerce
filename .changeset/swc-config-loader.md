---
'@graphcommerce/next-config': patch
---

Fix Turbopack panic ("Cannot find module …graphcommerce.config.cjs") when loading `graphcommerce.config.ts`. cosmiconfig's sync TypeScript loader transpiles the config to a fixed temp `.cjs` path on disk and deletes it again, which races between Next.js worker processes. The `.ts` loader now transpiles via SWC and writes to a per-process unique filename next to the source so concurrent loads never collide.
