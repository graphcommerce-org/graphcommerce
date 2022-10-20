import fs from 'node:fs'
import path from 'node:path'
import {
  generateInterceptors,
  writeInterceptors,
  rmInterceptors,
} from '../src/generateInterceptors'
import { resolveDependenciesSync } from '../src/utils/resolveDependenciesSync'
import { resolveDependency } from '../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('it replaces paths and creates a relative path', () => {
  const resolver = resolveDependency(projectRoot)
  const resolved = resolver('@graphcommerce/magento-cart-payment-method')
  expect(resolved.fromRoot).toMatchInlineSnapshot(`"packages/magento-cart-payment-method"`)
  expect(resolved.fromModule).toBe('.')
  expect(resolved.root).toBe('packages/magento-cart-payment-method')

  const resolved2 = resolver(
    '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
  )
  expect(resolved2.fromRoot).toMatchInlineSnapshot(
    `"packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext"`,
  )
  expect(resolved2.fromModule).toBe('./PaymentMethodContext')
  expect(resolved2.root).toBe('packages/magento-cart-payment-method')
})

it('it generates an interceptor', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
    [
      {
        component: 'PaymentMethodContextProvider',
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
      },
    ],
    resolve,
  )

  expect(interceptors['packages/magento-cart-payment-method']?.template).toMatchInlineSnapshot(`
    "// This interceptor is automatically generated and is loaded by webpack to replace the original export.
    /* eslint-disable import/no-extraneous-dependencies */
    /* eslint-disable import/export */

    import { plugin as AddMollieMethods } from '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods'

    import { PaymentMethodContextProvider as PaymentMethodContextProviderBase } from '.'

    // eslint-disable-next-line import/export
    export * from '.'

    // eslint-disable-next-line import/export
    export const PaymentMethodContextProvider = [AddMollieMethods].reduce(
      (acc, plugin) => plugin(acc),
      PaymentMethodContextProviderBase,
    )
    "
  `)
})

it('it can apply multiple plugins to a single export', () => {
  const plugins = [
    {
      component: 'PaymentMethodContextProvider',
      exported:
        '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
      plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
    },
    {
      component: 'PaymentMethodContextProvider',
      exported:
        '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
      plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
    },
    {
      component: 'InlineAccount',
      exported: '@graphcommerce/magento-cart',
      plugin: '@graphcommerce/magento-payment-braintree/plugins/myplugin',
    },
  ]

  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(plugins, resolve)
  expect(
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template,
  ).toMatchInlineSnapshot(`
    "// This interceptor is automatically generated and is loaded by webpack to replace the original export.
    /* eslint-disable import/no-extraneous-dependencies */
    /* eslint-disable import/export */

    import { plugin as AddBraintreeMethods } from '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods'
    import { plugin as AddMollieMethods } from '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods'

    import { PaymentMethodContextProvider as PaymentMethodContextProviderBase } from './PaymentMethodContext'

    // eslint-disable-next-line import/export
    export * from './PaymentMethodContext'

    // eslint-disable-next-line import/export
    export const PaymentMethodContextProvider = [AddBraintreeMethods, AddMollieMethods].reduce(
      (acc, plugin) => plugin(acc),
      PaymentMethodContextProviderBase,
    )
    "
  `)
})

it.skip('removes all interceptors from disk', () => {
  const dependencies = resolveDependenciesSync(projectRoot)

  const dir = `${dependencies.get('@graphcommerce/next-config')}/__mocks__`
  const file = `${dir}/bla.interceptor.ts`
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, 'export const hoi = 1')

  expect(rmInterceptors(projectRoot).join('|')).toMatchInlineSnapshot(
    `"packagesDev/next-config/__mocks__/bla.interceptor.ts"`,
  )
})

it('writes all interceptors to disk', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
    [
      {
        component: 'PaymentMethodContextProvider',
        exported:
          '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
        plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        exported:
          '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
        plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        exported:
          '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
        plugin: '@graphcommerce/magento-payment-included/plugins/AddIncludedMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        exported:
          '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
        plugin: '@graphcommerce/magento-payment-paypal/plugins/AddPaypalMethods',
      },
    ],
    resolve,
  )

  writeInterceptors(interceptors)
})
