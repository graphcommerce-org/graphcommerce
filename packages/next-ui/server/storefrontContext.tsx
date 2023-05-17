/* eslint-disable arrow-body-style */
import type { ParsedUrlQuery } from 'querystring'
import { mergeDeep } from '@graphcommerce/graphql'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import type {
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
import type { UnionToIntersection } from 'type-fest'
import { runInServerContext } from './runInServerContext'
import { serverOnlyContext } from './serverOnlyContext'

export const storefrontAll = import.meta.graphCommerce.storefront

const storefrontContext = new AsyncLocalStorage<GraphCommerceStorefrontConfig>()
export const storefrontRsc = serverOnlyContext<GraphCommerceStorefrontConfig | undefined>(undefined)

export function hasProps<
  R extends GetStaticPropsResult<unknown> | GetServerSidePropsResult<unknown>,
>(result: R): result is Extract<R, { props: unknown }> {
  return typeof result === 'object' && 'props' in result
}

export type Redirect = Extract<GetStaticPropsResult<unknown>, { redirect: unknown }>
export type NotFound = Extract<GetStaticPropsResult<unknown>, { notFound: boolean }>

export function notFound(revalidate?: NotFound['revalidate']): NotFound {
  return { notFound: true, revalidate }
}
export function redirect(redirect: Redirect['redirect'], revalidate?: Redirect['revalidate']) {
  return { redirect, revalidate }
}

/** Get the current storefront config based on the provided locale */
export const storefrontConfig = () => {
  const conf = storefrontRsc.get() || storefrontContext.getStore()

  if (!conf)
    throw new Error(
      `Configuration not initialized, please make sure to call one of the following functions:
- getStaticProps in enhanceStaticProps
- getServerSideProps in enhanceServerSideProps
- getStaticPaths in enhanceStaticPaths
- setConfigContext(props) for appDir
`,
    )
  return conf
}

export function configFromLocale(locale?: string | undefined) {
  if (!locale) throw Error('No locale found in context')

  const config = storefrontAll.find((l) => l.locale === locale)
  if (!config) throw Error(`No storefront config found for locale ${locale}`)
  return config
}

export function setConfigContext(props: any) {
  const storefront = props?.params?.storefront
  if (typeof storefront !== 'string')
    throw Error('Please pass the storefront locale to the context')
  const config = configFromLocale(storefront)
  storefrontRsc.set(config)
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
>(...getStaticPropsArr: GSPArray): (context: Parameters<GSPArray[number]>[0]) => Promise<R> {
  return async (context) => {
    const config = configFromLocale(context.locale)
    storefrontRsc.set(config)

    // Load all getStaticProps methods in parallel with the correct storefront config
    const results = getStaticPropsArr.map((getStaticProps) =>
      storefrontContext.run(
        config,
        () =>
          runInServerContext(context.locale, getStaticProps, context) as ReturnType<
            typeof getStaticProps
          >,
      ),
    )

    // Merge all props together, but bail whenever the
    return (await Promise.all(results)).reduce((current, previous) => {
      if (!previous || !hasProps(previous)) return previous
      if (!hasProps(current)) return current

      const revalidate = Math.min(
        typeof current.revalidate === 'number' ? current.revalidate : Infinity,
        typeof previous.revalidate === 'number' ? previous.revalidate : Infinity,
      )

      return {
        props: mergeDeep(current.props, previous.props),
        revalidate: Number.isFinite(revalidate) ? revalidate : false,
      }
    }) as R
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
    const allPaths = storefrontAll.map((storefront) =>
      storefrontContext.run(
        storefront,
        (context) => runInServerContext(context.locale, cb, context) as ReturnType<typeof cb>,
        { locale: storefront.locale, defaultLocale: defaultLocale.locale },
      ),
    )

    return {
      fallback,
      paths: (await Promise.all(allPaths))
        .map((p) => (import.meta.graphCommerce.limitSsg ? p.slice(0, 1) : p))
        .flat(1),
    }
  }
}
