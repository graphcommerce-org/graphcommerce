import { parseSync } from '@swc/core'
import { GraphCommerceConfig } from '../../src/generated/config'
import { findOriginalSource } from '../../src/interceptors/findOriginalSource'
import {
  SOURCE_END,
  SOURCE_START,
  generateInterceptors,
} from '../../src/interceptors/generateInterceptors'
import { parseStructure } from '../../src/interceptors/parseStructure'
import { resolveDependency } from '../../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

const expectImport = (value: string | undefined): jest.JestMatchers<string> =>
  expect(value?.slice(value.indexOf(`import`) - 1, value.indexOf(SOURCE_START) - 1).trim())

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
  expect(resolved?.fromRoot).toMatchInlineSnapshot(`"packages/magento-cart-payment-method/index"`)
  expect(resolved?.fromModule).toBe('.')
  expect(resolved?.root).toBe('packages/magento-cart-payment-method')

  const resolved2 = resolver(
    '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
  )
  expect(resolved2?.fromRoot).toMatchInlineSnapshot(
    `"packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext"`,
  )
  expect(resolved2?.fromModule).toBe('./PaymentMethodContext')
  expect(resolved2?.root).toBe('packages/magento-cart-payment-method')
})

it('it generates an interceptor', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    "const AddBraintreeMethods_interceptor = (props: InterceptorProps<typeof AddBraintreeMethods>) => (
      <AddBraintreeMethods_source {...props} Prev={PaymentMethodContextProvider_original} />
    )
    const AddMollieMethods_interceptor = (props: InterceptorProps<typeof AddMollieMethods>) => (
      <AddMollieMethods_source {...props} Prev={AddBraintreeMethods_interceptor} />
    )

    export const PaymentMethodContextProvider = AddMollieMethods_interceptor"
  `)
})

it("resolves a 'root plugin' to be relative to the interceptor", () => {
  const interceptors = generateInterceptors(
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
    `"packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext"`,
  )
  expectImport(
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template,
  ).toMatchInlineSnapshot(`
    "import type { InterceptorProps } from '@graphcommerce/next-config'

    import { Plugin as AddPaymentMethodEnhancer_source } from '../../../plugins/AddPaymentMethodEnhancer'"
  `)
})

it('it can apply multiple plugins to a single export', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    "import type { InterceptorProps } from '@graphcommerce/next-config'

    import { Plugin as AddAdyenMethods_source } from '@graphcommerce/magento-payment-adyen/plugins/AddAdyenMethods'
    import { Plugin as AddMollieMethods_source } from '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods'"
  `)

  expectOriginal(result).toContain('PaymentMethodContextProvider_original')

  expectInterceptor(result).toMatchInlineSnapshot(`
    "const AddAdyenMethods_interceptor = (props: InterceptorProps<typeof AddAdyenMethods>) => (
      <AddAdyenMethods_source {...props} Prev={PaymentMethodContextProvider_original} />
    )
    const AddMollieMethods_interceptor = (props: InterceptorProps<typeof AddMollieMethods>) => (
      <AddMollieMethods_source {...props} Prev={AddAdyenMethods_interceptor} />
    )

    export const PaymentMethodContextProvider = AddMollieMethods_interceptor"
  `)
})

it('it handles on duplicates gracefully', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    "const AddBraintreeMethods_interceptor = (props: InterceptorProps<typeof AddBraintreeMethods>) => (
      <AddBraintreeMethods_source {...props} Prev={PaymentMethodContextProvider_original} />
    )

    export const PaymentMethodContextProvider = AddBraintreeMethods_interceptor"
  `)
})

it('correctly renames all variable usages', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    `"packages/magento-product/components/ProductListItem/ProductListItem"`,
  )

  const template =
    interceptors['packages/magento-product/components/ProductListItem/ProductListItem']?.template
  expectOriginal(template).not.toContain('ProductListItem.selectors')
  expectOriginal(template).toContain('ProductListItem_original.selectors')
})

it('it handles root plugins', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    `undefined`,
  )
})

it('it handles root plugins and creates a relative path', () => {
  const resolve = resolveDependency(projectRoot)

  const interceptors = generateInterceptors(
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
    `"packages/next-ui/Overlay/components/OverlayBase"`,
  )

  expect(
    interceptors['packages/next-ui/Overlay/components/OverlayBase'].targetExports.OverlayBase[0]
      .sourceModule,
  ).toMatchInlineSnapshot(`"../../../../examples/magento-graphcms/plugins/EnableCrosssellsPlugin"`)
})

it('generates method interceptors alognside component interceptors', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
        type: 'method',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'Plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache',
      },
      {
        type: 'method',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'Plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-hygraph/plugins/hygraphInitMemoryCache',
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

it('adds debug logging to interceptors for components', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
        type: 'method',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache',
      },
      {
        type: 'method',
        targetExport: 'graphqlConfig',
        enabled: true,
        sourceExport: 'plugin',
        targetModule: '@graphcommerce/graphql',
        sourceModule: '@graphcommerce/magento-hygraph/plugins/hygraphInitMemoryCache',
      },
    ],
    resolve,
    { pluginStatus: true },
  )

  expectImport(interceptors['packages/graphql/config']?.template).toMatchInlineSnapshot(`
    "import { plugin as magentoInitMemoryCache_source } from '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache'
    import { plugin as hygraphInitMemoryCache_source } from '@graphcommerce/magento-hygraph/plugins/hygraphInitMemoryCache'"
  `)

  expectOriginal(interceptors['packages/graphql/config']?.template).toMatchInlineSnapshot(`
    "import { ApolloLink, TypePolicies } from "@apollo/client";
    import type { GraphCommerceStorefrontConfig } from "@graphcommerce/next-config";
    import { MigrateCache } from "./components/GraphQLProvider/migrateCache";
    export type ApolloClientConfigInput = {
        storefront: GraphCommerceStorefrontConfig;
        links?: ApolloLink[];
        policies?: TypePolicies[];
        migrations?: MigrateCache[];
    };
    export type ApolloClientConfig = Required<ApolloClientConfigInput>;
    export function graphqlConfig_original(config: ApolloClientConfigInput): ApolloClientConfig {
        const { storefront, links = [], policies = [], migrations = [] } = config;
        return {
            storefront,
            links,
            policies,
            migrations
        };
    }"
  `)

  expectInterceptor(interceptors['packages/graphql/config']?.template).toMatchInlineSnapshot(`
    "const logged: Set<string> = new Set();
    const logInterceptor = (log: string, ...additional: unknown[]) => {
      if (logged.has(log)) return
      logged.add(log)
      console.log(log, ...additional)
    }
    const hygraphInitMemoryCache_interceptor: typeof graphqlConfig_original = (...args) => {
      logInterceptor(
        \`🔌 Calling graphqlConfig with plugin(s): magentoInitMemoryCache() wrapping hygraphInitMemoryCache() wrapping graphqlConfig()\`
      )
      return hygraphInitMemoryCache_source(graphqlConfig_original, ...args)
    }

    const magentoInitMemoryCache_interceptor: typeof hygraphInitMemoryCache_interceptor = (...args) => {
      logInterceptor(
        \`🔌 Calling graphqlConfig with plugin(s): hygraphInitMemoryCache() wrapping magentoInitMemoryCache() wrapping graphqlConfig()\`
      )
      return magentoInitMemoryCache_source(hygraphInitMemoryCache_interceptor, ...args)
    }


    export const graphqlConfig = magentoInitMemoryCache_interceptor"
  `)
})

