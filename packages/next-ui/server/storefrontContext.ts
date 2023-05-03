import type { ParsedUrlQuery } from 'querystring'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import type { GetStaticProps, GetServerSideProps } from '../Page/types'

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EnhanceStaticProps {}

/**
 * Wraps the getStaticProps function to provide the correct storefrontConfig().
 *
 * - This method will have plugins, see the @graphcommerce/next-ui/server.interceptor.tsx file for all
 *   configured plugins.
 *
 * To get the current storefront config, use the `storefrontConfig()` function.
 */
export function enhanceStaticProps<
  LayoutProps extends Record<string, unknown>,
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(cb: GetStaticProps<LayoutProps, Props, Params>) {
  return (context: GetStaticPropsContext<Params>) => {
    const config = storefrontAll.find((l) => l.locale === context.locale)
    if (!config) throw Error(`No storefront config found for locale ${context.locale}`)
    return storefrontContext.run(config, cb, context)
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EnhanceServerSideProps {}

/**
 * Wraps the getServerSideProps function to provide the correct storefrontConfig(). This method will
 * have plugins, see the next-ui/index.interceptor.tsx
 */
export function enhanceServerSideProps<
  LayoutProps extends Record<string, unknown>,
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(cb: GetServerSideProps<LayoutProps, Props, Params>) {
  return (context: GetServerSidePropsContext<Params>) => {
    const config = storefrontAll.find((l) => l.locale === context.locale)
    if (!config) throw Error(`No storefront config found for locale ${context.locale}`)
    return storefrontContext.run(config, cb, context)
  }
}
