---
'@graphcommerce/magento-store': minor
---

Refactored the Store Selector to be more of a form and have multiple nested toggles to switch groups, then stores and then currencies. It automatically hides features that aren't used: If only a single group is used with multiple stores only the store selector is shown. If multiple groups are used with each a single store is used, only the group selector is shown. If only a single currency is used, there is no currency selector. If multiple currencies are used, the currency selector is shown. This makes the selector more user-friendly and less cluttered.
