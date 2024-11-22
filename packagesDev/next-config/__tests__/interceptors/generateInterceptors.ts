import type { GraphCommerceConfig } from '../../src/generated/config'
import { findOriginalSource } from '../../src/interceptors/findOriginalSource'
import { SOURCE_END, SOURCE_START } from '../../src/interceptors/generateInterceptor'
import { generateInterceptors } from '../../src/interceptors/generateInterceptors'
import { parseStructure } from '../../src/interceptors/parseStructure'
import { parseSync } from '../../src/interceptors/swc'
import { resolveDependency } from '../../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

const startLocation = '/** @see {@link file://'

const expectImport = (value: string | undefined): jest.JestMatchers<string> =>
  expect(value?.slice(value.indexOf('import') - 1, value.indexOf(startLocation) - 1).trim())

const expectInterceptor = (value: string | undefined): jest.JestMatchers<string> => {
  const val = value?.slice(value.indexOf(SOURCE_END) + SOURCE_END.length).trim()
  return expect(val?.trim())
}

const expectOriginal = (value: string | undefined): jest.JestMatchers<string> =>
  expect(
    value
      ?.slice(value.indexOf(SOURCE_START) + SOURCE_START.length, value.indexOf(SOURCE_END))
      .trim(),
  )

it('it replaces paths and creates a relative path', () => {
  const resolver = resolveDependency(projectRoot)
  const resolved = resolver('@graphcommerce/magento-cart-payment-method')
  expect(resolved?.fromRoot).toMatchInlineSnapshot('"packages/magento-cart-payment-method/index"')
  expect(resolved?.fromModule).toBe('.')
  expect(resolved?.root).toBe('packages/magento-cart-payment-method')

  const resolved2 = resolver(
    '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
  )
  expect(resolved2?.fromRoot).toMatchInlineSnapshot(
    '"packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext"',
  )
  expect(resolved2?.fromModule).toBe('./PaymentMethodContext')
  expect(resolved2?.root).toBe('packages/magento-cart-payment-method')
})

it('it generates an interceptor', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
      },
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method/index',
        sourceModule: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)[0]).toBe(
    'packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
  )

  const result =
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template
  expectInterceptor(result).toMatchInlineSnapshot(`
    "type PluginAddBraintreeMethodsProps = OmitPrev<
      React.ComponentProps<typeof PluginAddBraintreeMethods>,
      'Prev'
    >

    const PluginAddBraintreeMethodsInterceptor = (props: PluginAddBraintreeMethodsProps) => (
      <PluginAddBraintreeMethods {...props} Prev={PaymentMethodContextProviderOriginal} />
    )

    type PluginAddMollieMethodsProps = PluginAddBraintreeMethodsProps &
      OmitPrev<React.ComponentProps<typeof PluginAddMollieMethods>, 'Prev'>

    const PluginAddMollieMethodsInterceptor = (props: PluginAddMollieMethodsProps) => (
      <PluginAddMollieMethods {...props} Prev={PluginAddBraintreeMethodsInterceptor} />
    )

    /**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./PaymentMethodContext.tsx} for original source file
     * @see {PluginAddBraintreeMethods} for source of applied plugin
     * @see {PluginAddMollieMethods} for source of applied plugin
     */
    export const PaymentMethodContextProvider = PluginAddMollieMethodsInterceptor"
  `)
})

it("resolves a 'root plugin' to be relative to the interceptor", async () => {
  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: './plugins/AddPaymentMethodEnhancer',
      },
    ],
    resolveDependency(projectRoot),
  )

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    '"packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext"',
  )
  expectImport(
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template,
  ).toMatchInlineSnapshot(`
    "import type { DistributedOmit as OmitPrev } from 'type-fest'

    import { Plugin as PluginAddPaymentMethodEnhancer } from '../../../plugins/AddPaymentMethodEnhancer'"
  `)
})

