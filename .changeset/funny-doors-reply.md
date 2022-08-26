---
'@graphcommerce/magento-graphcms': patch
'@graphcommerce/magento-category': patch
'@graphcommerce/next-ui': patch
---

Navigation now uses a single `const selection = useNavigationSelection()` motionValue to control the state of the menu, to prevent excessive rerenders.
