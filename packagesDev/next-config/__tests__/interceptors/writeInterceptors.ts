import { generateInterceptors } from '../../src/interceptors/generateInterceptors'
import { writeInterceptors } from '../../src/interceptors/writeInterceptors'
import { resolveDependency } from '../../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('writes all interceptors to disk', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
    [
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-payment-included/plugins/AddIncludedMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-payment-paypal/plugins/AddPaypalMethods',
      },
    ],
    resolve,
  )

  // writeInterceptors(interceptors)
})
