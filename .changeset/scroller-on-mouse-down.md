---
'@graphcommerce/framer-scroller': patch
---

`useScroller` calls the `onMouseDown` of its props. It replaced it with its own handler, so a click on an image of `SidebarGallery` did not open the zoom.
