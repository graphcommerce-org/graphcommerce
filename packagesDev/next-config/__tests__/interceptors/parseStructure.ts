import { parseSync } from '@swc/core'
import { GraphCommerceConfig } from '../../src/generated/config'
import { parseStructure } from '../../src/interceptors/parseStructure'

it("correctly the new PluginConfig and it's ifConfig configuration", () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
    demoMode: true,
  } as GraphCommerceConfig

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
  const ast = parseSync(src, { syntax: 'typescript', tsx: true })

  const plugins = parseStructure(ast, fakeconfig, './plugins/MyPlugin.tsx')
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "ifConfig": "demoMode",
      "sourceExport": "getProductStaticPaths",
      "sourceModule": "./plugins/MyPlugin.tsx",
      "targetExport": "getProductStaticPaths",
      "targetModule": "@graphcommerce/magento-product",
      "type": "replace",
    }
  `)
})

it('correctly the classic component plugin config', () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
    demoMode: true,
  } as GraphCommerceConfig

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
  const ast = parseSync(src, { syntax: 'typescript', tsx: true })

  const plugins = parseStructure(ast, fakeconfig, './plugins/MyPlugin')
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "ifConfig": "demoMode",
      "sourceExport": "Plugin",
      "sourceModule": "./plugins/MyPlugin",
      "targetExport": "ProductListItemConfigurable",
      "targetModule": "@graphcommerce/magento-product-configurable",
      "type": "component",
    }
  `)
})

it('correctly the classic method plugin config', () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
    demoMode: true,
  } as GraphCommerceConfig

  const src = `
import { graphqlConfig, setContext } from '@graphcommerce/graphql'
import type { MethodPlugin } from '@graphcommerce/next-config'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql'

const hygraphGraphqlConfig: MethodPlugin<typeof graphqlConfig> = (prev, config) => {
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
  const ast = parseSync(src, { syntax: 'typescript', tsx: true })

  const plugins = parseStructure(ast, fakeconfig, './plugins/MyPlugin')
  expect(plugins).toHaveLength(1)
  expect(plugins[0]).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "sourceExport": "plugin",
      "sourceModule": "./plugins/MyPlugin",
      "targetExport": "graphqlConfig",
      "targetModule": "@graphcommerce/graphql",
      "type": "method",
    }
  `)
})