it('it can apply multiple plugins to a single export', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
      },
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/magento-payment-adyen/plugins/AddAdyenMethods',
      },
    ],
    resolve,
  )
  const result =
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template
  expectImport(result).toMatchInlineSnapshot(`
    "import type { DistributedOmit as OmitPrev } from 'type-fest'

    import { Plugin as PluginAddAdyenMethods } from '@graphcommerce/magento-payment-adyen/plugins/AddAdyenMethods'
    import { Plugin as PluginAddMollieMethods } from '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods'"
  `)

  expectOriginal(result).toContain('PaymentMethodContextProviderOriginal')

  expectInterceptor(result).toMatchInlineSnapshot(`
    "type PluginAddAdyenMethodsProps = OmitPrev<
      React.ComponentProps<typeof PluginAddAdyenMethods>,
      'Prev'
    >

    const PluginAddAdyenMethodsInterceptor = (props: PluginAddAdyenMethodsProps) => (
      <PluginAddAdyenMethods {...props} Prev={PaymentMethodContextProviderOriginal} />
    )

    type PluginAddMollieMethodsProps = PluginAddAdyenMethodsProps &
      OmitPrev<React.ComponentProps<typeof PluginAddMollieMethods>, 'Prev'>

    const PluginAddMollieMethodsInterceptor = (props: PluginAddMollieMethodsProps) => (
      <PluginAddMollieMethods {...props} Prev={PluginAddAdyenMethodsInterceptor} />
    )

    /**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./PaymentMethodContext.tsx} for original source file
     * @see {PluginAddAdyenMethods} for source of applied plugin
     * @see {PluginAddMollieMethods} for source of applied plugin
     */
    export const PaymentMethodContextProvider = PluginAddMollieMethodsInterceptor"
  `)
})

it('it handles on duplicates gracefully', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
      },
      {
        type: 'component',
        targetExport: 'PaymentMethodContextProvider',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-cart-payment-method',
        sourceModule: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
      },
    ],
    resolve,
  )

  const result =
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template
  expectInterceptor(result).toMatchInlineSnapshot(`
    "type PluginAddBraintreeMethodsProps = OmitPrev<
      React.ComponentProps<typeof PluginAddBraintreeMethods>,
      'Prev'
    >

    const PluginAddBraintreeMethodsInterceptor = (props: PluginAddBraintreeMethodsProps) => (
      <PluginAddBraintreeMethods {...props} Prev={PaymentMethodContextProviderOriginal} />
    )

    /**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./PaymentMethodContext.tsx} for original source file
     * @see {PluginAddBraintreeMethods} for source of applied plugin
     */
    export const PaymentMethodContextProvider = PluginAddBraintreeMethodsInterceptor"
  `)
})

it('correctly renames all variable usages', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        enabled: true,
        targetModule: '@graphcommerce/magento-product',
        sourceExport: 'Plugin',
        type: 'component',
        targetExport: 'ProductListItem',
        sourceModule: '@graphcommerce/magento-compare/plugins/CompareAbleProductListItem',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    '"packages/magento-product/components/ProductListItem/ProductListItem"',
  )

  const template =
    interceptors['packages/magento-product/components/ProductListItem/ProductListItem']?.template
  expectOriginal(template).not.toContain('ProductListItem.selectors')
  expectOriginal(template).toContain('ProductListItemOriginal.selectors')
})

it('it handles root plugins', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        targetExport: 'AddProductsToCartForm',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/magento-product',
        sourceModule: './plugins/EnableCrosssellsPlugin',
      },
    ],
    resolve,
  )

  expect(interceptors['packages/magento-product/index']?.template).toMatchInlineSnapshot(
    'undefined',
  )
})

it('it handles root plugins and creates a relative path', async () => {
  const resolve = resolveDependency(projectRoot)

  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        targetExport: 'OverlayBase',
        sourceExport: 'Plugin',
        enabled: true,
        targetModule: '@graphcommerce/next-ui',
        sourceModule: './plugins/EnableCrosssellsPlugin',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    '"packages/next-ui/Overlay/components/OverlayBase"',
  )

  expect(
    interceptors['packages/next-ui/Overlay/components/OverlayBase'].targetExports.OverlayBase[0]
      .sourceModule,
  ).toMatchInlineSnapshot('"../../../../examples/magento-graphcms/plugins/EnableCrosssellsPlugin"')
})

it('generates method interceptors alognside component interceptors', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        enabled: true,
        targetModule: '@graphcommerce/graphql',
        type: 'component',
        sourceExport: 'Plugin',
        targetExport: 'GraphQLProvider',
        sourceModule: '@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider',
      },
      {
        type: 'function',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'Plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache',
      },
      {
        type: 'function',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'Plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphcms/plugins/hygraphInitMemoryCache',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)).toMatchInlineSnapshot(`
    [
      "packages/graphql/components/GraphQLProvider/GraphQLProvider",
      "packages/graphql/config",
    ]
  `)
  expect(
    interceptors['packages/graphql/components/GraphQLProvider/GraphQLProvider']?.template,
  ).toContain('MagentoGraphqlGraphqlProvider')
  expect(interceptors['packages/graphql/config']?.template).toContain('magentoInitMemoryCache')
  expect(interceptors['packages/graphql/config']?.template).toContain('hygraphInitMemoryCache')
})

