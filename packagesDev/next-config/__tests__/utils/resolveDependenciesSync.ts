import { resolveDependenciesSync } from '../../src/utils/resolveDependenciesSync'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('resolves dependences', () => {
  const dependencies = resolveDependenciesSync(projectRoot)

  expect(dependencies).toMatchInlineSnapshot(`
    Map {
      "@graphcommerce/magento-graphcms" => "examples/magento-graphcms",
      "@graphcommerce/cli" => "packages/cli",
      "@graphcommerce/next-config" => "packagesDev/next-config",
      "@graphcommerce/eslint-config-pwa" => "packagesDev/eslint-config",
      "@graphcommerce/ecommerce-ui" => "packages/ecommerce-ui",
      "@graphcommerce/graphql" => "packages/graphql",
      "@graphcommerce/graphql-codegen-near-operation-file" => "packagesDev/graphql-codegen-near-operation-file",
      "@graphcommerce/graphql-codegen-relay-optimizer-plugin" => "packagesDev/graphql-codegen-relay-optimizer-plugin",
      "@graphcommerce/next-ui" => "packages/next-ui",
      "@graphcommerce/framer-next-pages" => "packages/framer-next-pages",
      "@graphcommerce/framer-utils" => "packages/framer-utils",
      "@graphcommerce/framer-scroller" => "packages/framer-scroller",
      "@graphcommerce/image" => "packages/image",
      "@graphcommerce/react-hook-form" => "packages/react-hook-form",
      "@graphcommerce/googleanalytics" => "packages/googleanalytics",
      "@graphcommerce/graphql-mesh" => "packages/graphql-mesh",
      "@graphcommerce/magento-cart" => "packages/magento-cart",
      "@graphcommerce/magento-customer" => "packages/magento-customer",
      "@graphcommerce/magento-graphql" => "packages/magento-graphql",
      "@graphcommerce/magento-store" => "packages/magento-store",
      "@graphcommerce/magento-cart-payment-method" => "packages/magento-cart-payment-method",
      "@graphcommerce/magento-cart-shipping-address" => "packages/magento-cart-shipping-address",
      "@graphcommerce/magento-cart-shipping-method" => "packages/magento-cart-shipping-method",
      "@graphcommerce/magento-product" => "packages/magento-product",
      "@graphcommerce/googlerecaptcha" => "packages/googlerecaptcha",
      "@graphcommerce/googletagmanager" => "packages/googletagmanager",
      "@graphcommerce/graphcms-ui" => "packages/graphcms-ui",
      "@graphcommerce/lingui-next" => "packages/lingui-next",
      "@graphcommerce/magento-cart-billing-address" => "packages/magento-cart-billing-address",
      "@graphcommerce/magento-cart-checkout" => "packages/magento-cart-checkout",
      "@graphcommerce/magento-cart-coupon" => "packages/magento-cart-coupon",
      "@graphcommerce/magento-cart-items" => "packages/magento-cart-items",
      "@graphcommerce/magento-cart-email" => "packages/magento-cart-email",
      "@graphcommerce/magento-category" => "packages/magento-category",
      "@graphcommerce/magento-cms" => "packages/magento-cms",
      "@graphcommerce/magento-customer-account" => "packages/magento-customer-account",
      "@graphcommerce/magento-customer-order" => "packages/magento-customer-order",
      "@graphcommerce/magento-newsletter" => "packages/magento-newsletter",
      "@graphcommerce/magento-payment-included" => "packages/magento-payment-included",
      "@graphcommerce/magento-product-configurable" => "packages/magento-product-configurable",
      "@graphcommerce/magento-product-simple" => "packages/magento-product-simple",
      "@graphcommerce/magento-product-bundle" => "packages/magento-product-bundle",
      "@graphcommerce/magento-product-virtual" => "packages/magento-product-virtual",
      "@graphcommerce/magento-product-downloadable" => "packages/magento-product-downloadable",
      "@graphcommerce/magento-product-grouped" => "packages/magento-product-grouped",
      "@graphcommerce/magento-review" => "packages/magento-review",
      "@graphcommerce/magento-search" => "packages/magento-search",
      "@graphcommerce/magento-wishlist" => "packages/magento-wishlist",
    }
  `)
})
