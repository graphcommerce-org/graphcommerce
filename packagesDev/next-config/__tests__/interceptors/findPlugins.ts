import { GraphCommerceConfig } from '../../src/generated/config'
import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('finds plugins', () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
  } as GraphCommerceConfig

  const plugins = findPlugins(fakeconfig, projectRoot)
  const disabled = plugins.filter((p) => !p.enabled)
  const enabled = plugins.filter((p) => p.enabled)

  expect(enabled).toMatchInlineSnapshot(`
    [
      {
        "component": "AddProductsToCartForm",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaAddProductsToCartForm",
      },
      {
        "component": "CartStartCheckout",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckout",
      },
      {
        "component": "CartStartCheckoutLinkOrButton",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckoutLinkOrButton",
      },
      {
        "component": "FramerNextPages",
        "enabled": true,
        "exported": "@graphcommerce/framer-next-pages",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaFramerNextPages",
      },
      {
        "component": "PaymentMethodButton",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-payment-method",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodButton",
      },
      {
        "component": "PaymentMethodContextProvider",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-payment-method",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodContextProvider",
      },
      {
        "component": "ProductListItem",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItem",
      },
      {
        "component": "ProductListItemsBase",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItemsBase",
      },
      {
        "component": "ShippingMethodForm",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-shipping-method",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaShippingMethodForm",
      },
      {
        "component": "UpdateItemQuantity",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items/UpdateItemQuantity/UpdateItemQuantity",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaUpdateItemQuantity",
      },
      {
        "component": "ApolloErrorAlert",
        "enabled": true,
        "exported": "@graphcommerce/ecommerce-ui",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorAlert",
      },
      {
        "component": "ApolloErrorFullPage",
        "enabled": true,
        "exported": "@graphcommerce/ecommerce-ui",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorFullPage",
      },
      {
        "component": "ApolloErrorSnackbar",
        "enabled": true,
        "exported": "@graphcommerce/ecommerce-ui",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorSnackbar",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaGraphQLProvider",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/graphcms-ui/plugins/HygraphGraphqlProvider",
      },
      {
        "component": "PaymentMethodContextProvider",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-wishlist/plugins/MagentoWishlistGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-cart/plugins/MagentoCartGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-customer/plugins/MagentoCustomerGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-store/plugins/MagentoStoreGraphqlProvider",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "plugin": "@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider",
      },
    ]
  `)
  expect(disabled).toMatchInlineSnapshot(`
    [
      {
        "component": "AddProductsToCartForm",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoAddProductsToCartForm",
      },
      {
        "component": "ProductListItem",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItem",
      },
      {
        "component": "ProductListItemConfigurable",
        "enabled": false,
        "exported": "@graphcommerce/magento-product-configurable",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemConfigurable",
      },
      {
        "component": "ProductListItemsBase",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemsBase",
      },
      {
        "component": "FramerNextPages",
        "enabled": false,
        "exported": "@graphcommerce/framer-next-pages",
        "ifConfig": "googleTagmanagerId",
        "plugin": "@graphcommerce/googletagmanager/plugins/GtagFramerNextPages",
      },
    ]
  `)
})
