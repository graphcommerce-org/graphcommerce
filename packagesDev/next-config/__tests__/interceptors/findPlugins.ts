import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('finds plugins', () => {
  expect(findPlugins(projectRoot)).toMatchInlineSnapshot(`
    [
      {
        "component": "AddProductsToCartForm",
        "exported": "@graphcommerce/magento-product",
        "ifEnv": "DEMO_MAGENTO_GRAPHCOMMERCE",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoAddProductsToCartForm",
      },
      {
        "component": "ProductListItem",
        "exported": "@graphcommerce/magento-product",
        "ifEnv": "DEMO_MAGENTO_GRAPHCOMMERCE",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItem",
      },
      {
        "component": "ProductListItemConfigurable",
        "exported": "@graphcommerce/magento-product-configurable",
        "ifEnv": "DEMO_MAGENTO_GRAPHCOMMERCE",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemConfigurable",
      },
      {
        "component": "ProductListItemsBase",
        "exported": "@graphcommerce/magento-product",
        "ifEnv": "DEMO_MAGENTO_GRAPHCOMMERCE",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemsBase",
      },
      {
        "component": "AddProductsToCartForm",
        "exported": "@graphcommerce/magento-product",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaAddProductsToCartForm",
      },
      {
        "component": "CartStartCheckout",
        "exported": "@graphcommerce/magento-cart",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckout",
      },
      {
        "component": "CartStartCheckoutLinkOrButton",
        "exported": "@graphcommerce/magento-cart",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckoutLinkOrButton",
      },
      {
        "component": "FramerNextPages",
        "exported": "@graphcommerce/framer-next-pages",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaFramerNextPages",
      },
      {
        "component": "PaymentMethodButton",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodButton",
      },
      {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodContextProvider",
      },
      {
        "component": "ProductListItem",
        "exported": "@graphcommerce/magento-product",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItem",
      },
      {
        "component": "ProductListItemsBase",
        "exported": "@graphcommerce/magento-product",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItemsBase",
      },
      {
        "component": "ShippingMethodForm",
        "exported": "@graphcommerce/magento-cart-shipping-method",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaShippingMethodForm",
      },
      {
        "component": "UpdateItemQuantity",
        "exported": "@graphcommerce/magento-cart-items/UpdateItemQuantity/UpdateItemQuantity",
        "ifEnv": "NEXT_PUBLIC_GOOGLE_ANALYTICS",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaUpdateItemQuantity",
      },
      {
        "component": "ApolloErrorAlert",
        "exported": "@graphcommerce/ecommerce-ui",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorAlert",
      },
      {
        "component": "ApolloErrorFullPage",
        "exported": "@graphcommerce/ecommerce-ui",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorFullPage",
      },
      {
        "component": "ApolloErrorSnackbar",
        "exported": "@graphcommerce/ecommerce-ui",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorSnackbar",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaGraphQLProvider",
      },
      {
        "component": "FramerNextPages",
        "exported": "@graphcommerce/framer-next-pages",
        "plugin": "@graphcommerce/googletagmanager/plugins/GtagFramerNextPages",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/graphcms-ui/plugins/HygraphGraphqlProvider",
      },
      {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-wishlist/plugins/MagentoWishlistGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-cart/plugins/MagentoCartGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-customer/plugins/MagentoCustomerGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-store/plugins/MagentoStoreGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider",
      },
    ]
  `)
})
