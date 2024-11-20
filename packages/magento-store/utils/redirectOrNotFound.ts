import type { ParsedUrlQuery } from 'querystring'
import type { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@graphcommerce/graphql'
import { flushMeasurePerf } from '@graphcommerce/graphql'
import { nonNullable, isTypename, storefrontConfig } from '@graphcommerce/next-ui'
import type { Redirect } from 'next'
import type { StoreConfigQuery } from '../StoreConfig.gql'
import { defaultLocale } from '../localeToStore'
import type { HandleRedirectQuery } from './HandleRedirect.gql'
import { HandleRedirectDocument } from './HandleRedirect.gql'

export type RedirectOr404Return = Promise<
  | { redirect: Redirect; revalidate?: number | boolean }
  | { notFound: true; revalidate?: number | boolean }
>

const notFound = (from: string, reason: string) => {
  flushMeasurePerf()
  console.info(`[redirectOrNotFound: /${from}] ${reason}`)
  return { notFound: true, revalidate: 60 * 20 } as const
}

const urlPrefix = (locale?: string) => {
  const localeHasDomain = Boolean(storefrontConfig(locale)?.domain)
  return localeHasDomain || locale === defaultLocale() ? '' : `/${locale}`
}

export const redirectTo = (
  to: string,
  permanent: boolean,
  locale?: string,
): { redirect: Redirect; revalidate?: number | boolean } => {
  console.info(
    `[redirectTo]: ${permanent ? 'Permanent' : 'Temporary'} redirect to ${urlPrefix(locale)}${to}`,
  )
  return {
    redirect: { destination: `${urlPrefix(locale)}${to}`, permanent },
    revalidate: 60 * 20,
  }
}

const redirect = (from: string, to: string, permanent: boolean, locale?: string) => {
  const localeHasDomain = Boolean(storefrontConfig(locale)?.domain)
  const prefix = localeHasDomain || locale === defaultLocale() ? '' : `/${locale}`
  const destination = `${prefix}${to}`

  flushMeasurePerf()

  console.info(
    `[redirectOrNotFound: ${prefix ? `/${prefix}` : ''}/${from}] ${
      permanent ? 'Permanent' : 'Temporary'
    } redirect to ${destination}`,
  )
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-param-reassign
    permanent = false
  }

  return { redirect: { destination, permanent }, revalidate: 60 * 20 }
}

export async function redirectOrNotFound(
  client: ApolloClient<NormalizedCacheObject>,
  config: Promise<ApolloQueryResult<StoreConfigQuery>> | ApolloQueryResult<StoreConfigQuery>,
  params?: ParsedUrlQuery,
  locale?: string,
): RedirectOr404Return {
  // Create a URL from the params provided.
  const from = Object.values(params ?? {})
    .map((v) => (Array.isArray(v) ? v.join('/') : v))
    .join('/')

  try {
    // Get the configured suffixes from the store config
    const { product_url_suffix, category_url_suffix } = (await config).data.storeConfig ?? {}

    const candidates = new Set([from])

    // If the incomming URL contains a suffix, we check if the URL without the suffix exists
    // if the incomming URL does not contain a suffix, we check if the URL with the suffix exists
    const suffixes = [product_url_suffix, category_url_suffix].filter(nonNullable)
    suffixes.forEach((suffix) => {
      candidates.add(from.endsWith(suffix) ? from.slice(0, -suffix.length) : `${from}${suffix}`)
    })

    // Handle the case where we transition from using the default .html suffix, to not using one
    if (from.endsWith('.html')) {
      candidates.add(from.slice(0, -'.html'.length))
    }

    const routePromises = [...candidates].filter(Boolean).map(
      async (url) =>
        (
          await client.query({
            query: HandleRedirectDocument,
            variables: { url },
            fetchPolicy: 'no-cache',
          })
        ).data,
    )

    const routeDataArray = (await Promise.all(routePromises)).filter(nonNullable)

    const routeData: HandleRedirectQuery = Object.assign(
      {},
      ...routeDataArray.map((result) => {
        if (!result.route) delete result.route
        if (!result.products) delete result.products
        return result
      }),
    )
    if (!routeData?.route)
      return notFound(
        from,
        `no redirect candidates found for these paths: ${[...candidates.values()].join(',')}`,
      )

    const redirectUrl =
      routeData?.route?.relative_url && routeData?.route?.relative_url !== from
        ? routeData.route.relative_url
        : undefined

    // For implicit redirects, always use permanent, otherwise use the given redirect type
    const permanent = !routeData.route?.redirect_code || routeData.route?.redirect_code === 301

    if (
      isTypename(routeData.route, [
        'ConfigurableProduct',
        'BundleProduct',
        'SimpleProduct',
        'VirtualProduct',
        'DownloadableProduct',
        'GroupedProduct',
      ])
    ) {
      const productRoute = import.meta.graphCommerce.productRoute ?? '/p/'

      if (redirectUrl) return redirect(from, `${productRoute}${redirectUrl}`, permanent, locale)

      const url_key = routeData.route?.url_key
      if (!routeData.products?.items?.find((i) => i?.url_key === url_key))
        return notFound(from, "Route found, but product isn't returned from products query")

      return redirect(from, `${productRoute}${url_key}`, true, locale)
    }

    if (redirectUrl) return redirect(from, `/${redirectUrl}`, permanent, locale)

    return notFound(from, 'Route found, but no redirect URL')
  } catch (e) {
    if (e instanceof Error) {
      return notFound(from, `Error while redirecting: ${e.message}`)
    }
    console.info(e)
    return notFound(from, 'Error while redirecting')
  }
}
