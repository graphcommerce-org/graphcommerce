# @graphcommerce/lingui-next

This package adds lingui to GraphCommerce

## Installation

1. Create a lingui.config.js with the lingui config.
   [example](../../examples/magento-graphcms/lingui.config.js)
2. Add `<LinguiProvider/>` to your `pages/_app.tsx` file
   [example](../../examples/magento-graphcms/pages/_app.tsx)
3. Wrap you `static getInitialProps` with `linguiWrapGetInitialProps` in to your
   `pages/_document.tsx` file
   [example](../../examples/magento-graphcms/pages/_document.tsx)
4. Run `NODE_ENV=development yarn lingui extract` to extact messages for your
   locale.

## Configuration

Configure the following ([configuration values](./Config.graphqls)) in your
graphcommerce.config.js

## Extracting messages

Run `NODE_ENV=development yarn lingui extract`
