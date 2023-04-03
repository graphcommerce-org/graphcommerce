---
'@graphcommerce/framer-next-pages': patch
'@graphcommerce/magento-graphcms': patch
---

Switching from a heavy page would rerender the old page causing the new page to be slow. We now assume that there does't need to be any transition (as with overlays). This effectively disables any possible page transitions in regular pages, but we never used that anyways.
