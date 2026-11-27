---
'@graphcommerce/next-ui': patch
---

Fix hydration error #418 on a category page with an active filter or sort: `ActionCardAccordion` renders its summary as a `div`, so the clear button in `right` is not a button in a button.
