---
'@graphcommerce/next-ui': patch
---

Fix: `<Fab variant="extended">` no longer gets a fixed `width` from `MuiFabSizes`. The size-based width/height variants are now scoped to `variant: 'circular'` only, so extended Fabs can grow with their label (controlled via `min-width` instead) as MUI intends. Previously every extended Fab without an explicit `size` matched the default `large` rule and was forced to 54px wide.
