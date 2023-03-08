---
'@graphcommerce/next-ui': patch
---

Overlays now use an additional scroll container to handle vertical scroll, fixing:

- Scrolling on desktop will not close the overlay when there is content to be scrolled
- Scrolling will not snap to bottom / top when the content is barely scrollable
- Dragging will only open or close the drawer, not something inbetween
- Swiping up on mobile will not close the overlay, first you need to scroll to the top of the overlay.
- Floating overlays will now scroll inside the floating overlay.
