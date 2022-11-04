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
        "component": "FramerNextPages",
        "exported": "@graphcommerce/framer-next-pages",
        "plugin": "@graphcommerce/googletagmanager/plugins/GtagFramerNextPages",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
    ]
  `)
})
