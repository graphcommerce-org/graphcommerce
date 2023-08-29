import { generateInterceptors } from '../../src/interceptors/generateInterceptors'
import { resolveDependency } from '../../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('writes all interceptors to disk', () => {
  const resolve = resolveDependency(projectRoot)
  generateInterceptors(
    [
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
        enabled: true,
      },
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
        enabled: true,
      },
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-payment-included/plugins/AddIncludedMethods',
        enabled: true,
      },
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-payment-paypal/plugins/AddPaypalMethods',
        enabled: true,
      },
    ],
    resolve,
  )

  // writeInterceptors(interceptors)
})
