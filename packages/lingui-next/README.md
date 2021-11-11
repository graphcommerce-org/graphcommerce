# @graphcommerce/googlerecaptcha

This package makes it easy to add Google Recaptcha v3 to GraphCommerce

### Usage

1. Create a lingui.config.js with the lingui config.
   [example](../../examples/magento-graphcms/lingui.config.js)
2. Add `<LinguiProvider/>` to your `pages/_app.tsx` file
   [example](../../examples/magento-graphcms/pages/_app.tsx)
3. Wrap you `static getInitialProps` with `linguiWrapGetInitialProps` in to your
   `pages/_document.tsx` file
   [example](../../examples/magento-graphcms/pages/_document.tsx)
4. Run `NODE_ENV=development yarn lingui extract` to extact messages for your
   locale.

### Additing a new language

1. Add you new language to `lingui.config.js`
2. Run `NODE_ENV=development yarn lingui extract`
