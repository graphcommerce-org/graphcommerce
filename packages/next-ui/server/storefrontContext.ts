/* eslint-disable arrow-body-style */
import type { ParsedUrlQuery } from 'querystring'
import { mergeDeep } from '@graphcommerce/graphql'
import type { GraphCommerceStorefrontConfig, MethodPlugin } from '@graphcommerce/next-config'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next'
import type { UnionToIntersection } from 'type-fest'
import { runInServerContext } from './runInServerContext'

export const storefrontAll = import.meta.graphCommerce.storefront

const storefrontContext = new AsyncLocalStorage<GraphCommerceStorefrontConfig>()

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
  const conf = storefrontContext.getStore()

  if (!conf)
    throw new Error(
      'Please wrap getStaticProps in enhanceStaticProps or serverSidePropsContext in enhanceServerSideProps',
    )
  return conf
}

const addStorefront: MethodPlugin<typeof runInServerContext> = (
  prev,
  storefront,
  callback,
  ...args
) => {
  const config = storefrontAll.find((l) => l.locale === storefront)
  if (!config) throw Error(`No storefront config found for locale ${storefront}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return storefrontContext.run(config, callback, ...args)
}

export type AsyncContextInitializer<T> = () => (cb: () => T) => Promise<void>

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
    const { locale } = context
    if (!locale) throw Error('No locale found in context')

    const config = storefrontAll.find((l) => l.locale === locale)
    if (!config) throw Error(`No storefront config found for locale ${locale}`)

    // Load all getStaticProps methods in parallel with the correct storefront config
    const promises = Promise.all(
      getStaticPropsArr.map((getStaticProps) =>
        storefrontContext.run(
          config,
          () =>
            runInServerContext(locale, getStaticProps, context) as ReturnType<
              typeof getStaticProps
            >,
        ),
      ),
    )

    // Merge all props together, but bail whenever the
    return (await promises).reduce((current, previous) => {
      if (!previous || !hasProps(previous)) return previous
      if (!hasProps(current)) return current

      return {
        props: mergeDeep(current.props, previous.props),
        revalidate: Math.min(
          typeof current.revalidate === 'number' ? current.revalidate : Infinity,
          typeof previous.revalidate === 'number' ? previous.revalidate : Infinity,
        ),
      }
    }) as R
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
