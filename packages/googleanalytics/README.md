# @graphcommerce/googleanalytics

This package makes it easy to add Google Analytics to your GraphCommerce
webshop.

### Usage

1. Fill `NEXT_PUBLIC_GOOGLE_ANALYTICS` in your .env file
   [example](../../examples/magento-graphcms/.env.example)
2. Add `<GoogleTagManagerScript/>` to your `pages/_app.tsx` file.
   [example](../../examples/magento-graphcms/pages/_app.tsx)
3. Add `<GoogleTagManagerNoScript/>` to your `pages/_document.tsx` file, in the
   body section above `<Main />`
   [example](../../examples/magento-graphcms/pages/_document_.tsx)
