---
'@graphcommerce/magento-graphcms': patch
---

Redirect users to homepage after password reset as `router.back()` often returns an empty or invalid history state.
