---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/magento-open-source': patch
'@graphcommerce/magento-storyblok': patch
---

`pages/checkout/added.tsx` focuses its heading without a scroll, so the overlay slides in after an add to cart. A scrolling `focus()` put the overlay in its open position before `OverlayBase` started the animation.