it('adds debug logging to interceptors for components', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        enabled: true,
        targetModule: '@graphcommerce/graphql',
        type: 'component',
        sourceExport: 'Plugin',
        targetExport: 'GraphQLProvider',
        sourceModule: '@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider',
      },
      {
        type: 'function',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache',
      },
      {
        type: 'function',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphcms/plugins/hygraphInitMemoryCache',
      },
    ],
    resolve,
    { pluginStatus: true },
  )

  expectImport(interceptors['packages/graphql/config']?.template).toMatchInlineSnapshot(`
    "import { plugin as pluginhygraphInitMemoryCache } from '@graphcommerce/magento-graphcms/plugins/hygraphInitMemoryCache'
    import { plugin as pluginmagentoInitMemoryCache } from '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache'"
  `)

  expectOriginal(interceptors['packages/graphql/config']?.template).toMatchInlineSnapshot(`
    "import type { ApolloLink, TypePolicies } from '@apollo/client'
    import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
    import type { SetRequired } from 'type-fest'
    import type { MigrateCache } from './components/GraphQLProvider/migrateCache'
    export interface PreviewData {}
    export type PreviewConfig = {
      preview?: boolean
      previewData?: PreviewData & Record<string, unknown>
    }
    export type ApolloClientConfigInput = {
      storefront: GraphCommerceStorefrontConfig
      links?: ApolloLink[]
      policies?: TypePolicies[]
      migrations?: MigrateCache[]
    } & PreviewConfig
    export type ApolloClientConfig = SetRequired<
      ApolloClientConfigInput,
      'links' | 'policies' | 'migrations'
    >
    export function graphqlConfigOriginal(config: ApolloClientConfigInput): ApolloClientConfig {
      const { storefront, links = [], policies = [], migrations = [], ...rest } = config
      return {
        storefront,
        links,
        policies,
        migrations,
        ...rest,
      }
    }"
  `)

  expectInterceptor(interceptors['packages/graphql/config']?.template).toMatchInlineSnapshot(`
    "const logged: Set<string> = new Set()
    const logOnce = (log: string, ...additional: unknown[]) => {
      if (logged.has(log)) return
      logged.add(log)
      console.warn(log, ...additional)
    }

    const pluginhygraphInitMemoryCacheInterceptor: typeof graphqlConfigOriginal = (...args) => {
      logOnce(
        \`🔌 Calling graphqlConfig with plugin(s): pluginmagentoInitMemoryCache wrapping pluginhygraphInitMemoryCache wrapping graphqlConfig()\`,
      )
      return pluginhygraphInitMemoryCache(graphqlConfigOriginal, ...args)
    }
    const pluginmagentoInitMemoryCacheInterceptor: typeof pluginhygraphInitMemoryCacheInterceptor = (
      ...args
    ) => {
      logOnce(
        \`🔌 Calling graphqlConfig with plugin(s): pluginhygraphInitMemoryCache wrapping pluginmagentoInitMemoryCache wrapping graphqlConfig()\`,
      )
      return pluginmagentoInitMemoryCache(pluginhygraphInitMemoryCacheInterceptor, ...args)
    }

    /**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./config.ts} for original source file
     * @see {pluginhygraphInitMemoryCache} for source of applied plugin
     * @see {pluginmagentoInitMemoryCache} for source of applied plugin
     */
    export const graphqlConfig = pluginmagentoInitMemoryCacheInterceptor"
  `)
})

it('correctly resolves when a source can not be parsed', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        type: 'component',
        enabled: true,
        sourceExport: 'Plugin',
        sourceModule: '@graphcommerce/demo-magento-graphcommerce/plugins/DemoRowLinks',
        targetModule: '@graphcommerce/next-ui',
        targetExport: 'RowLinks',
      },
    ],
    resolve,
    { pluginStatus: true },
  )

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    '"packages/next-ui/Row/RowLinks/RowLinks"',
  )
})

