---
'@graphcommerce/magento-store': patch
---

Do not query the head_includes from the backend as that may never be rendered and might contain big content.
