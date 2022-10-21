import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it.only('finds plugins', () => {
  expect(findPlugins(projectRoot)).toMatchInlineSnapshot(`
    Array [
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "packages/magento-payment-braintree/plugins/AddBraintreeMethods.tsx",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "packages/magento-payment-included/plugins/AddIncludedMethods.tsx",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "packages/magento-payment-paypal/plugins/AddPaypalMethods.tsx",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext",
        "plugin": "packages/mollie-magento-payment/plugins/AddMollieMethods.tsx",
      },
    ]
  `)
})
