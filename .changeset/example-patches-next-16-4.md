---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/magento-open-source': patch
'@graphcommerce/magento-storyblok': patch
---

Fix `yarn install` on CI in a project that starts from an example: `patch-package` stopped, because the patches were for `next` 16.2.6 and `react-hook-form` 7.67.0.
