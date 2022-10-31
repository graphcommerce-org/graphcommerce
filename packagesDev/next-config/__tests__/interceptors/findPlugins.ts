import { findPlugins } from '../../src/interceptors/findPlugins'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('finds plugins', () => {
  expect(findPlugins(projectRoot)).toMatchInlineSnapshot(`
    Array [
      Object {
        "component": "FramerNextPages",
        "exported": "@graphcommerce/framer-next-pages",
        "plugin": "@graphcommerce/googletagmanager/plugins/AddGoogleTagmanager",
      },
      Object {
        "component": "PaymentMethodContextProvider",
        "exported": "@graphcommerce/magento-cart-payment-method",
        "plugin": "@graphcommerce/magento-payment-included/plugins/AddIncludedMethods",
      },
    ]
  `)
})
