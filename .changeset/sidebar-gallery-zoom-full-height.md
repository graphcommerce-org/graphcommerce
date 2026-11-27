---
'@graphcommerce/next-ui': patch
---

The zoomed SidebarGallery fills the full screen height. It moves up by its measured distance to the top of the page instead of a fixed margin based on the header height. With the fixed margin, the zoomed gallery on desktop started 11px below the top of the screen and the bottom 11px was cut off.
