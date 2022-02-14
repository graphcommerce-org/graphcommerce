# @graphcommerce/googlerecaptcha

This package makes it easy to add Google Recaptcha v3 to GraphCommerce

### Usage

1. Add `NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY` to your .env file.
   [example](../../examples/magento-graphcms/.env.example)
2. Add `<GoogleRecaptchaV3Script/>` to your `pages/_app.tsx` file
   [example](../../examples/magento-graphcms/pages/_app.tsx)
3. Add `recaptchaLink` to your Apollo Client.
   [example](../../examples/magento-graphcms/lib/createApolloClient.ts)
4. Add `X-Recaptcha` header to your `.meshrc.yml`.
   [example](../../examples/magento-graphcms/.meshrc.yml)
