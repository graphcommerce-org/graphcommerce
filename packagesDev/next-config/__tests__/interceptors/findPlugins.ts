import { GraphCommerceConfig } from '../../src/generated/config'
import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('finds plugins', () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
  } as GraphCommerceConfig

  const [plugins, errors] = findPlugins(fakeconfig, projectRoot)
  const disabled = plugins.filter((p) => !p.enabled)
  const enabled = plugins.filter((p) => p.enabled)

  expect(errors).toMatchInlineSnapshot(`[]`)

  expect(enabled).toMatchInlineSnapshot(`
    [
      {
        "component": "ProductPageMeta",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaViewItem",
      },
      {
        "component": "UpdateItemQuantity",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaUpdateItemQuantity",
      },
      {
        "component": "ShippingMethodForm",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-shipping-method",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaShippingMethodForm",
      },
      {
        "component": "RemoveItemFromCartFab",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaRemoveItemFromCartFab",
      },
      {
        "component": "RemoveItemFromCart",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCart",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaRemoveItemFromCart",
      },
      {
        "component": "ProductListItemsBase",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItemsBase",
      },
      {
        "component": "ProductListItem",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaProductListItem",
      },
      {
        "component": "PaymentMethodContextProvider",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-payment-method",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodContextProvider",
      },
      {
        "component": "PaymentMethodButton",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-payment-method",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaPaymentMethodButton",
      },
      {
        "component": "FramerNextPages",
        "enabled": true,
        "exported": "@graphcommerce/framer-next-pages",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaFramerNextPages",
      },
      {
        "component": "CartStartCheckoutLinkOrButton",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckoutLinkOrButton",
      },
      {
        "component": "CartStartCheckout",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaCartStartCheckout",
      },
      {
        "component": "AddProductsToCartForm",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "googleAnalyticsId",
        "plugin": "@graphcommerce/googleanalytics/plugins/GaAddProductsToCartForm",
      },
      {
        "component": "GraphQLProvider",
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaGraphQLProvider",
      },
      {
        "component": "ApolloErrorSnackbar",
        "enabled": true,
        "exported": "@graphcommerce/ecommerce-ui",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorSnackbar",
      },
      {
        "component": "ApolloErrorFullPage",
        "enabled": true,
        "exported": "@graphcommerce/ecommerce-ui",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorFullPage",
      },
      {
        "component": "ApolloErrorAlert",
        "enabled": true,
        "exported": "@graphcommerce/ecommerce-ui",
        "ifConfig": "googleRecaptchaKey",
        "plugin": "@graphcommerce/googlerecaptcha/plugins/GrecaptchaApolloErrorAlert",
      },
      {
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "func": "graphqlConfig",
        "plugin": "@graphcommerce/graphcms-ui/plugins/hygraphGraphqlConfig",
      },
      {
        "enabled": true,
        "exported": "@graphcommerce/graphcms-ui",
        "func": "hygraphPageContent",
        "plugin": "@graphcommerce/hygraph-dynamic-rows/plugins/hygraphDynamicRowsPageContent",
      },
      {
        "enabled": true,
        "exported": "@graphcommerce/magento-customer",
        "func": "useSignInForm",
        "plugin": "@graphcommerce/magento-cart/plugins/useSignInFormMergeCart",
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
        "enabled": true,
        "exported": "@graphcommerce/graphql/config",
        "func": "graphqlConfig",
        "plugin": "@graphcommerce/magento-graphql/plugins/magentoGraphqlConfig",
      },
      {
        "component": "PaymentMethodContextProvider",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
      {
        "component": "CartItemActionCard",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard",
        "plugin": "@graphcommerce/magento-product-bundle/plugins/BundleCartItemActionCard",
      },
      {
        "component": "CartItemActionCard",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableCartItemActionCard",
      },
      {
        "component": "ProductPagePriceTiers",
        "enabled": true,
        "exported": "@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePriceTiers",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPagePriceTiers",
      },
      {
        "component": "ProductPagePrice",
        "enabled": true,
        "exported": "@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePrice",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPagePrice",
      },
      {
        "component": "ProductPageGallery",
        "enabled": true,
        "exported": "@graphcommerce/magento-product/components/ProductPageGallery/ProductPageGallery",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageGallery",
      },
      {
        "component": "CartItemActionCard",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard",
        "plugin": "@graphcommerce/magento-product-simple/plugins/SimpleCartItemActionCard",
      },
      {
        "component": "CartItemActionCard",
        "enabled": true,
        "exported": "@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard",
        "plugin": "@graphcommerce/magento-product-virtual/plugins/VirtualCartItemActionCard",
      },
      {
        "enabled": true,
        "exported": "@graphcommerce/graphql",
        "func": "graphqlConfig",
        "plugin": "@graphcommerce/magento-store/plugins/magentoStoreGraphqlConfig",
      },
      {
        "component": "AddProductsToCartForm",
        "enabled": true,
        "exported": "@graphcommerce/magento-product",
        "plugin": "@graphcommerce/magento-wishlist/plugins/WishlistProductAddToCartFormPlugin",
      },
      {
        "component": "WishlistItemActionCard",
        "enabled": true,
        "exported": "@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard",
        "plugin": "@graphcommerce/magento-wishlist/plugins/ConfigurableWishlistItemActionCard",
      },
      {
        "component": "WishlistItemActionCard",
        "enabled": true,
        "exported": "@graphcommerce/magento-wishlist/components/WishlistItemActionCard/WishlistItemActionCard",
        "plugin": "@graphcommerce/magento-wishlist/plugins/BundleWishlistItemActionCard",
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
        "plugin": "./plugins/EnableCrosssellsPlugin",
      },
      {
        "component": "RowLinks",
        "enabled": false,
        "exported": "@graphcommerce/next-ui",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoRowLinks",
      },
      {
        "component": "RecentlyViewedProducts",
        "enabled": false,
        "exported": "@graphcommerce/magento-recently-viewed-products",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoRecentlyViewedProducts",
      },
      {
        "component": "ProductListItemsBase",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemsBase",
      },
      {
        "component": "ProductListItemConfigurable",
        "enabled": false,
        "exported": "@graphcommerce/magento-product-configurable",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItemConfigurable",
      },
      {
        "component": "ProductListItem",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "demoMode",
        "plugin": "@graphcommerce/demo-magento-graphcommerce/plugins/demo/DemoProductListItem",
      },
      {
        "component": "FramerNextPages",
        "enabled": false,
        "exported": "@graphcommerce/framer-next-pages",
        "ifConfig": "googleTagmanagerId",
        "plugin": "@graphcommerce/googletagmanager/plugins/GtagFramerNextPages",
      },
      {
        "component": "ProductListItem",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "compare",
        "plugin": "@graphcommerce/magento-compare/plugins/CompareAbleProductListItem",
      },
      {
        "component": "GraphQLProvider",
        "enabled": false,
        "exported": "@graphcommerce/graphql",
        "ifConfig": "compare",
        "plugin": "@graphcommerce/magento-compare/plugins/AddCompareTypePolicies",
      },
      {
        "component": "ProductPageAddToCartActionsRow",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "compare",
        "plugin": "@graphcommerce/magento-compare/plugins/AddCompareToProductPage",
      },
      {
        "component": "CartFab",
        "enabled": false,
        "exported": "@graphcommerce/magento-cart",
        "ifConfig": "compare",
        "plugin": "@graphcommerce/magento-compare/plugins/AddCompareFabNextToCart",
      },
      {
        "component": "FramerNextPages",
        "enabled": false,
        "exported": "@graphcommerce/framer-next-pages",
        "ifConfig": "debug.sessions",
        "plugin": "@graphcommerce/magento-customer/plugins/SessionDebuggerPlugin",
      },
      {
        "component": "ProductShortDescription",
        "enabled": false,
        "exported": "@graphcommerce/magento-product/components/ProductShortDescription/ProductShortDescription",
        "ifConfig": "configurableVariantValues.content",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductShortDescription",
      },
      {
        "component": "ProductPageName",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "configurableVariantValues.content",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageName",
      },
      {
        "component": "ProductPageMeta",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "configurableVariantValues.url",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageMeta",
      },
      {
        "component": "ProductPageJsonLd",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "configurableVariantValues.content",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageJsonLd",
      },
      {
        "component": "ProductPageDescription",
        "enabled": false,
        "exported": "@graphcommerce/magento-product/components/ProductPageDescription/ProductPageDescription",
        "ifConfig": "configurableVariantValues.content",
        "plugin": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageDescription",
      },
      {
        "component": "ProductPageMeta",
        "enabled": false,
        "exported": "@graphcommerce/magento-product",
        "ifConfig": "recentlyViewedProducts.enabled",
        "plugin": "@graphcommerce/magento-recently-viewed-products/plugins/RegisterProductAsRecentlyViewed",
      },
    ]
  `)
})
