---
'@graphcommerce/next-ui': patch
---

Lots of fixes for LayoutOverlay:

- When interacting with an overlay it causes browser resizes on mobile and causing a janky experience.
- Allow interaction with the previous layer after it has been closed, instead of waiting for the actual route to complete.
- Allow scrolling to the the bottom in the overlay when the height is just a bit higher than the window.
- Allow sheet positioning for bottom for the overlay: mdSpacingTop, smSpacingTop.
- Add scrollSnapStop:always to the actual overlay pane, so that when scrolling up it will not just close the overlay. Requiring a second swipe to close the overlay.
- Remove spacing on the bottom of the overlay that was introduced for Android, not nessesary anymore because of the clientSizeCssVar.y
