import { generateInterceptors } from '../../src/interceptors/generateInterceptors'
import { resolveDependency } from '../../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('writes all interceptors to disk', async () => {
  const resolve = resolveDependency(projectRoot)
  await generateInterceptors(
    [
      {
        type: 'component',

        targetExport: 'PaymentMethodContextProvider',
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceExport: 'Plugin',
        sourceModule: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
        enabled: true,
      },
      {
        type: 'component',
        sourceExport: 'Plugin',
        targetExport: 'PaymentMethodContextProvider',
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
        enabled: true,
      },
      {
        type: 'component',
        sourceExport: 'Plugin',
        targetExport: 'PaymentMethodContextProvider',
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/magento-payment-included/plugins/AddIncludedMethods',
        enabled: true,
      },
      {
        type: 'component',
        sourceExport: 'Plugin',
        targetExport: 'PaymentMethodContextProvider',
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/magento-payment-paypal/plugins/AddPaypalMethods',
        enabled: true,
      },
    ],
    resolve,
  )

  // writeInterceptors(interceptors)
})
