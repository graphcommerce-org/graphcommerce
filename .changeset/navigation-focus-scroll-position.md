---
'@graphcommerce/next-ui': patch
---

`NavigationOverlay` focuses its close button without a scroll, so the backdrop fades in when the menu opens. A scrolling `focus()` put the overlay in its open position before `OverlayBase` started the animation.
