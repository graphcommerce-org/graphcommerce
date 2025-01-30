import { resolveDependenciesSync, sortDependencies } from '../../src/utils/resolveDependenciesSync'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`
it('It resolves and sorts dependencies beginning with the root example package and ending with the the packages used everywhere.', () => {
  const dependencies = resolveDependenciesSync(projectRoot)
  expect(dependencies).toMatchInlineSnapshot(
    `
    Map {
      "." => "examples/magento-graphcms",
      "@graphcommerce/algolia-recommend" => "packages/algolia-recommend",
      "@graphcommerce/algolia-personalization" => "packages/algolia-personalization",
      "@graphcommerce/algolia-insights" => "packages/algolia-insights",
      "@graphcommerce/algolia-categories" => "packages/algolia-categories",
      "@graphcommerce/algolia-products" => "packages/algolia-products",
      "@graphcommerce/magento-payment-paypal" => "packages/magento-payment-paypal",
      "@graphcommerce/mollie-magento-payment" => "packages/mollie-magento-payment",
      "@graphcommerce/magento-payment-braintree" => "packages/magento-payment-braintree",
      "@graphcommerce/magento-cart-pickup" => "packages/magento-cart-pickup",
      "@graphcommerce/service-worker" => "packages/service-worker",
      "@graphcommerce/magento-wishlist" => "packages/magento-wishlist",
      "@graphcommerce/magento-review" => "packages/magento-review",
      "@graphcommerce/magento-product-grouped" => "packages/magento-product-grouped",
      "@graphcommerce/magento-product-downloadable" => "packages/magento-product-downloadable",
      "@graphcommerce/magento-product-bundle" => "packages/magento-product-bundle",
      "@graphcommerce/magento-product-virtual" => "packages/magento-product-virtual",
      "@graphcommerce/magento-payment-included" => "packages/magento-payment-included",
      "@graphcommerce/magento-newsletter" => "packages/magento-newsletter",
      "@graphcommerce/magento-graphql-rest" => "packages/magento-graphql-rest",
      "@graphcommerce/magento-search" => "packages/magento-search",
      "@graphcommerce/magento-compare" => "packages/magento-compare",
      "@graphcommerce/magento-cms" => "packages/magento-cms",
      "@graphcommerce/magento-cart-email" => "packages/magento-cart-email",
      "@graphcommerce/magento-cart-checkout" => "packages/magento-cart-checkout",
      "@graphcommerce/magento-cart-coupon" => "packages/magento-cart-coupon",
      "@graphcommerce/magento-cart-billing-address" => "packages/magento-cart-billing-address",
      "@graphcommerce/hygraph-dynamic-rows" => "packages/hygraph-dynamic-rows",
      "@graphcommerce/hygraph-ui" => "packages/hygraph-ui",
      "@graphcommerce/googletagmanager" => "packages/googletagmanager",
      "@graphcommerce/googlerecaptcha" => "packages/googlerecaptcha",
      "@graphcommerce/googleanalytics" => "packages/googleanalytics",
      "@graphcommerce/google-playstore" => "packages/google-playstore",
      "@graphcommerce/google-datalayer" => "packages/google-datalayer",
      "@graphcommerce/magento-cart-shipping-method" => "packages/magento-cart-shipping-method",
      "@graphcommerce/magento-cart-payment-method" => "packages/magento-cart-payment-method",
      "@graphcommerce/magento-cart-shipping-address" => "packages/magento-cart-shipping-address",
      "@graphcommerce/demo-magento-graphcommerce" => "packages/demo-magento-graphcommerce",
      "@graphcommerce/magento-recently-viewed-products" => "packages/magento-recently-viewed-products",
      "@graphcommerce/magento-product-configurable" => "packages/magento-product-configurable",
      "@graphcommerce/magento-product-simple" => "packages/magento-product-simple",
      "@graphcommerce/magento-category" => "packages/magento-category",
      "@graphcommerce/magento-cart-items" => "packages/magento-cart-items",
      "@graphcommerce/lingui-next" => "packages/lingui-next",
      "@graphcommerce/magento-product" => "packages/magento-product",
      "@graphcommerce/magento-cart" => "packages/magento-cart",
      "@graphcommerce/magento-customer" => "packages/magento-customer",
      "@graphcommerce/magento-store" => "packages/magento-store",
      "@graphcommerce/magento-graphql" => "packages/magento-graphql",
      "@graphcommerce/ecommerce-ui" => "packages/ecommerce-ui",
      "@graphcommerce/react-hook-form" => "packages/react-hook-form",
      "@graphcommerce/next-ui" => "packages/next-ui",
      "@graphcommerce/framer-next-pages" => "packages/framer-next-pages",
      "@graphcommerce/graphql" => "packages/graphql",
      "@graphcommerce/graphql-codegen-relay-optimizer-plugin" => "packagesDev/graphql-codegen-relay-optimizer-plugin",
      "@graphcommerce/graphql-codegen-near-operation-file" => "packagesDev/graphql-codegen-near-operation-file",
      "@graphcommerce/framer-scroller" => "packages/framer-scroller",
      "@graphcommerce/image" => "packages/image",
      "@graphcommerce/framer-utils" => "packages/framer-utils",
      "@graphcommerce/cli" => "packages/cli",
      "@graphcommerce/hygraph-cli" => "packages/hygraph-cli",
      "@graphcommerce/next-config" => "packagesDev/next-config",
      "@graphcommerce/graphql-mesh" => "packages/graphql-mesh",
      "@graphcommerce/prettier-config-pwa" => "packagesDev/prettier-config",
      "@graphcommerce/eslint-config-pwa" => "packagesDev/eslint-config",
      "@graphcommerce/typescript-config-pwa" => "packagesDev/typescript-config",
    }
  `,
  )
})
it('sorts dependencies', () => {
  const sorted = sortDependencies({
    '@graphcommerce/magento-graphcms': {
      dirName: 'examples/magento-graphcms',
      dependencies: ['@graphcommerce/magento-cart'],
    },
    '@graphcommerce/magento-product-simple': {
      dirName: 'packages/magento-product-simple',
      dependencies: [],
    },
    '@graphcommerce/magento-product': {
      dirName: 'packages/magento-product',
      dependencies: ['@graphcommerce/magento-product-simple'],
    },
    '@graphcommerce/magento-cart': {
      dirName: 'packages/magento-cart',
      dependencies: ['@graphcommerce/magento-product'],
    },
  })
  expect(sorted).toMatchInlineSnapshot(
    `
    Map {
      "@graphcommerce/magento-graphcms" => "examples/magento-graphcms",
      "@graphcommerce/magento-cart" => "packages/magento-cart",
      "@graphcommerce/magento-product" => "packages/magento-product",
      "@graphcommerce/magento-product-simple" => "packages/magento-product-simple",
    }
  `,
  )
})
