---
'@graphcommerce/misc': patch
---

Document the Playwright e2e workflow in CLAUDE.md: where tests live
(`<pkg>/test/*.playwright.ts`), how to install the browser binaries,
the `URL` / `PLAYWRIGHT_LOCALES` env vars exposed by
`playwright.config.ts`, and the backend assumptions tests make
(GraphCommerce demo backend). Picks up the loose ends from
graphcommerce-org/graphcommerce#2627 which fixed the config so
`npx playwright test` actually loads.
