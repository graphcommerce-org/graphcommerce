---
'@graphcommerce/magento-search-overlay': patch
---

Use immediate input value for Enter navigation.

Modified SearchOverlayProvider to pull the search query directly from the event target during the Enter key event. This prevents the "partial query" bug caused by navigating with the lagging debounced state.