it('can correctly find the source for deeper chained exports', () => {
  const resolve = resolveDependency(projectRoot)
  const originalSource = findOriginalSource(
    {
      enabled: true,
      sourceModule: '@graphcommerce/demo-magento-graphcommerce/plugins/DemoRowLinks',
      sourceExport: 'Plugin',
      targetModule: '@graphcommerce/next-ui',
      targetExport: 'BlogTag',
      type: 'component',
    },
    resolve('@graphcommerce/next-ui', { includeSources: true }),
    resolve,
  )
  expect(originalSource.error).toBeUndefined()
  expect(originalSource.resolved?.dependency).toMatchInlineSnapshot(
    '"@graphcommerce/next-ui/Blog/BlogTags/BlogTag"',
  )
})

it('Should apply overrides to the correct file', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        enabled: true,
        sourceModule: './plugins/replaceGetProductStaticPaths',
        sourceExport: 'getProductStaticPaths',
        targetModule: '@graphcommerce/magento-product',
        targetExport: 'getProductStaticPaths',
        type: 'replace',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    '"packages/magento-product/components/ProductStaticPaths/getProductStaticPaths"',
  )

  const result =
    interceptors['packages/magento-product/components/ProductStaticPaths/getProductStaticPaths']
      ?.template
  expectImport(result).toMatchInlineSnapshot(
    '"import { getProductStaticPaths as getProductStaticPathsreplaceGetProductStaticPaths } from \'../../../../plugins/replaceGetProductStaticPaths\'"',
  )

  expectOriginal(result).toContain('getProductStaticPathsDisabled')
})

it('correctly reports an error for an incorrect export', async () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
    demoMode: true,
  } as unknown as GraphCommerceConfig

  const src = `
import { getSitemapPaths as getSitemapPathsType } from '@graphcommerce/magento-product'
import { IfConfig, FunctionPlugin } from '@graphcommerce/next-config'

export const method = 'getSitemapPaths'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

export const plugin: FunctionPlugin<typeof getSitemapPathsType> = (prev, ...args) => {
  console.log('getSitemapPaths plugin ran!')
  return prev(...args)
}
`

  console.error = jest.fn()
  const plugins = parseStructure(parseSync(src), fakeconfig, './plugins/MyPlugin.tsx')

  expect((console.error as jest.Mock).mock.calls[0][0]).toMatchInlineSnapshot(
    '"Plugin configuration invalid! See ./plugins/MyPlugin.tsx"',
  )

  expect(plugins).toMatchInlineSnapshot('[]')
  const result = await generateInterceptors(plugins, resolveDependency(projectRoot))

  expect(Object.keys(result)).toMatchInlineSnapshot('[]')
})

