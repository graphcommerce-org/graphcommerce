import type { ParsedUrlQuery } from 'querystring'
import { mergeDeep } from '@graphcommerce/graphql'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
  InferGetStaticPropsType,
  PreviewData,
} from 'next'
import type { UnionToIntersection } from 'type-fest'

export const storefrontAll = import.meta.graphCommerce.storefront

const storefrontContext = new AsyncLocalStorage<GraphCommerceStorefrontConfig>()

export function hasProps<
  R extends GetStaticPropsResult<unknown> | GetServerSidePropsResult<unknown>,
>(result: R): result is Extract<R, { props: unknown }> {
  return typeof result === 'object' && 'props' in result
}

/** Get the current storefront config based on the provided locale */
export const storefrontConfig = () => {
  const conf = storefrontContext.getStore()

  if (!conf)
    throw new Error(
      'Please wrap getStaticProps in enhanceStaticProps or serverSidePropsContext in enhanceServerSideProps',
    )
  return conf
}

/**
 * `enhanceStaticProps` introduces additional functionality to the native getStaticProps function:
 *
 * - Accepts an array of getStaticProps method and merge the result.
 * - Respects `notFound` or `redirect` values returned.
 * - Uses the lowest revalidate value.
 * - It wraps the `getStaticProps` functions with an AsyncLocalStorage to provide an actual
 *   storefrontConfig().
 *
 * This method is heavily extended, see the @graphcommerce/next-ui/server.interceptor.tsx file for
 * all configured plugins.
 *
 * To get the current storefront config, use the `storefrontConfig()` function.
 */
export function enhanceStaticProps<
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  GSPArray extends GetStaticProps<any, Params, any>[] = GetStaticProps<any, Params, any>[],
  R = UnionToIntersection<Awaited<ReturnType<GSPArray[number]>>>,
>(...getStaticPropsArr: GSPArray): (...args: Parameters<GSPArray[number]>) => Promise<R> {
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

        return {
          props: mergeDeep(acc.props, curr.props),
          revalidate: Math.min(
            typeof acc.revalidate === 'number' ? acc.revalidate : Infinity,
            typeof curr.revalidate === 'number' ? curr.revalidate : Infinity,
          ),
        }
      }) as R
    })
  }
}

function func1<Params extends ParsedUrlQuery = ParsedUrlQuery>() {
  return { props: { some: 'value ' } }
}
function func2<Params extends ParsedUrlQuery = ParsedUrlQuery>() {
  return { props: { someOther: 'value' } }
}

const getStaticProps = enhanceStaticProps<{ url: string[] }>(func1, func2)
type Infered = InferGetStaticPropsType<typeof getStaticProps>

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
