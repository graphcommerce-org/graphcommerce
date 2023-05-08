import type { ParsedUrlQuery } from 'querystring'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  PreviewData,
} from 'next'
import { mergeDeep, TupleToIntersection } from '@graphcommerce/graphql'

export const storefrontAll = import.meta.graphCommerce.storefront

const storefrontContext = new AsyncLocalStorage<GraphCommerceStorefrontConfig>()

// /** Get the current storefront config based on the provided locale */
export const storefrontConfig = () => {
  const conf = storefrontContext.getStore()

  if (!conf)
    throw new Error(
      'Please wrap getStaticProps in enhanceStaticProps or serverSidePropsContext in enhanceServerSideProps',
    )
  return conf
}

/**
 * Wraps the getStaticProps function to provide the correct storefrontConfig().
 *
 * - This method will have plugins, see the @graphcommerce/next-ui/server.interceptor.tsx file for all
 *   configured plugins.
 *
 * To get the current storefront config, use the `storefrontConfig()` function.
 */
export function enhanceStaticProps<
  GSPArray extends GetStaticProps<any, any, any>[] = GetStaticProps<any, any, any>[],
  I extends TupleToIntersection<GSPArray> = TupleToIntersection<GSPArray>,
>(...getStaticPropsArr: GSPArray): (...args: Parameters<I>) => Promise<ReturnType<I>> {
  return async (context) => {
    const config = storefrontAll.find((l) => l.locale === context.locale)
    if (!config) throw Error(`No storefront config found for locale ${context.locale}`)

    return storefrontContext.run(config, async () => {
      // Load all getStaticProps methods in parallel
      const promises = Promise.all(getStaticPropsArr.map((enhancer) => enhancer(context)))

      // Merge all props together, but bail whenever the
      return (await promises).reduce((acc, curr) => {
        if (!curr || !hasProps(curr)) return curr
        if (!hasProps(acc)) return acc
        return mergeDeep(acc, curr.props)
      }) as Awaited<ReturnType<I>>
    })
  }
}

/**
 * Wraps the getServerSideProps function to provide the correct storefrontConfig(). This method will
 * have plugins, see the next-ui/index.interceptor.tsx
 */
export function enhanceServerSideProps<
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(cb: GetServerSideProps<Props, Params>) {
  return (context: GetServerSidePropsContext<Params>) => {
    const config = storefrontAll.find((l) => l.locale === context.locale)
    if (!config) throw Error(`No storefront config found for locale ${context.locale}`)
    return storefrontContext.run(config, cb, context)
  }
}

export function enhanceStaticPaths<Params extends ParsedUrlQuery = ParsedUrlQuery>(
  fallback: boolean | 'blocking',
  cb: (context: {
    locale: string
    defaultLocale: string
  }) => Promise<GetStaticPathsResult<Params>['paths']> | GetStaticPathsResult<Params>['paths'],
) {
  return async (): Promise<GetStaticPathsResult<Params>> => {
    if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

    const defaultLocale = storefrontAll.find((l) => l.defaultLocale) ?? storefrontAll[0]
    const allPaths = await Promise.all(
      storefrontAll.map((storefront) =>
        storefrontContext.run(storefront, cb, {
          locale: storefront.locale,
          defaultLocale: defaultLocale.locale,
        }),
      ),
    )
    return {
      fallback,
      paths: allPaths.map((p) => (import.meta.graphCommerce.limitSsg ? p.slice(0, 1) : p)).flat(1),
    }
  }
}

export function hasProps<
  R extends GetStaticPropsResult<unknown> | GetServerSidePropsResult<unknown>,
>(result: R): result is Extract<R, { props: unknown }> {
  return typeof result === 'object' && 'props' in result
}
