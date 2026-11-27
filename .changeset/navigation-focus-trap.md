---
'@graphcommerce/next-ui': patch
---

Tab and Shift+Tab stay inside the open `NavigationOverlay`. Only the items of the deepest open column are tab stops, and focus wraps from the last element to the first and back. `overlayPaneProps` of `OverlayBase` accepts the props of a motion `div`.
