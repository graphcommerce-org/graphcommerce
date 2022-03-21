# @graphcommerce/googlerecaptcha

This package makes it easy to add Google Recaptcha v3 to GraphCommerce. It
allows you to load the Recatcha script conditionally on the page so it isn't
initialized on all pages.

### Installation

1. Add `NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY` to your .env file.
   [example](../../examples/magento-graphcms/.env.example)
2. Add `<GoogleRecaptchaProvider/>` to your `pages/_app.tsx` file
   [example](../../examples/magento-graphcms/pages/_app.tsx)
3. Add `recaptchaLink` to your Apollo Client.
   [example](../../examples/magento-graphcms/lib/graphql/GraphQLProvider.tsx)
4. Add `X-Recaptcha` header to your `.meshrc.yml`.
   [example](../../examples/magento-graphcms/.meshrc.yml)

### Usage

If you have a form that uses GoogleRecaptcha add `useGoogleRecaptcha()` in the
root of your component.

### Troubleshooting

`ReCaptcha validation failed, please try again`  
: Magento is configured correctly and this is an error coming from Google
directly. You have misconfigured something on the Google side. Make sure the
domains are set up correctly, etc.
