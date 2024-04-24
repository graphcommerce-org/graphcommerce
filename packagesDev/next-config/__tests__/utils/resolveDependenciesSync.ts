import { resolveDependenciesSync, sortDependencies } from '../../src/utils/resolveDependenciesSync'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('resolves dependences', () => {
  const dependencies = resolveDependenciesSync(projectRoot)

  expect(dependencies).toMatchInlineSnapshot(`
    Map {
      "." => "examples/magento-graphcms",
      "@graphcommerce/cli" => "packages/cli",
      "@graphcommerce/demo-magento-graphcommerce" => "packages/demo-magento-graphcommerce",
      "@graphcommerce/ecommerce-ui" => "packages/ecommerce-ui",
      "@graphcommerce/framer-next-pages" => "packages/framer-next-pages",
      "@graphcommerce/framer-scroller" => "packages/framer-scroller",
      "@graphcommerce/framer-utils" => "packages/framer-utils",
      "@graphcommerce/googleanalytics" => "packages/googleanalytics",
      "@graphcommerce/googlerecaptcha" => "packages/googlerecaptcha",
      "@graphcommerce/googletagmanager" => "packages/googletagmanager",
      "@graphcommerce/google-datalayer" => "packages/google-datalayer",
      "@graphcommerce/graphcms-ui" => "packages/hygraph-ui",
      "@graphcommerce/graphql" => "packages/graphql",
      "@graphcommerce/graphql-codegen-near-operation-file" => "packagesDev/graphql-codegen-near-operation-file",
      "@graphcommerce/graphql-codegen-relay-optimizer-plugin" => "packagesDev/graphql-codegen-relay-optimizer-plugin",
      "@graphcommerce/graphql-mesh" => "packages/graphql-mesh",
      "@graphcommerce/hygraph-cli" => "packages/hygraph-cli",
      "@graphcommerce/hygraph-dynamic-rows" => "packages/hygraph-dynamic-rows",
      "@graphcommerce/image" => "packages/image",
      "@graphcommerce/lingui-next" => "packages/lingui-next",
      "@graphcommerce/magento-cart" => "packages/magento-cart",
      "@graphcommerce/magento-cart-billing-address" => "packages/magento-cart-billing-address",
      "@graphcommerce/magento-cart-checkout" => "packages/magento-cart-checkout",
      "@graphcommerce/magento-cart-coupon" => "packages/magento-cart-coupon",
      "@graphcommerce/magento-cart-email" => "packages/magento-cart-email",
      "@graphcommerce/magento-cart-items" => "packages/magento-cart-items",
      "@graphcommerce/magento-cart-payment-method" => "packages/magento-cart-payment-method",
      "@graphcommerce/magento-cart-shipping-address" => "packages/magento-cart-shipping-address",
      "@graphcommerce/magento-cart-shipping-method" => "packages/magento-cart-shipping-method",
      "@graphcommerce/magento-category" => "packages/magento-category",
      "@graphcommerce/magento-cms" => "packages/magento-cms",
      "@graphcommerce/magento-compare" => "packages/magento-compare",
      "@graphcommerce/magento-customer" => "packages/magento-customer",
      "@graphcommerce/magento-graphql" => "packages/magento-graphql",
      "@graphcommerce/magento-newsletter" => "packages/magento-newsletter",
      "@graphcommerce/magento-payment-included" => "packages/magento-payment-included",
      "@graphcommerce/magento-product" => "packages/magento-product",
      "@graphcommerce/magento-product-bundle" => "packages/magento-product-bundle",
      "@graphcommerce/magento-product-configurable" => "packages/magento-product-configurable",
      "@graphcommerce/magento-product-downloadable" => "packages/magento-product-downloadable",
      "@graphcommerce/magento-product-grouped" => "packages/magento-product-grouped",
      "@graphcommerce/magento-product-simple" => "packages/magento-product-simple",
      "@graphcommerce/magento-product-virtual" => "packages/magento-product-virtual",
      "@graphcommerce/magento-recently-viewed-products" => "packages/magento-recently-viewed-products",
      "@graphcommerce/magento-review" => "packages/magento-review",
      "@graphcommerce/magento-search" => "packages/magento-search",
      "@graphcommerce/magento-store" => "packages/magento-store",
      "@graphcommerce/magento-wishlist" => "packages/magento-wishlist",
      "@graphcommerce/next-config" => "packagesDev/next-config",
      "@graphcommerce/next-ui" => "packages/next-ui",
      "@graphcommerce/react-hook-form" => "packages/react-hook-form",
      "@graphcommerce/eslint-config-pwa" => "packagesDev/eslint-config",
      "@graphcommerce/typescript-config-pwa" => "packagesDev/typescript-config",
      "@graphcommerce/prettier-config-pwa" => "packagesDev/prettier-config",
    }
  `)
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

  expect(sorted).toMatchInlineSnapshot(`
    Map {
      "@graphcommerce/magento-graphcms" => "examples/magento-graphcms",
      "@graphcommerce/magento-cart" => "packages/magento-cart",
      "@graphcommerce/magento-product" => "packages/magento-product",
      "@graphcommerce/magento-product-simple" => "packages/magento-product-simple",
    }
  `)
})
