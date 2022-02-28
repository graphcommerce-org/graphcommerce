---
'@graphcommerce/docs': patch
'@graphcommerce/image': patch
'@graphcommerce/next-ui': patch
---

SvgIcon is now more extenable and flexible:

- It will automatically calculate the stroke-width of the SVG based on the
  rendered size, allowing for a more flexible use for icons.

- Make SvgIcon themable in your own Theme.

- Create overrides for components that will be used throughout the app.
