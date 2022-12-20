import { ParsedUrlQuery } from 'querystring'
import { ApolloClient, flushMeasurePerf, NormalizedCacheObject } from '@graphcommerce/graphql'
import { nonNullable, isTypename } from '@graphcommerce/next-ui'
import { Redirect } from 'next'
import { StoreConfigDocument } from '../StoreConfig.gql'
import { defaultLocale } from '../localeToStore'
import { HandleRedirectDocument } from './HandleRedirect.gql'

export type RedirectOr404Return = Promise<
  | { redirect: Redirect; revalidate?: number | boolean }
  | { notFound: true; revalidate?: number | boolean }
>

const notFound = () => {
  flushMeasurePerf()
  return { notFound: true, revalidate: 60 * 20 } as const
}

const redirect = (to: string, permanent: boolean, locale?: string) => {
  const prefix = locale === defaultLocale() ? '' : `/${locale}`
  const destination = `${prefix}${to}`

  flushMeasurePerf()

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`${permanent ? 'Permanent' : 'Temporary'} redirect to ${to}`)
    // eslint-disable-next-line no-param-reassign
    permanent = false
  }

  return { redirect: { destination, permanent }, revalidate: 60 * 20 }
}

export async function redirectOrNotFound(
  client: ApolloClient<NormalizedCacheObject>,
  params?: ParsedUrlQuery,
  locale?: string,
): RedirectOr404Return {
  try {
    // Create a URL from the params provided.
    const urlKey = Object.values(params ?? {})
      .map((v) => (Array.isArray(v) ? v.join('/') : v))
      .join('/')

    // Get the configured suffixes from the store config
    const { product_url_suffix: prodSuffix, category_url_suffix: catSuffix } =
      (await client.query({ query: StoreConfigDocument })).data.storeConfig ?? {}

    const candidates = new Set([urlKey])

    // If the incomming URL contains a suffix, we check if the URL without the suffix exists
    // if the incomming URL does not contain a suffix, we check if the URL with the suffix exists
    const suffixes = [prodSuffix, catSuffix].filter(nonNullable)
    suffixes.forEach((suffix) => {
      candidates.add(
        urlKey.endsWith(suffix) ? urlKey.slice(0, -suffix.length) : `${urlKey}${suffix}`,
      )
    })

    const routePromises = [...candidates].map(async (url) => {
      const result = await client.query({ query: HandleRedirectDocument, variables: { url } })
      if (!result.data.route) throw Error('No data')
      return result.data
    })

    const routeData = await Promise.any(routePromises)

    const relativeUrl =
      routeData.route?.relative_url && routeData.route?.relative_url !== urlKey
        ? routeData.route.relative_url
        : undefined

    // There is a URL, so we need to check if it can be found in the database.
    const permanent = routeData.route?.redirect_code === 301

    if (!routeData.route) return notFound()

    if (
      isTypename(routeData.route, [
        'ConfigurableProduct',
        'BundleProduct',
        'SimpleProduct',
        'VirtualProduct',
        'DownloadableProduct',
      ])
    ) {
      if (process.env.NEXT_PUBLIC_SINGLE_PRODUCT_PAGE !== '1') {
        console.warn('Redirects are only supported for NEXT_PUBLIC_SINGLE_PRODUCT_PAGE')
      }

      if (relativeUrl) {
        return redirect(`/p/${relativeUrl}`, permanent, locale)
      }

      if (routeData.products?.items?.find((i) => i?.url_key === routeData.route?.url_key)) {
        return redirect(`/p/${routeData.route?.url_key}`, permanent, locale)
      }

      return notFound()
    }

    if (relativeUrl) {
      return redirect(`/${relativeUrl}`, permanent, locale)
    }
  } catch (e) {
    // We're done
  }

  return notFound()
}
