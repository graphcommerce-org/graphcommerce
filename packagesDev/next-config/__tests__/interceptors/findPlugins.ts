import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('finds plugins', () => {
  expect(findPlugins(projectRoot)).toMatchInlineSnapshot(`
    Array [
      Object {
        "component": "AddProductsToCartForm",
        "exported": "@graphcommerce/magento-product",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaAddProductsToCartForm",
      },
      Object {
        "component": "CartStartCheckout",
        "exported": "@graphcommerce/magento-cart",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckout",
      },
      Object {
        "component": "CartStartCheckoutLinkOrButton",
        "exported": "@graphcommerce/magento-cart",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckoutLinkOrButton",
      },
      Object {
        "component": "FramerNextPages",
        "exported": "@graphcommerce/framer-next-pages",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaFramerNextPages",
      },
      Object {
        "component": "PaymentMethodButton",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodButton",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodContextProvider",
      },
      Object {
        "component": "ProductListItemsBase",
        "exported": "@graphcommerce/magento-product",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItemsBase",
      },
      Object {
        "component": "ShippingMethodForm",
        "exported": "@graphcommerce/magento-cart-shipping-method",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaShippingMethodForm",
      },
      Object {
        "component": "ApolloErrorAlert",
        "exported": "@graphcommerce/ecommerce-ui",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorAlert",
      },
      Object {
        "component": "ApolloErrorFullPage",
        "exported": "@graphcommerce/ecommerce-ui",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorFullPage",
      },
      Object {
        "component": "ApolloErrorSnackbar",
        "exported": "@graphcommerce/ecommerce-ui",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorSnackbar",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaGraphQLProvider",
      },
      Object {
        "component": "FramerNextPages",
        "exported": "@graphcommerce/framer-next-pages",
        "plugin": "@graphcommerce/googletagmanager/plugins/GtagFramerNextPages",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/graphcms-ui/plugins/HygraphGraphqlProvider",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-adyen/plugins/AddAdyenMethods",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-wishlist/plugins/MagentoWishlistGraphqlProvider",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-cart/plugins/MagentoCartGraphqlProvider",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-customer/plugins/MagentoCustomerGraphqlProvider",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-store/plugins/MagentoStoreGraphqlProvider",
      },
      Object {
        "component": "GraphQLProvider",
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider",
      },
    ]
  `)
})
