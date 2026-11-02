---
'@graphcommerce/next-ui': patch
---

A page that opens with `#gallery`, for example after a reload of the zoomed gallery or after Back from another site, renders without zoom, the same as the server render, and removes `#gallery` without a "Cancel rendering route" error. Before, the gallery rendered zoomed in the browser and closed again, so the image moved on page load.