it('correctly resolves when a source can not be parsed', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    `"packages/next-ui/Row/RowLinks/RowLinks"`,
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
    `"@graphcommerce/next-ui/Blog/BlogTags/BlogTag"`,
  )
})

it('Should apply overrides to the correct file', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
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
    `"packages/magento-product/components/ProductStaticPaths/getProductStaticPaths"`,
  )

  const result =
    interceptors['packages/magento-product/components/ProductStaticPaths/getProductStaticPaths']
      ?.template
  expectImport(result).toMatchInlineSnapshot(
    `"import { getProductStaticPaths as getProductStaticPaths_source } from '../../../../examples/magento-graphcms/plugins/replaceGetProductStaticPaths'"`,
  )

  expectOriginal(result).toContain(`getProductStaticPaths_DISABLED`)
})

it('Should report an error when multiple files are overriding the same export', () => {})

it('correctly reports an error for an incorrect export', () => {
  const fakeconfig = {
    googleRecaptchaKey: '123',
    googleAnalyticsId: '123',
    demoMode: true,
  } as GraphCommerceConfig

  const src = `
import { getSitemapPaths as getSitemapPathsType } from '@graphcommerce/magento-product'
import { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const method = 'getSitemapPaths'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'demoMode'

export const plugin: MethodPlugin<typeof getSitemapPathsType> = (prev, ...args) => {
  console.log('getSitemapPaths plugin ran!')
  return prev(...args)
}
`

  console.error = jest.fn()
  const plugins = parseStructure(
    parseSync(src, { syntax: 'typescript', tsx: true }),
    fakeconfig,
    './plugins/MyPlugin.tsx',
  )

  // @ts-expect-error mock not typed
  expect(console.error.mock.calls[0][0]).toMatchInlineSnapshot(
    `"Plugin configuration invalid! See ./plugins/MyPlugin.tsx"`,
  )

  expect(plugins).toMatchInlineSnapshot(`[]`)
  const result = generateInterceptors(plugins, resolveDependency(projectRoot))

  expect(Object.keys(result)).toMatchInlineSnapshot(`[]`)
})

it('generated a correct file if a replacement and a plugin is applied to the same export', () => {
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
  } as GraphCommerceConfig

  const firstFile = parseStructure(
    parseSync(src1, { syntax: 'typescript', tsx: true }),
    config,
    './plugins/MyPlugin',
  )

  const secondFile = parseStructure(
    parseSync(src2, { syntax: 'typescript', tsx: true }),
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

  const interceptors = generateInterceptors(plugins, resolveDependency(projectRoot))

  expect(Object.keys(interceptors)[0]).toMatchInlineSnapshot(
    `"packages/magento-product/components/ProductPageName/ProductPageName"`,
  )

  const result =
    interceptors['packages/magento-product/components/ProductPageName/ProductPageName']?.template

  expectImport(result).toMatchInlineSnapshot(`
    "import type { InterceptorProps } from '@graphcommerce/next-config'

    import { Plugin as ConfigurableProductPageName_source } from '@graphcommerce/magento-product-configurable/plugins/ConfigurableProductPage/ConfigurableProductPageName'
    import { ProductPageName as ProductPageName_source } from '../../../../plugins/MyPlugin'"
  `)

  expectOriginal(result).toMatchInlineSnapshot(`
    "import { ProductPageNameFragment } from "./ProductPageName.gql";
    export type ProductPageNameProps = {
        product: ProductPageNameFragment;
    };
    export const ProductPageName_DISABLED = (props: ProductPageNameProps)=>{
        const { product } = props;
        return <>{product.name}</>;
    };"
  `)

  expectInterceptor(result).toMatchInlineSnapshot(`
    "const ConfigurableProductPageName_interceptor = (props: InterceptorProps<typeof ConfigurableProductPageName>) => (
      <ConfigurableProductPageName_source {...props} Prev={ProductPageName_source} />
    )

    export const ProductPageName = ConfigurableProductPageName_interceptor"
  `)
})
