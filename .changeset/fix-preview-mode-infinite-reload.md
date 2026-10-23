---
'@graphcommerce/ecommerce-ui': patch
---

Fix Preview Mode causing an infinite reload loop in production

When enabling Preview Mode in production the `secret` has to be typed (it is only
pre-filled in development), which marks the field dirty and persists it to
`sessionStorage` via `FormPersist`. On the next render `PreviewModeEnabled`
restored that persisted `secret` with `setValue(…, { shouldDirty: true })`, which
the all-fields `FormAutoSubmit` interpreted as a user change and submitted the
`update` action — a `window.location` navigation to `/api/preview` that redirects
back with a `307`, re-triggering the restore and reload endlessly.

`FormAutoSubmit` now watches only `previewData` (the field the toolbar actually
edits), and the preview `secret` is excluded from `FormPersist` so the token is no
longer stored in the browser.