it('generated a correct file if a replacement and a plugin is applied to the same export', async () => {
  const src1 = `import { ProductPageNameProps } from '@graphcommerce/magento-product'
import { PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'replace',
  module: '@graphcommerce/magento-product',
  ifConfig: 'demoMode',
}

export function ProductPageName(props: ProductPageNameProps) {
  const { product } = props
  return <div>Complete overrides {product.url_key}</div>
}
`

  const src2 = `import type { AddToCartItemSelector, ProductPageNameProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageName'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

const ConfigurableProductPageName = (
  props: PluginProps<ProductPageNameProps> & AddToCartItemSelector,
) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })
  return <Prev product={variant ?? product} {...rest} />
}

export const Plugin = ConfigurableProductPageName
`

  const config = {
    demoMode: true,
    configurableVariantForSimple: true,
    configurableVariantValues: { content: true, gallery: true, url: true },
  } as unknown as GraphCommerceConfig

  const firstFile = parseStructure(parseSync(src1), config, './plugins/MyPlugin')

  const secondFile = parseStructure(
    parseSync(src2),
    config,
    '@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageName',
  )

  const plugins = [...firstFile, ...secondFile]

  expect(plugins).toMatchInlineSnapshot(`
    [
      {
        "enabled": true,
        "ifConfig": "demoMode",
        "sourceExport": "ProductPageName",
        "sourceModule": "./plugins/MyPlugin",
        "targetExport": "ProductPageName",
        "targetModule": "@graphcommerce/magento-product",
        "type": "replace",
      },
      {
        "enabled": true,
        "ifConfig": "configurableVariantValues.content",
        "sourceExport": "Plugin",
        "sourceModule": "@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageName",
        "targetExport": "ProductPageName",
        "targetModule": "@graphcommerce/magento-product",
        "type": "component",
      },
    ]
  `)

  const interceptors = await generateInterceptors(plugins, resolveDependency(projectRoot))

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    '"packages/magento-product/components/ProductPageName/ProductPageName"',
  )

  const result =
    interceptors['packages/magento-product/components/ProductPageName/ProductPageName']?.template

  expectImport(result).toMatchInlineSnapshot(`
    "import type { DistributedOmit as OmitPrev } from 'type-fest'

    import { Plugin as PluginConfigurableProductPageName } from '@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageName'
    import { ProductPageName as ProductPageNameMyPlugin } from '../../../../plugins/MyPlugin'"
  `)

  expectOriginal(result).toMatchInlineSnapshot(`
    "import type { ProductPageNameFragment } from './ProductPageName.gql'
    export type ProductPageNameProps = {
      product: ProductPageNameFragment
    }
    export function ProductPageNameDisabled(props: ProductPageNameProps) {
      const { product } = props
      return <>{product.name}</>
    }"
  `)

  expectInterceptor(result).toMatchInlineSnapshot(`
    "type PluginConfigurableProductPageNameProps = React.ComponentProps<typeof ProductPageNameMyPlugin> &
      OmitPrev<React.ComponentProps<typeof PluginConfigurableProductPageName>, 'Prev'>

    const PluginConfigurableProductPageNameInterceptor = (
      props: PluginConfigurableProductPageNameProps,
    ) => <PluginConfigurableProductPageName {...props} Prev={ProductPageNameMyPlugin} />

    /**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./ProductPageName.tsx} for original source file
     * @see {ProductPageNameMyPlugin} for replacement of the original source (original source not used)
     * @see {PluginConfigurableProductPageName} for source of applied plugin
     */
    export const ProductPageName = PluginConfigurableProductPageNameInterceptor"
  `)
})

it('generates to a .ts file when the target file is a .ts as well', async () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = await generateInterceptors(
    [
      {
        type: 'function',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'Plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot('"packages/graphql/config"')
  const interceptor = interceptors['packages/graphql/config']
  expect(interceptor.sourcePath).toBe('packages/graphql/config.ts')
})

it.todo('Should report an error when multiple files are overriding the same export')

it('Can correctly find exports that are default exports', async () => {
  const pluginSource = `
    import { PluginConfig } from '@graphcommerce/next-config'

    import accessibilityHuman from '@graphcommerce/next-ui/icons/accessibility-human.svg'
    import alarm from '@graphcommerce/next-ui/icons/alarm.svg'

    export const config: PluginConfig = {
      type: 'replace',
      module: '@graphcommerce/next-ui',
    }

    export const iconChevronLeft = accessibilityHuman
    export const iconChevronRight = alarm
  `

  const config = {
    demoMode: true,
    configurableVariantForSimple: true,
    configurableVariantValues: { content: true, gallery: true, url: true },
  } as unknown as GraphCommerceConfig

  const plugins = parseStructure(parseSync(pluginSource), config, './plugins/MyProjectIcon')

  const interceptors = await generateInterceptors(plugins, resolveDependency(projectRoot))
  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot('"packages/next-ui/icons"')

  const result = interceptors['packages/next-ui/icons']?.template

  expectImport(result).toMatchInlineSnapshot(`
    "import { iconChevronLeft as iconChevronLeftMyProjectIcon } from '../../plugins/MyProjectIcon'
    import { iconChevronRight as iconChevronRightMyProjectIcon } from '../../plugins/MyProjectIcon'"
  `)

  expectOriginal(result).toContain('iconChevronLeftDisabled')
  expectOriginal(result).toContain('iconChevronRightDisabled')

  expectInterceptor(result).toMatchInlineSnapshot(`
    "/**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./icons.ts} for original source file
     * @see {iconChevronLeftMyProjectIcon} for replacement of the original source (original source not used)
     */
    export const iconChevronLeft = iconChevronLeftMyProjectIcon

    /**
     * Here you see the 'interceptor' that is applying all the configured plugins.
     *
     * This file is NOT meant to be modified directly and is auto-generated if the plugins or the original source changes.
     *
     * @see {@link file://./icons.ts} for original source file
     * @see {iconChevronRightMyProjectIcon} for replacement of the original source (original source not used)
     */
    export const iconChevronRight = iconChevronRightMyProjectIcon"
  `)
})
