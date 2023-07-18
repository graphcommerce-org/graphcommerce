---
'@graphcommerce/framer-scroller': patch
---

Fixed scrollers not working properly in Firefox due to the `draggable` html property being handled differently. Added event.preventDefault() onMouseDown to useScroller to prevent drag and drop functionality inside scrollers.
