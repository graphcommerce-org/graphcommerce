import { GraphCommerceConfig } from '../../src/generated/config'
import { parseStructure } from '../../src/interceptors/parseStructure'
import { parseSync } from '../../src/interceptors/swc'

const fakeconfig = {
  googleRecaptchaKey: '123',
  googleAnalyticsId: '123',
  demoMode: true,
} as GraphCommerceConfig

it("correctly parses the new PluginConfig and it's ifConfig configuration", () => {
  const src = `
import { getProductStaticPaths as getProductStaticPathsType } from '@graphcommerce/magento-product'
import { PluginConfig } from '@graphcommerce/next-config'


export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getProductStaticPaths: typeof getProductStaticPathsType = async () => [
  { params: { url: 'demo-product' } },
]
`
  const ast = parseSync(src)

  const plugins = parseStructure(ast, fakeconfig, './plugins/MyReplace')
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "ifConfig": "demoMode",
      "sourceExport": "getProductStaticPaths",
      "sourceModule": "./plugins/MyReplace",
      "targetExport": "getProductStaticPaths",
      "targetModule": "@graphcommerce/magento-product",
      "type": "replace",
    }
  `)
})

it('correctly the classic component plugin config', () => {
  const src = `
import type { ProdustListItemConfigurableProps } from '@graphcommerce/magento-product-configurable'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'

export const component = 'ProductListItemConfigurable'
export const exported = '@graphcommerce/magento-product-configurable'
export const ifConfig: IfConfig = 'demoMode'

function DemoProductListItemConfigurable(props: PluginProps<ProdustListItemConfigurableProps>) {
  const { Prev, ...rest } = props
  return <Prev {...rest} swatchLocations={{ bottomRight: ['dominant_color'] }} />
}
export const Plugin = DemoProductListItemConfigurable
`
  const ast = parseSync(src)

  const plugins = parseStructure(ast, fakeconfig, './plugins/MyComponentPlugin')
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "ifConfig": "demoMode",
      "sourceExport": "Plugin",
      "sourceModule": "./plugins/MyComponentPlugin",
      "targetExport": "ProductListItemConfigurable",
      "targetModule": "@graphcommerce/magento-product-configurable",
      "type": "component",
    }
  `)
})

it('correctly parses the classic function plugin config', () => {
  const src = `
import { graphqlConfig, setContext } from '@graphcommerce/graphql'
import type { FunctionPlugin } from '@graphcommerce/next-config'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql'

const hygraphGraphqlConfig: FunctionPlugin<typeof graphqlConfig> = (prev, config) => {
  const results = prev(config)

  const locales = config.storefront.hygraphLocales

  if (!locales) return prev(config)

  const hygraphLink = setContext((_, context) => {
    if (!context.headers) context.headers = {}
    context.headers['gcms-locales'] = locales.join(',')
    return context
  })

  return { ...results, links: [...results.links, hygraphLink] }
}

export const plugin = hygraphGraphqlConfig
`
  const ast = parseSync(src)

  const plugins = parseStructure(ast, fakeconfig, './plugins/MyClassicFunctionPlugin')
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "sourceExport": "plugin",
      "sourceModule": "./plugins/MyClassicFunctionPlugin",
      "targetExport": "graphqlConfig",
      "targetModule": "@graphcommerce/graphql",
      "type": "function",
    }
  `)
})

it('parses the correct export when both the classic and new config is present', () => {
  const src = `import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}

function EnableCrossselsPlugin(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, redirect = 'added', ...rest } = props
  return <Prev {...rest} redirect={redirect} />
}

export const AddProductsToCartForm = EnableCrossselsPlugin
`

  const plugins = parseStructure(
    parseSync(src),
    fakeconfig,
    './plugins/MyAddProductsToCartFormPlugin.tsx',
  )
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "ifConfig": "demoMode",
      "sourceExport": "AddProductsToCartForm",
      "sourceModule": "./plugins/MyAddProductsToCartFormPlugin.tsx",
      "targetExport": "AddProductsToCartForm",
      "targetModule": "@graphcommerce/magento-product",
      "type": "component",
    }
  `)
})

it('parses', () => {
  const src = `
  import {
  PaymentMethodContextProviderProps,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { AdyenPaymentActionCard } from '../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { AdyenPaymentHandler } from '../components/AdyenPaymentHandler/AdyenPaymentHandler'
import { HppOptions } from '../components/AdyenPaymentOptionsAndPlaceOrder/AdyenPaymentOptionsAndPlaceOrder'
import { adyenHppExpandMethods } from '../hooks/adyenHppExpandMethods'

export const adyen_hpp: PaymentModule = {
  PaymentOptions: HppOptions,
  PaymentPlaceOrder: () => null,
  PaymentHandler: AdyenPaymentHandler,
  PaymentActionCard: AdyenPaymentActionCard,
  expandMethods: adyenHppExpandMethods,
}

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddAdyenMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, adyen_hpp }} />
}

export const Plugin = AddAdyenMethods
`

  const plugins = parseStructure(
    parseSync(src),
    fakeconfig,
    '@graphcommerce/magento-payment-adyen/plugins/AddAdyenMethods.tsx',
  )
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "sourceExport": "Plugin",
      "sourceModule": "@graphcommerce/magento-payment-adyen/plugins/AddAdyenMethods.tsx",
      "targetExport": "PaymentMethodContextProvider",
      "targetModule": "@graphcommerce/magento-cart-payment-method",
      "type": "component",
    }
  `)
  expect(plugins[1]).toMatchInlineSnapshot(`undefined`)
})

it('correctly allows false value in the ifConfig', () => {
  const src = `
import { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { xMagentoCacheIdHeader } from '../link/xMagentoCacheIdHeader'
import { GraphQLProviderProps } from '@graphcommerce/graphql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: ['customerXMagentoCacheIdDisable', false],
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, xMagentoCacheIdHeader]} />
}
`
  const ast = parseSync(src)

  expect(
    parseStructure(ast, {} as GraphCommerceConfig, './plugins/MyReplace')[0].enabled,
  ).toBeTruthy()

  expect(
    parseStructure(
      ast,
      { customerXMagentoCacheIdDisable: true } as GraphCommerceConfig,
      './plugins/MyReplace',
    )[0].enabled,
  ).toBeFalsy()

  expect(
    parseStructure(
      ast,
      { customerXMagentoCacheIdDisable: false } as GraphCommerceConfig,
      './plugins/MyReplace',
    )[0].enabled,
  ).toBeTruthy()
})

it('correctly allows true value in the ifConfig', () => {
  const src = `
import { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { xMagentoCacheIdHeader } from '../link/xMagentoCacheIdHeader'
import { GraphQLProviderProps } from '@graphcommerce/graphql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/graphql',
  ifConfig: ['customerXMagentoCacheIdDisable', true],
}

export function GraphQLProvider(props: PluginProps<GraphQLProviderProps>) {
  const { Prev, links = [], ...rest } = props
  return <Prev {...rest} links={[...links, xMagentoCacheIdHeader]} />
}
`
  const ast = parseSync(src)

  expect(
    parseStructure(ast, {} as GraphCommerceConfig, './plugins/MyReplace')[0].enabled,
  ).toBeFalsy()

  expect(
    parseStructure(
      ast,
      { customerXMagentoCacheIdDisable: true } as GraphCommerceConfig,
      './plugins/MyReplace',
    )[0].enabled,
  ).toBeTruthy()

  expect(
    parseStructure(
      ast,
      { customerXMagentoCacheIdDisable: false } as GraphCommerceConfig,
      './plugins/MyReplace',
    )[0].enabled,
  ).toBeFalsy()
})
