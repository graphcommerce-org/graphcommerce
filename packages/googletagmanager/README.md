# @reachdigital/googletagmanager

This package makes it easy to add Google Tag Manager to your GraphCommerce
webshop.

### Usage

1. Fill `NEXT_PUBLIC_GTM_ID` in your .env file

2. add `<GoogleTagManagerScript/>` to your \_app.tsx file, preferably as high as
   you can in the component hierarchy

3. add `<GoogleTagManagerNoScript/>` to your \_document.tsx file, in the body
   section above `<Main />`

### Hooks

`useGTMPageViewEvent` - every time a route history change happens, pageview
event gets triggered
